---
date: 2025-04-16
title: Support for cross application dashboard import/export functionality
product_area: Application enablement & solutions
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-62313, MTM-62316
version: 1022.0.0
---

In an upcoming version a new **Import/Export** tab will be added to the dashboard settings, which allows to export dashboards to JSON files, import dashboards from previously exported JSON files and edit the dashboard in an editor. This new functionality allows to copy dashboards across applications. It is provided as a "self-optional" plugin to the Cockpit application, thus it has to be installed explicitly.
The dashboard setting component will be refactored to use a secondary router outlet in order to make these type of views hookable.
This approach allows to hook a new tab to a particular outlet. For example:
```ts
hookTab(
    [
        {
          label: gettext('Import / Export'),
          icon: 'input-output',
          priority: 5,
          path: [
            {
              outlets: {
                'dashboard-details': 'advanced'
              }
            }
          ],
          tabsOutlet: 'dashboardTabs'
        }
      ];
),
hookRoute([
  {
    path: 'advanced',
    loadComponent: () => import(...),
    outlet: 'dashboard-details',
    context: ViewContext.Dashboard
  }
])
```
In this example an additional tab is added to the dashboard settings, and the hook route allows to display a view for this tab.
This is breaking change, as each component that uses context dashboards must have ´rootContext: ViewContext.Dashboard´ in the route definition to make these settings tabs and views visible (even if no new tab was added). For example:
```ts
hookRoute({
  path: "home2",
  component: CockpitDashboardComponent,
  rootContext: ViewContext.Dashboard,
});
```
