---
title: "FIT Import API"
type: "projects"
parent: "API Documentation"
weight: 30
since: "v5.1.0"
---
|since|v5.1.0|.version-badge|

The FIT Import API endpoint allows you to programmatically upload FIT files to Reitti, enabling automated location data imports from fitness devices.

### Endpoint

```
POST /api/v2/fit/import
```

### Usage

This endpoint is useful for:

- **Automated Imports**: Automatically upload FIT files from fitness trackers, smartwatches, or cycling computers
- **Batch Processing**: Import historical activity data from various sources
- **Integration Scripts**: Connect Reitti with other fitness tracking systems
- **Data Migration**: Transfer activity data from other platforms

### Authentication

Include your API token either as a header or query parameter:

```bash
# Using header
curl -X POST -H "X-API-TOKEN: your-api-token" \
     -F "file=@your-activity.fit" \
     https://your-reitti-instance/api/v2/fit/import

# Using query parameter
curl -X POST -F "file=@your-activity.fit" \
     https://your-reitti-instance/api/v2/fit/import?token=your-api-token
```

### Request Format

Send the FIT file as a multipart form upload with the field name `file`.

### Response

The endpoint returns a JSON response confirming the import:

```json
{
  "pointsScheduled": 2139,
  "success": true,
  "message": "Successfully imported FIT file with 2139 location points"
}
```

#### Response Fields

- **pointsScheduled**: Number of location points that were imported from the FIT file
- **success**: Boolean indicating if the import was successful
- **message**: Descriptive message about the import operation

### What Can Be Achieved

- **Fitness Device Integration**: Automatically import tracks from Garmin, Suunto, Polar, or other fitness devices
- **Activity Tracking**: Incorporate detailed activity data into your location history
- **Backup Restoration**: Restore location data from FIT backups
- **Multi-Source Tracking**: Combine location data from multiple fitness tracking sources
- **Historical Data Import**: Add old activity data to your Reitti timeline
- **Automated Workflows**: Create scripts that regularly import FIT files from specific directories
