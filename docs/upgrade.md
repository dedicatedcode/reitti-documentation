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

## Upgrading from v4 to v5

### 1. Device Management

Reitti v5.0.0 introduces **Devices** as a core concept. Each API token can now be linked to a device, and tokens without an associated device can **only** be used for reading data. They can no longer ingest location data (OwnTracks, HTTP ingest, etc.).

**Automatic migration:**

On the first startup after the upgrade, Reitti will automatically create a **default device** and link all existing API tokens to it. This happens transparently and should not cause any disruption.

**What you need to do:**

1. **Verify your API tokens**: After the migration, log into the web interface and go to **Settings > API Tokens**. You will see your existing tokens now associated with the default device.
2. **Check connected apps**: If you are using API tokens in external applications (mobile apps, Home Assistant, custom scripts) to **ingest** data, confirm that the token is still linked to a device. If a token was detached or left without a device, it will only allow read
   operations.
3. **(Optional) Reorganize tokens and devices**: You can:
   - Detach a token from its device if you want it to become read-only.
   - Attach a token to a different existing device.
   - Create a new device — Reitti will automatically generate a new API token for that device.

**Important:**

- Tokens can be created on their own, without a device. Such tokens may be used for **reading data only**.
- When a device is created, Reitti automatically sets up a new token for that device.
- Only tokens with an attached device can ingest location data.
- The automatic migration handles existing tokens, so no manual reassignment is needed unless you want to customise the setup.

**Troubleshooting:**

If an app starts failing to push location data after the upgrade, check:

1. That the token is linked to a device (**Settings > API Tokens**).
2. That the device itself is enabled.

### 2. Custom Map Styles

Reitti v5.0.0 introduces **custom map styles** with a unified way to manage both the built-in Reitti styles and any user-defined styles. During the migration, all users are automatically switched to the **default Reitti style** (dark theme).

**What you need to do:**

1. **If you were using the colored Reitti style**: After the upgrade, go to **Settings > Map Styles** and activate the *Colored Reitti* style from the list.
2. **Update the `reitti-tile-cache` container**: The way Reitti proxies map style URLs has changed in v5. It is **mandatory** to update your `reitti-tile-cache` container to the latest version. If you do not, style URLs cannot be loaded, and the map will remain dark.

   **Update your `docker-compose.yml`:**
   ```yaml
   services:
     tile-cache:
       image: dedicatedcode/reitti-tile-cache:latest
       # ... rest of your configuration
   ```

   Then run:
   ```bash
   docker compose pull tile-cache
   docker compose up -d tile-cache
   ```

3. **Optional: Import your own map styles**: If you have custom map styles, you can add them via **Settings > Map Styles**. For more details, see the [Map Styles documentation](./configurations/map-styles.md).

**Important:**

- All users are reset to the default (dark) Reitti style on upgrade. You must manually re-enable the colored variant if desired.
- The `reitti-tile-cache` container **must** be updated to the latest version — otherwise, the proxy will not resolve style URLs and the map will stop working.

**Troubleshooting:**

If the map stays dark or shows no tiles after the upgrade:

1. Verify that your `reitti-tile-cache` container is running the latest image: `docker compose ps tile-cache`
2. Check the logs for URL-related errors: `docker compose logs tile-cache`
3. Go to **Settings > Map Styles** and ensure a valid style is selected.

### 3. Docker Compose Configuration Updates

After upgrading to v5, please review your `docker-compose.yml` and apply the following changes:

#### Drop the healthcheck from the tile-cache service

The healthcheck is now included in the Docker image itself. You can safely remove it from your configuration.

**Before:**
```yaml
services:
  tile-cache:
    image: dedicatedcode/reitti-tile-cache:latest
    healthcheck:
      test: ["CMD", "curl", "-s", "http://127.0.0.1/osm/0/0/0.png"]
      interval: 10s
      timeout: 5s
      retries: 5
    # ...
```

**After:**
```yaml
services:
  tile-cache:
    image: dedicatedcode/reitti-tile-cache:latest
    # ...
```

#### Change image tags from `:next` to `:latest`

During a period in the v5 development cycle, the default `docker-compose.yml` used the `:next` tag for both the `reitti` and `reitti-tile-cache` images. If you picked up that configuration, you may still be using `:next`.

**Important:** Using the `:next` tag means you are participating in the latest development branch, which may contain bugs or unforeseen breaking changes. For a stable production setup, switch to `:latest`.

**Update these image references:**
```yaml
services:
  reitti:
    image: dedicatedcode/reitti:latest   # was :next
    # ...

  tile-cache:
    image: dedicatedcode/reitti-tile-cache:latest   # was :next
    # ...
```

Then restart the services:
```bash
docker compose pull
docker compose up -d
```

**Troubleshooting:**

If the map stays dark or tiles fail to load after the upgrade, double-check that:
- The `tile-cache` service is using the `:latest` tag (or an explicit version tag).
- No stale `healthcheck` block is present, as it may conflict with the built-in one.


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