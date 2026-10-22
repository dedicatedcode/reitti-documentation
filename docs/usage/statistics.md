---
title: "Statistics"
description: "Monthly, yearly and all-time reports about where you spent your days and nights"
weight: 1
tags: [ "usage", "statistics", "home" ]
---

The **Statistics** page turns your visits and trips into a report for a month, a year or your whole history. It is
reachable through the bar chart icon in the main menu.

## Navigation

The bar at the top of the page shows the current period.

- **Arrows** jump to the previous or next period that contains data.
- **Month / Year / All** switches the scope. The report keeps the same structure for every scope, the numbers are
  aggregated accordingly.
- **Clicking the period name** opens a picker with every year and month that contains data.

Every period has its own address, for example `/statistics/2026/9`, `/statistics/2026` or `/statistics/all`, so you can
bookmark or share a link to it.

![Statistics](../img/statistics-full.png)

## What the report contains

| Section                   | What it shows                                                                                                                                                                                                                                                                                                                                              |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Headline                  | A short sentence about the most striking pattern of the period, followed by how many days were tracked and how many of them had too little data to trust.                                                                                                                                                                                                  |
| Key figures               | Distance, share of weekday time spent at home, places visited (and how many of them were new), the [Eddington number](#eddington-number) and nights away from home.                                                                                                                                                                                        |
| Weekdays and weekends     | Time at home and at other places, a typical day's distance, top transport mode, when you usually left and came back, outings and stops.                                                                                                                                                                                                                    |
| What actually moved you   | Distance, time and trips per transport mode, plus the average speed of each mode.                                                                                                                                                                                                                                                                          |
| Where the days went       | Every day is classified as *Commute*, *Wander*, *Travel*, *Home* or *Untracked*. A calendar shows the classification per day, faded cells mark days with thin data.                                                                                                                                                                                        |
| Where the hours went      | Share of the period spent at home, at other places, moving or without data.                                                                                                                                                                                                                                                                                |
| The usual trip            | The trip you made on most weekdays, how often and how long it usually takes. The radar below places every visited place by direction and distance (logarithmic) around your home.                                                                                                                                                                          |
| Routines                  | Places you return to regularly, how often, at what time and for how long.                                                                                                                                                                                                                                                                                  |
| Nights and places         | Nights away from home, the longest stretch away, where you slept, countries and cities.                                                                                                                                                                                                                                                                    |
| Exploration               | Only available with [spatial coverage](../configurations/spatial-coverage.md) enabled. How much of your home area you have explored, how many new cells you visited and how much of the distance was on known ground.                                                                                                                                      |
| Comparison and top places | Comparison with another period, plus the busiest month and day and the places you spent the most time at. See [Comparing periods](#comparing-periods).                                                                                                                                                                                                     |
| Odds and ends             | Small observations, for example the least familiar day, walks that started and ended at home or trips away that never became a [memory](../memories/index.md). Only trips with at least three consecutive nights away and a place at least 10 km from home are listed. With an enabled Immich integration, long stays without a photo are counted as well. |

Every section has a **?** icon next to its title. Clicking it explains what the section shows and how to read the
numbers.

Place names in the routines and top places link to the place, so you can check or edit it. Days mentioned in *Odds and
ends*, for example nights away that never became a memory, link to the timeline of those days.

All times are shown in your local timezone (or the timezone override from your settings) and respect the configured
start of the day.

### Nights away without a memory

The *Odds and ends* section reminds you of nights away that are not linked to a memory. To keep this list useful, Reitti
only includes overnight stays that last at least three consecutive nights and reach a place at least 10 km from home.
Shorter stays and stays close to home are left out.

Matching nights are grouped into one entry per stretch. Each entry links to the timeline for those days, so you can
check the nights and decide whether to create a memory.

## Comparing periods

The *Comparison and top places* section compares the shown period with another one. The selector at the top of the
section shows which period is used:

- **Previous month** or **previous year** is used by default.
- **Same month last year** is offered in the monthly view.
- **Any other month or year with data** can be chosen as well.

Each line shows the value of the shown period first, followed by the value of the chosen period. Check the number of
tracked days in the first line before reading the totals: a period with fewer tracked days naturally has lower totals.
The selection is part of the address (for example `/statistics/2026/9?compare=2025-9`), so it survives a reload and can
be bookmarked. Moving to another period with the arrows resets the comparison to the previous period.

## How Reitti determines your home

Many numbers depend on knowing where home is. Reitti looks at your **nights**: a night runs from 22:00 until 06:00 in
the timezone of the place you were at. The place where you spent most of that time is where you slept. If your phone
stopped recording during the night, but you were at the same place before and after, the night still counts for that
place.

For every night, Reitti counts where you slept during the 45 nights before and the 45 nights after it. The place with
the most nights becomes home, provided it collected at least 10 nights and 30% of the tracked nights in that window.

Places marked as *Home* (see [Edit Places](place-edit.md)) are preferred, but only while you actually slept there: a
marked place wins as long as it has about as many nights in the window as the leading place. Marking your current home
therefore does not rewrite the past. In the years before you moved in, the place where you lived at that time was used
as
a home.

### Vacations and moving

Because the window spans roughly three months, a vacation never replaces your home. Three weeks at the coast are 21
nights against about 70 nights at home, so those nights are counted as **nights away** instead. A place where you slept
away from home on several separate occasions is listed as a **second base, not a new home**.

When you move, the new place dominates the window after a few weeks and becomes home from around the date of the move.
For the most recent weeks there are no later nights to look at yet. If most recent nights were spent somewhere else, the
report says that your home seems to be changing.

### Home suggestion

If one place collected most of your last 90 nights and is not marked as Home yet, the statistics page suggests marking
it as Home. *Mark as Home* sets the place type for you, *Not my home* hides the suggestion for this place.

## Eddington number

The Eddington number E is the largest number for which you have E days with a distance of at least E kilometers (or
miles, depending on your unit settings). A single long trip cannot raise it, only many active days can. In the monthly
view, the number covers the current year up to the selected month.
