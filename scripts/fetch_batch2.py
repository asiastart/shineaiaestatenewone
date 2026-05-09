#!/usr/bin/env python3
"""
Fetch properties pages 3 and 4 from WordPress REST API and transform to schema.
Output: data/raw/props-batch-2.json
"""

import json
import re
import html
import urllib.request
import urllib.error
import os
import sys

API_BASE = "https://shineasiaestate.co/wp-json/wp/v2/properties"
OUTPUT_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "raw", "props-batch-2.json")


def fetch_page(page: int) -> list:
    url = f"{API_BASE}?per_page=100&page={page}&_embed=1"
    print(f"Fetching page {page}: {url}", file=sys.stderr)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            print(f"  -> {len(data)} properties returned", file=sys.stderr)
            return data
    except urllib.error.HTTPError as e:
        print(f"  HTTP error {e.code} for page {page}: {e.reason}", file=sys.stderr)
        return []
    except Exception as e:
        print(f"  Error fetching page {page}: {e}", file=sys.stderr)
        return []


def extract_id(slug: str, wp_id: int) -> str:
    """Extract VIL code from slug."""
    match = re.search(r'(vil\d+)$', slug, re.IGNORECASE)
    if match:
        return match.group(1).upper()
    return f"VIL{wp_id}"


def decode_html(text: str) -> str:
    """Decode HTML entities."""
    return html.unescape(text) if text else ""


def strip_html(text: str) -> str:
    """Strip HTML tags."""
    return re.sub(r'<[^>]+>', '', text).strip()


def extract_location(class_list: list) -> str:
    """Extract location from class_list, preferring property_area- over property_city-."""
    area_result = ""
    city_result = ""
    for cls in class_list:
        if cls.startswith("property_area-"):
            raw = cls[len("property_area-"):]
            area_result = " ".join(word.capitalize() for word in raw.split("-"))
        elif cls.startswith("property_city-"):
            raw = cls[len("property_city-"):]
            city_result = " ".join(word.capitalize() for word in raw.split("-"))
    # Prefer area (more specific), fall back to city
    return area_result or city_result


# Ordered list of known Koh Samui area names (for slug extraction)
# Key: hyphenated slug fragment, Value: display name
AREA_MAP = {
    "north-samui": "North",
    "south-samui": "South",
    "chaweng": "Chaweng",
    "chaweng-noi": "Chaweng Noi",
    "lamai": "Lamai",
    "bophut": "Bophut",
    "maenam": "Maenam",
    "bangpor": "Bang Por",
    "bang-por": "Bang Por",
    "nathon": "Nathon",
    "taling-ngam": "Taling Ngam",
    "lipa-noi": "Lipa Noi",
    "choeng-mon": "Choeng Mon",
    "thong-krut": "Thong Krut",
    "ban-tai": "Ban Tai",
    "bangrak": "Bangrak",
    "bang-rak": "Bangrak",
    "plai-laem": "Plai Laem",
    "koh-fan": "Koh Fan",
    "fisherman-village": "Bophut",
    "bang-makham": "Bang Makham",
    "bangrak": "Bangrak",
    "bang-rak": "Bangrak",
    "cheong-mon": "Choeng Mon",
    "mae-nam": "Maenam",
}

# Location display names from slug fragments (ordered longest match first)
SLUG_AREA_PATTERNS = [
    ("chaweng-noi", "Chaweng Noi"),
    ("taling-ngam", "Taling Ngam"),
    ("lipa-noi", "Lipa Noi"),
    ("choeng-mon", "Choeng Mon"),
    ("cheong-mon", "Choeng Mon"),
    ("thong-krut", "Thong Krut"),
    ("ban-tai", "Ban Tai"),
    ("plai-laem", "Plai Laem"),
    ("bang-por", "Bang Por"),
    ("bangpor", "Bang Por"),
    ("bang-makham", "Bang Makham"),
    ("bang-rak", "Bangrak"),
    ("bangrak", "Bangrak"),
    ("north-samui", "North Samui"),
    ("south-samui", "South Samui"),
    ("koh-fan", "Koh Fan"),
    ("fisherman-village", "Bophut"),
    ("mae-nam", "Maenam"),
    ("maenam", "Maenam"),
    ("bophut", "Bophut"),
    ("chaweng", "Chaweng"),
    ("lamai", "Lamai"),
    ("nathon", "Nathon"),
]


def extract_location_from_slug(slug: str) -> str:
    """Attempt to extract area name from slug."""
    for pattern, name in SLUG_AREA_PATTERNS:
        if pattern in slug:
            return name
    return ""


def extract_location_from_terms(embedded: dict) -> str:
    """Extract location from embedded wp:term taxonomy terms."""
    terms = embedded.get("wp:term", [])
    area_name = ""
    city_name = ""
    for group in terms:
        for term in group:
            tax = term.get("taxonomy", "")
            name = term.get("name", "")
            if tax == "property_area" and name:
                area_name = name
            elif tax == "property_city" and name and name.lower() != "koh samui":
                # Only use city if it's more specific than generic "Koh Samui"
                city_name = name
    return area_name or city_name


def extract_destination(class_list: list):
    """Extract destination area from class_list."""
    for cls in class_list:
        if cls.startswith("property_area-"):
            area_slug = cls[len("property_area-"):]
            if area_slug in AREA_MAP:
                return AREA_MAP[area_slug]
            # Try partial match
            for key, val in AREA_MAP.items():
                if key in area_slug or area_slug in key:
                    return val
    return None


def extract_type(class_list: list) -> str:
    for cls in class_list:
        if cls == "property_type-villa":
            return "Villa"
        if cls == "property_type-apartment":
            return "Apartment"
        if cls == "property_type-condo":
            return "Condo"
    return "Villa"


def extract_status(class_list: list) -> str:
    for cls in class_list:
        if cls == "property_status-for-sale":
            return "for-sale"
        if cls == "property_status-sold":
            return "sold"
        if cls == "property_status-rent":
            return "for-rent"
    return "for-sale"


def extract_subtitle(content_html: str, excerpt_html: str) -> str:
    """Get first bullet point from content, or fall back to excerpt."""
    # Try to find first <li> in content
    li_match = re.search(r'<li[^>]*>(.*?)</li>', content_html, re.DOTALL | re.IGNORECASE)
    if li_match:
        text = decode_html(strip_html(li_match.group(1))).strip()
        if text:
            return text[:120]
    # Fall back to excerpt
    text = decode_html(strip_html(excerpt_html)).strip()
    return text[:120]


def extract_features(content_html: str) -> list:
    """Extract up to 10 <li> items from content, stripped of HTML, max 80 chars each."""
    items = re.findall(r'<li[^>]*>(.*?)</li>', content_html, re.DOTALL | re.IGNORECASE)
    features = []
    for item in items:
        text = decode_html(strip_html(item)).strip()
        # Clean up whitespace
        text = re.sub(r'\s+', ' ', text)
        if text:
            features.append(text[:80])
        if len(features) >= 10:
            break
    return features


def safe_int(value):
    """Safely convert to int."""
    if value is None:
        return None
    try:
        return int(float(str(value).replace(',', '')))
    except (ValueError, TypeError):
        return None


def transform(wp: dict) -> dict:
    """Transform a WP property object to our schema."""
    slug = wp.get("slug", "")
    wp_id = wp.get("id", 0)
    prop_id = extract_id(slug, wp_id)

    title_raw = wp.get("title", {}).get("rendered", "")
    title = decode_html(title_raw)

    content_html = wp.get("content", {}).get("rendered", "")
    excerpt_html = wp.get("excerpt", {}).get("rendered", "")
    subtitle = extract_subtitle(content_html, excerpt_html)

    meta = wp.get("property_meta", {})

    def meta_val(key, idx=0):
        vals = meta.get(key, [])
        if isinstance(vals, list) and len(vals) > idx:
            return vals[idx]
        return None

    price_raw = meta_val("fave_property_price")
    price_thb = safe_int(price_raw) or 0

    # Extract _embedded early so it's available for location logic
    embedded = wp.get("_embedded", {})

    class_list = wp.get("class_list", [])
    if not class_list:
        class_list = []

    # Location: try class_list first, then embedded terms, then slug
    location = extract_location(class_list)
    if not location or location.lower() == "koh samui":
        term_location = extract_location_from_terms(embedded)
        if term_location:
            location = term_location
        else:
            slug_location = extract_location_from_slug(slug)
            if slug_location:
                location = slug_location
            elif not location:
                location = "Koh Samui"

    destination = extract_destination(class_list)
    # Also try to derive destination from location
    if destination is None:
        for key, val in AREA_MAP.items():
            if key.replace("-", " ") in location.lower() or location.lower() in key.replace("-", " "):
                destination = val
                break
    bedrooms_raw = meta_val("fave_property_bedrooms")
    bedrooms = safe_int(bedrooms_raw) if bedrooms_raw is not None else 0
    bathrooms_raw = meta_val("fave_property_bathrooms")
    bathrooms = safe_int(bathrooms_raw)
    size_raw = meta_val("fave_property_size")
    size_sqm = safe_int(size_raw)
    land_raw = meta_val("fave_property_land")
    land_sqm = safe_int(land_raw)

    prop_type = extract_type(class_list)
    status = extract_status(class_list)

    # Featured image from _embedded
    image = None
    featured_media = embedded.get("wp:featuredmedia", [])
    if featured_media and isinstance(featured_media, list) and len(featured_media) > 0:
        media_item = featured_media[0]
        if isinstance(media_item, dict):
            image = media_item.get("source_url")

    featured_val = meta_val("fave_featured")
    featured = featured_val == "1"

    # Gallery IDs
    gallery_ids_raw = meta.get("fave_property_images", [])
    if not isinstance(gallery_ids_raw, list):
        gallery_ids_raw = [gallery_ids_raw] if gallery_ids_raw else []
    gallery_ids = []
    for gid in gallery_ids_raw:
        val = safe_int(gid)
        if val is not None:
            gallery_ids.append(val)

    features = extract_features(content_html)

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

    for page in [3, 4]:
        wp_items = fetch_page(page)
        for item in wp_items:
            try:
                transformed = transform(item)
                all_properties.append(transformed)
            except Exception as e:
                print(f"  Error transforming item id={item.get('id')}: {e}", file=sys.stderr)

    # Ensure output directory exists
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(all_properties, f, ensure_ascii=False, indent=2)

    print(f"Batch 2: {len(all_properties)} properties written to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
