---
weight: 30
title: Branding
layout: redirect
sector:
  - platform_administration
---

With the Branding feature, you can fully customize the look of your tenant to your own preferences.

{{< c8y-admon-req >}}
APPLICATION ACCESS:

The branding feature comes as default with the {{<enterprise-tenant>}} and is available in the Administration application.

The branding functionality is enabled by subscribing to the "feature-branding" application.

ROLES & PERMISSIONS:

* To manage and apply the branding configuration:
    * READ, ADMIN permission for the "Application management" permission type

On tenant creation, there are default roles available that can be used as a sample configuration for the above-mentioned permissions:
* Tenant Manager - manages tenant-wide configurations like applications, tenant options and retention rules

{{< /c8y-admon-req >}}

### To configure branding settings {#to-configure-branding-settings}

In the **Branding** page, you can maintain multiple branding variants. One of the branding variants is always configured as the global branding. The global branding will by default apply to all apps on your tenant and your subtenants.

<img src="/images/users-guide/enterprise-tenant/et-branding-variants-list.png" alt="Branding variants list">

In addition to the global branding, there can also be branding variants that apply only to specific applications. This allows to brand applications differently.

For each branding variant, you can configure various parameters like logos, colors and font types used throughout the platform.
The [parameters](#editing-parameters) can be configured through the multiple tabs available on the **Branding** page. Most of the parameters are immediately applied to your current window as a preview.

If you want to make changes to one of your branding variants, we recommend you to duplicate the corresponding branding variant first and to make your changes on the duplicated variant as any saved changes would immediately be applied. This way you can review and edit the preview of your branding variant first across all applications before it is set as global branding and/or applied to your target applications.

To edit a branding variant you can configure the following tabs:
- **Generic**: Allows you to change generic parameters of your branding that are the same across all themes.
- **Light theme**: Allows you to edit the branding parameters for the light theme.
- **Dark theme**: Allows you to edit the branding parameters for the dark theme. The dark theme support needs to be enabled first in the **Generic** tab.
- **Custom CSS**: Allows you to customize the looks of your applications even more by providing your own Cascading Style Sheets.
- **Advanced branding**: Allows you to make direct changes to the branding JSON object via a text editor. This can be useful to set some of the [ApplicationOptions the Web SDK provides](https://resources.cumulocity.com/documentation/websdk/ngx-components/classes/ApplicationOptions.html) which are not immediately supported by the branding editor.

For a more detailed preview of your settings, click **Open preview** to check the look and feel of your branding settings in the overall platform. You may interact and even switch applications in the preview. Every change that you make in the **Branding** page is immediately applied to the **Preview** page after you click **Save**.

Click **Save** at the bottom to save your final branding settings to your tenant. This applies them to the places your branding variant applies to.

To revert back to the default settings, click **Delete all variants** in the in the top menu bar. With this action all branding variants are deleted. We therefore recommend you to export your existing variants beforehand.

### Editing parameters {#editing-parameters}

Each branding parameter can be configured in multiple ways.

#### Generic tab {#generic-tab}

In the **Generic** tab, you can edit the generic settings of your branding variant that will apply to all of your branding themes.

<img src="/images/users-guide/enterprise-tenant/et-branding-generic-tab.png" alt="Generic branding tab">

##### Title & favicon {#title-favicon}

Under **Title & favicon**, specify the following items:

* The title: This is displayed in the browser's address bar.
* The favicon: This is displayed in the browser's address bar. Click **Select** to select a file from your file system. The supported favicon format is ICO.

##### Dark theme {#dark-theme-support}

Here you can enable the dark theme support on this branding variant.
If enabled, the [**Dark theme** tab](#light-dark-theme-tab) is available.

##### Typography {#typography}

under **Typography** you specify the font settings for your brand variant.

You can select your base and headings font stack, and select an option for the navigator font stack. This is either same as base or same as headings font. You can also add a link to existing remote fonts to be used.

##### Cookie banner {#cookie-banner}

Under **Cookie banner** you specify the settings for the banner with the cookie usage information. If not disabled here, the banner is shown for all users of the current tenant and all subtenants until a user clicks **Agree and proceed**.

If you disable the cookie banner, this also disables the product experience tracking by Gainsight for the current tenant and all subtenants.

The following parameters can be specified:

* Title: Cookie banner title.
* Text: Cookie banner text with a general statement on the cookie usage and the use cases for it.
* Link to privacy policy: A link to the page with the privacy policy.
* Version of privacy policy: A version of the privacy policy (for example, a date). In case the version changes, the consent of all existing users is invalidated.

#### Light & dark theme tab {#light-dark-theme-tab}

The same set of parameters is available for both the light and the dark theme and can be changed in the corresponding tabs.
Further details regarding these parameters can be found in the [**Branding**](https://styleguide.cumulocity.com/apps/codex/#/ui-guidelines/foundations/design-tokens/branding/overview) and [**Color palette**](https://styleguide.cumulocity.com/apps/codex/#/ui-guidelines/foundations/design-tokens/color-palette/overview) sections of the Codex.

The theme switcher in the right drawer allows you to switch between the light and dark theme, once you enable the dark theme on your branding variant.

<img src="/images/users-guide/enterprise-tenant/et-branding-light-theme-tab.png" alt="Light theme branding tab">

<img src="/images/users-guide/enterprise-tenant/et-branding-dark-theme-tab.png" alt="Dark theme branding tab">

##### Logos {#logos}

Under **Logos**, specify the following items:

* Your brand logo: This showns during the application loading. Click **Select** to select a file from your file system. The supported formats are PNG, SVG and JPG.
* The brand logo height.
* Your navigator logo: This is located on top of the navigator panel. Click **Select** to select a file from your file system. The supported formats are PNG, SVG and JPG.
* The navigator logo height.

##### Brand colors {#brand-colors}

In the **Brand colors** section you specify the colors you like to use in the branding variant.

You can configure the following parameters by providing a HEX, RGB or RGBA value:

* Brand primary.
* Brand light: Mainly used for two-color icons.
* Brand dark: Mainly used for two-color icons.
* A set of 8 shades that you can generate based on your brand primary color. To generate the shades click **Reset shades**. The shades are used in various locations in the different applications.

##### Status colors {#status-colors}

In ther **Status colors** section you specify the colors used to display the different statuses.

For each status (**Info**, **Warning**, **Danger** and **Success**) you can provide three colors ("default, "light" and "dark").

##### Generic {#generic}

In the **Generic** section you specify the colors used in generic places.

The following parameters can be specified by providing a HEX, RGB or RGBA value:

* Body background color
* Text color
* Text muted color
* Link color
* Link hover color

In addition, you can also specify the **Button border-radius**.

##### Action bar {#action-bar}

In the **Action bar** section you specify the parameters for the action bar.

The following parameters can be specified by providing a HEX, RGB or RGBA value:

* Background color
* Text color
* Icon color
* Button color
* Button hover color

##### Main header {#main-header}

In the **Main header** section you specify the parameters for the main header.

The following parameters can be specified by providing a HEX, RGB, or RGBA value:

* Background color
* Text color
* Button hover color

##### Navigator {#navigator}

In the **Navigator**section you specify the parameters for the navigator.

The following parameters can be specified by providing a HEX, RGB, or RGBA value:

* Background color
* Text and buttons color
* Separator color
* Header background color
* Title color
* Active background color: Background color of the current item in the navigator
* Active border color: Border color of the current item in the navigator
* Active text color: Text color of the current item in the navigator

##### Right drawer {#right-drawer}

In the **Right drawer** section you specify the parameters for the right drawer.

The following parameters can be specified by providing a HEX, RGB or RGBA value:

* Background color
* Text color
* Text muted color
* Separator color
* Link color
* Link hover color

#### Custom CSS {#custom-css-tab}

The **Custom CSS** tab allows to customize the looks of your applications even more by providing your own Cascading Style Sheets.

You can utilize this to change colors for locations that have not been covered by the dialog window provided in the [**Light/Dark theme** tab](#light-dark-theme-tab).

<img src="/images/users-guide/enterprise-tenant/et-branding-custom-css-tab.png" alt="Custom CSS branding tab">

#### Advanced branding {#advanced-branding-tab}

The **Advanced branding** tab allows to make direct changes to the branding JSON object, which is usually filled by the other tabs behind the scenes, via a text editor. This can be useful to set some of the [ApplicationOptions the Web SDK provides](https://resources.cumulocity.com/documentation/websdk/ngx-components/classes/ApplicationOptions.html) which are not immediately supported by the forms the branding editor includes. More details regarding these options can also be found within [Codex](https://styleguide.cumulocity.com/apps/codex/#/develop/services/OptionsService/overview).

<img src="/images/users-guide/enterprise-tenant/et-branding-advanced-branding-tab.png" alt="Advanced branding tab">
