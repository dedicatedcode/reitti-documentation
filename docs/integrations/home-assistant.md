---
title: "Home-Assistant"
description: "Connect Home-Assistant to Reitti"
weight: 3
tags: [ "integrations" ]
---

## Connecting Home-Assistant to Reitti

There is no official integration for connecting Reitti to Home-Assistant. However, multiple users have successfully pushed location data from Home-Assistant into Reitti using the ingestion endpoint.

### Using the Ingestion Endpoint

You can manually configure Home-Assistant to send data to Reitti's API ingestion endpoint. Refer to Reitti's API documentation for details on the endpoint and required parameters.

### Third-Party Integration

A community fork of the [karldonteljames/reitti-HAIntegration](https://github.com/karldonteljames/reitti-HAIntegration) repository provides an integration. The updated fork is available at [myakove/reitti-HAIntegration](https://github.com/myakove/reitti-HAIntegration), which includes instructions for installation using HACS (Home Assistant Community Store).

### Troubleshooting

If you encounter any issues, feel free to reach out for support via [GitHub](https://github.com/dedicatedcode/reitti).
