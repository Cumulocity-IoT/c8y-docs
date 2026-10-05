---
weight: 5
title: Viewing logs in the Streaming Analytics application
layout: redirect
---

The **Logs** page of the Streaming Analytics application shows the log messages that the Streaming Analytics application writes for your tenant. Use it to find out why an analytic model or smart rule does not behave as expected, without needing access to the Administration application.

The page works the same way for per-tenant and multi-tenant microservices. To open it, click **Logs** in the navigator.

### What the Logs page shows {#logs-view-content}

The Logs page shows messages for your tenant that belong to the Streaming Analytics application:

- Messages from Analytics Builder models and template model instances. This includes the output of the [Logger](/streaming-analytics/block-reference/#logger) block, the `console` output of the [Smart Function](/streaming-analytics/block-reference/#smart-function) block, and errors raised while a model is running.
- Messages from smart rules, including those created with the [Smart rules (NEW) plugin](/streaming-analytics/smart-rules-plugin/).
- Deployment, lifecycle, and error messages from the Streaming Analytics framework, for example, when a model starts, stops, or fails.

The following are not shown:

- Messages from Data Preparation rules. These are shown on the **Logs** page of the Data Preparation application. See [Logs and diagnostics](/data-preparation/logs-and-diagnostics/).
- Messages from EPL apps. To see these, view the log file of the microservice in the Administration application. See [Log files of the Apama-ctrl microservice](#logfiles).
- The continuation lines of multi-line messages, such as stack traces. Only the first line of such a message is shown. Only the `console` output of the Smart Function block can span several lines.

Each log entry is shown on one line with the following structure:

```
<timestamp> <level> [<origin>] <message>
```

- `<timestamp>` is the date and time at which the message was written.
- `<level>` is the log level of the message: for example `INFO`, `WARN`, or `ERROR`.
- `<origin>` shows where the message comes from:
  - `model=<id>` for a message from an Analytics Builder model, where `<id>` is the ID of the model. For a template model instance, it is the ID of the instance. You can find the ID of a model in the URL of the model editor.
  - `streaminganalytics` for all other messages, for example, from smart rules or the Streaming Analytics framework.
- `<message>` is the text of the message. Messages from the Logger block start with its logger tag, for example, `<logger>`. `console` output from a Smart Function block starts with the label of the block, if it has one, for example, `<Temperature check>`. Control characters are removed from the message before it is shown.

For example:

```
2026-10-02 14:03:27.512+02:00 INFO  [model=87104] <logger> value=any(float,5.09) properties={}
2026-10-02 14:03:30.001+02:00 WARN  [model=87104] <Temperature check> Value above limit: 105
2026-10-02 14:04:12.870+02:00 INFO  [streaminganalytics] Analytics Builder runtime running.
```

Entries are listed oldest first. A download contains the entries in the same format and order. See [Downloading the logs](#downloading-logs).

{{< c8y-admon-info >}}
The **Log level** parameter of the Smart Function block sets which `console` output is written: the default `WARN` writes only `console.warn` and `console.error`, and `INFO` adds `console.log` and `console.info`. Note that `DEBUG` requires the correlator log level to also be set to `DEBUG` or higher to output `console.debug` logs.
{{< /c8y-admon-info >}}

To view the logs, you need READ permission for "CEP management". See [Managing permissions and roles](/standard-tenant/managing-permissions/) for more information.

#### How far back the logs go {#log-history}

The Logs page reads the log of the microservice, which only keeps its most recent 35 MB of output and starts again when the microservice restarts. See [Monitoring microservices](/standard-tenant/ecosystem/#monitoring-microservices). If the microservice writes a lot of output, for example, because it serves many tenants, older messages are removed sooner. The page then shows "Showing recent logs. Earlier entries may no longer be visible." The Logs page is for diagnosing current problems, not a long-term log archive.

### Filtering the logs by model {#filtering-logs-by-model}

By default, the Logs page shows all Streaming Analytics messages for your tenant. Use the **Model** drop-down list at the top of the page to show only the messages of one Analytics Builder model:

- Each model shows its mode and state, for example, **Production** and **Active**, or **Runtime error**. A template model shows **Template**. You can select any model, including inactive models and models that failed to activate, so that you can still see why a model stopped or failed.
- When you select a template model, a second drop-down list named **Instance** appears, and the first instance is selected. To see the messages of a different instance, select it in the **Instance** drop-down list. A template model without any instances cannot be selected.
- The entries are sorted alphabetically by name. Type in the drop-down list to search for a model by name.

To show all messages again, clear the selection.

When you select a model, the URL of the page changes to include the model. You can bookmark this URL or share it with other users of your tenant to open the page with the same model already selected. If the model no longer exists, the page shows a message and lists all messages instead.

You can also view the logs of a model from the model editor. See [Viewing the logs of a model](/streaming-analytics/analytics-builder/#viewing-the-logs-of-a-model).

Smart rules created with the Smart rules (NEW) plugin are template model instances. To see the messages of such a smart rule, select its template model and then the instance. Other smart rules messages are only shown when no model is selected.

### Automatic refresh {#logs-auto-refresh}

When you open the Logs page, or select a different model, it shows the messages from the last 10 minutes. It then checks for new messages every 10 seconds and adds them to the end of the list. If you have scrolled up, a **New logs** button appears when new entries arrive. Click it to jump to the latest entry.

To pause the updates, click **Auto-refresh** in the toolbar. Click it again to resume. The page also stops checking for new messages when you leave it.

### Downloading the logs {#downloading-logs}

You can download the messages that are shown on the Logs page as a text file named *&lt;tenantId&gt;-logs.log*. The download uses the same filters as the page: only your tenant's Streaming Analytics messages, and only those of the selected model or instance, if any.

#### To download the logs {#to-download-the-logs}

1. Click **Download** in the toolbar.
2. Optionally select a **Start** and **End** date and time. If no dates are selected, the last 10 minutes of logs are downloaded.
3. Click **Download**.

Messages that the microservice log no longer holds cannot be downloaded. See [How far back the logs go](#log-history).
