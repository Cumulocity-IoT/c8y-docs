---
weight: 10
title: Getting started with Analytics Builder
layout: redirect
---

### What is Analytics Builder {#what-is-analytics-builder}

Analytics Builder allows you to build analytic models that transform or analyze streaming data in order to generate new data or output events. The models are capable of processing data in real time.

You build the models in a graphical environment by combining pre-built blocks into models. The blocks in a model package up small bits of logic, and have a number of inputs, outputs and parameters. Each block implements a specific piece of functionality, such as receiving data from a sensor, performing a calculation, detecting a condition, or generating an output signal. You define the configuration of the blocks and connect the blocks using wires. You can edit the models, simulate deployment with historic data, or run them against live systems. See [Understanding models](/streaming-analytics/analytics-builder/#understanding-models) for more detailed information.

Analytics Builder consists of the following tools:

-   **Model manager**. When you invoke Analytics Builder, the model manager is shown first. It lists all available models and lets you manage them. For example, you can test and deploy the models from the model manager, or you can duplicate or delete them. You can create new models or edit existing models; in this case, the model editor is invoked. Samples are also available which help you get started with creating your own models. See [Using the model manager](/streaming-analytics/analytics-builder/#using-the-model-manager) for detailed information.
-   **Model editor**. The model editor lets you define the blocks that are used within a model and how they are wired together. User-visible documentation \(the so-called *block reference*\) is available in the model editor, describing the functionality of each block. See [Using the model editor](/streaming-analytics/analytics-builder/#using-the-model-editor) for detailed information.
-   **Instance editor**. If template parameters have been defined in a model, the instance editor lets you set up different instances of the same model which can then be activated and managed separately. The instance editor uses the template parameters that have been defined in the model editor. See [Using the instance editor](/streaming-analytics/analytics-builder/#using-the-instance-editor) for detailed information.

The blocks are implemented in the Event Processing Language (EPL) of Apama. At runtime, the EPL code runs in an Apama correlator to execute the models. Some runtime behavior and restrictions are important to understand. These are documented in later topics.

### First Steps: Creating your first model {#first-steps-creating-your-first-model}

This topic gives a brief overview of how to add and design a new model, and how to view its output. It is not intended to be a comprehensive description of the full range of possibilities provided by Analytics Builder. Therefore, explanations are kept to a minimum. For more detailed information, see the remainder of this documentation.

The steps below require that at least one device has already been registered in {{< product-c8y-iot >}}. Preferably, this is a device which is already sending measurement values to {{< product-c8y-iot >}}. These first steps assume that you are using a smartphone on which the {{< sensor-app >}} has been installed, see [{{< sensor-app >}}](/sensor-app/sensorapp-introduction/) for details.

The model that you add will contain three blocks:

-   An input block which receives measurement values from a device.
-   A block that calculates the mean of the measurement values over time.
-   An output block that sends the calculated mean values to {{< product-c8y-iot >}}'s Device Management application so that they can be viewed there.

When you have completed all steps below, your model will look similar to the following:

![Completed model with three blocks](/images/streaming-analytics/analytics-builder/first-steps.png)

#### Step 1: Switch to Analytics Builder {#step-1-switch-to-analytics-builder}

On the home screen of the Streaming Analytics application, click the **Open** button that is shown below the Analytics Builder heading.

Alternatively, click **Analytics Builder** in the navigator on the left.

{{< c8y-admon-info>}}
If the navigator is currently hidden, click the small arrow at the very left of the top bar to toggle the display of the navigator.
{{< /c8y-admon-info>}}

#### Step 2: Add a new model {#step-2-add-a-new-model}

The first page that is shown when you invoke Analytics Builder is the model manager.

1. On the **Models** tab, click **New model** in the toolbar.
2. In the resulting dialog box, enter a model name and click **OK**.

#### Step 3: Add the input block {#step-3-add-the-input-block}

You design your model in the model editor. The model editor is shown after you have entered the model name. The palette which is shown on the left contains all blocks that can be added to a model. You add a block by dragging it from the palette onto the canvas.

1. In the palette, expand **Input**.
2. Drag the **Measurement Input** block onto the canvas.
   The block parameter editor is automatically shown.
   {{< c8y-admon-info>}}
If the block parameter editor is not shown (for example, because you clicked an empty space on the canvas after dragging the input block onto the canvas), click the block using the left mouse button to show the block parameter editor.
   {{< /c8y-admon-info>}}
3. Click the menu <i class="dlt-c8y-icon-menu-horizontal text-primary icon-20"></i> that is shown for **Input Source**. In the resulting dialog box, click the **Select device** button for the device that you want to use. This button is shown when you hover over a device.
   {{< c8y-admon-info>}}
By default, an input block is listening to all input sources, that is, the **All Inputs** option is set. However, these first steps assume that you are using your smartphone. Therefore, you must select a single device as described above.
   {{< /c8y-admon-info>}}
4. From the **Fragment and Series** drop-down list box, select the fragment and series for which the input block is to listen.
   If the device has previously sent data, the drop-down list box offers one or more values for selection. An example for the {{< sensor-app >}} would be **c8y\_Gyroscope =\> gyroscopeY**.
5. Select the **Ignore Timestamp** checkbox.
   This makes sure that the measurements are processed in the same order as they are received.

If you need detailed information on the currently selected block, view the block reference in the documentation pane on the right. If the documentation pane is currently not shown, click the document icon <i class="c8y-icon c8y-icon-book text-primary icon-20"></i>.

#### Step 4: Add the block that calculates the mean of the measurement values {#step-4-add-the-block-that-calculates-the-mean-of-the-measurement-values}

1.  In the palette, expand **Aggregate**.
2.  Drag the **Average \(Mean\)** block onto the canvas.
3.  In the block parameter editor, specify a value for **Window Duration \(secs\)**, for example "10".
    The specified number of seconds will be used to control what duration the measurement is averaged over. Smaller values will react quicker to changes in values, larger values will give more smoothing of the value.

#### Step 5: Add the output block {#step-5-add-the-output-block}

1. In the palette, expand **Output**.
2. Drag the **Measurement Output** block onto the canvas.
3. As the output destination, select the same device as for your input block.
   {{< c8y-admon-info>}}
If you have kept the default option of **All Inputs** for the input block, you must set the output destination to **Trigger Device**. However, these first steps assume that you are using a single device, so you must select the same device as for your input block.
   {{< /c8y-admon-info>}}
4. Specify "apama\_Average" as the fragment name.
5. Specify "value" as the series name.

#### Step 6: Connect the blocks {#step-6-connect-the-blocks}

To pass the values from one block to another, you must connect the blocks with wires. You attach the wires to the ports, that is, to the small circles that are shown to the left and/or right of a block.

1. Click the **Value** output port of the input block and drag the mouse to the **Value** input port of the **Average \(Mean\)** block.
2. Click the **Average** output port of the **Average \(Mean\)** block and drag the mouse to the **Value** input port of the output block.

#### Step 7: Save the model and go back to the model manager {#step-7-save-the-model-and-go-back-to-the-model-manager}

1. In the toolbar of the model editor, click the save icon <i class="dlt-c8y-icon-save icon-20"></i> to save your newly created model.
2. In the toolbar of the model editor, click the close icon <i class="dlt-c8y-icon-clear icon-20"></i> to leave the model editor and thus to return to the model manager.

{{< c8y-admon-info>}}
Only saved models are listed on the **Models** tab of the model manager. When you add a new model and then leave the model editor without saving the model, it will not be listed in the model manager, and all the edits you made will be lost.
{{< /c8y-admon-info>}}

#### Step 8: Activate the model in production mode {#step-8-activate-the-model-in-production-mode}

A card for the newly added model is shown on the **Models** tab of the model manager. A new model is automatically set to draft mode and inactive state. You will now activate your new model in production mode. This deploys the model so that the measurements from your device are processed.

1. Click the drop-down menu on the card which currently shows **Draft** and select **Production**.
2. Click the toggle button on the card which currently shows **Inactive**. This changes the state to **Active**.

#### Step 9: Go to the Device Management application and view the measurements {#step-9-go-to-the-device-management-and-view-the-measurements}

To view the measurements that are sent from your active model, you must switch to the Device Management application. See [Device Management application](/device-management-application/) for detailed information.

1. Go to the Device Management application.
2. In the navigator on the left, click **Devices** and then **All devices**.
3. Locate your device and click its name to display the device details.
4. Click **Measurements** on the left. This is a dynamic tab which is only shown when measurements are available for the device.
  The resulting page shows several charts, visualizing the data sent from your device. It should now also show a chart titled "Apama\_average" in which you can view the values that are sent from your newly created model. You may have to reload the page to see this new chart. See [Measurements](/device-management-application/viewing-device-details/#measurements) for more information on the **Measurements** tab.

### First Steps: Creating a model from a sample {#first-steps-creating-a-model-from-a-sample}

This topic gives a brief overview of how to create a model from a sample. It is based on the **On missing measurements create alarm** sample. Your new model will create an alarm if no new measurement data has been received for a specified time period.

This topic is not intended to be a comprehensive description of the full range of possibilities provided by Analytics Builder. Therefore, explanations are kept to a minimum. For more detailed information, see the remainder of this documentation.

The steps below require that at least one device has already been registered in {{< product-c8y-iot >}}. Preferably, this is a device which is already sending measurement values to {{< product-c8y-iot >}}. These first steps assume that you are using a smartphone on which the {{< sensor-app >}} has been installed, see [{{< sensor-app >}}](/sensor-app/sensorapp-introduction/) for details.

The following image shows the blocks that are defined in the **On missing measurements create alarm** sample.

![Blocks defined within the sample](/images/streaming-analytics/analytics-builder/first-steps-sample.png)

The sample uses predefined template parameters. After you have created a model from the sample, you can create multiple instances of the model and you can specify different values for the template parameters. See also [Models](/streaming-analytics/analytics-builder/#models) which explains the difference between models without template parameters and models with template parameters.

The following is a brief description of the blocks that are defined within the sample:

-   The input starts with the **Measurement Input** block waiting for new incoming measurements that match a given value that is defined with the **Input fragment and series** template parameter. The name of that parameter is the label that you can see on the input block.
-   The output from the **Measurement Input** block is then passed to the **Missing Data** block which triggers an output if no input is received within the time defined with the **Duration \(seconds\)** template parameter.
-   The output from the **Missing Data** block is used as the trigger for the **Create Alarm** input port of the **Alarm Output** block. The name of the **Alarm type** template parameter is the label that you can see on the output block.
-   The output from the **Measurement Input** block is also passed as input to the **Object** input port of the **Text Substitution** block, along with the input from the **Managed Object Input** block which is passed to the **Source** input port of the **Text Substitution** block. The name of the **Device or group of devices** template parameter is the label that you can see on the input block.
-   The **Text Substitution** block supports replacement of placeholders. For example, if the input text is "Missing measurements of type: \#\{type\}", then the `#{type}` value is replaced by the actual `type` of the measurement. See [Text Substitution](/streaming-analytics/block-reference/#text-substitution) for more details.
-   The **Text Substitution** block is configured to use the **Alarm text** template parameter as user input. It applies the required substitutions and then sends the string containing the substitutions from its **Output** output port to the **Message** input port of the **Alarm Output** block.
-   The **Alarm Output** block requires the **Alarm type** and **Alarm severity** template parameters to be configured and creates an alarm whenever it is triggered by the **Missing Data** block.

#### Step 1: Create a new model from a sample {#step-1-create-a-new-model-from-a-sample}

The **Samples** tab of the model manager lists all sample models that are provided with Analytics Builder. You can view a sample by simply clicking on its card, but you cannot edit or deploy it. However, you can use the samples as a basis for developing your own models, by creating a model from a sample.

1. Go to the **Samples** tab of the model manager.
2. Click the actions menu <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> of the **On missing measurements create alarm** sample and then click **Create model from sample**.
   The new model is immediately shown in the model editor. It has the same name, description and tags as the sample.
3. If you want to rename the model, click **Model settings** which is shown at the left of the toolbar. You can then specify a new name in the resulting dialog box.
4. In the toolbar of the model editor, click the save icon <i class="dlt-c8y-icon-save icon-20"></i> to save the new model.
5. In the toolbar of the model editor, click the close icon <i class="dlt-c8y-icon-clear icon-20"></i> to leave the model editor and thus to return to the model manager.
   {{< c8y-admon-info>}}
Keep in mind that only saved models are listed on the **Models** tab of the model manager.
   {{< /c8y-admon-info>}}

#### Step 2: Create a new instance of the model {#step-2-create-a-new-instance-of-the-model}

The sample model uses template parameters. So when you turn the sample into a model, you create a so-called template model. You cannot activate a template model directly in the model manager. Instead, you must create at least one instance of the model, and you can then activate that instance using the instance editor.

1. On the **Models** tab of the model manager, locate the card for your newly created model.
2. To invoke the instance editor, click **0 Instances** which is currently shown on the card.
3. Click **New Instance** to create the first instance of your new model.

#### Step 3: Fill in the template parameter values {#step-3-fill-in-the-template-parameter-values}

In the instance editor, a row is shown for each instance that you create. A column is provided for each template parameter that is defined in the template model, with the name of the template parameter being the column header. As long as an instance is not active, you can adjust the values for that instance.

![Instance table with one instance](/images/streaming-analytics/analytics-builder/first-steps-instance-editor.png)

Use the horizontal scroll bar below the instance table if not all template parameters \(columns\) are shown on the screen.

1. Click the field below the **Device or group of devices** column header. In the resulting dialog, click **Select device** for the device that you want to use for this instance.
2. In the text box below the **Input fragment and series** column header, specify the details of the measurement input that you want to monitor in the following format:

   `<valueFragmentName>.<valueSeriesName>`

   For example, if the measurement fragment is `c8y_Gyroscope` and the series is `gyroscopeX`, then you must enter the following:

   `c8y_Gyroscope.gyroscopeX`

    {{< c8y-admon-tip>}}
If you want to find out which fragments and series are available to your device, without changing the predefined template parameters of the **Measurement Input** block, go back to the model editor, drag the input block for your device from the palette onto the canvas and open the **Fragment and Series** drop-down list box. This lists all the values that you can use. However, instead of the `=>` that you can see in the drop-down list box, you must use a dot \(.\) in this case. Don't forget to remove this block again after you have decided which value to use.
    {{< /c8y-admon-tip>}}
3. The fields below the **Duration \(seconds\)**, **Alarm type**, **Alarm text** and **Alarm severity** column headers already contain default values \(see also the above description of the blocks\). Adapt them to your requirements. For example, change the duration to 30 seconds, rename the alarm type to "MyAlarmType", keep the predefined alarm text, and set the alarm severity to **Minor**.
4. In the toolbar of the instance editor, click **Save**.

#### Step 4: Activate the instance {#step-4-activate-the-instance}

You will now activate the instance in production mode. This deploys the instance so that the measurements from your device are processed.

1. In the **Run Mode** column of the instance editor, click the drop-down menu for the instance and select **Production**.
2. In the **Status** column of the instance editor, click the button which currently shows **Inactive** to change the status to **Active**.

#### Step 5: Send in the data from your device {#step-5-send-in-the-data-from-your-device}

Once the instance has been activated, send in the data from your device. The instance starts monitoring the device once measurement data starts arriving and creates an alarm if no data is received within the configured duration.

For our example case with the gyroscope measurements from a smartphone, it should be sufficient that you simply turn off the smartphone display while the {{< sensor-app >}} is still running.

#### Step 6: Go to the Device Management application and view the alarms {#step-6-go-to-the-device-management-application-and-view-the-alarms}

To view the alarms that are sent from your active instance, you must switch to the Device Management application.
See [Device Management application](/device-management-application/) for detailed information.

1. Go to the Device Management application.
2. In the navigator on the left, click **Devices** and then **All devices**.
3. Locate your device and click its name to display the device details.
4. Click **Alarms** on the left.
5. On the resulting page, check the alarms that are sent from your device. If you have edited your instance as described above, you should see a MINOR alarm after 30 seconds, saying "Missing measurements of type: c8y\_Gyroscope". See [Working with alarms](/device-management-application/monitoring-and-controlling-devices/#working-with-alarms) for more information on the **Alarms** tab.
