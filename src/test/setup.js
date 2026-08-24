/* eslint-disable */
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// -- IntersectionObserver mock (jsdom doesn't implement it) --
class MockIntersectionObserver {
  constructor(cb, options) {
    this._cb = cb;
    this._disconnected = false;
  }
  observe(el) {
    if (!this._disconnected) {
      Promise.resolve().then(() => {
        if (!this._disconnected) {
          this._cb([{ isIntersecting: true, target: el }]);
        }
      });
    }
  }
  unobserve() {}
  disconnect() {
    this._disconnected = true;
  }
}
globalThis.IntersectionObserver = MockIntersectionObserver;

// -- matchMedia mock --
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// -- scrollIntoView mock --
Element.prototype.scrollIntoView = vi.fn();

// -- scrollTo mock --
window.scrollTo = vi.fn();

// -- framer-motion mock: render children, pass through style --
vi.mock("framer-motion", async () => {
  const React = await import("react");

  const motionHandler = {
    get(_, tag) {
      return React.forwardRef(function MotionMock(props, ref) {
        const {
          initial, animate, exit, variants, whileInView, whileHover,
          whileTap, whileFocus, whileDrag, viewport, transition, layout,
          onAnimationComplete, onAnimationStart,
          ...rest
        } = props;
        return React.createElement(tag, { ...rest, ref });
      });
    },
  };

  const motion = new Proxy({}, motionHandler);

  return {
    motion,
    AnimatePresence: ({ children }) => children,
    useMotionValue: (init) => ({
      get: () => init,
      set: vi.fn(),
      on: vi.fn(),
    }),
    useTransform: () => ({
      get: () => 0,
      set: vi.fn(),
      on: vi.fn(),
    }),
    useSpring: (val) => val,
    useScroll: () => ({
      scrollYProgress: { get: () => 0, on: vi.fn() },
      scrollXProgress: { get: () => 0, on: vi.fn() },
    }),
    useMotionValueEvent: vi.fn(),
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
    useReducedMotion: () => false,
    useInView: () => true,
  };
});

// -- react-intersection-observer mock --
vi.mock("react-intersection-observer", async () => {
  const React = await import("react");
  return {
    useInView: () => ({
      ref: React.createRef(),
      inView: true,
      entry: null,
    }),
  };
});

// -- react-github-calendar mock --
vi.mock("react-github-calendar", () => {
  const React = require("react");
  return {
    GitHubCalendar: (props) =>
      React.createElement("div", { "data-testid": "github-calendar" }, "GitHub Calendar"),
    default: (props) =>
      React.createElement("div", { "data-testid": "github-calendar" }, "GitHub Calendar"),
  };
});

// -- @react-pdf/renderer mock --
vi.mock("@react-pdf/renderer", () => {
  const React = require("react");
  return {
    PDFDownloadLink: ({ children, ...props }) => {
      const child = typeof children === "function" ? children({ loading: false }) : children;
      return React.createElement("a", { "data-testid": "pdf-download", href: "#" }, child);
    },
    PDFViewer: ({ children }) =>
      React.createElement("div", { "data-testid": "pdf-viewer" }, "PDF Preview"),
    Document: ({ children }) => React.createElement("div", null, children),
    Page: ({ children }) => React.createElement("div", null, children),
    View: ({ children }) => React.createElement("div", null, children),
    Text: ({ children }) => React.createElement("span", null, children),
    StyleSheet: { create: (s) => s },
    Font: { register: vi.fn() },
    Link: ({ children }) => React.createElement("a", null, children),
    Image: () => React.createElement("img", { alt: "" }),
  };
});

// -- @react-three/fiber mock --
vi.mock("@react-three/fiber", () => {
  const React = require("react");
  return {
    Canvas: ({ children }) =>
      React.createElement("div", { "data-testid": "r3f-canvas" }, children),
    useFrame: (cb) => {
      React.useEffect(() => {
        try {
          cb(
            { pointer: { x: 0.1, y: 0.2 }, clock: { elapsedTime: 1 } },
            0.016
          );
        } catch {}
      }, []);
    },
    useThree: () => ({
      size: { width: 800, height: 600 },
      camera: {},
      gl: {},
      pointer: { x: 0, y: 0 },
    }),
  };
});

// -- @react-three/drei mock --
vi.mock("@react-three/drei", () => {
  const React = require("react");
  return {
    Float: ({ children }) => React.createElement("group", null, children),
    MeshDistortMaterial: (props) => React.createElement("meshStandardMaterial", props),
    AdaptiveDpr: () => null,
    PerformanceMonitor: ({ children }) => React.createElement("group", null, children),
    Stars: () => null,
  };
});

// -- lenis mock --
vi.mock("lenis", () => {
  return {
    default: class MockLenis {
      constructor() {}
      raf() {}
      destroy() {}
      on() {}
      off() {}
    },
  };
});
