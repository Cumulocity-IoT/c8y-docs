---
weight: 11
title: Viewing the logs of a rule
layout: bundle
outputs:
  - html
  - json
sector:
  - device_management
---

The tests in the [test data](/data-preparation/rule-editor/#test-data) panel show how your smart function behaves for sample messages. To see how a deployed rule behaves with live device messages, view its logs.

#### To view the logs of a rule {#to-view-rule-logs}

In the rule editor, click **More…** in the action bar and select **View logs**.

The **Logs** page opens in a new browser tab with the rule already selected, so you can keep working in the rule editor. If the rule is deployed, all `console` output of its smart function is shown while the Logs page is open. You can view the logs of a rule for any deployment status, for example, to find out why it failed to deploy.

For details, see [Logs and diagnostics](/data-preparation/logs-and-diagnostics/).
