import requests
from bs4 import BeautifulSoup

urls = [
    "https://weybee.com/about-us/",
    "https://weybee.com/it-staff-augmentation/",
    "https://weybee.com/software-development-services/",
    "https://weybee.com/contact-us/",
    "https://weybee.com/careers/"
]

headers = {'User-Agent': 'Mozilla/5.0'}

with open('pages_layout.txt', 'w', encoding='utf-8') as f:
    for url in urls:
        f.write(f"\n\n{'='*20}\nPAGE: {url}\n{'='*20}\n")
        try:
            res = requests.get(url, headers=headers)
            soup = BeautifulSoup(res.text, 'html.parser')
            # remove nav and footer
            for tag in soup(['nav', 'footer', 'header']):
                tag.decompose()
            # extract main headings and p text
            main_content = soup.find('main') or soup.find('body')
            if main_content:
                for tag in main_content.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'li']):
                    text = tag.get_text(strip=True)
                    if text:
                        f.write(f"[{tag.name.upper()}] {text}\n")
        except Exception as e:
            f.write(f"Error fetching {url}: {e}\n")
print("Pages layout extracted.")
