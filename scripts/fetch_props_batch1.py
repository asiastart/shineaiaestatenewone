#!/usr/bin/env python3
"""
Fetch properties from WordPress REST API and transform to our property schema.
Pages 1 and 2, 100 items each = 200 total.
"""

from __future__ import annotations
import json
import re
import urllib.request
import urllib.error
import html
from pathlib import Path

BASE_URL = "https://shineasiaestate.co/wp-json/wp/v2/properties"
OUTPUT_PATH = Path(__file__).parent.parent / "data" / "raw" / "props-batch-1.json"

# --- helpers ---

def fetch_page(page: int) -> list:
    url = f"{BASE_URL}?per_page=100&page={page}&_embed=1"
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; shine-asia-data-collector/1.0)",
            "Accept": "application/json",
        }
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode("utf-8"))


def strip_html(text: str) -> str:
    """Remove HTML tags and decode entities."""
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    return " ".join(text.split()).strip()


def extract_id(slug: str, wp_id: int) -> str:
    """Extract VIL code from slug, e.g. '...vil0676' → 'VIL0676'."""
    m = re.search(r"(vil\d+)", slug, re.IGNORECASE)
    if m:
        return m.group(1).upper()
    return f"VIL{wp_id}"


def decode_title(raw: str) -> str:
    """HTML-entity-decode the rendered title."""
    return html.unescape(raw).strip()


def extract_subtitle(content_html: str, excerpt_html: str) -> str:
    """First <li> text from content; fallback to stripped excerpt."""
    # Try first <li> in content
    m = re.search(r"<li[^>]*>(.*?)</li>", content_html, re.DOTALL | re.IGNORECASE)
    if m:
        text = strip_html(m.group(1))
        if text:
            return text[:120]
    # Fallback: stripped excerpt
    text = strip_html(excerpt_html)
    return text[:120]


def extract_features(content_html: str, max_items: int = 10, max_chars: int = 80) -> list:
    """Extract all <li> text items from content HTML, up to max_items."""
    items = re.findall(r"<li[^>]*>(.*?)</li>", content_html, re.DOTALL | re.IGNORECASE)
    result = []
    for raw in items:
        text = strip_html(raw)
        if text:
            result.append(text[:max_chars])
        if len(result) >= max_items:
            break
    return result


def class_to_location(class_list: list) -> str | None:
    """Find property_city- or property_area- class and humanize."""
    for cls in class_list:
        for prefix in ("property_city-", "property_area-"):
            if cls.startswith(prefix):
                slug_part = cls[len(prefix):]
                return " ".join(w.capitalize() for w in slug_part.split("-"))
    return None


# Koh Samui area mapping (area slug → destination label)
AREA_DESTINATION_MAP = {
    "north-samui": "North",
    "south-samui": "South",
    "chaweng": "Chaweng",
    "chaweng-noi": "Chaweng",
    "lamai": "Lamai",
    "bophut": "Bophut",
    "maenam": "Maenam",
    "bangpor": "Bang Por",
    "bang-por": "Bang Por",
    "nathon": "Nathon",
    "taling-ngam": "Taling Ngam",
    "lipa-noi": "Lipa Noi",
    "hua-thanon": "Hua Thanon",
    "ban-hua-thanon": "Hua Thanon",
    "choeng-mon": "Choeng Mon",
    "big-buddha": "Big Buddha",
    "plai-laem": "Plai Laem",
    "bangrak": "Bangrak",
    "bang-rak": "Bangrak",
    "koh-samui": None,  # too generic
}


def extract_destination(class_list: list) -> str | None:
    for cls in class_list:
        if cls.startswith("property_area-"):
            area_slug = cls[len("property_area-"):]
            if area_slug in AREA_DESTINATION_MAP:
                return AREA_DESTINATION_MAP[area_slug]
            # Try partial match
            for key, val in AREA_DESTINATION_MAP.items():
                if key in area_slug or area_slug in key:
                    return val
    return None


def extract_type(class_list: list) -> str:
    for cls in class_list:
        if "property_type-villa" in cls:
            return "Villa"
        if "property_type-apartment" in cls:
            return "Apartment"
        if "property_type-condo" in cls:
            return "Condo"
    return "Villa"


def extract_status(class_list: list) -> str:
    for cls in class_list:
        if "property_status-for-sale" in cls or "property_status-sale" in cls:
            return "for-sale"
        if "property_status-sold" in cls:
            return "sold"
        if "property_status-rent" in cls or "property_status-for-rent" in cls:
            return "for-rent"
    return "for-sale"


def safe_int(val, default=0):
    try:
        return int(val)
    except (TypeError, ValueError):
        return default


def safe_int_or_none(val):
    try:
        v = int(val)
        return v
    except (TypeError, ValueError):
        return None


def get_meta_first(meta: dict, key: str):
    """Get first element from a property_meta list field."""
    vals = meta.get(key, [])
    if vals:
        return vals[0]
    return None


def transform(wp: dict) -> dict:
    wp_id = wp.get("id", 0)
    slug = wp.get("slug", "")
    title_rendered = wp.get("title", {}).get("rendered", "")
    content_rendered = wp.get("content", {}).get("rendered", "")
    excerpt_rendered = wp.get("excerpt", {}).get("rendered", "")
    meta = wp.get("property_meta", {})
    class_list = wp.get("class_list", [])
    embedded = wp.get("_embedded", {})

    # id
    prop_id = extract_id(slug, wp_id)

    # title (HTML-entity-decoded)
    title = decode_title(title_rendered)

    # subtitle
    subtitle = extract_subtitle(content_rendered, excerpt_rendered)

    # price
    price_raw = get_meta_first(meta, "fave_property_price")
    price_thb = safe_int(price_raw, 0)

    # location
    location = class_to_location(class_list) or ""

    # destination
    destination = extract_destination(class_list)

    # bedrooms
    bedrooms = safe_int(get_meta_first(meta, "fave_property_bedrooms"), 0)

    # bathrooms
    bathrooms = safe_int_or_none(get_meta_first(meta, "fave_property_bathrooms"))

    # size_sqm
    size_sqm = safe_int_or_none(get_meta_first(meta, "fave_property_size"))

    # land_sqm
    land_sqm = safe_int_or_none(get_meta_first(meta, "fave_property_land"))

    # type
    prop_type = extract_type(class_list)

    # status
    status = extract_status(class_list)

    # image
    image = None
    featured_media = embedded.get("wp:featuredmedia", [])
    if featured_media and isinstance(featured_media, list) and len(featured_media) > 0:
        fm = featured_media[0]
        if isinstance(fm, dict):
            image = fm.get("source_url")

    # featured
    featured_val = get_meta_first(meta, "fave_featured")
    featured = featured_val == "1"

    # gallery_ids
    gallery_raw = meta.get("fave_property_images", [])
    gallery_ids = []
    for g in gallery_raw:
        try:
            gallery_ids.append(int(g))
        except (TypeError, ValueError):
            pass

    # features
    features = extract_features(content_rendered)

    return {
        "id": prop_id,
        "slug": slug,
        "title": title,
        "subtitle": subtitle,
        "price_thb": price_thb,
        "location": location,
        "destination": destination,
        "bedrooms": bedrooms,
        "bathrooms": bathrooms,
        "size_sqm": size_sqm,
        "land_sqm": land_sqm,
        "type": prop_type,
        "status": status,
        "image": image,
        "featured": featured,
        "gallery_ids": gallery_ids,
        "features": features,
    }


def main():
    all_properties = []

    for page in (1, 2):
        print(f"Fetching page {page}...")
        try:
            items = fetch_page(page)
        except urllib.error.HTTPError as e:
            print(f"  HTTP {e.code} on page {page} — stopping early")
            break
        except Exception as e:
            print(f"  Error on page {page}: {e} — stopping early")
            break

        print(f"  Got {len(items)} items")
        for wp in items:
            try:
                all_properties.append(transform(wp))
            except Exception as ex:
                print(f"  Warning: transform failed for id={wp.get('id')}: {ex}")

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(all_properties, f, ensure_ascii=False, indent=2)

    print(f"Batch 1: {len(all_properties)} properties written to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
