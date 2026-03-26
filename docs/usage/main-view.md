---
title: "Main View"
description: "Overview of the main interface and its components in Reitti"
weight: 1
tags: ["usage", "interface", "navigation"]
---

The main view is the central interface of Reitti where you can visualize and interact with your location data. This page provides an overview of its key components and features.

## Main Menu

Located in the top navigation bar, the main menu provides access to all major sections of Reitti:

- **Timeline** – The main view showing your location data on a map (this page)
- **Memories** – Create and manage location-based memories (see [Memories](../memories/index.md))
- **Statistics** – View detailed analytics of your movement patterns
- **Settings** – Configure application preferences and integrations
- **Enter Live-Mode** - Switch to real-time location tracking
- **Enter Fullscreen** – Expand the interface to fullscreen view
- **Logout** – Sign out of your Reitti account

## Timeline Component

The timeline component is located on the left side of the interface and displays your location history chronologically:

### User Switcher
If you have access to other users' data (via [Share Access](share-access.md) or [Reitti Integration](../integrations/reitti.md)), a user switcher appears at the top of the timeline. This allows you to:
- Switch between different users' timelines
- View location data for multiple users
- Compare movement patterns across users

### Chronological List
Below the user switcher, the timeline shows a chronological list of all visits and trips during the selected time range:
- **Visits** – Periods where you stayed at a specific location
- **Trips** – Movement between locations with transportation mode information

### Interactive Features
- **Click to Zoom** - Clicking on a timeline entry zooms the map to that element
    - For trips: Highlights the route on the map
    - For visits: Centers the map on the location
- **Click Again to Restore** – Clicking the same entry again restores the previous map view
- **Edit Visits** – When a visit is selected, hover over it to reveal an edit icon (pencil) that takes you to [Edit Place](place-edit.md)
- **Edit Trips** – When a trip is selected, hover over it and click the edit icon to change the transportation mode


## Date Picker

The date picker is a horizontal interface that allows flexible navigation through your location history. It displays dates as interactive elements with multiple modes and selection options:

### Date Selection
- **Single Date Selection** – Click on a date to select it, loading data and updating the timeline
- **Range Selection Mode** – Click a selected date again to enter range selection mode, then click another date to select a range
- **Range Modification** – In range selection mode, click any other date to change the range boundaries
- **Range Clearing** – In range selection mode, click the start or end date to clear the selection and exit range mode

### Navigation Methods
- **Horizontal Scrolling** – Drag the date slider left/right or use horizontal scroll to navigate through time
- **Mode Switching** – Scroll up/down to switch between different time granularity modes:
    - **Day Mode** – View individual days
    - **Month Mode** – View months
    - **Year Mode** – View years

### Drill-Down Navigation
When drilling into time periods:
- Scrolling into a year (e.g., 2024) aligns to January 2024
- Scrolling into a month (e.g., March 2024) aligns to March 1, 2024
- The date picker positions the selected period under the mouse cursor for intuitive navigation

### Advanced Range Selection
- **Year Ranges** – Select a year, click it again, then select another year to create a range from January 1 of the first year to December 31 of the second year
- **Month Ranges** – Similarly, select months to create ranges spanning from the first day of the first month to the last day of the second month
- **Arbitrary Ranges** – Combine different modes to create custom date ranges spanning days, months, or years


## View Control

The View Control component sits above the date picker and provides tools for controlling how your location data is visualized:

### Replay Controls
- **Start Replay** – Begins a replay of all your movements during the selected time range, animating your path on the map
- **Speed Control** – Adjusts the playback speed of the replay (slow, normal, fast)
- **Time Control Slider** – When opened, displays a slider above the View Control that allows you to scrub through the replay time to show specific ranges of interest

### Today Button

- **Today** – Jumps to the current date and time, if not currently selected

### Map View Settings
The map view control allows you to customize the map display with various settings:
- **3D View** - Enable/disable the 3D perspective view of the map
- **Render Buildings** - Toggle building rendering for more detailed urban environments
- **Globe Projection** – Switch between flat map and globe projection views
- **Terrain Layer** - Enable/disable terrain elevation visualization
- **Satellite View** - Toggle between map and satellite imagery
- **North Alignment** – Align the map with true north (disables automatic rotation)

### Settings Menu
- **Open Settings** – Access the main view settings menu for additional customization options


## Settings

The Settings menu provides comprehensive control over how your location data is displayed and analyzed:

### Path Display Modes
- **Standard** – Displays optimized paths that balance detail with performance by not overwhelming the browser with all points in the time range
- **Raw Path** – Displays all location data points without any optimizations, showing the complete raw data
- **Edge Bundling** – Bundles paths based on proximity, making it easy to visualize your most frequently used routes within the selected time range

### 24-Hour Aggregate Mode
When enabled, this feature aligns all times to the day, allowing you to:
- Analyze daily patterns by seeing which paths you typically take at specific times (e.g., 8 AM commute routes)
- Identify when you're most likely to be in certain locations during the evening
- When combined with the replay feature, all days in the selected time range are played simultaneously, showing aggregated daily patterns

### Interface Controls
- **Hide Timeline** – Toggle visibility of the timeline component on the left side
- **Hide Date Picker** – Toggle visibility of the date picker component

## Live Mode

Live mode provides real-time tracking functionality with a kiosk-style display:

### Real-time Tracking
- **Automatic Updates** – The display automatically updates as soon as new location data arrives
- **Latest Locations** – Shows the most recent known location of you and all connected users
- **User Avatars** – Each user is represented by their avatar on the map
- **Hover Information** – Hover over an avatar to display additional information including when the data was last updated

### Multi-User Display
- **Connected Users** – View all users you have access to via [Share Access](share-access.md) or [Reitti Integration](../integrations/reitti.md)
- **Real-time Movement** – Watch as user locations update in real-time as they move

### Kiosk Mode
- **Continuous Display** – Ideal for wall-mounted displays or shared screens
- **Minimal Interface** – Clean, focused display optimized for at-a-glance viewing
- **Automatic Refresh** – No user interaction required to see updated locations
- 
## Navigation Tips

- **Zoom Controls** – Use mouse wheel, +/- buttons, or double-click to zoom
- **Pan Navigation** – Click and drag to move around the map
- **Search Locations** – Use the search bar to find specific places
- **Fullscreen Mode** – Expand the map to fullscreen for better visibility
- **Export View** – Export the current map view as an image or PDF

## Getting the Most from the Main View

1. **Combine Components** – Use the timeline with date picker to analyze specific time periods
2. **Customize Display** – Adjust map settings to highlight the information most relevant to you
3. **Use Live Mode** – Enable live tracking when actively moving to see real-time updates
4. **Save Views** – Bookmark frequently used date ranges and map settings combinations