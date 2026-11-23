"""Lichfield Osteopathic Practice logo concepts in the style of the Exhale Osteopathy wordmark:
thin geometric capitals with wide spacing, one letter replaced by a gold symbol, and a bold
letter-spaced line underneath. Letters are drawn as strokes (no font needed); the line underneath
is Jost SemiBold converted to outlines, so the SVGs work anywhere."""
import math, os, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

OUT = os.path.join(os.path.dirname(__file__), 'out')
os.makedirs(OUT, exist_ok=True)
FONT = TTFont(os.path.join(os.path.dirname(__file__), 'font/jost-latin-600-normal.woff'))

W = 7.0          # stroke width (cap height = 100)
S = W / 2
GAP = 40.0       # space between letters

def L(x):  return f'M{x+S},0 V{100-S} H{x+56}', 56
def I(x):  return f'M{x+S},0 V100', W
def C(x):
    r = 50 - S; cx, cy = x + 50, 50; a = math.radians(42)
    x1, y1 = cx + r * math.cos(a), cy - r * math.sin(a)
    x2, y2 = cx + r * math.cos(a), cy + r * math.sin(a)
    return f'M{x1:.2f},{y1:.2f} A{r},{r} 0 1 0 {x2:.2f},{y2:.2f}', 50 + r * math.cos(a) + S
def H(x):  return f'M{x+S},0 V100 M{x+74-S},0 V100 M{x+S},50 H{x+74-S}', 74
def F(x):  return f'M{x+S},0 V100 M{x+S},{S} H{x+54} M{x+S},49 H{x+47}', 54
def E(x):  return f'M{x+56},{S} H{x+S} V{100-S} H{x+56} M{x+S},50 H{x+50}', 56
def D(x):
    r = 50 - S
    return f'M{x+S},{S} V{100-S} H{x+32} A{r},{r} 0 0 0 {x+32},{S} Z', 32 + r + S

GLYPH = {'L': L, 'I': I, 'C': C, 'H': H, 'F': F, 'E': E, 'D': D}

# ---- symbols that replace the first I (x = centre of the letter slot) ----
def spire(cx):
    """Lichfield Cathedral spire: a slender tower rising into a tall spire above the capitals."""
    hw = 13
    return (f'M{cx-hw},100 V30 L{cx},-40 L{cx+hw},30 V100 '     # tower and spire, one outline
            f'M{cx},-40 V-54 M{cx-5},-48 H{cx+5}'), 2 * hw + W     # finial with a small cross

def person(cx):
    """A standing figure: the I as a body, with a head above it (like Exhale's seated figure)."""
    return f'M{cx},20 V100', W, (cx, -4, 13)                     # body, head circle (cx, cy, r)

def spine(cx):
    """The I as a column of vertebrae."""
    segs, h, g, top = 7, 10.6, 4, 0
    paths = []
    for i in range(segs):
        y = top + i * (h + g)
        wv = 22 - abs(i - 3) * 1.6
        paths.append(f'M{cx-wv/2+h/2:.2f},{y+h/2:.2f} H{cx+wv/2-h/2:.2f}')
    return ' '.join(paths), 22, h

def wordmark(symbol):
    word = 'LICHFIELD'
    x, parts, gold, extra = 0.0, [], [], ''
    first_i = True
    for ch in word:
        if ch == 'I' and first_i and symbol != 'none':
            first_i = False
            if symbol == 'spire':
                d, w = spire(x + 8 + S / 2 * 0); cxw = 2 * 8 + W
                d, w = spire(x + w / 2)
                gold.append(('stroke', d))
            elif symbol == 'person':
                d, w, head = person(x + 6)
                w = 12
                d, _, head = person(x + w / 2)
                gold.append(('stroke', d)); gold.append(('circle', head))
            elif symbol == 'spine':
                d, w, h = spine(x + 11)
                gold.append(('round', (d, h)))
            x += w + GAP
            continue
        d, w = GLYPH[ch](x)
        parts.append(d)
        x += w + GAP
    return ' '.join(parts), gold, x - GAP

def text_path(text, width, y_top, cap):
    """Bold letter-spaced line under the wordmark, justified to the full width, as outlines."""
    gs = FONT.getGlyphSet(); cmap = FONT.getBestCmap(); upm = FONT['head'].unitsPerEm
    capH = FONT['OS/2'].sCapHeight or 700
    scale = cap / capH
    advs = [gs[cmap[ord(c)]].width * scale if c != ' ' else gs[cmap[32]].width * scale for c in text]
    # glyph ink width approximated by advance; spacing fills the rest
    n = len(text) - 1
    track = (width - sum(advs)) / n
    out, x = [], 0.0
    for c, a in zip(text, advs):
        if c != ' ':
            pen = SVGPathPen(gs)
            tp = TransformPen(pen, (scale, 0, 0, -scale, x, y_top + cap))
            gs[cmap[ord(c)]].draw(tp)
            out.append(pen.getCommands())
        x += a + track
    return ' '.join(out), track

def svg(symbol, ink, accent, bg=None, sub='OSTEOPATHIC PRACTICE'):
    letters, gold, width = wordmark(symbol)
    top = -56 if symbol in ('spire', 'person') else -6
    sub_top, sub_cap = 128, 22
    sp, _ = text_path(sub, width, sub_top, sub_cap)
    pad = 6
    vb = (-pad, top - pad, width + 2 * pad, sub_top + sub_cap - top + 2 * pad)
    g = []
    for kind, d in gold:
        if kind == 'stroke':
            g.append(f'<path d="{d}" fill="none" stroke="{accent}" stroke-width="{W}" stroke-linejoin="miter" stroke-linecap="butt"/>')
        elif kind == 'circle':
            cx, cy, r = d
            g.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{accent}" stroke-width="{W}"/>')
        elif kind == 'round':
            dd, h = d
            g.append(f'<path d="{dd}" fill="none" stroke="{accent}" stroke-width="{h}" stroke-linecap="round"/>')
    rect = f'<rect x="{vb[0]-40}" y="{vb[1]-40}" width="{vb[2]+80}" height="{vb[3]+80}" fill="{bg}"/>' if bg else ''
    vbx = (vb[0] - 40, vb[1] - 40, vb[2] + 80, vb[3] + 80) if bg else vb
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vbx[0]:.1f} {vbx[1]:.1f} {vbx[2]:.1f} {vbx[3]:.1f}" '
            f'role="img" aria-label="Lichfield Osteopathic Practice">{rect}'
            f'<path d="{letters}" fill="none" stroke="{ink}" stroke-width="{W}" stroke-linejoin="miter" stroke-linecap="butt"/>'
            + ''.join(g) + f'<path d="{sp}" fill="{ink}"/></svg>')

COL = {'dark': ('#2B2A1D', '#949366'), 'light': ('#FFFFFF', '#C3C18E')}
if __name__ == '__main__':
    import cairosvg
    for sym in ('spire', 'person', 'spine'):
        for mode, (ink, acc) in COL.items():
            s = svg(sym, ink, acc)
            p = os.path.join(OUT, f'lop-logo-{sym}-{mode}.svg'); open(p, 'w').write(s)
            bg = '#F4EFEB' if mode == 'dark' else '#3B3A28'
            cairosvg.svg2png(bytestring=svg(sym, ink, acc, bg=bg).encode(), write_to=os.path.join(OUT, f'preview-{sym}-{mode}.png'), output_width=1400)
    print('ok')
