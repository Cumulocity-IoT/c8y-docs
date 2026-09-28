---
weight: 40
title: Context object
layout: redirect
---

Every Data Preparation smart function receives a `context` object as its final parameter. The context provides runtime metadata.

### DataPrepContext {#data-prep-context}

| Field | Type | Description |
|-------|------|-------------|
| `runtime` | `"c8y-data-preparation"` | Identifies the runtime environment. Always `"c8y-data-preparation"` for Data Preparation smart functions. |


### Using the context {#using-the-context}

Currently, the context object is mostly informational. The `runtime` property allows code shared between different smart-function implementations to detect where it is running.


