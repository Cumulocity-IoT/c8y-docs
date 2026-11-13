---
weight: 20
title: Administering the smart rules (NEW) plugin
layout: redirect
---

### Restricting the available official rule templates {#restricting-the-available-official-rule-templates}

By default, all official rule templates are available in the smart rules (NEW) plugin. As an administrator, you can restrict them to a list that you define, for example, to offer only the rule templates that your users need.

You restrict the official rule templates with the `smartrules.samples.allowlist` tenant option in the `streaminganalytics` category. The value is a JSON array of the English names of the Analytics Builder samples, as a string. For example:

```
{
   "category": "streaminganalytics",
   "key": "smartrules.samples.allowlist",
   "value": "[\"On measurement explicit threshold create alarm\", \"On alarm send email\"]"
}
```

The tenant option has the following effect:

|Value of the tenant option|Available official rule templates|
|:---|:---|
|The tenant option does not exist.|All official rule templates.|
|An empty JSON array (`[]`) or an empty value|None.|
|A JSON array of sample names|Only the official rule templates in the list.|
|A value that is not a valid JSON array|All official rule templates. The microservice logs a warning.|

Always use the English name of a sample, also if your users work with a different language. The restriction applies to all languages. Names that do not match a sample are ignored, and the microservice logs a warning. The restriction also applies to the **Samples** page in Analytics Builder.

**[TODO PAB-5296: confirm that the restriction applies to the Samples page in Analytics Builder in the GA release (PAB-5290 filters abSamples.evt).]**

The official rule templates have the following English names:

- Aggregate measurements per input source
- Calculate energy consumption
- On alarm duration increase severity
- On alarm execute operation
- On alarm send email
- On alarm send SMS
- On geofence create alarm
- On geofence send email
- On measurement explicit threshold create alarm
- On measurement threshold create alarm
- On missing measurements create alarm

**[TODO PAB-5296: re-check the list of sample names against src/analytics-builder-samples/ at the GA release.]**

#### When a change of the tenant option takes effect {#when-a-change-of-the-allowlist-takes-effect}

The microservice reads the tenant option when it starts:

- If your tenant has its own Apama-ctrl microservice, the microservice restarts automatically when you change the tenant option. It raises a "tenant_option_change" alarm before it restarts.
- If your tenant uses a multi-tenant Apama-ctrl microservice, the microservice reads the tenant option of the tenant that owns the microservice, not of your tenant. A change takes effect only after the microservice is restarted manually. Contact the owner of the microservice, or [product support](/additional-resources/contacting-support/).

#### What happens to existing rules {#what-happens-to-existing-rules-when-you-restrict-the-official-rule-templates}

When you remove an official rule template from the list, its existing rules are not deleted:

- Existing rules continue to run. You can still view, edit, activate, deactivate, and delete them.
- You cannot create new rules from the rule template. The rule template is no longer shown in the **Add rule** dialog.
- If the rule template has no rules, it is removed.

When you add the rule template to the list again, you can create new rules from it again.

### Sizing guidance {#sizing-guidance}

Smart rules (NEW) run in the Apama-ctrl microservice of your tenant, together with your Analytics Builder models and EPL apps. They share the CPU and memory of the microservice. For the available microservice variants, see [Microservice runtime and applications](/streaming-analytics/introduction-analytics/#microservice-and-applications).

The smart rules (NEW) plugin requires a microservice variant with the Analytics Builder capability. The Apama-ctrl-smartrules and Apama-ctrl-smartrulesmt microservices do not support smart rules (NEW).

**[TODO PAB-5296: confirm whether active rule instances count towards the limit of 3 active analytic models of the Apama-ctrl-starter microservice.]**

The following factors drive the resource usage of smart rules (NEW):

- **The number of active rules.** Each active rule is an active Analytics Builder model instance.
- **The number of devices per rule.** A rule on a group or an asset applies to every device beneath it. A rule on a group with 1,000 devices processes the data of 1,000 devices.
- **The complexity of the rule template.** Rule templates with many blocks, or with blocks that keep state over a time window, use more memory and CPU per device.
- **The data rate.** The number of measurements, events, and alarms per second that the rules receive.

Consider a larger microservice variant or a dedicated microservice in the following cases:

- The microservice raises alarms about high memory usage or about queues that are full. For details, see [Alarms generated by the Apama-ctrl microservice](/streaming-analytics/troubleshooting/#alarms).
- Your tenant uses a multi-tenant microservice and you plan many rules on large groups, or rules on devices with high data rates. A dedicated microservice isolates your rules from the load of other tenants.
- You plan to increase the number of rules or devices significantly. Test the expected load first.

**[TODO PAB-5296: add the tested scale figures from the performance tests (FR-062: 50 templates, 2,000 rule instances, 10,000 runtime partitions, bulk state change of 500 instances), as achieved, and the recommended microservice variant per size. The alert thresholds and Kubernetes settings are internal (T065) and are not documented here.]**
