---
weight: 10
title: Getting started with Analytics Rules Plugin
layout: redirect
---

### What is Analytics Rules Plugin {#what-is-analytics-rules-plugin}
The Analytics Rules plugin extends Analytics Builder's capabilities by enabling users to create and manage analytics rules directly from device and group contexts within applications like Device Management and Cockpit. Instead of switching between applications, users can create analytics rules from the context they are already working in, making the process more intuitive and efficient.

For more details about Analytics Builder, please refer to [Analytics Builder](/streaming-analytics/analytics-builder/#getting-started).

### Prerequisites

Before using the Analytics Rules plugin, ensure that the following requirements are met:
- Tenant has subscribed to Streaming Analytics application and has access to Analytics Builder application.
- User privileges to access Analytics Builder models and create new instances of Analytics builder templated models. Please refer to the [Permissions](/streaming-analytics/introduction-analytics/#permissions).

### Creating your first analytics rule

This topic provides the basic workflow for creating your first analytics rule using the plugin from host applications like Device Management. You will create a simple analytics model that creates an alarm when temperature breaches a given threshold value. The steps below require that at least one device is already registered in {{< product-c8y-iot >}}. Preferably, this device is already sending measurement values to {{< product-c8y-iot >}}.

The model that you add will contain three blocks:
- An input block which receives measurements from devices, groups, or assets.
- A threshold block which verifies the measurement has breached the threshold value.
- An alarm output block which creates an alarm object for specified devices, groups, or assets.

#### Step 1: Create an Analytics model

This section walks you through creating a simple temperature monitoring model. For more detailed Analytics Builder information, refer to the [Understanding models](/streaming-analytics/analytics-builder/#understanding-models).

1. Open Streaming Analytics application and navigate to **Analytics Builder** > **Models** page.
2. On the toolbar, click **New Model**, enter a model name (e.g., "Create alarm on threshold breach") and click **OK**.
3. From the palette on the left, expand **Input** and drag the **Measurement Input** block onto the canvas. In the block parameter editor, enter the Fragment and Series as **T=>C** (this refers to temperature measurements in Celsius from your device).
4. Expand **Calculation** and drag the **Threshold** block onto the canvas. Enter a threshold value (e.g., 90) - this is the temperature limit that will trigger an alarm.
5. Expand **Output** and drag the **Alarm Output** block onto the canvas. In the block parameter editor, specify the Alarm Type as **c8y_Temperature**. Select the **severity** block parameter as **Major** from the dropdown list.
6. Connect the blocks by clicking and dragging between their ports (small circles on the sides of blocks):
   - Connect **Value** output of **Measurement Input** to **Value** input of **Threshold**
   - Connect **Breached** output of **Threshold** to **Create Alarm** input of **Alarm Output**
7. In the toolbar of the model editor, click the save icon <i class="dlt-c8y-icon-save icon-20"></i> to save the newly created model.

When completed, your model will look similar to this:

![Create model for alarms](/images/streaming-analytics/analytics-rules-plugin/create-alarm-model.png)

#### Step 2: Template parameter setup

1. To create rules for a model using the Analytics Rules plugin, proper template parameter configuration of the model is essential. In the toolbar of the model editor, click the icon <i class="c8y-icon c8y-icon-parameters-on c8y-icon-duocolor icon-20"></i> to open the template parameter dialog.

2. Click **New template parameter** to add a template parameter and fill in the details:
   - Enter **Name** (e.g., "Device context").
   - Select **Type** as "Source or Destination" from the dropdown list.
   - Select **Restrict to** "Device".
   - Set **Value Selection** to "From Context".

![Template parameter with From Context](/images/streaming-analytics/analytics-rules-plugin/template-parameter.png)

3. Click **OK** to save and close the template parameter changes.

For a model to be available for rule creation in the plugin, it must have exactly one template parameter configured as follows:

| Property | Value |
|----------|-------|
| Type | Source or Destination |
| Value Selection | From Context |

- The template parameter **Type** must specifically be "Source or Destination".
- When you select "Source or Destination" type, specify the context restrictions: Device, Groups, or both (multi-selectable). In our example, we selected only Device.

For detailed information about creating and managing template parameters in Analytics Builder, refer to the [Managing Template Parameters documentation](/streaming-analytics/analytics-builder/#managing-template-parameters).

{{< c8y-admon-info>}}
Only one template parameter per model can have "From Context" value selection.
{{< /c8y-admon-info>}}

#### Step 3: Update block parameters to use template parameter

1. In the canvas, select the **Measurement Input** block and update the first block parameter **Input Source** from type **Value** to **Template parameter**
   ![Select template parameter type](/images/streaming-analytics/analytics-rules-plugin/select-tp-type.png)
   and then click on the input field to select **Device context** from the dropdown.

2. Select the **Alarm Output** block and similarly update the first block parameter **Output Destination** from type **Value** to **Template parameter** and then click on the input field to select **Device context** from the dropdown.

3. In the toolbar of the model editor, click the save icon <i class="dlt-c8y-icon-save icon-20"></i> to save the model.

#### Step 4: Create Analytics Rule from Device Management application

1. Navigate to **Device Management** application.
2. Go to **Devices** > **All devices** and select a device.
3. Click the **Analytics rules** tab (embedded as one of the device details tabs). You will see the empty analytics rules page.
   ![Analytics rule tab](/images/streaming-analytics/analytics-rules-plugin/empty-analytics-rule.png)
4. Click **Add rule** to open the Add analytics rule dialog box. Only models that have been configured with **From Context** template parameters restricted to **Device** will be listed. Select your configured model and click **OK**.
   ![Add rule for the selected model](/images/streaming-analytics/analytics-rules-plugin/add-rule-for-selected-model.png)
5. Configure the rule parameters:
   - Update the rule name if needed.
   - Click **Save** to save the rule, or toggle to **Active** to save and deploy immediately.
6. Your rule now appears in the Analytics rules list, showing its status (Active/Inactive).
   ![Analytics rules list](/images/streaming-analytics/analytics-rules-plugin/analytics-rules-list.png)

**Congratulations!** You have successfully created and deployed your first analytics rule using the Analytics Rules plugin.

### Creating Analytics rule for existing samples

You can also create analytics rules using pre-built sample models from Analytics Builder. The process is similar to creating from scratch but faster since the model logic is already defined.

#### Step 1: Create model from sample
1. Navigate to **Analytics Builder** > **Samples** page.
2. Click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> of your desired sample (e.g., "On alarm execute operation") and select **Create model from sample**.
   ![Create model from sample](/images/streaming-analytics/analytics-rules-plugin/create-model-from-sample.png)
3. The model editor opens with the sample model ready for use.

#### Step 2: Configure template parameters
1. Click the template parameter icon <i class="c8y-icon c8y-icon-parameters-on c8y-icon-duocolor icon-20"></i> in the toolbar.
2. Ensure one template parameter is configured with:
   - **Type**: Source or Destination
   - **Value Selection**: From Context
   - **Restrict to**: Device, Groups, or both as needed
3. In the toolbar of the model editor, click the save icon <i class="dlt-c8y-icon-save icon-20"></i> to save the model.

#### Step 3: Create rule from Device Management application
Follow the same steps as described in [Step 4: Create Analytics Rule from Device Management application](#step-4-create-analytics-rule-from-device-management-application) above.