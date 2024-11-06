---
weight: 50
title: Application enablement
---

{{< product-c8y-iot >}} provides a comprehensive suite of tools and applications to make it easy to use the connected equipment to drive business outcomes.

At the core of this offering is the [Cockpit application](/cockpit/cockpit-introduction/) which offers a range of features that allow users to visualize fleet and equipment Key Performance Indicators (KPIs) through flexible [dashboarding](/cockpit/working-with-dashboards/), [create and manage reports](/cockpit/working-with-reports/) for data analysis and business insights and efficiently [manage alarms](/cockpit/alarms/) to ensure prompt response to critical events.

One of {{< product-c8y-iot >}}'s core design principles is to allow for customization and extension.

For this, {{< product-c8y-iot >}} provides many self-service customization options such as the following:

1. **White-labeling**: All applications can be easily branded using the [branding manager](/enterprise-tenant/customization/#branding), allowing organizations to maintain their visual identity.
    
2. **Custom dashboards**: Users can create tailored visualizations for their equipment and key performance indicators using the [dashboarding feature](/cockpit/working-with-dashboards/).
    
3. **Real-time analytics**: The Analytics Builder application enables users to define visual [real-time rules](/streaming-analytics/analytics-builder/#using-the-model-editor) for data processing and decision-making.
    
4. **Plug-ins and extensions**: A wide array of [plug-ins and extensions](/standard-tenant/ecosystem/#extensions) is available to enhance platform functionality.
    

{{< product-c8y-iot >}} has also been designed with easy extensibility by developers in mind. This is enabled through well-documented open [APIs](https://{{< domain-c8y >}}/api/) exposing the complete platform functionality along with a [Command Line Interface (CLI)](https://goc8ycli.netlify.app/docs/introduction/) for efficient development workflows and an active [developer community](https://tech.forums.softwareag.com/tag/Cumulocity-IoT) providing a platform for knowledge sharing and problem-solving. All aspects of the platform are extensible:

1. **Device-side logic**: Developers can use the [thin-edge.io](/welcome-developers/developer-topics/#:~:text=Device%20integration%20using%20thin%2Dedge.io) framework for integrating device-side logic.
    
2. **UI applications**: The [Web SDK](/web/) allows developers to seamlessly extend any UI application with new functionality or leverage any {{< product-c8y-iot >}} UI component for your entirely own UI application.
    
3. **Backend services**: The [managed microservices hosting](/standard-tenant/ecosystem/#custom-microservices) together with the [Microservice SDK](/microservice-sdk/microservice-sdk-introduction) makes it easy to develop, deploy and operate custom backend services.
