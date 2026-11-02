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
In Digital Twin Manager, the Number (Float, Integer) property type now includes an Allow integers only checkbox, allowing you to define properties that accept only whole numbers.

When enabled, the property definition is saved with the Integer data type. The Default value, Minimum, and Maximum fields also accept only whole numbers. If a decimal value is entered for an integer property on an asset or subasset, or in the Asset Properties widget, the form displays the validation error: “Invalid type, expected integer.”

You can also import property definitions and asset definitions containing integer properties. Existing property definitions and assets retain their Number data type and continue to work as before, without requiring any changes.