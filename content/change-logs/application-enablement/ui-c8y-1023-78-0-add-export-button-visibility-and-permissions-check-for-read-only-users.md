---
date: '2026-05-04'
title: Export operations disabled for users without appropriate permissions
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
ticket: MTM-66664
version: 1023.78.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-05-04'
  - label: apj.cumulocity.com
    date: '2026-05-05'
  - label: jp.cumulocity.com
    date: '2026-05-05'
  - label: us.cumulocity.com
    date: '2026-05-06'
  - label: cumulocity.com
    date: '2026-05-06'
---
Previously, users without Inventory WRITE permission could access all export operations on the **Exports** page and only received an error after attempting to save. This issue has been fixed. 

- For read-only users, the **Add export** button is now disabled, with a tooltip explaining the insufficient permissions. 
- **Duplicate** and **Delete** row commands are hidden. 
-  The **Edit** command is replaced with a **View** command so that read-only users can still inspect export details but cannot modify them. 
- In the export details view, the **Save** buttons are disabled for users without the required permissions.

This change ensures that only users with the appropriate permissions can access export operations, providing a clearer and more secure user experience.
