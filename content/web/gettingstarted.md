---
weight: 20
title: Getting started
layout: bundle
sector:
  - app_enablement
---

This guide will setup your first application. The first step is to install the `@angular/cli` in the right version.

```bash
npx @angular/cli@18 new --style=less
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
  tutorial
  widget-plugin
  package-blueprint
```

In step two, the base project to scaffold from must be selected. You can select any of the default
Cumulocity applications to reuse the functions provided there. In alternative, you could start a
blank application by selecting the "application" project.

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

You are now setup. Any changes you make to your local files will lead to recompiling. After a
refresh you will see your changes.

### Create your first custom component

After creating the empty bootstrapping application you might want to start with your first content.
To do so, add a new component in the `src/app` to your project and save it as `hello.component.ts`:

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: `
    <c8y-title>Hello World</c8y-title>
    <p>My first content.</p>
  `
})
export class HelloComponent {}
```

To hook the new component into the application, you must declare the new component and add it to
a route in the `app.module.ts`. In the following example we extended the `application` project,
which gives you a very clear application frame.

```javascript
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule as ngRouterModule } from '@angular/router';
import { CoreModule, BootstrapComponent } from '@c8y/ngx-components';
import { HelloComponent } from './hello.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ngRouterModule.forRoot(
      [{ path: '', component: HelloComponent }], // hook the route here
      { enableTracing: false, useHash: true }
    ),
    CoreModule.forRoot()
  ],
  bootstrap: [BootstrapComponent],
  declarations: [HelloComponent] // add deceleration here
})
export class AppModule {}
```

If you start this application and login, you will see an application similar to the following
screenshot.

![An Angular based application](/images/web-sdk/hello-world-example.png)

The application is using a customized router from the Web SDK and the `CoreModule`. The `CoreModule`
contains all the necessary components, directives, pipes and services that allow you to
[extend](#/getting-started/guides/extension-points) the application even further. But first we will
release the application and deploy it.

### Deploying your application

The CLI provides a command to deploy the application, you can simply run the command `c8ycli deploy`
and the current application will be deployed. However, before deploying your application you need to
build it, you can run `c8ycli build` to do so.

For deployment you need an application role, username, password and a tenant. You can also run it by
providing this information as parameters. Use the following code to build and deploy the application
without prompting:

```bash
ng deploy -- -u http://yourtenant.cumulocity.com -T t12345 -U acme -P "*******"
```

In this example we use the custom deploy command added to Angular. You need to provide the option
`-T` (tenant), `-U` (user) and `-P` (password) to authenticate on your tenant. The deploy command
also accepts environment variables if you do not want to store them, prefixed with `C8Y_`. So for
example `C8Y_USER` for the `-U` flag.

### Next steps

- Refer to the [{{< product-c8y-iot >}} Codex](https://styleguide.cumulocity.com/apps/codex/#/) for more information on developing applications in the {{< product-c8y-iot >}} environment. Moreover find various related tutorials in the [{{< sag-dev-community >}}]({{< link-sag-tech-forum >}}).
