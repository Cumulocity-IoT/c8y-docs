---
date:
title: Location tab shows the current location and the tracking trace
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
ticket: DM-7583
version:
environment_availability:

---
In the Device Management application, the device details showed the current position of a device in the **Location** tab and its movement history in a separate **Tracking** tab.

The **Location** tab now shows both on the same map: the current location of the device and, next to the map, the tracking events of the selected time range together with the path of the device. The **Tracking** tab has been removed, and links to it open the **Location** tab. The **Location** tab is now also shown for devices that only send location update events (`c8y_LocationUpdate`).

The **Location** tab also offers the following improvements:

* Coordinates can be displayed as **Decimal degrees**, **Degrees and decimal minutes**, **Degrees, minutes, seconds**, or **Signed decimal**. The selected format is saved for your user.
* When you edit the location, you can paste coordinates in any of these formats. Saving a new location of a device also adds a location update event, so that the change becomes part of the path of the device.
* Map popups, also on the maps in the Cockpit application, show the alarm counts per severity and, for devices, the connection status.

For details, see [Viewing device details > Location](/device-management-application/viewing-device-details/#location).

If you build applications with the Web SDK: `TrackingComponent`, `TrackingTabFactory`, and `trackingFeatureProvider` from `@c8y/ngx-components/tracking` are deprecated. The **Location** tab from `@c8y/ngx-components/location` shows the tracking trace.
