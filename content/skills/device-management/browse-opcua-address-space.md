---
title: Browse the address space of an OPC UA server
description: Scan the address space of an OPC UA server with the gateway, then read nodes, list their children, follow browse paths, and search the stored address space.
when: "the user wants to scan, browse, or search the nodes of an OPC UA server that is connected to an OPC UA gateway"
weight: 610
requires:
  - authentication
api:
  - operation: postOperationCollectionResource
    method: POST
    path: /devicecontrol/operations
    title: Create an operation
  - operation: getOperationResource
    method: GET
    path: /devicecontrol/operations/{id}
    title: Retrieve a specific operation
---

The OPC UA gateway scans the address space of an OPC UA server and stores a copy of it in {{< product-c8y-iot >}}. The OPC UA management service provides endpoints to browse this copy, see [Address space resources](/device-integration/opcua/#address-space-resources). Do not read the stored inventory objects directly, because their structure can change. Use the endpoints of the management service instead.

You start a scan with an operation for the OPC UA server, which the gateway executes. Browsing needs no running gateway: you can browse all nodes that an earlier scan stored.

Note the following rules for the browse requests:

* URL-encode the values of the `nodeId` and `browsePath` query parameters, for example `i=84` as `i%3D84`.
* The root node of the address space is `i=84`.
* By default, node IDs in the result use the namespace index, for example `ns=2;s=Cumulocity`. To get the namespace URI instead, add `withUri=true`.

Requests to the OPC UA management service go to `/service/opcua-mgmt-service`. Your tenant must be subscribed to the "opcua-mgmt-service" microservice. Otherwise, the requests return HTTP 403 with the error `Microservice/Access Denied`.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To scan the address space: ROLE_DEVICE_CONTROL_ADMIN
* To follow the scan: ROLE_DEVICE_CONTROL_READ
* To browse and search the address space: ROLE_OPCUA_SERVICE_READ
{{< /c8y-admon-req >}}

The examples use `<server_id>` for the managed object ID of the OPC UA server, `<node_id>` for the URL-encoded ID of a node, and `<operation_id>` for the ID of the scan operation. To find the ID of a server, see [Manage the OPC UA servers of a gateway](/skills/device-management/manage-opcua-gateway-and-servers/#to-list-the-servers-of-a-gateway).

### To scan the address space {#to-scan-the-address-space}

The gateway scans the address space automatically when it connects to a server for the first time, unless `autoScanAddressSpace` is `false`. Scan it again when the address space of the server changes. If the nodes are already stored, continue with [To read a node](#to-read-a-node).

{{< c8y-admon-caution >}}
A full scan reads the whole address space of the server. Depending on its size and on the speed of the server, this can take from minutes to days. Scan only the nodes that you need.
{{< /c8y-admon-caution >}}

Send a [Create an operation](https://{{< domain-c8y >}}/api/core/#operation/postOperationCollectionResource) request for the server:

```http
POST /devicecontrol/operations
Content-Type: application/json
Accept: application/json

{
  "deviceId": "<server_id>",
  "description": "Import address space from node ns=3;i=1005",
  "c8y_ua_command_ScanAddressSpace": {
    "nodeIds": ["ns=3;i=1005"],
    "skipSync": false
  }
}
```

The fragment `c8y_ua_command_ScanAddressSpace` has the following properties:

* `nodeIds`: The nodes to start the scan from. The gateway scans the address space below these nodes and also stores their ancestor nodes. Without `nodeIds`, the gateway scans the full address space, starting from the root node.
* `skipSync`: If `true`, the gateway learns the address space again but does not store the nodes in {{< product-c8y-iot >}}. The default is `false`.

Do not check the `c8y_SupportedOperations` fragment of the server before you send the operation. The gateway does not list its OPC UA operations there.

The platform returns HTTP 201 and the operation with its `id` and `"status": "PENDING"`. Note the `id` as `<operation_id>`. If the platform returns HTTP 422, `<server_id>` is not the ID of an existing device.

See [Scanning the address space](/device-integration/opcua/#scanning-the-address-space) for details.

### To follow the scan {#to-follow-the-scan}

Send a [Retrieve a specific operation](https://{{< domain-c8y >}}/api/core/#operation/getOperationResource) request:

```http
GET /devicecontrol/operations/<operation_id>
```

Repeat the request until the `status` is SUCCESSFUL or FAILED, as described in [Send an operation to a device](/skills/device-management/send-operation/#to-follow-the-status-of-the-operation). If the status is FAILED, the `failureReason` describes why.

If the operation stays PENDING, no gateway executes operations for the server, for example because the gateway is offline. You can still browse the nodes of an earlier scan. To cancel the scan, see [To cancel a pending operation](/skills/device-management/send-operation/#to-cancel-a-pending-operation).

### To read a node {#to-read-a-node}

Send a request to the OPC UA management service, see [Get an address space node by ID](/device-integration/opcua/#get-an-address-space-node-by-id):

```http
GET /service/opcua-mgmt-service/servers/<server_id>/address-spaces/get?nodeId=<node_id>
```

The service returns HTTP 200 and the node with the following properties:

* `nodeId`, `browseName`, `displayName`, and `description`: The identification of the node.
* `nodeClassName`: The node class, for example `Object`.
* `references`: The references to other nodes, each with its `targetId`, `referenceLabel`, and `hierarchical` flag.
* `absolutePaths`: The browse paths from the root node to this node.
* `ancestorNodeIds`: The IDs of the ancestor nodes.

If the service returns HTTP 404, the server does not exist, or no scan stored this node. Check the server ID, and [scan the address space](#to-scan-the-address-space). If it returns HTTP 400 with the error "Could not parse an OPC UA nodeId", the node ID is not valid.

### To list the children of a node {#to-list-the-children-of-a-node}

Send a request to the OPC UA management service, see [Get children of a given node](/device-integration/opcua/#get-children-of-a-given-node):

```http
GET /service/opcua-mgmt-service/servers/<server_id>/address-spaces/children?nodeId=<node_id>
```

The service returns HTTP 200 and an array of the child nodes, with the same properties as a single node. An empty array means that the node has no children. The errors are the same as for [reading a node](#to-read-a-node).

To walk through the address space, start with the root node `i%3D84` and list the children of each node that you are interested in.

### To browse along a browse path {#to-browse-along-a-browse-path}

Send a request to the OPC UA management service, see [Browse a node](/device-integration/opcua/#browse-a-node):

```http
GET /service/opcua-mgmt-service/servers/<server_id>/address-spaces/browse?nodeId=i%3D84&browsePath=Objects
```

The request has the following query parameters:

* `browsePath`: The path from the start node to the target node. Mandatory. For a path with several segments, repeat the parameter once per segment, for example `browsePath=L1&browsePath=L2`.
* `nodeId`: The node to start from. The default is the root node `i=84`.

The service returns HTTP 200 and an array of the nodes at the end of the path. If the array is empty, no node matches the path. Compare the segments with the `browseName` values of the children, which contain the namespace index, for example `2:Dynamic`.

### To search the address space {#to-search-the-address-space}

Send a request to the OPC UA management service with the text to search for:

```http
GET /service/opcua-mgmt-service/servers/<server_id>/search?query=<search_text>
```

The service returns HTTP 200 and an array of the nodes that match `<search_text>`. If it returns HTTP 400, the `query` parameter is missing or empty.
