#!/usr/bin/env python3
"""
Scrape gallery images for properties that have no gallery in data/properties.json.
Visits each property page on shineasiaestate.co and extracts wp-content/uploads URLs.
Strips WordPress thumbnail size suffixes (e.g. -800x533) to get full-res URLs.
"""

import json
import re
import sys
import time
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed

DATA_FILE = "/Users/zack/Desktop/shine-asia-luxury/data/properties.json"
BASE_URL = "https://shineasiaestate.co/property"
MAX_WORKERS = 15
TIMEOUT = 25

# Strip WordPress thumbnail size suffix: -800x533.jpg → .jpg
THUMB_RE = re.compile(r"-\d+x\d+(?=\.(jpg|jpeg|png|webp))", re.IGNORECASE)
IMG_RE = re.compile(
    r"https://shineasiaestate\.co/wp-content/uploads/[^\"'\s?]+\.(?:jpg|jpeg|png|webp)",
    re.IGNORECASE,
)


def full_size(url: str) -> str:
    return THUMB_RE.sub("", url)


def fetch_page(slug: str):
    url = f"{BASE_URL}/{slug}/"
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                          "AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/120.0.0.0 Safari/537.36"
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        print(f"  HTTP {e.code} for {slug}", file=sys.stderr)
        return None
    except Exception as e:
        print(f"  Error fetching {slug}: {e}", file=sys.stderr)
        return None


def extract_images(html: str) -> list[str]:
    raw_urls = IMG_RE.findall(html)
    full_urls = {full_size(u) for u in raw_urls}
    # Exclude tiny icons and logos
    filtered = [u for u in full_urls if not re.search(r"/(logo|icon|favicon|placeholder)", u, re.I)]
    return sorted(filtered)


def extract_og_image(html: str):
    # Handle both attribute orderings
    patterns = [
        r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']',
        r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']',
    ]
    for pat in patterns:
        m = re.search(pat, html, re.IGNORECASE)
        if m:
            return full_size(m.group(1))
    return None


def scrape_property(prop: dict) -> dict:
    slug = prop["slug"]
    html = fetch_page(slug)
    if not html:
        return {"slug": slug, "hero": None, "gallery": []}

    gallery = extract_images(html)
    hero = extract_og_image(html)
    if not hero and gallery:
        hero = gallery[0]

    return {"slug": slug, "hero": hero, "gallery": gallery}


def main():
    with open(DATA_FILE) as f:
        props = json.load(f)

    to_scrape = [p for p in props if not p.get("gallery")]
    print(f"Properties without gallery: {len(to_scrape)}", file=sys.stderr)

    results: dict[str, dict] = {}
    done = 0

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as pool:
        futures = {pool.submit(scrape_property, p): p["slug"] for p in to_scrape}
        for fut in as_completed(futures):
            result = fut.result()
            results[result["slug"]] = result
            done += 1
            if done % 50 == 0:
                print(f"  {done}/{len(to_scrape)} scraped...", file=sys.stderr)

    # Merge results back into props
    updated_hero = 0
    updated_gallery = 0
    for prop in props:
        r = results.get(prop["slug"])
        if not r:
            continue
        if not prop.get("image") and r["hero"]:
            prop["image"] = r["hero"]
            updated_hero += 1
        if not prop.get("gallery") and r["gallery"]:
            prop["gallery"] = r["gallery"]
            updated_gallery += 1

    with open(DATA_FILE, "w") as f:
        json.dump(props, f, ensure_ascii=False, indent=2)

    print(f"\nDone: hero updated={updated_hero}, gallery updated={updated_gallery}")
    print(f"Properties now with gallery: {sum(1 for p in props if p.get('gallery'))}/{len(props)}")


if __name__ == "__main__":
    main()
