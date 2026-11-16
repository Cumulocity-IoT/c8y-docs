---
date: '2024-11-21'
title: Apama Docker images moving to Amazon ECR
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAM-35062
version: 25.311.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The Apama Docker images are now available at `public.ecr.aws/apama`, and can be viewed at https://gallery.ecr.aws/apama/. Previously, they were available at `softwareag/`, and viewed at https://hub.docker.com/u/softwareag.

Within any Dockerfiles that use the Apama images, you will need to change `FROM softwareag/<IMAGE>:<TAG>` to `FROM public.ecr.aws/apama/<IMAGE>:<TAG>`. 

The location of Apama within the image has been moved from `/opt/softwareag` to `/opt/cumulocity`. Existing images remain unchanged.
