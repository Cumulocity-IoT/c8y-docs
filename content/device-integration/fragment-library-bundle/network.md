---
weight: 140
title: Network
layout: bundle
sector: 
  - device_management
---

The **Network** tab displays network information. It is shown if the ```c8y_Network``` fragment is present in the device managed object. There are three subsections: WAN, LAN and DHCP. Each of these can be activated by the nested fragments ```c8y_ WAN```, ```c8y_LAN```, and ```c8y_DHCP``` respectively.

#### Network status {#network-status}

Devices may announce their current local network status and configuration to the platform using the ```c8y_Network``` fragment in the device's own managed object.

```http
PUT /inventory/managedObjects/<deviceId>
```
```json
{
   "c8y_Network": {
       "c8y_LAN": {
           "netmask": "255.255.255.0",
           "ip": "192.168.128.1",
           "name": "br0",
           "enabled": 1,
           "mac": "00:60:64:dd:a5:c3"
       },
       "c8y_WAN": {
           "password": "user-password",
           "simStatus": "SIM OK",
           "authType": "chap",
           "apn": "example.apn.com",
           "username": "test"
       },
       "c8y_DHCP": {
           "dns2": "1.1.1.1",
           "dns1": "8.8.8.8",
           "domainName": "my.domain",
           "addressRange": {
               "start": "192.168.128.100",
               "end": "192.168.128.199"
           },
           "enabled": 1
       }
   }
}
```

<table>
<colgroup>
<col width="25%">
<col width="10%">
<col width="10%">
<col width="55%">
</colgroup>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Mandatory</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>c8y_LAN</td>
<td>object</td>
<td>No</td>
<td>Optional nested object containing local network information</td>
</tr>
<tr>
<td>c8y_LAN.netmask</td>
<td>string</td>
<td>No</td>
<td>Subnet mask configured for the network interface</td>
</tr>
<tr>
<td>c8y_LAN.ip</td>
<td>string</td>
<td>No</td>
<td>IP address configured for the network interface</td>
</tr>
<tr>
<td>c8y_LAN.name</td>
<td>string</td>
<td>No</td>
<td>Identifier for the network interface</td>
</tr>
<tr>
<td>c8y_LAN.enabled</td>
<td>integer</td>
<td>No</td>
<td>Indicator showing if the interface is enabled or not</td>
</tr>
<tr>
<td>c8y_LAN.mac</td>
<td>string</td>
<td>No</td>
<td>MAC address of the network interface</td>
</tr>
<tr>
<td>c8y_WAN</td>
<td>object</td>
<td>No</td>
<td>Optional nested object describing mobile internet connectivity interface status</td>
</tr>
<tr>
<td>c8y_WAN.password</td>
<td>string</td>
<td>No</td>
<td>SIM connectivity password</td>
</tr>
<tr>
<td>c8y_WAN.simStatus</td>
<td>string</td>
<td>No</td>
<td>SIM connection status</td>
</tr>
<tr>
<td>c8y_WAN.authType</td>
<td>string</td>
<td>No</td>
<td>Auth type used by the SIM connectivity</td>
</tr>
<tr>
<td>c8y_WAN.apn</td>
<td>string</td>
<td>No</td>
<td>APN used for internet access</td>
</tr>
<tr>
<td>c8y_WAN.username</td>
<td>string</td>
<td>No</td>
<td>SIM connectivity username</td>
</tr>
<tr>
<td>c8y_DHCP</td>
<td>object</td>
<td>No</td>
<td>Optional nested object containing information for DHCP server status</td>
</tr>
<tr>
<td>c8y_DHCP.dns1</td>
<td>string</td>
<td>No</td>
<td>First configured DNS server</td>
</tr>
<tr>
<td>c8y_DHCP.dns2</td>
<td>string</td>
<td>No</td>
<td>Second configured DNS server</td>
</tr>
<tr>
<td>c8y_DHCP.domainName</td>
<td>string</td>
<td>No</td>
<td>Domain name</td>
</tr>
<tr>
<td>c8y_DHCP.addressRange.start</td>
<td>string</td>
<td>No</td>
<td>Start of address range assigned to DHCP clients</td>
</tr>
<tr>
<td>c8y_DHCP.addressRange.end</td>
<td>string</td>
<td>No</td>
<td>End of address range assigned to DHCP clients</td>
</tr>
<tr>
<td>c8y_DHCP.enabled</td>
<td>integer</td>
<td>No</td>
<td>Indicator showing if the DHCP server is enabled or not</td>
</tr>
</tbody>
</table>


### Setting network configuration {#setting-network-configuration}

If the device contains the ```c8y_Network``` operation in its ```c8y_SupportedOperations``` users may also update a device's network configuration in the **Network** tab. The changed configuration is sent as ```c8y_Network``` operation with a very similar fragment as also present in the device managed object. The ```c8y_Network``` fragment within this operation may contain one or more of its nested fragments.

```json
{
   "c8y_Network": {
       "c8y_LAN": {
           "netmask": "255.255.255.0",
           "ip": "192.168.128.1",
           "enabled": 1
       },
       "c8y_WAN": {
           "password": "user-password",
           "authType": "chap",
           "apn": "example.apn.com",
           "username": "ee"
       },
       "c8y_DHCP": {
           "dns2": "1.1.1.1",
           "dns1": "8.8.8.8",
           "domainName": "my.domain",
           "addressRange": {
               "start": "192.168.128.100",
               "end": "192.168.128.199"
           },
           "enabled": 1
       }
   }
}
```


|Name|Type|Mandatory|Description|
|----|----|----|----|
|c8y_LAN|object|No|Optional nested object containing local network information|
|c8y_LAN.netmask|string|Yes|Subnet mask configured for the network interface|
|c8y_LAN.ip|string|Yes|IP address configured for the network interface|
|c8y_LAN.enabled|integer|Yes|Indicator showing if the interface is enabled or not|
|c8y_WAN|object|No|Optional nested object describing mobile internet connectivity interface status|
|c8y_WAN.password|string|Yes|SIM connectivity password|
|c8y_WAN.authType|string|Yes|Auth type used by the SIM connectivity|
|c8y_WAN.apn|string|Yes|APN used for internet access|
|c8y_WAN.username|string|Yes|SIM connectivity username|
|c8y_DHCP|object|No|Optional nested object containing information for DHCP server status|
|c8y_DHCP.dns1|string|No|First configured DNS server|
|c8y_DHCP.dns2|string|No|Second configured DNS server|
|c8y_DHCP.domainName|string|No|Domain name|
|c8y_DHCP.addressRange.start|string|No|Start of address range assigned to DHCP clients|
|c8y_DHCP.addressRange.end|string|No|End of address range assigned to DHCP clients|
|c8y_DHCP.enabled|integer|No|Indicator showing if the DHCP server is enabled or not|

The device is expected to perform the following actions:

1. Set operation status to EXECUTING
2. Apply WAN, LAN, and DHCP configuration
3. Set new network configuration status the device managed object
4. Set operation status to SUCCESSFUL

Changes to the network configuration potentially impact the device’s ability to connect to the {{< product-c8y-iot >}} platform. We recommend you to implement a connection test with the new settings. If the test fails the device should rollback the settings to their previous state and set the operation status to FAILED.

**SmartREST example**

There are no static templates available for populating the network fragment or receiving network operations. A custom template can be used instead:

```
10,100,PUT,INVENTORY,false,c8y_Network.c8y_LAN.name,STRING,,c8y_Network.c8y_LAN.ip,STRING,,c8y_Network.c8y_LAN.netmask,STRING,,c8y_Network.c8y_LAN.mac,STRING,,c8y_Network.c8y_LAN.enabled,STRING,,c8y_Network.c8y_WAN.simStatus,STRING,,c8y_Network.c8y_WAN.apn,STRING,,c8y_Network.c8y_WAN.username,STRING,,c8y_Network.c8y_WAN.password,STRING,,c8y_Network.c8y_WAN.authType,STRING,,c8y_Network.c8y_DHCP.addressRange.start,STRING,,c8y_Network.c8y_DHCP.addressRange.end,STRING,,c8y_Network.c8y_DHCP.domainName,STRING,,c8y_Network.c8y_DHCP.dns1,STRING,,c8y_Network.c8y_DHCP.dns2,STRING,,c8y_Network.c8y_DHCP.enabled,STRING,
```

```
11,200,,c8y_Network.c8y_WAN,c8y_Network.c8y_WAN.apn,c8y_Network.c8y_WAN.username,c8y_Network.c8y_WAN.password,c8y_Network.c8y_WAN.authType
```

```
11,201,,c8y_Network.c8y_LAN,c8y_Network.c8y_LAN.ip,c8y_Network.c8y_LAN.netmask,c8y_Network.c8y_LAN.enabled
```

```
11,202,,c8y_Network.c8y_DHCP,c8y_Network.c8y_DHCP.addressRange.start,c8y_Network.c8y_DHCP.addressRange.end,c8y_Network.c8y_DHCP.domainName,c8y_Network.c8y_DHCP.dns1,c8y_Network.c8y_DHCP.dns2,c8y_Network.c8y_DHCP.enabled
```

The example custom template provides the 100 template for the device to upload its current network configuration completely. At device agent startup and each time a change is detected this template should be used to synchronize the information in the cloud with the local truth.

The example template also provides three response templates to receive the three different nested fragments as operations. Each response template may be handled separately.

**WAN**

1. Receive WAN configuration operation<br>
  `200,example.apn.com,user,secret,chap`
2. Set operation status to EXECUTING<br>
  `501,c8y_Network`
3. Apply WAN configuration
4. Update device’s network configuration in inventory<br>
  `100,br0,192.168.128.1,255.255.255.0,00:60:64:dd:a5:c3,1,SIM OK,example.apn.com,user,secret,chap,192.168.128.100,192.168.128.199,my.domain,8.8.8.8,1.1.1.1,1`
5. Set operation status to SUCCESSFUL<br>
  `503,c8y_Network`

**LAN**

1. Receive LAN configuration operation<br>
  `201,192.168.128.2,255.255.255.0,1`
2. Set operation status to EXECUTING<br>
  `501,c8y_Network`
3. Apply LAN configuration
4. Update device’s network configuration in inventory<br>
  `100,br0,192.168.128.2,255.255.255.0,00:60:64:dd:a5:c3,1,SIM OK,example.apn.com,user,secret,chap,192.168.128.100,192.168.128.199,my.domain,8.8.8.8,1.1.1.1,1`
5. Set operation status to SUCCESSFUL<br>
  `503,c8y_Network`

**DHCP**

1. Receive DHCP configuration operation<br>
  `202,192.168.128.150,192.168.128.199,my.other.domain,1.1.1.1,8.8.8.8,1`
2. Set operation status to EXECUTING<br>
  `501,c8y_Network`
3. Apply DHCP configuration
4. Update device’s network configuration in inventory<br>
  `100,br0,192.168.128.1,255.255.255.0,00:60:64:dd:a5:c3,1,SIM OK,example.apn.com,user,secret,chap,192.168.128.150,192.168.128.199,my.other.domain,1.1.1.1,8.8.8.8,1`
5. Set operation status to SUCCESSFUL<br>
  `503,c8y_Network`
