---
date: '2026-04-14'
title: Breadcrumbs in Data point library plugin now display correct navigation path
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: CTM-2844
version: 1025.0.1
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-04-14'
  - label: apj.cumulocity.com
    date: '2026-04-22'
  - label: jp.cumulocity.com
    date: '2026-04-22'
  - label: emea.cumulocity.com
    date: '2026-04-23'
  - label: us.cumulocity.com
    date: '2026-04-23'
  - label: cumulocity.com
    date: '2026-04-23'
---
The breadcrumbs in the Data point library plugin previously displayed a
fixed path of "Configuration > Data point library" regardless of your
tenant configuration. The breadcrumbs now dynamically reflect the
configured parent node, providing accurate navigation context that
aligns with your application's hierarchy.

This change improves navigation clarity for users working with the Data
point library plugin. Your existing installations will automatically
display the correct parent node in breadcrumbs without any configuration
changes required.
