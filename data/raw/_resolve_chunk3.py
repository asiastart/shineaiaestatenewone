#!/usr/bin/env python3
"""Resolve WP attachment IDs to source URLs for chunk 3."""

import json
import time
import urllib.request
import urllib.parse
import urllib.error

INPUT_FILE = "/Users/zack/Desktop/shine-asia-luxury/data/raw/gallery-ids-chunk-3.json"
OUTPUT_FILE = "/Users/zack/Desktop/shine-asia-luxury/data/raw/gallery-urls-chunk-3.json"
BASE_URL = "https://shineasiaestate.co/wp-json/wp/v2/media"
BATCH_SIZE = 100
TOTAL_EXPECTED = 2809


def fetch_batch(ids: list[int], attempt: int = 1) -> list[dict]:
    """Fetch a batch of media items by ID."""
    params = urllib.parse.urlencode({
        "include": ",".join(str(i) for i in ids),
        "per_page": len(ids),
        "_fields": "id,source_url",
    })
    url = f"{BASE_URL}?{params}"

    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        if e.code == 429:
            print(f"  Rate limited (429). Sleeping 2s then retrying...")
            time.sleep(2)
            if attempt < 3:
                return fetch_batch(ids, attempt + 1)
            return []
        if attempt == 1:
            print(f"  HTTP {e.code} error. Retrying in 1s...")
            time.sleep(1)
            return fetch_batch(ids, attempt + 1)
        print(f"  HTTP {e.code} error after retry. Skipping batch.")
        return []
    except Exception as e:
        if attempt == 1:
            print(f"  Network error: {e}. Retrying in 1s...")
            time.sleep(1)
            return fetch_batch(ids, attempt + 1)
        print(f"  Network error after retry: {e}. Skipping batch.")
        return []


def main():
    # Load IDs
    with open(INPUT_FILE) as f:
        all_ids = json.load(f)

    print(f"Loaded {len(all_ids)} IDs from chunk 3")

    # Split into batches
    batches = [all_ids[i:i + BATCH_SIZE] for i in range(0, len(all_ids), BATCH_SIZE)]
    print(f"Processing {len(batches)} batches of up to {BATCH_SIZE} IDs each")

    results: dict[str, str] = {}

    for batch_num, batch in enumerate(batches, 1):
        print(f"Batch {batch_num}/{len(batches)} ({len(batch)} IDs)...", end=" ", flush=True)
        items = fetch_batch(batch)
        count = 0
        for item in items:
            if "id" in item and "source_url" in item and item["source_url"]:
                results[str(item["id"])] = item["source_url"]
                count += 1
        print(f"got {count} URLs (total so far: {len(results)})")

        # Small polite delay between batches
        if batch_num < len(batches):
            time.sleep(0.3)

    # Write output
    with open(OUTPUT_FILE, "w") as f:
        json.dump(results, f, indent=2)

    print(f"\nChunk 3 resolved: {len(results)}/{TOTAL_EXPECTED} IDs got URLs")
    print(f"Output written to: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
