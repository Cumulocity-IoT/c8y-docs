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

### Template parameters setup

To create rules for a model using the Analytics Rules plugin, proper template parameter configuration of the model is essential. For a model to be available for rule creation in the plugin, it must have exactly one template parameter configured as follows:

| Property | Value |
|----------|-------|
| Type | Source or Destination |
| Value Selection | From Context |

- The template parameter **Type** must specifically be "Source or Destination".
- When you select "Source or Destination" type, specify the context restrictions: Device, Groups, or both (multi-selectable).

For detailed information about creating and managing template parameters in Analytics Builder, refer to the [Managing Template Parameters documentation](/streaming-analytics/analytics-builder/#managing-template-parameters).

{{< c8y-admon-info>}}
Only one template parameter per model can have "From Context" value selection.
{{< /c8y-admon-info>}}
