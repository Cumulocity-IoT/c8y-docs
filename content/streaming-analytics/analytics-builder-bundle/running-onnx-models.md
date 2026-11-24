---
weight: 95
title: Running ONNX models
layout: redirect
---

### About ONNX models in Analytics Builder {#running-onnx-models}

The [ONNX](/streaming-analytics/block-reference/#onnx) block runs a machine learning model in the ONNX format as part of an analytic model. You train the machine learning model with the tools of your choice, export it to the ONNX format, and upload the file to the files repository. The block passes the properties of its input pulse to the ONNX model and sends the results as the properties of its output pulse.

The block runs ONNX models with ONNX Runtime 1.24.1 on the CPU. The block is available on the amd64 platform only.

### Preparing an ONNX model {#preparing-an-onnx-model}

#### To prepare and upload an ONNX model {#to-prepare-and-upload-an-onnx-model}

1. Export your machine learning model to the ONNX format with the export function of your machine learning framework.
2. Check that all inputs and outputs of the ONNX model are tensors with a supported data type. See [Supported data types](#onnx-supported-data-types).
3. If the ONNX model consists of a single file, give the file a name that ends with `.onnx`, for example, `MyModel.onnx`.
4. If the ONNX model needs additional files, create a zip archive that contains all files. The `.onnx` file must be at the top level of the archive and must have the same base name as the archive. For example, `MyModel.zip` contains `MyModel.onnx`.
5. Upload the file to the files repository. In the Administration application, click **Management** > **Files repository**.
6. In the model editor, add the ONNX block from the **AI/ML** section of the palette and enter the file name, including the extension, as the **ONNX model name** parameter.

When you activate the analytic model, the block downloads the file and checks that the ONNX model can be loaded. If this is not possible, the analytic model does not activate and shows the reason.

If you upload a new version of the file, deactivate and activate the analytic models that use it. An active analytic model keeps the version that it was activated with. If several files in the files repository have the same name, the block uses the most recently updated file.

### Passing inputs and reading outputs {#onnx-inputs-and-outputs}

The input pulse must have one property for each input of the ONNX model. The name of the property is the name of the input. The output pulse has one property for each output of the ONNX model.

- A tensor is a list. A tensor with several dimensions is a list of lists.
- A tensor with exactly one element is a single value instead of a list, in both the input and the output.

All inputs must be present in the same pulse. If you build the inputs from several sources, for example, from two measurement series with the Set Properties block, the first value that arrives starts a run with the other input missing. This run fails, and so does the analytic model. To avoid this, do one of the following:

- Send the values together, for example, as two series of the same measurement.
- Add a Smart Function block or a Gate block before the ONNX block that only passes a pulse on when all inputs are present.

Use a Smart Function block after the ONNX block to read several outputs, or the Extract Property block to read a single output.

### Supported data types {#onnx-supported-data-types}

<table>
<colgroup>
    <col style="width: 40%;">
    <col style="width: 60%;">
</colgroup>
<thead>
  <tr>
    <th>Data type of the ONNX tensor</th>
    <th>Value in the analytic model</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>float</code>, <code>double</code></td>
    <td>Float. A value that is outside the range of <code>float</code> makes the run fail.</td>
  </tr>
  <tr>
    <td><code>int8</code>, <code>int16</code>, <code>int32</code>, <code>int64</code>, <code>uint16</code>, <code>uint32</code>, <code>uint64</code></td>
    <td>Float. A value that is outside the range of the data type makes the run fail. Values of <code>int64</code> and <code>uint64</code> above 2<sup>53</sup> lose precision.</td>
  </tr>
  <tr>
    <td><code>bool</code></td>
    <td>Boolean.</td>
  </tr>
  <tr>
    <td><code>string</code></td>
    <td>String.</td>
  </tr>
</tbody>
</table>

Other data types, such as `uint8` and `float16`, are not supported. An input or output that is a sequence or a map instead of a tensor is not supported either, and the analytic model does not activate.

### Limits {#onnx-limits}

- **Size:** The file, and for a zip archive its extracted content, must not be larger than 100 MB. A zip archive must not have more than 1,000 entries. You can change the size limit with the tenant option `onnx.maxModelSizeMB`.
- **Time:** One run of the ONNX model must finish within 1 second. You can change the time limit with the tenant option `onnx.timeoutSecs`. While the ONNX model runs, the analytic model does not process other inputs, so choose a time limit that fits the rate at which your inputs arrive.
- **Memory:** The block loads one copy of the ONNX model for each device that sends inputs to the analytic model.
- **Activation:** The download and the check of the ONNX model must finish within 10 minutes. Otherwise, the activation fails. The download continues, so that the next activation succeeds.

See [Other keys](/streaming-analytics/analytics-builder/#other-keys) for the tenant options.

### When a run fails {#onnx-when-a-run-fails}

A run of the ONNX model fails if an input is missing, an input has the wrong data type or shape, or the run does not finish within the time limit. The analytic model then fails for all devices and shows the reason in the model manager. Correct the cause and activate the analytic model again.

To keep an analytic model running when a single device sends unsuitable values, check the values with a Smart Function block or a Gate block before the ONNX block.
