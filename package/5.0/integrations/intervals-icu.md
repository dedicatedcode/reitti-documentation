---
title: "intervals.icu Integration"
description: "Import recorded activities from intervals.icu into your timeline"
tags: [ "integrations" ]
---

[intervals.icu](https://intervals.icu/) is an online training platform that collects your activities from Garmin
Connect, Wahoo, Suunto and other services. This integration uses it as a source of past tracks: instead of running
a tracking app on your phone all day, your watch records the ride, intervals.icu picks up the file, and Reitti
downloads it afterwards.

### Why Use This

- **No phone required**: your watch already records the track, so nothing has to run in your pocket
- **Your original recordings**: activities are imported as the files your device produced, not as summarised data
- **Backfills years of history**: connect an account you have had for a long time and the past activities show up
  on your timeline
- **Works alongside live tracking**: activities that were streamed live are skipped, so nothing is imported twice

### Configuration Steps

1. Sign in at [intervals.icu](https://intervals.icu/).
2. Open your user settings and scroll to **Developer Settings** at the bottom of the page.
3. Copy your **API key**.
4. In Reitti, go to **Settings > Integrations** and open **External Data Stores > intervals.icu Integration**.
5. Paste the API key and choose which Reitti **device** the imported activities should belong to.
6. Press **Save Configuration**, then **Test Connection** to confirm the key works. Reitti greets you by your
   intervals.icu athlete name.

### Importing Your Activities

Once the integration is saved and enabled, two buttons are available:

| Button                   | What it does                                                                          | When to use it                        |
|:-------------------------|:--------------------------------------------------------------------------------------|:--------------------------------------|
| **Sync Now**             | Imports the activities recorded since the last sync, usually within a few minutes.    | After a ride, or to fill a small gap. |
| **Load Historical Data** | Goes through your whole intervals.icu history and imports everything that is missing. | Once, when you first connect.         |

Both are safe to press more than once. Reitti remembers what it has already imported, so a repeated run only
picks up what is new.

A scheduled sync also runs in the background once per hour, so recent activities appear on their own without any
manual action. An activity only shows up that long after the ride anyway, because it first has to travel from your
watch to Garmin and on to intervals.icu. Long imports run as a background job, meaning you can close the browser while
they work. You can follow the
progress under **Settings > Job Status**.

### Things to Keep in Mind

**There is a daily download limit.** intervals.icu allows about **5000 requests per day** for an API key, and
Reitti needs roughly one request per activity. The daily limit resets at midnight UTC. A first import of several
thousand activities will therefore not finish in a single run, and that is expected. Reitti keeps track of what it
has already downloaded, so you can simply press **Load Historical Data** again later and it continues where it
stopped. Nothing is imported twice and nothing is lost.

**Some activities have no track to import.** Indoor trainer sessions, swims and strength workouts do not record a
GPS track, so they produce no location points. Reitti downloads them once, notes that there is nothing to import,
and never looks at them again. They are harmless, but they do count towards the daily limit.

**Reitti can only import what intervals.icu has.** If an activity never made it into your intervals.icu account,
Reitti will not find it either. Check intervals.icu first when an activity is missing.

**The full history always starts from a fixed date.** Because intervals.icu cannot tell Reitti how far back your
activities go, a historical import starts at 1 January 2010 by default. For a newer account this simply returns
nothing for the years before you started.

**Failed imports do not retry on their own.** If an import stops, the Job Status page tells you why. Fix the
cause, usually an invalid API key or an exceeded daily limit, and press the button again to carry on.

### Advanced Settings

If you run Reitti with Docker, a few environment variables let you tune the import. You do not need them for
normal use.

| Variable                               | Description                                                                                     | Default       |
|:---------------------------------------|:------------------------------------------------------------------------------------------------|:--------------|
| `INTERVALS_ICU_IMPORT_SCHEDULE`        | How often the automatic sync runs as a cron expression.                                         | once per hour |
| `INTERVALS_ICU_MAX_ACTIVITIES_PER_RUN` | How many activities a single sync imports. The rest follows in later runs.                      | `25`          |
| `INTERVALS_ICU_HISTORY_EARLIEST_DATE`  | The date a historical import starts from. Set this later if you know your history is recent.    | `2010-01-01`  |
| `INTERVALS_ICU_SLICE_DELAY_SECONDS`    | Pause between batches of a historical import. Raising it spreads a large import over more time. | `2`           |

See [Docker Compose Configuration](../infrastructure/docker-config.md) for the full list of environment variables.

### Troubleshooting

**Test Connection reports HTTP 401**
The API key is wrong or was regenerated in intervals.icu. Copy the current key from **Developer Settings** and
save the configuration again.

**The import stopped with a rate limit message**
The daily limit was reached. Wait until it resets at midnight UTC and press **Load Historical Data** again. If
your history is very large, you can slow the import down with `INTERVALS_ICU_MAX_ACTIVITIES_PER_RUN` and
`INTERVALS_ICU_SLICE_DELAY_SECONDS`.

**An activity did not appear in Reitti**
Check that it is visible in intervals.icu first. If it is, press **Load Historical Data** again. Indoor sessions
and swims never appear because they have no GPS track, which is expected.

**Imported activities land on the wrong device**
Save the configuration again and pick a different device. Existing activities stay with the device they were
imported to.

### Further Reading

- [intervals.icu](https://intervals.icu/)
- [OwnTracks Recorder Integration](./owntracks-recorder.md), the other way of importing past tracks
