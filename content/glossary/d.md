---
weight: 50
title: D
layout: bundle
sector:
  - getting_started
---

### Data broker {#data-broker}

The data broker functionality is an optional feature in {{< enterprise-tenant >}}s which lets you share data selectively with other tenants.

For details see [Platform administration > Using the data broker](/data-broker/data-broker-application/#using-data-broker).


### Data explorer {#data-explorer}

Part of the [Cockpit application](/glossary/c/#cockpit-application). The data explorer visualizes all data points (that is, measurements or sensor data) of either a particular asset or of all assets.

For details see [Application enablement & solutions > Cockpit > Data explorer](/cockpit/data-explorer).


### Data lake {#data-lake}

Used in the context of [DataHub](/glossary/c/#datahub).

A data lake serves as a storage container for offloaded data either on the basis of ADLS Gen2/Azure Storage (Azure), S3 (Amazon), NAS, or HDFS.


### Data point library {#data-point-library}

The Data point library provides a collection of data points with default values for data point properties which serve as templates that can be applied easily to your data points from different devices.

For details see [Application enablement & solutions > Cockpit > Data point library](/cockpit/data-point-library).


### Device {#device}

Devices are a special type of [asset](/glossary/a/#asset). They can constitute a hierarchy of devices. In the {{< product-c8y-iot >}} [inventory](/glossary/i/#inventory) their [digital twins](#digital-twin) are represented as [managed objects](/glossary/m/#managed-object).


### Device Management application {#device-management-application}

The Device Management application is one of the default applications of {{< product-c8y-iot >}}.
The Device Management application provides functionalities for connecting, managing and monitoring devices and allows to control and troubleshoot devices remotely.

For details see [Device management & connectivity > Device Management application](/device-management-application/).


### Device protocol {#device-protocol}

A device protocol defines how data from a specific device type should be transferred into the {{< product-c8y-iot >}} platform. It contains protocol-specific information about where the data is obtained from, how to transform it, and how to store it in {{< product-c8y-iot >}}.
The definition of the device protocol differs based on the underlying protocol used by the device (for example, Modbus, LoRa, OPC UA or LWM2M).

For details see [Device management & connectivity > Protocol integration](/protocol-integration/).


### Digital twin {#digital-twin}

A digital twin is a digital representation of physical or virtual assets. Devices, sensors and tools are examples of physical assets, virtual assets can for example be processes or rules. In {{< product-c8y-iot >}} they are represented as [managed objects](/glossary/m/#managed-object).
