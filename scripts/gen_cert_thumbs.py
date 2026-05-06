"""Generate 4:3 thumbnails (WebP + PNG fallback) for every PDF in
public/assets/certificates.

Strategy: render the first page at high DPI, then *cover-crop* (scale so the
shorter side matches and crop excess from the long side, top-biased) so the
content fills the 4:3 frame without letterbox / zoomed-out look.
We emit both a `.webp` (modern, ~70% smaller) and a `.png` fallback so the
React side can use `<picture>` with `<source type="image/webp">`.
"""
import os
import fitz  # PyMuPDF
from PIL import Image

SRC = os.path.join("public", "assets", "certificates")
DST = os.path.join(SRC, "thumbs")
TARGET_W, TARGET_H = 1000, 750  # 4:3, slightly larger for retina
RENDER_DPI = 200  # render quality

os.makedirs(DST, exist_ok=True)


def cover_crop(img: Image.Image, tw: int, th: int, top_bias: float = 0.25) -> Image.Image:
    """Scale to *cover* tw x th and crop the excess.

    top_bias < 0.5 keeps more of the top of the page (where titles/logos
    typically live). 0.5 = perfectly centered crop.
    """
    src_ratio = img.width / img.height
    tgt_ratio = tw / th

    if src_ratio < tgt_ratio:
        # Source is taller (portrait-ish): scale by width, crop height
        new_w = tw
        new_h = int(img.height * (tw / img.width))
    else:
        # Source is wider: scale by height, crop width
        new_h = th
        new_w = int(img.width * (th / img.height))

    img = img.resize((new_w, new_h), Image.LANCZOS)

    left = max(0, (new_w - tw) // 2)
    top = max(0, int((new_h - th) * top_bias))
    return img.crop((left, top, left + tw, top + th))


for fname in sorted(os.listdir(SRC)):
    if not fname.lower().endswith(".pdf"):
        continue
    base = os.path.splitext(fname)[0]
    out_png = os.path.join(DST, base + ".png")
    out_webp = os.path.join(DST, base + ".webp")
    try:
        doc = fitz.open(os.path.join(SRC, fname))
        page = doc.load_page(0)
        zoom = RENDER_DPI / 72  # PDF default 72 dpi
        mat = fitz.Matrix(zoom, zoom)
        pix = page.get_pixmap(matrix=mat, alpha=False)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        thumb = cover_crop(img, TARGET_W, TARGET_H, top_bias=0.2)
        thumb.save(out_png, "PNG", optimize=True)
        thumb.save(out_webp, "WEBP", quality=82, method=6)
        doc.close()
        print(f"OK  {fname}  ({os.path.getsize(out_webp) // 1024}KB webp / "
              f"{os.path.getsize(out_png) // 1024}KB png)")
    except Exception as e:
        print(f"ERR {fname}: {e}")

