---
weight: 10
title: Scope
layout: bundle
sector:
  - terms_conditions
---

Step 1: Connecting Gateway to OPCUA server
Click on the registered Gateway device and Navigate to OPC UA Server tab. Add OPCUA server details to connect gateway to OPCUA server. Specify details mentioned according to the number in the below screenshot and Save.

On Successful save, device will be created with the Server name you specified while adding server. Click on Child devices tab and you see the server device.

Click on the server device and navigate to Control page. You will that operation will be created automatically to scan the Address space. Depending on the size of the address space of the server and its response time, time taken to complete the operation depends.

Wait until the Scanning operation finishes. After the scanning is completed, verify in the Address space tab that you can see the tags.


Now you have successfully completed the step 2.

Step 2: Connect the device and its datapoints using Device protocols
Navigate to Device protocols and click Add device protocol and enter device name, description and select reference server and click Create.

In creation page, enable the protocol and add Variables as many as you want. Ideally you need to select the datapoints that belong to the device and decide how that datapoint is written to Cumulocity and select the functionality. In this example, I have selected to write the data as measurement. Click Save


Then, In Data reporting section, Mechanism will be none by default. Select Subscription, which subscribes to the mapped node. And specify the Sampling interval - This is the rate at which the server checks the data source for changes. Specify the Queue size - The size of the queue where it holds the samples before reporting. Select the Discard value. By default oldest will be selected. Select the Data change trigger - Triggers notification if node’s status, value or timestamp has changed. Select Deadband filter. By default it wil be none.

In Auto apply constraints section, select Limit device protocol to a set of servers and select the created server device. And finally, click Save.

Now the device protocol is created. After a minute or so (in the background, platform is checked if device is created or if there are any newly added device protocol or any update in the device protocol) then device gets created from the device protocol along with the measurement added in the Variable section. If alarms were mapped then alarms get created based on the values. If events were mapped then events get created.

Verify, If you are able to see the device created from device protocol and its measurement, if yes then you have successfully integrated the OPCUA server and its device to Cumulocity.

Congratulations!!!