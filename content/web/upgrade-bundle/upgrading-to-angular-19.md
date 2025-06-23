---
title: Upgrading from Angular 18 to Angular 19
layout: redirect
weight: 430
---

Starting with version 1022.0.0, the Web SDK supports Angular 19. The following configuration changes are required before you can run the application:

- Run the command `ng update @angular/core@19 @angular/cli@19` to update Angular core and CLI to version 19.
{{< c8y-admon-important >}}
Angular directives, components and pipes are now standalone by default. Specify `standalone: false` for declarations that are currently declared in an NgModule. 

This also applies to module federation plugins, including plugins that use earlier versions of Angular, but are utilized in applications migrated to Angular 19.
{{< /c8y-admon-important >}}
- Update all `@c8y` dependencies to version `1022.x.x` in your *package.json*.
- Update `ngx-bootstrap` to version `19.0.2`.
- Update `@angular/cdk` to version `19.x.x`.
- `Node.js`, `TypeScript`, `RxJS`: [Version compatibility](https://angular.dev/reference/versions#actively-supported-versions).
- Follow the `Angular 19` upgrade guide: [Updating to version 19](https://angular.dev/update-guide?v=18.0-19.0&l=2).

The Web SDK version 1022.0.0 introduces multiple breaking changes:

- The dashboard setting component will be refactored to use a secondary router outlet in order to make these type of views hookable. This requires adding `rootContext: ViewContext.Dashboard` to the context dashboard routes. 

The reason for it is that new **Import/Export** tab will be added to the dashboard settings with `hookTab` function. This generic solution allows to add tabs to named tabs outlets. 
This specific tab allows to export dashboards to JSON files, import dashboards from previously exported JSON files and edit the dashboard in an editor. It allows to copy dashboards across applications.
Example of how tab and route for this tab can be added:
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


- The login flow has been changed. The Web SDK no longer includes built-in login functionality in each application. Instead, a separate login application now manages all authentication flows.

Web applications developed using Web SDK version 1022.0.0 or later will automatically redirect users to this standalone login application whenever authentication is needed.

This change benefits customers creating their own UI applications, as they no longer need to implement custom login flows. They can simply redirect users to the new login application.
The login page has also been redesigned as part of this update, improving its usability and visual appeal.

Note: Customers who embed the UI within an iframe and require in-iframe login may need to modify their implementation to support this new login flow.


- A set of previously deprecated angular modules of widgets have been removed.
These modules have been migrated to standalone components, so their modules became obsolete.
The affected modules are: `CockpitLegacyWelcomeWidgetModule`, `CockpitWelcomeWidgetModule`, `DeviceControlMessageWidgetModule`, `HelpAndServiceModule`, `ImageWidgetModule`, `InfoGaugeWidgetModule`, `KpiWidgetModule`, `LinearGaugeModule`, `MarkdownWidgetModule` and `ThreeDRotationWidgetModule`.
