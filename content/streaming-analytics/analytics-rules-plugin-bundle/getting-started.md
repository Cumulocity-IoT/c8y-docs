---
weight: 10
title: Getting started with Analytics Rules Plugin
layout: redirect
---

### What is Analytics Rules Plugin {#what-is-analytics-rules-plugin}
The Analytics Rules plugin extends analytics builder's capabilities by enabling users to create and manage analytics rules directly from device and group contexts within applications like Device Management and Cockpit. Instead of switching between applications, users can create analytics rules from the context they are already working in, making the process more intuitive and efficient. 

For more details about Analytics Builder, please refer [Analytics Builder](/streaming-analytics/analytics-builder/#getting-started).

### Prerequisites

Before using the Analytics Rules plugin, ensure that the following requirements are met:
- Tenant has access to Analytics Builder application.
- Tenant has subscribed to host application (Device Management, Cockpit).
- Appropriate user permissions for analytics model access and rule creation. Please refer to the 
[Permissions](/streaming-analytics/introduction-analytics/#permissions).

### Creating your first analytics rule

This topic gives the basic flow of how to create your first analytics rule using the plugin from host applications like Device Management.

#### Step 1: Create a Model from Existing Samples
Navigate to **Analytics Builder** > **Samples** page
Click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> of the On alarm execute operation and then click **Create model from sample**.
![Create model from sample](/images/streaming-analytics/analytics-rules-plugin/create-model-from-sample.png)

The new model is immediately shown in the model editor. It has the same name, description and tags as the sample.

To know more about analytics model creation, refer 
[Creating your first model](/streaming-analytics/analytics-builder/#first-steps-creating-your-first-model).

#### Step 2: Template parameter setup

1. To create rules for a model using the Analytics Rules plugin, proper template parameter configuration of the model is essential. In the toolbar of the model editor, click the icon  <i class="c8y-icon c8y-icon-parameters-on c8y-icon-duocolor icon-20"></i> to open the template parameter dialog.


2. For a model to be available for rule creation in the plugin, it must have exactly one template parameter configured as follows:

| Property | Value |
|----------|-------|
| Type | Source or Destination |
| Value Selection | From Context |


- The template parameter **Type** must specifically be "Source or Destination".
- When you select "Source or Destination" type, specify the context restrictions: Device, Groups, or both (multi-selectable).

![Template parameter with From Context](/images/streaming-analytics/analytics-rules-plugin/template-parameter.png)

For detailed information about creating and managing template parameters in Analytics Builder, refer to the [Managing Template Parameters documentation](/streaming-analytics/analytics-builder/#managing-template-parameters).

{{< c8y-admon-info>}}
Only one template parameter per model can have "From Context" value selection.
{{< /c8y-admon-info>}}

3. Click "OK" to save and close the template parameter changes. In the toolbar of the model editor, click the save icon <i class="dlt-c8y-icon-save icon-20"></i> to save the model.

#### Step 3: Create Analytics Rule

1. Navigate to **Device Management** application
2. Go to **Devices** > **All devices** and select a device
3. You can see the **Analytics rules** tab is embedded as one of the device details tabs. Click on the **Analytics rules** tab. You can see the empty analytics rules page.
   ![Analytics rule tab](/images/streaming-analytics/analytics-rules-plugin/empty-analytics-rule.png)
4. Click **Add rule**, you will get an Add analytics rule dialog box where you can select your configured model to instantiate a rule for the model. Select the model and click "OK".
   ![Add rule for the selected model](/images/streaming-analytics/analytics-rules-plugin/add-rule-for-selected-model.png)
5. Once a model is selected for adding rule, the details of the rule parameters are displayed, where you can update the rule and deploy it. Configure the rule details and click **Save** to save the rule. To deploy the rule, fill the mandatory template parameters field like alarm type (e.g., c8y_Temperature) and click inactive/active.
   ![Deploy rule](/images/streaming-analytics/analytics-rules-plugin/deploy-rule.png)
6. Once a model is saved or deployed, it gets added to the Analytics rules list.
   ![Analytics rules list](/images/streaming-analytics/analytics-rules-plugin/analytics-rules-list.png)

Your have created and deployed your first analytics rule!