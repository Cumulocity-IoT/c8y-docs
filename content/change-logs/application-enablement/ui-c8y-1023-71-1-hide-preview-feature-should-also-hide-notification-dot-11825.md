---
date: ""
title: Notification dot now hidden when preview features are disabled
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66652
version: 1023.71.1
---
New preview features in {{< product-c8y-iot >}} are indicated by a notification dot in the UI to help users identify experimental functionality. Previously, when you disabled the dialog to view and toggle preview features using the `hidePreviewFeature` configuration, the notification dot remained visible even though the preview feature itself was hidden, creating a confusing user experience where users saw an indicator for a feature they could not access. Now, when you disable preview features, the notification dot is also hidden, ensuring that the UI only displays indicators for features that are actually available to you.