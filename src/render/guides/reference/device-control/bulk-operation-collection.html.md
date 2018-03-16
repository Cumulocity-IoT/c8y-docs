---
order: 60
title: Bulk operation collection
layout: redirect
---

### BulkOperationCollection [application/vnd.com.nsn.cumulocity.bulkOperationCollection+json]

|Name|Type|Occurs|Description|
|:---|:---|:-----|:----------|
|self|URL|1|Link to this resource.|
|bulkOperations|Operations|0..n|List of bulk operations, see below.|
|statistics|PagingStatistics|1|Information about paging statistics.|
|prev|URI|0..1|Link to a potential previous page of bulk operations.|
|next|URI|0..1|Link to a potential next page of bulk operations.|

### POST - Create a Bulk Operation

Request body: Bulk Operation

Response body: Bulk Operation

Required role: ROLE\_BULK\_OPERATION\_ADMIN

Example Request:

    POST /devicecontrol/bulkoperations
    Content-Type: application/vnd.com.nsn.cumulocity.bulkOperation+json
    Accept: application/vnd.com.nsn.cumulocity.bulkOperation+json
    Authorization: Basic ...
    {
     "operationPrototype":{
       "description": "Restart device",
       "c8y_Restart": {}
     },
     "creationRamp":45,
     "groupId":"10205",
     "startDate":"2015-05-01T22:21:22"
    }

Example response:

    HTTP/1.1 201 Created
    Location: <<URL of new operation>>
    Content-Type: application/vnd.com.nsn.cumulocity.bulkOperation+json

    {
     "id":2,
     "self":"https://dev.cumulocity.com/devicecontrol/bulkoperations/2",
     "operationPrototype":{
       "description": "Restart device",
       "c8y_Restart": {}
     },
     "creationRamp":45,
     "groupId":"10205",
     "startDate":"2015-05-01T22:21:22"
     "progress":
       {
       "pending":0, "failed":0, "executing":0, "successful":0, "all":1
       },
     "status":"ACTIVE"
    }

### Get a collection of bulk operations

Request body: N/A

Response body: BulkOperationCollection  

Required role: ROLE\_BULK\_OPERATION\_READ

Example Request: Get all bulk operations.

    GET /devicecontrol/bulkoperations
    Accept: application/vnd.com.nsn.cumulocity.bulkOperationCollection+json
    Authorization: Basic ...

Example Response:

    HTTP/1.1 200 OK
    Content-Type: application/vnd.com.nsn.cumulocity.bulkOperationCollection+json
    Content-Length: ...
    {
      "self" : "<<This BulkOperationCollection URL>>",
      "bulkOperations" : [
        {
         "id":2,
         "self":"https://dev.cumulocity.com/devicecontrol/bulkoperations/2",
         "operationPrototype":{
           "description": "Restart device",
           "c8y_Restart": {}
         },
         "creationRamp":45,
         "groupId":"10205",
         "startDate":"2015-05-01T22:21:22"
         "progress":
           {
            "pending":0, "failed":0, "executing":0, "successful":0, "all":1
           },
         "status":"ACTIVE",
        },
        {
         "id":3,
         "self":"https://dev.cumulocity.com/devicecontrol/bulkoperations/3",
         "operationPrototype":{
           "description": "Send Command",
           "c8y_Command": {
             "text": "Do something"
           }
         },
         "creationRamp":15,
         "groupId":"10201",
         "startDate":"2015-05-05T22:21:22"
         "progress":
           {
            "pending":0, "failed":0, "executing":0, "successful":0, "all":5
           },
         "status":"ACTIVE",
        }
      ],
      "statistics" : {
        "pageSize" : 5,
        "currentPage : 1
      }
    }

By default query bulk operations endpoint does not return CANCELLED operations. It is possible to include them in the response by adding additional query parameter: withDeleted=true.
