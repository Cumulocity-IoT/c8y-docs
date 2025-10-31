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

#### Role-based access {#role-based-access}
The following permissions are required to access Smart rules (NEW) instances.

|privilege|Description|
|---------|-----------|
|**READ**|Grants view-only access to Smart rule instances. Users with this permission can view existing instances but cannot create, modify, or delete them.|
|**ADMIN**|Grants full control over Smart rule instances. Users with this permission can Create, Read, Update, and Delete (CRUD) Smart rule instances.|

These permissions ensure fine-grained access control, allowing administrators to manage user privileges based on operational requirements.

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
