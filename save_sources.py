import os
import requests

routes = [
    ("home", "https://weybee.com/"),
    ("about_us", "https://weybee.com/about-us/"),
    ("it_staff_augmentation", "https://weybee.com/it-staff-augmentation/"),
    ("software_development_services", "https://weybee.com/software-development-services/"),
    ("it_services_for_startups", "https://weybee.com/it-services-for-startups/"),
    ("data_engineering", "https://weybee.com/data-engineering/"),
    ("careers", "https://weybee.com/careers/"),
    ("contact_us", "https://weybee.com/contact-us/")
]

source_dir = os.path.join(os.getcwd(), "page_sources")
if not os.path.exists(source_dir):
    os.makedirs(source_dir)

headers = {'User-Agent': 'Mozilla/5.0'}

for name, url in routes:
    try:
        res = requests.get(url, headers=headers)
        if res.status_code == 200:
            file_path = os.path.join(source_dir, f"{name}.html")
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(res.text)
            print(f"Saved source for {name}")
        else:
            print(f"Failed to fetch {url}: {res.status_code}")
    except Exception as e:
        print(f"Error for {name}: {e}")

print("Verification complete. All page sources saved.")
