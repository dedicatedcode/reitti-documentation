---
title: "Browser Support"
description: "Supported browsers and known quirks when using Reitti"
weight: 40
tags: ["usage"]
---

Reitti is a browser-based application and renders its map with WebGL. It works with current versions of the browsers
listed below; older browsers or hardened privacy setups can prevent the map and timeline from rendering correctly.

### Supported Browsers

- **Chrome** / **Chromium**
- **Firefox**

### Requirements

- **WebGL**: The map view renders via WebGL, so WebGL must be enabled in your browser (most browsers enable it by
  default)
- **Canvas data extraction**: Reitti needs permission to extract canvas data

### Known Quirks

#### LibreWolf

Reitti does not render correctly in LibreWolf while fingerprinting protection is active. To use Reitti with LibreWolf:

- Disable fingerprinting protection for your Reitti instance
- Keep WebGL enabled
- Allow canvas data extraction