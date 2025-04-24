---
weight: 60
title: Handling LWM2M shell commands
layout: redirect
---


In the **Shell** tab of a device, LWM2M shell commands can be performed. Each command has a different functionality. Find all available placeholders (for example "objectID", "instanceID") and commands with their respective descriptions below:

<table>
<col style="width:30%">
<col style="width:70%">
<thead>
<tr>
<th align="left">Placeholder</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">objectID</td>
<td align="left">The ID of the object.</td>
</tr>
<tr>
<td align="left">instanceID</td>
<td align="left">The ID of the instance. Some objects can have multiple instances. For example, "3300" is a temperature sensor object. Each device can have up to 10 sensors. In this case the instance ID would be 3300/1…10 depending on the sensor that you would like to focus.</td>
</tr>
<tr>
<td align="left">resourceID</td>
<td align="left">The ID of the desired resource. The resources describe the characteristics of each object. All instances of a given object have the same resources, but the value of the resources may be different.</td>
</tr>
<tr>
<td align="left">value</td>
<td align="left">The value to be written to the resource. Must be given using the type of the resource.</td>
</tr>
<tr>
<td align="left">executeparameters</td>
<td align="left">The execute parameters must conform to <i>arglist</i> ANBF syntax as described in the <a href="https://www.openmobilealliance.org/release/LightweightM2M/V1_1_1-20190617-A/OMA-TS-LightweightM2M_Core-V1_1_1-20190617-A.pdf">OMA Lightweight M2M specification (Section 6.3.5).</a></td>
</tr>
<tr>
<td align="left">Firmware version</td>
<td align="left">The current version of the firmware.</td>
</tr>
<tr>
<td align="left">Firmware url</td>
<td align="left">The URL from which the new version of the firmware will be downloaded.</td>
</tr>
<tr>
<td align="left">SER</td>
<td align="left">The supported data formats are <code>TLV</code>, <code>JSON</code>, <code>CBOR</code>, <code>TEXT</code>, <code>OPAQUE</code>, <code>SENML_JSON</code> and <code>SENML_CBOR</code>. <code>DEFAULT</code> restores the standard behavior. </td>
</tr>
<tr>
<td align="left">requestJson</td>
<td align="left">The raw CoAP request can be specified using the following JSON syntax.
<pre>
REQUEST_JSON = { 	
	"method": ${METHOD},
	"uri": ${URI},
	"contentFormat" : ${CONTENTFORMAT},
	"accept": ${ACCEPT},
	"payloadHex": ${PAYLOADHEX}
	}
METHOD = "get" | "post" | "put" | "delete" | "fetch" | "ipatch" | "patch"
URI = "/" | "[A-Fa-f0-9]" | uri | null
CONTENTFORMAT = null | "<a href="https://www.iana.org/assignments/core-parameters/core-parameters.xhtml#content-formats">IANA Content Type</a>"
ACCEPT = null | "<a href="https://www.iana.org/assignments/core-parameters/core-parameters.xhtml#content-formats">IANA Content Type</a>"
PAYLOADHEX = null | "^[A-Fa-f0-9]+$"
</pre>
</td>
</tr>
</tbody>
</table>


In the next table you will see all available commands and a brief description of their functionality.

<table>
<col style="width:40%">
<col style="width:5%">
<col style="width:55%">
<thead>
<tr>
<th align="left">Command</th>
<th align="left">Supported version</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">read /&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt;</td>
<td align="center">1.0, 1.1</td>
<td align="left">Reads a resource path.</td>
</tr>
<tr>
<td align="left">cread /&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt; [/&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt;]</td>
<td align="center">1.1</td>
<td align="left">Composite reads of one or more resource paths. The resource data from all listed resource paths will be read in a single client response.</td>
</tr>
<tr>
<td align="left">observe /&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt;</td>
<td align="center">1.0, 1.1</td>
<td align="left">Enables the observe functionality.</td>
</tr>
<tr>
<td align="left">cobserve /&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt; [/&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt;]</td>
<td align="center">1.1</td>
<td align="left">Enables composite observe functionality for one or more resource paths. The resource data from all listed resource paths will be sent to the {{< product-c8y-iot >}}'s LWM2M agent in a single client request.</td>
</tr>
<tr>
<td align="left">execute /&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt; [&lt;executeparameters&gt;]</td>
<td align="center">1.0, 1.1</td>
<td align="left">Executes a resource on the device with optional parameters.</td>
</tr>
<tr>
<td align="left">executelegacy /&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt; [&lt;STRING&gt;]</td>
<td align="center">1.0, 1.1</td>
<td align="left">Executes a resource on the device and sends the parameters as TEXT/PLAIN string. This was the behavior of the execute command in {{< product-c8y-iot >}} until version 10.15. In contrast to the regular <code>execute</code> command, <code>executelegacy</code> allows execute parameters not in line with the Lightweight M2M standard to be sent to the device.</td>
</tr>
<tr>
<td align="left">write /&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt; &lt;value&gt;</td>
<td align="center">1.0, 1.1</td>
<td align="left">Writes value to a resource on the device.</td>
</tr>
<tr>
<td align="left">cwrite /&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt; &lt;value&gt; [/&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt; &lt;value&gt;]</td>
<td align="center">1.1</td>
<td align="left">Composite writes facilitate the transmission of one or more values to LWM2M resources or resource instances on the device. The data will be written to the specified resource paths within a single request, adhering to the specified order.<br><br>
Writing multiple resource instance values directly to the corresponding resource ID is not permitted; each resource instance ID must be defined with its respective value. When writing multiple resource instance values, the resource instances will be transmitted exactly as defined in the operation, without aggregation or sorting by the resource instance ID.</td>
</tr>
<tr>
<td align="left">writep /&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt; &lt;value&gt;</td>
<td align="center">1.1</td>
<td align="left">Writes value to a resource on the device using COAP POST method.</td>
</tr>
<tr>
<td align="left">writeb /&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt; &lt;hexadecimal-string&gt; <br>
<b>OR</b> <br>
writeb /&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt; binary:&lt;binary-file-id&gt;</td>
<td align="center">1.0,1.1</td>
<td align="left">Writes binary data represented as a hex string to a resource on the device. The representation must be an even number of characters.
For example: writeb /3442/0/150 010A0B020F.<br><br>
Writes binary data to a resource on the device from a file uploaded to the {{< product-c8y-iot >}} platform. The 'binary-file-id' is the object ID that has already been uploaded to the {{< product-c8y-iot >}} platform.
Adding the prefix 'binary:' lets the agent read the file's data and write it to the device.
For example: writeb /3442/0/150 binary:12345.
</td>
</tr>
<tr>
<td align="left">cancelobservation /&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt; [/&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt;]</td>
<td align="center">1.0, 1.1</td>
<td align="left">Cancels either a single or a composite observation of the desired resources using a "reset" message. To cancel a composite observation the same list of paths must be mentioned as the composite observation was created. The list of paths is not required to be in the same order as the composite observation that was created.</td>
</tr>
<tr>
<td align="left">cancelobserve /&lt;objectID&gt;[/&lt;instanceID&gt;/&lt;resourceID&gt;]</td>
<td align="center">1.1</td>
<td align="left">Cancels a single observation of the desired path using "GET with observe option" method.</td>
</tr>
<tr>
<td align="left">cancelCompositeObserve /&lt;objectID&gt;[/&lt;instanceID&gt;/&lt;resourceID&gt;] [/&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt;]</td>
<td align="center">1.1</td>
<td align="left">Cancels a composite observation of the desired paths using "GET with observe option" method.</td>
</tr>
<tr>
<td align="left">delete /&lt;objectID&gt;/&lt;instanceID&gt;[/&lt;resourceID&gt;]</td>
<td align="center">1.0, 1.1</td>
<td align="left">Deletes a given object/instance/resource.</td>
</tr>
<tr>
<td align="left">discover /&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt;</td>
<td align="center">1.0, 1.1</td>
<td align="left">Shows all resources of the given object.</td>
</tr>
<tr>
<td align="left">create /&lt;objectID&gt; [JSON]</td>
<td align="center">1.0, 1.1</td>
<td align="left">Creates a new object. The JSON argument is optional.</td>
</tr>
<tr>
<td align="left">writeattr /&lt;objectID&gt;/&lt;instanceID&gt;/&lt;resourceID&gt; pmin=&lt;sec&gt;&pmax=&lt;sec&gt;&amp;gt=&lt;num&gt;&amp;lt=&lt;num&gt;&st=&lt;num&gt;&cancel
</td>
<td align="center">1.0, 1.1</td>
<td align="left">Writes additional attributes to the object. Typically used for conditional observes.</td>
</tr>
<tr>
<td align="left">fwupdate &lt;Firmware name&gt;;&lt;firmware version&gt;;&lt;firmware_url&gt;</td>
<td align="center">1.0, 1.1</td>
<td align="left">Updates the firmware of the agent.</td>
</tr>
<tr>
<td align="left">serialization &lt;SER&gt;</td>
<td align="center">1.0, 1.1</td>
<td align="left">Sets the data format.</td>
</tr>
<tr>
<td align="left">coap &lt;requestJson&gt;</td>
<td align="center">1.0, 1.1</td>
<td align="left">Allows a raw CoAP request to be sent to a LWM2M device. The command takes a request JSON string as a single argument. <br />
<br />
Example: <br/>

	coap {
		"method" : "get",
		"uri" : "/3/0",
		"accept" : "application/vnd.oma.lwm2m+json"}

<br />
The CoAP response data is populated into the operation response. Note that {{< product-c8y-iot >}} does not further process CoAP responses. We also recommend you to use raw CoAP requests for device interactions only in exceptional cases. Any interaction with an LWM2M device should be carried out using standard LWM2M operations.
</td>
</tr>
</tbody>
</table>

{{< c8y-admon-info >}}
A shell command can also be used to send multiple operations to a LWM2M device at once. To do that, simply enter all instructions with a line break between them. Make sure that the shell command does not carry any leading or trailing white spaces. The LWM2M agent then uses the line break to split a multi-line operation into separate LWM2M shell operations.
{{< /c8y-admon-info >}}

## Shell command lifecycle {#shell-command-lifecycle}
The handling of LWM2M shell commands follows the following lifecycle:

1. When a shell command is created the corresponding operation status is set to PENDING. This means that the corresponding CoAP request has not yet been sent to the device.
2. The {{< product-c8y-iot >}} platform processes the shell command. It sends a corresponding CoAP request to the device and updates the operation status to EXECUTING.
3. The next status update depends on the response of the device.
    - *Successful request*: In case the device signals a successful operation using a 2.XX CoAP response code, the operation result is updated and the operation status is turned to SUCCESSFUL.
    - *Failed requests*: If the CoAP request fails with a 4.XX or 5.XX error on the device, the operation is marked as FAILED. The operation result contains a possible response of the device.
    - *Not-responding*: When sending a LWM2M command to a device the {{< product-c8y-iot >}} platform is not precisely aware if the device can be reached using a UDP datagram. If the request times out {{< product-c8y-iot >}} assumes that there is no connectivity. It puts the operation back to PENDING. A redelivery of the operation is triggered as soon as the device sends a registration update or a new LWM2M registration request.
4. To view the history of all operations, click the **Control** tab.

{{< c8y-admon-info >}}
If enabled, the agent will periodically look for starved operations of a tenant and fail them automatically.
Starved operations are device operations which have had a status of EXECUTING and have not been updated for a long time.
Platform administrators can configure how long such operations stay alive. This is described in the *LWM2M agent installation & operations guide*, see also [Additional resources > Installation and operations documentation](/additional-resources/more-documentation/#installation-and-operations-documentation). Contact your Operations team for further details.
{{< /c8y-admon-info >}}
