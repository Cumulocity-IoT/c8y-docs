---
weight: 10
title: Getting started with the Analytics rules plugin
layout: redirect
outputs:
  - html
  - json
helpcontent:
- label: analytics-rules-plugin
  title: Analytics rules plugin
  content: "The Analytics rules plugin extends the capabilities of Analytics Builder within Streaming Analytics. It allows users to create, deploy, and manage Analytics Builder models directly from device and group contexts in applications like Device Management and Cockpit."
---

### What is the Analytics rules plugin {#what-is-the-analytics-rules-plugin}
The Analytics rules plugin extends the Analytics Builder capabilities within Streaming Analytics by enabling users to create and manage Analytics Builder model instances directly from device and group contexts within applications such as Device Management and Cockpit.

For more details about Analytics Builder, refer to [Analytics Builder](/streaming-analytics/analytics-builder/#getting-started).

### Prerequisites {#prerequisites}

Before using the Analytics rules plugin, ensure that the following requirements are met:
- The tenant is subscribed to the Streaming Analytics microservice that supports the Analytics Builder capability.
- The Analytics rules plugin is installed in the desired application, and the feature flag `streaming-analytics.analytics-rules-plugin` is enabled.
- The user has the required privileges to access Analytics Builder models and create new instances of Analytics builder templated models. Refer to the [Permissions](/streaming-analytics/introduction-analytics/#permissions).

### Creating your first analytics rule {#creating-your-first-analytics-rule}

This topic provides the basic workflow for creating your first analytics rule using the plugin from applications like Device Management. You will create a simple templated analytics model that creates an alarm when the temperature breaches a given threshold value. The steps below require that at least one device is already registered in {{< product-c8y-iot >}}. Preferably, this device is already sending measurement values to {{< product-c8y-iot >}}.

The model that you add will contain three blocks:
- An input block which receives measurements from devices, groups, or assets.
- A threshold block which verifies the measurement has breached the threshold value.
- An alarm output block which creates an alarm object for specified devices, groups, or assets.

#### Step 1: Create an Analytics model {#create-an-analytics-model}

This section walks you through creating a simple temperature monitoring model. For more detailed Analytics Builder information, refer to the [Understanding models](/streaming-analytics/analytics-builder/#understanding-models).

1. Open the Streaming Analytics application and navigate to **Analytics Builder** > **Models**.
2. On the top bar, click **New Model**, enter a model name (for example, "Create alarm on threshold") and click **OK**.
3. From the palette on the left, expand **Input** and drag the **Measurement Input** block onto the canvas. In the block parameter editor:
   - For **Input Source**, select "Template parameter" from the dropdown <img src="/images/streaming-analytics/analytics-builder/option-template-parameter.png" alt="Option for selecting a template parameter" style="display:inline-block; margin:0">, then give a name to the template parameter. Example "Measurement Source".
   ![Template parameter with From Context](/images/streaming-analytics/analytics-rules-plugin/select-tp-type.png)

   - For **Fragment and Series**, select "Template parameter" from the dropdown, then provide a suitable name, example: Input Fragment and Series.
4. Expand **Calculation** and drag the **Threshold** block onto the canvas. In the block parameter editor:
   - For **Threshold Value**, select "Template parameter" from the dropdown, then provide a name, example: "Threshold Value".
5. Expand **Output** and drag the **Alarm Output** block onto the canvas. In the block parameter editor:
   - For **Output Destination**, select "Template parameter" from the dropdown, then use the same template parameter given for **Input Source** of the "Measurement Input" block, example: "Measurement Source".
   - For **Alarm Type**, select "Template parameter" from the dropdown, then provide a name, example:  "Alarm Type".
   - For **Message**, select "Template parameter" from the dropdown, then provide a name, example: "Alarm Text".
   - For **Severity**, select "Template parameter" from the dropdown, then provide a name, example: "Alarm Severity".
6. Connect the blocks by clicking and dragging between their ports (small circles on the sides of blocks):
   - Connect **Value** output of **Measurement Input** to **Value** input of **Threshold**
   - Connect **Breached** output of **Threshold** to **Create Alarm** input of **Alarm Output**
7. In the toolbar of the model editor, click the template parameter icon <i class="c8y-icon c8y-icon-parameters-on c8y-icon-duocolor icon-20"></i> to open the template parameter dialog. Ensure the template parameter entry provided for **Input Source** of the **Measurement Input** block (example : "Measurement Source") has "Source or Destination" updated to include one or more values from the **Restrict to** dropdown (for example, Device) and set **Value Selection** to "From Context". Click **OK** to save the changes.

For more details about "From Context" and **Restrict to**, refer to [Define template parameters](/streaming-analytics/analytics-builder/#to-define-the-template-parameters-for-the-instances-of-the-current-model)

![Template parameter with From Context](/images/streaming-analytics/analytics-rules-plugin/template-parameter.png)

For detailed information about creating and managing template parameters in Analytics Builder, refer to [Managing template parameters](/streaming-analytics/analytics-builder/#managing-template-parameters).

8. In the toolbar of the model editor, click the save icon <i class="dlt-c8y-icon-save icon-20"></i> to save the model.

When completed, your model will look similar to this:

![Create model for alarms](/images/streaming-analytics/analytics-rules-plugin/create-alarm-model.png)

#### Step 2: Create an instance of model using Analytics rules plugin {#create-an-instance-of-model-using-analytics-rules-plugin}

1. Navigate to Device Management application.
2. Go to **Devices** > **All devices** and select a device.
3. Click the **Analytics rules** tab (embedded as one of the device details tabs).
Refer to the [Prerequisites](#prerequisites) section to ensure all requirements are met.
   ![Analytics rule tab](/images/streaming-analytics/analytics-rules-plugin/empty-analytics-rule.png)
4. Click **Add rule** to open the **Add analytics rule** dialog. Since we are currently in the **Device** context, only models that have been configured with **From Context** template parameters restricted to **Device** will be visible here. Select your configured model and click **OK**.
   ![Add rule for the selected model](/images/streaming-analytics/analytics-rules-plugin/add-rule-for-selected-model.png)
5. Configure the rule parameters:
   - Optionally update the name or add a note if desired.
   - Populate the template parameter values. The value of the template parameter (for example, "Measurement Source") configured with **From Context** is derived automatically from the current device or group context.
   - Click **Save** to save the rule, or toggle to **Active** to save and deploy immediately.
6. Your rule now appears in the Analytics rules list, showing its status (Active/Inactive).
   ![Analytics rules list](/images/streaming-analytics/analytics-rules-plugin/analytics-rules-list.png)

**Congratulations!** You have successfully created and deployed your first analytics rule using the Analytics Rules plugin.

### Creating Analytics rule for existing samples {#create-analytics-rule-for-existing-samples}

You can also create analytics rules using pre-built sample models from Analytics Builder. The process is similar to creating from scratch but faster since the model logic is already defined.

#### Step 1: Create model from sample {#create-model-from-sample}
1. Navigate to **Analytics Builder** > **Samples** page.
2. Click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> of your desired sample (for example, "On alarm execute operation") and select **Create model from sample**.
   ![Create model from sample](/images/streaming-analytics/analytics-rules-plugin/create-model-from-sample.png)
3. The model editor opens with the sample model ready for use.

#### Step 2: Configure template parameters {#configure-template-parameters}
1. Click the template parameter icon <i class="c8y-icon c8y-icon-parameters-on c8y-icon-duocolor icon-20"></i> in the toolbar.
2. Ensure the template parameter entry provided for **Input Source** of the **Alarm Input** block (for example, "Device or group of devices") has "Source or Destination" updated to include one or more values from the **Restrict to** dropdown (for example, Device) and set **Value Selection** to "From Context". Click **OK** to save the changes.
3. In the toolbar of the model editor, click the save icon <i class="dlt-c8y-icon-save icon-20"></i> to save the model.

#### Step 3: Create rule from Device Management application {#create-rule-from-device-management-application}
Follow the same steps as described in [Step 2: Create an instance of model using Analytics rules plugin](#step-2-create-an-instance-of-model-using-analytics-rules-plugin) above.


### Troubleshooting {#troubleshooting}

1. **No models available in Add rule dialog**
   - Ensure that the Analytics Builder models have template parameters configured with the "From Context" value.
   - Verify your current context matches the model's "Source or Destination" type restrictions. For example, when in a device context where the model's **Restrict to** dropdown is configured with "Groups" only, that model will not be available. To appear in device contexts, "Device" must be selected in the **Restrict to** dropdown.
2. **Previously created rules don't appear in the Analytics rules list**
   - Verify that the Analytics instances are set to **Production mode** in the Analytics Builder instance editor.
   - Check if Analytics instance names are set in the Analytics Builder instance editor.
   - Confirm you're viewing the correct device or group context.
3. **Error in Analytics rule deployment**
   - Click the runtime error icon <img src="/images/streaming-analytics/analytics-builder/runtime_error.png" alt="Error icon" style="display:inline-block; margin:0"> to view information about the error.