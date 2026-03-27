---
title: "Installation"
description: "Step-by-step guide to install and configure Reitti"
---
### Docker Installation (Recommended)

Docker is the easiest way to get Reitti up and running. The provided Docker Compose configuration handles all the required services including PostgreSQL with PostGIS and Redis.

Download the [docker-compose.yml](https://github.com/dedicatedcode/reitti/blob/main/docker-compose.yml) file and run:

```bash
docker-compose up -d
```

This will start all services and make Reitti available at http://localhost:8080. When you first open Reitti, it will prompt you to set the admin password.

### Using Pre-built JAR

If you prefer to run Reitti without Docker but don't want to build from source, you can download the pre-built JAR file from the releases page.

#### Prerequisites
- Java 25 or higher
- PostgreSQL with PostGIS extensions
- Redis

#### Installation Steps

1. Download the latest `reitti-app.jar` from the [releases page](https://github.com/dedicatedcode/reitti/releases/)

2. Create an `application.properties` file in the same directory as the JAR file with your environment configuration. For a complete list of all available configuration options with sane defaults, see the [latest application.properties](https://github.com/dedicatedcode/reitti/blob/e42e4369f8c48f261dd6a6e9b364c2ec3c44d9fe/src/main/resources/application.properties) file:
```properties
# Server configuration
server.port=8080

spring.datasource.url=jdbc:postgresql://localhost:5432/reittidb
spring.datasource.username=reitti
spring.datasource.password=reitti

#Redis configuration
spring.data.redis.host=localhost
spring.data.redis.port=6379
spring.data.redis.username=
spring.data.redis.password=

# Storage configuration (optional)
# Default: reitti.storage.path=data/
# Make sure the user running Reitti has write permissions to this directory
# reitti.storage.path=/path/to/storage/directory/
```

3. Run the application:
```bash
java -jar reitti-app.jar
```

The application will be available at http://localhost:8080. When you first open Reitti, it will prompt you to set the admin password.

**Important:** Ensure that the user running the Java process has write permissions to the storage directory (default: `data/` in the current working directory). Reitti will not start if it cannot write to this location.

### From Source

To build and run Reitti from source code:

#### Prerequisites
- Java 25 or higher
- Maven 3.6 or higher
- PostgreSQL with PostGIS extensions
- Redis

#### Build Steps

1. Clone the repository from GitHub:
```bash
git clone https://github.com/dedicatedcode/reitti.git
cd reitti
```

2. Adjust the variables in **src/main/resources/application.properties** for your environment. For a complete list of all available configuration options with sane defaults, see the [latest application.properties](https://github.com/dedicatedcode/reitti/blob/e42e4369f8c48f261dd6a6e9b364c2ec3c44d9fe/src/main/resources/application.properties) file:
```properties
# Server configuration
server.port=8080

spring.datasource.url=jdbc:postgresql://localhost:5432/reittidb
spring.datasource.username=reitti
spring.datasource.password=reitti

#Redis configuration
spring.data.redis.host=localhost
spring.data.redis.port=6379
spring.data.redis.username=
spring.data.redis.password=

# Storage configuration (optional)
# Default: reitti.storage.path=data/
# Make sure the user running Reitti has write permissions to this directory
# reitti.storage.path=/path/to/storage/directory/
```

3. Build the Spring Boot application using Maven:
```bash
mvn clean package
```

4. Run the application:
```bash
mvn spring-boot:run
```

The application will be available at http://localhost:8080. When you first open Reitti, it will prompt you to set the admin password.

**Important:** Ensure that the user running the Java process has write permissions to the storage directory (default: `data/` in the current working directory). Reitti will not start if it cannot write to this location.
