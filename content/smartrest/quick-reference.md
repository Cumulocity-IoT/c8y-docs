---
title: MQTT quick reference
layout: bundle
sector:
  - device_management
weight: 70
---

#### Connection {#connection}

* <kbd>CONNECT d:1235:myDevice_10 acme/device_1235</kbd> \
  Connect the device with serial "1235" and default template myDevice_10 to tenant "acme" and user "device_1235".

#### Topics {#topics}

Publish

* <kbd>PUBLISH s/us</kbd> - Send a static template.
* <kbd>PUBLISH s/us/5678</kbd> - Send a static template as child "5678".
* <kbd>PUBLISH s/ud</kbd> - Send a message using the default template (myDevice_10).
* <kbd>PUBLISH s/ud/5678</kbd> - Same as above, but as child "5678".
* <kbd>PUBLISH s/uc/myCommon_10</kbd> - Send a message using myCommon_10 template.
* <kbd>PUBLISH s/uc/myCommon_10/5678</kbd> - Same as above, but as child "5678".

Subscribe

* <kbd>SUBSCRIBE s/ds</kbd> - Receive static commands.
* <kbd>SUBSCRIBE s/dd</kbd> - Receive commands using the default template (myDevice_10).
* <kbd>SUBSCRIBE s/dc/myCommon_10</kbd> - Receive commands using the myCommon_10 template.
* <kbd>SUBSCRIBE s/e</kbd> - Receive error messages.

#### Topic format {#topic-format}

`<protocol>/<direction><type>[/<template>][/<child_id>]`

where:

* `<protocol>` can be <kbd>s</kbd> (persistent), <kbd>t</kbd> (transient), <kbd>q</kbd> (quiescent) and <kbd>c</kbd> (CEP), see [Processing mode](/smartrest/smartrest-one/#processing-mode) for more information.
* `<direction>` can be <kbd>u</kbd> (upstream from the device), <kbd>d</kbd> (downstream to the device) or <kbd>e</kbd> (error).
* `<type>` can be <kbd>s</kbd> (static), <kbd>c</kbd> (custom, device-defined), <kbd>d</kbd> (default), <kbd>t</kbd> (template) or <kbd>cr</kbd> (credentials).

#### Device registration {#device-registration}

* <kbd>CONNECT 1234 management/devicebootstrap</kbd>
* <kbd>SUBSCRIBE s/dcr</kbd>
* <kbd>PUBLISH s/ucr</kbd>
* <kbd>PUBLISH s/ucr</kbd>
* <kbd>...</kbd>
* <kbd>70,tenant,username,password<kbd>

#### Template registration {#template-registration}

* <kbd>PUBLISH s/ut/myCommon_10</kbd>
* <kbd>10,999,POST,MEASUREMENT,,c8y_MyMeasurement;;c8y_MyMeasurement.M.value,NUMBER,...</kbd>
  10,msgId,api,method,response,type,time,custom1.path,custom1,type,custom1.value

#### Templates {#templates}

See the [templates quick reference](/smartrest/mqtt-static-templates) for an overview of the available MQTT static templates.
