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

#### Spatial Coverage
- **H3-Based Coverage Analysis**: See what percentage of a city, district, or country you have explored, with the ability to travel back in time and view your coverage at any point in the past. [Learn more](../configurations/spatial-coverage.md)

#### Trip Analysis & Navigation
- **Multi-Segment Trips**: Trips are automatically split into segments per transportation mode, with color-coded tracks and transition badges where you change modes ([Learn more](../configurations/transportation-modes.md))
- **Type-to-Jump Navigation**: Jump to any date or range by simply typing it on the main page ([Learn more](../usage/main-view.md))

### Data Sharing

Reitti offers several ways to share your location data: with people on the same instance, with users on other instances, or with anyone via secure links.

#### Sharing with Other Users (Same Instance)

If you know **Family Sharing** from apps like Life360, this is Reitti's take on it: share your live location, timeline, significant places, and trips (plus photos) with the people close to you, while keeping full control over who sees what.

- **User-to-User Sharing**: Share your data with registered users on the same instance via **Settings > Share Access** ([Learn more](../usage/share-access.md))
- **Photo Sharing**: A per-user "Share my photos" toggle also shares the photos from your Immich integration, so recipients see your photos on the map when viewing your timeline (requires an enabled Immich integration)
- **Multi-User Map View**: Shared users appear alongside your own tracks, each with an individually assignable color
- **One-Directional by Default**: Sharing is not mutual, other users need to separately share their data with you

#### Magic Links

- **Account-Free Sharing**: Share your location data via unique URLs without requiring recipients to create an account, with optional expiration dates ([Learn more](../usage/share-access.md))
- **Granular Access Levels**: Choose between four scopes:
    - **Full Access**: complete access to all your location data and history
    - **Live Data Only**: access only to current/recent location data
    - **Live Data Only + Photos**: access only to current/recent location data and your photos if they are shown on the map
    - **Latest Location only**: access only to the latest location on the map
- **Memory Links**: Share individual Memories with **View Memory** or **View and Edit Memory** scopes ([Learn more](../memories/sharing.md))

#### Shared Instances (Instance-to-Instance)

- **Federated Connections**: Connect with users on other Reitti instances while keeping user accounts separate ([Learn more](../integrations/reitti.md))
- **Token-Based Access**: Link instances by providing the API token of the user you want to connect with
- **One-Directional Connections**: Each connection gives you access to one remote user's data. For mutual sharing, both sides need to add a connection to each other

### Integration Features

Reitti supports various integrations to enhance your location tracking experience:

- **Mobile App Integration**: Real-time tracking with OwnTracks and GPSLogger
- **OwnTracks Recorder**: Alternative data collection method with backup storage
- **Photo Integration**: Visual timeline enhancement with Immich photo management

For detailed information about each integration, see the dedicated pages in this section.
