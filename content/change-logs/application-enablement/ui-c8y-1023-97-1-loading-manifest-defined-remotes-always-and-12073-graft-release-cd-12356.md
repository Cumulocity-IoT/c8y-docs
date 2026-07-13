---
date: ""
title: Web SDK manifest-defined remotes now load correctly
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
ticket: MTM-66892
version: 1023.97.1
---
The Web SDK previously failed to load remotes that were defined in the manifest configuration, causing applications that relied on these remote modules to not function properly. The SDK now correctly loads all manifest-defined remotes during initialization, ensuring that remote modules are available when your application needs them. This fix resolves issues where applications using remote module federation could not access their configured remote dependencies.