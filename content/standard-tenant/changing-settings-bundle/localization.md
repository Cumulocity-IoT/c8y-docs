---
title: Localization
layout: redirect
sector:
  - platform_administration
weight: 50
helpcontent:
- label: localization
  title: Localization
  content: "
  Use the **Localization** feature to add translations for asset properties or asset models, as well as to add custom translations for the existing static text in the DTM application.


   Once you created all asset properties and asset models, their names are added under **Identifier** in the **Localization** page. You can add further translations as required.  


   To add a new translation, click **Add translation** on the top menu bar. In the resulting dialog box, add the name of the key, followed by the translation in the respective field.


   Note that to use this feature, your tenant must have the Public-options application installed."
---

{{< c8y-admon-req >}}
* To view the **Localization** page: READ permission for permission type "Application management"

* To add/update/delete localization identifiers: ADMIN permission for permission type "Application management"

* Your user must have a role with READ permission for the permission type "Application management". See [Managing permissions](/standard-tenant/managing-permissions/) for more information.

* Your tenant must have the Public-options application installed, see details below.
{{< /c8y-admon-req >}}

### To use the localization feature {#to-use-the-localization-feature}
Since the localization feature uses dynamically fetched application options, your tenant must have the Public-options application installed. Install the Public-options application manually or, as a workaround, apply the branding setting which installs the Public-options application behind the scenes.

For details on how to manually install the Public-options application, see [Branding your application](/web/application-configuration/#branding-your-application) and [Languages customization](/web/application-configuration/#languages-customization).

#### To apply the branding setting {#to-apply-the-branding-setting}
To apply the branding setting, you must first subscribe to the [Branding feature](/enterprise-tenant/customization/#branding) in the [{{< enterprise-tenant >}} ](/enterprise-tenant/enterprise-tenant-introduction/).

Complete the setup in the Administration application following the steps below:

1. Navigate to **Settings > Branding**.
2. Click **Apply**.
3. Navigate to **Ecosystem > Applications** to verify that the Public-options application is installed correctly.

{{<c8y-admon-info>}}
You must have administrator access to the tenant to install the Public-options application.
{{</c8y-admon-info>}}

### Localization {#localization}

To open the **Localization** page, navigate to **Configuration > Localization**.

If you want to add translations for the created [asset properties](/dtm/asset-types/#property-library) or [asset models](/dtm/asset-types/#asset-models), or if you want to add custom translations for the existing static text in the application, use the **Localization** feature.

![Main view localization page](/images/users-guide/Administration/admin-localization-main-page.png) 

Once you create an asset property or an asset model, their names are added automatically under **Identifier** in the **Localization** page. You can further add the translations as required.

{{< c8y-admon-info>}}
Note that if an asset property or asset model is present, the corresponding entry on the **Localization** page cannot be deleted. However, if no translation exists for the asset property or asset model, deleting the asset property or asset model will automatically remove the corresponding entry.

On the other hand, if a translation exists for the asset property or asset model, deleting it will not automatically remove the corresponding entry. In such cases, a delete option will be available for that specific translation, allowing you to manually delete the entry.
{{< /c8y-admon-info>}}

To add a new translation in the application, you can add the text as key and add the translations as required.

Click **Apply** to apply the changes.

### To add new identifier for translations {#to-add-new-keys-for-translations}

Add a new identifier and their respective translations using the **Add translation** option on the top right.

Fill all the mandatory fields in the **Add translations** dialog and click **Save**. The new key is saved including the added translations.

Next, click **Apply** to apply the changes.


![localization-add-term](/images/users-guide/Administration/admin-localization-add-term.png)

### To add and edit translations {#to-add-and-edit-translations}

 You can add or edit translations for every identifier in two ways:

1. Hover over the respective column for the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i> to be visible.
2. Click the icon to select the desired language.
3. Add or edit the translation.
4. Click **Save**.

or:

1. Click the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i> in each row to open the **Edit translations** dialog window.
2. Add or edit the translation for any language.
3. Click **Save**.

Click **Apply** to apply the changes.

Once all your translations are done, you can change the language under **UI settings** to see the translations in action. For more information see [To change user settings](/get-familiar-with-the-ui/user-settings/#to-change-user-settings).


{{< c8y-admon-info>}}
The added translations for an asset model or an asset property is seen only in the **Assets** page.

Translations for other static text of the application are currently available for English and German.
{{< /c8y-admon-info>}}