---
weight: 50
title: Using the instance editor
layout: redirect
---

### The instance editor user interface {#the-instance-editor-user-interface}

A prerequisite for invoking the instance editor is that one or more template parameters have been defined in the model editor \(see also [Managing template parameters](/streaming-analytics/analytics-builder/#managing-template-parameters)\).

The instance editor allows you to set up different instances of the same model. The blocks in each instance can then use different values for the template parameters, and the instances can be activated independently from the other instances. You invoke the instance editor from the model manager. See also [Editing the instances of a model](/streaming-analytics/analytics-builder/#editing-the-instances-of-a-model).

{{< c8y-admon-info>}}
To edit the instances, you must have ADMIN permission for "CEP management". If you have READ permission, you will only be able to view the instances.
{{< /c8y-admon-info>}}

The instance editor shows the instances for a selected model. If there are any instances, a table shows the values of the instances, the mode and whether the instance is active.

![Instance editor with instances](/images/streaming-analytics/analytics-builder/instance-editor.png)

A row is shown for each instance. A column is provided for each template parameter that is defined in the template model, with the name of the template parameter being the column header. When an instance is not active, you can adjust the values for that instance.

A horizontal scrollbar is available if not all template parameters \(columns\) can be shown on the screen.

The right side of the table shows the mode and status of each instance. You activate \(deploy\) and deactivate \(undeploy\) the instances from here. See also [Deploying an instance](/streaming-analytics/analytics-builder/#deploying-an-instance) and [Undeploying an instance](/streaming-analytics/analytics-builder/#undeploying-an-instance).

Each row that is shown for an instance has an actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the very right which contains commands for managing the instance \(for example, to delete the instance\).

You can control the list of instances by filtering and sorting. See [Filtering and sorting the instances](/streaming-analytics/analytics-builder/#filtering-and-sorting-the-instances) for more information.

If the error icon <i class="dlt-c8y-icon-warning text-danger icon-20"></i> is shown near the end of a row, the corresponding instance is no longer processing events. Click that icon to get more information.

When you open the instance editor, it may happen that template parameters have been changed since you last edited the instances and that they no longer use the same values types as before. If the values specified in the instance editor are still compatible, they are converted to the new value types. Incompatible values \(including checkboxes for boolean types and values that are shown in drop-down list boxes\) are automatically removed. Each field from which the value has been removed shows an error underline and a corresponding error message.

### Adding an instance {#adding-an-instance}

When you add a new instance, a new row is added to the instance editor table. You can then either immediately fill in the required values, or you can first add all required rows and then fill the rows one after the other.

#### To add an instance {#to-add-an-instance}

1.  In the toolbar of the instance editor, click **New Instance**.
    This adds a new row at the bottom of the table. New instances \(rows\) are shown with a background color until they have been saved.

2.  Fill in the template parameter values, as defined by the model. See also [Editing an instance](/streaming-analytics/analytics-builder/#editing-an-instance).

### Editing an instance {#editing-an-instance}

You provide the parameter values for instances in the same way as you provide values for blocks in the model editor \(see also [Editing the parameters of a block](/streaming-analytics/analytics-builder/#editing-the-parameters-of-a-block)\).

The instance editor table provides different types of input controls, depending on the type of template parameter:

-   Text boxes are provided in which you can enter values, depending on the setting of the template parameter \(for example, a string or a float or a multi-line string\). Your input is validated as you type. For example, it is not possible to enter a string value in a text box that expects a float value.
-   Checkboxes are provided for boolean values. Selecting a checkbox corresponds to setting the value to `true`.
-   Drop-down list boxes are provided when you can select a different value \(for example, to select a different rule for rounding\).
-   When you edit an input source or output destination, an additional dialog box appears. The dialog box is the same as when selecting a different input source or output destination in the block parameter editor \(see [Editing the parameters of a block](/streaming-analytics/analytics-builder/#editing-the-parameters-of-a-block) for more information on this dialog box\). Click the button which is shown when you hover over an entry to select the input source or output destination that you want to use.

Instances \(rows\) that have been edited but have not yet been saved are shown with a background color until they have been saved.

When a text box requires a value that has not yet been specified, a message is shown, indicating that this is a required field. It is possible to save the instances and leave the instance editor, and set all of the required values at a later point in time. As long as the missing fields of an instance have not been specified, it is not possible to activate that instance.

### Deploying an instance {#deploying-an-instance}

You can activate \(that is, deploy\) each instance separately. For example, one instance can be in production mode and another in test mode. See [Deploying a model](/streaming-analytics/analytics-builder/#deploying-a-model) for more information on the different modes; that information applies to both regular models and template models.

When you activate an instance, all changes for that instance are first saved and the instance is then activated.

When an instance is activated, the template parameter values, where supplied, are taken and applied to those block parameters in the model which use a template parameter binding. If no template parameter value is provided, then a default value for that template parameter is used, if there is one. If no template parameter value is supplied in the case of a required template parameter, then the instance will fail to activate.

Once an instance is active, you cannot modify the template parameter values or mode without deactivating the instance first. If any instances are active, then the model is read-only and cannot be modified until all instances are deactivated.

#### To deploy an instance {#to-deploy-an-instance}

1.  In the **Run Mode** column of the instance editor, click the drop-down menu for the instance that you want to deploy and select one of **Production**, **Test** or **Simulation**.
    You cannot activate instances that are in draft mode.

2.  If you have selected simulation mode, click the calendar icon <i class="dlt-c8y-icon-calendar text-muted icon-20"></i> which is now shown, specify the time span that is to be used, and click **Apply**. See also [Simulation parameters](/streaming-analytics/analytics-builder/#simulation-parameters).

3.  When the toggle button in the **Status** column currently shows **Inactive**, click this button to change the state to **Active**. For simulation mode, you can only set the state to **Active** when a valid time range has been defined.
    In the case of an error, the error icon <i class="dlt-c8y-icon-warning text-danger icon-20"></i> is shown at the right of the table and the instance cannot be activated. Click the error icon to get more information.

### Undeploying an instance {#undeploying-an-instance}

You can deactivate \(that is, undeploy\) each instance that is currently in production, test or simulation mode and for which the toggle button in the **Status** column of the instance editor shows **Active**.

When you undeploy an instance, the instance is stopped and no longer processes incoming data. Any state built up in the instance is lost. For simulation mode, this means that the instance is stopped before all historical data from the specified time range has been replayed.

#### To undeploy an instance {#to-undeploy-an-instance}

In the **Status** column of the instance editor, click the toggle button for the instance that you want to undeploy so that **Inactive** is then shown on the button.

### Filtering and sorting the instances {#filtering-and-sorting-the-instances}

If you have a long list of instances, you can easily locate the instances that you are looking for by entering a value in the search box. Or you can enter part of the value. This searches all input fields in the instance editor and only lists the instances \(rows\) that contain this value. All values that match the filter are highlighted. The search criteria are not case-sensitive. When search criteria are currently applied, an X is shown in the search box; click this to clear the search and thus to show all available instances.

You can also sort the columns of the instance editor table. To do so, click one of the sort icons <i class="dlt-c8y-icon-sort-arrow text-muted icon-20"></i> that are shown in the column header. This sorts the instances according to the values in that column \(for example, alphabetically or by number\). Clicking again sorts the column in the opposite direction. Fields with required values in that column that have not yet been specified can thus be shown either at the very top or bottom of the column. You can also sort the instances alphabetically according to run mode and status, for example, to show the active instances at the top.

Editing a value will not affect the display of rows in the instance editor table. If you want to reapply the search and sorting, you must save and reload the instances.

Adding a new instance will not affect the display of rows in the instance editor table. If you add a row after sorting, the row is always added at the bottom of the table, unless you reload the instances.

{{< c8y-admon-info>}}
You can also reorder the template parameters in the **Template Parameters** dialog box \(see [Managing template parameters](/streaming-analytics/analytics-builder/#managing-template-parameters)\). This affects the sequence in which they are shown in the instance editor.
{{< /c8y-admon-info>}}

### Duplicating an instance {#duplicating-an-instance}

You can duplicate each instance \(row\) that is currently listed in the instance editor. The original instance and its duplicate will then both have the same template parameter values and the same mode. However, the duplicated instance is always inactive even if the original instance is active.

#### To duplicate an instance {#to-duplicate-an-instance}

In the instance editor, click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> of the instance that you want to duplicate and then click **Duplicate**.

A new row for the duplicated instance is immediately shown at the bottom of the instance editor table.

### Deleting an instance {#deleting-an-instance}

You can delete each instance that is currently listed in the instance editor. When you delete an instance that is currently deployed, it is first undeployed and then deleted.

#### To delete an instance {#to-delete-an-instance}

1.  In the instance editor, click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> of the instance that you want to delete and then click **Delete**.

2.  In the resulting dialog box, click **Delete** to confirm the deletion.

### Saving the instances {#saving-the-instances}

You can save the instances even if there are still rows in which required information must be specified. This is helpful if you want to add that information at a later point in time.

{{< c8y-admon-info>}}
When you activate an instance, all of your recent changes are automatically saved. See also [Deploying an instance](/streaming-analytics/analytics-builder/#deploying-an-instance).
{{< /c8y-admon-info>}}

#### To save the instances {#to-save-the-instances}

In the toolbar of the instance editor, click **Save**.

This command is only enabled when changes have been applied to the instances. It saves only those instances where the rows that are highlighted with a background color.

### Reloading the instances {#reloading-the-instances}

You can refresh the display to show the latest state of all instances, or to see whether deployed instances have entered a failed state.

#### To reload the instances {#to-reload-the-instances}

In the toolbar of the instance editor, click **Reload**.

If there are unsaved changes when reloading, you are prompted to save these changes first.

### Leaving the instance editor {#leaving-the-instance-editor}

When you leave the instance editor as described below, you are returned to the model manager.

#### To leave the instance editor {#to-leave-the-instance-editor}

In the toolbar of the instance editor, click the close icon <i class="dlt-c8y-icon-clear icon-20"></i>.

If there are unsaved changes when leaving, you are prompted to save these changes first.
