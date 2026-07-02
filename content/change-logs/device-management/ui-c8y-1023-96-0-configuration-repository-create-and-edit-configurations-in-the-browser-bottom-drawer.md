---
date: ""
title: Configuration repository now supports creating and editing configurations in the browser
product_area: Device management & connectivity
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component--KIsStyzM
    label: Device Management app
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: DM-6312
version: 1023.96.0
---
Users can now create and edit configuration repository entries directly in the browser using a built-in code editor, without having to prepare a file outside the application. The configuration detail form has been moved from a modal to a bottom drawer, providing more screen space. Three content modes are available: upload a binary file, enter an external URL, or edit the content inline. When a text file is dropped or selected, the editor automatically loads its content and detects the syntax based on the file extension. A language selector lets users override the auto-detected highlighting.