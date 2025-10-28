---
date: 
title: >-
  Model Execution Enabled for Asset Groups in Analytics Builder
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
ticket: APMF-2737
version: 26.33.0
---
Analytics Builder now allows selecting assets of a group as model input. When selected, the model runs for all assets of the group independently, maintaining state of each device separately. The model would receive events only from the assets belonging the group and would send the output to the corresponding assets. The devices of the assets would be ignored. 

For more details refer to [Model execution for different devices](https://cumulocity.com/docs/streaming-analytics/analytics-builder/#models-and-devices).
