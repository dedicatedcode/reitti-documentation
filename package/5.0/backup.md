---
title: "Backup"
description: "How to backup your Reitti database and restore from backups"
weight: 9
tags: ["setup"]
---

Reitti stores all your location data, visits, and trips in a PostgreSQL database. Since version 2.0, Reitti also stores uploaded images for the Memories feature in a mounted volume or path under `/data`. Both the database and the data volume need to be backed up, as all other data can be regenerated or reconfigured.

### What Needs to Be Backed Up

**Database and Data Volume** - All your location tracking data, processed visits, trips, and user settings are stored in the PostgreSQL database. Uploaded images for Memories are stored in the data volume (typically a Docker named volume like `reitti_data` mounted at `/data`). The application code and configuration can be easily restored from your deployment setup.

### Creating Database Backups

Since Reitti typically runs with PostgreSQL in a Docker Compose stack, you can create backups using the following commands:

#### Full Database Backup

```bash
docker compose exec postgis pg_dump -U reitti -d reittidb > backup_$(date +%Y%m%d_%H%M%S).sql
```

#### Compressed Backup (Recommended)

```bash
docker compose exec postgis pg_dump -U reitti -d reittidb | gzip > backup_$(date +%Y%m%d_%H%M%S).sql.gz
```

#### Custom Format Backup (Fastest Restore)

```bash
docker compose exec postgis pg_dump -U reitti -d reittidb -Fc > backup_$(date +%Y%m%d_%H%M%S).dump
```

### Backing Up the Data Volume

For the data volume (e.g., a named Docker volume called `reitti_data` that stores uploaded images), you can create backups using Docker commands. This assumes your volume is named `reitti_data` and mounted at `/data` in the container.

#### Full Data Volume Backup

```bash
docker run --rm -v reitti_data:/data -v $(pwd):/backup alpine tar czf /backup/reitti_data_backup_$(date +%Y%m%d_%H%M%S).tar.gz -C /data .
```

This command:
- Runs a temporary Alpine Linux container.
- Mounts the `reitti_data` volume to `/data` inside the container.
- Mounts your current directory to `/backup` for output.
- Creates a compressed tar archive of the entire `/data` directory (containing the images) and saves it to your local directory.

#### Compressed Backup (Recommended for Large Volumes)

The command above already compresses the archive using `gzip`. For very large volumes, consider splitting the backup:

```bash
docker run --rm -v reitti_data:/data -v $(pwd):/backup alpine sh -c "tar czf /backup/reitti_data_backup_$(date +%Y%m%d_%H%M%S).tar.gz -C /data . && split -b 1G /backup/reitti_data_backup_$(date +%Y%m%d_%H%M%S).tar.gz /backup/reitti_data_backup_$(date +%Y%m%d_%H%M%S).part_"
```

### Restoring from Backup

#### From Database SQL Backup

```bash
docker compose exec -T postgis psql -U reitti -d reittidb < backup_20240101_120000.sql
```

#### From Compressed Database SQL Backup

```bash
gunzip -c backup_20240101_120000.sql.gz | docker compose exec -T postgis psql -U reitti -d reittidb
```

#### From Custom Format Database Backup

```bash
docker compose exec -T postgis pg_restore -U reitti -d reittidb -c backup_20240101_120000.dump
```

#### Restoring the Data Volume

To restore the data volume from a backup archive:

```bash
docker run --rm -v reitti_data:/data -v $(pwd):/backup alpine tar xzf /backup/reitti_data_backup_20240101_120000.tar.gz -C /data
```

This command:
- Runs a temporary Alpine Linux container.
- Mounts the `reitti_data` volume to `/data`.
- Mounts your current directory to `/backup` for input.
- Extracts the compressed tar archive back into `/data`, restoring the images.

If you split the backup, first recombine the parts:

```bash
cat reitti_data_backup_20240101_120000.part_* > reitti_data_backup_20240101_120000.tar.gz
```

Then proceed with the restore command above.

### Automated Backup Strategy

Consider setting up automated backups using a cron job for both database and data volume:

```bash
# Add to crontab for daily backups at 2 AM
0 2 * * * cd /path/to/reitti && docker compose exec postgis pg_dump -U reitti -d reittidb | gzip > /backup/path/reitti_db_$(date +\%Y\%m\%d).sql.gz && docker run --rm -v reitti_data:/data -v /backup/path:/backup alpine tar czf /backup/reitti_data_$(date +\%Y\%m\%d).tar.gz -C /data .
```

### Best Practices

- **Regular Schedule**: Set up automated daily or weekly backups for both database and data volume
- **Multiple Locations**: Store backups in different locations (local, cloud storage)
- **Test Restores**: Periodically test your backup restoration process for both components
- **Retention Policy**: Keep multiple backup versions but clean up old ones to save space
- **Monitor Size**: Track backup file sizes to detect potential issues, especially for image-heavy data volumes
- **Volume Naming**: Ensure your Docker Compose file uses a named volume like `reitti_data` for easy backup commands

### Storage Considerations

Location tracking data can grow significantly over time, and image uploads for Memories can add substantial storage needs. Monitor your backup sizes and consider:
- Compressing backups to save storage space
- Implementing backup rotation to manage disk usage
- Using incremental backups for very large datasets
- Allocating sufficient space for the `reitti_data` volume in your Docker setup
