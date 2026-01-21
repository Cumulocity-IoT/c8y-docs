---
date: ""
title: Prevented plugin translations from overriding application translations
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
ticket: MTM-65724
version: 1023.14.33
---
This fix prevents plugins from overriding the translations in the shell application. Still, within a plugin, the translations provided by this plugin take precedence over the shell application's ones.
If you want to override a shell application translation, you may use [application options](https://cumulocity.com/docs/web/application-configuration/#languages-customization) or [the localization feature](https://cumulocity.com/docs/standard-tenant/changing-settings/#localization).