---
date: ""
title: "Improved info message when no Child Asset Models are selected when creating or updating Asset Models"
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
ticket: "CTM-1051"
version: "1021.2.1"
---
Previously, if no child asset models were selected while creating or updating an Asset Model, the message displayed as 'No allowed child assets,' which was misleading since the field specifically refers to allowed child asset models. To enhance clarity, the message has been updated to 'No allowed child asset models selected,' ensuring better alignment with the field's purpose and reducing potential confusion.