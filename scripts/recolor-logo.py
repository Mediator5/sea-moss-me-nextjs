"""
Recolour the Sea Moss Me logo.

Run from the project root:      python3 scripts/recolor-logo.py
Requires:                       pip install pillow numpy scipy

It reads your original white-background logo, works out which pixels belong to the
bird, the water and the sea moss wreath (by ink colour, then by connected shape —
the bird's teal and the water's teal are separate shapes, which is what makes the
split possible), and writes two recoloured masters to /tmp/logo/.

To change a colour, edit the hex values in the two build() calls at the bottom,
re-run this, then run scripts/rebuild-logo-assets.py to regenerate the lockups,
the mark and the favicon.
"""

from PIL import Image
import numpy as np
from scipy import ndimage

SRC = "brand-source/originals/sea_moss_me_logo_white_with_name_tagline.png"
MARK_END = 1198          # rows above this are the mark; below is the wordmark

def hex2rgb(h):
    h = h.lstrip("#")
    return np.array([int(h[i:i+2], 16) for i in (0, 2, 4)], dtype=float)

im = Image.open(SRC).convert("RGB")
a = np.asarray(im).astype(float)
H, W, _ = a.shape
white = np.array([255.0, 255.0, 255.0])

# ---- reference inks, measured from the file -------------------------------
REF = {
    "teal":   np.array([4.0,  74.0,  84.0]),
    "orange": np.array([226.0, 101.0, 51.0]),
    "gold":   np.array([210.0, 140.0, 34.0]),
}
names = list(REF)

# ---- un-blend each pixel from white: P = t*C + (1-t)*W --------------------
best_t = np.zeros((H, W)); best_res = np.full((H, W), 1e9); best_i = np.zeros((H, W), dtype=int)
for i, n in enumerate(names):
    C = REF[n]
    d = C - white                                   # direction away from white
    t = ((a - white) @ d) / (d @ d)                 # least-squares coverage
    t = np.clip(t, 0, 1)
    recon = white + t[..., None] * d
    res = np.linalg.norm(a - recon, axis=2)
    better = res < best_res
    best_res[better] = res[better]; best_t[better] = t[better]; best_i[better] = i

ink = best_t > 0.02
core = best_t > 0.80

teal_i, orange_i, gold_i = names.index("teal"), names.index("orange"), names.index("gold")
rows = np.arange(H)[:, None] * np.ones((1, W))
in_mark = rows < MARK_END

# ---- split the mark's teal into bird vs water ------------------------------
teal_core_mark = core & (best_i == teal_i) & in_mark
lab, n = ndimage.label(teal_core_mark, structure=np.ones((3, 3)))
sizes = ndimage.sum(teal_core_mark, lab, range(1, n + 1))
big = [c + 1 for c in range(n) if sizes[c] > 500]
cys = {c: ndimage.center_of_mass(lab == c)[0] for c in big}
bird_c = min(big, key=lambda c: cys[c])            # highest centroid = the bird
water_cs = [c for c in big if c != bird_c]
print(f"teal components in mark: {n} (big: {len(big)}) -> bird #{bird_c}, water {water_cs}")

bird_core  = (lab == bird_c)
water_core = np.isin(lab, water_cs)

# grow the two cores over every teal ink pixel in the mark (claims the anti-aliasing)
seed = np.zeros((H, W), dtype=int)
seed[bird_core] = 1
seed[water_core] = 2
_, idx = ndimage.distance_transform_edt(seed == 0, return_indices=True)
grown = seed[tuple(idx)]

teal_ink_mark = ink & (best_i == teal_i) & in_mark
REGION = np.zeros((H, W), dtype=int)              # 0 = untouched
REGION[teal_ink_mark & (grown == 1)] = 1          # bird body / head / tail
REGION[teal_ink_mark & (grown == 2)] = 2          # water
REGION[ink & (best_i == orange_i)] = 3            # bird wing + the "ME"
REGION[ink & (best_i == gold_i)] = 4              # sea moss wreath
REGION[ink & (best_i == teal_i) & ~in_mark] = 5   # wordmark + tagline

for r, label in [(1, "bird body"), (2, "water"), (3, "coral"), (4, "wreath"), (5, "wordmark")]:
    print(f"  region {r} {label:10s} {int((REGION == r).sum()):8d} px")

def build(colours, out_path):
    """colours: {region_id: '#rrggbb'} — anything missing keeps its original ink."""
    rgb = np.zeros((H, W, 3), dtype=float)
    for r in range(1, 6):
        m = REGION == r
        if not m.any():
            continue
        C = hex2rgb(colours[r]) if r in colours else REF[names[best_i[m][0]]]
        rgb[m] = C
    a_t = np.where(best_t < 0.03, 0.0, best_t)
    alpha = np.clip(a_t * 255, 0, 255)
    out = np.dstack([rgb, alpha]).astype(np.uint8)
    img = Image.fromarray(out, "RGBA")
    img = img.crop(img.getbbox())
    img.save(out_path)
    print("wrote", out_path, img.size)
    return img

# Standard artwork — for cream / light backgrounds
build({
    1: "#C9482C",   # bird body: deeper Sunrise Coral
    2: "#0F6B78",   # water: Caribbean Teal
    3: "#F26B4F",   # bird wing + "ME": Sunrise Coral
    4: "#D28C22",   # wreath: unchanged gold
    5: "#05454C",   # wordmark: Deep Petrol Teal
}, "/tmp/logo/full.png")

# Reversed artwork — for deep teal / dark backgrounds
build({
    1: "#FBA88F",   # bird body lifts to a light coral so it stays visible
    2: "#F9F2E4",   # water reads as cream on dark
    3: "#F26B4F",
    4: "#E5AF52",   # gold brightened a touch for dark grounds
    5: "#F9F2E4",
}, "/tmp/logo/full-light.png")
