---
title: "Using Docker Swarm / Compose Secrets"
description: "Using Docker Swarm / Compose Secrets with Reitti"
weight: 20
tags: ["configuration"]
---
|since|v3.1.0|.version-badge|

## General Information

When deploying **Reitti** with Docker Swarm or Docker Compose, you can keep sensitive
information (for example database credentials) out of the plain‑text `docker‑compose.yml`
by using Docker **secrets**.

The workflow consists of three steps:

1. **Create the secret files** on the host.
2. **Register the secrets** in the top‑level `secrets` section of the compose file.
3. **Reference the secrets** in the `reitti` service and adjust the environment
   variables so that the application reads the secret from the file system.

---

### 1. Create secret files

Create a directory (e.g. `secrets/`) next to your `docker-compose.yml` and place
the secret values in plain‑text files:

```bash
mkdir -p secrets
echo "my_postgis_user"   > secrets/postgis_user.txt
echo "my_strong_password" > secrets/postgis_password.txt
# Add any other secrets you need in the same way
```

> **Note**: The files should contain only the secret value, without extra line
> breaks or quotes.

---

## 2. Register the secrets in the compose file

Add a top‑level `secrets` block that points to the files you just created:

```yaml
secrets:
  postgis_user:
    file: ./secrets/postgis_user.txt
  postgis_password:
    file: ./secrets/postgis_password.txt
```

Docker will copy these files into the secret store and make them available to
containers under `/run/secrets/<secret_name>`.

---

## 3. Use the secrets in the `reitti` service

### a) Declare the secrets for the service

```yaml
services:
  reitti:
    image: dedicatedcode/reitti:latest
    ports:
      - "8080:8080"
    depends_on:
      postgis:
        condition: service_healthy
        restart: true
      redis:
        condition: service_healthy
      tile-cache:
        condition: service_healthy
    volumes:
      - reitti-data:/data/
    environment:
      PHOTON_BASE_URL: http://photon:2322
      # Append `_FILE` to the original env‑var name and point to the secret path
      POSTGIS_USER_FILE: /run/secrets/postgis_user
      POSTGIS_PASSWORD_FILE: /run/secrets/postgis_password
      POSTGIS_DB: reittidb
      POSTGIS_HOST: postgis
    secrets:
      - postgis_user
      - postgis_password
```

### b) How the application reads the secret

Reitti follows the convention used by many Docker‑based applications: if an
environment variable ends with `_FILE`, the application reads the file path
specified by that variable and uses its content as the actual value.  
Therefore `POSTGIS_USER_FILE` and `POSTGIS_PASSWORD_FILE` will be resolved to
the contents of the secret files.

---

## Full Example `docker-compose.yml`

Below is a minimal compose file that demonstrates the complete setup for the
`reitti` service with Docker secrets.  The other services (`postgis`, `redis`, etc.) are omitted for brevity – add them back as required by your
deployment.

```yaml
version: "3.8"

services:
  reitti:
    image: dedicatedcode/reitti:latest
    ports:
      - "8080:8080"
    depends_on:
      postgis:
        condition: service_healthy
        restart: true
      redis:
        condition: service_healthy
      tile-cache:
        condition: service_healthy
    volumes:
      - reitti-data:/data/
    environment:
      PHOTON_BASE_URL: http://photon:2322
      POSTGIS_USER_FILE: /run/secrets/postgis_user
      POSTGIS_PASSWORD_FILE: /run/secrets/postgis_password
      POSTGIS_DB: reittidb
      POSTGIS_HOST: postgis
    secrets:
      - postgis_user
      - postgis_password

  # ... other services such as postgis, redis, etc. ...

volumes:
  reitti-data:

secrets:
  postgis_user:
    file: ./secrets/postgis_user.txt
  postgis_password:
    file: ./secrets/postgis_password.txt
```

---

## Tips & Best Practices

* **Do not commit secret files** to version control. Add the `secrets/` directory
  to `.gitignore`.
* **Rotate secrets** by updating the files and redeploying the stack (`docker
  stack deploy …` or `docker compose up -d`).
* **Use Docker Swarm mode** (`docker stack deploy`) for production‑grade secret
  handling; Docker Compose works for local development and simple deployments.
