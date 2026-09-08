---
title: "Transportation Mode Detection"
description: "Adjust key parameters for the transportation mode detection"
weight: 6
tags: ["configuration"]
---
|since|v2.0.0|.version-badge|

Reitti's transportation mode detection automatically identifies the modes of transportation used during your trips based on speed and other parameters. The detection parameters can be customized to match your specific movement patterns and data frequency.

### Why Use Transportation Mode Detection?

Transportation mode detection enhances your location data by:

- **Accurate Categorization**: Automatically classifies trips by mode (e.g., walking, cycling, driving)
- **Trip Analysis**: Provides insights into your travel habits and preferences
- **Data Enrichment**: Adds context to your movement tracks for better visualization
- **Personalized Insights**: Adapts to your unique transportation choices and speeds

### Multi-Segment Trips
|since|v5.3.0|.version-badge|

Real journeys rarely use a single mode of travel. A typical commute might combine walking to the parking spot, driving across town, and walking the last stretch to the office. Reitti therefore models a trip as a sequence of **segments**, each with its own transportation mode:

1. The algorithm splits each trip into one-minute chunks
2. For each chunk, it analyzes speed and other factors to detect the transportation mode
3. Consecutive chunks with the same detected mode are combined into one segment
4. The result is an ordered list of segments, for example `Walking` → `Driving` → `Walking`

On the map, enable **Display Transportation Modes** in the map settings to color tracks by mode and to show transition badges where the mode changes (see [Transportation Mode Display](../usage/main-view.md#transportation-mode-display)).

### Configuration

To configure transportation mode detection:

1. Navigate to **Settings > Transportation Modes**
2. Configure the available transportation modes (see below)
3. Use **Reclassify All Trips** to reprocess every known trip with the stored configuration

Each transportation mode can be customized:

- **Max Speed**: The speed threshold in km/h or mph used during detection. Leave empty for no speed limit
- **Color**: The color used to display this mode on the map when transportation mode display is enabled
- **Icon**: An optional icon shown on the map and in the timeline

The following modes are available. The first four come preconfigured, additional modes can be added as needed:

| Mode | Default Max Speed |
|------|-------------------|
| Walking | 7 km/h |
| Cycling | 20 km/h |
| Driving | 120 km/h |
| Transit | No limit |
| Train | unconfigured |
| Motorcycle | unconfigured |
| E-Scooter | unconfigured |
| Airplane | unconfigured |

### Reclassifying Existing Trips

New and reprocessed trips automatically use the multi-segment model. To apply your current configuration (or the new multi-segment detection) to historical data:

1. Navigate to **Settings > Transportation Modes**
2. Click **Reclassify All Trips**
3. The reclassification runs as a background job. You can watch its progress on the **Job Status** page

### Best Practices

- **Calibrate Speeds**: Adjust the speed thresholds based on your typical speeds for each mode
- **Consider Terrain**: Urban vs. rural areas may require different thresholds
- **Use Reclassification**: After changing your configuration, use **Reclassify All Trips** to update existing trips

Once configured, transportation mode detection will automatically process your location data to categorize trips and enhance your travel analysis.
