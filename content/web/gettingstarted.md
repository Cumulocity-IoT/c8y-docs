---
weight: 20
title: Getting started
layout: bundle
sector:
  - app_enablement
---

This guide will setup your first application. The first step is to install the `@angular/cli` in the right version. Server Side Rendering (SSR) and applications based on the standalone API are not supported and therefore set to `false`:

```bash
npx @angular/cli@20 new --style=less --ssr=false
```

Second, navigate to the folder and add the `@c8y/websdk` package to your Angular application:

```bash
ng add @c8y/websdk
```

{{< c8y-admon-info >}}  
Required is a node.js installation. If you have the wrong node.js version installed, the `npm install` step will prompt you with the needed version number.
{{< /c8y-admon-info >}}

The CLI will prompt you in two steps for the version and the base template. Afterwards your application is set and you can start your first development server in step 3.

### Step 1: Select the version

```bash
? Which base version do you want to scaffold from? (Use arrow keys)
> 1019.0.X
> 1019.X.0
> other
```

In the first step, the base scaffolding version must be selected. The interface will provide the latest available release. Additionally a version can be manually entered by selecting the
`other` option. If you do not know which version to select, we recommend to use the latest.

### Step 2: Select the base project to start from

```bash
? Which base project do you want to scaffold from?
  administration
  application
  cockpit
  devicemanagement
  hybrid
  login
  tutorial
  sample-plugin
  package-blueprint
```

In step two, the base project to scaffold from must be selected. You can select any of the default
Cumulocity applications to reuse the functions provided there. In alternative, you could start a
blank application by selecting the "application" project.

As an alternative to scaffolding, you can get applications from the list above directly from their GitHub repositories:
- [{{< product-c8y-iot >}} Administration](https://github.com/Cumulocity-IoT/administration)
- [{{< product-c8y-iot >}} Application](https://github.com/Cumulocity-IoT/application)
- [{{< product-c8y-iot >}} Cockpit](https://github.com/Cumulocity-IoT/cockpit)
- [{{< product-c8y-iot >}} Device Management](https://github.com/Cumulocity-IoT/devicemanagement)
- [{{< product-c8y-iot >}} Hybrid](https://github.com/Cumulocity-IoT/hybrid)
- [{{< product-c8y-iot >}} Login](https://github.com/Cumulocity-IoT/login)
- [{{< product-c8y-iot >}} Tutorial](https://github.com/Cumulocity-IoT/tutorial)
- [{{< product-c8y-iot >}} Sample plugin](https://github.com/Cumulocity-IoT/sample-plugin)
- [{{< product-c8y-iot >}} Package blueprint](https://github.com/Cumulocity-IoT/package-blueprint)

### Step 3: Start the local development server

Now you can start the application by running the `npm start` command. By default, the
application will proxy to the {{< product-c8y-iot >}} cloud platform, however, you can proxy to a different
application using the `-u` flag. For example:

```bash
npm start -- -u http://mytenant.acme.iot
```

or

```
 ng serve <appName> -u http://mytenant.acme.iot
```

When you start the command the application begins to compile. After it is compiled, you can navigate to
`http://localhost:4200/apps/<<your-app-name>>/` and login to your tenant.

{{< c8y-admon-info >}}  
You must provide your tenant name or the tenant ID on login (as the application cannot derive it from the URL on localhost). If you don't know your tenant name or the tenant ID you can click on your username in your tenant and get the information from the section Platform Information.
{{< /c8y-admon-info >}}

{{< c8y-admon-info >}}  
It is possible that node.js needs more memory to compile the project. If you run into an out-of-memory error, assign more memory by setting the environment variable `NODE_OPTIONS` to `--max_old_space_size=4096`.
{{< /c8y-admon-info >}}

You are now setup. Any changes you make to your local files will lead to recompiling. After a
refresh you will see your changes.

### Create your first custom component

After creating the empty bootstrapping application you might want to start with your first content.
To do so, add a new component in the `src/app` to your project and save it as `hello.component.ts`:

```javascript
import { Component } from "@angular/core";

@Component({
  selector: "app-hello",
  template: `
    <c8y-title>Hello World</c8y-title>
    <p>My first content.</p>
  `,
  standalone: false
})
export class HelloComponent {}
```
Both standalone and module oriented components are supported. For the latter ones `standalone: false` must be added because this property is `true` by default since Angular 19.

To hook the new component into the application, you must declare the new component and add it to
a route in the `app.module.ts`. In the following example we extended the `application` project,
which gives you a very clear application frame.

```javascript
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule as ngRouterModule } from "@angular/router";
import { CoreModule, BootstrapComponent } from "@c8y/ngx-components";
import { HelloComponent } from "./hello.component";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ngRouterModule.forRoot(
      [{ path: "", component: HelloComponent }], // hook the route here
      { enableTracing: false, useHash: true }
    ),
    CoreModule.forRoot(),
  ],
  bootstrap: [BootstrapComponent],
  declarations: [HelloComponent], // add deceleration here
})
export class AppModule {}
```

If you start this application and login, you will see an application similar to the following
screenshot.

![An Angular based application](/images/web-sdk/hello-world-example.png)

The application uses a customized router from the Web SDK and the `CoreModule`. The `CoreModule`
contains all the necessary components, directives, pipes and services that allow you to
[extend](https://cumulocity.com/codex/advanced-development/hooks/overview) the application even further. But first we will release the application and deploy it.

### Deploying your application

The Angular CLI provides a custom `deploy` command to upload the application. You can run the command `ng deploy` and the current application will be deployed.

For deployment you need an application role, username, password and a tenant. You can also run it by
providing this information as parameters. Use the following code to build and deploy the application
without prompting:

```bash
ng deploy -u http://yourtenant.cumulocity.com -T t12345 -U acme -P "*******"
```

In this example we use the custom deploy command added to Angular. You need to provide the option
`-T` (tenant), `-U` (user) and `-P` (password) to authenticate on your tenant. The deploy command
also accepts environment variables if you do not want to store them, prefixed with `C8Y_`. So for
example `C8Y_USER` for the `-U` flag.

### Next steps

- Refer to the [{{< product-c8y-iot >}} Developer Codex](https://cumulocity.com/codex/) for more information on developing applications in the {{< product-c8y-iot >}} environment. Moreover find various related tutorials in the [{{< c8y-tech-community >}}]({{< c8y-tech-community-link >}}).
