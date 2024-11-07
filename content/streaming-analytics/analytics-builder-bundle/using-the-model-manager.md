---
weight: 30
title: Using the model manager
layout: redirect
---

### The model manager user interface {#the-model-manager-user-interface}

The model manager contains two tabs: the **Models** tab which shows all currently defined models and the **Samples** tab which shows sample models that are intended to help you get started with creating your own models.

#### The Models tab {#the-models-tab}

The **Models** tab lists all available analytic models within the current {{< product-c8y-iot >}} environment as cards. You add new models and manage the existing models from here.

![Models tab showing the defined models](/images/streaming-analytics/analytics-builder/model-manager.png)

To edit a model, you can simply click on the card that is shown for the model \(see also [Editing an existing model](/streaming-analytics/analytics-builder/#editing-an-existing-model). When you add a new model or edit an existing model, the model editor is invoked in which you define the blocks and wires that make up a model. See [Using the model editor](/streaming-analytics/analytics-builder/#using-the-model-editor) for detailed information.

There are two types of models, and the cards for these models look different:

-   When a card shows a mode \(such as **Draft** or **Production**\) and state \(**Active** or **Inactive**\), it pertains to a model that has no template parameters. Such a model can be activated immediately in the model manager. See [Deploying a model](/streaming-analytics/analytics-builder/#deploying-a-model) for more information.

    If a runtime time error icon <img src="/images/streaming-analytics/analytics-builder/runtime_error.png" alt="Error icon" style="display:inline-block; margin:0"> is shown on the card of a deployed model, this model is no longer processing events. Click the runtime error icon to display information on what went wrong.

-   When a model has template parameters, it acts as a template. In this case, the number of defined and active instances is shown on the card. A template model is not activated directly in the model manager. Instead, you use the instance editor to create a number of instances, where each instance provides values for the template parameters. Each instance has a mode and can be activated and deactivated in the instance editor, as with models without any template parameters.

    To edit the instances, you can simply click the total number of instances \(see also [Editing the instances of a model](/streaming-analytics/analytics-builder/#editing-the-instances-of-a-model)\). This invokes the instance editor. See [Using the instance editor](/streaming-analytics/analytics-builder/#using-the-instance-editor) for detailed information.

    You can flip the card for a template model to show more details. Click **Show instances summary** to do this. You can then see the number of instances in the different modes.

    If an error icon such as <img src="/images/streaming-analytics/analytics-builder/instance-error.png" alt="Error icon with 1 error" style="display:inline-block; margin:0"> is shown on the card of a template model, at least one of the instances is no longer processing events. Click the error icon to display information on what went wrong.

As long as a model has no template parameters, there will be zero instances and the card shows the controls for selecting a mode and activating it.

Each card that is shown for a model has an actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the top right which contains commands for managing the model \(for example, to download or delete the model\).

If a description or tags have been defined for the model, this is shown on the card for that model. If you want to change the name, the description or the tags of a model, you must do this in the model editor. See [Changing the name, description, and tags of a model](/streaming-analytics/analytics-builder/#changing-the-name-description-and-tags-of-a-model).

If you have a long list of cards, you can easily locate the model that you are looking for by entering its name in the **Model name** search box. Or you can enter part of the model name. For example, enter the word "test" to find all models that have this word in their names. The characters that you type in may be contained at any position within the model name. These search criteria are not case-sensitive. When search criteria are currently applied, **Clear search** is shown next to the search box; click this to clear the search and thus to show all available cards.

You can also reduce the number of shown cards by using a filter. See [Filtering the models and samples](/streaming-analytics/analytics-builder/#filtering-the-models-and-samples) for detailed information.

#### The Samples tab {#the-samples-tab}

The **Samples** tab lists all sample models that are provided with Analytics Builder as cards.

![Samples tab showing the provided samples](/images/streaming-analytics/analytics-builder/model-manager-samples.png)

If the name of a sample or its description is not fully shown on the card, you can hover over the name or description to see the full name or description in a tooltip.

You can view the samples, but you cannot edit or deploy them. To view a sample, you can simply click on the card that is shown for the sample. The model editor is then invoked in read-only mode. See [Viewing a sample](/streaming-analytics/analytics-builder/#viewing-a-sample) for more information.

If you want to use a sample as a basis for further development, you can create a model from the sample. You can then edit the new model according to your requirements and deploy it. See [Creating a model from a sample](/streaming-analytics/analytics-builder/#creating-a-model-from-a-sample) for more information.

You can easily locate a sample by entering its name or part of the name in the **Sample name** search box \(for example, "geofence" or "email"\). You enter and clear the search criteria in the same way as described above for the **Model name** search box on the **Models** tab. You can also filter the samples by their tags; see [Filtering the models and samples](/streaming-analytics/analytics-builder/#filtering-the-models-and-samples) for more information.

### Filtering the models and samples {#filtering-the-models-and-samples}

The model manager offers several ways to reduce the number of cards that are shown on the **Models** and **Samples** tabs, thus letting you quickly locate the models or samples that you are looking for.

Filtering also works in combination with a model or sample name that you specify in the **Model name** or **Sample name** search box which is explained in [The model manager user interface](/streaming-analytics/analytics-builder/#the-model-manager-user-interface).

#### To filter the models or samples {#to-filter-the-models-or-samples}

1. On the **Models** or **Samples** tab of the model manager, click **More filters** in the toolbar.
2. In the resulting dialog, select one or more filters for the models. For samples, it is only possible to filter by tag.
   On the **Models** tab, you can filter the models according to the following criteria:    
   -  **Mode**.
      You can show only the models that are in a specific mode. For example, if you only want to see the models that are in simulation and test mode, select the corresponding checkboxes.
   -  **Status**.
      You can show only the models that are either active or inactive. For example, if you only want to see active models, select the corresponding checkbox.
   -  **Source or destination**.
      You can show only the models that use specific input sources or output destinations. Open the **Filter by source or destination** drop-down list box, select one or more items and click **Apply**.
   -  **Data point**.
      You can show only the models that use specific data points, such as `c8y_TemperatureMeasurement`. This requires that at least one item has been selected in the **Filter by source or destination** drop-down list box. Open the **Filter by data points** drop-down list box, select one or more data points, and click **Apply**.
   -  **Tags**.
      You can show only the models for which specific tags have been defined in the **Create model** dialog box which is shown when you add a new model or when you invoke the **Edit model** dialog box from the model editor \(see also [Adding a new model](/streaming-analytics/analytics-builder#adding-a-new-model) and [Changing the name, description, and tags of a model](/streaming-analytics/analytics-builder/#changing-the-name-description-and-tags-of-a-model)\). Open the **Filter by tag** drop-down list box, select one or more tags, and click **Apply**.

   You can combine several types of filters, for example, to show only active models in production mode that use a specific device.

   On the **Samples** tab, you can filter the samples by tag only. Open the **Filter by tag** drop-down list box, select one or more tags, and click **Apply**.

   All of the above-mentioned drop-down list boxes include a **Filter** search box that you can use to reduce the number of items that are offered for selection. You can enter a name or part of a name. For example, enter the word "test" to show only the items that have this word in their names. The characters that you type in may be contained at any position within the name. These filter criteria are not case-sensitive. Clicking the **All** checkbox selects all items that are currently shown in the drop-down list box, depending on the contents of the **Filter** search box.
3. Click **Apply filters**.
   The toolbar of the **Models** or **Samples** tab now shows the filters that are currently applied. This is an example of the **Models** tab:
   ![Toolbar showing the current filters](/images/streaming-analytics/analytics-builder/filters.png)
   Click **Clear filters** in the toolbar if you want to clear all filters. Or to clear a specific filter, click the X that is shown in the label for this filter, or click the filter name in the label and deselect that filter \(and other filters if required\) in the resulting dialog box. Clicking **Reset filters** in that dialog box clears all filters.

### Adding a new model {#adding-a-new-model}

When you add a new model, the model editor is invoked. See [Using the model editor](/streaming-analytics/analytics-builder/#using-the-model-editor) for detailed information.

{{< c8y-admon-info>}}
The new model will only be listed in the model manager, when you save the model in the model editor. See also [Saving a model](/streaming-analytics/analytics-builder/#saving-a-model).
{{< /c8y-admon-info>}}

You can also create a new model from a sample. See [Creating a model from a sample](/streaming-analytics/analytics-builder/#creating-a-model-from-a-sample) for more information.

#### To add a new model {#to-add-a-new-model}

1.  On the **Models** tab of the model manager, click **New model** in the toolbar.
2.  In the resulting **Create model** dialog box, enter a unique model name.

    You can optionally enter a description for the model and one or more tags.
    Tags are helpful for filtering the models in the model manager to show only the models for which a specific tag has been defined \(see also [Filtering the models and samples](/streaming-analytics/analytics-builder/#filtering-the-models-and-samples)\). To add a tag, you simply type its name and press Enter or the Tab key. The tag is then shown in a colored rectangle. To remove a tag, click the X that is shown in the rectangle. The dialog prevents you from entering duplicate tags for a model; if you enter such a tag name, the duplicate tag is not added and the original tag blinks one time.
3.  Click **OK**.
    The model editor appears. See [Overview of steps for adding a model](/streaming-analytics/analytics-builder/#overview-of-steps-for-adding-a-model) for a brief overview of how to add blocks and wires to the new model.

{{< c8y-admon-info>}}
When you click **Cancel** without specifying a model name, the model editor also appears and the default name "New" is then shown in the breadcrumb.
You can add blocks to the model, but as long as you do not specify a model name, you will not be able to save the model.
Click **Model settings** and specify a model name. See also [Changing the name, description, and tags of a model](/streaming-analytics/analytics-builder/#changing-the-name-description-and-tags-of-a-model).
{{< /c8y-admon-info>}}

### Editing an existing model {#editing-an-existing-model}

You can edit \(or view\) each model that is currently listed in the model manager.

When a model is active, editing will set the model to read-only mode. In this case, the model editor only allows you to view the contents of the model \(for example, you can view the block parameters\). You can navigate and zoom the model as usual, but you cannot change anything.

#### To edit a model {#to-edit-a-model}

On the **Models** tab of the model manager, simply click the card that is shown for the model \(but not on the toggle button for changing the state or the drop-down menu for changing the mode\).

Alternatively, click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> of the card and then click **Edit**.

When the model is active, a dialog appears informing you that you can only view the model. When you click **Continue**, the model editor appears and you can view the model, but you cannot change it. See [Using the model editor](/streaming-analytics/analytics-builder/#using-the-model-editor) for further information.

{{< c8y-admon-info>}}
If you do not have sufficient permissions \(that is, you only have READ permission for "CEP management" instead of ADMIN permission\), the actions menu provides a **View** command instead of the **Edit** command.
{{< /c8y-admon-info>}}

### Editing the instances of a model {#editing-the-instances-of-a-model}

When one or more blocks in a model use template parameters \(see also [Managing template parameters](/streaming-analytics/analytics-builder/#managing-template-parameters)\), you can set up different instances of that model.

Each instance can then use different values for the template parameters and can be activated independently from the other instances. The instances are defined and activated in the instance editor.

{{< c8y-admon-info>}}
The actions below are only available when template parameters have been defined for the model, that is, when the card for the model shows the number of defined instances.
{{< /c8y-admon-info>}}

#### To edit the instances of a model {#to-edit-the-instances-of-a-model}

On the **Models** tab of the model manager, click the total number of instances on the front of the card.

Alternatively, you can also do one the following:

- Click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> of the card and then click **Instances**.
- Or click **Show instances summary** to flip the card and then click the **Edit Instances** button on the back of the card.

{{< c8y-admon-info>}}
**Show instances summary** is only visible \(and thus you can only get to the back of the card\) if there are any instances \(regardless of state\).
{{< /c8y-admon-info>}}

This invokes the instance editor. See [Using the instance editor](/streaming-analytics/analytics-builder/#using-the-instance-editor) for further information.

### Deploying a model {#deploying-a-model}

A model \(or instance\) can have one of two states. The current state is always indicated on the card that is shown for a model:

-   **Active**. This state indicates that the model has been deployed.
-   **Inactive**. This state indicates that the model is currently not deployed.

The inputs that a model receives and what happens to its outputs depends on the mode to which the model is set. Each model can be set to one of the following modes:

-   **Draft**. The model is still under development. \(New models are created in draft mode.\)
-   **Test**. This mode is only permitted for models using a single device. When active, the model is deployed to the Apama correlator so that the measurements and events from the device are processed. The output of the model is only stored \(and recorded as an `Operation` or `Measurement` object of a "virtual device"\) and not sent back to the device.

    {{< c8y-admon-info>}}
Test mode is not supported for a model which contains a custom block which consumes input data and also produces output data. Custom blocks are created with the Block SDK; see also [Creating your own blocks](/streaming-analytics/analytics-builder/#creating-your-own-blocks).
    {{< /c8y-admon-info>}}

-   **Simulation**. This mode is only permitted for models using a single device. When active, the model uses historical input data \(replayed in real time from previously received data\) and is deployed to the Apama correlator. The output of the model is only stored \(and recorded as an `Operation` or `Measurement` object of a "virtual device"\) and not sent back to the device. To start a simulation, you must define the time range from which the input data is to be used. When all data from the time range has been replayed, the model is automatically undeployed from Apama and the model state is changed to **Inactive**. The timestamps of the historical data entries remain unchanged for easier comparison of simulation runs. See also [Model simulation](/streaming-analytics/analytics-builder/#model-simulation).
-   **Production**. When active, the model is deployed to the Apama correlator so that the measurements and events from the devices are processed. The output of the model is stored and sent back to the devices.

A model in draft mode can only be in the inactive state. A model in test, simulation or production mode can be in either the active or inactive state.

{{< c8y-admon-info>}}
The above information on the different states and modes similarly applies for the instances of a template model. The following instruction, however, only applies for non-template models. If you want to deploy the instances of a template model, see [Deploying an instance](/streaming-analytics/analytics-builder/#deploying-an-instance).
{{< /c8y-admon-info>}}

When a model is imported by loading a JSON file, it is always imported as an inactive model.

#### To deploy a model {#to-deploy-a-model}

1.  On the **Models** tab of the model manager, click the drop-down menu on the card for the model that you want to deploy and select one of **Production**, **Test** or **Simulation**.
2.  If you have selected simulation mode, click the calendar icon <i class="dlt-c8y-icon-calendar text-muted icon-20"></i> which is now shown, specify the time span that is to be used, and click **Apply**. See also [Simulation parameters](/streaming-analytics/analytics-builder/#simulation-parameters).
3.  When the toggle button currently shows **Inactive**, click this button to change the state to **Active**. For simulation mode, you can only set the state to **Active** when a valid time range has been defined.

### Undeploying a model {#undeploying-a-model}

You can undeploy \(that is, deactivate\) each model that is currently in production, test or simulation mode and for which the toggle button shows **Active**.

When you undeploy a model, the model is stopped and no longer processes incoming data. Any state built up in the model is lost. For simulation mode, this means that the model is stopped before all historical data from the specified time range has been replayed.

{{< c8y-admon-info>}}
If you want to undeploy the instances of a template model, see [Undeploying an instance](/streaming-analytics/analytics-builder/#undeploying-an-instance).
{{< /c8y-admon-info>}}

#### To undeploy a model {#to-undeploy-a-model}

In the **Models** tab of the model manager, click the toggle button on the card for the model that you want to undeploy so that **Inactive** is then shown on the button.

### Duplicating a model {#duplicating-a-model}

You can duplicate each model that is currently listed in the model manager.

The duplicated model gets the same name as the original model followed by the number sign \(\#\) and a number. For example, when the name of the original model is "My Model", the name of the first duplicate is "My Model \#1". The number in the model name is increased by one with each subsequent duplicate that you create. The duplicated model gets the same description as the original model. It is recommended that you edit the duplicate and give the model a meaningful name and description.

#### To duplicate a model {#to-duplicate-a-model}

On the **Models** tab of the model manager, click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> of the model that you want to duplicate and then click **Duplicate**.

A card for the duplicated model is immediately shown in the model manager.

### Downloading a model {#downloading-a-model}

You can download each model that is currently listed in the model manager. This is helpful, for example, if you want to transfer a model from the current {{< product-c8y-iot >}} tenant to a different tenant. The model is saved in JSON format.

#### To download a model {#to-download-a-model}

On the **Models** tab of the model manager, click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> of the model that you want to download and then click **Download**.

The resulting behavior depends on your browser. The model is usually downloaded to the download location of your browser.

{{< c8y-admon-info>}}
The **Download** command is also available when the model is active (read-only mode). This allows you to download the model at any time.
{{< /c8y-admon-info>}}

### Copying a model {#copying-a-model}

Instead of downloading a model, you can also copy the JSON code of the model to the clipboard and then paste it into an editor of your choice.

#### To copy a model {#to-copy-a-model}

On the **Models** tab of the model manager, click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> of the model that you want to copy and then click **Copy**.

{{< c8y-admon-info>}}
The **Copy** command is also available when the model is active (read-only mode). This allows you to copy the JSON code at any time.
{{< /c8y-admon-info>}}

### Uploading a model {#uploading-a-model}

You can upload a model that has previously been downloaded in JSON format. This is helpful, for example, if you want to upload a model from a different {{< product-c8y-iot >}} tenant.

#### To upload a model {#to-upload-a-model}

1.  On the **Models** tab of the model manager, click **Import model** in the toolbar, and then click **Upload**.
2.  In the resulting dialog box, navigate to the location where the model that you want to upload is stored.
3.  Select the model and click **Open**.

A card for the uploaded model is shown in the model manager.

### Pasting a model {#pasting-a-model}

Instead of uploading a model, you can also paste the JSON code for a model from the clipboard.

#### To paste a model {#to-paste-a-model}

On the **Models** tab of the model manager, click **Import model** in the toolbar, and then click **Paste**.

{{< c8y-admon-info>}}
The **Paste** command is enabled only if the clipboard contains content.
{{< /c8y-admon-info>}}

If the clipboard contains valid JSON code for a model, a card for the pasted model is shown in the model manager.

### Deleting a model {#deleting-a-model}

You can delete each model that is currently listed in the model manager. When you delete a model that is currently deployed, it is first undeployed and then deleted.

#### To delete a model {#to-delete-a-model}

1.  On the **Models** tab of the model manager, click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> of the model that you want to delete and then click **Delete**.
2.  In the resulting dialog box, click **Delete** to confirm the deletion.

### Reloading all models {#reloading-all-models}

You can refresh the display to show any changes other users have made since the page loaded, or to see whether deployed models have entered a failed state.

#### To reload all models {#to-reload-all-models}

On the **Models** tab of the model manager, click **Reload** in the toolbar.

### Viewing a sample {#viewing-a-sample}

The samples are always in read-only mode. You can view the contents of each sample that is currently listed in the model manager.

For example, you can look at the block parameters and view the documentation for each block that is used in the sample. You can navigate and zoom the sample in the same way as a regular model, but you cannot add or edit anything. However, you can create a new model from a sample \(see also [Creating a model from a sample](/streaming-analytics/analytics-builder/#creating-a-model-from-a-sample)\).

#### To view a sample {#to-view-a-sample}

On the **Samples** tab of the model manager, simply click the card that is shown for the sample.

Alternatively, click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> of the card and then click **View**.

### Creating a model from a sample {#creating-a-model-from-a-sample}

You can create a new model from each sample that is currently listed in the model manager. The new model gets the same name, description and tags as the sample.

{{< c8y-admon-info>}}
You must save the new model so that it is listed in the model manager. If a model with that name already exists, you are prompted to save the new model with a different name.
{{< /c8y-admon-info>}}

#### To create a model from a sample {#to-create-a-model-from-a-sample}

On the **Samples** tab of the model manager, click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> of the sample from which you want to create a new model and then click **Create model from sample**.

Alternatively, when the sample is currently shown in the model editor, click **Create model from sample** in the toolbar.

The new model is immediately shown in the model editor and you can now change each aspect of the model.
