---
weight: 80
title: Device protocols
layout: redirect
---

A data source represents a machine or a simulator. You define the data source and its tags in the web interface. This example uses the Modbus simulator, so you do not need a PLC.

### To add a data source {#to-add-a-data-source}

1. Open **Data source** and click the large plus button.
2. Enter the name “plc01”, select **MODBUS Ethernet**, and click the check mark. The check mark stays disabled until you enter a name.
3. Click the cog wheel of “plc01”. Under **Simulation**, select a simulation type, for example **Sinus**, and click the check mark.
4. Open **Tag**, click the green plus, click **Tag**, enter the name “temperature”, and click the check mark.
5. Click **Save**, and start the data source with the play button.

![Data source](/images/device-protocols/protocol-gateway/gateway-datasource.png)

![Tag](/images/device-protocols/protocol-gateway/gateway-tag.png)

The tag is a holding register at address 1 by default. Protocol Gateway lists it as “40001”. To use a real PLC, leave **Simulation** at **None**, enter the IP address of the PLC, and define tags with its register addresses. For each machine, create one data source.
