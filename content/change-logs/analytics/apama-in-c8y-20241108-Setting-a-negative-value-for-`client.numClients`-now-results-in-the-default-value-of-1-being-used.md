---
date:
title: Setting a negative value for the `client.numClients` tenant option now results in the default value of 1 being used
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAM-35027
version: 25.298.0
---
If the `client.numClients` tenant option were set to a value less than zero, the Streaming Analytics microservice would be unable to communicate with the Cumulocity platform. Now, a warning will be logged and a default value of 1 will be set to ensure the microservice can communicate.
