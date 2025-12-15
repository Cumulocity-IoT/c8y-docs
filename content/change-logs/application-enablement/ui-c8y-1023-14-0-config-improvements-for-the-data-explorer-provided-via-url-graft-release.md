---
date: ""
title: Data explorer configuration improvements
product_area: Application enablement & solutions
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-65200
version: 1023.14.0
---
The workspace configuration used by the data explorer is now compressed, which significantly reduces the number of characters required in the URL. This makes shared links shorter, cleaner, and less likely to hit browser URL-length limits. Additionally, two new helper functions have been introduced, one for generating a URL from a configuration and another for navigating directly to the data explorer with a specified configuration. Developers can find more details about these helpers in the Developer Codex.