---
title: Application options
layout: redirect
weight: 10
---

The easiest option to customize your application are application options. They apply to any Web SDK application and
use inheritance which allows you to apply the same configurations to all your applications. One example
configuration is `hideNavigator`, which is a simple flag that configures if the navigator must be
shown on application start or not. You can configure this in 3 ways:

1. as a URL parameter
2. as a dynamic public option
3. as a static private option

With regard to inheritance, the option "a URL parameter" contains the highest privilege, followed by the "dynamic public option" and the "static private option" respectively. Simply add a URL parameter to your application for testing out certain options. For example, to hide the navigator you would simply use the URL: `apps/<<your-app-name>>/index.html?hideNavigator=true#/route`. Note that the URL parameter needs to be set before the #-hash navigation.

The dynamic public option is requested by each Web SDK based application upon startup.
The default fetch URL for this options is stored in the `dynamicOptionsUrl` which is by default set
to `"/apps/public/public-options/options.json"`. As you can see by the context-path, the default
setting points to an application deployed to your tenant. To create this application on your
own ceate a zip file called `public-options.zip` and add a `options.json` to it:

```json
{
  hideNavigator: true
}
```

If you upload this application to your tenant and subscribe it to at least one of your subtenants,
all Web SDK based applications hide the navigator by default.

{{< c8y-admon-info >}}
If you are an {{< enterprise-tenant >}} customer, the easiest way to manipulate this options is to use the
branding manager in administration. It allows you to set most of the settings without the need to
manually generate a JSON file and upload any applications.
{{</ c8y-admon-info >}}

The static private option can only be defined by a custom application. They
are the lowest option level and can be overwritten by any of the upper options (1 and 2). They
are also private, meaning they only apply to the current application they are applied to. You can
define those options in the `cumulocity.config.ts` file by adding them to the `runTime` fragment:

```ts
[...]
export default {
  runTime: {
    [...]
    hideNavigator: true
  },
}
[...]
```

The options in the `cumulocity.config.ts` file can also be set dynamically at build time, for example, by accessing the environment variables:

```ts
[...]
export default {
  runTime: {
    [...]
    hideNavigator: process.env.C8Y_HIDE_NAVIGATOR === 'true'
  },
}
[...]
```

By setting the environment variable `C8Y_HIDE_NAVIGATOR` to `true` before building the application via `ng build` you can adjust the behavior of the application. On Linux systems you can run the build command with that environment option just set like this:

```sh
C8Y_HIDE_NAVIGATOR=true ng build
```

If you have, for example, different "flavors" of your application, you can also switch between the different flavors via an environment variable in your `cumulocity.config.ts`:

```ts
const flavor = process.env.C8Y_APP_FLAVOR || 'default';
let standardOptions: ConfigurationOptions = {
  runTime: {
    // [...]
    rightDrawer: true,
  },
  buildTime: {
    // [...]
  }
};

standardOptions.buildTime.brandingEntry = `./branding/branding-${flavor}.less`;
switch (flavor) {
  case 'customerA':
    standardOptions.runTime.hideNavigator = true;
    break;

  case 'customerB':
    standardOptions.runTime.hideNavigator = false;
    break;
}

export default standardOptions;
```

You can then build the different flavors using:
```sh
C8Y_APP_FLAVOR=customerA ng build
```

It is good practice to use the URL option in order to verify an option behavior, or to use the dynamic option
in order to set the option platform wide (branding) and to use the private static option in order to set the default for your
custom application.

To see all available options, refer to [Styling with application options](https://styleguide.cumulocity.com/apps/codex/#/getting-started/guides/theming/overview#styling-with-application-options) in the Cumulocity IoT Codex.
