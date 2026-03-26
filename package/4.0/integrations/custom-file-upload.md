---
title: "Custom File Upload"
description: "Integrate custom scripts to upload GPX files to Reitti for automated location data import"
weight: 15
tags: ["integrations"]
---

## Custom File Upload Integration

Reitti supports automated import of GPX files through a custom script that watches a directory for new files and uploads them using the [GPX Import API](../api/gpx-import.md). This integration is particularly useful for apps like GPSLogger that can upload files via SFTP or other protocols, reducing the frequency of HTTP requests compared to real-time location sending.

### Prerequisites

- **inotify-tools**: For monitoring file system changes (install via `apt install inotify-tools` on Debian/Ubuntu or equivalent on other systems)
- **jq**: For parsing JSON responses from the API (install via `apt install jq` on Debian/Ubuntu)
- **curl**: For making HTTP requests (usually pre-installed on most Linux systems)
- **unzip**: For handling ZIP files (usually pre-installed)

### Setup

1. **Create a Watch Directory**: Set up a directory where GPSLogger or other apps can upload files. For example:
   ```bash
   sudo mkdir -p /var/lib/reitti/1
   sudo chown youruser:reitti /var/lib/reitti/1
   sudo chmod 775 /var/lib/reitti/1
   ```

2. **Configure Environment Variables**:
   - `REITTI_ENDPOINT`: Your Reitti instance URL (e.g., `https://your-reitti-instance.com`)
   - `REITTI_TOKEN`: Your API token from Reitti settings
   - `REITTI_WATCH_DIR`: The directory to watch (defaults to `/var/lib/reitti/1` if not set)

3. **Run the Script**: Save the script below as `reitti-file-watcher.sh`, make it executable, and run it:
   ```bash
   chmod +x reitti-file-watcher.sh
   ./reitti-file-watcher.sh
   ```

### Script

This script monitors the specified directory for new GPX and ZIP files. When a ZIP file is detected, it unzips it and removes the archive. When a GPX file is detected, it uploads it to Reitti using the GPX Import API.

```bash
#!/bin/bash

REITTI_WATCH_DIR="${REITTI_WATCH_DIR:-/var/lib/reitti/1}"

if [[ -z "$REITTI_ENDPOINT" ]]; then
  echo "Error: REITTI_ENDPOINT is not set."
  exit 1
fi

if [[ -z "$REITTI_TOKEN" ]]; then
  echo "Error: REITTI_TOKEN is not set."
  exit 1
fi

if [ ! -d "$REITTI_WATCH_DIR" ]; then
  echo "Error: Directory $REITTI_WATCH_DIR does not exist."
  exit 1
fi

inotifywait -m -e close_write "$REITTI_WATCH_DIR" --format '%w%f' |
while read FILE; do
  if [[ ! -f "$FILE" ]]; then
    continue
  fi

  case "$FILE" in
    *.zip)
      echo "Unzipping and removing $FILE"
      (cd "$REITTI_WATCH_DIR" && unzip -o "$FILE" >/dev/null && rm -f "$FILE")
      ;;
    *.gpx)
      echo "Importing $FILE"
      curl -s -X POST -H "X-API-TOKEN: ${REITTI_TOKEN}" -F "file=@${FILE}" "${REITTI_ENDPOINT}/api/v1/gpx/import" | jq -r '
        if .success == true then
          "Points scheduled: \(.pointsScheduled)"
        else
          if .message then
            "Import failed: \(.message)"
          else
            "Import failed due to unknown error."
          end
        end'
        ;;
    *)
      echo "Ignoring $FILE (unknown file type)"
      ;;
  esac
done
```

### Usage with GPSLogger

1. **Configure GPSLogger**: Set up GPSLogger to upload files to your watch directory via SFTP or another protocol. Configure it to send ZIP files containing GPX data at your desired interval (e.g., every 5 minutes).

2. **File Naming**: GPSLogger typically creates files with timestamps. The script handles both individual GPX files and ZIP archives containing GPX files.

3. **Benefits**: This approach reduces battery drain and server load compared to sending location points individually, as it batches uploads into fewer, larger requests.

### Troubleshooting

- **Permission Issues**: Ensure the script has read/write access to the watch directory and that uploaded files have appropriate permissions.
- **API Errors**: Check the script output for import failure messages. Verify your API token and endpoint URL.
- **File Handling**: If ZIP files aren't being processed, ensure `unzip` is installed and the archive contains valid GPX files.
- **Duplicate Imports**: Reitti automatically handles duplicate data points, so uploading the same GPX file multiple times won't create duplicates.

### Original Source

[@Hashworks](https://github.com/hashworks) contributed this integration in the [Reitti GitHub Discussions](https://github.com/dedicatedcode/reitti/discussions/355#discussioncomment-14785794).

For more information on the GPX Import API, see the [API documentation](../api/gpx-import.md).
