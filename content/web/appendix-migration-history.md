---
title: "Appendix: Migration history"
layout: bundle
weight: 80
section:
  - app_enablement
---

As the web ecosystem evolves, we as a platform evolve with it - while assuring to keep upgrade paths as smooth as possible and keep extensions working properly with very little changes.

This process involves migration effort, so we believe that providing some background information on how the stack and the build process has evolved over time will help developers to better understand why some parts work the way you see today and why migration effort is needed.

### Brief background: plugins vs. modules {#brief-background-plugins-vs-modules}

From day one the UI has always had a modular architecture. The units of functionality are grouped in "plugins" that can be composed to build applications. In practice plugins are simply modules.

Modules are a very important key feature in the latest generation of the Web SDK. It allows to import any file or library with native JavaScript `import` statements and be bundled to one file at build time. To better understand this concept and the enhancements it provides to the developers, it is important to understand how the module architecture worked in the previous generations of the {{< product-c8y-iot >}} Web SDK.

### 1st Generation: Runtime loading of plugins {#1st-generation-runtime-loading-of-plugins}

In the first generation, each application had exported plugins and imported plugins. The exported plugins were the ones available for being used throughout the platform and the imported plugins were the functionality visible in the application. This way each application had two functions:

* the UI interface that you usually expect
* a package that exposed functionality

The information on applications and plugins was stored in the database through an API. Each plugin had to be created in the context of each application. Although we already had the manifest files we used that information and called the APIs storing the data.

The REST API could be reached at ```applications/<id>/plugins``` but it has now been deprecated.

At this time we had:

|Application context|Repository
|-------|------
|core | m2m/cumulocity-ui
|administration | m2m/cumulocity-ui-administration
|devicemanagement | m2m/cumulocity-ui-devicemananagement
|cockpit | m2m/cumulocity-ui-cockpit

Core was an application that did not import any plugin, it just exported plugins.

The loading of the modules was entirely dynamic. We served a very basic index.html that was the same for all applications, logged in the user with just a small javascript layer and only after authentication we fetched the application information and loaded the appropriate plugins from the respective applications and finally bootstrapped the angular.js app. So after login we had something like this:

```html
  <!-- Added with js -->
  <script src="/apps/core/main.js"></script>
  <script src="/apps/core/plugin1/main.js"></script>
  <script src="/apps/administration/pluginA/main.js"></script>
  <script src="/apps/devicemanagement/pluginZ/main.js"></script>
```

As the information about which plugins were imported in each application was completely controlled by a REST API, every application could be easily edited from the UI: it was possible to move functionality around, adding or removing plugins from each application. This just meant updating the list of imports of each application.

With this structure we could easily find the URL from the definitions ```<app>/<plugin>```. This influence is still visible today in many of the plugin names.

With a 3rd party client application we might have ended up with something similar to this:

```html
  <script src="/apps/core/main.js"></script>
  <script src="/apps/cockpit/dashboards/main.js"></script>
  <script src="/apps/myapplication/pluginA/main.js"></script>
```

With this approach, each time the platform was updated the 3rd party applications would get the latest version of all plugins and sometimes it was difficult to update 3rd parties due to breaking changes.

### 2nd Generation: Changing to build time bundling {#2nd-generation-changing-to-build-time-bundling}

The main conceptual change of the second generation was that applications were self-contained. By this, we no longer used plugins as data that was loaded at runtime, and the list of script tags was rendered into the index.html during build time.

This way, each time the platform was updated, 3rd party applications were only affected when they were explicitly upgraded.

We became aware that plugins are just modules, and their names must be unique. The pattern ```<app>/<plugin>``` which was intentional earlier, became irrelevant with module names being unique, but we maintained compatibility with this naming as we do until today.

Although the strategy changed drastically, the manifest files stayed fully compatible.

We ended up with an index.html, generated when the application was assembled, looking like this:

```html
  <script src="./core/main.js"></script>
  <script src="./cockpit_dashboards/main.js"></script>
  <script src="./myapplication/main.js"></script>
```

Although plugins are not just data any longer, we still allow to change the applications with the UI, but it's actually an API that changes the file system. We delete directories and upload zips to create new directories, and mutate the index.html.

### Today's Generation: Native modules {#todays-generation-native-modules}

The new approach focuses on enabling the complete stack of modern web development and removing as much specificity from the process as possible. To allow that, we decided to update the existing angular.js framework to the next generation simply called Angular. To still enable the use of legacy browsers and allow the import from third party library's via npm the modules must be bundled. As bundler we choose to use webpack, as it plays nicely with Angular.

One major change is that so far modules (or plugins) were always represented during development and after build, so they could easily be composed by adding or removing a script. As we are now bundling everything, the modules can only be put together during development so applications can no longer be edited from the UI for now, but at the same time developers win the possibility to use the standardized ES2016 module architecture. That simplifies the development process because it follows standard approaches and doesn't need any kind of complex module architecture. At this point, plugins are truly just modules. We will keep the name around to refer to subpackages that contain some kind of isolated functionality.

This was the clear opportunity to modularize the stack. While the focus is still on Angular we provide tools to avoid framework lock-in. This results in multiple packages published to npm which can be used standalone. For example, a developer could use the API abstraction layer implemented in the @c8y/client to develop a React application. The stack is no longer exclusively bound to Angular.

#### Publishing to npm {#publishing-to-npm}

While previously publishing a tgz to our server, we will now deploy to npm:

 - @c8y/cli
 - @c8y/client
 - @c8y/style
 - @c8y/ng1-modules
 - @c8y/ngx-components

#### Branding no longer part of the application {#branding-no-longer-part-of-the-application}

So far, branding was always considered part of the application, as a module like any other. When there was the necessity to change it we had to change the application definition. For this we used the targets definitions. Now it is a build time option that reflects into its own entry point in the application. When building an application you will have one entry point for the application and another for the branding. That allows to update the application without redeploying the branding.

## Migrating {#migrating}

To use the new tooling you must switch the build tools. Previously, we have published the `c8y` command in the npm package "cumulocity-node-tools". Now we changed the command name to `c8ycli` to avoid conflicts and it is published on npm as "@c8y/cli".

The following table shows which versions support which tooling:

<!-- https://codepen.io/confraria/pen/VRrpPV -->
<table style="width:100%;font-family:sans-serif" class="support-versions">
  <style>
    .support-versions .green {
       background-color: green !important;
    }
    .support-versions .red {
       background-color: red !important;
    }
    .support-versions .yellow {
       background-color: gold !important;
    }
    .support-versions tr > td:first-child {
      font-weight:bold;
      text-align:right;
    }
    .support-versions .sub {
      font-weight: normal !important;
      color: gray;
    }
  </style>
  <tr style="text-align:center">
    <td></td>
    <th>9.16.x</th>
    <th>9.22.x</th>
    <th>9.25.x</th>
    <th>10.4.0.x and higher</th>
  <tr>
  <tr>
    <td>cumulocity-node-tools</td>
    <td colspan="3" class="green"></td>
    <td class="red"></td>
  </tr>
  <tr>
    <td>@c8y/cli</td>
    <td colspan="4"></td>
  </tr>
  <tr>
    <td class="sub">AngularJS</td>
    <td colspan="3" class="green"></td>
    <td class="red"></td>
  </tr>
  <tr>
    <td class="sub">Angular</td>
    <td colspan="2" class="yellow"></td>
    <td colspan="2" class="green"></td>
  </tr>
  <tr>
    <td class="sub">Hybrid (Angular & AngularJS)</td>
    <td colspan="2" class="red"></td>
    <td colspan="2" class="green"></td>
  </tr>
</table>

The table can be understood as follows:

 * The old tooling called "cumulocity-node-tools" only supports AngularJS builds until version 9.25.x
 * The new tooling called "@c8y/cli" can be used to build AngularJS applications until 9.25.x
 * Angular-only applications (= applications that are not extending our default applications: Cockpit, Device managament and Administration) can be built since 9.16.x as beta (yellow). The beta ended at 9.25.x.
 * Hybrid applications are applications that run with Angular and AngularJS at the same time and enable the use of existing AngularJS plugins in a modern Angular application.

{{< c8y-admon-info >}}
The {{< product-c8y-iot >}} platform itself is running as a hybrid application in production since version 9.25.x.
{{< /c8y-admon-info >}}

#### Deprecating custom manifests {#deprecating-custom-manifests}

Now developers have at their disposal all modern JS, so they just have to use normal ESM to import and export dependencies. Although the manifest files will still work, they are no longer required. We still support manifest files as entry points, so it is possible to use these as well as normal package.json files.

The cumulocity.json manifest is in practice a module descriptor, so with @c8y/cli (which uses webpack as a module bundler) applications and plugin manifests are resolved and loaded into webpack as any other module, by using custom loaders and resolvers.

For example, built-in AngularJS plugins are now included like this:

```javascript
import '@c8y/ng1-modules/dashboard2/cumulocity.json';
import '@c8y/ng1-modules/dashboardUI/cumulocity.json';
import '@c8y/ng1-modules/groupsHierarchy/cumulocity.json';
import '@c8y/ng1-modules/measurements/cumulocity.json';
import '@c8y/ng1-modules/map/cumulocity.json';
```

And they can also be imported inside any JS file:

```javascript
import './plugins/mywidget/cumulocity.json';
```

#### Running an existing application with @c8y/cli {#running-an-existing-application-with-c8ycli}

As observed in [this diff]({{< link-c8y-github >}}/cumulocity-ui-plugin-examples/compare/master...next) the changes to include the new tooling to an existing project are quite concise.

In [@c8y/cli](/web/development-tools/#c8y-cli), the entry point of an application can be a cumulocity.json application manifest or a plain Javascript file.

```bash
npx c8ycli serve ./cumulocity.json
npx c8ycli serve ./src/main.js
```

#### Using target files {#using-target-files}

Although target files are deprecated, it is still possible to use them if the entry point of an application is a cumulocity.json manifest.

To run the Cockpit application with a specific target:

```
npx c8ycli serve node_modules/@c8y/ng1-modules/apps/cockpit/cumulocity.json --env.target=mytarget.json
```

Although the modification to the application is read from the target file, the definition to run or build the application must be passed as an argument to the CLI.


#### Alternative to target files {#alternative-to-target-files}

As an alternative to target files developers should now use [application options](/web/application-configuration/#application-options).

There is no alternative to mutating the list of imported plugins. The recommended approach is to explicitly import the required modules.
