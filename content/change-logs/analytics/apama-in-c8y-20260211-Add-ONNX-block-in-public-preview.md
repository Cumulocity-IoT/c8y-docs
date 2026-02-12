---
date: 
title: Add Analytics Builder ONNX block in Public Preview
change_type:
  - value: change-pXAlHAWka
    label: Preview
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-5075
version:
---

A new ONNX block has been added to Analytics Builder in Public Preview. This block executes an ONNX model that has been deployed to the Files repository.

**Input:** A pulse containing a properties dictionary where keys are the ONNX input names and values are scalars (float, integer, boolean, string) or tensors (nested sequences of those types).

**Output**: A pulse containing a properties dictionary where keys are the ONNX output names and values are scalars or tensors matching the model's output schema.
