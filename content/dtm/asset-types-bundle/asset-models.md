---
weight: 30
title: Overview
layout: redirect
helpcontent:
- label: asset-types
  title: Asset definitions
  content: "An asset definition is a blueprint or template used to create one or more assets. It defines how an asset will look like after it is created. An asset definition consists of one or more property definitions or child asset definitions.


  Click **Add asset definition** in the top menu bar to create a new asset definition. To edit an existing asset definition, click the edit option from the actions menu on the right of the asset definition."
---

The asset definition is a blueprint or template to create one or multiple [assets](/dtm/asset-hierarchy/#assets). It defines how the asset will look like after it is created. An asset definition consists of one or more [property definitions](/dtm/asset-types/#asset-properties) and/or subasset definitions.

To get a quick start to use the DTM application, import pre-defined asset definitions from **Asset definition samples** page. These asset definitions and associated property definitions are defined based on best practices. For details about how to import asset definitions from samples, see [To import asset definition samples](#to-import-asset-definition-samples).

To reach the **Asset definitions** page, navigate to **Libraries > Asset definitions**.

When you create an asset definition, you see the details of this asset definition in the overview.

![Asset definitions overview](/images/dtm/asset-type/dtm-asset-type-view.png)

In the overview you see the following four categories:

*	**Definition name**: Name of the asset definition
*	**Key**: Unique identifier for the asset definition
*	**Description**: Brief description of the asset definition
*	**Subassets**: List of child asset definitions
*  **Properties**: List of property definitions

Click **Configure columns** to configure the displayed columns.

Click **Reload** to reload the screen.
The total number of asset definitions is displayed on the bottom left of the page.

Use the **Export asset definitions** and **Import asset defintions** feature to transfer asset definitions between tenants. This is useful for replicating the asset definitions in multiple tenants. By exporting and importing asset definitions, you can ensure consistency and reduce the time and effort required for manual configuration. See [To export asset definitions](#to-export-asset-definitions) and [To import asset definitions](#to-import-asset-definitions) on how to export or import asset defintions.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS

- To add/update/delete/import asset definitions: CREATE/ADMIN permission for permission type "Inventory"
{{< /c8y-admon-req >}}

#### Using generic asset definitions for flexibility {#using-generic-asset-definitions-for-flexibility}
Traditional asset definitions require a strict, sequential process where you must fully define definitions, data schemas, and hierarchical relationships before creating asset instances. You can make this more flexible by selecting the **Allow any asset** option when creating an asset definition. This creates a generic asset definition, which allows you to build your asset hierarchy without enforcing a predefined structure. Generic asset definitions are useful when:
- **Rapid prototyping**: Create asset representations quickly without predefining formal structures.
- **System integration**: Integrate data from external systems (such as MES or ERP) where the full schema is not yet known.
- **Evolving requirements**: Start with a flexible "container" and add structure as the project matures.

### To create an asset definition {#to-create-an-asset-definition}

Click **Add asset definition** on the top right to create a new asset definition. This opens the **New Asset definition** page.
Here, provide the following parameters:

<table>
<col width="20">
<col width="50">
<col width="30">
<thead>
<tr>
<th style="text-align:left">Field</th>
<th style="text-align:left">Description</th>
<th style="text-align:left">Mandatory / Optional</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><b>Definition name</b></td>
<td style="text-align:left">Refers to the name of the asset definition.<br>
This name is used for the asset definition throughout the application.</td>
<td style="text-align:left">Mandatory</td>
</tr>
<tr>
<td style="text-align:left"><b>Key</b></td>
<td style="text-align:left">Used to uniquely identify and store the asset definition in the DTM application.<br/><br/>
Note that the key is automatically generated based on the label. You can modify the automatically generated key to suit to your needs only during the asset definition creation. You cannot edit the key after the asset definition is created.
</td>
<td style="text-align:left">Mandatory</td>
</tr>
<tr>
<td style="text-align:left"><b>Description</b></td>
<td style="text-align:left">Provides a brief description of the asset definition.</td>
<td style="text-align:left">Optional</td>
</tr>
<tr>
<td style="text-align:left"><b>Icon</b></td>
<td style="text-align:left">Displayed next to the label for each asset definition.<br>
By default, no icon is selected. </td>
<td style="text-align:left">Optional</td>
</tr>
<tr>
<td style="text-align:left"><b>Subassets</b></td>
<td style="text-align:left">Restricts the asset assignment to the defined definitions.<br>
By default, no subassets are allowed if this field is not set.</td>
<td style="text-align:left">Optional</td>
</tr>
<tr>
<td style="text-align:left"><b>Allow any asset</b></td>
<td style="text-align:left">When selected, allows any asset to be added as a subasset, along with the ones set in the Subassets section.</td>
<td style="text-align:left">Optional</td>
</tr>
<tr>
<td style="text-align:left"><b>Properties</b></td>
<td style="text-align:left">Parameters that define an asset definition.<br>
By default, no asset definitions are selected.</td>
<td style="text-align:left">Optional</td>
</tr>
<tr>
<td style="text-align:left"><b>Allow any property</b></td>
<td style="text-align:left">When selected, allows any property to be added to an asset, along with the ones set in the Properties section.</td>
<td style="text-align:left">Optional</td>
</tr>
</tbody>
</table>

Once all required asset definitions are created, you can start creating [assets](/dtm/asset-hierarchy/#assets) using these asset definitions.

#### To select an icon {#to-select-an-icon}

1. Click the **Select icon** button on the left.
2. In the following dialog window, search or filter icons by type or select an icon from the predefined list.
3. Select the desired icon.
4. Click **Save**.

#### To add a child asset definition {#to-add-a-child-asset-definition}

1. Click **Add asset definition** to add an allowed child asset definition.
2. In the dropdown select one or multiple asset definitions.
3. The selected child asset definitions are then displayed under **Subassets** with the checkbox **Required** on the right.
   If the asset definition requires this subasset definition, select the checkbox. By default, it is clear.
4. Click the remove icon <i class="dlt-c8y-icon-minus-circle text-danger icon-20"></i> next to the checkbox to remove the subasset definition from the selected asset definition.
5. Select **Allow any asset** to make the asset definition generic to create asset hierarchy without enforcing a predefined structure.

{{< c8y-admon-info>}}
If you do not select any subasset definition or select **Allow any asset**, then the asset cannot have any subassets.
{{< /c8y-admon-info>}}

If one or more child asset definitions are checked as required, an asset created with this asset definition can have only subassets belonging to the selected subasset definitions.

**Example:**

If the asset definition is "Rotor" and you select "Blade" as an allowed subasset definition, then the newly created asset "AZ-43Y Rotor" can only have "Blade" assets as subassets.

#### To add a property definition to an asset definition {#to-add-an-asset-property-to-an-asset-definition}

1. Click **Add property definition** to add a property definition to the asset definition.
2. In the resulting dialog box, select one or multiple property definitions from the dropdown field.
   To search for specific property definition, type the respective name in the dropdown field.
3. The selected property definitions are then displayed on the **Properties** segment with the checkbox **Required** on the right.
   If the asset definition requires this property definition, select the checkbox. By default, it remains clear.
4. Reorder the property definitions via drag and drop.
5. To remove the property definition from the asset definition, click the remove icon <i class="dlt-c8y-icon-minus-circle text-danger icon-20"></i> next to the checkbox.
6. Select **Allow any property** to allow any property to be added to an asset, in addition to the property definitions set in the Properties section.
7. Click **Save** to save your settings.

{{< c8y-admon-info>}}
To assign a location to an asset, add the default property definition Location to the asset definition. For more info on default property definitions, see [Default property definitions](#default-property-definitions).<br>
If there are any validation errors for a field, it is highlighted in red with a validation error message asking you to fill in the required information. Enter the necessary information and click **Save**.
{{< /c8y-admon-info>}}

If there is no property definition meeting your requirements when you search, click **New property definition**. For more details on how to create a new Property definition see [To create a property definition](#to-create-a-property-definition).



### Root asset definition {#root-asset-definition}

To create a root asset definition, follow a bottom-up approach by defining all subasset and property definitions in the provided templates first.

This root asset definition can then be used to create an asset hierarchy, which then defines all the assets, subassets, asset properties and devices in the DTM application.

As a result you can use the asset hierarchy in other {{< product-c8y-iot >}} applications, such as the {{< product-c8y-iot >}} Cockpit.

### To create an asset definition for the entire hierarchy {#to-create-an-asset-definition-for-the-entire-hierarchy}


1. Create all required [property definitions](#asset-properties).
2. Then [create the asset definitions](#to-create-an-asset-definition) in a bottom-up approach, that is, all the subasset definitions are created first, followed by the root asset definition at the end.
3. [Create assets](/dtm/asset-hierarchy/#to-create-an-asset) for the new asset hierarchy.

This approach allows you to create the desired hierarchy, including all asset and property definitions in one process.

### To modify an asset definition {#to-modify-an-asset-definition}

1. Click the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i> on the right side of each asset definition.
2. Make your changes in the editor.
3. Click **Save**.
4. If this asset definition is used by any asset, select **Confirm** in the resulting confirmation dialog to continue saving your changes.

{{< c8y-admon-important >}}
An existing strictly-typed asset definition can be converted to a generic asset definition by selecting the **Allow any asset** option.
This conversion is not bidirectional. Once you make an asset definition generic, you cannot revert it to a strictly-typed asset definition. Evaluate the modeling requirements before applying this change.
{{< /c8y-admon-important >}}

### To delete an asset definition {#to-delete-an-asset-definition}

There are two ways to delete an asset definition:

#### Delete each asset definition individually {#delete-each-asset-definition-individually}

On the **Asset definitions** page, click the delete option from the actions menu on the right of the desired definition. Alternatively, click the name of the definition to view the details and click **Delete**.

#### Delete the asset definitions in bulk {#delete-the-asset-definitions-in-bulk}

On the **Asset definitions** page, select the checkboxes next to the desired asset definitions. Click **Delete** to delete the selected asset definitions.

### To sort asset definitions {#to-sort-asset-definitions}

To sort columns, hover over the respective column header and click the sort icon <i class="dlt-c8y-icon-sort-arrow icon-20"></i> for an ascending or descending order.

### To filter asset definitions {#to-filter-asset-definitions}

1. Use the filter option to filter asset definitions based on text in the respective asset group.
2. Hover over a column title for the filter icon <i class="dlt-c8y-icon-filter icon-20"></i> to appear on the right.
3. Click the icon <i class="dlt-c8y-icon-filter icon-20"></i> to filter the asset definitions in this column.
4. To clear all applied filters click **Clear filters** at the top.

### To export asset definitions {#to-export-asset-definitions}

To export asset definitions to add in another tenant, follow the steps below:

1. On the **Asset definitions** page, click **Export**.
2. In the resulting dialog, you see the list of asset definitions. Initially, all the asset definitions are collapsed. Click the expand icon <i class="dlt-c8y-icon-forward text-primary icon-20"></i> to the left of each asset definition to view the next level of asset definitions.
3. Select one or more desired asset definitions.
4. Click **Export** to export the selection.
5. The dialog window closes and a JSON file named 'Export-asset-models.json' downloads.

Use the downloaded file to import the asset definitions into the DTM application on another tenant.

{{< c8y-admon-info>}}
You can select a maximum of 30 asset definitions to export at one time.

When you select an asset definition with subasset and property definitions, all the definitions are selected automatically.
You cannot unselect a subasset definition of an asset definition that is already selected.
You can export a total of 250 asset definitions and 500 associated property definitions at one time.

You can select a subasset definition to export without selecting its parent. This gets exported as a root asset definition.
{{< /c8y-admon-info>}}

![Export asset definitions dialog](/images/dtm/asset-type/dtm-asset-type-export.png)

### To import asset definitions {#to-import-asset-definitions}

To import asset definitions, follow the steps below:

1. On the **Asset definitions** page, click **Import**.
2. Upload the JSON file in the drop file area of the resulting dialog. The JSON file is the file containing exported asset definitions from a DTM application on another tenant.
3. Click **Next** to preview the asset definitions. Initially, all the asset definitions are collapsed. Click the expand icon <i class="dlt-c8y-icon-forward text-primary icon-20"></i> to the left of each asset definition to view the next level of asset definitions.
4. Click **Import** to import the asset definitions.
5. Alternatively, click **Back** to go to previous step. Hover over the file name and click the remove icon <i class="dlt-c8y-icon-minus-circle text-danger icon-20"></i> to remove the current file and upload a different one.
6. The newly imported asset definitions are listed on the **Asset definitions** page.

![Import asset definitions](/images/dtm/asset-type/dtm-asset-type-import.png)
{{< c8y-admon-info>}}
When you upload the JSON file, it undergoes a validation process. If the validation fails, you see a corresponding message in the resulting dialog box. Click **Download log file** to view the errors.
Review the errors that are reported, resolve them, and attempt the import again.

You can import a maximum of 250 asset definitions and 500 associated property definitions at one time.
{{< /c8y-admon-info>}}

### To import asset definition samples {#to-import-asset-definition-samples}

When you navigate to the **Asset definition samples** page following **Libraries > Asset definitions > Asset definition samples**, you see a list of samples with name, description and tags associated with it.

To view the sample, click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the top right of sample name and click **View**.
In the resulting dialog, you see a list of asset definitions. Initially, the asset definitions in the list are collapsed. Click the expand icon <i class="dlt-c8y-icon-forward text-primary icon-20"></i> to the left of each asset definition to view the complete hierarchy.
Click **Import** to import the asset definitions in the sample.

Alternatively, to import the asset definitions in the sample without a preview, click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the top right of sample name and then click **Convert to asset definition**.

{{< c8y-admon-info>}}
When you select **View** or **Convert to asset definition**, the asset definition sample undergoes a validation process. If the validation fails, you see a corresponding message in the resulting dialog box. Click **Download log file** to view the errors.
Review the errors that are reported, resolve them and attempt the action again.
{{< /c8y-admon-info>}}


### Default asset definitions {#default-asset-definitions}
#### Group asset definition
Groups are used in {{< product-c8y-iot >}} to organize devices or other groups. The default group asset definition allows any group to be treated as an asset, providing a unified, flexible, and consistent approach to managing assets. Unlike other asset definitions in the Digital Twin Manager application, the group asset definition does not enforce hierarchical relationships.

##### Characteristics of the group asset definition {#default-group-definition-characteristics}
- Available by default, it cannot be deleted.
- Allows updating of label, description, and icon for the definition. This can be restricted by setting the value of the flag **isDefaultGroupEditDisabled** to "true" in the application options. For details, refer to [Application options](/web/application-configuration/#application-options).
- Does not support custom asset properties.
- Since the definition doesn't enforce a hierarchy, it does not require the definition of subassets.
- The definition can be easily identified by the "(Default)" suffix throughout the Digital Twin Manager application.

#### Generic asset definition {#default-generic-asset-definition}

The default generic asset definition allows you to create asset hierarchies without first configuring strict definition hierarchy. This is helpful when your requirements are still evolving and you want to prototype your asset structure. 

##### Characteristics of the default generic asset definition {#default-generic-definition-characteristics}

- The **Generic Asset** asset definition is identified with the key `c8y_GenericAsset`.
- Available by default, it cannot be deleted.
- Allows modifying the label, description, and icon.
- Allows defining subasset definitions and property definitions.
