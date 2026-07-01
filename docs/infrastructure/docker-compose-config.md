---
title: "Docker Compose Configuration"
description: "Reference of all environment variables available when deploying Reitti with Docker Compose"
weight: 2
tags: [ "configuration" ]
---

## Overview

When running Reitti using Docker Compose, all configuration is provided through environment variables. This page
documents every supported variable, its default value, and a brief description of its purpose.

> **Note:** The OpenID Connect (OIDC) related variables are described in detail on the
> [OpenID Connect](./oidc.md) page. They are listed here for completeness, but
> refer to that page for the full OIDC configuration guide.

---

### Server and Context Path

| Variable         | Description                                                                                                                                                         | Default Value | Example Value                |
|:-----------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------|:-----------------------------|
| `BASE_PATH`      | Base path used by the embedded servlet container. If you want to serve Reitti behind a reverse proxy under a sub‑path, set this to that sub‑path (e.g., `/reitti`). | `/`           | `/reitti`                    |
| `LOGGING_LEVEL`  | Logging level for application classes (`com.dedicatedcode.reitti`). Choices: `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`.                                             | `INFO`        | `DEBUG`                      |
| `ADVERTISE_URI`  | Public URI of the Reitti instance. Used for external references such as links in emails.                                                                            | *(empty)*     | `https://reitti.example.com` |
| `DANGEROUS_LIFE` | When set to `true`, enables the background data‑management endpoints (clean data, purge, etc.). **Use with caution.**                                               | `false`       | `true`                       |

---

### Application Runtime

| Variable      | Description                                                                                                                          | Default Value | Example Value                 |
|:--------------|:-------------------------------------------------------------------------------------------------------------------------------------|:--------------|:------------------------------|
| `SERVER_PORT` | Port on which the application server listens.                                                                                        | `8080`        | `8080`                        |
| `APP_UID`     | User ID under which the application process runs inside the container.                                                               | `1000`        | `1000`                        |
| `APP_GID`     | Group ID under which the application process runs inside the container.                                                              | `1000`        | `1000`                        |
| `JAVA_OPTS`   | Additional JVM options passed to the Java process.                                                                                   | *(empty)*     | `-Xmx512m -Xms256m`           |

---

### PostgreSQL / PostGIS Database

| Variable           | Description                                  | Default Value | Example Value    |
|:-------------------|:---------------------------------------------|:--------------|:-----------------|
| `POSTGIS_HOST`     | Hostname of the PostgreSQL / PostGIS server. | `postgis`     | `db.example.com` |
| `POSTGIS_PORT`     | Database port.                               | `5432`        | `5432`           |
| `POSTGIS_DB`       | Database name.                               | `reittidb`    | `reittidb`       |
| `POSTGIS_USER`     | Database username.                           | `reitti`      | `reitti`         |
| `POSTGIS_PASSWORD` | Database password.                           | `reitti`      | `s3cret!`        |

---

### Redis Cache

| Variable             | Description                                                              | Default Value | Example Value             |
|:---------------------|:-------------------------------------------------------------------------|:--------------|:--------------------------|
| `REDIS_HOST`         | Hostname of the Redis server.                                            | `redis`       | `redis.example.com`       |
| `REDIS_PORT`         | Redis port.                                                              | `6379`        | `6379`                    |
| `REDIS_USERNAME`     | Username for Redis authentication (leave empty if not needed).           | *(empty)*     | `default`                 |
| `REDIS_PASSWORD`     | Password for Redis authentication.                                       | *(empty)*     | `r3d!s$3cr3t`             |
| `REDIS_DATABASE`     | Redis database index.                                                    | `0`           | `1`                       |
| `REDIS_CACHE_PREFIX` | Prefix added to all cache keys in Redis.                                 | *(empty)*     | `reitti:`                 |

---

### Tile Cache

| Variable       | Description                                                                                         | Default               | Example Value               |
|:---------------|:----------------------------------------------------------------------------------------------------|:----------------------|:----------------------------|
| `TILES_CACHE`  | URL of our external tile cache (e.g. a tile‑proxy service). Map tiles are fetched through this URL. | `http://tile-cache`   | `http://tiles.local:8080`   |

---

### Local Authentication

| Variable              | Description                                                                                                                               | Default Value | Example Value |
|:----------------------|:------------------------------------------------------------------------------------------------------------------------------------------|:--------------|:--------------|
| `DISABLE_LOCAL_LOGIN` | When `true`, disables login with username / password and clears existing stored passwords. Use alongside OIDC to enforce SSO-only access. | `false`       | `true`        |

---

### OpenID Connect (OIDC)

Full configuration details are covered on the [OpenID Connect](./oidc.md) page. The table below lists all OIDC
environment
variables for quick reference.

| Variable                     | Description                                                                                                    | Default Value         | Example Value                      |
|:-----------------------------|:---------------------------------------------------------------------------------------------------------------|:----------------------|:-----------------------------------|
| `OIDC_ENABLED`               | Whether to enable OIDC authentication.                                                                         | `false`               | `true`                             |
| `OIDC_SIGN_UP_ENABLED`       | Whether new users can self‑register via OIDC. When `false`, only existing users can log in.                    | `true`                | `false`                            |
| `OIDC_CLIENT_ID`             | Client ID issued by the OIDC provider.                                                                         | *(empty)*             | `reitti`                           |
| `OIDC_CLIENT_SECRET`         | Client secret issued by the OIDC provider.                                                                     | *(empty)*             | `F0oxfg8b2rp5X97YPS92C2ERxof1oike` |
| `OIDC_ISSUER_URI`            | Issuer URI of the OIDC provider (e.g. `https://accounts.google.com`).                                          | *(empty)*             | `https://auth.example.com`         |
| `OIDC_SCOPE`                 | Comma‑separated list of OIDC scopes requested during authentication.                                           | `openid,profile`      | `openid,profile,email`             |
| `OIDC_AUTHENTICATION_METHOD` | Authentication method used by the OIDC client. Supported: `client_secret_basic`, `client_secret_post`, `none`. | `client_secret_basic` | `client_secret_basic`              |

---

### Data Import / Processing

| Variable                   | Description                                                                                                                                                          | Default Value | Example Value |
|:---------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------|:--------------|
| `PROCESSING_BATCH_SIZE`    | Number of location points processed in a single batch during import. Larger values use more memory and speed up processing.                                          | `10000`       | `50000`       |
| `INGESTION_MAX_BATCH_SIZE` | Maximum number of raw location points the server will wait before flushing API request to the ingestion endpoint.                                                    | `100`         | `500`         |
| `INGESTION_MAX_IDLE_TIME`  | Maximum time (in seconds) the server will wait before flushing a partially filled batch to the database when receiving data via the live mode / batch ingestion API. | `5`           | `10`          |

---

## Example `docker-compose.yml` snippet

The following snippet shows how the environment variables can be placed under the `reitti` service:

```yaml
services:
  reitti:
    image: dedicatedcode/reitti:latest
    environment:
      # Base path & logging
      - BASE_PATH=/
      - LOGGING_LEVEL=INFO
      - ADVERTISE_URI=https://reitti.example.com

      # Application runtime
      - SERVER_PORT=8080
      - APP_UID=1000
      - APP_GID=1000
      - JAVA_OPTS=-Xmx512m

      # Database
      - POSTGIS_HOST=postgis
      - POSTGIS_PORT=5432
      - POSTGIS_DB=reittidb
      - POSTGIS_USER=reitti
      - POSTGIS_PASSWORD=reitti

      # Redis
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - REDIS_DATABASE=0

      # Tile cache
      - TILES_CACHE=http://tile-cache

      # Data management (import/export)
      - DANGEROUS_LIFE=false

      # Ingestion tuning
      - PROCESSING_BATCH_SIZE=10000
      - INGESTION_MAX_BATCH_SIZE=100
      - INGESTION_MAX_IDLE_TIME=5
```

OIDC variables are omitted in the snippet above; see the [OpenID Connect](./oidc.md) page for how to add them.

For a complete working setup, refer to the [quick‑start guide](../getting-started.md) and the provided
`docker-compose.yml` in the repository.
