---
title: "Photo Integration"
description: "Visual timeline enhancement with Immich photo management"
weight: 10
tags: ["integrations"]
---

Reitti integrates seamlessly with [Immich](https://immich.app/), a self-hosted photo and video management solution, to enhance your location timeline with visual memories.

### Why Use Photo Integration?

The Immich integration brings your location data to life by:

- **Visual Timeline**: See photos directly on your map at the exact locations and times they were taken
- **Memory Lane**: Relive your experiences by browsing photos from specific places and dates
- **Context-Rich History**: Understand your movements better with visual context from your photo library
- **Automatic Correlation**: Photos are automatically matched to your location data based on time and GPS coordinates

### How It Works

1. Reitti connects to your Immich server using the API
2. Photos with GPS coordinates are automatically correlated with your location timeline
3. Reitti first tries to correlate images by GPS coordinates saved in the EXIF data, and if this is not available, Reitti will take the time the photo was taken and match it to the nearest known GPS location
4. Thumbnails appear on the map at the exact locations where photos were taken
5. Click on thumbnails to view full-size images in an interactive viewer
6. Browse photo galleries for locations with multiple images

### Configuration

To set up Immich integration:

1. Navigate to **Settings > Integrations**
2. In the **Immich Photo Integration** section, configure:
   - **Immich Server URL**: The base URL of your Immich instance (e.g., **https://photos.yourdomain.com**)
   - **API Key**: Generate an API key in your Immich settings under "API Keys"
   - **Enable Integration**: Toggle to activate the photo integration

3. Save your settings and Reitti will automatically start correlating your photos with location data

### API Permissions

The API key used for Immich integration requires the following permissions:

- `asset.read`: Allows Reitti to fetch metadata about your photos
- `asset.view`: Allows Reitti to access thumbnail images
- `asset.download`: Allows Reitti to access full-size images

Reitti does not download or store any images from Immich. Instead, it proxies image requests through its own backend to avoid requiring CORS configuration in Immich. This means:

- Images are served directly from your Immich instance to your browser
- No additional storage is used in Reitti
- No CORS configuration is needed in Immich
- Your photos remain securely in your Immich instance

### Prerequisites

- A running Immich instance
- API access enabled in your Immich configuration
- Network connectivity between Reitti and Immich

### Features

- **Interactive Photo Viewer**: Full-screen photo modal with keyboard navigation
- **Photo Grid Display**: Organized photo galleries for locations with multiple images
- **Timeline Integration**: Photos appear seamlessly in your location timeline
- **Performance Optimized**: Thumbnails are cached for fast loading

Once configured, photos will appear as small thumbnails on the map at their capture locations, and you can view full-size images in the photo viewer, creating a rich visual history of your travels and daily life.
