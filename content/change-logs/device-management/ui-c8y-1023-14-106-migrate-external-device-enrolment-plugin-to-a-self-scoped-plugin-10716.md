---
date: 2026-03-31
title: Device enrolment plugin now provided by default
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-5259
version: 1023.14.106
---
The Device enrolment plugin is now a standard Device Management plugin included by default. It provides a quick link to the thin-edge.io setup wizard, available in both the new welcome widget and the "Quick links" widget.

The four-step wizard simplifies the connection of physical Linux devices or Docker containers by providing a generated curl command that automates installation and cloud configuration. This process streamlines registration through guided device naming and automated certificate handling, concluding with instant verification of connectivity and data transmission to the platform.