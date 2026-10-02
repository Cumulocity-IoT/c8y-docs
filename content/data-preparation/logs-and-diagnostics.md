---
weight: 52
title: Logs and diagnostics
layout: bundle
outputs:
  - html
  - json
sector:
  - device_management
---

When a deployed rule does not do what you expect, for example, it produces wrong output or no output at all without raising an alarm, its log messages are often the quickest way to find out why. The **Logs** page of the Data Preparation application shows the log messages of your rules, including the `console` output of their smart functions. You do not need access to the Administration application to use it.

The Data Preparation application also lets you download a diagnostics archive for your tenant, which is useful when you contact [product support](/additional-resources/contacting-support/).

{{< c8y-admon-info >}}
Errors that a smart function throws while processing a message are also raised as alarms, which include the failing message and the error. Alarms are kept, while the Logs page only shows recent messages. See [Runtime behavior and limits](/data-preparation/smart-functions/#logs).
{{< /c8y-admon-info >}}

### Viewing the logs {#view-logs}

To open the Logs page, click **Logs** in the Data Preparation application navigator.

The Logs page shows only the log messages of your own tenant. A log message that cannot be attributed to a single tenant is not shown to anyone.

The Logs page shows only messages that belong to the Data Preparation application:

- Messages about the deployment of your rules, for example, why a rule failed to deploy.
- Errors thrown by smart functions, and output written with `console.error`. These are always shown.
- Other `console` output of smart functions (`console.log`, `console.info`, `console.warn`, and `console.debug`). This is only shown while console capture is active for the rule. See [Console capture](#console-capture) for more details.
- Other messages from the Data Preparation framework for your tenant.

Messages from Analytics Builder models, smart rules, and other parts of the Streaming Analytics application are not shown. These are shown on the **Logs** page of the Streaming Analytics application. See [Viewing logs in the Streaming Analytics application](/streaming-analytics/troubleshooting/#logs-view).

Each log entry is shown on one line with the following structure:

```
<timestamp> <level> [<origin>] <message>
```

- `<timestamp>` is the date and time at which the message was written.
- `<level>` is the log level of the message. `console.log` and `console.info` output is shown as `INFO`, `console.warn` as `WARN`, `console.error` as `ERROR`, and `console.debug` as `DEBUG`.
- `<origin>` shows where the message comes from:
  - `rule=<name>` for a message from a rule, where `<name>` is the name of the rule.
  - `dataprep` for all other messages, for example, from the Data Preparation framework.
- `<message>` is the content of the log message.

For example:

```
2026-10-02 14:03:20.104+02:00 INFO  [rule=Machine_Temp_Rule] Console capture started for rule "Machine_Temp_Rule"
2026-10-02 14:03:27.512+02:00 INFO  [rule=Machine_Temp_Rule] Temperature 21.5 received from sensor-01
2026-10-02 14:04:12.870+02:00 INFO  [dataprep] Done restoring all existing device rules (3)
```

Entries are listed oldest first. A download contains the entries in the same format and order. See [Downloading the logs](#download-logs).

To view the logs, you need READ permission for "Data Preparation rules". See [Permissions](/data-preparation/data-preparation-introduction/#permissions) for more details.

#### How far back the logs go {#log-history}

The logs are read from the log of the microservice, which only keeps the most recent part of its output (about 30 MB). If the microservice writes a lot of output, for example, because it serves many tenants, older messages can already be removed. The Logs page is a tool for diagnosing current problems, not a long-term log archive.

### Filtering the logs by rule {#filter-by-rule}

By default, the Logs page shows all Data Preparation messages for your tenant. Use the **Rule** drop-down list at the top of the page to show only the messages of one rule:

- Type in the drop-down list to search for a rule by name.
- Each entry shows the deployment status of the rule: **Deployed**, **Deploying**, **Disabled**, **Deploy failed**, or **Not deployed**. You can select any rule, whatever its status, so that you can see why a rule failed to deploy.
- Selecting a deployed rule also starts console capture for it. See [Console capture](#console-capture).

To show all messages again, clear the selection. This also stops console capture.

When you select a rule, the URL of the page changes to include the rule. You can bookmark this URL or share it with other users of your tenant to open the page with the same rule already selected. If the rule no longer exists, the page shows a message and lists all messages instead.

#### To view the logs of a rule from the rule editor {#view-logs-from-rule-editor}

1. Open the rule in the [rule editor](/data-preparation/rule-editor/).
2. Click **More…** in the action bar and select **View logs**.

The Logs page opens in a new browser tab, with the rule already selected. If the rule is deployed, console capture starts at once, so you can send a device message and watch the rule process it.

### Console capture {#console-capture}

Most `console` output of a smart function is only written to the log while the logs are being viewed. This keeps the log free of output that nobody reads. Only output written with `console.error` and errors thrown by the smart function are written at all times.

Console capture starts when you select a deployed rule on the Logs page, or open the Logs page with **View logs** in the rule editor. While it is active, all `console` output of the rule is written to the log and shown on the page.

Console capture stops when any of the following happens:

- You clear the selection or select a different rule.
- You pause the automatic refresh. See [Automatic refresh](#auto-refresh).
- You leave the Logs page.
- You close the browser tab, or the browser loses its network connection.

Output that a smart function writes before console capture starts, or after it stops, is not kept. To capture output over a longer period without keeping the page open, see [Capturing in the background](#background-capture).

Console capture is only possible for rules that are **Deployed**. The deployment and error messages of the rule are still shown.

#### Limit on console capture {#console-capture-limit}

By default, each tenant can have console capture active for up to 3 rules at the same time, including background captures. When this limit is reached, no further console capture can start until another one stops. The deployment, error, and system messages of the rule are still shown.

If several users view the logs of the same rule, they share one console capture.

To change the limit, set the tenant option `consoleCapture.maxActive` in the category `dataprep` to a value between 1 and 10. This requires ADMIN permission for "Option management". For example:

```bash
curl --user username -X POST -H 'Content-Type: application/json' -d '{"category": "dataprep", "key": "consoleCapture.maxActive", "value": "5"}' https://<tenant-domain>/tenant/options
```

#### Capturing in the background {#background-capture}

Some problems only show up occasionally, for example, when a device sends an unusual message from time to time. To catch these, you can capture the `console` output of a rule for up to one hour without keeping the Logs page open. You can then come back later and look at the output.

##### To capture the console output of a rule in the background {#to-capture-in-background}

1. On the Logs page, select a deployed rule in the **Rule** drop-down list.
2. Click **Capture in background** and select how long to capture for: **15 minutes**, **30 minutes**, or **1 hour**.
3. You can now close the browser tab. The capture continues until the selected time.

Redeploying or deleting the rule ends the background capture. Background captures are also lost when the microservice restarts.

To stop the capture early, select the rule on the Logs page again and click **Stop background capture**. If you start a background capture for a rule that already has one, the new duration replaces the old one.

To view the captured output later, open the Logs page and select the rule. The page only shows the messages from the last 10 minutes when you open it, so to see older messages, download the logs with a start date that is before the capture started. See [Downloading the logs](#download-logs).

A background capture counts toward the [limit on console capture](#console-capture-limit) for its whole duration.

To allow only shorter background captures, set the tenant option `consoleCapture.maxBackgroundDurationSecs` in the category `dataprep` to the maximum duration in seconds, in the same way as for the [limit on console capture](#console-capture-limit). The maximum value is capped at 3600 seconds (one hour).


{{< c8y-admon-important >}}
Background capture makes sure that the output of the rule is written to the log, but does not keep it for longer. Retrieve captured output soon after the capture ends. See [How far back the logs go](#log-history).
{{< /c8y-admon-important >}}

### Automatic refresh {#auto-refresh}

When you open the Logs page, or select a different rule, it shows the messages from the last 10 minutes. It then automatically checks for new messages and adds them to the end of the list. If you have scrolled up, a **New logs** button appears when new entries arrive. Click it to jump to the latest entry.

To pause the updates, click **Auto-refresh** in the toolbar. Click it again to resume. Pausing also stops console capture, unless a background capture is active.

### Downloading the logs {#download-logs}

You can download the messages that are shown on the Logs page as a text file named *&lt;tenantId&gt;-logs.log*. The download uses the same filters as the page: only your tenant's Data Preparation messages, and only those of the selected rule, if any.

#### To download the logs {#to-download-logs}

1. Click **Download** in the toolbar.
2. Optionally select a **Start** and **End** date and time. If no dates are selected, the last 10 minutes of logs for the whole tenant are downloaded.
3. Click **Download**.

### Downloading diagnostics {#download-diagnostics}

The diagnostics archive collects information about the Data Preparation setup of your tenant into a single ZIP file.

To download the diagnostics archive, you need READ permission for "Data Preparation rules". To include the diagnostics information of the microservice, you also need READ permission for "CEP management".

#### To download the diagnostics archive {#to-download-diagnostics}

1. Click the **User** button in the Data Preparation application to open the right drawer.
2. In the **Diagnostics** section, click **Download diagnostics**.

The ZIP file is named *dataprep-diagnostics_&lt;timestamp&gt;.zip* and contains the following:

- *data-preparation/rules.json*: the draft and deployed versions of all rules of your tenant, including their smart functions. Conversations with the AI assistant are not included.
- *data-preparation/configuration.json*: the Data Preparation tenant options of your tenant without credentials, the versions of the Data Preparation components, and details of your tenant and the application.
- *apama-ctrl/diagnostic-overview.zip*: the basic diagnostics information of the microservice that runs the rules. See [Downloading diagnostics and logs](/streaming-analytics/troubleshooting/#diagnostics-download).

The archive only contains data that belongs to your own tenant.
