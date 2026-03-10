---
date: ""
title: Added nearby clustering to cluster map
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
ticket: MTM-65967
version: 1023.58.0
---
When viewing cluster maps with many nearby data points, the map can become cluttered and difficult to read. The Cockpit application now automatically groups nearby clusters, allowing you to see the overall distribution of your devices and assets more clearly. As you zoom in on the map, the nearby clusters automatically expand to show individual data points, providing a better user experience when working with dense datasets on cluster maps. If a device or asset is placed in the same position, the user can click on the marker to see more clearly which markers are placed. Warning colors for alarms are merged, and the most critical alarm is shown. This improvement applies to all existing map widgets and to customized Web SDK-based cluster map implementations in your applications without requiring any configuration changes.