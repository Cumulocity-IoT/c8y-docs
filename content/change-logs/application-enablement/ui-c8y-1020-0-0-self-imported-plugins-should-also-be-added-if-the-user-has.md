---
date: '2024-06-06'
title: Allow self-imported plugins to be added even if a user already has plugins
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
ticket: MTM-59272
version: 1020.0.0
---
If a user upgraded one of the default web applications (for example, Cockpit) after it had been cloned, it would only include the plugins that the application had offered during the initial clone/installation of the application.
If additional self-imported plugins were introduced in the upgraded version, these would not have been present when using the application.

This especially caused issues when features of applications which were previously present as standard Angular modules were migrated to self-imported module federation plugins, as these features were missing until the plugin was manually installed to the application.

To fix this issue, an exclude list for these self-imported plugins has been utilized, in addition to the already existing include list used for the usual plugins.
