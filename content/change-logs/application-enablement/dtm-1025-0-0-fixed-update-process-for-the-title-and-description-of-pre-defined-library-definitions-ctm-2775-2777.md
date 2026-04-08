---
date: ""
title: "Preserve customization of name and description of pre-defined library definitions"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-VSkj2iV9m"
      label: "Fix"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-2775"
version: "1025.0.0"
---
Updates the onboarding process of library definitions so that changes to
`title` and `description` in the pre-defined definitions are applied
only when the values of the definitions in the tenant’s inventory
During the onboarding process for library definitions, customizations made to the title and description fields were being lost when the library definitions were updated. The update process now preserves any customizations you make to the title and description fields during onboarding.