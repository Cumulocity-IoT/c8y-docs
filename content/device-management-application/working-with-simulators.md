---
weight: 90
title: Working with simulators
layout: bundle
outputs:
  - html
  - json
sector:
  - device_management
helpcontent:
  - label: working-with-simulators
    title: Working with simulators
    content: "With the simulator you can create devices that simulate the same level of functionality as connected hardware devices.


  A simulator uses a playlist to simulate messages that the device sends to the Cumulocity platform. A playlist is a series of instructions that the simulator executes one after the other.

  An instruction can either send a message (measurements, alarms, events, and inventory) or wait for a specified time (sleep). For each simulator, you can create instructions specifying what the simulator is supposed to do.


  To create a new simulator, click **Add simulator** at the top right and follow the instructions in the user documentation."
---

With the {{< product-c8y-iot >}} simulator all aspects of IoT devices can be simulated, such as:

* Setting up a simulated device or a network of simulated devices.
* Specifying the operations which a device can process.
* Creating work instructions based on predefined message templates or user-defined templates and scheduling work steps.
* Creating up to ten devices of a defined type.
* Generating messages for measurements, alarms, events and inventory.
* Viewing simulation problems as alarms.

### About simulators {#about-simulators}

With the simulator you can create devices that simulate the same level of functionality as connected hardware devices.

A simulator uses a playlist to simulate messages that the device sends to the {{< product-c8y-iot >}} platform. A playlist is a series of instructions that the simulator executes one after the other. When the last instruction is reached, the simulator starts again with the first one.

An instruction can either send a message (measurements, alarms, events and inventory) or wait for a specified time (sleep).

A message is defined by choosing a message template (like sending a temperature) and providing the values for this template (for example 23.0 degrees). Many predefined message templates are provided, for example, for creating a measurement, sending an event, creating and cancelling an alarm. These templates are based on MQTT static templates. Additionally, custom message templates can be defined using the [SmartREST template editor](/device-management-application/smartrest-templates).

### To view simulators {#to-view-simulators}

Click **Simulators** in the **Devices** menu in the navigator to open the **Simulators** page.

<img src="/images/users-guide/DeviceManagement/devmgmt-simulator.png" alt="Simulator page">

All simulators which you can access will be listed here.

### To create a simulator {#to-create-a-simulator}

1. Click **Add simulator** at the right of the top menu bar.
2. In the resulting dialog box, select a simulator type from the dropdown list in the **Presets** field. Select "Empty simulator" to create a simulator from scratch or select one of the sample simulators.
3. Enter a name for the simulator.
4. Select the number of instances for this simulator (up to ten).
5. Click **Create**.

The simulator will be created and added to the list.

### To edit a simulator {#to-edit-a-simulator}

1. Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the top right of a simulator card and then click **Edit**, or simply click the simulator card.
2. In the resulting dialog box, make the relevant changes.
3. Click **Save** to apply your changes.

### To duplicate a simulator {#to-duplicate-a-simulator}

1. Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the top right of a simulator card and then click **Duplicate**.
2. In the resulting dialog box, provide a name for the new simulator.
3. Click **Duplicate**.

The new simulator will be added to the list.

### To remove a simulator {#to-remove-a-simulator}

1. Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> at the top right of a simulator card and then click **Remove**.
2. In the resulting dialog box, confirm to remove the simulator.
3. Click **Save**.

The simulator will be removed from the list.

### Instructions {#instructions}

For each simulator, you can create instructions specifying what the simulator is supposed to do. Instructions are single tasks added to a playlist through which the simulator will work.

Instructions can be viewed and edited on the **Instructions** tab of the simulator.

![Add Instructions](/images/users-guide/DeviceManagement/devmgmt-simulator-instructions.png)

**Examples**

The simulator presets already contain sample instructions. For example, the "Temperature measurement" preset contains instructions for the steps "Create measurement" and "Sleep", see image above.

The panel at the right changes according to the type of instruction selected at the left.

![Fragment](/images/users-guide/DeviceManagement/devmgmt-simulator-fragment.png)

The measurement instruction refers to a fragment. Fragments are used to identify capabilities of a managed object. Find more details about fragments in the [fragment library](/device-integration/fragment-library/).

The "Sleep" instruction requires one value for its duration in seconds.

#### To add an instruction {#to-add-an-instruction}

1. Click **Add instruction** to add a new instruction to the simulator.
2.  In the resulting dialog box, select a message from the dropdown list.
3. Specify the required parameters, depending on the message type.
3. Click **Save**.

The new instruction will be added to the simulator.

#### To add a sleep {#to-add-a-sleep}

1. Click **Add sleep** to add a new instruction to the simulator.
3. In the resulting dialog box, specify the duration.
3. Click **Save**.

The new sleep instruction will be added to the simulator.

#### To remove an instruction {#to-remove-an-instruction}

Hover over the instruction or the sleep you want to remove and click the remove icon <i class="dlt-c8y-icon-minus-circle text-danger icon-20"></i>.

The instruction will be removed from the simulator.

### Supported operations {#supported-operations}

In the **Supported operations** tab of a simulator you can find specific operations like configurations or software/firmware updates.

![Supported operations](/images/users-guide/DeviceManagement/devmgmt-simulator-supported-operations.png)

Click the toggle to turn the respective operation on or off.

#### To add a custom operation {#to-add-a-custom-operation}

1. Click **Add custom operation** to specify a customized operation.
2. In the resulting dialog box, Enter the custom operation type to be supported by the simulator.
3. Click **Add**.

The custom operation will be added to the operation list.

### Alarms (simulator) {#alarms-simulator}

The **Alarm** tab of a simulator displays alarms related to the simulator itself, not related to the simulated device, that is, if the simulator itself does not work correctly. See [Working with alarms](/device-management-application/monitoring-and-controlling-devices/#working-with-alarms) for information on alarms.

![Alarms](/images/users-guide/DeviceManagement/devmgmt-simulator-alarm.png)
