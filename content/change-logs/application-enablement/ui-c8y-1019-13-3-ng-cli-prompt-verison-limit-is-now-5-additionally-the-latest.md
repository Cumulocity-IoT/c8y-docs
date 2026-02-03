---
date: 2024-03-27
title: Clearer version selection when scaffolding a new application with Angular CLI
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
ticket: MTM-57339
version: 1019.13.3
---
The Angular CLI new command, which is used to create and manage Web SDK-based Angular projects, previously had a version limit of 3. This has now been increased to 5, allowing users to select from a wider range of Web SDK versions when creating a new project. Additionally, a bug has been fixed where the "latest" tag was not always shown for the correct Web SDK version in the prompt. With this change, users will now see the "latest" tag next to the most recent stable version of the Web SDK, making it easier to select the desired version when creating a new project. These changes improve the user experience and flexibility when working with the Angular CLI new command prompt.
