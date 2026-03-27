---
title: "OwnTracks Recorder Integration"
description: "Alternative data collection method with backup storage capabilities"
tags: ["integrations"]
---

The OwnTracks Recorder integration provides an alternative method for collecting location data from OwnTracks mobile apps through an intermediate storage system.

### Benefits of Using OwnTracks Recorder

- **No App Reconfiguration**: If you already have OwnTracks configured to send data to a Recorder instance, there's no need to reconfigure your mobile app
- **Backup Storage**: The Recorder acts as a reliable backup storage system for your location data
- **Automatic Data Sync**: Reitti automatically pulls new location data from the Recorder every 5 minutes
- **Resilient Data Collection**: Even if Reitti is temporarily offline, the Recorder continues collecting data which can be synchronized later

### How It Works

1. Your OwnTracks mobile app sends location data to the OwnTracks Recorder
2. The Recorder stores this data in its own database
3. Reitti periodically connects to the Recorder and pulls new location data
4. The imported data is then processed through Reitti's normal pipeline

### Configuration

To set up OwnTracks Recorder integration:

1. Navigate to **Settings > Integrations**
2. Locate the **OwnTracks Recorder Integration** section
3. Configure the connection details for your existing OwnTracks Recorder instance:
   - **Recorder URL**: The base URL of your OwnTracks Recorder
   - **Authentication**: Username and password if required
   - **Sync Interval**: How often to check for new data (default: 5 minutes)
4. Enable the integration to start automatic data synchronization

### Prerequisites

- An existing OwnTracks Recorder instance
- OwnTracks mobile app configured to send data to the Recorder
- Network connectivity between Reitti and the Recorder

Once configured, your mobile device will automatically send location updates to Reitti via the Recorder, where they'll be processed into visits, trips, and significant places in real-time.
