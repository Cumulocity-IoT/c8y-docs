---
date: ""
title: Added a new audit log type "Email"
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
ticket: MTM-68455
version: 1025.14.0
---
To enhance the audit log capabilities, a new audit log type called "Email" has been added. With this change, users can now view and filter audit logs related to sent emails directly from the audit logs browser in the Administration application. An entry is created each time an email is sent through the email API, which provides better visibility into who sent which email in a tenant. You can find the list of logged event types in the [user documentation](/standard-tenant/monitoring/#audit-log-types).
