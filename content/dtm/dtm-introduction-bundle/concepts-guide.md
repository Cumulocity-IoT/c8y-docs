---
weight: 10
title: Concepts
layout: redirect
---
### Digital Twin {#digital-twin}

A digital twin is a virtual representation of a physical object or system. It is typically used in the context of the Internet of Things (IoT) to help visualize and analyze how a physical object is performing, or to predict how it might behave in the future.

You can use digital twins to simulate and test the performance of complex systems, such as buildings, factories, or even entire cities. By using digital twins, engineers and designers can better understand how a system works and identify potential problems before they occur. 

In the Digital Twin Manager application, one asset represents one digital twin.

### Digital twin attributes {#digital-twin-attributes}

A digital twin contains a number of attributes:

* It represents a unique physical asset.
* It is associated with a single, specific instance of a physical asset.
* It continuously collects data (through sensors, devices, and so on).
* It is continuously connected to the physical asset, updating itself with any change to the asset's state, condition, and context.
* It provides value through visualization, analysis, prediction, and optimization


### Asset Hierarchy {#asset-hierarchy}

An asset hierarchy is a structure that organizes multiple assets and devices into a hierarchy, allowing for the visualization and management of complex systems.

To create an asset hierarchy, execute the following steps. The example is based on a wind turbine as a physical device.

![Wind turbine](/images/dtm/digital-twin/dtm-digital-twin-windmill.png)

1. First identify the key systems, processes, and components to be included in order to define the scope of your asset hierarchy.

2. Based on your definitions create the hierarchy of all digital twins.

![Asset hierarchy wind turbine](/images/dtm/digital-twin/dtm-asset-hierarchy-windmill.png)

3. Determine the level of detail needed for each system, process, and component in the hierarchy. This helps to determine the level of accuracy and complexity required for each asset model. For a wind turbine this includes, for example, the tower's height, the length of the blade and so on.

4. To portray the correct structure, first create an asset property for each component in the **Asset properties**, see [To create an asset property](/dtm/asset-types/#to-create-an-asset-property) for details. The asset properties are later used in creating the individual asset models.

5. To create an asset model work from the smallest component to the largest. For a wind turbine that means to start with the asset model "blade", followed by "rotor", "tower", and "nacelle" and finally "wind turbine". Assign the required asset property to each asset model as well as the allowed contained asset models (for example, a wind turbine requires a rotor, which in turn requires rotor blades).

6. Afterwards, add the necessary asset instances. This process starts from the outer most level (for example, the wind turbine) and ends at the deepest level (for example, the blades).

7. Test and validate the asset hierarchy to ensure that it accurately represents the real-world system or process. This can involve simulating different scenarios and comparing the results to real-world data.

8. Continuously update and maintain the asset hierarchy as changes occur in the real-world system or process. This ensures that the hierarchy remains accurate and up to date.
