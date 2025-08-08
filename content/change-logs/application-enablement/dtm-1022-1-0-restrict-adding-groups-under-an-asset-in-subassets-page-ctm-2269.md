---
date: ""
title: "Restrict adding groups under an asset in Subassets page [CTM-2269]"
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
ticket: "CTM-2269"
version: "1022.1.0"
---
Previously, the 'Add Group' button appeared in the shell application(Cockpit, DM), on the Sub-assets page for assets that were created in the DTM application, allowing groups to be incorrectly added under them. This has been corrected. Now, the button is only shown for groups created within the Shell app and the special group asset created in the DTM.