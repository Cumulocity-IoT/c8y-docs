---
date: '2026-08-20'
title: >-
  Duration block now provides a Restart input port to reset elapsed time without
  deactivation
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-4727
version: 27.206.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-08-20'
  - label: apj.cumulocity.com
    date: '2026-08-26'
  - label: jp.cumulocity.com
    date: '2026-08-26'
  - label: us.cumulocity.com
    date: '2026-08-31'
---

The **Duration** block in Analytics Builder has been enhanced with a new **Restart** input port that allows you to reset the elapsed duration and immediately restart measurement from that point, without deactivating the block.

Previously, the only way to reset the measurement was using the **Reset** input port, which deactivates the block and requires a new **Start** signal to resume measurement. The new **Restart** input port provides more flexible control over the block's behavior in scenarios where you need to reset the elapsed time while keeping the block active.

**New Input port:**

- **Restart** (pulse): Resets the elapsed duration and immediately restarts measurement from this point, without deactivating the block. The block remains active and continues processing other input signals.

**Existing behavior (unchanged):**

- **Reset** (pulse): Deactivates and resets the state of the block. A new **Start** signal is required to resume measurement.
- **Start** (pulse): Activates the block and begins measurement.
- **Measure** (pulse): Outputs the current duration in seconds since activation (or last restart).

This enhancement maintains full backward compatibility. Existing Analytics Builder models using the Duration block will continue to work without any modifications, while new models can leverage the **Restart** input to achieve previously difficult workflows.

See the description of the [Duration](/streaming-analytics/block-reference/#duration) block for detailed information.
