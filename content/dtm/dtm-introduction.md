---
title: Introduction
layout: bundle
outputs:
  - html
  - json
sector:
  - app_enablement
weight: 10
helpcontent:
- label: dtm-introduction
  title: Digital Twin Manager
  content: "The DTM application allows you to create and manage assets around your physical connected devices in Cumulocity through the digital representation of a physical hierarchy of assets and devices.


  To create an asset, use asset definitions as the blueprint, which consist of one or more property definitions as well as one or more child asset definitions.  


  An asset hierarchy consist of a root asset definition followed by all its subsequent child asset definitions. Each hierarchy level can consist of properties for the asset, as well as its subassets and devices.


  To get started, open the **Libraries** menu in the navigator and create the necessary asset and property definitions in the **Asset definitons** and **Property definitions** pages respectively . Afterwards, navigate back to the **Assets** menu in the navigator and click **Add asset** on the top right corner to create the assets. "
---

Welcome to the {{< product-c8y-iot >}} Digital Twin Manager (DTM) application.

This application allows you to create and manage assets around your physical connected devices in {{< product-c8y-iot >}} using a digital representation of a physical hierarchy of assets and devices. Here, assets can be used to structure and describe devices in logical hierarchies as encountered in the real world environment to help with visualizing the hierarchy in a digital setting.

Once the asset hierarchy is created in the DTM application, the hierarchy can be applied to other applications such as the {{< product-c8y-iot >}} Cockpit. It saves a lot of time and effort, as the hierarchy is created only once and can be used directly in other {{< product-c8y-iot >}} hosted applications.

The home dashboard of the DTM application gives an overview of the application. You can see the number of asset definitions, property definitions and assets available at a glance. You can add the definitions and assets using the quick links.

The home dashboard can be edited and designed individually according to your needs. You can add, remove or change widgets being displayed here.
For details on editing a dashboard, refer to [Working with dashboards](/cockpit/working-with-dashboards/).

{{< c8y-admon-req >}}
* Your tenant must be subscribed to the Digital Twin Manager application, Dtm-plugins extension and the Dtm microservice.
{{< /c8y-admon-req >}}

{{< c8y-admon-related >}}
* See [Subscribing applications](/enterprise-tenant/managing-tenants/#subscribing-applications) for more information on how to access the DTM application in your tenant.

{{< /c8y-admon-related >}}
