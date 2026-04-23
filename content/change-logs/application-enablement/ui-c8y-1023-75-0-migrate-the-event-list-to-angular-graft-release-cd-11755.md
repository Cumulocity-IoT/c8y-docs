---
date: ""
title: Events list and widget migrated to Angular
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
The "Events list" widget has been migrated to Angular and enhanced to improve usability and performance, providing a modern, consistent foundation with the current UI framework. Updates include:                                                                                                                                                                                                                                                                 
  - **Events view in Cockpit**: The events view node is now available in Cockpit, not just Device management.                                                          
  - **Events tab in Cockpit groups**: The events tab with the events list is now available on Cockpit groups, where previously wasn't.                              
  - **Auto-refresh**: Integrated with the global time context to enable real-time updates that reflect the dashboard's selected time range.                            
  - **Child device events**: Optionally display events from child devices, mirroring functionality from the Alarms widget — enabled by default in groups.
  - **Image preview**: Binary image attachments can be previewed inline with consistent dimensions, without opening the full event view.                               
  - **Custom metadata preview**: Custom event properties are displayed consistently with the Alarm view.                                                               
  - **Shareable events**: Each event has a direct URL that can be copied from the browser address bar and shared - opening the link takes the recipient straight to that event's details, the same pattern used for alarms. 