import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

from playwright.sync_api import sync_playwright
import time

p = sync_playwright().start()
b = p.chromium.launch(headless=True)
page = b.new_page(viewport={"width": 1440, "height": 900})

page.on("console", lambda msg: print(f"CONSOLE: {msg.type}: {msg.text}"))

page.goto("http://localhost:8766", timeout=15000, wait_until="domcontentloaded")
time.sleep(2)

el = page.locator("h1, h2, h3")
for i in range(el.count()):
    txt = el.nth(i).inner_text()[:100]
    print(f"H{i+1}: {txt}")

body = page.locator("body").inner_text()
checks = [
    "Faltam", "grande dia", "Sim, estarei", "Nao poderei",
    "Confirme sua presenca", "Momentos", "Detalhes",
    "PIX", "Trilha", "Nossa historia",
    "Baixar Planilha", "confirmou presenca",
]
for c in checks:
    found = c.lower() in body.lower()
    print(f"  '{c}': {'OK' if found else 'MISSING'}")

b.close()
p.stop()
