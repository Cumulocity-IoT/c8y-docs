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

{{< c8y-admon-important >}}
**Recommended approach:** For most use cases, we recommend using the **branding editor** in the Administration application with **CSS variables** (Approach 1 below). This allows runtime customization without rebuilding applications and provides a user-friendly interface for non-developers.

Use **LESS variables** (Approach 2) only for advanced scenarios requiring build-time customization or when you need deeper control over styling that goes beyond what the branding editor offers.
{{</ c8y-admon-important >}}

To override variables, `Custom CSS Properties`—also known as `CSS Variables`—can be utilized, offering configurability at runtime or during the build process.

### Setup steps {#setup-steps}

1. Ensure that your project is based on the Angular CLI (whether upgraded or created from scratch).

2. Make sure you have installed the `@c8y/style` package. If not, you can install the base styles from npm using the following command:

   ```bash
   npm install @c8y/style
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

3. If `styles.less` already exists, add the line `@import '~@c8y/style/extend.less';` at the **top** of the file. If it does not exist, create it and add the mentioned line:

```css
/* src/styles.less */
@import '~@c8y/style/extend.less';
```

4. Include the `styles.less` file in the `styles` entry in *angular.json* under your project entry:

   ```json
   {
     "projects": {
       "your-app": {
         "architect": {
           "build": {
             "options": {
               "styles": [
                 "src/styles.less"
               ]
             }
           }
         }
       }
     }
   }
   ```

{{< c8y-admon-important >}}
**The import order is critical:** Always import `@c8y/style/extend.less` **first** at the top of your file, then override variables **after**. This ensures the conditional guard system can detect your overrides correctly.
{{</ c8y-admon-important >}}

## Example customizations

At this point, we can modify the desired variables to suit our needs. To implement these changes, follow the examples below and add the specified code to your `styles.less` file.

### Approach 1: Using CSS variables (Runtime) — Recommended

You can set CSS variables directly, which allows for runtime customization:

**Benefits:**

- ✅ No rebuild or redeployment needed
- ✅ Changes apply instantly at runtime
- ✅ Can be managed via the branding editor UI
- ✅ Works across all applications tenant-wide
- ✅ Easier for non-developers

```css
  /* src/styles.less */
  @import '~@c8y/style/extend.less';

  :root {
    --brand-primary: red;
    --brand-logo-img: url('/apps/<applicationContextPath>/assets/logo.jpg');
    --brand-logo-img-height: 48%;
  }
```

The `applicationContextPath` can be any application that you uploaded to the platform and which contains the *logo.jpg* file.

User interface elements like buttons, active navigation nodes, and active tabs will use your custom brand color.

### Approach 2: Using LESS variables (Build-time) — Advanced

For advanced build-time customization scenarios, override LESS variables **after** importing `extend.less`:

**When to use:**

- Advanced styling needs beyond CSS variables
- Build-time baking of styles
- Custom application with specific styling requirements

**Note:** This requires rebuilding and redeploying your application for changes to take effect.

```css
/* src/styles.less */
/* 1. Import Cumulocity styles FIRST */
@import '~@c8y/style/extend.less';

/* 2. Override LESS variables AFTER with direct values */
@brand-primary: #e30613;  /* Your custom brand color (must use direct hex value) */

/* 3. Logo configuration (paths relative to your styles.less file) */
@brand-logo-img-fallback: '../assets/logo.jpg';
@brand-logo-height-fallback: 48%;

/* 4. Navigator logo */
@navigator-platform-logo-fallback: '../assets/logo-white.png';
@navigator-platform-logo-height-fallback: 28%;

/* Apply navigator logo (required for extend.less pattern) */
.navigator .tenant-brand {
  background-image: var(--c8y-navigator-platform-logo);
  padding-bottom: var(--c8y-navigator-platform-logo-height);
}
```

{{< c8y-admon-important >}}
**Important rules for LESS variables:**

1. Always use direct color values (for example, `#e30613`, not `@my-color`).
2. Import `extend.less` **before** overriding variables.
3. Logo paths are relative to your `styles.less` file location.
4. Add explicit CSS rule for navigator logo when using LESS variables.
{{</ c8y-admon-important >}}
