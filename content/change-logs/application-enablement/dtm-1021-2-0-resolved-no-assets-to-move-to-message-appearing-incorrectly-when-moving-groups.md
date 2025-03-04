---
date: ""
title: "Resolved 'No assets to move to' message appearing incorrectly when moving groups"
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
ticket: "CTM-1775"
version: "1021.2.0"
---
Previously, after creating three groups (Group1, Group2, Group3) and moving Group3 under Group1, selecting Group3 again and clicking 'Move Selected' displayed the expected options—Group2 and "Move to root"—along with an unintended "No assets to move to" message. This message has now been removed when valid options are available, showing only the relevant choices.