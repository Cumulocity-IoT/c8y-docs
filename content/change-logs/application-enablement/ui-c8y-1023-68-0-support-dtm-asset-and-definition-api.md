---
date: ""
title: Digital Twin Manager asset and definition API support in Asset properties selector
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
ticket: MTM-64674
version: 1023.68.0
---
The Digital Twin Manager (DTM) enables schema-based modeling in Cumulocity. The Asset API allows managing asset instances based on predefined Asset Definitions (also known as Asset Models). Asset instances created from an Asset Model inherit the structure and constraints defined in the model. In case of Asset properties selector, it support this API and if user wants to display properties of Asset created with DTM Definition, relevant Definition for selected DTM based Asset is requested and properties from Definition displayed. 
More about DTM API: https://cumulocity.com/api/dtm/