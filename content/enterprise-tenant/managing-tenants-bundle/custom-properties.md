---
weight: 30
title: Custom properties
layout: redirect
helpcontent:
  - label: custom-properties
    title: Custom properties
    content: "The **Custom properties** tab allows you to view and edit the values of tenant custom properties for this subtenant. The available custom properties are based on the property definitions on the **Tenant properties** page. To add, edit, or delete a custom property, go to the **Tenant properties** page."
---

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

- To view the **Custom properties** tab: READ permission for the "Tenant management" permission type
- To save custom property values: READ, ADMIN permission for the "Tenant management" permission type
  {{< /c8y-admon-req >}}

The **Custom properties** tab allows you to view and edit the values of tenant custom properties for a subtenant.

Each custom property is based on a property definition on the **Tenant properties** page. For details on how to open the page and how to create, edit, and delete property definitions, see [Property definitions](/dtm/asset-types/#asset-properties).

Every property definition that you create on the **Tenant properties** page is automatically available in the **Custom properties** tab of each subtenant. Each subtenant stores its own values, so the same custom property can hold a different value for each subtenant.

{{< c8y-admon-info >}}
Values that you set for custom properties from the former **Properties library** (**Settings > Properties library**) are kept. After the migration, the **Custom properties** tab of each subtenant displays these values.
{{< /c8y-admon-info >}}

The tab displays one field for each property definition, depending on its type:

- **Text** and **Number**: An input field for the value.
- **Date picker**: A date that you select from the calendar.
- **Enumeration**: A selection of the values defined in the property definition.
- **Multiselect list**: Multiple values that you select from the values defined in the property definition.
- **Boolean**: A checkbox.
- **File upload**: A file to upload. Click the name of a stored file to download it.
- **Complex**: A group of fields labeled with the name of the property, in the order configured in the property definition.
- **Location**: The latitude and longitude that you enter or select on the map. **Location** is a default property definition and the tab always displays it.

The validation rules configured in the property definition apply when you enter a value, for example, minimum and maximum values, length restrictions, or regular expressions.

{{< c8y-admon-info >}}
The **Custom properties** tab is not available while you create a subtenant. Set the custom property values after you create the subtenant.
{{< /c8y-admon-info >}}

### To edit custom property values {#to-edit-custom-property-values}

1. Click **Subtenants** in the **Tenants** menu.
2. Click the desired subtenant or click the edit icon at the right of the subtenant entry.
3. Switch to the **Custom properties** tab.
4. Enter or change the values. To remove a value, clear the field.
5. Click **Save**.

The platform saves the values that you changed for the subtenant. All other values remain unchanged.

To discard your changes and return to the list of subtenants, click **Cancel**.

{{< c8y-admon-info >}}
If you delete a property definition or change its type, the tab no longer displays a stored value that does not match the definition. The subtenant keeps the stored value until you save a new value for this custom property.
{{< /c8y-admon-info >}}

The [Usage statistics](/enterprise-tenant/usage-and-billing/#to-view-usage-statistics) page displays custom properties that existed before the introduction of the **Tenant properties** page as columns. The **Usage statistics** page currently does not display custom properties that you create on the **Tenant properties** page.
