---
date: '2026-02-19'
title: Dashboard import/export feature moved to General Availability
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YdSEScrEC
    label: Cockpit
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-65134
version: 2025.373.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-02-19'
  - label: apj.cumulocity.com
    date: '2026-02-11'
  - label: jp.cumulocity.com
    date: '2026-02-11'
  - label: emea.cumulocity.com
    date: '2026-02-16'
  - label: us.cumulocity.com
    date: '2026-02-16'
  - label: cumulocity.com
    date: '2026-02-17'
---

The dashboard import/export feature, previously available as Public Preview (see [announcement](/change-logs/#ui-c8y-1022-0-0-dashboard-cross-application-copy-paste)), is now promoted to General Availability (GA).

Dashboards can be exported as JSON files including all metadata such as widget configurations and settings, and imported across tenants and environments.

When importing dashboards between different contexts (for example, devices to assets or across tenants), a configuration review is prompted to adjust settings and ensure compatibility.