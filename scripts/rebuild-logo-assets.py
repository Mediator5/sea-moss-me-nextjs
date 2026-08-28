"""
Regenerate every logo derivative from the two recoloured masters in /tmp/logo/.

Run from the project root:      python3 scripts/rebuild-logo-assets.py
Requires:                       pip install pillow numpy

Writes: public/images/logo-full{,-light}.png, logo-mark{,-light}.png,
        logo-lockup{,-light}.png, icon-source.png and src/app/icon.png
"""

from PIL import Image, ImageDraw
import numpy as np

OUT = "public/images"


def rows_gaps(img):
    a = np.asarray(img)[..., 3]
    rows = (a > 10).sum(axis=1)
    gaps, run = [], None
    for y, v in enumerate(rows):
        if v == 0 and run is None:
            run = y
        if v > 0 and run is not None:
            if y - run > 4:
                gaps.append((run, y))
            run = None
    return gaps


def derive(master, suffix):
    im = Image.open(master).convert("RGBA")
    mark_end, text_start = rows_gaps(im)[0]

    im.resize((900, round(im.height * 900 / im.width)), Image.LANCZOS).save(
        f"{OUT}/logo-full{suffix}.png"
    )

    mark = im.crop((0, 0, im.width, mark_end))
    mark = mark.crop(mark.getbbox())
    s = 512 / max(mark.size)
    mark_r = mark.resize((round(mark.width * s), round(mark.height * s)), Image.LANCZOS)
    mark_r.save(f"{OUT}/logo-mark{suffix}.png")

    text = im.crop((0, text_start, im.width, im.height))
    text = text.crop(text.getbbox())
    H, gap = 200, 34
    m = mark.resize((round(mark.width * H / mark.height), H), Image.LANCZOS)
    ts = (H * 0.78) / text.height
    t = text.resize((round(text.width * ts), round(text.height * ts)), Image.LANCZOS)
    lock = Image.new("RGBA", (m.width + gap + t.width, H), (0, 0, 0, 0))
    lock.alpha_composite(m, (0, 0))
    lock.alpha_composite(t, (m.width + gap, (H - t.height) // 2))
    lock.save(f"{OUT}/logo-lockup{suffix}.png")
    print(f"{suffix or '(dark)':8s} lockup {lock.size}  mark {mark_r.size}")
    return mark_r


derive("/tmp/logo/full.png", "")
mark_light = derive("/tmp/logo/full-light.png", "-light")

size = 512
bg = Image.new("RGBA", (size, size), (0, 0, 0, 0))
ImageDraw.Draw(bg).rounded_rectangle([0, 0, size - 1, size - 1], radius=110, fill=(5, 69, 76, 255))
sc = size * 0.70 / max(mark_light.size)
m2 = mark_light.resize((round(mark_light.width * sc), round(mark_light.height * sc)), Image.LANCZOS)
bg.alpha_composite(m2, ((size - m2.width) // 2, (size - m2.height) // 2))
bg.save(f"{OUT}/icon-source.png")
bg.save("src/app/icon.png")
print("favicon rebuilt")
