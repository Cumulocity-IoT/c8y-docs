---
date:
title: Apama Docker images moving to Amazon ECR
change_type:
  - value: change-VSkj2iV9m
    label: Feature
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAM-35062
version: 
---
The Apama Docker images are now available at `public.ecr.aws/apama`, and can be viewed at https://gallery.ecr.aws/apama/. Previously, they were available at `softwareag/`, and viewed at https://hub.docker.com/u/softwareag.

Within any Dockerfiles that use the Apama images, you will need to change `FROM softwareag/<IMAGE>:<TAG>` to `FROM public.ecr.aws/apama/<IMAGE>:<TAG>`. 

The location of Apama within the image has been moved from `/opt/softwareag` to `/opt/cumulocity`. Existing images remain unchanged.