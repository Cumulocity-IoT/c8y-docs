---
date: ""
title: Fixed incorrect module declaration for JPEG image handling in sample plugin 
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
ticket: MTM-65934
version: 1023.22.11
---
The sample plugin previously had an incorrect module declaration that affected how JPEG images were processed, which could lead to type mismatches and runtime errors when working with image extensions. The module declaration has been corrected, and proper typings have been added for all image extensions (including JPEG, PNG, and other supported formats). This ensures that the sample plugin now correctly handles all image types with proper type safety, allowing developers to use it as a reliable reference when building their own plugins that work with images.