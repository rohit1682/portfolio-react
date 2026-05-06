"""Generate 4:3 PNG thumbnails for every PDF in public/assets/certificates."""
import os
import fitz  # PyMuPDF

SRC = os.path.join("public", "assets", "certificates")
DST = os.path.join(SRC, "thumbs")
TARGET_W, TARGET_H = 800, 600  # 4:3

os.makedirs(DST, exist_ok=True)

for fname in sorted(os.listdir(SRC)):
    if not fname.lower().endswith(".pdf"):
        continue
    out = os.path.join(DST, os.path.splitext(fname)[0] + ".png")
    try:
        doc = fitz.open(os.path.join(SRC, fname))
        page = doc.load_page(0)
        rect = page.rect
        # Scale to fit width 800 first
        zoom = TARGET_W / rect.width
        mat = fitz.Matrix(zoom, zoom)
        pix = page.get_pixmap(matrix=mat, alpha=False)
        # Crop or pad to 4:3 (center)
        from PIL import Image
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        # Resize keeping aspect, then pad to target
        ratio = min(TARGET_W / img.width, TARGET_H / img.height)
        new_w, new_h = int(img.width * ratio), int(img.height * ratio)
        img = img.resize((new_w, new_h), Image.LANCZOS)
        canvas = Image.new("RGB", (TARGET_W, TARGET_H), (255, 255, 255))
        canvas.paste(img, ((TARGET_W - new_w) // 2, (TARGET_H - new_h) // 2))
        canvas.save(out, "PNG", optimize=True)
        doc.close()
        print(f"OK  {fname}")
    except Exception as e:
        print(f"ERR {fname}: {e}")
