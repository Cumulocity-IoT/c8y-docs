---
weight: 50
title: Using SmartREST with multiple X-Ids
layout: redirect
---

SmartREST supports sending of messages for different X-Ids within the same request. In this case the X-Id header mustn't be used but instead the body will contain additional information about which lines belong to which X-Id.

### Sending messages {#sending-messages}

To indicate the X-Id in the body it is possible to include the following line

	15,myxid

All following lines will be handled with the given X-Id until you enter the next X-Id line.

	15,myxid1
	...
	...
	15,myxid2
	...

### Receiving messages {#receiving-messages}

When sending with multiple X-Ids the response also can contain responses from multiple X-Ids. The response will contain an additional line that will indicate which X-Id the following lines are from.
The second value in this line indicates how many lines are following from this X-Id.

	87,2,myxid1
	...
	...
	87,1,myxid2
	...

### Checking if templates are registered {#checking-if-templates-are-registered}

You can check if templates are already existing by just include X-Id lines in the body.

	15,myxid1
	15,myxid2
	15,myxid3
	15,myxid4

You will get the same response like described in the registration process but for every line.

	20,12345
	20,12346
	40,"No template for this X-ID."
	20,12347

### Registering templates {#registering-templates}

Template registration also supports the use of the X-Id in the body. Therefore you can create multiple in a single request.

	15,myxid1
	10,100,POST,/inventory/managedObjects,application/vnd.com.nsn.cumulocity.managedObject+json,application/vnd.com.nsn.cumulocity.managedObject+json,,,"{""name"":""Test Device"",""type"":""com_example_TestDevice"",""c8y_IsDevice"":{}}"
	11,201,,"$.c8y_IsDevice","$.id"
	15,myxid2
	10,100,POST,/inventory/managedObjects,application/vnd.com.nsn.cumulocity.managedObject+json,application/vnd.com.nsn.cumulocity.managedObject+json,,,"{""name"":""Test Device"",""type"":""com_example_TestDevice"",""c8y_IsDevice"":{}}"
	11,201,,"$.c8y_IsDevice","$.id"
