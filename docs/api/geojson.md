---
title: "GeoJSON API"
type: "projects"
parent: "API Documentation"
weight: 25
---

The GeoJSON API endpoints allow you to export and import location data in GeoJSON format, enabling interoperability with other mapping and GIS tools.

### Endpoints

```
GET /api/v1/geojson/export?start={YYYY-MM-DD}&end={YYYY-MM-DD}&device={deviceId}
```

```
POST /api/v1/geojson/import
```

### Usage

These endpoints are useful for:

- **Export**: Generate GeoJSON files for use in GIS applications, custom maps, or data analysis
- **Import**: Upload GeoJSON files from other sources to populate your location history

### Authentication

Include your API token either as a header or query parameter:

```bash
# Using header
curl -H "X-API-TOKEN: your-api-token" \
     "https://your-reitti-instance/api/v1/geojson/export?start=2025-09-11&end=2025-09-13" \
     -o locations.geojson

# Using query parameter
curl "https://your-reitti-instance/api/v1/geojson/export?start=2025-09-11&end=2025-09-13&token=your-api-token" \
     -o locations.geojson
```

### Export Endpoint

```
GET /api/v1/geojson/export?start={YYYY-MM-DD}&end={YYYY-MM-DD}&device={deviceId}
```

#### Parameters

| Parameter | Type   | Required | Description                                                                 |
|-----------|--------|----------|-----------------------------------------------------------------------------|
| `start`   | string | Yes      | Start date in YYYY-MM-DD format (inclusive)                                 |
| `end`     | string | Yes      | End date in YYYY-MM-DD format (inclusive)                                   |
| `device`  | long   | No       | Optional device ID to filter results to a specific device                   |

#### Response

The endpoint returns a GeoJSON FeatureCollection containing all location points within the specified date range. The response has the content type `application/json`.

```bash
# Export location data for a specific date range
curl -H "X-API-TOKEN: your-api-token" \
     "https://your-reitti-instance/api/v1/geojson/export?start=2025-09-11&end=2025-09-13" \
     -o my-locations.geojson
```

### Import Endpoint

```
POST /api/v1/geojson/import
```


#### Request Format

Send the GeoJSON file as a multipart form upload with the field name `file`. Only files with `.geojson` or `.json` extensions are accepted.

#### Parameters

| Parameter | Type | Required | Description                                             |
|-----------|------|----------|---------------------------------------------------------|
| `file`    | file | Yes      | The GeoJSON file to upload                              |
| `device`  | long | No       | Optional device ID to override where the data is stored |

By default, imported data is associated with the device linked to your API token. If you specify a `device` parameter,
it overrides this and stores the data under the specified device instead.

```bash
# Import a GeoJSON file (data stored under device linked to token)
curl -X POST -H "X-API-TOKEN: your-api-token" \
     -F "file=@locations.geojson" \
     https://your-reitti-instance/api/v1/geojson/import

# Import a GeoJSON file with explicit device override
curl -X POST -H "X-API-TOKEN: your-api-token" \
     -F "file=@locations.geojson" \
     -F "device=42" \
     https://your-reitti-instance/api/v1/geojson/import
```

#### Response

The endpoint returns a JSON response confirming the import:

```json
{
  "pointsScheduled": 2139,
  "success": true,
  "message": "Successfully imported GeoJSON file with 2139 location points"
}
```

#### Response Fields

- **pointsScheduled**: Number of location points that were imported from the GeoJSON file
- **success**: Boolean indicating if the import was successful
- **message**: Descriptive message about the import operation

### What Can Be Achieved

- **Export**: Generate GeoJSON files for use in GIS applications, custom maps, or data analysis
- **Import**: Upload GeoJSON files from other sources to populate your location history
- **Data Migration**: Transfer location data between systems using the GeoJSON format
- **Custom Visualizations**: Use exported data in tools like QGIS, Leaflet, or Mapbox