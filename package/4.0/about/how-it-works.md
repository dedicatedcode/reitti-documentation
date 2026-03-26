---
title: "How Reitti Works"
description: "Understanding Reitti's data processing pipeline and location analysis algorithms"
weight: 4
tags: ["overview"] 
---

Reitti depends on a consistent stream of geo location data to process and calculate visits, places, and trips between visits. The data processing pipeline follows these steps:

### Data Processing Pipeline

#### 1. Data Ingestion
Location data gets ingested into Reitti from various sources (mobile apps, file uploads, API endpoints).

#### 2. Data Verification
The system verifies incoming data for consistency and filters out anomalies or GPS flukes that could affect analysis accuracy.

#### 3. Visit Detection
Around each datapoint, Reitti calculates potential visits. This process can identify multiple short visits and requires at least 5 datapoints nearby over a timespan of 5 minutes to establish a valid visit.

#### 4. Visit Processing
Successive visits are merged into ProcessedVisits, combining related location points into meaningful stay periods.

#### 5. Significant Places Creation
After visits are merged into ProcessedVisits, SignificantPlaces are created or matched for each ProcessedVisit. SignificantPlaces represent locations on the map where you spend time - such as your home, workplace, or any other location where you stayed more than 5 minutes.

#### 6. Address Resolution
SignificantPlaces are processed through reverse geocoding to assign human-readable names and addresses, making them easier to identify and understand.

#### 7. Trip Calculation
Finally, the system calculates Trips between successive ProcessedVisits, tracking your movement patterns and transportation between significant locations.

This pipeline ensures that raw GPS data is transformed into meaningful insights about your movement patterns, frequently visited places, and travel behavior.
