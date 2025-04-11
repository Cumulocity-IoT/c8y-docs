---
title: Deploy and orchestrate your AI/ML models across devices (EdgeAI with MLOps)
layout: bundle
sector:
  - data_analytics
weight: 50
---

With the increasing availability and affordability of compute for edge devices like controllers and gateways, executing workloads including AI/ML models on edge devices becomes increasingly attractive, especially as it boasts a wide range of benefits. This includes both operational aspects like reduced latency, costs and reliability as well as security aspects including for example local processing of sensitive data, the ability to meet data residency requirements and to run models in an air-gapped environment without internet connectivity.

However, operating workloads decentrally on edge devices introduces unique challenges compared to a centralized cloud environment. At the edge, devices often operate in diverse and constrained environments with limited compute power, intermittent connectivity and varying hardware configurations. Managing and deploying Machine Learning models in such decentralized setups can be complex, requiring solutions that ensure consistency, scalability and debuggability despite these limitations. Moreover, monitoring model performance and maintaining security across multiple edge nodes adds layers of operational complexity.

This is where {{< product-c8y-iot >}} steps in: **Cumulocity’s device management capabilities** allow for efficient orchestration of the workload by providing a centralized management pane to deploy, instanciate, run, update, monitor and troubleshoot ML models as easy as in the cloud. This in detail includes:

- [Bulk operations](/device-management-application/monitoring-and-controlling-devices/#to-view-bulk-operations) - to install ML models to any device as well as to update them.
- [Service management](/device-management-application/monitoring-device-services/)- to monitor the status and metrics defined for and sent by the model (like accuracy, latency, resource consumption).   
- [Log file retrieval](/device-management-application/viewing-device-details/#logs), [alarming](/device-management-application/monitoring-and-controlling-devices/#working-with-alarms) and [event streaming](/device-management-application/monitoring-and-controlling-devices/#to-view-events) - to gain deeper knowledge on the operations of your model and being able to troubleshoot unexpected behaviour.  
- [Remote access](/cloud-remote-access/cra-general-aspects/) capabilities and a [CLI tool](https://goc8ycli.netlify.app/docs/introduction/) - to directly access devices and interact with the workloads running on top of them.
