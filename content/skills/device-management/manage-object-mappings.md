---
title: Manage LWM2M object mappings
description: List the LWM2M object mappings of your tenant, create or replace a mapping from JSON or from a DDF file, and delete the mappings of an LWM2M object.
weight: 502
requires:
  - authentication
---

An object mapping tells the LWM2M agent how to handle the data of one LWM2M object: it contains the object model with its resources, the actions for each resource, and the actions for object instances. In the Device Management application, object mappings are the LWM2M device protocols, and they also define what the **Objects** tab of a device shows. See [LWM2M device protocols](/device-integration/lwm2m/#device-protocols).

Each mapping is a managed object of type `lwm2m_object_mapping`. Its fragment `c8y_objectmapping_ObjectMapping` has the following properties:

* `objectId`: The ID of the LWM2M object, for example `"3"` for the device object.
* `objectModel`: The object model with `id`, `name`, `description`, `mandatory`, `multiple`, and `resources`.
* `resourceMappings`: The actions for each resource, keyed by resource ID.
* `objectInstanceActions`: The actions for object instances.

You manage the mappings through the LWM2M agent. The agent works on whole mappings: when you upload JSON for an existing mapping, the agent replaces the stored fragment with the body that you send. Always send the complete mapping.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To list mappings: ROLE_INVENTORY_READ or ROLE_LWM2M_READ
* To create, replace, and delete mappings: ROLE_INVENTORY_ADMIN, ROLE_INVENTORY_CREATE, or ROLE_LWM2M_ADMIN
{{< /c8y-admon-req >}}

The examples use `<object_id>` for the ID of the LWM2M object, for example `63000`, and `<mapping_id>` for the ID of the managed object of a mapping.

### To list the object mappings {#to-list-the-object-mappings}

Send a GET request to the LWM2M agent:

```http
GET /service/lwm2m-agent/objectResourceMappings
```

The agent returns HTTP 200 and an array with all mappings of the tenant. The array is not paged. Each entry contains the `id` of the managed object, the `type` `lwm2m_object_mapping`, and the fragment `c8y_objectmapping_ObjectMapping`. An empty array means that the tenant has no mappings yet.

### To create a mapping from JSON {#to-create-a-mapping-from-json}

Send a POST request with the mapping and without a top-level `id`. The example creates a mapping for the object `<object_id>` with the name `<object_name>`, without resources and actions:

```http
POST /service/lwm2m-agent/objectResourceMappings/json
Content-Type: application/json
Accept: application/json

{
  "type": "lwm2m_object_mapping",
  "c8y_objectmapping_ObjectMapping": {
    "objectId": "<object_id>",
    "objectModel": {
      "id": "<object_id>",
      "name": "<object_name>",
      "mandatory": false,
      "multiple": true,
      "resources": {}
    },
    "resourceMappings": {},
    "objectInstanceActions": []
  }
}
```

The agent returns HTTP 201 and the mapping with its `id`, the `type` `lwm2m_object_mapping`, and the fragment `c8y_objectmapping_ObjectMapping` with your `objectId`. Note the `id` as `<mapping_id>`. To verify, list the mappings again. The array contains an entry with this `id`.

If the agent returns HTTP 400, the body is not a valid mapping, for example because of a wrong fragment name or a wrong data type of a field.

### To replace a mapping {#to-replace-a-mapping}

1. List the mappings and copy the entry with the `id` `<mapping_id>`.
2. Change the entry, for example its `resourceMappings`.
3. Send the complete entry, including `"id": "<mapping_id>"`, in a POST request to `/service/lwm2m-agent/objectResourceMappings/json`.

The agent replaces the stored fragment of the mapping with the body that you send and returns HTTP 201. Fields that you leave out are lost.

### To create mappings from a DDF file {#to-create-mappings-from-a-ddf-file}

A DDF file is the XML definition of an LWM2M object model, as provided by device manufacturers or by standards bodies such as IPSO. Upload it as multipart form data in a part named `file`:

```http
POST /service/lwm2m-agent/objectResourceMappings/ddf
Content-Type: multipart/form-data; boundary=boundary
Accept: application/json

--boundary
Content-Disposition: form-data; name="file"; filename="<ddf_file>"

<ddf_content>
--boundary--
```

The agent returns HTTP 201 and the following arrays:

* `new`: The mappings that the agent created.
* `updated`: The mappings that already existed. The agent updated their object model and kept their `resourceMappings` and `objectInstanceActions`.
* `errors`: The objects that the agent cannot store, each with `objectId` and `message`. The agent stores the entries in `new` and `updated` even if `errors` is not empty.

A mapping created from a DDF file contains the object model but no resource actions. To add actions, replace the mapping, see [To replace a mapping](#to-replace-a-mapping).

If the agent returns HTTP 422, the file is empty or cannot be parsed.

### To delete the mappings of an object {#to-delete-the-mappings-of-an-object}

Send a DELETE request with the ID of the LWM2M object:

```http
DELETE /service/lwm2m-agent/objectResourceMappings/<object_id>
```

The agent returns HTTP 204. It deletes every mapping for this LWM2M object in your tenant.
