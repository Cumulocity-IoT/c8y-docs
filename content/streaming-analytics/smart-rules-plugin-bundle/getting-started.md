---
weight: 10
title: Getting started with the smart rules (NEW) plugin
layout: redirect
---

### What is the smart rules (NEW) plugin {#what-is-the-smart-rules-plugin}
The smart rules plugin extends the Analytics Builder capabilities within Streaming Analytics by enabling users to create and manage Analytics Builder model instances directly from device and group contexts within applications such as Device Management, Cockpit, and Digital Twin Manager.

For more details about Analytics Builder, refer to [Analytics Builder](/streaming-analytics/analytics-builder/#getting-started).

### Prerequisites {#prerequisites}

Before using the smart rules (NEW) plugin, ensure that the following requirements are met:
- The tenant is subscribed to the Streaming Analytics microservice that supports the Analytics Builder capability.
- The smart rules plugin is installed in the desired application, and the **Smart rules (NEW) plugin** is enabled in **Preview feature**.
- The user has the required privileges to access Analytics Builder models and create new instances of Analytics builder templated models. Refer to [Permissions](/streaming-analytics/introduction-analytics/#permissions).

#### Managing permissions to smart rules (NEW) instances {#managing-permissions-to-smart-rules-instances}

The **Smart rule instances** permission under [global roles](/standard-tenant/managing-permissions/#to-add-a-global-role) allows you to manage permissions required to access smart rules (NEW) instances. 

|Permission|Description|
|---------|-----------|
|**READ**|Grants read-only access to smart rule instances. Users with this permission can view existing instances but cannot create, update, or delete them.|
|**ADMIN**|Grants permission to create, read, update, and delete (CRUD) smart rule instances.|

These permissions ensure fine-grained access control, allowing administrators to manage user privileges based on operational requirements.

The permissions described above grant read-only access to the underlying Analytics Builder model. Administrative actions on the Analytics Builder models (like create, edit, or delete) require the *CEP management* permissions, see [permissions](/streaming-analytics/introduction-analytics/#permissions).

### Creating your first smart rule {#creating-your-first-smart-rule}

This topic provides the basic workflow for creating your first smart rules using the plugin from applications like Device Management. You will create a simple templated analytics model that creates an alarm when the temperature breaches a given threshold value. The steps below require that at least one device is already registered in {{< product-c8y-iot >}}. Preferably, this device already sends measurement values to {{< product-c8y-iot >}}.

The model that you add will contain three blocks:
- An input block which receives measurements from devices, groups, or assets.
- A threshold block which verifies the measurement has breached the threshold value.
- An alarm output block which creates an alarm object for specified devices, groups, or assets.

#### Step 1: Create an Analytics model {#create-an-analytics-model}

This section walks you through creating a simple temperature monitoring model. For more detailed Analytics Builder information, refer to [Understanding models](/streaming-analytics/analytics-builder/#understanding-models).

1. Open the Streaming Analytics application and navigate to **Analytics Builder** > **Models**.
2. On the top bar, click **New Model**, enter a model name (for example, "Create alarm on threshold") and click **OK**.
3. From the palette on the left, expand **Input** and drag the **Measurement Input** block onto the canvas. In the block parameter editor:
   - For **Input Source**, select "Template parameter" from the dropdown <img src="/images/streaming-analytics/analytics-builder/option-template-parameter.png" alt="Option for selecting a template parameter" style="display:inline-block; margin:0">, then provide a name. For example, "Measurement Source".
   ![Template parameter with From Context](/images/streaming-analytics/smart-rules-plugin/select-tp-type.png)

   - For **Fragment and Series**, select "Template parameter" from the dropdown, then provide a name. For example: "Input Fragment and Series".
4. Expand **Calculation** and drag the **Threshold** block onto the canvas. In the block parameter editor:
   - For **Threshold Value**, select "Template parameter" from the dropdown, then provide a name. For example: "Threshold Value".
5. Expand **Output** and drag the **Alarm Output** block onto the canvas. In the block parameter editor:
   - For **Output Destination**, select "Template parameter" from the dropdown, then use the same template parameter given for **Input Source** of the **Measurement Input** block. For example: "Measurement Source".
   - For **Alarm Type**, select "Template parameter" from the dropdown, then provide a name. For example:  "Alarm Type".
   - For **Message**, select "Template parameter" from the dropdown, then provide a name. For example:  "Alarm Text".
   - For **Severity**, select "Template parameter" from the dropdown, then provide a name. For example: "Alarm Severity".
6. Connect the blocks by clicking and dragging between their ports (small circles on the sides of blocks):
   - Connect the **Value** output of the **Measurement Input** to the **Value** input of the **Threshold**.
   - Connect the **Breached** output of the **Threshold** to the **Create Alarm** input of the **Alarm Output**.
7. In the toolbar of the model editor, click the template parameter icon <i class="c8y-icon c8y-icon-parameters-on c8y-icon-duocolor icon-20"></i> to open the template parameter dialog. Ensure the template parameter entry provided for **Input Source** of the **Measurement Input** block (example : "Measurement Source") has "Source or Destination" updated to include one or more values from the **Restrict to** dropdown (for example, "Device") and set **Value Selection** to "From Context". Click **OK** to save the changes.

For more details about "From Context" and **Restrict to**, refer to [Define template parameters](/streaming-analytics/analytics-builder/#to-define-the-template-parameters-for-the-instances-of-the-current-model)

![Template parameter with From Context](/images/streaming-analytics/smart-rules-plugin/template-parameter.png)

For detailed information about creating and managing template parameters in Analytics Builder, refer to [Managing template parameters](/streaming-analytics/analytics-builder/#managing-template-parameters).

8. In the toolbar of the model editor, click the save icon <i class="dlt-c8y-icon-save icon-20"></i> to save the model.

When completed, your model will look similar to this:

![Create model for alarms](/images/streaming-analytics/smart-rules-plugin/create-alarm-model.png)

#### Step 2: Create a model instance using the smart rules plugin {#create-an-instance-of-model-using-smart-rules-plugin}

1. Navigate to the Device Management application.
2. Go to **Devices** > **All devices** and select a device.
3. Click the **Smart rules (NEW)** tab (embedded as one of the device details tabs).
Refer to the [Prerequisites](#prerequisites) section to ensure all requirements are met.
   ![Smart rules tab](/images/streaming-analytics/smart-rules-plugin/empty-smart-rule.png)
4. Click **Add rule** to open the **Add rule** dialog. Since you are currently in the **Device** context, only models that have been configured with **From Context** template parameters restricted to **Device** will be visible here. Select your configured model and click **OK**.
   ![Add rule for the selected model](/images/streaming-analytics/smart-rules-plugin/add-rule-for-selected-model.png)
5. Configure the rule parameters:
   - Optionally update the name or add a note if desired.
   - Populate the template parameter values. The value of the template parameter (for example, "Measurement Source") configured with **From Context** is derived automatically from the current device or group context.
   - Click **Save** to save the rule, or toggle to **Active** to save and deploy immediately.
6. Your rule now appears in the smart rules list, showing its status (Active/Inactive).
   ![Smart rules list](/images/streaming-analytics/smart-rules-plugin/smart-rules-list.png)

**Congratulations!** You have successfully created and deployed your first smart rule using the smart rules plugin.

### Creating smart rules from existing Analytics Builder samples {#create-smart-rule-for-existing-samples}

You can also create smart rules using pre-built sample models from Analytics Builder. The process is similar to creating from scratch but faster since the model logic is already defined.

#### Step 1: Create a model from a sample {#create-model-from-sample}
1. Navigate to **Analytics Builder** > **Samples**.
2. Click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> of your desired sample (for example, "On alarm execute operation") and select **Create model from sample**.
   ![Create model from sample](/images/streaming-analytics/smart-rules-plugin/create-model-from-sample.png)
3. The model editor opens with the sample model ready for use.

#### Step 2: Configure template parameters {#configure-template-parameters}
1. Click the template parameter icon <i class="c8y-icon c8y-icon-parameters-on c8y-icon-duocolor icon-20"></i> in the toolbar.
2. Ensure the template parameter entry provided for **Input Source** of the **Alarm Input** block (for example, "Device or group of devices") has "Source or Destination" updated to include one or more values from the **Restrict to** dropdown (for example, "Device") and set **Value Selection** to "From Context". Click **OK** to save the changes.
3. In the toolbar of the model editor, click the save icon <i class="dlt-c8y-icon-save icon-20"></i> to save the model.

#### Step 3: Create a rule from the Device Management application {#create-rule-from-device-management-application}
Follow the same steps as described in [Step 2: Create model instance using the smart rules plugin](#create-an-instance-of-model-using-smart-rules-plugin) above.


### Troubleshooting {#troubleshooting}

1. **No models available in Add rule dialog**
   - Ensure that the Analytics Builder models have template parameters configured with the "From Context" value.
   - Verify your current context matches the model's "Source or Destination" type restrictions. For example, when in a device context where the model's **Restrict to** dropdown is configured with "Groups" only, that model will not be available. To appear in device contexts, "Device" must be selected in the **Restrict to** dropdown.
2. **Previously created rules don't appear in the smart rules list**
   - Verify that the Analytics instances are set to **Production mode** in the Analytics Builder instance editor.
   - Check if Analytics instance names are set in the Analytics Builder instance editor.
   - Confirm you're viewing the correct device or group context.
3. **Error in smart rule deployment**
   - Click the runtime error icon <img src="/images/streaming-analytics/analytics-builder/runtime_error.png" alt="Error icon" style="display:inline-block; margin:0"> to view information about the error.
