---
weight: 148
title: Relay
layout: redirect
---

### Relays {#relays}

A relay is a kind of binary state switch which can be in the states OPEN or CLOSED. Relays can be used for many purposes, for example to connect or disconnect the consumer power supply through a smart energy meter.
In a managed object, a relay control model includes the state of the control. When the control state changes, the inventory model should be updated to include the new state.

#### Single Relay {#single-relay}

To manage and monitor a single relay {{< product-c8y-iot >}} offers the [Relay control widget](/cockpit/widgets-collection/#relay-control).

##### Relay state {#relay-state}

Devices may announce their relay state by updating the `c8y_Relay` fragment in their managed object.

```http
PUT /inventory/managedObjects/<deviceId>
```
```json
"c8y_Relay": {
  "relayState" : "OPEN"
}
```

|Name|Type|Mandatory|Description|
|:---|:---|:--------|:----------|
|c8y_Relay.relayState|string|Yes|The relay state: "OPEN" or "CLOSED".|

##### Setting relay state {#setting-relay-state}

Devices that support changing the relay position remotely may add the `c8y_Relay` operation to `c8y_SupportedOperations`. Then users can request an update to the relay position in the [Relay control widget](/cockpit/widgets-collection/#relay-control). This creates an operation of fragment type `c8y_Relay` for the device.

The operation representation is the same as the inventory representation:

```json
"c8y_Relay": {
  "relayState" : "OPEN"
}
```

|Operation|States|Description|
|:--------|:-----|:----------|
|state|OPEN, CLOSED|OPEN commands the relay into the open position, CLOSED commands it to the closed position.|

On receiving the operation the device is expected to perform the following actions:

1. Set the operation status to EXECUTING.
2. Set the relay state.
3. Set the new relay state in its managed object.
4. Set the operation status to SUCCESSFUL.

**SmartREST example**

{{< product-c8y-iot >}} provides the 518 static response template for setting the relay state.

1. The device receives the command via the 518 static response template<br>
   `518,OPEN`
2. The device sets the operation status to EXECUTING<br>
   `501,c8y_Relay`
3. The device sets its relay state.
4. The device confirms successful execution by setting the operation status to SUCCESSFUL<br>
   `503,c8y_Relay`

#### Multiple relays {#multiple-relays}

To manage and monitor multiple relays {{< product-c8y-iot >}} offers the [Relay array control widget](/cockpit/widgets-collection/#relay-array-control).


#### Multiple relays state {#multiple-relays-state}

Devices may announce their multiple relays state by updating the `c8y_RelayArray` fragment in their managed object.

```http
PUT /inventory/managedObjects/<deviceId>
```
```json
"c8y_RelayArray" : [
  "OPEN",
  "CLOSED",
  "CLOSED",
  "OPEN"
]
```
|Name|Type|Mandatory|Description|
|:---|:---|:--------|:----------|
|c8y_RelayArray|array|Yes|Array of strings of relays states.|

#### Setting multiple relays states {#setting-multiple-relays-states}

Devices that support changing their relays positions remotely may add the `c8y_RelayArray` operation to `c8y_SupportedOperations`. Then users can request an update to the relay position in the [Relay array control widget](/cockpit/widgets-collection/#relay-array-control). This creates an operation of fragment type `c8y_RelayArray` for the device.

The operation representation is the same as the inventory representation:

```json
"c8y_RelayArray" : [
"OPEN",
"CLOSED",
"CLOSED",
"OPEN"
]
```

On receiving the operation the device is expected to perform the following actions:

1. Set the operation status to EXECUTING.
2. Set the relays states to the respective values.
3. Set the new relays states in its managed object.
4. Set the operation status to SUCCESSFUL.

**SmartREST example**

{{< product-c8y-iot >}} provides the 519 static response template:

1. The device receives the command via the 519 static response template<br>
   `519,OPEN,CLOSED,CLOSED,OPEN`
2. The device sets the operation status to EXECUTING<br>
   `501,c8y_RelayArray`
3. The device confirms successful execution by setting the operation status to SUCCESSFUL and sets the relay array state with the implicit parameters in the 503 static template<br>
   `503,c8y_RelayArray,OPEN,CLOSED,CLOSED,OPEN`
