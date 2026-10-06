---
date: 
title: Activate models from the Analytics Builder model editor
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
ticket: PAB-5359
version: 27.244.0
---

You can now activate and deactivate an Analytics Builder model without leaving the model editor, so that you can try out a change, check its log messages, and go back to editing in one place.

- **Active/Inactive toggle**: For models without template parameters, the toolbar of the model editor has a toggle button that activates or deactivates the model in its configured mode. Unsaved changes are saved before the model is activated.
- **Mode in the toolbar**: The toolbar shows the mode of the model, for example, **Mode: Test**. No mode is shown for models in production mode.
- **New default mode**: New models and new template model instances are created in production mode and inactive state, instead of draft mode. They only start processing data when you activate them. Draft mode is still available, and existing models are unchanged.

For details, see [Activating a model from the model editor](/streaming-analytics/analytics-builder/#activating-a-model-from-the-model-editor).
