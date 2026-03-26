---
title: "Custom Tiles"
description: "Configure a custom map tiles endpoint for Reitti"
weight: 20
tags: ["configuration"]
---

## General Information

Reitti can be configured to use a custom map tiles endpoint instead of the default OpenStreetMap tiles. This allows you to integrate with commercial map providers like MapTiler, or use your own self-hosted tile server for better performance, styling, or compliance with usage policies.

### Configuration

#### Docker

To enable custom tiles when running Reitti with Docker, you need to set the following environment variables in your **docker-compose.yml** file under the **reitti** service.

| Environment Variable        | Description                                                                                                                                     | Default Value | Example Value                                                    |
|:----------------------------| :---------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :--------------------------------------------------------------- |
| `CUSTOM_TILES_SERVICE`      | The URL template for your custom tile service. Use {z}, {x}, {y} placeholders for zoom, x, and y coordinates.                                 |               | `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=YOUR_API_KEY` |
| `CUSTOM_TILES_ATTRIBUTION`  | Attribution text that will be displayed on the map to credit the tile provider.                                                                |               | `© MapTiler © OpenStreetMap contributors`                        |

Here's an example of how you might add these to your **docker-compose.yml**:

```yaml
services:
  reitti:
    image: dedicatedcode/reitti:latest
    environment:
      - CUSTOM_TILES_SERVICE=https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=YOUR_API_KEY
      - CUSTOM_TILES_ATTRIBUTION=© MapTiler © OpenStreetMap contributors
# ... other configurations
```

#### Running from source

When running Reitti directly from its source code, custom tiles can be enabled by modifying your **application.properties** file. You need to uncomment and configure the following properties:

```properties
reitti.ui.tiles.custom.service=https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=YOUR_API_KEY
reitti.ui.tiles.custom.attribution=© MapTiler © OpenStreetMap contributors
```

By default, these properties are commented out in the configuration file:
```properties
#reitti.ui.tiles.custom.service=
#reitti.ui.tiles.custom.attribution=
```

Simply remove the `#` character and add your custom values.

### Provider Examples

#### MapTiler

MapTiler is a commercial map service provider that offers high-quality map tiles with various styles and global coverage.

**Obtaining MapTiler URLs:**

1. **Sign up for MapTiler**: Visit [maptiler.com](https://www.maptiler.com/) and create an account.

2. **Get your API key**: 
   - Log in to your MapTiler account
   - Navigate to the "Account" section
   - Copy your API key from the dashboard

3. **Choose a map style**:
   - Browse the available map styles in the MapTiler Cloud dashboard
   - Popular options include:
     - Streets: `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=YOUR_API_KEY`
     - Satellite: `https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=YOUR_API_KEY`
     - Outdoor: `https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=YOUR_API_KEY`
     - Basic: `https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=YOUR_API_KEY`

4. **Configure attribution**: MapTiler requires proper attribution. Use: `© MapTiler © OpenStreetMap contributors`

**Example MapTiler Configuration:**

**For Docker:**
```yaml
environment:
  - CUSTOM_TILES_SERVICE=https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=abcdef123456
  - CUSTOM_TILES_ATTRIBUTION=© MapTiler © OpenStreetMap contributors
```

**For Source:**
```properties
reitti.ui.tiles.custom.service=https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=abcdef123456
reitti.ui.tiles.custom.attribution=© MapTiler © OpenStreetMap contributors
```

### Important Notes

- **API Key Security**: Keep your API keys secure and never commit them to version control. Consider using environment variables or secrets management.
- **Usage Limits**: Most commercial providers have usage limits. Monitor your usage to avoid unexpected charges or service interruptions.
- **Attribution Requirements**: Always include proper attribution as required by your tile provider's terms of service.
- **URL Format**: Ensure your tile URL uses the correct placeholder format: `{z}` for zoom level, `{x}` for x coordinate, `{y}` for y coordinate.
- **HTTPS**: Use HTTPS URLs when possible for better security and to avoid mixed content warnings.

### Troubleshooting

- **Tiles not loading**: Verify your API key is correct and has sufficient quota
- **Attribution not showing**: Check that the attribution text is properly configured
- **Mixed content warnings**: Ensure you're using HTTPS URLs for tile services
- **Performance issues**: Consider using a CDN or caching layer for better performance
