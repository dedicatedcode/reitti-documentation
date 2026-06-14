---
title: "Transportation Mode Detection"
description: "Adjust key parameters for the transportation mode detection"
weight: 6
tags: ["configuration"]
---
|since|v2.0.0|.version-badge|

Reitti's transportation mode detection algorithm automatically identifies the mode of transportation used during your trips based on speed and other parameters. The algorithm parameters can be customized to match your specific movement patterns and data frequency.

### Why Use Transportation Mode Detection?

Transportation mode detection enhances your location data by:

- **Accurate Categorization**: Automatically classifies trips by mode (e.g., walking, cycling, driving)
- **Trip Analysis**: Provides insights into your travel habits and preferences
- **Data Enrichment**: Adds context to your movement tracks for better visualization
- **Personalized Insights**: Adapts to your unique transportation choices and speeds

### How It Works

1. The algorithm splits each trip into one-minute chunks
2. For each chunk, it analyzes speed and other factors to detect the transportation mode
3. The mode with the most encounters across the chunks is assigned to the entire trip
4. Detected modes are used to categorize and display your trips accordingly

### Configuration

To configure transportation mode detection:

1. Navigate to **Settings > Transportation Modes**
3. Configure your preferred settings
5. Use the recalculate button to reprocess every known trip with the stored configuration

### Configuration Modes

Simple mode offers predefined minimum speed thresholds for common transportation modes.

- **Walking**: Default max speed 7 km/h
- **Cycling**: Default max speed 20 km/h
- **Driving**: Default max speed 120 km/h
- **Transit**: Default no limit
- **Train**: -
- **Motorcycle**: -

### Features

- **Recalculation Button**: Manually trigger reprocessing of all known trips using the current configuration

### Best Practices

- **Calibrate Speeds**: Adjust based on your typical speeds for each mode
- **Consider Terrain**: Urban vs. rural areas may require different thresholds
- **Use Recalculation**: After changes, use the recalculation button to update existing trips

Once configured, transportation mode detection will automatically process your location data to categorize trips and enhance your travel analysis.
