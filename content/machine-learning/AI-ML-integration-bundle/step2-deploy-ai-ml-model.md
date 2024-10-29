---
weight: 30
title: Step 2 - Deploy your AI/ML model
layout: redirect
---

In general, there are three possible scenarios for deploying your AI/ML model, depending on the requirements of your use case:

* External hosting
* Embedded hosting using a custom inference microservice
* Embedded hosting using a generic inference environment

### Scenario A: External hosting {#scenario-a-external-hosting}

In this scenario, you leverage the AI/ML execution environment of a third party, which is typically closely related to the third party used to create and train the AI/ML model in [Step 1](/machine-learning/ai-ml-integration/#step1-create-ai-ml-model). The execution environment of the third party exposes an endpoint, which can be used for sending input readings and returning the model scoring output. Using externally hosted AI/ML models offers advantages such as scalability, reduced infrastructure management, and access to cutting-edge AI/ML capabilities. Allowing you to focus on your core functionality and leverage state-of-the-art Machine Learning without the burden of maintaining infrastructure.

From an architectural perspective, scenario A looks like this:

![Scenario A architecture](/images/machine-learning-guide/scenario-a-architecture.png)

{{< c8y-admon-info >}}
The following article in the {{< c8y-tech-community >}} illustrates this scenario in more detail: [Leveraging Hyperscaler Clouds for Machine Learning Inferencing on {{< product-c8y-iot >}} Data]({{< link-sag-tech-forum >}}/t/leveraging-hyperscaler-clouds-for-machine-learning-inferencing-on-cumulocity-iot-data/292498).
{{< /c8y-admon-info >}}


### Scenario B: Embedded hosting using a custom microservice {#scenario-b-embedded-hosting-using-custom-microservice}

In this scenario, you create and deploy a custom {{< product-c8y-iot >}} microservice which includes:

*	An "extract" of the AI/ML model created and trained in [Step 1](/machine-learning/ai-ml-integration/#step1-create-ai-ml-model).
*	The relevant libraries for inferencing.
*	A POST request endpoint for sending input readings and returning the model scoring output. This approach provides greater control over model customization, data privacy by ensuring sensitive data remains within the platform’s environment, and offers lower latency as data processing occurs within the platform’s environment. Thus, reducing the need for external data transfers and potential network-related delays.

From an architectural perspective, scenario B looks like this:

![Scenario B architecture](/images/machine-learning-guide/scenario-b-architecture.png)

{{< c8y-admon-info >}}
The following article in the {{< c8y-tech-community >}} illustrates this scenario in more detail: [Performing Machine Learning Inference on {{< product-c8y-iot >}} Data using Open-Source Frameworks]({{< link-sag-tech-forum >}}/t/performing-machine-learning-inference-on-cumulocity-iot-data-using-open-source-frameworks/277988).
{{< /c8y-admon-info >}}


### Scenario C: Embedded hosting using a generic microservice {#scenario-b-embedded-hosting-using-generic-microservice}

In this scenario, you create and deploy a {{< product-c8y-iot >}} microservice which has been purposely built to work generically with specific types of model "extracts" that are hosted alongside the microservice, such as, within the {{< product-c8y-iot >}} file repository. Like [scenario B](#scenario-b-embedded-hosting-using-custom-microservice), this microservice includes a POST request endpoint for sending input readings, this time complemented with the reference to the model of choice, and returning the model scoring output.

From an architectural perspective, scenario C looks like this:

![Scenario C architecture](/images/machine-learning-guide/scenario-c-architecture.png)

{{< c8y-admon-info >}}
A {{< c8y-tech-community >}} article to illustrate this scenario is currently under construction.
{{< /c8y-admon-info >}}
