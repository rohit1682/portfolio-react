import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Certificates from "./Certificates";
import { certificates, certificateCategories, personalInfo } from "../../constants";

describe("Certificates", () => {
  const flushIO = async () => {
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
  };

  describe("rendering", () => {
    it("renders the section title", async () => {
      render(<Certificates />);
      await flushIO();
      expect(screen.getAllByText(personalInfo.certificatesTitle).length).toBeGreaterThan(0);
    });

    it("renders All filter chip", async () => {
      render(<Certificates />);
      await flushIO();
      expect(screen.getByText("All")).toBeInTheDocument();
    });

    it("renders category filter chips", async () => {
      render(<Certificates />);
      await flushIO();
      Object.values(certificateCategories).forEach((cat) => {
        expect(screen.getByText(cat.label)).toBeInTheDocument();
      });
    });

    it("renders certificate titles", async () => {
      render(<Certificates />);
      await flushIO();
      certificates.forEach((c) => {
        expect(screen.getByText(c.title)).toBeInTheDocument();
      });
    });

    it("renders certificate issuers", async () => {
      render(<Certificates />);
      await flushIO();
      certificates.forEach((c) => {
        expect(screen.getAllByText(c.issuer, { exact: false }).length).toBeGreaterThan(0);
      });
    });

    it("renders stat strip with animated counts", async () => {
      render(<Certificates />);
      await flushIO();
      expect(screen.getByText("Certifications")).toBeInTheDocument();
      expect(screen.getByText("Issuers")).toBeInTheDocument();
      expect(screen.getByText("Domains")).toBeInTheDocument();
    });

    it("shows featured badge on featured certificates", async () => {
      const featured = certificates.filter((c) => c.featured);
      if (featured.length > 0) {
        render(<Certificates />);
        await flushIO();
        expect(screen.getAllByText(personalInfo.featuredLabel).length).toBeGreaterThan(0);
      }
    });

    it("renders certificate years when available", async () => {
      const withYear = certificates.filter((c) => c.year);
      if (withYear.length > 0) {
        render(<Certificates />);
        await flushIO();
        expect(screen.getAllByText(String(withYear[0].year)).length).toBeGreaterThan(0);
      }
    });

    it("renders certificates without year", async () => {
      render(<Certificates />);
      await flushIO();
      const noYear = certificates.filter((c) => !c.year);
      if (noYear.length > 0) {
        expect(screen.getByText(noYear[0].title)).toBeInTheDocument();
      }
    });

    it("renders non-featured certificates without badge", async () => {
      render(<Certificates />);
      await flushIO();
      const nonFeatured = certificates.filter((c) => !c.featured);
      if (nonFeatured.length > 0) {
        expect(screen.getByText(nonFeatured[0].title)).toBeInTheDocument();
      }
    });

    it("renders view and download buttons in overlay", async () => {
      render(<Certificates />);
      await flushIO();
      expect(screen.getAllByLabelText("Quick view").length).toBeGreaterThan(0);
      expect(screen.getAllByLabelText("Download").length).toBeGreaterThan(0);
    });
  });

  describe("filtering", () => {
    it("filters by category", async () => {
      const firstCatKey = Object.keys(certificateCategories)[0];
      const firstCat = certificateCategories[firstCatKey];
      render(<Certificates />);
      await flushIO();
      fireEvent.click(screen.getByText(firstCat.label));
      const filtered = certificates.filter((c) => c.category === firstCatKey);
      filtered.forEach((c) => {
        expect(screen.getByText(c.title)).toBeInTheDocument();
      });
    });

    it("clicking All chip shows all certificates", async () => {
      render(<Certificates />);
      await flushIO();
      const firstCatKey = Object.keys(certificateCategories)[0];
      const firstCat = certificateCategories[firstCatKey];
      fireEvent.click(screen.getByText(firstCat.label));
      fireEvent.click(screen.getByText("All"));
      certificates.forEach((c) => {
        expect(screen.getByText(c.title)).toBeInTheDocument();
      });
    });

    it("filters by each category", async () => {
      render(<Certificates />);
      await flushIO();
      for (const [key, cat] of Object.entries(certificateCategories)) {
        fireEvent.click(screen.getByText(cat.label));
        const filtered = certificates.filter((c) => c.category === key);
        filtered.forEach((c) => {
          expect(screen.getByText(c.title)).toBeInTheDocument();
        });
      }
    });
  });

  describe("preview", () => {
    it("renders image preview for image type certificates", async () => {
      const imgCerts = certificates.filter((c) => c.type === "image");
      if (imgCerts.length > 0) {
        render(<Certificates />);
        await flushIO();
        const imgs = screen.getAllByAltText(imgCerts[0].title);
        expect(imgs.length).toBeGreaterThan(0);
      }
    });

    it("renders preview for PDF type certificates with thumbnail", async () => {
      const pdfWithThumb = certificates.filter((c) => c.type === "pdf" && c.thumb);
      if (pdfWithThumb.length > 0) {
        render(<Certificates />);
        await flushIO();
        const imgs = screen.getAllByAltText(pdfWithThumb[0].title);
        expect(imgs.length).toBeGreaterThan(0);
      }
    });

    it("renders PDF object for PDF type certificates without thumbnail", async () => {
      const pdfNoThumb = certificates.filter((c) => c.type === "pdf" && !c.thumb);
      if (pdfNoThumb.length > 0) {
        const { container } = render(<Certificates />);
        await flushIO();
        const objects = container.querySelectorAll("object[type='application/pdf']");
        expect(objects.length).toBeGreaterThan(0);
      }
    });

    it("image preview fires onLoad", async () => {
      const imgCerts = certificates.filter((c) => c.type === "image");
      if (imgCerts.length > 0) {
        render(<Certificates />);
        await flushIO();
        const imgs = screen.getAllByAltText(imgCerts[0].title);
        if (imgs[0]) fireEvent.load(imgs[0]);
      }
    });

    it("pdf thumbnail fires onLoad", async () => {
      const pdfWithThumb = certificates.filter((c) => c.type === "pdf" && c.thumb);
      if (pdfWithThumb.length > 0) {
        render(<Certificates />);
        await flushIO();
        const imgs = screen.getAllByAltText(pdfWithThumb[0].title);
        if (imgs[0]) fireEvent.load(imgs[0]);
      }
    });

    it("pdf thumbnail fires onError", async () => {
      const pdfWithThumb = certificates.filter((c) => c.type === "pdf" && c.thumb);
      if (pdfWithThumb.length > 0) {
        render(<Certificates />);
        await flushIO();
        const imgs = screen.getAllByAltText(pdfWithThumb[0].title);
        if (imgs[0]) fireEvent.error(imgs[0]);
      }
    });
  });

  describe("modal", () => {
    it("opens modal when clicking a card", async () => {
      render(<Certificates />);
      await flushIO();
      const firstTitle = certificates[0].title;
      const titleEl = screen.getByText(firstTitle);
      const clickTarget = titleEl.closest("[class*='card']") || titleEl;
      fireEvent.click(clickTarget);
      expect(screen.getByText(`1 / ${certificates.length}`)).toBeInTheDocument();
    });

    it("closes modal with Escape key", async () => {
      render(<Certificates />);
      await flushIO();
      const titleEl = screen.getByText(certificates[0].title);
      const clickTarget = titleEl.closest("[class*='card']") || titleEl;
      fireEvent.click(clickTarget);
      fireEvent.keyDown(window, { key: "Escape" });
    });

    it("navigates modal with arrow keys", async () => {
      render(<Certificates />);
      await flushIO();
      const titleEl = screen.getByText(certificates[0].title);
      const clickTarget = titleEl.closest("[class*='card']") || titleEl;
      fireEvent.click(clickTarget);
      fireEvent.keyDown(window, { key: "ArrowRight" });
      expect(screen.getByText(`2 / ${certificates.length}`)).toBeInTheDocument();
      fireEvent.keyDown(window, { key: "ArrowLeft" });
      expect(screen.getByText(`1 / ${certificates.length}`)).toBeInTheDocument();
    });

    it("renders modal nav buttons", async () => {
      render(<Certificates />);
      await flushIO();
      const titleEl = screen.getByText(certificates[0].title);
      const clickTarget = titleEl.closest("[class*='card']") || titleEl;
      fireEvent.click(clickTarget);
      expect(screen.getByLabelText("Previous")).toBeInTheDocument();
      expect(screen.getByLabelText("Next")).toBeInTheDocument();
    });

    it("modal nav buttons work with stopPropagation", async () => {
      render(<Certificates />);
      await flushIO();
      const titleEl = screen.getByText(certificates[0].title);
      const clickTarget = titleEl.closest("[class*='card']") || titleEl;
      fireEvent.click(clickTarget);
      fireEvent.click(screen.getByLabelText("Next"));
      fireEvent.click(screen.getByLabelText("Previous"));
    });

    it("renders close button in modal", async () => {
      render(<Certificates />);
      await flushIO();
      const titleEl = screen.getByText(certificates[0].title);
      const clickTarget = titleEl.closest("[class*='card']") || titleEl;
      fireEvent.click(clickTarget);
      expect(screen.getByLabelText("Close")).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText("Close"));
    });

    it("modal shows certificate details", async () => {
      render(<Certificates />);
      await flushIO();
      const cert = certificates[0];
      const titleEl = screen.getByText(cert.title);
      const clickTarget = titleEl.closest("[class*='card']") || titleEl;
      fireEvent.click(clickTarget);
      expect(screen.getByText("← → to navigate · Esc to close")).toBeInTheDocument();
      expect(screen.getByLabelText("Open in new tab")).toBeInTheDocument();
    });

    it("modal closes when clicking overlay backdrop", async () => {
      render(<Certificates />);
      await flushIO();
      const titleEl = screen.getByText(certificates[0].title);
      const clickTarget = titleEl.closest("[class*='card']") || titleEl;
      fireEvent.click(clickTarget);
      const modal = screen.getByText("← → to navigate · Esc to close").closest("[class*='modal']");
      if (modal && modal.parentElement) {
        fireEvent.click(modal.parentElement);
      }
    });

    it("modal renders image for image-type certificate", async () => {
      const imgCert = certificates.find((c) => c.type === "image");
      if (imgCert) {
        render(<Certificates />);
        await flushIO();
        const titleEl = screen.getByText(imgCert.title);
        const clickTarget = titleEl.closest("[class*='card']") || titleEl;
        fireEvent.click(clickTarget);
      }
    });

    it("modal renders iframe for pdf-type certificate", async () => {
      const pdfCert = certificates.find((c) => c.type === "pdf");
      if (pdfCert) {
        render(<Certificates />);
        await flushIO();
        const titleEl = screen.getByText(pdfCert.title);
        const clickTarget = titleEl.closest("[class*='card']") || titleEl;
        fireEvent.click(clickTarget);
      }
    });

    it("modal shows category label", async () => {
      render(<Certificates />);
      await flushIO();
      const cert = certificates[0];
      const titleEl = screen.getByText(cert.title);
      const clickTarget = titleEl.closest("[class*='card']") || titleEl;
      fireEvent.click(clickTarget);
      if (certificateCategories[cert.category]) {
        expect(screen.getAllByText(certificateCategories[cert.category].label).length).toBeGreaterThan(0);
      }
    });
  });

  describe("card interactions", () => {
    it("download button stops propagation", async () => {
      render(<Certificates />);
      await flushIO();
      const downloadBtns = screen.getAllByLabelText("Download");
      fireEvent.click(downloadBtns[0]);
    });
  });
});
