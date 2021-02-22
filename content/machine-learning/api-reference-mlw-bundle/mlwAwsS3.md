---
title: AWS S3 data pull
layout: redirect
weight: 45

aliases:
  - /machine-learning/api-reference-mlw-bundle/#mlwAwsS3
---

Operations on MLW data connectors - Download files from AWS S3.

>**Info:** An active subscription of the MLW microservice is required to perform operations.

### GET - Names of all the AWS S3 buckets

```
{{url}}/service/mlw/downloadFromS3/buckets
```

List names of all the AWS S3 buckets.

|HEADERS||
|:---|:---|
|Authorization|{{auth}}

**Example Request**

```
200 - OK

curl --location --request GET '{{url}}/service/mlw/downloadFromS3/buckets' \
--header 'Authorization: {{auth}}' \
--header 'Content-Type: application/json' 
```

**Example Response**

```
200 - OK

{
    "data": [
        {
            "id": "c8y-checkmarx-scan",
            "name": "c8y-checkmarx-scan"
        },
        {
            "id": "mlwbucket",
            "name": "mlwbucket"
        },
        {
            "id": "pmml-xsd",
            "name": "pmml-xsd"
        },
        {
            "id": "zementis-server-10504",
            "name": "zementis-server-10504"
        },
        {
            "id": "zementis.test",
            "name": "zementis.test"
        }
    ]
}
```

**Example Request**

```
401 - Unauthorized

curl --location --request GET '{{url}}/service/mlw/downloadFromS3/buckets' \
--header 'Content-Type: application/json'
```

**Example Response**

```
401 - Unauthorized

{
    "error": "general/internalError",
    "message": "No auth information found",
    "info": "https://cumulocity.com/guides/reference/rest-implementation/#error_reporting"
}
```

### GET - Names of all the files within an AWS S3 bucket

```
{{url}}/service/mlw/downloadFromS3/{{bucketName}}/files
```

Lists the names of all the files within an AWS S3 buckets.

|HEADERS||
|:---|:---|
|Authorization|{{auth}}

|PARAMS||
|:---|:---|
|bucketName (string)|{{bucket Name}}

**Example Request**

```
200 - OK

curl --location --request GET '{{url}}/service/mlw/downloadFromS3/mlwbucket/files' \
--header 'Authorization: {{auth}}' \
--header 'Content-Type: application/json' 
```

**Example Response**

```
200 - OK

{
    "data": [
        {
            "id": "ZADDrinking.png",
            "name": "ZADDrinking.png",
            "size": 78109
        },
        {
            "id": "admissions.csv",
            "name": "admissions.csv",
            "size": 17192
        },
        {
            "id": "admissionstest.json",
            "name": "admissionstest.json",
            "size": 35854
        },
        {
            "id": "casting_data.zip",
            "name": "casting_data.zip",
            "size": 72256364
        },
        {
            "id": "identationError.py",
            "name": "identationError.py",
            "size": 68
        },
        {
            "id": "mlwfiles/2ndfolder/cast_def_0_9921.png",
            "name": "mlwfiles/2ndfolder/cast_def_0_9921.png",
            "size": 10947
        },
        {
            "id": "mlwfiles/anomalySampleData.csv",
            "name": "mlwfiles/anomalySampleData.csv",
            "size": 8004
        },
        {
            "id": "mob.ipynb",
            "name": "mob.ipynb",
            "size": 48499
        }
    ]
}
```

**Example Request**

```
401 - Unauthorized

curl --location --request GET '{{url}}/service/mlw/downloadFromS3/mlwbucket/files' \
--header 'Content-Type: application/json'
```

**Example Response**

```
401 - Unauthorized

{
    "error": "general/internalError",
    "message": "No auth information found",
    "info": "https://cumulocity.com/guides/reference/rest-implementation/#error_reporting"
}
```

**Example Request**

```
404 - Error

curl --location --request GET '{{url}}/service/mlw-cdh/downloadFromS3/nomlwbucket/files' \
--header 'Authorization: {{auth}}' \
--header 'Content-Type: application/json'
```

**Example Response**

```
404 - Error

{
    "message": "The specified bucket does not exist",
    "errorCode": 404,
    "exception": "invalid/error"
}
```

### POST - Download a file from AWS S3 bucket

```
{{url}}/service/mlw/projects/{{projectID}}/resources/downloadFromS3/{{bucketName}}/download
```

Downloads the file from AWS S3 bucket.

|HEADERS||
|:---|:---|
|Authorization|{{auth}}

|PARAMS||
|:---|:---|
|projectID (string)|{{project ID}}
|bucketName (string)|{{bucket Name}}
|name (string)|required file name to download the data

**Example Request**

```
200 - OK

curl --location --request POST '{{url}}/service/mlw/projects/1613979179_Project/resources/downloadFromS3/mlwbucket/download' \
--header 'Authorization: {{auth}}' \
--header 'Content-Type: application/json' \
--data-raw '{"name":"mlwfiles/anomalySampleData.csv"}'
```

**Example Response**

```
200 - OK

{
    "id": "161399268167_Tasks",
    "name": "anomalySampleData_1613992681",
    "createdAt": "Mon Feb 22 11:18:01 2021",
    "type": "S3",
    "cronExpression": "",
    "status": "RUNNING",
    "individualTasks": {
        "161399268144_AwsS3": {
            "pID": "140239630587648",
            "status": "RUNNING",
            "type": "S3",
            "id": "161399268144_AwsS3",
            "message": "Downloading Data from S3",
            "executedAt": "Mon Feb 22 11:18:01 2021"
        }
    },
    "projectID": "1613979179_Project",
    "sortTime": 1613992681,
    "projectName": "DemoProject",
    "recurrence": "ONE_TIME",
    "startDate": "",
    "startTimeH": "",
    "startTimeM": "",
    "properties": [
        {
            "key": "file_name",
            "label": "File Name",
            "value": "anomalySampleData.csv"
        }
    ]
}
```

**Example Request**

```
401 - Unauthorized

curl --location --request POST '{{url}}/service/mlw/projects/1613979179_Project/resources/downloadFromS3/mlwbucket/download' \
--header 'Content-Type: application/json' \
--data-raw '{"name":"mlwfiles/anomalySampleData.csv"}'
```

**Example Response**

```
401 - Unauthorized

{
    "error": "general/internalError",
    "message": "No auth information found",
    "info": "https://cumulocity.com/guides/reference/rest-implementation/#error_reporting"
}
```

**Example Request**

```
409 - Error

curl --location --request POST '{{url}}/service/mlw-cdh/projects/{{projectID}}/resources/downloadFromS3/mlwbucket/download' \
--header 'Authorization: {{auth}}' \
--header 'Content-Type: application/json' \
--data-raw '{"name":"mlwfiles/anomalySampleData.csv"}'
```

**Example Response**

```
409 - Error

{
    "message": "File already exists.",
    "errorCode": 409,
    "exception": "Duplicate name"
}
```




