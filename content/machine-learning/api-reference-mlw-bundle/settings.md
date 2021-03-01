---
title: Settings
layout: redirect
weight: 15


aliases:
  - /machine-learning/api-reference-mlw/#settings
---

Operations on MLW settings.

>**Info:** An active subscription of the MLW microservice is required to perform operations.

### GET - Get AWS S3 credentials from Cumulocity

```
{{url}}/service/mlw/credentials
```

Fetches the AWS S3 credentials information.

|HEADERS||
|:---|:---|
|Authorization|{{auth}}


**Example Request**

```
200 - OK

curl --location --request GET '{{url}}/service/mlw/credentials' \
--header 'Authorization: {{auth}}'
```

**Example Response**

```
200 - OK

{
    "data": {
        "accessKey": "AKIA4CCIEY3EHS3VHU5Q",
        "secretKey": "*******"
    }
}
```

**Example Request**

```
401 - Unauthorized

curl --location --request GET '{{url}}/service/mlw/credentials' 
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

### POST - Register AWS S3 Credentials with Cumulocity

```
{{url}}/service/mlw/credentials
```

Registers the AWS S3 credentials information with Cumulocity.

|HEADERS||
|:---|:---|
|Authorization|{{auth}}


|PARAMS||
|:---|:---|
|accessKey (string)|{{Access Key}}
|secretKey (string)|{{Secret Key}}
|type (string)| AWS


**Example Request**

```
200 - OK

curl --location --request POST '{{url}}/service/mlw/credentials?type=AWS' \
--header 'Authorization: {{auth}}' \
--data-raw '{
    "accessKey": "AKIA4CCIEY3EHS3VHU5Q",
    "secretKey": "Ddsm****************"}'
```

**Example Response**

```
200 - OK

{
    "message": "Success"
}
```

**Example Request**

```
401 - Unauthorized

curl --location --request POST '{{url}}/service/mlw/credentials?type=AWS' \
--data-raw '{
    "accessKey": "AKIA4CCIEY3EHS3VHU5Q",
    "secretKey": "Ddsm****************"}'
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
409 - Conflict

curl --location --request POST '{{url}}/service/mlw/credentials?type=AWS' \
--header 'Authorization: {{auth}}'
```

**Example Response**

```
409 - Conflict

{
    "message": "Missing Parameters. Please provide complete info",
    "errorCode": 409,
    "exception": "Missing Parameters"
}
```

### DELETE - Delete AWS S3 credentials from Cumulocity

```
{{url}}/service/mlw/credentials
```

Deletes the AWS S3 credentials information from Cumulocity.

|HEADERS||
|:---|:---|
|Authorization|{{auth}}


|PARAMS||
|:---|:---|
|type (string)| AWS


**Example Request**

```
200 - OK

curl --location --request DELETE '{{url}}/service/mlw/credentials?type=AWS' \
--header 'Authorization: {{auth}}'
```

**Example Response**

```
200 - OK

{
    "message": "Success"
}
```

**Example Request**

```
401 - Unauthorized

curl --location --request DELETE '{{url}}/service/mlw/credentials?type=AWS' 
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
409 - Missing query parameter

curl --location --request DELETE '{{url}}/service/mlw/credentials' \
--header 'Authorization: {{auth}}'
```

**Example Response**

```
409 - Missing query parameter

{
    "message": "Missing query parameter ('type')",
    "errorCode": 409,
    "exception": "Missing query parameter"
}
```