---
date: ""
title: Enhanced Event list view and widget
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-64563
version: 1023.75.0
---
The event list view and the "Event list" widget have been migrated to Angular and enhanced to improve usability and performance, providing a modern, consistent
  foundation with the current UI framework. Updates include:
 **Events page in Cockpit**: An **Events** page is now available in the Cockpit application, not only in the Device Management application.                         
  - **Events tab in Cockpit groups**: The **Events** tab with the events list is now available for Cockpit groups.                                                     
  - **Auto-refresh**: Integrated with the global time context to enable real-time updates that reflect the dashboard's selected time range.                            
  - **Child device events**: Optionally display events from child devices, mirroring functionality from the "Alarms" widget — enabled by default in groups.
  - **Image preview**: Binary image attachments can be previewed inline with consistent dimensions, without opening the full event view.                               
  - **Custom metadata preview**: Custom event properties are displayed consistently with the **Alarms** page.                                                          
  - **Shareable events**: Each event has a direct URL that can be copied from the browser address bar and shared. Opening the link takes the recipient straight to that event's details; the same pattern as used for alarms. 