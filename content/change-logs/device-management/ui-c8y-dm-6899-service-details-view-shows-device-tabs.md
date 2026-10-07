---
date:
title: Service details view shows tabs for all supported capabilities
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-6899
version:
environment_availability:

---
In the Device Management application, the service details view showed only the **Alarms**, **Events**, **Measurements**, and **Commands** tabs, even if the service supported more capabilities, such as log retrieval or remote access.

The service details view now shows the same tabs as the device details view, for example **Logs**, **Location**, **Software**, and **Remote access**. Each tab appears under the same conditions as for a device. For example, the **Location** and **Tracking** tabs require the `c8y_Position` fragment on the service. When you open an alarm or an event from a service, you now stay in the service details view instead of switching to the global list.

Existing services are not affected unless they declare these fragments. A service without them shows the **Info**, **Alarms**, **Events**, and **Commands** tabs. For details, see [Managing device services](/device-management-application/managing-device-services/).
