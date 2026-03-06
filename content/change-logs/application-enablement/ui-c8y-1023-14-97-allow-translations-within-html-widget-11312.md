---
date: ""
title: HTML widget now supports translations
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
ticket: MTM-66132
version: 1023.14.97
---
The new implementation of the HTML widget missed functionality to translate strings.
This meant that any text content displayed in custom HTML widgets always appeared in a single language regardless of the user's language settings.
Now the HTML widget supports translations, allowing you to use translation keys in your HTML content that are automatically replaced with the appropriate translated text based on the user's selected language. The translation keys must be either included in the default translations or added via the localization settings in the Administration application.