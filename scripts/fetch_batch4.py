#!/usr/bin/env python3
"""Fetch page 7 of WP properties and write to data/raw/props-batch-4.json"""

import json
import re
import urllib.request
import urllib.error
import html
import os

API_URL = "https://shineasiaestate.co/wp-json/wp/v2/properties?per_page=100&page=7&_embed=1"
OUTPUT_PATH = "/Users/zack/Desktop/shine-asia-luxury/data/raw/props-batch-4.json"


# ── helpers ──────────────────────────────────────────────────────────────────

def strip_html(text: str) -> str:
    """Remove HTML tags and decode entities."""
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    return text.strip()


def decode_title(raw: str) -> str:
    return html.unescape(raw).strip()


def extract_id(slug: str, wp_id: int) -> str:
    m = re.search(r"(vil\d+)$", slug, re.IGNORECASE)
    if m:
        return m.group(1).upper()
    m = re.search(r"(vil\d+)", slug, re.IGNORECASE)
    if m:
        return m.group(1).upper()
    return f"VIL{wp_id}"


def humanize_class(cls: str) -> str:
    """'property_city-koh-samui' → 'Koh Samui'"""
    part = re.sub(r"^property_(city|area|region|location)-", "", cls)
    return " ".join(w.capitalize() for w in part.split("-"))


def extract_location(class_list: list) -> str:
    for cls in class_list:
        if cls.startswith("property_city-"):
            return humanize_class(cls)
    for cls in class_list:
        if cls.startswith("property_area-"):
            return humanize_class(cls)
    return ""


AREA_MAP = {
    "chaweng": "Chaweng",
    "lamai": "Lamai",
    "bophut": "Bophut",
    "maenam": "Maenam",
    "bangpor": "Bang Por",
    "bang-por": "Bang Por",
    "nathon": "Nathon",
    "taling-ngam": "Taling Ngam",
    "choeng-mon": "Choeng Mon",
    "choengmon": "Choeng Mon",
    "lipa-noi": "Lipa Noi",
    "lipa noi": "Lipa Noi",
    "north-samui": "North Samui",
    "south-samui": "South Samui",
    "east-samui": "East Samui",
    "west-samui": "West Samui",
    "plai-laem": "Plai Laem",
    "bang-rak": "Bang Rak",
    "bangrak": "Bang Rak",
    "fishermans-village": "Fishermans Village",
    "fisherman": "Fishermans Village",
    "big-buddha": "Big Buddha",
    "koh-samui": "Koh Samui",
    "samui": "Koh Samui",
}


def extract_destination(class_list: list):
    for cls in class_list:
        if cls.startswith("property_area-") or cls.startswith("property_city-"):
            part = re.sub(r"^property_(area|city)-", "", cls)
            if part in AREA_MAP:
                return AREA_MAP[part]
            # partial match
            for key, val in AREA_MAP.items():
                if key in part:
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
        if "property_type-land" in cls:
            return "Land"
        if "property_type-house" in cls:
            return "House"
    return "Villa"


def extract_status(class_list: list) -> str:
    for cls in class_list:
        if "property_status-sold" in cls:
            return "sold"
        if "property_status-rent" in cls or "property_status-for-rent" in cls:
            return "for-rent"
        if "property_status-for-sale" in cls or "property_status-sale" in cls:
            return "for-sale"
    return "for-sale"


def extract_subtitle(content_html: str, excerpt_html: str) -> str:
    # First bullet point from content
    bullets = re.findall(r"<li[^>]*>(.*?)</li>", content_html, re.DOTALL | re.IGNORECASE)
    for b in bullets:
        text = strip_html(b)
        if text:
            return text[:120]
    # fallback to excerpt
    text = strip_html(excerpt_html)
    return text[:120]


def extract_features(content_html: str) -> list:
    bullets = re.findall(r"<li[^>]*>(.*?)</li>", content_html, re.DOTALL | re.IGNORECASE)
    result = []
    for b in bullets:
        text = strip_html(b)
        if text:
            result.append(text[:80])
        if len(result) >= 10:
            break
    return result


def safe_int(val, default=0):
    try:
        return int(float(str(val).replace(",", "").strip()))
    except (ValueError, TypeError):
        return default


def safe_int_or_none(val):
    try:
        v = int(float(str(val).replace(",", "").strip()))
        return v if v > 0 else None
    except (ValueError, TypeError):
        return None


# ── transform ────────────────────────────────────────────────────────────────

def transform(wp: dict) -> dict:
    meta = wp.get("property_meta", {})
    class_list = wp.get("class_list", [])
    slug = wp.get("slug", "")
    wp_id = wp.get("id", 0)

    # id
    prop_id = extract_id(slug, wp_id)

    # title
    title_raw = (wp.get("title") or {}).get("rendered", "")
    title = decode_title(title_raw)

    # subtitle & features from content
    content_html = (wp.get("content") or {}).get("rendered", "")
    excerpt_html = (wp.get("excerpt") or {}).get("rendered", "")
    subtitle = extract_subtitle(content_html, excerpt_html)
    features = extract_features(content_html)

    # price
    price_raw = (meta.get("fave_property_price") or [None])[0]
    price_thb = safe_int(price_raw, 0)

    # location & destination
    location = extract_location(class_list)
    destination = extract_destination(class_list)

    # bedrooms
    beds_raw = (meta.get("fave_property_bedrooms") or [None])[0]
    bedrooms = safe_int(beds_raw, 0)

    # bathrooms
    baths_raw = (meta.get("fave_property_bathrooms") or [None])[0]
    bathrooms = safe_int_or_none(baths_raw)

    # size / land
    size_raw = (meta.get("fave_property_size") or [None])[0]
    size_sqm = safe_int_or_none(size_raw)

    land_raw = (meta.get("fave_property_land") or [None])[0]
    land_sqm = safe_int_or_none(land_raw)

    # type & status
    prop_type = extract_type(class_list)
    status = extract_status(class_list)

    # image
    image = None
    try:
        embedded = wp.get("_embedded", {})
        media = embedded.get("wp:featuredmedia", [])
        if media and isinstance(media[0], dict):
            image = media[0].get("source_url")
    except Exception:
        pass

    # featured
    feat_raw = (meta.get("fave_featured") or [None])[0]
    featured = feat_raw == "1"

    # gallery_ids
    gallery_raw = meta.get("fave_property_images") or []
    gallery_ids = [int(x) for x in gallery_raw if x and str(x).isdigit()]

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


# ── main ─────────────────────────────────────────────────────────────────────

def main():
    print(f"Fetching: {API_URL}")
    req = urllib.request.Request(
        API_URL,
        headers={
            "User-Agent": "shine-asia-data-collector/1.0",
            "Accept": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        raw = resp.read().decode("utf-8")

    data = json.loads(raw)
    print(f"Received {len(data)} items from API")

    properties = [transform(wp) for wp in data]

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(properties, f, ensure_ascii=False, indent=2)

    print(f"Batch 4: {len(properties)} properties written to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
