---
title: "Latest Location API"
type: "projects"
parent: "API Documentation"
weight: 10
since: "v1.6.0"
---
|since|v1.6.0|.version-badge|

The Latest Location API endpoint allows you to verify if location data is actively flowing into Reitti for a specific user.

### Endpoint

```
GET /api/v1/latest-location
```

### Usage

This endpoint is particularly useful for:

- **Scripting**: Automated checks to ensure location tracking is working
- **Home Assistant Automations**: Create automations based on location data availability
- **Alerting Systems**: Set up notifications when location data stops flowing
- **Monitoring**: Regular health checks of your location tracking setup

### Authentication

Include your API token either as a header or query parameter:

```bash
# Using header
curl -H "X-API-TOKEN: your-api-token" https://your-reitti-instance/api/v1/latest-location

# Using query parameter
curl https://your-reitti-instance/api/v1/latest-location?token=your-api-token
```

### Response

The endpoint returns a JSON response with information about the latest location data:

```json
{
  "point": {
    "latitude": 53.86329752,
    "longitude": 10.70105392,
    "timestamp": "2026-01-27T12:25:35Z",
    "accuracyMeters": 10.951032638549805,
    "elevationMeters": null,
    "valid": true
  },
  "hasLocation": true
}
```

#### Response Fields

- **pointsScheduled**: Number of location points that have been processed
- **success**: Boolean indicating if the operation was successful
- **message**: Descriptive message about the current status

### What Can Be Achieved

- **Automated Monitoring**: Set up scripts that regularly check if your phone is sending location data
- **Smart Home Integration**: Use the response in Home Assistant to trigger automations when you're actively moving
- **Data Quality Assurance**: Ensure your location tracking is working consistently
- **Troubleshooting**: Quickly identify if there are issues with your mobile app or data flow
S