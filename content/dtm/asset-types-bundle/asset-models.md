---
weight: 30
title: Asset models
layout: redirect
helpcontent:
- label: asset-types
  title: Asset models
  content: "An asset model is a blueprint or template to create one or multiple assets. It defines how an asset will look like after it is created. An asset model consists of one or more asset properties or child asset models.


  Click **Add asset model** in the top menu bar to add a new asset model. To edit an existing asset model, click the edit icon on the right of the desired asset model."
---

The asset model is a blueprint or template to create one or multiple [assets](/dtm/asset-hierarchy/#assets). It defines how the asset will look like after it is created. An asset model consists of one or more [asset properties](/dtm/asset-types/#asset-properties) and/or child asset models.

To get a quick start to use the DTM application, import pre-defined asset models from **Asset model samples** page. These asset models and associated properties are defined based on best practices. For details about how to import asset models from samples, see [To import asset model samples](#to-import-asset-model-samples).

To reach the **Asset models** page, navigate to **Configuration > Asset models**.

When you create an asset model, you see the details of this asset model in the overview.

![Asset models overview](/images/dtm/asset-type/dtm-asset-type-view.png)

In the overview you see the following four categories:

*	**Model name**: Name of the asset model
*	**Key**: Unique identifier for the asset model
*	**Description**: Brief description of the asset model
*	**Child asset models**: List of child asset models
*  **Asset properties**: List of asset properties

Click **Configure columns** to configure the displayed columns.

Click **Reload** to reload the screen.
The total number of asset models is displayed on the bottom left of the page.

Use the **Export asset models** and **Import asset models** feature to transfer asset models between tenants. This is useful for replicating the asset models in multiple tenants. By exporting and importing asset models, you can ensure consistency and reduce the time and effort required for manual configuration. See [To export asset models](#to-export-asset-models) and [To import asset models](#to-import-asset-models) on how to export or import asset models.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS

- To add/update/delete/import asset models: CREATE/ADMIN permission for permission type "Inventory"
{{< /c8y-admon-req >}}

### To create an asset model {#to-create-an-asset-model}

Click **Add asset model** on the top right to create a new asset model. This opens the **New Asset model** page.
Here, provide the following six parameters:

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
<td style="text-align:left"><b>Label</b></td>
<td style="text-align:left">Refers to the name of the asset model.<br>
This name is used for the asset model throughout the application.</td>
<td style="text-align:left">Mandatory</td>
</tr>
<tr>
<td style="text-align:left"><b>Key</b></td>
<td style="text-align:left">Used to uniquely identify and store the asset model in the DTM application.<br/><br/>
Note that the key is automatically generated based on the label. You can modify the automatically generated key to suit to your needs only during the asset model creation. You cannot edit the key after the asset model is created.
</td>
<td style="text-align:left">Mandatory</td>
</tr>
<tr>
<td style="text-align:left"><b>Description</b></td>
<td style="text-align:left">Provides a brief description of the asset model.</td>
<td style="text-align:left">Optional</td>
</tr>
<tr>
<td style="text-align:left"><b>Icon</b></td>
<td style="text-align:left">Displayed next to the label for each asset model.<br>
By default, no icon is selected. </td>
<td style="text-align:left">Optional</td>
</tr>
<tr>
<td style="text-align:left"><b>Child asset models</b></td>
<td style="text-align:left">Restricts the asset assignment to the defined models.<br>
By default, no subassets are allowed if this field is not set.</td>
<td style="text-align:left">Optional</td>
</tr>
<tr>
<td style="text-align:left"><b>Asset properties</b></td>
<td style="text-align:left">Parameters that define an asset model.<br>
By default, no asset properties are selected.</td>
<td style="text-align:left">Optional</td>
</tr>
</tbody>
</table>

Once all required asset models are created, you can start creating [assets](/dtm/asset-hierarchy/#assets) using these asset models.

#### To select an icon {#to-select-an-icon}

1. Click the **Select icon** button on the left.
2. In the following dialog window, search or filter icons by type or select an icon from the predefined list.
3. Select the desired icon.
4. Click **Save**.

#### To add a child asset model {#to-add-a-child-asset-model}

1. Click **Add child asset model** to add a new child asset model.
2. In the dropdown select one or multiple allowed child asset models.
3. The selected child asset models are then displayed under **Allowed child asset models** with the checkbox **Required** on the right.
   If the asset model requires this child asset model, select the checkbox. By default, it is clear.
4. Click the remove icon <i class="dlt-c8y-icon-minus-circle text-danger icon-20"></i> next to the checkbox to remove the child asset model from the selected asset model.

{{< c8y-admon-info>}}
If you do not select and check a child asset model, then the asset cannot have any subassets.
{{< /c8y-admon-info>}}

If one or more child asset models are checked as required, an asset created with this asset model can have only subassets belonging to the selected child asset models.

**Example:**

If the asset model is "Rotor" and you select "Blade" as an allowed child asset model, then the newly created asset "AZ-43Y Rotor" can only have "Blade" assets as subassets.

#### To add an asset property to an asset model {#to-add-an-asset-property-to-an-asset-model}

1. Click **Add asset property** to add a new asset property to the asset model.
2. In the resulting dialog box, select one or multiple asset properties from the dropdown field.
   To search for specific asset properties, type the respective name in the dropdown field.
3. The selected asset properties are then displayed on the **Asset properties** segment with the checkbox **Required** on the right.
   If the asset model requires this asset property, select the checkbox. By default, it remains clear.
4. Reorder the asset properties via drag and drop.
5. To remove the asset property from the asset model, click the remove icon <i class="dlt-c8y-icon-minus-circle text-danger icon-20"></i> next to the checkbox.
6. Click **Save** to save your settings.

{{< c8y-admon-info>}}
To assign a location to an asset, add the default property Location to the asset model. For more info on default properties, see [Default properties](#default-properties).<br>
If there are any validation errors for a field, it is highlighted in red with a validation error message asking you to fill in the required information. Enter the necessary information and click **Save**.
{{< /c8y-admon-info>}}

If there is no asset property meeting your requirements when you search, click **New asset property**. For more details on how to create a new asset property see [To create an asset property](#to-create-an-asset-property).

### Root asset model {#root-asset-model}

To create a root asset model follow a bottom-up approach by defining all child asset models and asset properties in the provided templates first.

This root asset model can then be used to create an asset hierarchy, which then defines all the assets, subassets, asset properties and devices in the DTM application.

As a result you can use the asset hierarchy in other {{< product-c8y-iot >}} applications, such as the {{< product-c8y-iot >}} Cockpit.

### To create an asset model for the entire hierarchy {#to-create-an-asset-model-for-the-entire-hierarchy}


1. Create all required [asset properties](#asset-properties).
2. Then [create the asset models](#to-create-an-asset-model) in a bottom-up approach, that is, all the child asset models are created first, followed by the root asset model at the end.
3. [Create assets](/dtm/asset-hierarchy/#to-create-an-asset) for the new asset hierarchy.

This approach, allows you to create the desired hierarchy including all asset models, child asset models and asset properties in one process.

### To modify an asset model {#to-modify-an-asset-model}

1. Click the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i> on the right side of each asset model.
2. Make your changes in the editor.
3. Click **Save**.
4. If this asset model is used by any asset, select **Confirm** in the resulting confirmation dialog to continue saving your changes.

### To delete an asset model {#to-delete-an-asset-model}

There are two ways to delete an asset model:

#### Delete each asset model individually {#delete-each-asset-model-individually}

On the **Asset models** page, hover over the desired asset model and click the delete icon <i class="dlt-c8y-icon-editing-trash text-danger icon-20"></i> on the right.

#### Delete the asset models in bulk {#delete-the-asset-models-in-bulk}

On the **Asset models** page, select the checkboxes next to the desired asset models. Click **Delete** to delete the selected asset models.

### To sort asset models {#to-sort-asset-models}

To sort columns, hover over the respective column header and click the sort icon <i class="dlt-c8y-icon-sort-arrow icon-20"></i> for an ascending or descending order.

### To filter asset models {#to-filter-asset-models}

1. Use the filter option to filter asset models based on text in the respective asset group.
2. Hover over a column title for the filter icon <i class="dlt-c8y-icon-filter icon-20"></i> to appear on the right.
3. Click the icon <i class="dlt-c8y-icon-filter icon-20"></i> to filter the asset models in this column.
4. To clear all applied filters click **Clear filters** at the top.

### To export asset models {#to-export-asset-models}

To export asset models to add in another tenant, follow the steps below:

1. On the **Asset models** page, click **Export**.
2. In the resulting dialog, you see the list of asset models. Initially, all the asset models are collapsed. Click the expand icon <i class="dlt-c8y-icon-forward text-primary icon-20"></i> to the left of each asset model to view the next level of child asset models.
3. Select one or more desired asset models.
4. Click **Export** to export the selection.
5. The dialog window closes and a JSON file named 'Export-asset-models.json' downloads.

Use the downloaded file to import the asset models into the DTM application on another tenant.

{{< c8y-admon-info>}}
You can select a maximum of 30 asset models to export at one time.

When you select an asset model with child asset models and asset properties, all the child asset models and their properties are selected automatically.
You cannot unselect a child asset model of an asset model that is already selected.
You can export a total of 250 asset models and 500 associated properties at one time.

You can select a child asset asset model to export without selecting its parent. This gets exported as a root asset model.
{{< /c8y-admon-info>}}

![Export asset models dialog](/images/dtm/asset-type/dtm-asset-type-export.png)

### To import asset models {#to-import-asset-models}

To import asset models, follow the steps below:

1. On the **Asset models** page, click **Import**.
2. Upload the JSON file in the drop file area of the resulting dialog. The JSON file is the file containing exported asset models from a DTM application on another tenant.
3. Click **Next** to preview the asset models. Initially, all the asset models are collapsed. Click the expand icon <i class="dlt-c8y-icon-forward text-primary icon-20"></i> to the left of each asset model to view the next level of child asset models.
4. Click **Import** to import the asset models.
5. Alternatively, click **Back** to go to previous step. Hover over the file name and click the remove icon <i class="dlt-c8y-icon-minus-circle text-danger icon-20"></i> to remove the current file and upload a different one.
6. The newly imported asset models are listed on the **Asset models** page.

![Import asset models](/images/dtm/asset-type/dtm-asset-type-import.png)
{{< c8y-admon-info>}}
When you upload the JSON file, it undergoes a validation process. If the validation fails, you see a corresponding message in the resulting dialog box. Click **Download log file** to view the errors.
Review the errors that are reported, resolve them, and attempt the import again.

You can import a maximum of 250 asset models and 500 associated properties at one time.
{{< /c8y-admon-info>}}

### To import asset model samples {#to-import-asset-model-samples}

When you navigate to the **Asset model samples** page following **Configuration > Asset models > Asset model samples**, you see a list of samples with name, description and tags associated with it.

To view the sample, click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the top right of sample name and click **View**.
In the resulting dialog, you see a list of asset models. Initially, the asset models in the list are collapsed. Click the expand icon <i class="dlt-c8y-icon-forward text-primary icon-20"></i> to the left of each asset model to view the complete hierarchy.
Click **Import** to import the asset models in the sample.

Alternatively, to import the asset models in the sample without a preview, click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the top right of sample name and then click **Convert to asset model**.

{{< c8y-admon-info>}}
When you select **View** or **Convert to asset model**, the asset model sample undergoes a validation process. If the validation fails, you see a corresponding message in the resulting dialog box. Click **Download log file** to view the errors.
Review the errors that are reported, resolve them and attempt the action again.
{{< /c8y-admon-info>}}
