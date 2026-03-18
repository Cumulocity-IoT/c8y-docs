---
title: Feature toggles
layout: redirect
sector:
  - platform_administration
weight: 60
---

Using the **Feature toggles** functionality you can enable or disable certain (preview) feature within the UI.
This allows you to get early access to features that are newly developed while they are not yet considered to be generally available for everyone.

This also allows to temporarily disable a certain features that became generally available, in case you are having an issue with it.

Any positive or negative feedback regarding these features is highly appreciated. Please provide it via your corresponding support channel.

{{< c8y-admon-req >}}

- To view the **Feature toggles** page: No specific permissions.

- To update the state of a feature toggles: ADMIN permission for permission type "Tenant management"

{{< /c8y-admon-req >}}

Click **Feature toggles** in the **Settings** menu in the navigator to open the feature toggle view.

The state of a feature toggle depends on the **Phase** the feature development is currently in.
Until a feature becomes generally available it is disabled by default and needs to be opted into if wanted.
Once it becomes generally available, it is enabled by default and would need to be opted out if required.

The **Strategy** column indicates if the state of a feature toggle has been customized.
Note: Once a feature toggle has been customized, it will no longer change it's state according to the **Phase** it is in.
In case you want to revert back to the default behavior where the **Status** depended on the **Phase** of a feature: an additional reset button is available on customized rows in order to reset the feature toggle to the default state.


### Toggle a feature

1. Identify the row of the feature toggle you would like to change within the list
2. By clicking the toggle switch in the **Status** column you can change the state of the column

### Managing features of subtenants

Users on the `management` tenant can also manage the feature toggles of subtenants on the environment.
For these users there is an additional **Feature toggles** tab in the detail view of a subtenant.
This functionality is not available on enterprise tenants.
