---
title: "Add-ons"
description: "Companion tools from the reitti-addons repository that enhance or help with the usage of Reitti"
tags: [ "integrations" ]
---

## Add-ons

Next to the integrations built into Reitti, there is a collection of companion tools that live in their own repository:
[reitti-addons](https://github.com/dedicatedcode/reitti-addons). These tools either have no release process of their
own or are not tied into any specific version of Reitti, so they are kept out of the main repository.

They are entirely optional: each of them works against a running Reitti instance or produces data for it, so you can
use them with any version of Reitti. Currently there are two of them:

| Add-on                                                          | Description                                                                                          |
|-----------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| [reitti-device-sync](#reitti-device-sync)                       | Auto-uploads new GPX/FIT recordings from USB-attached GPS devices whenever you plug them in          |
| [GPX Test Data Generator](#gpx-test-data-generator)             | Interactive web tool to create, import, edit and randomize realistic GPX test data                    |

## reitti-device-sync

[reitti-device-sync](https://github.com/dedicatedcode/reitti-addons/tree/main/device-sync) is a small bash tool that
pulls GPX/FIT files from USB-attached GPS devices and pushes them into your Reitti instance. When you plug a device in,
a systemd user service starts automatically, finds files that have not been uploaded before, and sends them to Reitti.
Files that are still being written are deferred and failed uploads are retried on the next run.

It was built for the **Garmin Edge 830** (FIT via MTP) and the **Columbus P-1 Mark II** (GPX via USB mass storage), but
it is generic: every device is just a config section with an upload URL and an API token. The device is never touched,
the tool only reads from it.

### Use Cases

- Record rides or walks with a dedicated GPS tracker instead of (or next to) your phone, without manually copying files
- Let recordings flow into Reitti automatically as soon as you plug the device in at home
- Bulk import of historic recordings, for example after setting up a fresh Reitti instance
- Reuse recordings from several trackers in one place, with each upload attributed to the right device

### How It Ties Into Reitti

reitti-device-sync uses Reitti's import APIs: `/api/v2/fit/import` for FIT files and `/api/v1/gpx/import` for GPX
files, authenticated with a token per device. Creating a device under **Settings > Devices** and binding a token to it
(see [Devices](configurations/devices.md) and the [API documentation](api/index.md)) keeps the ingested data
attributed to the right tracker.

!!! note "No duplicate points"
    reitti-device-sync keeps a local ledger of everything it uploaded and checks each file before sending (by path,
    size and modification time as well as by content hash). On top of that, Reitti itself ignores duplicate location
    points, so even a redundant upload never produces duplicate points on the map.

### Getting Started

1. In Reitti, create a device per tracker under **Settings > Devices** and create a token for each under
   **Settings > API Tokens**
2. Install the script and the systemd user units and point the config at your devices

The full installation, configuration and troubleshooting guide is in the
[reitti-device-sync README](https://github.com/dedicatedcode/reitti-addons/blob/main/device-sync/README.md).

## GPX Test Data Generator

The [GPX Test Data Generator](https://github.com/dedicatedcode/reitti-addons/tree/main/gpx-tool) (Polku) is an
interactive web-based tool for creating, importing, editing and randomizing GPX tracks. Its data can be imported into
Reitti through the [GPX Import API](api/gpx-import.md), which makes it a handy companion for testing and demoing.

### Use Cases

- Try out Reitti features without waiting for real data to accumulate
- Fill a development or demo environment with plausible movement
- Simulate movement patterns with configurable speed, elevation and GPS accuracy
- Load existing GPX recordings, tweak them on the map and re-export them
- Move a whole track to a random spot on the globe (and in time) with the *Randomize* feature

### How It Works

You click or paint points on an interactive map, manage multiple tracks and import/export GPX files. Everything
happens locally in your browser: no track data is ever sent to any server.

### Getting Started

```bash
docker run -p 8080:80 dedicatedcode/reitti-gpx-generator
```

Then open http://localhost:8080 in your browser. More details, including ways to run it without Docker, are in the
[GPX Test Data Generator README](https://github.com/dedicatedcode/reitti-addons/blob/main/gpx-tool/README.md).
