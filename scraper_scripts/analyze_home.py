import os
from bs4 import BeautifulSoup

filepath = os.path.join("b:/_Git/DEV/Babar-Meet/weybee/page_sources/home.html")
with open(filepath, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

main_content = soup.find('main') or soup.find('body')
if main_content:
    sections = main_content.find_all('section')
    print(f"Found {len(sections)} sections in home.html.")
    for idx, sec in enumerate(sections):
        print(f"\n--- Section {idx + 1} ---")
        headings = [h.get_text(strip=True) for h in sec.find_all(['h1', 'h2', 'h3'])]
        print("Headings:", headings)
        paragraphs = [p.get_text(strip=True)[:100] for p in sec.find_all('p')]
        if paragraphs:
            print("First P:", paragraphs[0])
        images = [img.get('src') for img in sec.find_all('img')]
        if images:
            print("Images:", len(images))
