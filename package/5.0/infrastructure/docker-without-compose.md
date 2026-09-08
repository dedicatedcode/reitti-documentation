---
title: "Running without Docker Compose"
description: "Run Reitti with plain docker run commands instead of Docker Compose"
weight: 3
tags: [ "configuration", "docker" ]
---

Docker Compose is the recommended way to run Reitti, but you can just as well start the containers with plain
`docker run` commands. This page explains which services Reitti needs, how they map to environment variables, and
which containers you actually have to run yourself.

## What Reitti Needs

Reitti itself is a single container, but it depends on two services:

| Service                | Purpose                                                                        |
|:-----------------------|:-------------------------------------------------------------------------------|
| PostgreSQL with PostGIS | Stores all your location data, places, visits, and trips                       |
| Redis                   | Caching and background job processing                                          |

Optionally, you can run the **Reitti tile-cache** in front of your map tile provider. It caches map tiles so your
instance is faster and friendlier to the tile provider. Without it, Reitti fetches the tiles directly.

All three services can run anywhere as long as they are reachable from the reitti container: as containers on the
same host, on a NAS, as system services, or on separate machines. You do not need a shared Docker network. Just
make sure the reitti container can reach each service by an IP address or hostname and port.

## Mapping Services to Environment Variables

Reitti is configured entirely through environment variables (see the
[Docker Compose Configuration](./docker-config.md) reference for all of them). The variables below are the ones
that connect Reitti to its services:

| Service                 | Environment Variables                                                        |
|:------------------------|:------------------------------------------------------------------------------|
| PostgreSQL with PostGIS | `POSTGIS_HOST`, `POSTGIS_PORT`, `POSTGIS_DB`, `POSTGIS_USER`, `POSTGIS_PASSWORD` |
| Redis                   | `REDIS_HOST`, `REDIS_PORT` (optional: `REDIS_PASSWORD`, `REDIS_DATABASE`, `REDIS_SOCKET`) |
| Tile cache              | `TILES_CACHE` (URL of the tile-cache; leave empty to disable it)              |

Set each `*_HOST` to the address the reitti container can reach, for example:

- the host IP with the published port of a containerized service (e.g. `192.168.1.10:5432`)
- the IP or hostname of a NAS or dedicated database server
- `host.docker.internal` for services on the Docker host. On Linux, add
  `--add-host=host.docker.internal:host-gateway` to the `docker run` command

## Running the Containers

Only the two Reitti images require `docker run` commands. For PostgreSQL with PostGIS and Redis, use your existing
instances or the official images of your choice.

### Tile Cache

```bash
docker run -d \
  --name reitti-tile-cache \
  -p 8081:80 \
  -v reitti-tile-cache-data:/var/cache/nginx \
  --restart unless-stopped \
  dedicatedcode/reitti-tile-cache:5
```

The container serves the cached tiles on port `80` internally. Publish it with `-p` (here as `8081`) and point the
`TILES_CACHE` variable of reitti to it.

If you skip the tile cache, set `TILES_CACHE` to an empty value and Reitti will fetch the map tiles directly.

### Reitti

```bash
docker run -d \
  --name reitti \
  -p 8080:8080 \
  -v reitti-data:/data \
  --restart unless-stopped \
  -e POSTGIS_HOST=192.168.1.10 \
  -e POSTGIS_PORT=5432 \
  -e POSTGIS_DB=reittidb \
  -e POSTGIS_USER=reitti \
  -e POSTGIS_PASSWORD=reitti \
  -e REDIS_HOST=192.168.1.10 \
  -e REDIS_PORT=6379 \
  -e TILES_CACHE=http://192.168.1.10:8081 \
  dedicatedcode/reitti:5
```

Replace the example addresses with the hosts and ports of your own services. The container listens on port `8080`;
open `http://localhost:8080` in your browser once it is up.

Useful optional settings (see [Docker Compose Configuration](./docker-config.md) for the full list):

- `APP_UID` / `APP_GID`: run the application with a specific user and group ID (useful for host-mounted volumes)
- `JAVA_OPTS`: additional JVM options, e.g. `-Xmx512m`
- `ADVERTISE_URI`: public URI of your instance, used for external links

## Startup Order

With plain Docker there is no automatic wait for healthy services. Start PostgreSQL (and Redis) first and give them
a moment, then start reitti. If Reitti starts before its services are ready, the `--restart unless-stopped` policy
makes it retry automatically until the connection succeeds. You can follow the startup with:

```bash
docker logs -f reitti
```

## Upgrading

Your data lives in the volumes (`reitti-data`, `reitti-tile-cache-data`) and in your database, so upgrading is a
matter of replacing the container:

```bash
docker pull dedicatedcode/reitti:5
docker stop reitti
docker rm reitti
# re-run the same docker run command as above
```

Check the [release notes](https://github.com/dedicatedcode/reitti/releases) before upgrading. The image tags follow
a major-version scheme (`5` tracks the latest v5.x release); see
[Docker Tag Strategy](../installation.md#docker-tag-strategy-and-best-practices) for details. The same procedure
applies to the tile-cache container.

## Data Persistence

The `reitti-data` volume (mounted at `/data`) holds Reitti's file storage, including uploaded files and the H3
spatial coverage data if enabled. Keep this volume between container replacements, or point it to a host directory
with `-v /path/on/host:/data` if you prefer managing the files yourself.
