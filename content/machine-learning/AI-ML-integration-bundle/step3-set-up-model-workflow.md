---
weight: 40
title: Step 3 - Set up a model inferencing workflow
layout: redirect
---

Once the AI/ML model is deployed, you need to set up a workflow to:

* Process the incoming data.
* Pass it to the deployed AI/ML model.
* Receive the model output.
* Process the model output to make decisions/create events, alarms, and so on.

To orchestrate the model execution, this workflow can be set up by leveraging the Streaming Analytics tooling, either Analytics Builder or EPL apps. More information on the specific tooling can be found in [Streaming Analytics](/streaming-analytics/introduction-analytics/).

{{< c8y-admon-info >}}
In the {{< c8y-tech-community >}} article for [scenario B](#scenario-b-embedded-hosting-using-custom-microservice), a detailed description on how to create this can be found: [How to create an ML Inference workflow using Streaming Analytics]({{< link-sag-tech-forum >}}/t/performing-machine-learning-inference-on-cumulocity-iot-data-using-open-source-frameworks/277988#how-to-create-an-ml-inference-workflow-using-streaming-analytics-13).
{{< /c8y-admon-info >}}
