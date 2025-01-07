---
weight: 40
title: Using the model editor
layout: redirect
---

### The model editor user interface {#the-model-editor-user-interface}

The model editor allows you to create analytic models graphically. It is invoked when you add or edit a model in the model manager. See also [Adding a new model](/streaming-analytics/analytics-builder/#adding-a-new-model) and [Editing an existing model](/streaming-analytics/analytics-builder/#editing-an-existing-model).

{{< c8y-admon-info>}}
The model editor is also invoked when you view a sample. In this case, the model editor is invoked in read-only mode and the palette on the left is not shown. See also [Viewing a sample](/streaming-analytics/analytics-builder/#viewing-a-sample).
{{< /c8y-admon-info>}}

![Model editor with palette, canvas and documentation pane](/images/streaming-analytics/analytics-builder/model-editor.png)

The palette on the left contains the blocks that you can add to your model. It has several expandable/collapsible categories for the different types of blocks.

The canvas in the middle is the area in which you "draw" your model. You drag the blocks from the palette onto the canvas, specify the parameters for the blocks, and wire the blocks together. The content of the canvas is aligned to a grid, see also [Showing and hiding the grid](/streaming-analytics/analytics-builder/#showing-and-hiding-the-grid).

The overview area at bottom right of the canvas shows the entire model. This is helpful if your model is too large to fit on the currently visible area of the canvas. See also [Navigating large models](/streaming-analytics/analytics-builder/#navigating-large-models).

The documentation pane on the right allows you to view reference information for the currently selected block. See also [Viewing the documentation for a block](/streaming-analytics/analytics-builder/#viewing-the-documentation-for-a-block).

{{< c8y-admon-caution>}}
Changes are only saved when you click the save icon <i class="dlt-c8y-icon-save icon-20"></i>.
See also [Saving a model](/streaming-analytics/analytics-builder/#saving-a-model). The editor warns you if you attempt to navigate away from the editor and there are unsaved changes. However, you should always ensure that your changes are saved before disconnecting the browser from the network or suspending a laptop.
{{< /c8y-admon-caution>}}

### Working with models {#working-with-models}

#### Overview of steps for adding a model {#overview-of-steps-for-adding-a-model}

This topic gives a brief overview of how to add and design a new model. For more detailed information, see the topics that are referenced in the steps below.

You add and design a model as follows:

1.  On the **Models** tab of the model manager, click **New model**. Enter a model name in the resulting dialog box. See also [Adding a new model](/streaming-analytics/analytics-builder/#adding-a-new-model).
2.  In the model editor, drag the required blocks from the palette onto the canvas. See also [Adding a block](/streaming-analytics/analytics-builder/#adding-a-block).
3.  Refer to the block documentation as necessary. See also [Viewing the documentation for a block](/streaming-analytics/analytics-builder/#viewing-the-documentation-for-a-block).
4.  Use the block parameter editor to specify the parameters of the block. See also [Editing the parameters of a block](/streaming-analytics/analytics-builder/#editing-the-parameters-of-a-block).
5.  Connect the appropriate blocks with wires. See also [Adding a wire between two blocks](/streaming-analytics/analytics-builder/#adding-a-wire-between-two-blocks).
6.  Save your changes. See also [Saving a model](/streaming-analytics/analytics-builder/#saving-a-model).
    {{< c8y-admon-info>}}
Only saved models are listed in the model manager. When you add a new model and then leave the model editor without saving the model, it will not be listed in the model manager, and all the edits you made will be lost.
    {{< /c8y-admon-info>}}
7.  Leave the model editor. This takes you back to the model manager. See also [Leaving the model editor](/streaming-analytics/analytics-builder/#leaving-the-model-editor).
8.  A newly added model is automatically set to draft mode in the model manager. If you want to test it, simulate it, or make it available in production, see [Deploying a model](/streaming-analytics/analytics-builder/#deploying-a-model).

For detailed background information, including restrictions, see [Wires and blocks](/streaming-analytics/analytics-builder/#wires-and-blocks).

#### Changing the name, description, and tags of a model {#changing-the-name-description-and-tags-of-a-model}

You can rename each model that you are currently editing in the model editor, and you can also change the description of each model.

You can also add or remove tags. Tags are helpful in the model manager, to show only the models for which a specific tag has been defined, see also [Filtering the models and samples](/streaming-analytics/analytics-builder/#filtering-the-models-and-samples).

##### To change the name, description, and tags of a model {#to-change-the-name-description-and-tags-of-a-model}

1.  In the model editor, click **Model settings** which is shown at the left of the toolbar.
2.  In the resulting **Edit model** dialog box, specify a new unique name for the model, change the description, and/or change the tags.

    To add a tag, you simply type its name and press Enter or the Tab key. The tag is then shown in a colored rectangle. To remove a tag, click on the X that is shown in the rectangle. The dialog prevents you from entering duplicate tags for a model; if you enter such a tag name, the duplicate tag is not added and the original tag blinks one time.

3.  Click **OK**.

#### Saving a model {#saving-a-model}

When you save a model in the model editor, it is stored in the {{< product-c8y-iot >}} inventory for your tenant, in JSON format.

{{< c8y-admon-important>}}
It may happen that you and another user are editing the same model at the same time. In this case, the changes that are saved last will be stored. So your changes might be overwritten by a later save by another user.
{{< /c8y-admon-important>}}

##### To save a model {#to-save-a-model}

In the toolbar of the model editor, click the save icon <i class="dlt-c8y-icon-save icon-20"></i>.

The save icon <i class="dlt-c8y-icon-save icon-20"></i> is only enabled when changes have been applied to the model and the model has been given a name.

#### Leaving the model editor {#leaving-the-model-editor}

When you leave the model editor as described below, you are returned to the model manager. You can then, for example, edit a different model, or change the mode or state of the current model.

{{< c8y-admon-caution>}}
All unsaved changes are lost when you navigate to a different URL or close the browser window.
{{< /c8y-admon-caution>}}

##### To leave the model editor {#to-leave-the-model-editor}

In the toolbar of the model editor, click the close icon <i class="dlt-c8y-icon-clear icon-20"></i>.

In case there are still unsaved changes, you are asked whether to save or discard them.

###  Working with blocks and wires {#-working-with-blocks-and-wires}

#### Adding a block {#adding-a-block}

The blocks in the palette are grouped into different categories. When you move the mouse pointer over a block in the palette, a tooltip appears which briefly explains the purpose of the block. The tooltip also shows the entire name of the block.

Detailed information for each block is available in the block reference, which is shown in the documentation pane. See also [Viewing the documentation for a block](/streaming-analytics/analytics-builder/#viewing-the-documentation-for-a-block).

##### To add a block {#to-add-a-block}

1.  In the palette of the model editor, expand the category which contains the block that you want to add.
2.  Drag the block from the palette and drop it on the canvas.

    When you drop the block on an existing block on the canvas, the new block is created on top of that block. When you drop the block on a collapsed group, the new block is created below that group. In both cases, you should move the new block to a free space of the canvas. See also [Moving a block](/streaming-analytics/analytics-builder/#moving-a-block).

    When you drop the block on an expanded group \(where the contents of the group are visible\), the new block is added to that group. For more information on groups, see [Working with groups](/streaming-analytics/analytics-builder/#working-with-groups).
3.  Specify all required parameters for the block. See [Editing the parameters of a block](/streaming-analytics/analytics-builder/#editing-the-parameters-of-a-block).

    {{< c8y-admon-info>}}
The block parameter editor is automatically shown when you add a block for which parameters must be specified. It is not shown, however, if the block does not require any parameters \(such as the **OR** block\).
    {{< /c8y-admon-info>}}

#### Editing the parameters of a block {#editing-the-parameters-of-a-block}

Most blocks \(but not all\) have parameters that you must set according to your requirements.

When "Missing" is shown on an input or output block on the canvas, this means that the defined input source or output destination cannot be found in the {{< product-c8y-iot >}} inventory. You should then either go to the {{< product-c8y-iot >}} inventory and make sure that the device is registered or that the group or asset exists, or you should select a different, existing input source or output destination in the block parameter editor \(see below\).

The labels of some blocks on the canvas show the value of the most important parameter. For example, the **Expression** block shows the defined expression, and the **Time Delay** block shows the defined delay in seconds.

The block parameter editor also contains commands for duplicating and removing the currently selected block. See [Duplicating a block](/streaming-analytics/analytics-builder/#duplicating-a-block) and [Removing a block or wire](/streaming-analytics/analytics-builder/#removing-a-block-or-wire) for detailed information.

For the input and output blocks, you can globally replace the input sources and output destinations that are used. See [Replacing sources or destinations](/streaming-analytics/analytics-builder/#replacing-sources-or-destinations) for detailed information.

##### To edit the parameters of a block {#to-edit-the-parameters-of-a-block}

1.  On the canvas of the model editor, click the block that you want to edit using the left mouse button.
    The block parameter editor appears, providing input fields for all parameters that can be specified for that block.
2.  For the input and output blocks, you can select a different input source or output destination from a dialog box.

    The tree in the dialog box reflects the parent/child hierarchy in the {{< product-c8y-iot >}} inventory. For example, the list of devices includes any defined child devices, and the list of device groups includes any defined sub-groups. These are available from expandable/collapsible nodes.
    By default, 10 items are shown within each node, sorted alphabetically. With a large inventory, you will have to click **Load more** to display any items that are not shown initially.

    Using the checkboxes at the top of the dialog, you can filter the entries that are to be shown. By default, all defined devices, device groups, smart groups and assets are displayed in the dialog. If you also want to display any other managed objects in the dialog, select the "Other" checkbox.

    The search box can be used to show any managed objects in the {{< product-c8y-iot >}} inventory which match your search and filter criteria. The search is case-sensitive. The characters that you type in may be contained at any position within the name. The tree is updated with each character that you type. With a large search result, you will have to click **Load more** to display any managed objects that are initially not shown.

    The managed objects that are shown when searching depend on a tenant option. You can restrict the search to show only managed objects of a specific type. For more information, see [Searching for devices, groups and/or assets](/streaming-analytics/analytics-builder/#searching-for-devices-groups-andor-assets).

    Click the button which is shown when you hover over an entry to select the input source or output destination that you want to use.
    The name of that button depends on the entry that is currently selected:

    | Button name | Shown for | Description |
    | ----------- | --------- | ----------- |
    | **Select** | **All Inputs** option for input blocks | Data is received from all input sources. |
    | **Select** | **Trigger Device** option for output blocks | Output is sent to the device which triggered the output. |
    | **Select device** | Devices in input and output blocks | Data is received from the device or output is sent to the device. |
    | **Select group's devices** | Groups in input blocks | Data is received from all devices within the group hierarchy. You cannot directly receive data from a group. |
    | **Select asset** | Assets in input and output blocks | Data is received from the asset itself or output is sent to the asset itself. The devices of the assets are ignored. |
    | **Select asset's devices** | Assets in input blocks | Data is received from all devices within the asset hierarchy. The block does not receive data from the asset itself. |

    {{< c8y-admon-info>}}
For output blocks, you cannot select a group. A button is not provided in this case.
Select the **Trigger Device** option instead to send the output to the device which triggered the output.  
    {{< /c8y-admon-info>}}

    The maximum number of shown input sources and output destinations depends on a tenant option. For more information, see [Configuring the number of shown input sources and output destinations](/streaming-analytics/analytics-builder/#configuring-the-number-of-shown-input-sources-and-output-destinations).

3.  It is possible to use a template parameter instead of specifying a value for a block parameter. This allows different values to be used for this block parameter in different instances of the model \(see [Using the instance editor](/streaming-analytics/analytics-builder/#using-the-instance-editor) for more information\). Create a template parameter of a matching type in the **Template Parameters** dialog box \(see [Managing template parameters](/streaming-analytics/analytics-builder/#managing-template-parameters)\), switch the block parameter to use a template parameter \(see below\) and select the desired template parameter from the drop-down list box. Or create the template parameter directly in the block parameter editor \(see below\).

    The block parameter editor provides the following options in a drop-down list box:
    - <img src="/images/streaming-analytics/analytics-builder/option-defined-parameter.png" alt="Option for specifying a parameter value" style="display:inline-block; margin:0"> When selected, you can specify a value for this parameter using the adjacent control. This value is validated in the block parameter editor.
    - <img src="/images/streaming-analytics/analytics-builder/option-template-parameter.png" alt="Option for selecting a template parameter" style="display:inline-block; margin:0"> When selected, you can select a template parameter from the adjacent drop-down list box. You can only select a template parameter that is of the same type as the block parameter to which you want to assign it; template parameters of unsuitable types are not available for selection. Template parameters are not validated in the block parameter editor.

        If you want to add a new template parameter directly in the block parameter editor, type a name in the text box of the above drop-down list box. As soon as you start typing and if a template parameter with that name does not yet exist, the option **Add template parameter name** is shown below the text box. Click this option to add the new template parameter and thus make it available in the **Template Parameters** dialog box. The new template parameter will have the same type, optional and default values as the block parameter. If a template parameter with the name that you are specifying exists already, but with an incompatible type, the name and type is shown below the text box but cannot be selected.
4.  Some blocks support multi-line input for certain block parameters. For example, the **Send Email** block supports this in the **Text** parameter and the **Alarm Output** block supports this in the **Message** parameter. Your input is automatically wrapped in the text box and you can press Enter to start text on a new line. When you add a new template parameter for such block parameter directly in the block parameter editor \(as described above\), the type of the new template parameter is automatically set to **Multi-line String**.
5.  For some blocks \(such as the **Range Lookup** block\), the block parameter editor shows text boxes for specifying key-value pairs. If you want to specify more key-value pairs, click **Add row**. The key-value pair in the first row is processed first.
You can drag a row to a different position using the move icon <i class="dlt-c8y-icon-sort text-primary icon-20"></i> that is shown next to that row.
You can delete a row that you do not need any more by clicking the delete icon <i class="dlt-c8y-icon-delete icon-20"></i> next to that row.
Empty rows are automatically deleted when you leave the block parameter editor.
6.  Specify all required parameters.
    Detailed reference information for each block is available from the documentation pane. See also [Viewing the documentation for a block](/streaming-analytics/analytics-builder/#viewing-the-documentation-for-a-block).

    Your input is kept in memory when you leave the block parameter editor \(for example, when you click on another block or the canvas\).

    {{< c8y-admon-info>}}
Keep in mind that your changes are only written to the inventory when you save the model. See also [Saving a model](/streaming-analytics/analytics-builder/#saving-a-model).
    {{< /c8y-admon-info>}}

#### Viewing the documentation for a block {#viewing-the-documentation-for-a-block}

The documentation pane allows you to view detailed information for the currently selected block. It shows the so-called *block reference* which provides documentation of a block's parameters, input ports and output ports. You can resize the documentation pane, and you can also toggle its display.

{{< c8y-admon-info>}}
You can also view the block reference directly in this documentation. See [Analytics Builder block reference](/streaming-analytics/block-reference/).
{{< /c8y-admon-info>}}

##### To view the documentation for a block {#to-view-the-documentation-for-a-block}

1.  In the model editor, click the block for which you want to view the documentation. You can do this in the palette or on the canvas.
2.  If the documentation pane is currently not shown, click the area that contains the document icon <i class="c8y-icon c8y-icon-book text-primary icon-20"></i>  \(shown at the right of the canvas\) to display the documentation pane. Clicking that area again hides the documentation pane.
3.  If you want to resize the documentation pane \(for example, to make it larger\), move the mouse pointer over the area that contains the document icon. Click and hold down the mouse button and drag the mouse to the left or right \(to make the documentation pane wider or smaller\).

#### Selecting blocks and wires {#selecting-blocks-and-wires}

If you want to move, duplicate or remove one or more blocks that are currently shown on the canvas of the model editor, you must first select the required blocks.

To select a single block on the canvas, just click the block. With a block, the resulting behavior depends on the mouse button that you use:

-   When you click the block using the left mouse button, the block is selected and the block parameter editor is shown \(see also [Editing the parameters of a block](/streaming-analytics/analytics-builder/#editing-the-parameters-of-a-block)\).
-   When you click the block using the right mouse button, the block is selected only \(the block parameter editor is not shown\). This is helpful if the editor would be in the way, for example, when adding a wire to another block.

To select a single wire, just click the wire \(you can use either mouse button in this case\).

To select several blocks and/or wires at the same time, do one of the following:

-   Press Ctrl and click each block and/or wire that you want to select.
-   Or to select an area containing several blocks and wires, click and hold down the mouse button over an empty space of the canvas and wait until the mouse pointer changes to a cross. Then drag the mouse to select the desired area. Release the mouse button when all required blocks and wires have been selected.
-   Or to select all blocks and wires, press Ctrl+A.

To deselect your selection:

-   Press Ctrl and click the currently selected block or wire.
-   Or to deselect all selections, click an empty space of the canvas.

#### Moving a block {#moving-a-block}

You can move each block that is currently shown on the canvas to different location. When one or more wires are attached to a block that is moved, the wires are also moved.

##### To move a block {#to-move-a-block}

On the canvas of the model editor, click the block that you want to move, hold down the mouse button and drag the block to the new location.

Alternatively, to move several blocks at the same time, select them as described in [Selecting blocks and wires](/streaming-analytics/analytics-builder/#selecting-blocks-and-wires). Then click and hold down the mouse button and immediately drag the blocks to the new location \(do not wait until the mouse pointer changes\).

#### Duplicating a block {#duplicating-a-block}

You can duplicate each block that is currently shown on the canvas. The original block and its duplicate will then both have the same parameters.

When you duplicate a single block, the attached wires are not automatically duplicated. When you duplicate several blocks at the same time, however, the attached wires between the selected blocks are automatically duplicated.

##### To duplicate a block {#to-duplicate-a-block}

- On the canvas of the model editor, click the block that you want to duplicate and then do one of the following:
  - Click the **Duplicate** command which is shown at the bottom of the block parameter editor.
  - Or press Ctrl+C to copy the block, and then press Ctrl+V to paste the block.
  - Or press Ctrl and drag the block to be duplicated to the position at which you want to place the duplicate.
- Or to duplicate several blocks at the same time, select them as described in [Selecting blocks and wires](/streaming-analytics/analytics-builder/#selecting-blocks-and-wires) and then proceed as described above. Exception: the **Duplicate** command is only available when you select a single block.

#### Adding a wire between two blocks {#adding-a-wire-between-two-blocks}

The blocks on the canvas can be wired together to indicate that the output from one block is used as the input for the other block.

The wires are attached to ports, that is, to the circles that are shown to the left and/or right of a block. Each block can have zero, one or more of the following:

-   output ports \(shown at the right side of a block\)
-   input ports \(shown at the left side of a block\)

To see the names of the ports, click the block to select it. Or move the mouse pointer over a port to see the port name in a tooltip \(the name is displayed first, followed by the description of the port\).

See [Wires and blocks](/streaming-analytics/analytics-builder/#wires-and-blocks) for detailed information on the types of values that can be sent between two blocks, the processing order of wires, restrictions, and more.

##### To add a wire between two blocks {#to-add-a-wire-between-two-blocks}

On the canvas of the model editor, click the output port of the block that you want to connect and drag the mouse to the input port of another block.

#### Changing a wire {#changing-a-wire}

You can change the path that a wire takes to the block to which it is currently connected. And you can also rewire a block so that it is connected to a different block or to a different port of the same block.

Wires cannot create cycles. See [Wire restrictions](/streaming-analytics/analytics-builder/#wire-restrictions) for detailed information.

##### To change a wire {#to-change-a-wire}

1. On the canvas of the model editor, click the wire that you want to change.
   The port names of the attached blocks are then shown, and the ports attached to each end of the wire are highlighted.

2. To change the path that a wire takes between two blocks, drag one of the square resize icons (<img src="/images/streaming-analytics/analytics-builder/icon-square-resize.png" alt="Square resize icon" style="display:inline-block; margin:0">) that are now shown on the selected wire to a different position.
   Or to move the wire to a different port, drag the diamond-shaped move icon (<img src="/images/streaming-analytics/analytics-builder/icon-diamond-move.png" alt="Diamond-shaped move icon" style="display:inline-block; margin:0">) that is now shown at the input or output port \(a hand pointer is shown in this case\) to a different port.

#### Removing a block or wire {#removing-a-block-or-wire}

You can remove each block or wire that is currently shown on the canvas. When you remove a block, all wires that are attached to this block are automatically removed.

##### To remove a block or wire {#to-remove-a-block-or-wire}

-   On the canvas of the model editor, click the block or wire that you want to remove and press Del.
    In the case of a block, you can alternatively click the **Remove** command which is shown at the bottom of the block parameter editor.

-   Or to remove several blocks and/or wires at the same time, select them as described in [Selecting blocks and wires](/streaming-analytics/analytics-builder/#selecting-blocks-and-wires) and then press Del.

#### Undoing and redoing an operation {#undoing-and-redoing-an-operation}

You can undo and redo each change that has been applied to the canvas. For example, you can undo the removal of blocks, undo changed parameter values, or undo the rerouting of a wire.

It is not possible to undo/redo the change to a model name or its description.

{{< c8y-admon-info>}}
To use the key combinations mentioned below, the canvas must have the focus. When the documentation pane or the palette currently has the focus, the change on the canvas is not undone/redone.
{{< /c8y-admon-info>}}

##### To undo or redo an operation {#to-undo-or-redo-an-operation}

-   To undo the last operation, click the undo icon <i class="dlt-c8y-icon-undo icon-20"></i> in the toolbar of the model editor or press Ctrl+Z.

-   To redo the last operation, click the redo icon <i class="dlt-c8y-icon-redo icon-20"></i> in the toolbar of the model editor or press Ctrl+Y.

The above icons are only enabled when there is an operation that can be undone or redone.

#### Replacing sources or destinations {#replacing-sources-or-destinations}

You can find the input sources or output destinations that are used in the current model and replace them with other input sources or output destinations that are currently registered in the {{< product-c8y-iot >}} inventory \(visualized in the Device Management application\).

{{< c8y-admon-info>}}
In the rules below, the term device refers to a device or other asset \(but not to a group\).
{{< /c8y-admon-info>}}

The following rules apply:

-   You can replace a device with another device.
-   You can replace a group with another group.
-   You can replace a group or a device with the **All Inputs** option.
-   You can replace the **All Inputs** option with a group or a device.
-   When you replace a device with a group or the **All Inputs** option:
    -   all matching input devices are changed to groups or **All Inputs**, whichever is selected, and
    -   all matching output devices are changed to trigger devices.
-   When you replace a group or the **All Inputs** option with a device:
    -   the group or **All Inputs**, whichever is selected, is changed to a device, and
    -   all matching trigger devices are changed to the specified device.
        {{< c8y-admon-info>}}
If you change more than one group to a device at a time, then only the first specified device will be used to replace all trigger devices.
        {{< /c8y-admon-info>}}
-   The **Trigger Device** option is not available for selection in the dialog.

After you have replaced the devices, you must verify that the measurements that are used by the input and output blocks of the current model still refer to the appropriate measurements. The {{< product-c8y-iot >}} fragment and series are not changed by the replacement, which may or may not apply to the newly defined device.

##### To replace sources or destinations {#to-replace-sources-or-destinations}

1.  In the toolbar of the model editor, click the replace icon <i class="dlt-c8y-icon-replace icon-20"></i>. This icon is only enabled when at least one source or destination has been defined in the current model. Any defined trigger devices are not considered in this case.

2.  In the **Current** drop-down list box of the resulting dialog box, select the source or destination that you want to replace. All input sources and output destinations that are used in the model are available for selection.

3.  Click the **Replace with** box to display a dialog box. The dialog box is the same as when selecting a input source or output destination in the block parameter editor. See [Editing the parameters of a block](/streaming-analytics/analytics-builder/#editing-the-parameters-of-a-block) for more information on this dialog box. Click the button which is shown when you hover over an entry to select the source or destination that you want to use instead.

4.  If you want to replace further sources or destinations, click **Add row**. This is only shown if more than one source or destination has been defined in the current model.

    A new row is shown, containing additional **Current** and **Replace with** drop-down list boxes, and you can now select one more source or destination to be replaced. Any sources or destinations that you have previously selected for replacement are no longer offered for selection in the **Current** drop-down list box.

    Repeat this step until all required sources and destinations have been selected for replacement. You can add as many rows as there are sources or destinations in the current model.

5.  If you want to delete a row \(for example, when you no longer want to replace a selected device\), click the delete icon <i class="dlt-c8y-icon-delete text-danger icon-20"></i> next to that row. This is only available if the dialog box currently shows more than one row.

6.  Click **Replace**.

#### Managing template parameters {#managing-template-parameters}

A model may specify zero or more template parameters, which can be used in place of defined values for block parameters. For example, instead of defining 100 as the threshold value for a **Threshold** block in the block parameter editor, you can assign a template parameter.

If a model has any template parameters, then multiple instances of the model can be created, and different values can be specified for the template parameters. See also [Understanding models](/streaming-analytics/analytics-builder/#understanding-models) which explains the difference between models without template parameters and models with template parameters, and the different roles: model author and instance maintainer.

If you want to use template parameters, you must first define them in the **Template Parameters** dialog box as described below. After you defined a template parameter, you can assign it to specific parameters of the same type in the block parameter editor \(see also [Editing the parameters of a block](/streaming-analytics/analytics-builder/#editing-the-parameters-of-a-block)\).

{{< c8y-admon-info>}}
It is also possible to define template parameters directly in the block parameter editor.
{{< /c8y-admon-info>}}

Models with no template parameters can be directly activated in the model manager, with a single instance of the model running. This is different when you save the model after you have assigned at least one template parameter to one or more block parameters, you can no longer activate the model directly in the model manager. Instead, you must create at least one instance of the model, and you then activate that instance using the instance editor. See [Using the instance editor](/streaming-analytics/analytics-builder/#using-the-instance-editor) for detailed information.

##### To define the template parameters for the instances of the current model {#to-define-the-template-parameters-for-the-instances-of-the-current-model}

1.  In the toolbar of the model editor, click the template parameters icon <i class="c8y-icon c8y-icon-parameters icon-20"></i> to invoke the **Template Parameters** dialog box.
    When at least one template parameter has been defined, a checkmark is shown on the above icon: <i class="c8y-icon c8y-icon-parameters-on c8y-icon-duocolor icon-20"></i>.

    This dialog box is initially empty and you must create the template parameters that you want to use in your model. When template parameters have already been defined, they are all shown in this dialog box.

    If you have a long list of template parameters, you can easily locate the template parameter that you are looking for by entering its name or part of the name in the search box. When search criteria are currently applied, an X is shown in the search box; click this to clear the search and thus to show all available template parameters.

    After a template parameter has been assigned to one or more block parameters, the **Usage Count** column indicates the number of places in which the template parameter is used. For example, when a template parameter is used in two places, this means that it has been assigned to two block parameters. These can be within the same block or in different blocks.

2.  To create a template parameter, click **Create new template parameter**.
    This adds an empty row at the bottom of the dialog box. You can click **Create new template parameter** several times to add several empty rows that you can fill one after the other.

3.  Specify the following information for each template parameter:

    -   **Name**. Type a unique name to identify the template parameter within the current model. This name can later be selected in the block parameter editor.
    -   **Type**. Select the value type of the template parameter from the drop-down list box. The type can be, for example, a string or float, a source or destination, or the parameter of a specific block.

        **Multi-line String** is a special type which is used, for example, with the **Text** parameter of the **Send Email** block. Long input is automatically wrapped in the **Default Value** text box and you can press Enter to start text on a new line.

        An input block specifies a device or a range of devices, while an output block specifies a device, a trigger device or an asset. For template parameters, the same template parameter and thus value can be used for both input and output blocks. If a template parameter is set to refer to a range of devices, then using it in an output block will be treated as the trigger device. Typically, a single template parameter would be used for all input and output blocks, and may be a single device or a range of devices, in which case the block output goes to the device within the range that triggered a model evaluation \(so a model calculating an average of a measurement and outputting to a measurement would generate a new measurement for each device independently\). Even if a different template parameter whose value refers to a different range was used, the model output would only be sent to the device that triggered a model's evaluation.

    -   **Optional**. An optional value can remain blank or can be set later by the instance maintainer. When you select this checkbox, it is not possible to specify a default value.
    -   **Default Value**. You can only specify a default value when the **Optional** checkbox is not selected.

        **Exception**: Boolean types always have a value and cannot be optional. They are “false” by default \(that is, the checkbox for the default value is not selected\).

        If you specify a default value, this default value will be provided in the instance editor when the instance maintainer creates a new instance. The instance maintainer can then either leave this default value unmodified or change it as required for that instance.

        When setting the default value for a source or destination, an additional dialog box appears when you click the **Default Value** field. The dialog box is the same as when selecting a different input source or output destination in the block parameter editor \(see [Editing the parameters of a block](/streaming-analytics/analytics-builder/#editing-the-parameters-of-a-block) for more information on this dialog box\). Click the button which is shown when you hover over an entry to select the source or destination that you want to use.

        You can also define your own selection lists for specific types of template parameters. See [Adding a selection list for a template parameter](/streaming-analytics/analytics-builder/#adding-a-selection-list-for-a-template-parameter) for detailed information.

    {{< c8y-admon-info>}}
If there is a block parameter for which a required value has not been specified, then the instance cannot be activated. Attempting to do so will report an error.
    {{< /c8y-admon-info>}}

4.  You can update a template parameter at any time. This includes the name, whether it is optional or not, and the default value. All blocks in which the updated template parameter is defined are automatically adapted to use the new values. The only exception is the type. You can only change the type if the template parameter is not used in any block of the model.

5.  When the model is inactive, you can reorder the template parameters. This affects the sequence in which they are shown in the instance editor. Drag a row to a different position using the move icon <i class="dlt-c8y-icon-sort text-primary icon-20"></i> which is shown next to the row. See also [Filtering and sorting the instances](/streaming-analytics/analytics-builder/#filtering-and-sorting-the-instances).

6.  You can only delete a template parameter if it is not used in any block of the model. To delete a template parameter, click the delete icon <i class="dlt-c8y-icon-delete text-danger icon-20"></i> which is shown next to the row.

7.  Click **OK** to store the changes in memory and to close the dialog box.

    {{< c8y-admon-info>}}
Keep in mind that your changes are only written to the inventory when you save the model. See also [Saving a model](/streaming-analytics/analytics-builder/#saving-a-model).
    {{< /c8y-admon-info>}}

#### Adding a selection list for a template parameter {#adding-a-selection-list-for-a-template-parameter}

Several types that you can select in the **Template Parameters** dialog box (see [Managing template parameters](/streaming-analytics/analytics-builder/#managing-template-parameters)) allow you to select a predefined value. An example of such a type is the **Direction** parameter of the **Crossing Counter** block which offers predefined values such as **Upwards** and **Downwards** for selection.
In addition to the predefined values, you can also add your own selection lists for types such as string, float, source or destination, or geofence, and you can also select a specific value to be the default value. The values that you define for a selection list are then available for selection when you create instances of the model.

When it is possible to add a selection list, a selection list icon <i class="dlt-c8y-icon-list text-primary icon-20"></i> is shown in the **Template Parameters** dialog box, next to the text box in which you can add a default value.
When a selection list is already available, a drop-down arrow is shown instead of the above icon.

##### To add a selection list for a template parameter {#to-add-a-selection-list-for-a-template-parameter}

1.  In the **Template Parameters** dialog box, click the selection list icon <i class="dlt-c8y-icon-list text-primary icon-20"></i> in the **Default Value** column for a defined template parameter.

2.  In the resulting **Selection List** dialog box, click **Add selection**.

3.  Specify a unique name and a value for the new selection.
    The value that you can specify depends on the type of the currently selected template parameter. For example, if **float** is selected as the type, you can only specify a float value. Or if **Source or Destination** is selected as the type, you can select an input source or output destination from a dialog box.

4.  Add at least one more selection, that is, click **Add selection** once more and specify a unique name and a value for the new selection.

5.  Repeat the above step until all required selections have been added.

6.  To reorder the selection list, drag a row to a different position using the move icon <i class="dlt-c8y-icon-sort text-primary icon-20"></i> which is shown next to the row.

7.  To delete a selection, click the delete icon <i class="dlt-c8y-icon-delete text-danger icon-20"></i> which is shown next to the row.

8.  Click **OK** to save the selection list and to close the **Selection List** dialog box.
    In the **Template Parameters** dialog box, you can now select one of your selections as the default value from a drop-down list box.

9.  To clear the selected default value in the **Template Parameters** dialog box, click the clear icon <i class="dlt-c8y-icon-clear text-primary icon-20"></i> that is shown next to the selection.

10.  To edit your selection list, click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> in the **Default Value** column of the **Template Parameters** dialog box and then click **Edit**. The **Selection List** dialog box is then shown.

11.  To permanently delete your selection list, click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> in the **Default Value** column of the **Template Parameters** dialog box and then click **Delete**. In the resulting dialog box, click **OK**.

#### Copying items to a different model {#copying-items-to-a-different-model}

You can copy any items on the canvas \(blocks, groups, and attached wires\) and paste them in a different model. The prerequisite for this is that all is done in the same session. It will not work if you try to paste the items in a different tab or in a different browser.

{{< c8y-admon-caution>}}
There may be performance issues if you copy many input blocks and output blocks. This is because this operation requires access to the inventory service of {{< product-c8y-iot >}} to get the information about the devices that are represented by these blocks.
{{< /c8y-admon-caution>}}

##### To copy items to a different model {#to-copy-items-to-a-different-model}

1.  On the canvas of the model editor, select all items that you want to copy and press Ctrl+C.
    This also works if the model is currently in read-only mode.

2.  Leave the model editor. See also [Leaving the model editor](/streaming-analytics/analytics-builder/#leaving-the-model-editor).

3.  In the model manager, switch to the model into which you want to paste the copied items. This can be an existing model \(see also [Editing an existing model](/streaming-analytics/analytics-builder/#editing-an-existing-model)\) or a new model that you must first create \(see also [Adding a new model](/streaming-analytics/analytics-builder/#adding-a-new-model)\).

4.  When the model editor is shown, press Ctrl+V to paste the copied items into the model.

### Working with groups {#working-with-groups}

#### What is a group {#what-is-a-group}

You can arrange blocks and their attached wires in a group. A group is a special type of block which can be collapsed and expanded. When a group is expanded, you can change its contents in the same way as you would on the canvas, for example, you can add wires or edit the block parameters. You can also add more blocks to the group or remove blocks from the group. When a group is collapsed, it occupies less space on the canvas, however, the blocks and wiring within the group are not visible in this case.

Groups are helpful if commonly required functionality needs to be made available in multiple places. You can give each group a name by which it can be identified. You can copy a group and paste it in either the same model or in a different model.

{{< c8y-admon-info>}}
Do not confuse this type of group with a group (or range) of devices. Input sources may sometimes be a group of devices, which is different. See also [Editing the parameters of a block](/streaming-analytics/analytics-builder/#editing-the-parameters-of-a-block).
{{< /c8y-admon-info>}}

![Example of a group containing several blocks](/images/streaming-analytics/analytics-builder/group-example.png)

The size of the box that is shown for a group is determined by its contents. If you move a block within the group to a different position, the box size is automatically adapted \(that is, the box is made larger or smaller\). The same applies if you change the path that a wire takes to another block within the same group.

You move a group on the canvas in the same way as you move a block \(see also [Moving a block](/streaming-analytics/analytics-builder/#moving-a-block)\). When you move a group, the group is always shown on top of all other items on the canvas. As the group box is transparent, you can easily see which blocks belong to the group and which are just overlayed by the box.

It is not possible to nest groups.

{{< c8y-admon-info>}}
There is one exception when managing the contents of a group: When you duplicate one or more blocks that are contained in a group using Ctrl+C and Ctrl+V or if you use the **Duplicate** command in the block parameter editor, the duplicate is not added to the group. It is added to the canvas instead. However, when you press Ctrl and then drag the blocks to be duplicated, you can place the duplicate either within the group \(this can be the same or a different group\) or on the canvas. See also [Duplicating a block](/streaming-analytics/analytics-builder/#duplicating-a-block).
{{< /c8y-admon-info>}}

#### Adding a group {#adding-a-group}

You can add any blocks that are currently shown on the canvas \(including the wires between the blocks\) to a group.

It is not possible to create an empty group. You must first add a group as described below. Once the group exists, you can add more blocks to the group, either from the palette or from the canvas, as described in [Adding a block](/streaming-analytics/analytics-builder/#adding-a-block) and [Moving blocks into a group](/streaming-analytics/analytics-builder/#moving-blocks-into-a-group).

##### To add a group {#to-add-a-group}

1.  On the canvas of the model editor, select one or more blocks that you want to add to a group. You need not select wires; all existing wires are retained. See also [Selecting blocks and wires](/streaming-analytics/analytics-builder/#selecting-blocks-and-wires).

2.  In the toolbar of the model editor, click the group icon <i class="dlt-c8y-icon-group icon-20"></i>.
    Or press Ctrl+G.

#### Collapsing and expanding a group {#collapsing-and-expanding-a-group}

If you need more space on the canvas and do not need the group contents to be visible, you can collapse the group.

When a group is collapsed, a number is shown on the collapsed group indicating the number of blocks in that group. For example:

![Example of a collapsed group](/images/streaming-analytics/analytics-builder/collapsed-group-example.png)

If you want to make the group contents visible again \(for example, to edit block parameters or to add wires\), you must expand the group.

When you save the model, the state of each group \(that is, whether it is currently collapsed or expanded\) is stored. The next time you edit the model, its contents will be shown as after the last save.

##### To collapse or expand a group {#to-collapse-or-expand-a-group}

-   To collapse a group, click the collapse icon <i class="dlt-c8y-icon-fullscreen-exit text-primary-light icon-20"></i>  which is shown next to the group name.

-   To expand a group, click the expand icon <i class="dlt-c8y-icon-fullscreen text-primary-light icon-20"></i> which is shown above the top right of the collapsed group.

#### Renaming a group {#renaming-a-group}

When you add a group, its default name is "Group". You can rename each group and give it a unique name.

If a group name is longer than can be shown in the group label, move the mouse pointer over the group name to view the entire name in a tooltip.

It is not possible to have groups without names. If you delete a group name, the previous name is automatically used again.

##### To rename a group {#to-rename-a-group}

1.  In the model editor, select the group and then click on the group name. You can either do this when the group is collapsed or expanded \(see also [Collapsing and expanding a group](/streaming-analytics/analytics-builder/#collapsing-and-expanding-a-group)\). This selects the entire name for editing.

2.  Specify a new group name and press Enter.

#### Moving blocks into a group {#moving-blocks-into-a-group}

You can move one or more blocks from the canvas into an existing group. All existing wires are retained.

You can also drag a block from the palette into an existing group. See [Adding a block](/streaming-analytics/analytics-builder/#adding-a-block).

You can only move/drag blocks into a group when its contents are visible, that is, when the group is currently expanded. See also [Collapsing and expanding a group](/streaming-analytics/analytics-builder/#collapsing-and-expanding-a-group).

##### To move blocks into a group {#to-move-blocks-into-a-group}

1. Make sure that the group into which you want to move the blocks is not collapsed.
2. On the canvas of the model editor, select the blocks that you want to move into the group \(see also [Selecting blocks and wires](/streaming-analytics/analytics-builder/#selecting-blocks-and-wires)\). You need not select the wires between the blocks; they are automatically moved together with the blocks.
3. Do one of the following:
   - Drag the selection into the group and drop it there.
   - Or select the group into which you want to move the blocks. Then click the group icon <i class="dlt-c8y-icon-group icon-20"></i> in the toolbar of the model editor, or press Ctrl+G.

#### Moving blocks from a group to the canvas {#moving-blocks-from-a-group-to-the-canvas}

You can move a block from a group to the canvas. All existing wires are retained.

When the last item of a group has been moved to the canvas, the group is automatically removed. If you want to move all items to the canvas at the same time, you can simply ungroup the entire group. See [Ungrouping a group](/streaming-analytics/analytics-builder/#ungrouping-a-group).

##### To move blocks from a group to the canvas {#to-move-blocks-from-a-group-to-the-canvas}

- To move one or more blocks at the same time:
    1.  In the expanded group, select the blocks that you want to move.
    2.  In the toolbar of the model editor, click the ungroup icon <i class="dlt-c8y-icon-ungroup icon-20"></i>.
    Or press Ctrl+Shift+G.
- Or to move a single block:
    1.  In the expanded group, select the block that you want to move.
    2.  Click the **Ungroup** command which is then shown at the bottom of the block parameter editor.

#### Removing blocks and wires from a group {#removing-blocks-and-wires-from-a-group}

You remove blocks wires from a group in the same way as removing them directly on the canvas. The only prerequisite is that the group is currently expanded. See [Removing a block or wire](/streaming-analytics/analytics-builder/#removing-a-block-or-wire).

If the last item in a group is removed, the group is automatically removed.

#### Duplicating a group {#duplicating-a-group}

You can duplicate each group that is currently shown on the canvas. The original group and its duplicate will then both have the same contents.

Wires coming in from blocks outside of the group or going from the group to blocks outside of the group are not duplicated.

You can also copy a group into a different model, see [Copying items to a different model](/streaming-analytics/analytics-builder/#copying-items-to-a-different-model).

##### To duplicate a group {#to-duplicate-a-group}

On the canvas of the model editor, click the group that you want to duplicate \(it does not matter whether the group is currently collapsed or expanded\) and then do one of the following:

-   Press Ctrl+C to copy the group, and then press Ctrl+V to paste the group.
-   Or press Ctrl and drag the group to be duplicated to the position at which you want to place the duplicate.

#### Ungrouping a group {#ungrouping-a-group}

When you ungroup a group, the group is removed and all the blocks from that group are shown directly on the canvas. All attached wires are retained.

You can ungroup several groups at the same time. In this case, it is important that no block or wire is selected either within or without the selected groups, otherwise ungrouping is not possible.

##### To ungroup a group {#to-ungroup-a-group}

1.  On the canvas of the model editor, select one or more groups that you want to ungroup. It does not matter whether a group is currently collapsed or expanded.

2.  In the toolbar of the model editor, click the ungroup icon <i class="dlt-c8y-icon-ungroup icon-20"></i>.
    Or press Ctrl+Shift+G.

#### Removing a group {#removing-a-group}

You can remove each group that is currently shown on the canvas. Wires to blocks outside of the group are removed.

{{< c8y-admon-caution>}}
When you remove a group, all blocks and wires within this group are removed from the model.
{{< /c8y-admon-caution>}}

##### To remove a group {#to-remove-a-group}

On the canvas of the model editor, click the group that you want to remove \(it does not matter whether it is currently collapsed or expanded\) and press Del.

### Managing the canvas {#managing-the-canvas}

#### Navigating large models {#navigating-large-models}

If your model is too large to fit onto the visible part of the canvas, you can use the mouse to drag the parts of the model into view that are currently outside of the window. You can do this either directly on the canvas or in the overview area. The overview area always shows the entire model. If the overview area is currently not shown, see [Showing and hiding the overview](/streaming-analytics/analytics-builder/#showing-and-hiding-the-overview).

##### To navigate in a large model {#to-navigate-in-a-large-model}

1.  In the model editor, position the mouse over a free spot of the canvas \(which does not contain a block or wire\) or anywhere over the overview area.

2.  Click and hold down the mouse button, and immediately drag the mouse into the desired direction. Release the mouse button when the required area is visible on the canvas.

    {{< c8y-admon-info>}}
When you hold down the mouse button for a longer time over a free spot of the canvas, the mouse pointer changes and you can select an area instead \(for example, several blocks and attached wires\). See also [Selecting blocks and wires](/streaming-analytics/analytics-builder/#selecting-blocks-and-wires).
    {{< /c8y-admon-info>}}

#### Showing and hiding the overview {#showing-and-hiding-the-overview}

The overview area, which shows the entire model, is shown at bottom right of the canvas. If you do not need the overview, you can hide it.

##### To show or hide the overview {#to-show-or-hide-the-overview}

To hide the overview, click the hide icon <i class="dlt-c8y-icon-compass text-muted icon-20"></i> which is shown directly above the overview area.

To show the overview, click the show icon <i class="dlt-c8y-icon-compass text-primary icon-20"></i> at the bottom right of the canvas.

#### Zooming the canvas {#zooming-the-canvas}

The toolbar of the model editor indicates the current zoom percentage for the canvas. The zoom icons in the toolbar allow you to

-   zoom out, which makes everything on the canvas smaller so that more items can be shown, and to
-   zoom in, which makes everything on the canvas larger, but less items can then be shown.

{{< c8y-admon-info>}}
When you use the key combinations mentioned below, the currently selected area defines what is to be zoomed. When the canvas has the focus (for example, when you have just selected a block or wire), only the content of the canvas is zoomed. When the documentation pane or the palette currently has the focus, the browser's zoom functionality is used and all of the browser content is zoomed (and the zoom percentage in the toolbar remains unchanged).
{{< /c8y-admon-info>}}

##### To zoom the canvas {#to-zoom-the-canvas}

To zoom out, click the zoom out icon <i class="dlt-c8y-icon-minus-circle text-muted icon-20"></i> in the toolbar of the model editor.
Alternatively, press Ctrl and the minus key.

To zoom in, click the zoom in icon <i class="dlt-c8y-icon-plus-circle text-muted icon-20"></i> in the toolbar of the model editor.
Alternatively, press Ctrl and the plus key.

#### Showing and hiding the grid {#showing-and-hiding-the-grid}

The blocks, wires and groups on the canvas always snap to a grid. You can decide whether the grid is to be shown or not. The grid is not shown by default. When you zoom the canvas, the grid is zoomed accordingly.

##### To show or hide the grid {#to-show-or-hide-the-grid}

In the model editor, click the toolbar icon for toggling the display of the grid.

When the grid is hidden, the icon looks as follows: <i class="dlt-c8y-icon-grid-on icon-20"></i>.

When the grid is shown, the icon looks as follows: <i class="dlt-c8y-icon-grid-off icon-20"></i>.

When the model is active \(read-only mode\), it is not possible to toggle the display of the grid and this icon is therefore not shown.
