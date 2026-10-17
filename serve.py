#!/usr/bin/env python3
"""Run the approved Exhale Osteopathy design locally.

Usage:  python3 serve.py            (then open http://localhost:8765/)
        python3 serve.py 9000       (use a different port)

Needs only Python 3.7+ (no installs). Fonts load from Google Fonts when online;
offline copies are in assets/fonts/.
"""
import http.server, os, sys, glob, webbrowser

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'source')
BLOB = os.path.join(HERE, 'assets', 'blob')
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765

PAGES = [
    ('Homepage', 'Main.dc.html'), ('About / Our Clinic', 'About.dc.html'),
    ('Pricing', 'Pricing.dc.html'), ('Contact', 'Contact.dc.html'),
    ('Osteopath Birmingham', 'Birmingham.dc.html'), ('Blog', 'Blog.dc.html'),
    ('Blog article', 'BlogPost.dc.html'),
    ('Osteopathy', 'Service.dc.html'), ('Physiotherapy', 'Physiotherapy.dc.html'),
    ('Sports Massage', 'Massage.dc.html'), ('Laser Therapy', 'Laser.dc.html'),
    ('Cranial Osteopathy', 'Cranial.dc.html'), ('Baby & Paediatric', 'Paediatric.dc.html'),
    ('Pregnancy', 'Pregnancy.dc.html'), ('Acupuncture', 'Acupuncture.dc.html'),
    ('1-to-1 Rehab / Pilates', 'Rehab.dc.html'), ('Shockwave', 'Shockwave.dc.html'),
    ('Diagnostic Ultrasound', 'Ultrasound.dc.html'),
    ('Hafi Rahman', 'Practitioner.dc.html'), ('Zoe Goodwin', 'Zoe.dc.html'),
    ('Freta', 'Freta.dc.html'), ('Ankita', 'Ankita.dc.html'), ('Emre', 'Emre.dc.html'),
    ('Back Pain', 'Condition.dc.html'), ('Neck Pain', 'Neck-Pain.dc.html'),
    ('Shoulder Pain', 'Shoulder-Pain.dc.html'), ('Hip Pain', 'Hip-Pain.dc.html'),
    ('Knee Pain', 'Knee-Pain.dc.html'), ('Foot & Ankle Pain', 'Foot-Ankle-Pain.dc.html'),
    ('Headaches', 'Headaches.dc.html'), ('Sciatica', 'Sciatica.dc.html'),
    ('Sports Injuries', 'Sports-Injuries.dc.html'), ('Tendon Problems', 'Tendon-Problems.dc.html'),
    ('TMJ / Jaw Pain', 'Jaw-Pain.dc.html'),
]


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path in ('/', '/index.html'):
            body = ('<!doctype html><meta charset="utf-8"><title>Exhale approved design</title>'
                    '<body style="font:16px system-ui;background:#F5F2EA;color:#272B26;padding:40px">'
                    '<h1>Exhale Osteopathy - approved design (backup)</h1><ul>' +
                    ''.join(f'<li><a href="/{f}">{n}</a></li>' for n, f in PAGES) +
                    '</ul></body>').encode()
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        return super().do_GET()

    def translate_path(self, path):
        p = path.split('?')[0].split('#')[0]
        if p.startswith('/_blob/'):
            hits = glob.glob(os.path.join(BLOB, p[7:].strip('/') + '.*'))
            if hits:
                return hits[0]
        return os.path.join(SRC, p.lstrip('/'))

    def log_message(self, *a):
        pass


if __name__ == '__main__':
    url = f'http://localhost:{PORT}/'
    print(f'Serving the approved design at {url}  (Ctrl+C to stop)')
    try:
        webbrowser.open(url)
    except Exception:
        pass
    http.server.ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()
