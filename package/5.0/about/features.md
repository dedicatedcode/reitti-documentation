---
title: "Features Overview"
description: "Comprehensive overview of Reitti's core features and capabilities"
weight: 2
tags: ["overview"]
---

Reitti provides a comprehensive set of features for personal location tracking and analysis. Here's an overview of the main capabilities:


### Core Features

#### Memories
- **Narrative Travel Logs**: Transform raw location data into structured, visual travel stories with automatic enhancements from images and text.
- **Creation and Editing**: Generate Memories from historical data, then customize with modular blocks (text, visits, trips, images) for personalized narratives.
- **Sharing and Collaboration**: Share Memories via secure links with view-only or edit access, enabling collaborative storytelling without requiring accounts.

#### Photo Management
- **Immich Integration**: Connect with self-hosted Immich photo servers
- **Location-based Photos**: View photos taken at specific locations and dates on your timeline
- **Interactive Photo Viewer**: Full-screen photo modal with keyboard navigation
- **Photo Grid Display**: Organized photo galleries for locations with multiple images
- **Enhanced HEIC Support**: Improved display of iPhone photos in browsers (enhanced in v1.5.0)

#### User Management & Security
- **Multi-user Support**: Multiple user accounts with individual data isolation
- **API Token Management**: Secure API access with token-based authentication
- **User Profile Management**: Customizable display names and secure password management
- **Magic Link Sharing**: Share location data without requiring account creation ([Learn more](../usage/share-access.md))
- **OpenID Connect Integration**: Enterprise authentication with automatic user provisioning ([Setup guide](../infrastructure/oidc.md))

#### Geocoding & Address Resolution
- **Multiple Geocoding Services**: Support for custom geocoding providers (Nominatim, etc.)
- **Automatic Address Resolution**: Convert coordinates to human-readable addresses
- **Service Management**: Configure multiple geocoding services with automatic failover

#### Customization & Localization
- **Multi-language Support**: Available in English, Finnish, German, and French
- **Unit System**: Display distances in the Imperial or Metric system
- **Queue Monitoring**: Real-time job status and processing queue visibility
- **Custom Tiles-Server**: Ability to use your own tiles-server

### Integration Features

Reitti supports various integrations to enhance your location tracking experience:

- **Mobile App Integration**: Real-time tracking with OwnTracks and GPSLogger
- **OwnTracks Recorder**: Alternative data collection method with backup storage
- **Photo Integration**: Visual timeline enhancement with Immich photo management

For detailed information about each integration, see the dedicated pages in this section.
