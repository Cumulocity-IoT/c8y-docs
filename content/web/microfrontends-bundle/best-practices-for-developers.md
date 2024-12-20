---
title: Best practices for developers
layout: redirect
weight: 40
---

It can be overwhemling to decide which approach to use and how to start your development journey.
If you are a partner or a customer we recommend you join the micro frontend journey.
It allows to extend and use the ecosystem instead of building silo solutions.
This section explains our vision of this journey and describes our best practices regarding development.

#### The user journey - blueprint or plugin {#the-user-journey---blueprint-or-plugin}
To develop the right thing it is very important to understand what kind of user you want to target with your application.
For the micro frontend story, the target audience are solution architects with little developer experience.
The idea is simple: Any IoT solution can be set up by a user in a few steps - without coding.
The building blocks of this are developed by the ecosystem.
The steps are the following:

1. A solution architect selects the **blueprint** to use. This is the foundation application of the solution.
2. The blueprint guides through the configuration of the application. One step is, for example, the installation of the required **microservices or plugins**.
3. After setup, the solution is ready to use. The solution architect can now test it with other users. There may be additional requirements which can be accounted for with the option to **add or remove additional plugins**.

The user journey for the micro frontend story is a a self-service approach.
You provide an application that a non-developer can align to their needs.
It assumes that the usage of the application is unknown and up to the solution architect.
Therefore those applications must be designed in a generic way and allow for reuse as much as possible.
Use the following decision tree to decide if you want to develop a classic application or a micro frontend:

```
Your use case needs a distinct design and components?   --YES--> Consider a custom implementation.
                |
                NO
                |
Your use case is very specific?                         --YES--> Consider a custom implementation based on the Web SDK.
                |
                NO
                |
Your use case is an app that others can use?   --YES--> Consider a micro frontend blueprint.
                |
                NO
                |
Consider a micro frontend plugin.
```

The decision tree can be read from top (most effort, highest customization) to bottom (lowest effort, limited customization).
For example, if you choose to do everything on your own, you must write your own login logic and cannot use our pre-built components like data-grid, dashboard or asset-selector.
The development effort is very high.
If you use the Web SDK instead, you get a lot of functionality out of the box and by branding the application, you are able to make it look and feel like a product of your own development.
Furthermore, you can provide it as an application blueprint to your customers, enabling them to brand it according to their needs.

However, if one of the available blueprints (**Administration** > **Ecosystem** > **Extensions**) or the default applications (Cockpit, Device management or Administration) already mostly fit your case, but misses, for example, an extension, instead implement a plugin.
Plugins are easy to implement and can extend every part of the existing applications. Furthermore, if you intend to provide those extensions to your customers you can do so and share any plugin.

The next section explains the developer story of blueprints and plugins in detail and provides best practices.

#### Starting the developer journey for plugins and blueprints {#starting-the-developer-journey-for-plugins-and-blueprints}
All developer stories start with our CLI tool.
You can scaffold a new application and decide which demo you want to use.
For example, for a plugin you can try the `widget-plugin` demo.
This section does not go into details on how to do this (it was already explained in earlier sections).
Instead it explains what makes an application a plugin or a blueprint and what the difference is.

First of all, there is no big difference between usual applications, blueprints and plugins.
They are all built, tested and deployed via the application API.
However, plugins and blueprints have some detail information in their manifest file.

The manifest file contains all options that are stored in the `c8y.application` property in the *package.json* file.
At build time, it is compiled to the *cumulocity.json* file.
When you upload an archive containing a *cumulocity.json* file, its information is also accessible to the application API which makes the information available via request for other applications.

There are two important properties that indicate if the application is a plugin and which type it is.
There are additional properties that are either used for plugins or blueprints.
The following list consists of the properties that are relevant in a manifest file for a micro frontend:

```json
{
  "c8y": {
    "application": {
      "isPackage": true,
      "package": "plugin",
      "exports": [
        {
          "name": "Example widget plugin",
          "module": "WidgetPluginModule",
          "path": "./widget/widget-plugin.module.ts",
          "description": "Adds a custom widget to the shell application"
        }
      ],
      "remotes": {
        "widget-plugin": [
          "WidgetPluginModule"
        ]
      }
    }
  }
}
```

The properties are explained in detail in the step-by-step scaffolding of a [micro frontend](#2-differences-in-approach-to-creating-custom-widgets).
However, there are additional properties that might be of interest for creating a meaningful plugin or blueprint:

 - `c8y.application.noAppSwitcher`: This should always be set to `true` to not show a blueprint or a plugin in the app-switcher (UI component in the upper right corner, to switch between your installed applications).
 - `version`: This is the version that is used and displayed to the end user. This version is pinned if a plugin is installed and you cannot upload the same version twice. Use semver to let the platform verify the version.
 - `description`: This is the first piece of information the user reads about you application: Describe your application in one sentence to encourage the user to open the detail view.
 - `keywords`: Can be used to furthermore classify your application.
 - `author`: Informs the user who created the plugin/blueprint.
 - `license`: Informs the user about the license used. Always provide license information. From version 10.18.0, all community packages ask to confirm the license.
 - `repository`: Use this to point to an external repository where the source code is hosted.
 - `homepage`: Use this to point to an external application where more information can be found.
 - `requiredPlatformVersion`: Use this to point out which backend version you support.

Additionally you can add more information inside a detailed *README.md* file which is then displayed in the package detail view.
Those packages are the released artifact.
When you are ready, deploy a package to the platform which everyone can use to extend an existing application ( with a plugin) or install a new application (with a blueprint).
The next section explains what a package is and what it contains.

#### Packages and their content {#packages-and-their-content}

As pointed out in the user-stories, you can develop two kinds of micro frontends: Blueprints and plugins.
Both are applications that are uploaded to the application API and hosted by it.
As any of those hosted applications can contain more than one plugin or even a combination of blueprints and plugins, a new conceptual unit was introduced called 'packages'.
Packages allow you to bundle multiple plugins and/or a blueprint into one package and provide a version for them. An optimal package contains:
 - one or more plugins and/or a blueprint
 - a *README.md* file explaining the content
 - a LICENSE file which contains details about the license used

The idea of a package is to bundle multiple belonging plugins together that can be managed by a blueprint application. So a good use case could be a smart-city management app that exposes multiple widgets to display the information (for example a "free parking spots"-widget) to the cockpit application.

#### Where can I extend existing applications with an plugin? {#where-can-i-extend-existing-applications-with-an-plugin}
The extension ways did not change. You can use any of our HOOK_ interfaces as defined in our [ngx-components](/web/libraries/#extension-points) library. Usual things to hook are a NavigatorNode, a ActionBarItem or a Route.

{{< c8y-admon-tip >}}
From version 10.17.0, there is a typed helper function called `hook<<Name>>`.
For example, you can use `hookNavigator()` in a provider to hook a node into the navigator.
{{< /c8y-admon-tip >}}


#### Debugging an application {#debugging-an-application}
A plugin is a lazily loaded Angular module.
Therefore you can use the default Angular modules and verify them with the default developer story.
{{< product-c8y-iot >}} provides two more verification methods, so there are three ways of verifying and debugging your application:
 1. Classic: Run your application and import your module into the AppModule. Then start your application by running `c8ycli serve`.
 2. Lazy loading: Run your application but don't import the module. Instead, point the remote to your module (this is basically a self imported plugin). Point the `c8y.application.remotes` option to your module:
    ```
    "remotes": {
      "<<contex-path>>": [
        "<<module-name>>"
      ]
    }
    ```
    This has the benefit that your application acts as a shell and you can see where you might have issues with lazy loading.

 3. Shell: Run the application and point it to any shell by running `c8ycli serve --shell cockpit`. This has the benefit of testing it in a real application. But as the shell application is already deployed, you might be getting unhelpful error-stacks.

We recommend you to use method 2, lazy loading.
If required, verify your application with method 3.
Avoid method 1 if you can, as you could run into common pitfalls explained in the next section.


#### Common developer pitfalls when developing a plugin {#common-developer-pitfalls-when-developing-a-plugin}

There are several issues to avoid:
1. Routing: avoid commonly named routes. Don't use routes like `/home` instead, use `/<<my-unique-prefix>>/home`. Commonly named routes can be overwritten by other plugins. Do the same for any identifier you use in your development process.

2. Lazy loading: Remember that every plugin is imported lazily. This means that the rules of lazily loaded modules apply to those modules.  Don't use `forRoot` on the ngx-components `CoreModule` or the `RoutingModule`. Use `forRoot` for any newly introduced dependency.

3. Injectors: With the lazy loading approach, injectors are sometimes an issue. Usually you have a new injector per plugin. This is done automatically as long as you use the hooks without a factory function. If you use a factory function, you must provide the injector:
    ```
    import { Injectable, Injector } from '@angular/core';
    import { ActionBarItem, EmptyComponent } from '@c8y/ngx-components';

    @Injectable()
    export class MyActionBarFactory {
      constructor(private injector: Injector) {}

      get() {
        const actionBarItem: ActionBarItem = {
          component: EmptyComponent,
          injector: this.injector, // (1)
          placement: 'left'
        };
        return actionBarItem;
      }
    }
    ```

    `(1)`: This is important if the component you provided wants to use a service that is only available in your plugin. If you don't define the injector, it will use the root injector and therefore will lead to injector issues.


#### How to bundle assets in a package {#how-to-bundle-assets-in-a-package}
Bundling assets is not as easy as only copying them over. The path must be correctly reflected. For example, if you import an image, the path to the image is something like:
`http://<<instance>>/apps/<<context-path>>@<<version>>/my-image.png`.
You may not want to change the version on each deployment.
Therefore we recommend you to let the bundler handle images.
This is done by importing an image into a typescript file.
The bundler always returns the correct path to the image.
For example, create a file *assets/assets.ts* containing the following:
```
import previewImage from './widget-plugin-pr.png';

export const assetPaths = { previewImage };
```

Typescript will throw an error, as the it does not know how to handle PNG files.
Tell typescript to accept such files by declaring them as a module in the * assets/index.d.ts* file:
```
declare module '*.png';
```

Now import the asset somewhere in your plugin or blueprint and use the path to display the image:

```
import { assetPaths } from '../assets/assets';

console.log(assetPaths.previewImage);
```

The `assetPaths.previewImage` can now be used in any component or in a hook.
You can see a full example when you scaffold the *widget-plugin* with `c8ycli new`.
Note that the feature and example was added with version 10.17.0.

{{< c8y-admon-tip >}}
The recommended size for preview images used for widgets is 340 x 340 pixels.
{{< /c8y-admon-tip >}}

#### Translations {#translations}

Translations should work out of the box as for standard custom application.
Add a `.po` file to your repository and import it into your *index.ts* file.
The translation of a plugin might overwrite existing translations, as they are merged at run-time.
An example is created when you scaffold the *widget-plugin* with `c8ycli new`.
Note that there is a limitation: A plugin cannot add a new language. It can only extend the translated strings in the existing application.

#### Styling and branding {#styling-and-branding}
Branding is fully supported.
We recommend you to use component-based styling for your applications.
However you can also add custom global CSS styling by importing it.
```
import './example.css';
```
Again an example is created if you scaffold the *widget-plugin* with `c8ycli new`.

#### How to ensure application compatibility {#how-to-ensure-application-compatibility}

There is no way of ensuring general compatibility.
Every major Web SDK version may contain a new Angular version.
Angular is one of our libraries shared between all micro frontends and therefore calling a deprecated method on them might break the compatibility between a micro frontend and the application that imports it.
However we have two version protection methods that avoid such incompatibilities:
1. You can only add plugins to so called "custom" applications. Custom applications mean that you must own the application. As a side effect, you don't get automatic updates. This ensures that any platform update does not break your application.
2. Plugins are always versioned. An update to a plugin results in a new version, and if it is incompatible, the update doesn't break.

You can still update applications and plugins. For plugin updates we recommend you to clone the actual application and test if the plugin still works with the newer version. The cloned application is a test application and can be deleted afterwards.

For blueprints, you will get a notification that suggests to update the application. Those updates can also be tested and rolled back if some plugins fail.

From version 10.19.0. we also provide an additional version matrix showing exactly which version of a plugin is compatible with which version of the Web SDK.

For plugin developers who want to always provide the most compatible version of their plugin, we recommend our [community plugin Github project]({{< link-c8y-github >}}/cumulocity-community-plugins), which includes some CI/CD workflows to test and verify that the newest version of a plugin still works.

#### How to use repository connect {#how-to-use-repository-connect}

Repository connect is a microservice which synchronizes plugins or blueprints with an instance of the {{< product-c8y-iot >}} platform.
It must be installed on the {{< management-tenant >}} and you can connect multiple repositories.
Currently, only our {{< company-c8y >}} public GitHub is connected.
You can participate and share blueprints or plugins in multiple ways:
 1. Contribute to our open source plugins. A list can be found in our [{{< product-c8y-iot >}} GitHub packages](https://github.com/topics/cumulocity-package). There is an [official repository]({{< link-c8y-github >}}/cumulocity-community-plugins) which is managed by the internal R&D team of {{< product-c8y-iot >}}.
 2. Configure repository connect on your on-prem instance and point it to your organization.
 3. Ask our product manager to add your repository as a partner repository.

{{< c8y-admon-info >}}
This is only needed if you want to share an application with every {{< product-c8y-iot >}} customer. If you want to share a package with your customers (for example on an {{< enterprise-tenant >}}) you can simply upload them in the Packages view and set the availability to 'shared'.
{{< /c8y-admon-info >}}

For synchronization the microservice searches for all repositories with a certain topic and a release (for {{< company-c8y >}} it's `cumulocity-package`).
The release should be a single ZIP file containing the plugin or blueprint.
There is a security mechanism in place which is called scoping which disallows uploading an application without a certain prefix.
This is to avoid that any synced package can overwrite a default application like cockpit or administration.
Prefix the `key` and `contextPath` with the configured prefix (for Software AG it's `sag-pkg`).

All applications that are uploaded via repository connect are labeled `community` plugins and the user is informed of the license and maintenance agreements on installation (from version 10.18.0).
