---
title: Feature toggles
layout: redirect
sector:
  - platform_administration
weight: 60
---

The **Feature toggles** functionality enables or disables specific preview features in the UI.
This provides early access to new features before they are generally available.

Moreover, you can temporarily disable a feature that is generally available when you experience an issue with it.

Your feedback on these features is very valuable to us. Please submit your thoughts via the support portal.

{{< c8y-admon-req >}}

- To view the **Feature toggles** page: No specific permissions.

- To update the state of a feature toggle: ADMIN permission for the permission type "Tenant management".

{{< /c8y-admon-req >}}

Click **Feature toggles** in the **Settings** menu in the navigator to open the **Feature toggles** page.

The **Feature toggles** page displays the following columns:

- **Name**: The display name of the feature. Optional.
- **Description**: A brief explanation of what the feature does. Optional.
- **Key**: The unique identifier for the feature toggle.
- **Phase**: The current phase of the feature, either "Generally available" or "Public Preview".
- **Status**: The current state of the feature toggle, either "Enabled" or "Disabled". The state of a feature toggle depends on the phase of the feature. Before a feature is generally available, it is disabled by default. You must opt in to enable it. When a feature is generally available, it is enabled by default. You must opt out to disable it.
- **Strategy**: Indicates if the state of a feature toggle has been customized. Once you customize a feature toggle, it no longer changes its state according to the phase. To return to the default behavior, click the reset button in the customized row. 



### To toggle a feature {#to-toggle-a-feature}

1. Identify the row of the feature toggle that you want to change in the list.
2. Click the toggle switch in the **Status** column to change the state of the feature toggle.

### To manage features of subtenants {#to-manage-features-of-subtenants}

Users on the {{< management-tenant >}} can also manage the feature toggles of subtenants on the environment.
{{< management-tenant >}} see an additional **Feature toggles** tab in the detail view of a subtenant.
This functionality is not available on {{< enterprise-tenant >}}s.
