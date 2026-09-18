# Palimpsest — app icons.
#
#   python build/make-icons.py
#
# The mark is the home screen's own motif: faint lines of undertext, written
# over, and one of the timeline's hollow rings sitting on its rail. Drawn at
# 4x and downsampled so the ring's edge stays clean at 48px.

import os
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'app', 'icons')
os.makedirs(OUT, exist_ok=True)

TOP = (122, 42, 140)       # --accent
BOTTOM = (75, 58, 168)     # --accent-2
UNDER = (255, 255, 255, 46)
RING = (255, 255, 255, 255)


def render(size, pad):
    S = size * 4
    img = Image.new('RGB', (S, S), TOP)
    px = img.load()
    for y in range(S):          # the wordmark's gradient, top to bottom
        t = y / (S - 1)
        c = tuple(round(TOP[i] + (BOTTOM[i] - TOP[i]) * t) for i in range(3))
        for x in range(S):
            px[x, y] = c
    layer = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    inner = S * (1 - 2 * pad)
    x0 = S * pad
    # Undertext: rounded strokes of differing length, like lines of a page.
    lh = inner / 7
    widths = [0.92, 0.70, 0.84, 0.0, 0.78, 0.60]
    for i, w in enumerate(widths):
        if not w:
            continue
        y = x0 + lh * (i + 0.9)
        d.rounded_rectangle([x0, y - lh * 0.17, x0 + inner * w, y + lh * 0.17], radius=lh * 0.17, fill=UNDER)
    # The rail and the ring, over the fourth (blank) line.
    ry = x0 + lh * 3.9
    d.rounded_rectangle([x0, ry - inner * 0.012, x0 + inner, ry + inner * 0.012], radius=inner * 0.012, fill=(255, 255, 255, 150))
    r = inner * 0.2
    cx = x0 + inner * 0.62
    d.ellipse([cx - r, ry - r, cx + r, ry + r], fill=TOP)
    d.ellipse([cx - r, ry - r, cx + r, ry + r], outline=RING, width=round(inner * 0.07))
    img = Image.alpha_composite(img.convert('RGBA'), layer).convert('RGB')
    return img.resize((size, size), Image.LANCZOS)


render(192, 0.14).save(os.path.join(OUT, 'icon-192.png'))
render(512, 0.14).save(os.path.join(OUT, 'icon-512.png'))
render(512, 0.24).save(os.path.join(OUT, 'icon-maskable-512.png'))
render(180, 0.14).save(os.path.join(OUT, 'apple-touch-icon.png'))
print('wrote app/icons/*.png')
