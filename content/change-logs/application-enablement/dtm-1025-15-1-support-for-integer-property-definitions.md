---
date: ""
title: "Support for integer property definitions"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-2c7RdTdXo4"
      label: "Improvement"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-3320"
version: "1025.15.1"
---
The Number (Float, Integer) type now includes an Allow integers only
checkbox, enabling you to define properties that accept only whole
numbers. When this option is selected, the property definition saves
with the integer data type, and the Default value, Minimum, and Maximum
fields accept only whole numbers. If you enter a decimal value for an
integer property on an asset, a subasset, or in the Asset properties
widget, the form displays "Invalid type, expected integer."

You can import property definitions and asset definitions containing
integer properties. Existing property definitions and assets retain the
number data type and continue to work without any changes.