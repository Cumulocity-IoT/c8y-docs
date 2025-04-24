---
date: 2024-02-29
title: EPL events no longer throw exceptions from the isCreate and isUpdate actions
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
ticket: PAM-34463
version: 25.54.0
---
The `Alarm`, `Event`, `ManagedObject` and `Operation` events now no longer throw exceptions from the `isCreate()` and `isUpdate()` actions. If the event being checked was generated in EPL code, these two actions now simply return false. `try ... catch` blocks around these calls are no longer necessary if the event being checked was generated in EPL code.
EPL code that uses these actions therefore behaves more robustly because it no longer throws exceptions that, if not caught properly, cause the monitor or app to terminate.
In the unlikely case that the `try ... catch` block is used to intentionally check for internally generated events, you need to change the check to the following:

```
if not (evt.isCreate() or evt.isUpdate()) { ... }
```
