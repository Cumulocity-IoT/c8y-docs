---
weight: 30
title: Asset data points
layout: redirect
---

Data points represent the numerical measurements collected from connected devices and sensors. These are the fundamental real-time data streams that offer insights into the operational status, performance, and environmental conditions of your physical assets and are key to monitor asset health, identify trends, and make informed decisions over time. 

To effectively organize and interpret the vast amount of data collected from IoT devices, Cumulocity structures measurements using two key concepts: **fragments** and **series**. These concepts are crucial for understanding how measurement data is categorized and stored within the platform and how to use data points in the DTM application.

A **fragment** serves as a logical container or category that groups related measurements or characteristics of an asset (or any managed object). It identifies a specific capability or a set of related data points. Within a fragment, a **series** represents a specific, individual measurement stream. It is the named property that holds the actual numerical value and its corresponding unit. 

{{< c8y-admon-info>}}
To reference a data point in Cumulocity and the DTM application, the **measurement series** format `fragment.series` is used, such as `c8y_Temperature.T_Ambient`. With the measurement series format a data point is uniquely identified for a device or an asset.
{{< /c8y-admon-info>}}

**Example:**
Within the `c8y_Temperature` fragment, `T` (for Temperature) could be a series. Each series provides a distinct stream of data for a particular metric. If a device has two temperature sensors, one for ambient temperature and one for internal temperature, both might fall under the `c8y_Temperature` fragment but would have distinct series names, such as for example `T_Ambient` and `T_Internal`. 

### Type of Data points

In Cumulocity, data points are inherently associated with managed objects in the platform's inventory. As assets are a type of managed object, measurements can be associated with assets as any other managed object. However, there are two distinct ways in which data points can be associated with assets in the Digital Twin Manager:   

**Direct Association:** Any managed object in Cumulocity, including an asset, can directly receive measurements and have measurements directly associated. This means that an asset itself can be the source of a measurement. For example, if a building asset has its own sensors directly integrated with Cumulocity, the measurements from these sensors would be directly associated with that building asset.

**Linking Association:** The Digital Twin Manager allows linking of data points from one managed object (typically a device) to an asset. This means the asset itself does not generate the measurement, but it points to a measurement originating from another source, usually a connected device that is part of or related to the asset's hierarchy. 
  
### Data point linking 

 Data point linking enables the contextualization of raw, device-level measurements within the logical framework of an asset hierarchy. This symbolic linking allows for a unified view of an asset's performance and status by aggregating relevant data from multiple underlying devices into the asset, transforming disparate sensor readings into actionable information for the asset itself. By centralizing data at the asset level, it facilitates the calculation of asset-specific Key Performance Indicators (KPIs) and enables holistic visualization in dashboards, supporting more accurate decision-making for complex systems that comprise multiple devices.   


