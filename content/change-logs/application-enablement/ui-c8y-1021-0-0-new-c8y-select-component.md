---
date: ""
title: Enhanced select component with advanced features
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
ticket: MTM-59799
version: 1021.0.0
---
To enhance the user experience and functionality a new select component has been introduced. This update includes significant changes that may require action from developers.

**Key features**:
- Search functionality
- Multi-select option
- Chip-based selection display
- Full keyboard support

{{< c8y-admon-important >}}
The interface of the new component is not compatible with the previous version. Existing implementations using the `c8y-select` component will need to be updated.
{{< /c8y-admon-important >}}

**Required actions:**
Developers must select one of the following options:
1. Migrate the existing `c8y-select` components to the new interface
2. Rename the selector to `c8y-legacy-select` to maintain the current functionality