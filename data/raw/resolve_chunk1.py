#!/usr/bin/env python3
"""Resolve WP attachment IDs to source URLs for chunk 1."""
import json
import time
import urllib.request
import urllib.parse

INPUT_FILE = "/Users/zack/Desktop/shine-asia-luxury/data/raw/gallery-ids-chunk-1.json"
OUTPUT_FILE = "/Users/zack/Desktop/shine-asia-luxury/data/raw/gallery-urls-chunk-1.json"
BASE_URL = "https://shineasiaestate.co/wp-json/wp/v2/media"
BATCH_SIZE = 100


def fetch_batch(ids, attempt=1):
    params = urllib.parse.urlencode({
        "include": ",".join(str(i) for i in ids),
        "per_page": 100,
        "_fields": "id,source_url"
    })
    url = f"{BASE_URL}?{params}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            status = resp.status
            if status == 429:
                if attempt == 1:
                    print("  429 rate limit, sleeping 2s and retrying...")
                    time.sleep(2)
                    return fetch_batch(ids, attempt=2)
                else:
                    print("  429 rate limit on retry, skipping batch")
                    return []
            data = json.loads(resp.read().decode("utf-8"))
            return data
    except Exception as e:
        if attempt == 1:
            print(f"  Error: {e}, retrying after 1s...")
            time.sleep(1)
            return fetch_batch(ids, attempt=2)
        else:
            print(f"  Error on retry: {e}, skipping batch")
            return []


def main():
    with open(INPUT_FILE) as f:
        all_ids = json.load(f)

    total = len(all_ids)
    print(f"Loaded {total} IDs from {INPUT_FILE}")

    result = {}
    batches = [all_ids[i:i + BATCH_SIZE] for i in range(0, total, BATCH_SIZE)]
    num_batches = len(batches)

    for batch_num, batch in enumerate(batches, 1):
        print(f"  Batch {batch_num}/{num_batches} ({len(batch)} IDs)...", end=" ", flush=True)
        items = fetch_batch(batch)
        count = 0
        for item in items:
            if "id" in item and "source_url" in item and item["source_url"]:
                result[str(item["id"])] = item["source_url"]
                count += 1
        print(f"got {count} URLs (running total: {len(result)})")
        # Small polite delay between batches
        if batch_num < num_batches:
            time.sleep(0.3)

    with open(OUTPUT_FILE, "w") as f:
        json.dump(result, f, indent=2)

    print(f"\nChunk 1 resolved: {len(result)}/{total} IDs got URLs")
    print(f"Output written to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
