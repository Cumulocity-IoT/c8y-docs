---
title: Create and read measurements
description: Create a measurement for a device, query the measurements of a device by time range, type, and series, read the values of its series, and delete the measurements of a device.
weight: 210
requires:
  - authentication
api:
  - operation: postMeasurementCollectionResource
    method: POST
    path: /measurement/measurements
    title: Create a measurement
  - operation: getMeasurementCollectionResource
    method: GET
    path: /measurement/measurements
    title: Retrieve all measurements
  - operation: getMeasurementSeriesResource
    method: GET
    path: /measurement/measurements/series
    title: Retrieve a list of series and their values
  - operation: getMeasurementResource
    method: GET
    path: /measurement/measurements/{id}
    title: Retrieve a specific measurement
  - operation: deleteMeasurementCollectionResource
    method: DELETE
    path: /measurement/measurements
    title: Remove measurement collections
---

A measurement is a numeric value that a device reads at a point in time, for example the temperature of a sensor. Each measurement belongs to a source device and has a `type` and a `time`. Its values are in fragments that contain one or more series:

```json
"c8y_TemperatureMeasurement": {
  "T": { "value": 21.5, "unit": "C" }
}
```

In this example, `c8y_TemperatureMeasurement` is the fragment and `T` is the series. The following rules apply:

* Each series needs a `value`, which must be a number.
* The `unit` is optional. If you send it, it must be a non-empty string.
* Fragment and series names contain no spaces and none of the characters `. , * [ ] ( ) @ $`.
* The platform drops series with a value that is not a number, such as a boolean, a string, or a list. If a fragment contains only such series, the platform keeps the fragment as a plain property, not as a series. In both cases, the request still returns HTTP 201.

The **Measurements** tab of a device shows one chart per fragment, see [Measurements](/device-management-application/viewing-device-details/#measurements). Some requests behave differently if your tenant uses [enhanced time series support](/standard-tenant/enhanced-time-series-support/) for measurements. The procedures mention these differences.

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To create and delete measurements: ROLE_MEASUREMENT_ADMIN
* To read measurements: ROLE_MEASUREMENT_READ
{{< /c8y-admon-req >}}

The examples use `<device_id>` for the ID of the device, and `<date_from>` and `<date_to>` for the start and the end of a time range. Write times in ISO 8601 format with a time zone, for example `2026-09-01T08:30:00.000Z`. In a query string, encode `+` as `%2B`.

### To create a measurement {#to-create-a-measurement}

Send a [Create a measurement](https://{{< domain-c8y >}}/api/core/#operation/postMeasurementCollectionResource) request:

```http
POST /measurement/measurements
Content-Type: application/json
Accept: application/json

{
  "source": { "id": "<device_id>" },
  "time": "2026-09-01T08:30:00.000Z",
  "type": "c8y_TemperatureMeasurement",
  "c8y_TemperatureMeasurement": {
    "T": { "value": 21.5, "unit": "C" }
  }
}
```

The properties `source`, `time`, and `type` are mandatory. The platform returns HTTP 201 and the measurement with its `id`. Check that the response contains the series that you sent. A missing series had a value that is not a number.

If the platform returns HTTP 422, the measurement has no `source`, `time`, or `type`.

To create several measurements in one request, send them in a `measurements` array with the header `Content-Type: application/vnd.com.nsn.cumulocity.measurementcollection+json`.

### To query the measurements of a device {#to-query-the-measurements-of-a-device}

Send a [Retrieve all measurements](https://{{< domain-c8y >}}/api/core/#operation/getMeasurementCollectionResource) request with filters:

```http
GET /measurement/measurements?source=<device_id>&dateFrom=<date_from>&dateTo=<date_to>&valueFragmentType=c8y_TemperatureMeasurement&valueFragmentSeries=T&pageSize=2000
```

You can filter by `source`, `dateFrom`, `dateTo`, `type`, `valueFragmentType`, and `valueFragmentSeries`. All filters are optional and must all match. `dateFrom` is inclusive, and `dateTo` is exclusive.

The platform returns HTTP 200 and the matching measurements in the `measurements` array. A page contains at most 2000 measurements. To read the next page, follow the `next` link of the response.

For a time range query, the default order depends on the tenant: newest measurements first with enhanced time series support, oldest first without. `revert=true` sorts the newest first, and `revert=false` the oldest first. If the order matters to you, sort the measurements by their `time` property after you receive them.

### To read the values of a series {#to-read-the-values-of-a-series}

Send a [Retrieve a list of series and their values](https://{{< domain-c8y >}}/api/core/#operation/getMeasurementSeriesResource) request:

```http
GET /measurement/measurements/series?source=<device_id>&dateFrom=<date_from>&dateTo=<date_to>&series=c8y_TemperatureMeasurement.T
```

The parameters `source`, `dateFrom`, and `dateTo` are mandatory. If one of them is missing, the platform returns HTTP 400. The `series` parameter is optional and has the form `<fragment>.<series>`. Repeat it to read several series. Without it, the platform returns all series of the device.

The platform returns HTTP 200 and the following properties:

* `series`: The series in the response, each with its `name`, `type`, and `unit`.
* `values`: One entry per point in time. Each entry is an array of `min` and `max` pairs, one pair for each element of `series`, in the same order. Without aggregation, `min` and `max` are equal.
* `truncated`: `true` if the time range has more than 5000 values and the platform cut off the rest.

To aggregate the values, add one of the following parameters:

* With enhanced time series support: `aggregationInterval`, a number from 1 to 999 followed by a unit, such as `12h` or `7d`. The units are `s`, `m`, `h`, `d`, `w`, `M`, `q`, and `y`. To calculate other functions than `min` and `max`, also add `aggregationFunction`, for example `aggregationFunction=avg`. Without `aggregationInterval`, `aggregationFunction` causes HTTP 400.
* Without enhanced time series support: `aggregationType` with the value DAILY, HOURLY, or MINUTELY.

### To read a measurement by its ID {#to-read-a-measurement-by-its-id}

Send a [Retrieve a specific measurement](https://{{< domain-c8y >}}/api/core/#operation/getMeasurementResource) request:

```http
GET /measurement/measurements/<measurement_id>
```

`<measurement_id>` is the `id` that the platform returned when it created the measurement. The platform returns HTTP 200 and the measurement.

With enhanced time series support, you cannot read a measurement by its ID, and the request fails, for example with HTTP 405. Query the measurements instead, see [To query the measurements of a device](#to-query-the-measurements-of-a-device). Without enhanced time series support, HTTP 404 means that the measurement does not exist.

### To delete the measurements of a device {#to-delete-the-measurements-of-a-device}

{{< c8y-admon-caution >}}
This request deletes all measurements that match its filters. You cannot restore them.
{{< /c8y-admon-caution >}}

Send a [Remove measurement collections](https://{{< domain-c8y >}}/api/core/#operation/deleteMeasurementCollectionResource) request:

```http
DELETE /measurement/measurements?source=<device_id>
```

The request needs at least one of the filters `source`, `dateFrom`, and `dateTo`. With enhanced time series support, `dateFrom` and `dateTo` must be full hours, for example `2026-09-01T14:00:00.000Z`.

The platform returns HTTP 204. The deletion is asynchronous: the platform can respond before it deleted all measurements, so a query can still return some of them for a short time. When you delete a device, the platform deletes its measurements as well.
