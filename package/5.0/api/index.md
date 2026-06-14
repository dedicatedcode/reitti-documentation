---
title: "API Documentation"
tags: ["api"]
weight: 5
---

Reitti provides a REST API that allows you to interact with your location data programmatically. This is useful for automation, integrations with other systems, and custom applications.

### Authentication

All API endpoints require authentication using an API token. You can provide the token in two ways:

1. **HTTP Header**: Include the token in the `X-API-TOKEN` header
2. **Query Parameter**: Add the token as a `token` parameter in the URL

Example using header:
```bash
curl -H "X-API-TOKEN: your-api-token" https://your-reitti-instance/api/v1/latest-location
```

Example using query parameter:
```bash
curl https://your-reitti-instance/api/v1/latest-location?token=your-api-token
```
