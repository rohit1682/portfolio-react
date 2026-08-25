import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CVPreview from "./CVPreview";
import { personalInfo } from "../../constants";

describe("CVPreview", () => {
  const onClose = vi.fn();

  it("renders theme picker with all themes", () => {
    render(<CVPreview onClose={onClose} />);
    expect(screen.getByText("Classic")).toBeInTheDocument();
    expect(screen.getByText("Modern")).toBeInTheDocument();
    expect(screen.getByText("Executive")).toBeInTheDocument();
    expect(screen.getByText("Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Compact")).toBeInTheDocument();
  });

  it("renders close button", () => {
    render(<CVPreview onClose={onClose} />);
    const closeBtn = screen.getByLabelText(/close/i);
    expect(closeBtn).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(<CVPreview onClose={onClose} />);
    fireEvent.click(screen.getByLabelText(/close/i));
    expect(onClose).toHaveBeenCalled();
  });

  it("renders PDF download link", () => {
    render(<CVPreview onClose={onClose} />);
    expect(screen.getByTestId("pdf-download")).toBeInTheDocument();
  });

  it("shows download text for current theme", () => {
    render(<CVPreview onClose={onClose} />);
    expect(screen.getByText(/Download Classic CV/)).toBeInTheDocument();
  });

  it("switching theme updates download text", () => {
    render(<CVPreview onClose={onClose} />);
    fireEvent.click(screen.getByText("Modern"));
    expect(screen.getByText(/Download Modern CV/)).toBeInTheDocument();
  });

  it("renders Preview PDF button", () => {
    render(<CVPreview onClose={onClose} />);
    expect(screen.getByText("Preview PDF")).toBeInTheDocument();
  });

  it("toggles preview on click", () => {
    render(<CVPreview onClose={onClose} />);
    fireEvent.click(screen.getByText("Preview PDF"));
    expect(screen.getByText("Hide Preview")).toBeInTheDocument();
  });

  it("renders title and subtitle", () => {
    render(<CVPreview onClose={onClose} />);
    expect(screen.getByText(personalInfo.downloadCVLabel)).toBeInTheDocument();
    expect(screen.getByText(/pick a theme/i)).toBeInTheDocument();
  });

  it("renders theme layout tags", () => {
    render(<CVPreview onClose={onClose} />);
    expect(screen.getAllByText("Single Column").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Two Column").length).toBeGreaterThan(0);
  });

  it("renders theme descriptions", () => {
    render(<CVPreview onClose={onClose} />);
    expect(screen.getByText(/traditional black/i)).toBeInTheDocument();
    expect(screen.getByText(/navy header/i)).toBeInTheDocument();
  });

  it("switches to all themes covering both layout types", () => {
    render(<CVPreview onClose={onClose} />);
    fireEvent.click(screen.getByText("Executive"));
    expect(screen.getByText(/Download Executive CV/)).toBeInTheDocument();
    fireEvent.click(screen.getByText("Sidebar"));
    expect(screen.getByText(/Download Sidebar CV/)).toBeInTheDocument();
    fireEvent.click(screen.getByText("Compact"));
    expect(screen.getByText(/Download Compact CV/)).toBeInTheDocument();
  });

  it("closes on Escape key", () => {
    render(<CVPreview onClose={onClose} />);
    fireEvent.keyDown(window, { key: "Escape" });
  });

  it("closes on overlay click", () => {
    const { container } = render(<CVPreview onClose={onClose} />);
    const overlay = container.firstChild;
    if (overlay) fireEvent.click(overlay);
  });
});
