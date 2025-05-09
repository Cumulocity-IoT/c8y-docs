---
date: '2025-05-08'
title: Added option to provide a readme file for particular plugins in a package
product_area: Platform services
change_type:
  - value: change-QHu1GdukP
    label: Feature
component:
  - value: component-0UgqXH1Ys
    label: Administration
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-62166
version: 1021.64.0
---
Previously, only one readme file could be added to a package - by storing the *README.md* file in the package root folder. With this update a readme file can be created for each plugin within a package, thus providing users with a better experience and placing the information closer to the plugin.

To add the readme for the plugin, the **README.md** file must be provided in the plugin codebase (the recommended place is the same folder as the exposed plugin module) and  the`readmePath` property (indicating the path to this file) must be added to the exports. For example:
```ts
{
  name: 'Example widget plugin',
  module: 'WidgetPluginModule',
  path: './src/app/widget/widget-plugin.module.ts',
  readmePath: './src/app/widget/README.md',
  description: 'Adds a custom widget to the shell application'
}
```
When the package is deployed, the readme can be viewed in the package details, the package versions view (readme for specific version), the installed plugins list and the available plugins list.
