import os
import requests
from bs4 import BeautifulSoup
import base64
import re
from urllib.parse import urljoin

base_url = "https://weybee.com/"
resource_dir = os.path.join(os.getcwd(), "resources")

if not os.path.exists(resource_dir):
    os.makedirs(resource_dir)

def save_base64_image(data_uri, filename):
    try:
        # data:image/svg+xml;base64,PHN...
        header, encoded = data_uri.split(",", 1)
        data = base64.b64decode(encoded)
        with open(os.path.join(resource_dir, filename), "wb") as f:
            f.write(data)
        print(f"Saved base64 image: {filename}")
    except Exception as e:
        print(f"Failed to save base64: {e}")

def download_file(url, folder, filename=None):
    try:
        if not filename:
            filename = url.split('/')[-1].split('?')[0]
        if not filename:
            filename = "unknown_image.png"
        
        filepath = os.path.join(folder, filename)
        response = requests.get(url, stream=True, timeout=10)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
            print(f"Downloaded: {filename}")
    except Exception as e:
        pass

headers = {'User-Agent': 'Mozilla/5.0'}
response = requests.get(base_url, headers=headers)
soup = BeautifulSoup(response.text, 'html.parser')

# Find all images (including data-src, src, srcset)
img_tags = soup.find_all('img')
count = 0
for img in img_tags:
    sources = [img.get('src'), img.get('data-src'), img.get('data-lazy-src')]
    for src in sources:
        if not src:
            continue
        if src.startswith('data:image'):
            ext = 'png'
            if 'svg+xml' in src: ext = 'svg'
            elif 'jpeg' in src: ext = 'jpg'
            elif 'gif' in src: ext = 'gif'
            save_base64_image(src, f"image_base64_{count}.{ext}")
            count += 1
        else:
            full_url = urljoin(base_url, src)
            download_file(full_url, resource_dir)

# Extract backgrounds from styles
styles = soup.find_all('style')
for style in styles:
    urls = re.findall(r'url\((.*?)\)', style.text)
    for u in urls:
        u = u.strip('\'"')
        if u.startswith('data:image'):
            save_base64_image(u, f"bg_base64_{count}.svg")
            count += 1
        elif u:
            full_url = urljoin(base_url, u)
            download_file(full_url, resource_dir)
            
print("Image extraction improved completed.")
