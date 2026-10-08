---
date: 
title: New Logs page in the Streaming Analytics application
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-5355
version: 27.250.0
---

The Streaming Analytics application has a new **Logs** page, which shows the log messages of Analytics Builder models, smart rules, and the Streaming Analytics framework for your tenant. You no longer need access to the Administration application to find out why a model fails to activate or does not produce the expected output.

- **Tenant-scoped**: The page only shows messages of your own tenant. This also applies to multi-tenant microservices, whose logs were previously only visible to the tenant that owns the microservice.
- **Filter by model**: Select a model, or a template model and one of its instances, to show only its messages. Inactive models and models that failed to activate can also be selected. The selection is part of the URL, so you can bookmark or share it.
- **Logs in the model editor**: Click the logs icon <i class="dlt-c8y-icon-logs icon-20"></i> in the toolbar of the model editor to see the messages of the model below the canvas while you work on it.
- **Automatic refresh and download**: The page shows new messages as they arrive. You can download the messages for a date and time range as a text file.

The **Logs** page does not show the output of EPL apps. This remains available in the log file of the microservice in the Administration application.

For details, see [Viewing logs in the Streaming Analytics application](/streaming-analytics/troubleshooting/#logs-view) and [Viewing the logs of a model](/streaming-analytics/analytics-builder/#viewing-the-logs-of-a-model).
