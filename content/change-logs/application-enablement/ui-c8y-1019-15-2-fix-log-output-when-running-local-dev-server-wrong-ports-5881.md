---
date: 2024-04-04
title: Correct port numbers shown in log output when running local development server
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-57344
version: 1019.15.2
---
When running a local development server with the `ng serve` command, the log output incorrectly displayed the port numbers if the default port was already used. This has been fixed to show the correct port numbers that the local development server is actually using. This improves the developer experience by avoiding confusion about which ports are being used.
