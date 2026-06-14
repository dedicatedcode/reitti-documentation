---
title: "Upgrading Reitti"
description: "Guide for upgrading between Reitti versions"
weight: 5
tags: ["upgrade", "migration", "version"]
---

# Upgrading Reitti

Reitti follows (https://semver.org/), which means:

- **Major versions** (v1.x → v2.x): Contain breaking changes that may require manual intervention
- **Minor versions** (v2.1 → v2.2): Add new features in a backward-compatible manner
- **Patch versions** (v2.1.0 → v2.1.1): Include bug fixes and minor improvements

For most upgrades, simply pulling the latest Docker image or updating the source code is enough. 
Only upgrades between major versions require special attention.

## Upgrading from v3 to v4

This guide covers the changes when upgrading from Reitti v3 to v4. These are breaking changes that require manual updates to your configuration.

### 1. RabbitMQ Removal

RabbitMQ is no longer required. Remove all RabbitMQ-related configuration from your `docker-compose.yml`:

**Remove these services:**
```yaml
# Remove this entire service
rabbitmq:
  image: rabbitmq:3-management-alpine
  # ... other rabbitmq configuration
```

**Remove RabbitMQ environment variables from the Reitti service:**
```yaml
environment:
  # Remove these lines if they exist:
  - RABBITMQ_HOST=rabbitmq
  - RABBITMQ_PORT=5672
  - RABBITMQ_USERNAME=guest
  - RABBITMQ_PASSWORD=guest
```

### 2. Photon Geocoder Configuration Changes

Photon is now configured like other reverse geocoding services through the web interface. If you had `PHOTON_BASEURL` configured:

1. **First start with v4:** Reitti will automatically create a Photon geocoder entry in **Settings > Geocoding** using your existing `PHOTON_BASEURL` environment variable.
2. **After verification:** Once you confirm the Photon service is working in the web interface, you can remove the `PHOTON_BASEURL` environment variable from your `docker-compose.yml`.

For more details on configuring reverse geocoding services, see the [Reverse Geocoding documentation](./configurations/reverse-geocoding.md).

### 3. New Default Geocoder: Paikka

Reitti v4 includes a new default reverse geocoding service called **Paikka**. This service is specifically designed for Reitti and provides:

- Optimized results for personal location tracking
- Administrative boundary information when available
- Lightweight and efficient processing

On first start, Reitti will automatically add Paikka to your geocoding services using the public instance at `https://geo.dedicatedcode.com`.

**Privacy consideration:** If you prefer not to use the public Paikka instance for privacy reasons:

1. Go to **Settings > Geocoding**
2. Find the "Paikka" service in the list
3. Click the Disable button or remove it entirely

You can also visit [Paikka](https://github.com/dedicatedcode/paikka) for information about it and how to self-host it.

### 4. Tile Service Configuration Changes

The custom tile configuration has been simplified:

**Remove these environment variables:**
```yaml
environment:
  # Remove these lines:
  - CUSTOM_TILES_SERVICE=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
  - CUSTOM_TILES_ATTRIBUTION='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
```

At the moment there is no equivalent for these in Reitti v4.0. If you need this, please open an issue.

### 5. Tile Cache Replacement

The previous nginx-based tile cache has been replaced with a dedicated tile cache service:

**Update your `docker-compose.yml`:**

Replace the existing tile cache configuration with if you had one:
```yaml
services:
  tile-cache:
    image: dedicatedcode/reitti-tile-cache:next
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://127.0.0.1/osm/0/0/0.png"]
      interval: 10s
      timeout: 5s
      retries: 5
    volumes:
      - tile-cache-data:/var/cache/nginx
```

### 6. Verification Steps

After making these changes:

1. **Compare configurations:** Review the latest `docker-compose.yml` example in the Reitti repository and compare it with your current configuration.
2. **Backup your data:** Always back up your database before major upgrades.
3. **Start the services:** Start the updated containers with `docker-compose up -d`.
4. **Check logs:** Monitor the logs for any errors during startup: `docker-compose logs -f reitti`.
5. **Verify functionality:**
    - Log in to the web interface
    - Check **Settings > Geocoding** for configured services
    - Verify map tiles are loading correctly
    - Test location tracking and geocoding

### 7. Troubleshooting

If you encounter issues after upgrading:

1. **Check the logs:** `docker-compose logs reitti` for error messages.
2. **Database migrations:** Reitti v4 includes database schema changes that are applied automatically on startup.
3. **Service dependencies:** Ensure all required services (database, redis) are running and accessible.
4. **Configuration validation:** Double-check that all removed environment variables have been deleted from your configuration.

For additional help, check the [GitHub issues](https://github.com/dedicatedcode/reitti/issues) or community discussions.