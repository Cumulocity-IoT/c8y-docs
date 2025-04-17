---
date: 2025-04-16
title: Cross application dashboard copy/paste functionality
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

In an upcoming version the dashboard settings will get a new tab "Import/export", which allows to export dashboard to json file, import dashboard from previously exported json and edit dashboard object in editor. It as provided as a 'self-optional' plugin to Cockpit, therefore it has to be installed explictly.
Dashboard setting component will be refactored to use secondary router outlet in order to make these kind of views hookable.
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
This will add an additional tab to the dashboard settings, and the hook route allows to display a view for this tab.
This is breaking change, as each component that uses context dashboards must have ´rootContext: ViewContext.Dashboard´ in the route definition to make these settings tabs and views visible (even if no new tab was added). For example:
```ts
hookRoute({
  path: "home2",
  component: CockpitDashboardComponent,
  rootContext: ViewContext.Dashboard,
});
```
