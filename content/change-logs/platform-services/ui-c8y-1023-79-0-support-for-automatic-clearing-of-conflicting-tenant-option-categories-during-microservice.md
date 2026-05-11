---
date: '2026-05-08'
title: >-
  Automatic clearing of conflicting tenant option categories during microservice
  upload
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-66091
version: 1023.79.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-05-08'
---
Previously, when uploading a microservice that defined tenant options with a category that already existed in your tenant, the platform rejected the upload. It required you to manually remove the conflicting tenant options before proceeding. You are now informed about the conflict, and after you retry the upload, the platform automatically clears the existing tenant option category and replaces it with the category defined in the microservice manifest. A warning message appears before the upload completes, allowing you to review the change. This streamlines the microservice deployment process and eliminates the need for manual cleanup of conflicting tenant options in your tenant.
