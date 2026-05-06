import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

base_url = "https://weybee.com/"
resource_dir = os.path.join(os.getcwd(), "resources")

if not os.path.exists(resource_dir):
    os.makedirs(resource_dir)

def download_file(url, folder):
    try:
        response = requests.get(url, stream=True, timeout=10)
        if response.status_code == 200:
            parsed_url = urlparse(url)
            filename = os.path.basename(parsed_url.path)
            if not filename:
                filename = "index.html"
            filepath = os.path.join(folder, filename)
            
            # Avoid overwriting or weird filenames
            if not filename.split('.')[-1].lower() in ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'css', 'js', 'woff', 'woff2', 'ttf', 'eot']:
                return None

            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
            print(f"Downloaded: {filename}")
            return filename
    except Exception as e:
        print(f"Failed to download {url}: {e}")
    return None

print("Fetching main page...")
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
response = requests.get(base_url, headers=headers)
soup = BeautifulSoup(response.text, 'html.parser')

print("Extracting images...")
images = soup.find_all('img')
for img in images:
    src = img.get('src')
    if src:
        full_url = urljoin(base_url, src)
        download_file(full_url, resource_dir)

print("Extracting stylesheets...")
styles = soup.find_all('link', rel='stylesheet')
for style in styles:
    href = style.get('href')
    if href:
        full_url = urljoin(base_url, href)
        download_file(full_url, resource_dir)

print("Extracting scripts...")
scripts = soup.find_all('script')
for script in scripts:
    src = script.get('src')
    if src:
        full_url = urljoin(base_url, src)
        download_file(full_url, resource_dir)

print("Extracting routes (buttons/links)...")
routes = []
for a in soup.find_all('a'):
    href = a.get('href')
    text = a.get_text(strip=True)
    if href and href.startswith(('/', 'http')):
        routes.append({'text': text, 'href': href})

with open("routes_info.txt", "w", encoding="utf-8") as f:
    for route in routes:
        f.write(f"{route['text']} -> {route['href']}\n")

print("Done.")
