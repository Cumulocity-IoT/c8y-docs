---
date: '2025-10-16'
title: Auto-generated property keys now retain the original casing
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: component-Tl88RYb4A
    label: Digital Twin Manager
build_artifact:
  - value: tc-wYIY0MBDO
    label: dtm
ticket: ''
version: 1022.9.2
---
Previously, when creating an asset property, the auto-generated key converted
all letters in the label in the **Asset properties** page to lowercase and replaced special characters
with underscores. Now, the key generation preserves the original letter
casing from the label while continuing to replace special characters
with underscores, ensuring case-sensitive property names.
