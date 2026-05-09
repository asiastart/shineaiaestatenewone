#!/usr/bin/env python3
"""Fetch properties pages 5 and 6 from WordPress REST API and transform to property schema."""

import json
import re
import urllib.request
import html
import sys

API_BASE = "https://shineasiaestate.co/wp-json/wp/v2/properties"
OUTPUT_FILE = "/Users/zack/Desktop/shine-asia-luxury/data/raw/props-batch-3.json"

# Koh Samui area slugs → display name + destination area
AREA_MAP = {
    "chaweng": ("Chaweng", "Chaweng"),
    "chaweng-noi": ("Chaweng Noi", "Chaweng"),
    "lamai": ("Lamai", "Lamai"),
    "bophut": ("Bophut", "Bophut"),
    "bo-phut": ("Bophut", "Bophut"),
    "maenam": ("Maenam", "Maenam"),
    "mae-nam": ("Maenam", "Maenam"),
    "bangpor": ("Bang Por", "Bangpor"),
    "bang-por": ("Bang Por", "Bangpor"),
    "nathon": ("Nathon", "Nathon"),
    "na-thon": ("Nathon", "Nathon"),
    "taling-ngam": ("Taling Ngam", "Taling Ngam"),
    "choeng-mon": ("Choeng Mon", "Choeng Mon"),
    "cheongmon": ("Choeng Mon", "Choeng Mon"),
    "lipa-noi": ("Lipa Noi", "Lipa Noi"),
    "plai-laem": ("Plai Laem", "Plai Laem"),
    "bang-kao": ("Bang Kao", "Bang Kao"),
    "bangkao": ("Bang Kao", "Bang Kao"),
    "hua-thanon": ("Hua Thanon", "Hua Thanon"),
    "namuang": ("Na Muang", "Na Muang"),
    "na-muang": ("Na Muang", "Na Muang"),
    "fishermans-village": ("Bophut", "Bophut"),
    "fisherman-s-village": ("Bophut", "Bophut"),
    "bangrak": ("Bangrak", "Bangrak"),
    "bang-rak": ("Bangrak", "Bangrak"),
    "north-samui": ("North Samui", "North"),
    "south-samui": ("South Samui", "South"),
    "koh-samui": ("Koh Samui", None),
    "samui": ("Koh Samui", None),
}


def fetch_page(page_num):
    """Fetch a single page from the API."""
    url = f"{API_BASE}?per_page=100&page={page_num}&_embed=1"
    print(f"Fetching page {page_num}: {url}", file=sys.stderr)
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (compatible; DataCollector/1.0)"}
    )
    with urllib.request.urlopen(req, timeout=90) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    return data


def strip_html(text):
    """Remove HTML tags from a string."""
    if not text:
        return ""
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def extract_id_from_slug(slug, wp_id):
    """Extract VIL code from slug."""
    match = re.search(r"(vil\d+)$", slug, re.IGNORECASE)
    if match:
        return match.group(1).upper()
    return f"VIL{wp_id}"


def humanize_class_location(class_name):
    """Convert class like 'property_city-koh-samui' to 'Koh Samui'."""
    for prefix in ("property_city-", "property_area-", "property_location-"):
        if class_name.startswith(prefix):
            slug = class_name[len(prefix):]
            # Check in area map first
            if slug in AREA_MAP:
                return AREA_MAP[slug][0]
            return " ".join(word.capitalize() for word in slug.split("-"))
    return None


def derive_location_from_class_list(class_list):
    """Find location from class list."""
    for cls in class_list:
        if cls.startswith("property_city-") or cls.startswith("property_area-"):
            return humanize_class_location(cls)
    return None


def derive_destination_from_class_list(class_list):
    """Derive destination from class list."""
    for cls in class_list:
        if cls.startswith("property_area-"):
            area_slug = cls[len("property_area-"):]
            if area_slug in AREA_MAP:
                return AREA_MAP[area_slug][1]
            # Partial match
            for key, (_, dest) in AREA_MAP.items():
                if key in area_slug or area_slug in key:
                    return dest
    return None


def derive_location_from_slug(slug):
    """Extract location and destination from slug by matching area keywords.

    Specific area names (bophut, chaweng, etc.) take priority over generic
    island-level names (koh-samui, samui).
    """
    # Generic/island-level keys to deprioritize
    GENERIC_KEYS = {"koh-samui", "samui"}

    slug_lower = slug.lower()
    best_key = None
    best_len = 0

    # First pass: specific areas only
    for key in AREA_MAP:
        if key in GENERIC_KEYS:
            continue
        if key in slug_lower and len(key) > best_len:
            best_key = key
            best_len = len(key)

    if best_key:
        location_name, destination = AREA_MAP[best_key]
        return location_name, destination

    # Second pass: generic island-level fallback
    if "koh-samui" in slug_lower or "samui" in slug_lower:
        return "Koh Samui", None

    return None, None


def derive_type_from_terms(embedded):
    """Derive property type from embedded wp:term."""
    for group in embedded.get("wp:term", []):
        for term in group:
            if term.get("taxonomy") == "property_type":
                name = term.get("name", "").lower()
                if "villa" in name:
                    return "Villa"
                if "apartment" in name:
                    return "Apartment"
                if "condo" in name:
                    return "Condo"
                # Return capitalized name as fallback
                return term.get("name", "Villa")
    return "Villa"


def derive_type_from_class_list(class_list):
    """Derive property type from class list."""
    for cls in class_list:
        if cls.startswith("property_type-"):
            type_slug = cls[len("property_type-"):]
            if "villa" in type_slug:
                return "Villa"
            if "apartment" in type_slug:
                return "Apartment"
            if "condo" in type_slug:
                return "Condo"
    return None


def derive_status_from_terms(embedded):
    """Derive status from embedded wp:term."""
    for group in embedded.get("wp:term", []):
        for term in group:
            if term.get("taxonomy") == "property_status":
                slug = term.get("slug", "")
                if slug == "for-sale":
                    return "for-sale"
                if slug == "sold":
                    return "sold"
                if slug in ("for-rent", "rent"):
                    return "for-rent"
                name = term.get("name", "").lower()
                if "rent" in name:
                    return "for-rent"
                if "sold" in name:
                    return "sold"
                if "sale" in name:
                    return "for-sale"
    return None


def derive_status_from_class_list(class_list):
    """Derive property status from class list."""
    for cls in class_list:
        if cls.startswith("property_status-"):
            status_slug = cls[len("property_status-"):]
            if "rent" in status_slug:
                return "for-rent"
            if "sold" in status_slug:
                return "sold"
            if "sale" in status_slug:
                return "for-sale"
    return None


def extract_features(content_html):
    """Extract list items from content HTML."""
    if not content_html:
        return []
    items = re.findall(r"<li[^>]*>(.*?)</li>", content_html, re.IGNORECASE | re.DOTALL)
    features = []
    for item in items:
        text = strip_html(item).strip()
        if text:
            features.append(text[:80])
        if len(features) >= 10:
            break
    return features


def extract_subtitle(content_html, excerpt_html):
    """Extract first bullet or fall back to excerpt."""
    if content_html:
        items = re.findall(r"<li[^>]*>(.*?)</li>", content_html, re.IGNORECASE | re.DOTALL)
        if items:
            text = strip_html(items[0]).strip()
            if text:
                return text[:120]
    if excerpt_html:
        text = strip_html(excerpt_html).strip()
        if text:
            return text[:120]
    return ""


def safe_int(value):
    """Convert to int safely, returning None on failure."""
    if value is None:
        return None
    try:
        s = str(value).strip()
        if not s or s in (",", "-", ""):
            return None
        return int(float(s))
    except (ValueError, TypeError):
        return None


def transform_property(wp_obj):
    """Transform a WP property object to our schema."""
    wp_id = wp_obj.get("id", 0)
    slug = wp_obj.get("slug", "")
    title_rendered = wp_obj.get("title", {}).get("rendered", "")
    title = html.unescape(title_rendered)
    content_html = wp_obj.get("content", {}).get("rendered", "")
    excerpt_html = wp_obj.get("excerpt", {}).get("rendered", "")

    class_list = wp_obj.get("class_list", []) or []
    embedded = wp_obj.get("_embedded", {}) or {}
    meta = wp_obj.get("property_meta", {}) or {}

    # --- Price ---
    price_raw = meta.get("fave_property_price", [None])
    price_val = safe_int(price_raw[0] if price_raw else None)
    price_thb = price_val if price_val is not None else 0

    # --- Bedrooms ---
    bed_raw = meta.get("fave_property_bedrooms", [None])
    bed_val = safe_int(bed_raw[0] if bed_raw else None)
    bedrooms = bed_val if bed_val is not None else 0

    # --- Bathrooms ---
    bath_raw = meta.get("fave_property_bathrooms", [None])
    bathrooms = safe_int(bath_raw[0] if bath_raw else None)

    # --- Size ---
    size_raw = meta.get("fave_property_size", [None])
    size_sqm = safe_int(size_raw[0] if size_raw else None)

    # --- Land ---
    land_raw = meta.get("fave_property_land", [None])
    land_sqm = safe_int(land_raw[0] if land_raw else None)

    # --- Featured image ---
    image = None
    featured_media = embedded.get("wp:featuredmedia", [])
    if featured_media and isinstance(featured_media, list):
        media = featured_media[0]
        if isinstance(media, dict):
            image = media.get("source_url")

    # --- Gallery IDs ---
    gallery_raw = meta.get("fave_property_images", [])
    gallery_ids = []
    if gallery_raw:
        for gid in gallery_raw:
            parsed = safe_int(gid)
            if parsed is not None:
                gallery_ids.append(parsed)

    # --- Featured flag ---
    featured_raw = meta.get("fave_featured", [None])
    featured = (featured_raw[0] if featured_raw else None) == "1"

    # --- Location: try class_list first, then slug ---
    # class_list gives the city level (e.g. "Koh Samui"); slug gives the neighborhood.
    location = derive_location_from_class_list(class_list)
    destination = derive_destination_from_class_list(class_list)

    # Always try the slug for a specific neighborhood destination,
    # even when class_list already gave us a city-level location.
    if destination is None:
        _, slug_destination = derive_location_from_slug(slug)
        if slug_destination is not None:
            destination = slug_destination

    # Only fall back to slug for the location itself when class_list gave nothing
    if location is None:
        location, slug_dest = derive_location_from_slug(slug)
        if destination is None:
            destination = slug_dest

    # --- Type: try terms first, then class_list ---
    prop_type = derive_type_from_terms(embedded)
    if prop_type == "Villa":
        # Double-check with class_list in case terms gave default
        from_class = derive_type_from_class_list(class_list)
        if from_class:
            prop_type = from_class

    # --- Status: try terms first, then class_list ---
    status = derive_status_from_terms(embedded)
    if status is None:
        status = derive_status_from_class_list(class_list)
    if status is None:
        status = "for-sale"

    return {
        "id": extract_id_from_slug(slug, wp_id),
        "slug": slug,
        "title": title,
        "subtitle": extract_subtitle(content_html, excerpt_html),
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
        "features": extract_features(content_html),
    }


def main():
    all_properties = []

    for page_num in [5, 6]:
        try:
            raw_items = fetch_page(page_num)
            print(f"  Page {page_num}: got {len(raw_items)} items", file=sys.stderr)
            for item in raw_items:
                transformed = transform_property(item)
                all_properties.append(transformed)
        except urllib.error.HTTPError as e:
            if e.code == 400:
                print(f"  Page {page_num}: HTTP 400 (likely no more pages), skipping", file=sys.stderr)
            else:
                raise

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(all_properties, f, ensure_ascii=False, indent=2)

    print(f"Batch 3: {len(all_properties)} properties written to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
