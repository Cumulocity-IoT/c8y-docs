---
weight: 50
title: Managing business rules

---

### Event processing

Using event processing, you can specify real-time business logic that is automatically run by Cumulocity as soon as new data arrives or existing data is modified. The logic is deployed in so-called "modules" which consist of a set of CEP statements.

>**Info:** A user-friendly way to specify real-time business logic is provided in the Cockpit application through the so-called "[Smart Rules](/users-guide/cockpit#smart-rules)". Smart Rules are "under the hood" also implemented as CEP statements, and you can see them in the **Event Processing** page. However, you cannot edit Smart Rules from here.

Click **Event processing** in the **Business rules** menu to view all modules.

<img src="/images/users-guide/Administration/admin-event-processing.png" alt="Event processing">

For each module in the list, the status (deployed = indicated by a green checkmark / not deployed = indicated by an exclamation mark), the name and the date when is was last updated is provided.

If the status of a module is set to **Deployed**, you will see the output produced by the statement below the checkmark icon. Clicking a line of output unfolds the detailed output of the statement. Clicking **Clear all** removes the output from the screen.

#### <a name="add-modules"></a>To add a module

1. Click **New module** in the top menu bar.
2. Enter a name for the module at the very top. You may only use alphanumeric characters without blanks.
3. By default, the status is set to **Deployed** which means that the statements you enter will be run immediately. Set the toggle to **Not deployed** if you want to avoid this.
4. Enter your CEP statements into the **Source code** textbox. For your convenience, we provide various examples. Click **Examples** and select an appropriate example from the dropdown list. Click **Append** to paste the example into the **Source code** textbox at the position of the cursor.
5. Click **Save** to save your settings.

The following example module creates an alarm if the temperature goes below 0 degree.

<img src="/images/users-guide/Administration/admin-event-processing-sample-module.png" alt="Example module" style="max-width: 100%">

#### To edit a module

Simply click the row of the module you want to edit or click the menu icon at the right of the respective row and then click **Edit**.

For details on the fields, see [To add a module](#add-modules).


#### To delete a module

Click the menu icon at the right of the respective row and then click **Delete**.

Instead of deleting the module you can also disable it temporarily by setting its status to "Not deployed".


### <a name="reprio-alarms"></a>Alarm mapping

Alarm mapping enables you to change the severity and text of alarms to adapt them to your business priorities. For example, a loss of the connection to a device is by default a MAJOR alarm but may be critical to you. To change this, add an alarm mapping to change alarms related to connection losses to CRITICAL.

Click **Alarm mapping** in the **Business Rules** menu to see a list of all alarm mappings.

<img src="/images/users-guide/Administration/admin-alarm-mapping.png" alt="Alarm mapping">

For each alarm mapping, the alarm severity and the name of the mapping is shown.

#### <a name="add-alarm-mapping"></a> To add alarm mapping

1. Click **Add alarm mapping** in the top menu bar.
2. Enter the alarm type to be modified.
3. Optionally, enter a new text for the alarm. If you do not enter any text, the original text in the alarm will be kept.
4. Select the desired new severity, or select "Drop" to not show the alarm at all.
5. Click **Save** to save your settings.

#### To edit an alarm mapping

Simply expand an alarm mapping to edit it. See above for details on the fields.

<img src="/images/users-guide/Administration/admin-alarm-mapping-edit.png" alt="Edit alarm mapping">

#### To delete an alarm mapping

To delete an alarm mapping, hover over it and click the delete icon.

<img src="/images/users-guide/Administration/admin-alarm-mapping-delete.png" alt="Delete alarm mapping">
