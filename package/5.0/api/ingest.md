---
title: "Ingest Data"
type: "projects"
parent: "API Documentation"
weight: 1
since: "v1.0.0"
---

The Ingest Data API endpoint allows you to send location data directly to Reitti for processing and storage. This is particularly useful for integrating with external systems or custom scripts that generate location updates.

### Endpoint

```
POST /api/v1/ingest/owntracks?token=API-TOKEN
```

### Usage

This endpoint is designed for:

- **Custom Integrations**: Develop your own location tracking solutions that push data to Reitti
- **Home Assistant Integration**: Send location data from Home Assistant automations or sensors
- **Scripting**: Use bash scripts or other automation tools to import location data from various sources
- **Third-Party Apps**: Integrate with apps that export location data in compatible formats

### Authentication

Include your API token as a query parameter in the URL:

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"_type": "location", "acc": 10, "lat": 37.7749, "lon": -122.4194, "tst": 1640995200}' \
  https://your-reitti-instance/api/v1/ingest/owntracks?token=your-api-token
```

### Request Body

The request body must be a JSON object containing location data. At minimum, it should include the following properties:

```json
{
  "_type": "location",
  "acc": 10,
  "lat": 37.7749,
  "lon": -122.4194,
  "tst": "2023-01-01T12:00:00Z"
}
```

Reitti will drop duplicate data points on import. A duplicate is defined as having the same token and the same timestamp.

#### Request Fields

- **_type**: String indicating the type of data being sent. For location data, this should always be "location".
- **acc**: Number representing the accuracy of the location in meters. Lower values indicate higher precision.
- **lat**: Number representing the latitude coordinate in decimal degrees (e.g., 37.7749 for San Francisco).
- **lon**: Number representing the longitude coordinate in decimal degrees (e.g., -122.4194 for San Francisco).
- **tst**: String representing the timestamp in ISO 8601 format (e.g., "2023-01-01T12:00:00Z"). Unix epoch seconds (as a number) are also supported.

### What Can Be Achieved

- **Real-Time Tracking**: Send live location updates from mobile devices or IoT sensors
- **Historical Data Import**: Batch import location data from exports or logs
- **Automation Workflows**: Integrate with smart home systems like Home Assistant for location-based triggers
- **Custom Monitoring**: Build monitoring solutions that feed location data into Reitti for analysis
- **Data Migration**: Transfer location data from other tracking services or applications
