---
date: ""
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
Previously, the readme file could only be added once to the whole package by storing the *README.md* file in the root folder of the package. This feature adds the option to provide a readme file for particular plugins in the package. 

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