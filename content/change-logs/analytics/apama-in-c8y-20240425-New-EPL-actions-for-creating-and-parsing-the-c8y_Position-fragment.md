---
date: 2024-05-16
title: New EPL actions for creating and parsing the c8y_Position fragment
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAM-34615
version: 25.129.0
---
The `ManagedObject` event has a unique way of handling `c8y_Position` fragments that have the parseable `float` values added to their `position` property, and all other values added to their `params` property. All other events of the {{< product-c8y-iot >}} transport API simply add the fragment as a whole to their `params` property. This has made it cumbersome to robustly copy `c8y_Position` to a `ManagedObject` from another event and vice versa. To make this easier, two new helper actions have been added to the `ManagedObject` event to populate `ManagedObject` from a `c8y_Position` object, and conversely create the object from the `ManagedObject` event.

- `action setC8yPosition(any c8y_Position)`

  This new action sets the `ManagedObject` using the `c8y_Position` object. This must be of the form  `dictionary<string, any>`, but is validated prior to use. Example:

  ```
  on all Event(type="locationUpdate") as evt

  { ManagedObject mo := new ManagedObject;
    mo.id := evt.source;
    mo.setC8yPosition(evt.params.getOrDefault("c8y_Position"));
    send mo to ManagedObject.SEND_CHANNEL; }
   ```

- `action getC8yPosition() returns dictionary<string, any>`

  This new action produces a `c8y_Position` style object from the `ManagedObject`. Example:

  ```
  evt.params["c8y_Position"] := mo.getC8yPosition();
  ```
