---
weight: 20
title: Configuration settings
layout: redirect
sector:
  - platform_administration
---

To enable the SSO feature, the administrator must configure a connection with the authorization server. This is done in the Administration application.

### Configuration access {#configuration-access}

SSO configurations can be configured to be exclusively accessible by the {{< management-tenant >}}, thus preventing other tenants from accessing the configurations.
Users of such tenants are unable to update the configuration. This removes the risk of an incorrectly configured SSO, which can prevent other users from logging in via SSO.
The {{< management-tenant >}} can grant or restrict access to SSO configurations for specific tenants. For more information about configuration access, refer to the [Login options API](https://{{< domain-c8y >}}/api/core/#operation/putAccessLoginOptionResource) in the {{< openapi >}}.

### Configuration view {#configuration-view}

Click the **Single sign-on** tab in the **Authentication** page.
Note that the tab is only visible for tenants which have access to the SSO configuration.

At the top left, you can select a template. The selected option has an effect on the look of the panel. The default template is "Custom" which allows for a very detailed configuration with virtually any authorization server using OAuth2 authorization code grant. Other templates provide simplified views for well known and supported authorization servers. In the next steps there will first be a definition of how to use the "Custom" template followed by a view dedicated to Azure Active directory.
