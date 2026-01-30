---
title: Branding your application
layout: redirect
weight: 20
---

A branding must always be applied to all of your applications. Therefore, it is recommended to use
dynamic public options for branding your application. You must set the right
[design tokens](https://cumulocity.com/codex/design-system/design-tokens/overview) in the `brandingCssVars`
application option. Those are CSS variables that get applied to all default style sheets of
{{< product-c8y-iot >}} and will show your custom branding for any Web SDK application. Your `options.json` then
look like this:

```json
{
  "brandingCssVars": {
    "--brand-primary": "#B10F2E",
    "--brand-complementary": "#DE7C5A",
    "--brand-dark": "#280000",
    "--brand-light": "#DE7C5A",
    "--palette-status-realtime" : "#f0f"
  }
}
```

You can add other options, for example, the `hideNavigator` or add your own CSS file:

```json
{
  "brandingCssVars": {
    "--brand-primary": "#B10F2E",
    "--brand-complementary": "#DE7C5A",
    "--brand-dark": "#280000",
    "--brand-light": "#DE7C5A",
    "--palette-status-realtime" : "#f0f"
  },
  "hideNavigator": true,
  "extraCssUrls": "./custom.css",
}
```

In the CSS file you can add your own styles:

```css
h1 {
  color: #00f;
}
```  

Follow the steps below:

1. Zip the files to ensure that they are in the root of the zip without any wrapping folder.
2. Name the zip file `public-options.zip`.
3. Upload it as a web application in **Administration** > **Ecosystem** > **Applications**.
4. Subscribe your applications to one of your tenants under **Tenants** > **Subtenants**.

Afterwards, you can update the existing application with new variables in the detail
view of the application.

{{< c8y-admon-info >}}
If you are an {{< enterprise-tenant >}} customer, the easiest way to manipulate this options is to use the
branding manager in administration. It provides an form to set most of the settings without any
manual generating of a JSON file and uploading applications.
{{</ c8y-admon-info >}}


## Styling by extending @c8y/style

For styling the application global CSS created with [LESS](http://lesscss.org/) is used. The
original LESS source is distributed via the npm package
[@c8y/style](https://www.npmjs.com/package/@c8y/style). By extending these styles it is possible to
change any detail of the application but the vast majority of developers want to change: colors,
logos and fonts and these can be very easily achieved by replacing a few variables.

To override variables, `Custom CSS Properties`—also known as `CSS Variables`—can be utilized, offering configurability at runtime or during the build process.

1. Ensure that your project is based on the Angular CLI (whether upgraded or created from scratch).
2. Make sure you have installed the `@c8y/style` package. If not, you can install the base styles from npm using the following command.

```javascript
@import '~@c8y/style/main.less';

```

The example is based on this file structure:

```bash
my-application
|   ...
│   angular.json
│   package.json
|   ...
└───src
    │   styles.less
    │   favicon.ico
    │   ...
    └─── assets
         │   logo.jpg
         │   ...
```

3. If `styles.less` already exists, add the line `@import '~@c8y/style/main.less'` at the top of the file. If it does not exist, create it and add the mentioned line. Also, include it in the `styles` entry in `angular.json` under your project entry.

4. In the `cumulocity.config.ts` file, add `brandingEntry: './src/styles.less'` to the `buildTime` entry.

If you are using a different file from `styles.less` located in another location, please adjust the paths as described in the previous step. Ensure to correctly set both the `brandingEntry` and the `styles` entry in `angular.json`.

## Example customizations

At this point, we can modify the desired variables to suit our needs. To implement these changes, follow the examples below and add the specified code to your `styles.less` file.

Let us change for example the most important color of your branding, the main color, called
**brand-primary**.

This is done by setting the respective CSS variables to a new color.

```css
:root {
  --brand-primary: red;
}
```

User interface elements like buttons, active navigation nodes or even active tabs as well as also
hover-states of buttons are red now.

To change the brand logo you can use this:

```css
:root {
  --brand-logo-img: url('/apps/<applicationContextPath>/assets/logo.jpg');
  --brand-logo-img-height: 48%;
}
```

The `applicationContextPath` can be any application that you uploaded to the platform and which contains the `logo.jpg` file.
