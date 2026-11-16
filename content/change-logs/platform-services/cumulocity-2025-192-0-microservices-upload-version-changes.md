---
date: '2025-06-12'
title: Re-upload of previous microservice versions
product_area: Platform services
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-OG_650_b2
    label: Core platform
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-63368
version: 2025.192.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---


Previously, uploading older microservice versions was restricted to development builds that contained the -SNAPSHOT suffix in the version.
This constraint has now been removed.

It is now possible to upload older versions of a microservice, provided that the uploaded image matches the one already stored in the Docker registry. 

For microservices in development with the -SNAPSHOT suffix in the version, there are no restrictions on the image content. 
Older versions with the same or different image content can be deployed.

This improvement allows you to rollback to a previously used version of the microservice. So far it was necessary to either delete the microservice application and re-upload the earlier version, or rebuild and re-upload the same binaries with an incremented version number.
