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
  Use the **Localization** feature to add translations for the existing static text in the platform UI.

   To add a new translation, click **Add translation** on the top menu bar. In the resulting dialog box, add the name of the key, followed by the translations in the respective fields.

---

Using the **Localization** functionality you can add custom translations for existing static text in the UI.

{{< c8y-admon-req >}}

- To view the **Localization** page: READ permission for permission type "Application management"

- To add/update/delete localization identifiers: ADMIN permission for permission type "Application management"

- Your user must have a role with READ permission for the permission type "Application management". See [Managing permissions](/standard-tenant/managing-permissions/) for more information.

{{< /c8y-admon-req >}}

Click **Localization** in the **Settings** menu in the navigator to open the translation editor.

![Main view localization page](/images/users-guide/Administration/admin-localization-main-page.png)

### To add new identifier for translations {#to-add-new-keys-for-translations}

1. Click **Add translation** on the top menu bar.
2. In the resulting dialog box, add a name for the new translation key.
3. Optionally, add translations in the respective fields.
4. Click **Add** to close the the translation editor.
5. Click **Save & apply** in the top menu bar to save the new translation identifier and apply it to the UI.

![localization-add-term](/images/users-guide/Administration/admin-localization-add-term.png)

### To add and edit translations {#to-add-and-edit-translations}

You can add or edit translations for every identifier in two ways:

1. Hover over the respective column to display the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i>.
2. Click the icon to select the desired language.
3. Add or edit the translation.
4. Click **Save**.
5. Click **Save & apply** to apply the changes.

Or:

1. Click the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i> in any row to open the translation editor.
2. Add or edit the translation for any language.
3. Click **Save**.
4. Click **Save & apply** to apply the changes.

To view the added or modified translations in the UI, change the language from the user menu, see [To change user settings](/get-familiar-with-the-ui/user-settings/#to-change-user-settings).
