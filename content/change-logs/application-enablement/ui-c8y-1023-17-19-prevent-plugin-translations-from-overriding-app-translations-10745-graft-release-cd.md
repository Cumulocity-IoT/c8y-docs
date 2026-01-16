---
date: ""
title: Prevent plugin translations from overriding app translations (#10745) [GRAFT][release/cd] (#10767)
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
version: 1023.17.19
---
If language files from application and plugin contain the same key, the
translation from plugin overrides the translation from app, which is not
desired because the translation in the app is usually newer, more
relevant and up-to-date than a translation from plugin.

This task is to change the order of loading translations, so that
translations from app have higher priority than translations from
plugins.