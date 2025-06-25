---
weight: 30
title: Asset data points
layout: redirect
---

Data points represent the numerical measurements collected from connected devices and sensors. These are the fundamental real-time data streams that offer insights into the operational status, performance, and environmental conditions of your physical assets and are key to monitor asset health, identify trends, and make informed decisions over time. 

To effectively organize and interpret the vast amount of data collected from IoT devices, Cumulocity structures measurements using two key concepts: **fragments** and **series**. These concepts are crucial for understanding how measurement data is categorized and stored within the platform and how to use data points in the DTM application.

A **fragment** serves as a logical container or category that groups related measurements or characteristics of an asset (or any managed object). It identifies a specific capability or a set of related data points. Within a fragment, a **series** represents a specific, individual measurement stream. It is the named property that holds the actual numerical value and its corresponding unit. A data point and with this the measurement series it represents, is uniquely identified by the combination of its fragment and series.

{{< c8y-admon-info>}}
To reference data points and measurement series in Cumulocity, the format `fragment.series` is used, such as `c8y_Temperature.T_Ambient`.
{{< /c8y-admon-info>}}

**Example:**
Within the `c8y_Temperature` fragment, `T` (for Temperature) could be a series. Each series provides a distinct stream of data for a particular metric. If a device has two temperature sensors, one for ambient temperature and one for internal temperature, both might fall under the `c8y_Temperature` fragment but would have distinct series names, such as for example `T_Ambient` and `T_Internal`. 

### Data point types

In Cumulocity, data points are inherently associated with managed objects in the platform's inventory. As assets are a type of managed object, measurements can be associated with assets as any other managed object. However, there are two distinct ways in which data points can be associated with assets in the Digital Twin Manager:   

**Direct Association:** Any managed object in Cumulocity, including an asset, can directly receive measurements and have measurements directly associated. This means that an asset itself can be the source of a measurement. For example, if a building asset has its own sensors directly integrated with Cumulocity, the measurements from these sensors would be directly associated with that building asset.

**Linked Association:** The Digital Twin Manager allows linking of data points from one managed object (typically a device) to an asset. This means the asset itself does not generate the measurement and does not have the measurement directly associated, but it points to a measurement originating from another source, usually a connected device that is part of or related to the asset's hierarchy. 
  
 {{< c8y-admon-info>}}

Data point linking enables the contextualization of raw, device-level measurements within the logical framework of an asset hierarchy. This linking allows for a unified view of an asset's performance and status by aggregating relevant data from multiple underlying devices into the asset, transforming disparate sensor readings into actionable information for the asset itself. By centralizing data at the asset level, it facilitates the calculation of asset-specific Key Performance Indicators (KPIs) and enables holistic visualization in dashboards, supporting more accurate decision-making for complex systems that comprise multiple devices. 

{{< /c8y-admon-info>}}

{{< c8y-admon-req >}}
ROLES & PERMISSIONS

Digital Twin Manager provides a comprehensive set of permissions to manage linked data points effectively and securely. These permissions are essential for ensuring that users can create, update, view, and delete linked data points as needed while maintaining the integrity and security of the asset data.

These permissions are categorized under two main permissions: "Digital twin assets" and "Digital twin linking". The following permissions are required to view or manage linked data points:

- To view linked data points: READ permission for permission type "Inventory"
- To create linked data points: CREATE permission for permission type "Digital twin assets" or "Digital twin linking"
- To update linked data points: UPDATE permission for permission type "Digital twin assets" or "Digital twin linking"
- To create, update and delete linked data points: ADMIN permission for permission type "Digital twin assets" or "Digital twin linking"
{{< /c8y-admon-req >}}