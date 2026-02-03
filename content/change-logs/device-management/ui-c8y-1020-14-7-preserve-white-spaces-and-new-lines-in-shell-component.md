---
date: '2024-08-08'
title: Shell component preserves whitespaces and new lines
product_area: Device management & connectivity
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-3840
version: 1020.14.7
---
The shell component is commonly used to display code snippets or command line output. Previously, the shell component stripped out whitespaces and new lines which could lead to incorrectly formatted or hard to read content. With this change, the shell component now preserves all whitespaces and new line characters allowing code snippets and command line output to be properly formatted. This improves the readability of content displayed in the shell component for users.
