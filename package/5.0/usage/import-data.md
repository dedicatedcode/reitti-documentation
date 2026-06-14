---
title: "Import Data"
description: "Import location data into Reitti from various sources and formats."
weight: 10
tags: ["usage", "import", "data"]
---

Reitti allows you to import location data from various sources and formats. You can access the import functionality at **Settings > Import Data**.

## Import Location Data

The import page provides several options for uploading location data from different sources:

### GPX Files

Upload GPX files from your GPS devices or tracking apps. GPX files contain waypoints, tracks, and routes with timestamps that can be processed into your location history.

### GeoJSON Files

Upload GeoJSON files containing Point features with location data. GeoJSON files should contain Point geometries with coordinates and optional timestamp properties. Supports both single Feature and FeatureCollection formats.

### Android Timeline (timeline.json)

**Android:** From your Android phone: Settings → Location → Location Services → Timeline → Export Timeline

This exports a `timeline.json` file with your recent location data from Android devices.

### iOS Timeline (timeline.json)

**iOS:** From iOS Google Maps: Open Google Maps → Click on your Profile → Settings → Personal content → Export Timeline Data

This exports a `timeline.json` file with your recent location data from iOS devices.

### Google Timeline Old Format (Records.json)

Export your data from (https://takeout.google.com) and upload the `Records.json` file from the Location History folder.

This contains your complete historical location data.

## Import Process

1. **Select Format:** Choose the appropriate format for your data
2. **Upload File:** Upload the corresponding file
3. **Processing:** All geopoints will be scheduled for processing

## Monitoring Import Progress

After uploading files, you can monitor the import progress:

1. Navigate to **Settings > Job Status**
2. View the progress of your import jobs
3. Check for any errors or warnings

## Important Notes

- Large files may take significant time to process
- Check the Job Status page for detailed progress information
- Ensure your files contain valid timestamps for accurate location tracking
- Different formats may have different processing requirements
- **Cloudflare Users:** If Reitti is deployed behind Cloudflare, note that the free tier has a 100MB upload limit
- **Reverse Proxy Users:** If Reitti is behind a reverse proxy, ensure it is configured to allow large file uploads