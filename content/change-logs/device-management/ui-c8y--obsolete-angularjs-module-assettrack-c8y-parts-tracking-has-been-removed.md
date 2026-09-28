---
date: 2024-03-07
title: Obsolete AngularJS module AssetTrack (c8y.parts.tracking) has been removed
product_area: Device management & connectivity
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-3172
version: "''"
---
The AngularJS module `AssetTrack` (`c8y.parts.tracking`) has been removed as it is now considered obsolete. To include device tracking in your applications you can now use the Angular standalone `TrackingComponent` (`@c8y/ngx-components/tracking`) or directly provide the `trackingFeatureProvider` environment provider.