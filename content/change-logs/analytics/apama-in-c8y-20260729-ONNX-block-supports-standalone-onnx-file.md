---
date: '2026-08-06'
title: ONNX block in Analytics Builder now requires file extension in model name
change_type:
  - value: change-3BQrQ6adS
    label: API change
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAB-5326
version: 27.180.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-07-30'
  - label: apj.cumulocity.com
    date: '2026-08-05'
  - label: jp.cumulocity.com
    date: '2026-08-05'
  - label: us.cumulocity.com
    date: '2026-08-10'
---

The ONNX block (Public Preview) in Analytics Builder now supports models uploaded to the {{< product-c8y-iot >}} files repository as a standalone `.onnx` file. Previously, the block only supported models packaged inside a `.zip` archive.

The `ONNX model name` parameter must now include an explicit `.onnx` or `.zip` file extension:
* `<modelName>.onnx` looks for a standalone `<modelName>.onnx` file.
* `<modelName>.zip` extracts the archive and looks for `<modelName>.onnx` inside it.

Previously, `<modelName>`, `<modelName>.onnx`, and `<modelName>.zip` were always resolved by extracting a `<modelName>.zip` archive and looking for `<modelName>.onnx` inside.

{{< c8y-admon-important >}}
This is a breaking change for existing models that omit the file extension, or that use a `.onnx` extension to extract a model from a `.zip` file uploaded to the files repository. To migrate, ensure the file extension used in your Analytics Builder model matches the type of file you have uploaded.
{{< /c8y-admon-important >}}
