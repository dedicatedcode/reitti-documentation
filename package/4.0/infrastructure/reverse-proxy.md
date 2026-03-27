---
title: "Reverse Proxy Configuration"
description: "Guide for running Reitti behind reverse proxies like nginx, Apache, or Caddy"
weight: 0
tags: ["infrastructure", "deployment", "reverse-proxy", "nginx", "apache"]
---

Running Reitti behind a reverse proxy is a common deployment pattern that provides additional security, SSL termination, and load balancing capabilities. This guide covers the essential configuration requirements and provides examples for popular reverse proxy servers.

## General Requirements

When deploying Reitti behind a reverse proxy, ensure the following:

### Required Headers
The reverse proxy must set these headers for proper operation:

- **`X-Forwarded-For`**: Contains the original client IP address
- **`X-Forwarded-Proto`**: Indicates the original protocol (http/https)
- **`Host`**: Preserves the original host header

These headers are used by Reitti to:

- Generate correct redirect URLs
- Construct proper base URLs for API responses
- Determine the correct protocol for OAuth and other external callbacks

### Upload Size Limits
If you plan to use large file uploads (GPX files, Google Timeline exports, etc.), configure appropriate limits:

- **Cloudflare Free Tier**: 100MB maximum upload size
- **nginx**: Configure `client_max_body_size`
- **Apache**: Configure `LimitRequestBody`
- **Caddy**: Configure `max_request_body`

See [Import Data](../usage/import-data.md) for information about supported file formats.

## nginx Configuration

Here's a complete nginx configuration example for Reitti:

```nginx
server {
    server_name reitti.example.com;

    # Increase upload size limit (adjust as needed)
    client_max_body_size 200m;

    # Timeout settings for large uploads
    client_body_timeout 10m;
    send_timeout 10m;

    location / {
        proxy_pass http://127.0.0.1:8080;  # Change port to match Reitti

        # Essential headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;

        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 10m;
        proxy_read_timeout 10m;

        # Buffer settings
        proxy_request_buffering on;
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;

    }

    # SSL configuration (recommended)
    listen 443 ssl http2;
    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
}
```

### Key Configuration Directives

- **`client_max_body_size 200m`**: Allows uploads up to 200MB
- **`client_body_timeout 10m`**: Extended timeout for large uploads
- **`proxy_set_header` directives**: Essential for proper Reitti operation
- **`proxy_read_timeout 10m`**: Long timeout for processing large imports

## Apache Configuration

For Apache HTTP Server, use the following configuration:

```apache
# HTTP to HTTPS redirect
<VirtualHost *:80>
    ServerName reitti.example.com
    Redirect permanent / https://reitti.example.com/
</VirtualHost>

# HTTPS configuration
<VirtualHost *:443>
    ServerName reitti.example.com

    # SSL configuration
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/example.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/example.com/privkey.pem

    # Increase upload size limit (200MB)
    LimitRequestBody 209715200

    # Proxy configuration
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:8080/
    ProxyPassReverse / http://127.0.0.1:8080/

    # Required headers for Reitti
    RequestHeader set X-Forwarded-Proto expr=%{REQUEST_SCHEME}
    RequestHeader set X-Forwarded-Port "443"
    RequestHeader set X-Forwarded-For expr=%{REMOTE_ADDR}

    # Timeout settings for large uploads
    ProxyTimeout 600

</VirtualHost>
```

### Configuration Notes:

1. **Port Configuration**: Change `127.0.0.1:8080` to match your Reitti instance port
2. **SSL Certificates**: Update paths to your actual certificate files
3. **Upload Limit**: `LimitRequestBody 209715200` sets a 200MB limit (adjust as needed)
4. **Headers**: The `X-Forwarded-Proto` header is essential for Reitti to detect HTTPS

## Caddy Configuration

Caddy provides automatic SSL with a simple configuration:

```caddy
reitti.example.com {
    # Increase upload size limit
    max_request_body 200MB
    
    # Reverse proxy
    reverse_proxy 127.0.0.1:8080 {
        # Headers
        header_up X-Forwarded-For {remote_host}
        header_up X-Forwarded-Proto {scheme}
        
        # Timeouts
        transport http {
            read_timeout 10m
            write_timeout 10m
            dial_timeout 60s
        }
    }
}
```

## Traefik Configuration

For Traefik v2+, use this configuration:

```yaml
http:
  routers:
    reitti:
      rule: "Host(`reitti.example.com`)"
      service: reitti-service
      middlewares:
        - compress
        - headers
      tls: {}
  
  services:
    reitti-service:
      loadBalancer:
        servers:
          - url: "http://127.0.0.1:8080"
  
  middlewares:
    compress:
      compress: {}
    headers:
      headers:
        customRequestHeaders:
          X-Forwarded-Proto: "https"
        customFrameOptionsValue: "SAMEORIGIN"
```

### Docker Compose Labels Configuration

When running Reitti in Docker with Traefik as the reverse proxy, you can configure routing directly via Docker Compose labels. This method is often simpler if Traefik is set up to automatically discover services.

Add the following labels to your Reitti service in `docker-compose.yml`:

```yaml
services:
  reitti:
    image: your-reitti-image
    # ... other configuration
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.reitti.entrypoints=websecure"
      - "traefik.http.routers.reitti.rule=Host(`reitti.example.com`)"
      - "traefik.http.routers.reitti.tls.certresolver=myresolver"
    networks:
      - traefik_default  # Ensure this network exists and Traefik is attached to it
```

**Key points:**
- Replace `reitti.example.com` with your actual domain.
- Ensure the `myresolver` certificate resolver is configured in your Traefik static configuration.
- The service must be connected to the same Docker network as Traefik (here `traefik_default`).
- Traefik must be running with the Docker provider enabled and watching for labels.

This label-based approach automatically configures HTTPS, routing, and TLS certificates without needing separate Traefik dynamic configuration files.

## Cloudflare Considerations

When using Cloudflare as a CDN in front of your reverse proxy:

### Free Tier Limitations
- **100MB maximum upload size** (cannot be increased in the free tier)
- Consider direct uploads bypassing Cloudflare for large files
- Or upgrade to a paid plan for larger upload limits

### Recommended Settings
1. **SSL/TLS**: Full (strict) mode
2. **Web Application Firewall**: Adjust rules as needed
3. **Caching**: Configure appropriate cache rules for static assets
4. **Page Rules**: Consider rules for API endpoints to bypass cache

### Header Management
Ensure Cloudflare passes through the necessary headers:

- `X-Forwarded-For`
- `X-Forwarded-Proto`
- `CF-Connecting-IP` (alternative for client IP)

## Testing Your Configuration

After configuring your reverse proxy, verify the setup:

### 1. Test Upload Limits
Try uploading a test file to verify size limits work correctly.

### 2. Verify SSL
Ensure all traffic redirects to HTTPS and certificates are valid. If you go to **Settings > Integrations**, you should see your host in the Mobile App Integrations section.

## Troubleshooting

### Common Issues

1. **Incorrect Redirects**
    - Symptom: Reitti redirects to internal IP or wrong port
    - Solution: Ensure `X-Forwarded-Proto` and `X-Forwarded-Host` headers are set

2. **Upload Failures**
    - Symptom: Large file uploads fail with 413 error
    - Solution: Increase `client_max_body_size` (nginx) or `LimitRequestBody` (Apache)

3. **Timeout Errors**
    - Symptom: Long-running imports fail
    - Solution: Increase timeout settings (`proxy_read_timeout`, `ProxyTimeout`, etc.)

### Debugging Steps

1. Check reverse proxy logs for errors
2. Examine Reitti application logs for header issues
3. Use curl with verbose output to test headers:
   ```bash
   curl -v -H "X-Forwarded-Proto: https" https://reitti.example.com/actuator/health
   ```
4. Test with smaller files first, then increase size gradually