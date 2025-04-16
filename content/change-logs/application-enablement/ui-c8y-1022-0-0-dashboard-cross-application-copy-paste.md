---
date: 2025-04-16
title: Reports page extracted into a separate plugin
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
In the upcoming version dashboard settings component will be refactored to use secondary router outlet.
This approach allows to hook new tab to particular outlet, e.g. 
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
It will add additional tab to dashboard settings, and hook route enables it to show view for this tab.
This is breaking change, as each component that uses context dashboard need to have rootContext: ViewContext.Dashboard in route definition to make these settings tabs and views visible (even if no new tab was added), e.g.
```ts
hookRoute({
      path: 'home2',
      component: CockpitDashboardComponent,
      rootContext: ViewContext.Dashboard
    })
```
