---
date: ""
title: As a solution architect, I want to see more details of the plugin I want to install as readme for particular plugin.
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
Until now, readme file was possible to be added only once, to the whole package. All you had to do is to put README.md file in root folder of package. This new feature adds possibility to provide README.md file for particular plugins in package. 

To add readme for the plugin, README.md file needs to be provided in plugin codebase (recommended place is the same folder as exposed plugin module) and `readmePath` property (indicating path to this file) needs to be added to exports, for example:
```ts
{
  name: 'Example widget plugin',
  module: 'WidgetPluginModule',
  path: './src/app/widget/widget-plugin.module.ts',
  readmePath: './src/app/widget/README.md',
  description: 'Adds a custom widget to the shell application'
}
```
When package is deployed, readme can be viewed in package details view, package versions view (readme for specific version), installed plugins list and available plugins list to be installed.