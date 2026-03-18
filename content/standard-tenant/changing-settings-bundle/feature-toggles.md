---
title: Feature toggles
layout: redirect
sector:
  - platform_administration
weight: 60
---

Using the **Feature toggles** functionality, you enable or disable specific preview features in the UI.
You get early access to new features before they are generally available.

You can also temporarily disable a feature that is generally available when you experience an issue with it.

Any feedback about these features is important. Provide it through your support channel.

{{< c8y-admon-req >}}

- To view the **Feature toggles** page: No specific permissions.

- To update the state of a feature toggle: ADMIN permission for the permission type "Tenant management"

{{< /c8y-admon-req >}}

Click **Feature toggles** in the **Settings** menu in the navigator to open the feature toggle view.

The state of a feature toggle depends on the **Phase** of the feature.
Before a feature is generally available, it is disabled by default. You must opt in to enable it.
When a feature is generally available, it is enabled by default. You must opt out to disable it.

The **Strategy** column indicates if the state of a feature toggle has been customized.
Once you customize a feature toggle, it no longer changes its state according to the **Phase**.
To return to the default behavior, click the reset button in the customized row. This resets the feature toggle so that the **Status** again depends on the feature **Phase**.


### To toggle a feature {#to-toggle-a-feature}

1. Identify the row of the feature toggle that you want to change in the list.
2. Click the toggle switch in the **Status** column to change the state of the feature toggle.

### To manage features of subtenants {#to-manage-features-of-subtenants}

Users on the `management` tenant can also manage the feature toggles of subtenants on the environment.
For these users there is an additional **Feature toggles** tab in the detail view of a subtenant.
This functionality is not available on enterprise tenants.
