---
title: Training WorkFlow
layout: redirect
weight: 50

aliases:
  - /machine-learning/api-reference-mlw-bundle/#workFlow
---

Training WorkFlow in MLW.

>**Info:** An active subscription of the MLW microservice is required to perform operations.

### POST - Retrain Machine Learning models using the Training WorkFlow

```
{{url}}/service/mlw/projects/{{projectID}}/resources/{{resourcesID}}/workflow
```

Trains the WorkFlow using the already created AutoML Model, pre-processing script and the dataset.

|HEADERS||
|:---|:---|
|Authorization|{{auth}}

|PARAMS||
|:---|:---|
|projectID (string)|{{project ID}}
|resourceID (string)|{{resource ID}}
|taskName (string)|required task name to start the training
|cronExpression (string)|required cron expression
|recurrence (string)|required recurrence of ONE_TIME or REPEAT

**Example Request**

```
200 - OK

curl --request POST "{{url}}/service/mlw/projects/1601355085_Project/resources/160128911974_WorkFlow/workflow" \
     --header "Authorization: {{auth}}" \
     --header "Content-Type: application/json" \
     --data-raw '{"recurrence":"ONE_TIME","cronExpression":"","taskName":"workFlowTrain"}'
```

**Example Response**

```
200 - OK

{
   "id":"160128911998_Tasks",
   "name":"workFlowTrain",
   "createdAt":"Mon Sep 28 10:31:59 2020",
   "type":"WORKFLOW",
   "sortTime":1601289119,
   "cronExpression":"",
   "status":"RUNNING",
   "individualTasks":[
      {
         "status":"RUNNING",
         "type":"WORKFLOW",
         "message":"In Progress",
         "id":"160128911974_WorkFlow",
         "projectID":"1600784593_Project",
         "tasksID":"160128911998_Tasks",
         "listOfModelAccuracy":[  
         ],
         "executedAt":"Mon Sep 28 10:31:59 2020",
         "pID":"140281294558976"
      }
   ],
   "projectID":"1600784593_Project",
   "projectName":"Demo project",
   "recurrence":"ONE_TIME",
   "startDate":"",
   "startTimeH":"",
   "startTimeM":"",
   "workflowName":"yyy",
   "properties":[
      {
         "key":"targetVar",
         "label":"Target variable",
         "value":"target"
      },
      {
         "key":"problem_type",
         "label":"Problem Type",
         "value":"Classification"
      },
      {
         "key":"dataSize",
         "label":"Data Size",
         "value":[
            "644",
            "3"
         ]
      },
      {
         "key":"model_name",
         "label":"Model Name",
         "value":"admsModel"
      }
   ]
}
```

**Example Request**

```
401 - Unauthorized

curl --request POST "{{url}}/service/mlw/projects/1601355085_Project/resources/160128911974_WorkFlow/workflow" \
     --header "Content-Type: application/json" \
     --data-raw '{"recurrence":"ONE_TIME","cronExpression":"","taskName":"workFlowTrain"}'
```

**Example Response**

```
401 - Unauthorized

{
    "error": "general/internalError",
    "message": "Not authorized!",
    "info": "https://www.cumulocity.com/reference-guide/#error_reporting"
}
```

**Example Request**

```
409 - Error

curl --request POST "{{url}}/service/mlw/projects/1601355085_Project/resources/160128911974_WorkFlow/workflow" \
     --header "Authorization: {{auth}}" \
     --header "Content-Type: application/json" \
     --data-raw '{"recurrence":"ONE_TIME","cronExpression":"","taskName":"workFlowTrain"}'
```

**Example Response**

```
409 - Error

{
    "message": "Task name already exists. Please provide another name",
    "errorCode": 409,
    "exception": "Duplicate name"
}
```




