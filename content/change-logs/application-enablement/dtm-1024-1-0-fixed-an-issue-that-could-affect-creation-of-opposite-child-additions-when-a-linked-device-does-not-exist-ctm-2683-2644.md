---
date: ""
title: "Fixed an issue that could affect creation of opposite ChildAdditions when a linked device does not exist."
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
ticket: "CTM-2683"
version: "1024.1.0"
---
Previously, there was an issue in the implementation of the creation of the ChildAdditions for a device when a linked device did not exist. This is fixed now.

Co-authored-by: Nam Nhat Pham <namnhat.pham@cumulocity.com>
Co-authored-by: Frédéric Joulin <53534562+frej-c8y@users.noreply.github.com>
Co-authored-by: Michael Voigt <91879843+mvoigt-sag@users.noreply.github.com>
Co-authored-by: Michael Voigt <michael.voigt@cumulocity.com>
