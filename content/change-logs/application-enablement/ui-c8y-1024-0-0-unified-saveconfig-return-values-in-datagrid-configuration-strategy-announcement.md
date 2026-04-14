---
date: 
title: Unified saveConfig$() return values in DataGridConfigurationStrategy
product_area: Application enablement & solutions
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-47390
version: 1024.0.0
environment_availability:
---
Starting with version 1024.0.0, the `saveConfig$()` method on all built-in `DataGridConfigurationStrategy` implementations consistently returns `of(undefined)` when there is no context or nothing to persist. Previously, return values were inconsistent, for example, `VoidConfigurationStrategy` returned `of(null)` while others returned `of(undefined)`.

Additionally, the `UserPreferencesService.set()` JSDoc was corrected to state that it returns "a promise that resolves when the value has been saved" instead of "a promise with saved value", matching the actual `Promise<void>` return type.

**Breaking change**

Custom `DataGridConfigurationStrategy` implementations that return `of(null)` from `saveConfig$()` or subscribers that check the emitted value with strict equality may break.

**Impact**: Developers who implemented custom `DataGridConfigurationStrategy` and relied on `of(null)` being emitted from `saveConfig$()` are affected.

**Migration**: Ensure custom `saveConfig$()` implementations return `of(undefined)` (not `of(null)`) for the no-op case. Subscribers should not rely on the specific emitted value. Treat the `Observable<void>` emission as a completion signal.
