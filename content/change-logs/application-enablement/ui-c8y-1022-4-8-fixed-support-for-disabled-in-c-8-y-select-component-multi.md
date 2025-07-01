---
date: ""
title: Fixed support for `disabled` in `c8y-select` component (multi mode) and updated codex (#9178) [GRAFT][release/cd] (#9477)
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
ticket: MTM-63732
version: 1022.4.8
---
This fixes an issue with `c8y-select` component that `disabled` option had no effect in the multi select mode. Now it's possible to disable the component while it works in this mode by setting the `disabled` input to `true`.