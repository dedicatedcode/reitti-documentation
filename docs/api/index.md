---
title: "API Documentation"
tags: ["api"]
weight: 5
---

Reitti provides a REST API that allows you to interact with your location data programmatically. This is useful for automation, integrations with other systems, and custom applications.

### Authentication

All API endpoints require authentication using an API token. You can provide the token in two ways:

1. **HTTP Header**: Include the token in the `X-API-TOKEN` header
2. **Query Parameter**: Add the token as a `token` parameter in the URL

Example using header:
```bash
curl -H "X-API-TOKEN: your-api-token" https://your-reitti-instance/api/v1/latest-location
```

Example using query parameter:
```bash
curl https://your-reitti-instance/api/v1/latest-location?token=your-api-token
```

### Available Endpoints

| Endpoint                              | Description                                                                                            |
|---------------------------------------|--------------------------------------------------------------------------------------------------------|
| [Latest Location](latest-location.md) | Retrieve the most recent location point for a user. Useful for monitoring and health checks.           |
| [GPX Import](gpx-import.md)           | Upload GPX files to import location data programmatically. Supports automated batch imports.           |
| [GPX Export](gpx-export.md)           | Export location data as GPX files for a specified date range. Useful for backups and data portability. |
| [Visits](visits.md)                   | Retrieve visit data for places within a date range and optional geographic bounding box.               |
| [Ingest](ingest.md)                   | Send location data directly to Reitti for processing and storage. Supports Owntracks format.           |
| [GeoJSON](geojson.md)                 | Export and import location data in GeoJSON format for use with GIS tools and custom applications.      |
