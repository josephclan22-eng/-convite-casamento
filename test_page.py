from playwright.sync_api import sync_playwright
import time

p = sync_playwright().start()
b = p.chromium.launch(headless=True)
page = b.new_page(viewport={"width": 1440, "height": 900})
page.goto("http://localhost:8766", timeout=15000, wait_until="domcontentloaded")
time.sleep(2)

print("TITLE:", page.title())

body = page.locator("body").inner_text()

keywords = ["Elivaldo", "Sara", "Confirme", "Sim", "Nao", "Contagem regressiva", "Momentos", "Historia", "Detalhes", "Presenca", "Planilha", "PIX", "Trilha sonora"]
for kw in keywords:
    found = kw.lower() in body.lower()
    print(f'  "{kw}": {"OK" if found else "NOT FOUND"}')

print("\n--- BODY (first 3000 chars) ---")
print(body[:3000])

b.close()
p.stop()
