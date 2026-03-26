---
title: "GPX Import API"
type: "projects"
parent: "API Documentation"
weight: 20
since: "v1.6.0"
---
|since|v1.6.0|.version-badge|

The GPX Import API endpoint allows you to programmatically upload GPX files to Reitti, enabling automated location data imports.

### Endpoint

```
POST /api/v1/gpx/import
```

### Usage

This endpoint is useful for:

- **Automated Imports**: Automatically upload GPX files from other tracking devices or applications
- **Batch Processing**: Import historical location data from various sources
- **Integration Scripts**: Connect Reitti with other location tracking systems
- **Data Migration**: Transfer location data from other platforms

### Authentication

Include your API token either as a header or query parameter:

```bash
# Using header
curl -X POST -H "X-API-TOKEN: your-api-token" \
     -F "file=@your-track.gpx" \
     https://your-reitti-instance/api/v1/gpx/import

# Using query parameter
curl -X POST -F "file=@your-track.gpx" \
     https://your-reitti-instance/api/v1/gpx/import?token=your-api-token
```

### Request Format

Send the GPX file as a multipart form upload with the field name `file`.

### Response

The endpoint returns a JSON response confirming the import:

```json
{
  "pointsScheduled": 2139,
  "success": true,
  "message": "Successfully imported GPX file with 2139 location points"
}
```

#### Response Fields

- **pointsScheduled**: Number of location points that were imported from the GPX file
- **success**: Boolean indicating if the import was successful
- **message**: Descriptive message about the import operation

### What Can Be Achieved

- **Device Integration**: Automatically import tracks from GPS devices, fitness trackers, or other apps
- **Backup Restoration**: Restore location data from GPX backups
- **Multi-Source Tracking**: Combine location data from multiple tracking sources
- **Historical Data Import**: Add old location data to your Reitti timeline
- **Automated Workflows**: Create scripts that regularly import GPX files from specific directories
