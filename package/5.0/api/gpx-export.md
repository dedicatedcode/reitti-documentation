---
title: "GPX Export API"
type: "projects"
parent: "API Documentation"
weight: 30
since: "v1.6.0"
---
|since|v1.6.0|.version-badge|

The GPX Export API endpoint allows you to export your location data from Reitti as GPX files for a specified date range.

### Endpoint

```
GET /api/v1/gpx/export?start=YYYY-MM-DD&end=YYYY-MM-DD
```

### Usage

This endpoint is useful for:

- **Data Backup**: Create regular backups of your location data
- **External Analysis**: Export data for use in other mapping or analysis tools
- **Data Portability**: Move your location data to other platforms
- **Custom Processing**: Use exported data in your own applications or scripts

### Authentication

Include your API token either as a header or query parameter:

```bash
# Using header
curl -H "X-API-TOKEN: your-api-token" \
     "https://your-reitti-instance/api/v1/gpx/export?start=2025-09-11&end=2025-09-13" \
     -o exported-track.gpx

# Using query parameter
curl "https://your-reitti-instance/api/v1/gpx/export?start=2025-09-11&end=2025-09-13&token=your-api-token" \
     -o exported-track.gpx
```
### Parameters

- **start**: Start date in YYYY-MM-DD format (inclusive)
- **end**: End date in YYYY-MM-DD format (inclusive)

Both parameters are required.

### Response

The endpoint returns a GPX file containing all location points within the specified date range. The response has the content type `application/gpx+xml`.

### Example

```bash
# Export location data for a specific date range
curl -H "X-API-TOKEN: your-api-token" \
     "https://your-reitti-instance/api/v1/gpx/export?start=2025-09-11&end=2025-09-13" \
     -o my-location-data.gpx
```

### What Can Be Achieved

- **Regular Backups**: Automate daily, weekly, or monthly exports of your location data
- **Data Analysis**: Import the GPX files into mapping software like QGIS or GPS analysis tools
- **Sharing Tracks**: Export specific trips or time periods to share with others
- **Migration**: Move your location data to other location tracking platforms
- **Custom Visualizations**: Use the exported data to create custom maps or visualizations
- **Compliance**: Export data for personal data requests or regulatory compliance
