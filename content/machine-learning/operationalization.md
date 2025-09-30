---
title: Operationalizing your AI/ML models in the cloud
layout: bundle
sector:
  - data_analytics
weight: 40
---

The section [Create and bring your own AI/ML model (BYOM)](/machine-learning/model-creation/) explains how to access historical data for the purpose of training an AI/ML model. Now the next step is to operationalize your models and deploy them into data pipelines for real-time model inferencing.

### Deploy your AI/ML model {#deploy-your-ai-ml-model}

In general, there are three possible scenarios for deploying your AI/ML model, depending on the requirements of your use case:

* External hosting  
* Embedded hosting using a custom inference microservice  
* Embedded hosting using a generic inference environment

Using externally hosted AI/ML models offers advantages such as scalability, reduced infrastructure management, and access to cutting-edge AI/ML capabilities. This approach allows you to focus on your core functionality and leverage state-of-the-art Machine Learning without the burden of maintaining infrastructure.

Embedded hosting reduces the need for external data transfers and potential network-related delays. As such, this approach provides greater control over model customization, data privacy (by ensuring sensitive data remains within the platform’s environment), and offers lower latency as data processing occurs within the platform’s environment.

The image below illustrates a high-level architecture perspective, starting with providing the data via {{< product-c8y-iot >}} DataHub, training the model, making it available for various deployment scenarios (identified as A/B/C later on) to integrate in a workflow with {{< product-c8y-iot >}} Streaming Analytics.

![High level architecture](/images/machine-learning-guide/high-level-architecture.png)

### Scenario A: External hosting {#scenario-a:-external-hosting}

In this scenario, you leverage the AI/ML execution environment of a third party, which is typically closely related to the third party used to create and train the AI/ML model. The execution environment of the third party exposes an endpoint, which can be used for sending input readings and returning the model scoring output.

From an architectural perspective, scenario A looks like this:

![Scenario A architecture](/images/machine-learning-guide/scenario-a-architecture.png)

{{< c8y-admon-info >}}
The following article in the {{< c8y-tech-community >}} illustrates this scenario in more detail: [Leveraging Hyperscaler Clouds for Machine Learning Inferencing on Cumulocity Data](https://community.cumulocity.com//t/leveraging-hyperscaler-clouds-for-machine-learning-inferencing-on-cumulocity-iot-data/6312).
{{< /c8y-admon-info >}}


### Scenario B: Embedded hosting using a custom microservice {#scenario-b:-embedded-hosting-using-a-custom-microservice}

In this scenario, you create and deploy a custom {{< product-c8y-iot >}}y microservice which includes:

* An “extract” of the trained AI/ML model.  
* The relevant libraries for inferencing.  
* A POST request endpoint for sending input readings and returning the model scoring output.

From an architectural perspective, scenario B looks like this:

![Scenario B architecture](/images/machine-learning-guide/scenario-b-architecture.png)

{{< c8y-admon-info >}}
The following article in the {{< c8y-tech-community >}} illustrates this scenario in more detail: [Performing Machine Learning Inference on Cumulocity Data using Open-Source Frameworks](https://community.cumulocity.com//t/performing-machine-learning-inference-on-cumulocity-iot-data-using-open-source-frameworks/4924).
{{< /c8y-admon-info >}}

### Scenario C: Embedded hosting using a generic microservice {#scenario-c:-embedded-hosting-using-a-generic-microservice}

In this scenario, you create and deploy a {{< c8y-tech-community >}} microservice which has been purposely built to work generically with specific types of model “extracts” that are hosted alongside the microservice, such as, within the {{< c8y-tech-community >}} file repository. Like scenario B, this microservice includes a POST request endpoint for sending input readings, this time complemented with the reference to the model of choice, and returning the model scoring output.

From an architectural perspective, scenario C looks like this:

![Scenario C architecture](/images/machine-learning-guide/scenario-c-architecture.png)

{{< c8y-admon-info >}}
A {{< c8y-tech-community >}} article to illustrate this scenario is currently under construction.
{{< /c8y-admon-info >}}

### Setting up a model inferencing workflow {#setting-up-a-model-inferencing-workflow}

Once the AI/ML model is deployed, you need to set up a workflow to:

* Process the incoming data.  
* Pass it to the deployed AI/ML model.  
* Receive the model output.  
* Process the model output to make decisions/create events, alarms, and so on.

To orchestrate the model execution, this workflow can be set up by leveraging the Streaming Analytics tooling, either Analytics Builder or EPL apps. More information on the specific tooling can be found in [Streaming Analytics](/streaming-analytics/introduction-analytics/).

{{< c8y-admon-info >}}
In the Cumulocity Tech Community article for scenario B, a detailed description on how to create this can be found: [How to create an ML Inference workflow using Streaming Analytics](https://community.cumulocity.com//t/performing-machine-learning-inference-on-cumulocity-iot-data-using-open-source-frameworks/4924).
{{< /c8y-admon-info >}}
