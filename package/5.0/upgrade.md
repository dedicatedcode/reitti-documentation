---
title: "Upgrading Reitti"
description: "Guide for upgrading between Reitti versions"
weight: 5
tags: ["upgrade", "migration", "version"]
---

# Upgrading Reitti

Reitti follows [Semantic Versioning](https://semver.org/), which means:

- **Major versions** (v1.x → v2.x): Contain breaking changes that may require manual intervention
- **Minor versions** (v2.1 → v2.2): Add new features in a backward-compatible manner
- **Patch versions** (v2.1.0 → v2.1.1): Include bug fixes and minor improvements

For most upgrades, simply pulling the latest versioned Docker image or updating the source code is enough.
Only upgrades between major versions require special attention.

---

## Upgrading from v4 to v5

> ⚠️ **This is a Major Upgrade**
> Reitti v5 introduces **Devices** and changes how map tiles are handled.
> If you skip the configuration steps below, your map may appear dark or your location data may stop syncing.

### Pre-Upgrade Checklist

Before starting, ensure you have:

- [ ] **Backed up your database** (Always recommended before major version changes).
- [ ] **Saved your current `docker-compose.yml`** (For reference if you need to rollback).

---

### ⚠️ Performance Warning

**This upgrade may take a significant amount of time depending on your database size.**

During the upgrade process, Reitti performs two time-consuming operations:

1. **GPS Data Migration:** All GPS points are copied from the legacy table to the new table associated with the default
   device.
2. **Index Creation:** An index is created on the `api_token_usages` table to support the new architecture.

**Optimization Tip:**
If you have a large database and want to speed up the upgrade, you can clear the `api_token_usages` table before running
the update. This removes the usage history but significantly reduces the time required for index creation.

**Run this command before starting the upgrade:**

```bash
sudo docker compose exec postgis psql -U reitti -d reittidb --command "DELETE FROM api_token_usages"
```

---

### Step 1: Update Docker Configuration

You must update your `docker-compose.yml` to match the new architecture.

#### 1.1 Update Image Tags

**Action:** Change image tags from `:next` to `:5` (explicit version).

```yaml
services:
   reitti:
      image: dedicatedcode/reitti:5        # Was :next
  tile-cache:
     image: dedicatedcode/reitti-tile-cache:5  # Was :next
```

**Why this is required:**

- **Explicit Versioning:** Using `:5` ensures you are upgrading to the exact major version intended, avoiding unexpected
  changes if `:latest` shifts to a newer major version (e.g., 6.0) before you are ready.
- **Stability:** The `:next` tag points to the next branch, which is unstable for production.
- **Note:** The `:next` tag was included in the official docker-compose examples for a short period during development.
  If your configuration uses `:next`, it likely means you copied it during that window.

#### 1.2 Update Tile Cache Service

**Action:** Ensure the `tile-cache` service is using the new image version (see 1.1) and **remove the `healthcheck`
block**.

```yaml
services:
  tile-cache:
     image: dedicatedcode/reitti-tile-cache:5
     # Remove this block entirely:
     # healthcheck:
     #   test: ["CMD", "curl", "-s", "http://127.0.0.1/osm/0/0/0.png"]
```

**Why this is required:**

- **Image Update:** The tile cache service in v5 handles URL proxying differently. The old image cannot resolve the new
  map style URLs, causing the map to break.
- **Healthcheck Removal:** The healthcheck logic is now built directly into the Docker image. Having both the
  user-defined block and the built-in one can cause startup conflicts or resource contention.

#### 1.3 Apply Changes

Run the following commands to pull and restart:

```bash
docker compose pull
docker compose up -d
```

---

### Step 2: Verify Critical Functionality

After the containers restart, perform these checks to ensure the upgrade was successful.

#### 2.1 Map Tiles

**Action:** Open Reitti in your browser.

- **If the map is displayed in dark mode:** Go to **Settings > Map Styles** and select "Colored Reitti".
- **If the map is broken:** Check logs with `docker compose logs tile-cache`.

**Why this is required:**
For consistency and security, all users are reset to the **default (dark) Reitti style** on upgrade. If you were using
the "Colored Reitti" style, you must manually re-enable it.

#### 2.2 API Tokens & Devices

**Action:** Go to **Settings > API Tokens** and verify your tokens have a **Device** attached.

**Why this is required:**
v5 introduces **Devices** as a core concept.

- **Tokens without a device** can only **read data** (they cannot ingest location data).
- **Tokens with a device** can ingest data (OwnTracks, HTTP, etc.).
- While Reitti automatically links existing tokens to a default device, you must verify this to ensure your mobile apps
  or Home Assistant integrations can still push location data.

---

### Step 3: Optional Cleanup

- [ ] **Reorganize Devices:** If you have multiple users or devices, create specific devices and assign tokens
  accordingly.
- [ ] **Import Map Styles:** If you have custom map styles, import them via **Settings > Map Styles**.
- [ ] **Remove Old Config:** Clean up any remaining `:next` tags or custom environment variables from previous versions.

---

### Troubleshooting

| Problem                  | Likely Cause              | Solution                                             |
|:-------------------------|:--------------------------|:-----------------------------------------------------|
| **Map is not displayed** | Tile Cache image outdated | Update `tile-cache` to `:5` or `:latest`             |
| **Map is in dark mode**  | Map style not selected    | Manually select "Colored Reitti" in Settings         |
| **Data ingestion fails** | Token has no Device       | Go to **Settings > API Tokens** and link to a Device |
| **Service won't start**  | Conflicting Healthcheck   | Remove `healthcheck` block from `docker-compose.yml` |
| **Tiles not loading**    | URL Proxy Error           | Check `docker compose logs tile-cache`               |

---

## Upgrading from v3 to v4

*Note: This section is for users still on v3. If you are upgrading from v4 to v5, skip this section.*

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