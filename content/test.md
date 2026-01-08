
# Introduction {#introduct}
In the ever-evolving landscape of data-driven enterprises, the Internet of Things (IoT) has emerged as a transformative force, enabling organizations to gather, analyze, and leverage valuable insights from their connected devices. Among the leading IoT platforms, Cumulocity IoT stands out for its seamless device management, data aggregation, and advanced analytics capabilities. However, to fully realize the potential of Cumulocity IoT, seamless integration with existing enterprise systems is crucial.

Unlocking System Integration Possibilities
There is already a very detailed article around the data integration options which can be found here:

Introduction The core of Cumulocity IoT is device integration but with pure device data only a few use cases can be implemented such as Device Management or Condition Monitoring. The more comprehensive use cases rely on additional data which resides in other databases, systems or services. Only when combining device data with other data like master data or production data the real value of IoT can be unleashed! In this article I will give you an overview about the options you have to…
In this article, we would like to give an overview on one part of it i.e. System Integration and explore a few of the available system integration options and as well as link them to dedicated articles to offer in-depth guidance on each system integration option.

## System Integration Options {sys}
Let’s explore a few prominent options:

1. Microservices Approach: Developer-Friendly Integration
For developers seeking a versatile and flexible integration solution, Cumulocity IoT’s microservices approach offers a developer-friendly solution. This method involves creating microservices that connect Cumulocity IoT to external systems, allowing for customized data exchange and automation. While requiring initial development effort, the microservices approach provides greater control and adaptability. the Option is utilized by many customers for Integrating with CRM, ERPs, FSM tools.

### Creating the microservice image{#creating-the-microservice-image}
We use the Cumulocity Microservice SDK for Java to create the image and the deployable
zip file (Microservice SDK for Java - Cumulocity documentation ). To basically provision OTLP instrumentation of the microservice, the “opentelemetry-javaagent.jar” file must be included in the microservice image at build time.

## Why mc8yp {#w}
While working with Cumulocity  IoT, I wanted a more flexible way to interact with my tenant data through AI agents. This led to building mc8yp with two distinct modes:

## Why This Course Matters
As edge computing transforms industries, the ability to analyse AI-powered vision solutions directly on devices has become critical for real-time decision making, reduced latency, and enhanced privacy in applications ranging from manufacturing quality control to smart city monitoring. This course equips you with the practical skills to bridge the gap between AI model development and edge deployment, enabling you to build complete vision AI solutions that process data locally while leveraging Cumulocity’s powerful IoT management capabilities..

## Course Overview
This focused 60-minutes course teaches you how to harness the power of Vision AI using Cumulocity IoT platform and the IMX500 camera model, covering everything from computer vision model training to seamless edge deployment. You’ll master the complete MLOps lifecycle, learning to onboard cameras, train and convert models, and deploy AI solutions directly to edge devices for real-time inferencing in practical applications.

e.g. Camera Onboarding
Learn how to connect and manage your cameras in Cumulocity.

