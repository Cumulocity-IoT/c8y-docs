---
date: 2025-03-06
title: Raising of events on offloading completion
product_area: Analytics
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-A8vMaVaTg
    label: DataHub
build_artifact:
  - value: tc-H-tuq-8Es
    label: datahub
version: 12.0.564
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---

An offloading pipeline can be configured to raise a {{< product-c8y-iot >}} event when an associated offloading or compaction run completes. Such an event comprises details of the corresponding run such as start and end time, success status, or number of offloaded records. Those events can be used to trigger follow-up actions upon completion of an offloading or compaction run.
