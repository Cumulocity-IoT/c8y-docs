---
weight: 70
title: Adding validation rules to resources
layout: redirect
---


Validation rules are used to verify that the data a user enters in a resource meets the constraints you specify before the user can save the resource.

Validation rules can only be added to resources which have "write" permissions. Resources which can have validation rules are marked by the following icon:

![Validation rule icon](/images/device-protocols/lwm2m/lwm2m-protocols-rules.png)

Add a new validation rule by clicking on the desired resource and then click **Add validation rule**.

Validation rules can have the following types:

- **Date:** Simply enter a date and select your desired rule.
- **Number:** Only values of "Integer" or "Float" type are allowed depending on the resource.
- **ObjectLink:** Reference to another object using the format "/Object/Instance/Resource".
- **Regex:** Add a string which describes the validation pattern. For example, ".*dd" means that the string must end with "dd".
- **String:** Enter a string value which can be either "True" or "False".

After selecting a type, the following rules can be selected:

- Greater than
- Lower than
- Equals
- Equals not
- Greater or equals than
- Lower or equals than

{{< c8y-admon-info >}}
Not all rules are available to each type.
{{< /c8y-admon-info >}}

To delete a rule, click on the red remove icon <i class="dlt-c8y-icon-minus-circle text-danger icon-20"></i> on the right side of that rule. Click **Save** to save your settings.

### Complex rulesets {#complex-rulesets}

In order to enable more complex conditions,  multiple validation rules can be defined for a resource:

- Multiple rules can be defined in a validation rule group. A user input is only valid if each of the rules in the validation rule group is satisfied (logical AND).
- It is possible to declare multiple validation rule groups. If multiple validation rule groups are declared, user input is valid if any of the validation rule groups is satisfied (logical OR).

![Validation rules example](/images/device-protocols/lwm2m/lwm2m-protocols-example-validation.png)

The screenshot above provides an example for the use of validation rule groups: User input is valid if the given string does not match "test" (equals not). It is also valid if it ends with "asd" and it matches the contents of the LWM2M resource /3/0/15.

Complex rulesets are based on Boolean Disjunctive Normal Form, which allows arbitrary complex rules to be defined.

### Device lifecycle events {#device-lifecycle-events}

The LWM2M agent creates events of device lifecycle in {{< product-c8y-iot >}}.
Following are the specific event types for device bootstrap and registration process.
The LWM2M agent creates the events with the specific event type during the device bootstrap and registration process.

- Bootstrap event types:
    - c8y_LWM2MDeviceBootstrapStart.
    - c8y_LWM2MDeviceBootstrapEnd.
    - c8y_LWM2MDeviceBootstrapFailure.
- Registration event types:
    - c8y_LWM2MDeviceRegistration.
    - c8y_LWM2MDeviceDeRegistration.
    - c8y_LWM2MDeviceRegistrationUpdate.
