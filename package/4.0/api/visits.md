---
title: "Visits API"
type: "projects"
parent: "API Documentation"
---
|since|v3.0.0|.version-badge|

### Endpoint

```
GET https://your-reitti-instance/api/v1/visits?startDate={YYYY-MM-DD}&endDate={YYYY-MM-DD}&timezone={IANA_TZ}&minLat={minLat}&maxLat={maxLat}&minLng={minLng}&maxLng={maxLng}
```

* `startDate` – **mandatory**. Inclusive start date (ISO‑8601, e.g. `2025-12-20`).  
* `endDate`   – **mandatory**. Inclusive end date (ISO‑8601).  
* `timezone`  – Optional. IANA time‑zone identifier (e.g. `Europe/Berlin`). If omitted, UTC is assumed.  
* `minLat`, `maxLat`, `minLng`, `maxLng` – Optional. Bounding‑box coordinates (decimal degrees) to filter visits to a geographic area.

### Usage

```bash
curl -H "X-API-TOKEN: your-api-token" \
  "https://your-reitti-instance/api/v1/visits?startDate=2025-12-20&endDate=2025-12-20&timezone=Europe/Berlin&minLat=53.80024529393479&maxLat=53.941538066746006&minLng=10.284576416015627&maxLng=11.075592041015627"
```

### Authentication

Include your API token either as a header or query parameter:

```bash
# Using header
curl -H "X-API-TOKEN: your-api-token" https://your-reitti-instance/api/v1/visits?...

# Using query parameter
curl https://your-reitti-instance/api/v1/visits?token=your-api-token&...
```

### Response

```json
{
  "places": [
    {
      "place": {
        "id": 9002,
        "name": "Fictional Place",
        "address": "123 Example Street, 00000 Example City",
        "city": "Example City",
        "countryCode": "xx",
        "lat": 0.0,
        "lng": 0.0,
        "type": "HOME"
      },
      "visits": [
        {
          "id": 20193252,
          "startTime": "2025-12-19T16:36:20Z",
          "endTime": "2025-12-20T06:04:00Z",
          "durationSeconds": 48460
        }
      ],
      "totalDurationMs": 48460000,
      "visitCount": 1,
      "color": "#646464",
      "lat": 0.0,
      "lng": 0.0
    }
  ]
}
```

#### Response Fields

- **places** – Array of place objects that contain a location and its associated visits.  
  - **place** – Information about the place (`id`, `name`, `address`, `city`, `countryCode`, `lat`, `lng`, `type`).  
  - **visits** – List of visits that occurred at this place within the requested time window.  
    - **id** – Unique identifier of the visit.  
    - **startTime** – ISO‑8601 timestamp when the visit started (UTC).  
    - **endTime** – ISO‑8601 timestamp when the visit ended (UTC).  
    - **durationSeconds** – Length of the visit in seconds.  
  - **totalDurationMs** – Sum of all visit durations for this place (in milliseconds).  
  - **visitCount** – Number of visits for this place in the requested period.  
  - **color** – Hex color used for visualization in the UI.  
  - **lat**, **lng** – Central coordinates of the place (repeated for convenience).

#### What Can Be Achieved

- **Audit location coverage** – Verify that a user’s home, work, or other important places are being recorded correctly.  
- **Detect gaps** – Identify days when no visits were recorded, indicating possible data‑ingestion issues.  
- **Generate reports** – Use the `totalDurationMs` and `visitCount` fields to build daily/weekly activity summaries.  
- **Integrate with external systems** – Feed the list of places and visits into BI tools, dashboards, or custom alerts.
