---
weight: 5
title: Introduction
layout: bundle
outputs:
  - html
  - json
sector:
  - device_management
helpcontent:
- label: data-preparation-introduction
  title: Data Preparation
  content: "Data Preparation provides an AI-first environment for transforming raw device messages into standard Cumulocity objects such as measurements, events, and alarms. You define rules that listen on transport topics, apply transformation logic through smart functions, and forward the results to the platform.


  Use the rule creation wizard to set up a new rule: select a source transport, define topic or client ID filters, and provide a name and description. Once created, the rule opens in the rule editor where you write or generate the transformation logic using the built-in AI assistant.


  For a step-by-step walkthrough of creating and deploying your first rule, refer to [Getting started](https://cumulocity.com/docs/data-preparation/getting-started-dataprep/)."
---

{{< c8y-admon-preview >}} Data Preparation is currently in Public Preview and might change or is not feature complete. While we try to keep changes as low as possible, breaking changes and feature removals happen. To enable the feature, open the right drawer (by clicking on your username initials) in the Administration application and select **Manage preview features**. Then activate the toggle next to **Data Preparation**. {{< /c8y-admon-preview >}}

