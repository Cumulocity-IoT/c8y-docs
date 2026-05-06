---
date: ""
title: Automatic clearing of conflicting tenant option categories during microservice upload
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
---
When uploading a microservice that defines tenant options with a category that already exists in your tenant, the system previously rejected the upload. It required you to manually remove the conflicting tenant options before proceeding. Now you get informed about the conflict, and after retrying the upload, the system automatically clears the existing tenant option category and replaces it with the category defined in the microservice manifest. A warning message informs you upfront before the upload completes, allowing you to review the change. This streamlines the microservice deployment process and eliminates the need for manual cleanup of conflicting tenant options in your tenant.