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
  Use the **Localization** feature to add translations for asset properties or asset models, as well as to add custom translations for the existing static text in the application.


   Once you created all asset properties and asset models, their names are added under **Identifier** in the **Localization** page. You can add further translations as required.  


   To add a new translation, click **Add translation** on the top menu bar. In the resulting dialog box, add the name of the key, followed by the translation in the respective field.

---

{{< c8y-admon-req >}}

- To view the **Localization** page: READ permission for permission type "Application management"

- To add/update/delete localization identifiers: ADMIN permission for permission type "Application management"

- Your user must have a role with READ permission for the permission type "Application management". See [Managing permissions](/standard-tenant/managing-permissions/) for more information.

  {{< /c8y-admon-req >}}

### Localization {#localization}

Click **Localization** in the **Settings** to open localization settings.

Use the **Localization** feature if you want to add custom translations for the existing static text in the application.

![Main view localization page](/images/users-guide/Administration/admin-localization-main-page.png)

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
