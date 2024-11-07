---
date: 2023-12-06T15:40:49.474Z
title: EPL enhancements in Apama 10.15.4
change_type:
  - value: change-QHu1GdukP
    label: Feature
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
version: 24.18.0
---
##### String concatenation operator + supports non-string operands

If only one operand expression is of type `string`, then string conversion is now performed on the other operand to produce a string at runtime.
For more details, see [Additive operators](https://documentation.softwareag.com/pam/10.15.4/en/webhelp/pam-webhelp/#page/pam-webhelp%2Fre-ApaEplRef_additive_operators.html) in the Apama documentation.

##### New built-in convenience methods on string, sequence and dictionary

The EPL language has been enhanced with some convenience methods for common operations such as checking if a string or sequence contains a specified substring or item, and determining if a string, sequence or dictionary is empty.

There is a method to get a sequence value with a fallback default if there is no value at the specified index:

```
mySequence.getOr(100, "default value");
```

There is also a powerful regular expression group search for strings that finds the first match and returns the text captured by each "(...)" group of the regular expression:

```
// Prints ["Bob", "Eve"]
 print "Today Bob met Eve".groupSearch("([a-zA-Z]) met ([a-zA-Z])").toString();
```

The following table lists all new methods:

| New method | Description |
| ----------- | ----------- |
| `string.contains()`, `sequence.contains()` | Determines whether the string or sequence contains the specified substring or item. This is a convenient alternative to checking the `find()` or `indexOf()` integer value. |
| `string.groupSearch()` | Finds the first regular expression match in this string, and returns a list of the matched "(...)" groups. |
| `string.startsWith()`, `string.endsWith()` | Determines whether the string has the specified prefix or suffix. |
| `string.rfind()` | Locates a string within this string, starting from the right (that is, from the end) of the string. |
| `string.substringFrom()` | Extracts part of this string, starting at a specified character and ending at the end of the string. |
| `string.quote()` | Adds quotation marks and escaping according to the standard EPL event representation. This method may be useful for logging strings that may contain spaces and newline characters. This is the reverse of the existing `string.parse()` method. |
| `string.isEmpty()` | Determines whether the string has a length of zero characters. |
| `dictionary.isEmpty()`, `sequence.isEmpty()` | Determines whether the size is 0. |
| `any.isEmpty()`, `optional.isEmpty()`, `listener.isEmpty()`, `Channel.isEmpty()`, `chunk.isEmpty()` | Aliases for the existing `empty()` methods on these types. It is recommended to use the new `isEmpty()` methods, but the use of `empty()` is not deprecated. |
| `sequence.getOr()` | Gets the value at the specified index, or a specified fallback value if the index is not valid. |

For more information, see the [API Reference for EPL (ApamaDoc)](https://documentation.softwareag.com/pam/10.15.4/en/webhelp/related/ApamaDoc/index.html).

##### Support for negative indexes for sequence[...] access

Instead of throwing an out of bounds exception, it is now possible to refer to items near the end of a sequence by specifying a negative index. For example, `seq[-1]` gives the last item in the sequence and `seq[-2]` gives the item before that. Negative sequence indexes can also be used in the `sequence.remove()` and `sequence.insert()` methods.

Note that negative values cannot be specified when accessing a sequence item using the `any.getEntry()` method.

##### Mixed-type sequence and dictionary literals are now treated as &lt;any&gt; by default

It is no longer necessary to add an `<any>` cast around the first item in a sequence or dictionary literal that contains a mixture of different types. For example, the following sequence literal which produces a `sequence<any>`:

```
[<any> 12345, "a string"]
```

can now be written more simply as
```
[12345, "a string"]
```

This simplifies the functional example given in [EPL enhancements in 10.15.3](https://documentation.softwareag.com/pam/10.15.3/en/webhelp/pam-webhelp/#page/pam-webhelp%2Fco-ApaRelNot_10153_epl_enhancements.html) in the Apama documentation: the `<any>` is no longer needed in the `setFields` call.

##### Discarding of unused return values

In EPL, it is now possible to discard the return value of a function or expression and not assign it to a variable. This is useful if you only want the side effects of the function and do not need the return value. Be careful not to discard a return value that indicates important conditions that your program may need to use.

Previously, you had to write:

```
any _ := Functional(newAlarms).map(Fn.getEntry("alarm")).map(allAlarms.append);
```

But now you can write:

```
Functional(newAlarms).map(Fn.getEntry("alarm")).map(allAlarms.append);
```

See also [Using an expression as a statement](https://documentation.softwareag.com/pam/10.15.4/en/webhelp/pam-webhelp/#page/pam-webhelp%2Fre-ApaEplRef_using_an_expression_as_a_statement.html) in the Apama documentation.

##### Functional operators

The `com.apama.functional.Fn` and `com.apama.functional.Functional` events now have a new method `mapKeys` which can return a dictionary container with modified keys. For more details, see [Functional operators](https://documentation.softwareag.com/pam/10.15.4/en/webhelp/pam-webhelp/#page/pam-webhelp%2Fco-DevApaAppInEpl_functional_operators.html) in the Apama documentation and the [API Reference for EPL (ApamaDoc)](https://documentation.softwareag.com/pam/10.15.4/en/webhelp/related/ApamaDoc/index.html).

##### Functional listeners

The functional `onTimeout` action now returns the wait listener it creates so that it can be quit if needed. For more details, see [Functional listeners](https://documentation.softwareag.com/pam/10.15.4/en/webhelp/pam-webhelp/#page/pam-webhelp%2Fco-DevApaAppInEpl_functional_listeners.html) in the Apama documentation.

##### Handling uncaught exceptions

EPL monitors are no longer terminated by default when an uncaught exception is thrown in some cases.

Programming errors and unexpected data in incoming events can cause an uncaught exception in EPL. This causes the monitor instance to be terminated, rendering the application unusable. To provide a better experience, exceptions thrown from listeners and stream listeners which are not caught no longer terminate the monitor instance. Instead, they just stop the handling of the current event.

Developers are still encouraged to correctly catch and handle the exceptions in their EPL. If an exception is thrown and not caught, it is still possible for the events to be lost and not correctly handled.

This is a change in behavior. Some users may be relying on this previous behavior, in combination with an `ondie()` action. EPL with an `ondie()` action retains the previous behavior of always terminating the monitor and calling `ondie()`. If you must retain the previous behavior, you can add an empty `ondie()` action to your monitor.

{{< c8y-admon-info >}}
If you have an action that is called from within a stream query (for example, as part of a `where` or `group by` clause, or a window definition) which throws an exception, this still terminates the monitor instance.
{{< /c8y-admon-info >}}

##### Updated events in com.apama.cumulocity

To avoid confusion as to whether events were being sent towards {{< product-c8y-iot >}} or being received back as updates from {{< product-c8y-iot >}}, the {{< product-c8y-iot >}} event definitions API was changed in a previous release (10.5.2.0) so that the existing `CHANNEL` constant was deprecated and replaced by either `SEND_CHANNEL` or `SUBSCRIBE_CHANNEL` constants as appropriate. Some events were omitted from these changes and this has now been rectified. Therefore, the `CHANNEL` constant is deprecated on the following events:

* `SubscribeMeasurements`
* `UnsubscribeMeasurements`
* `FindManagedObjectResponseAck`
* `FindMeasurementResponseAck`
* `GenericResponseComplete`
* `Subscribe`
* `Unsubscribe`

In addition, a new `SUBSCRIBE_CHANNEL` or `SEND_CHANNEL` has been added to the following events instead:

* `SubscribeMeasurements`
* `UnsubscribeMeasurements`
* `Subscribe`
* `Unsubscribe`

The constants on the following events are instead replaced with `SUBSCRIBE_CHANNEL` constants on their corresponding `Response` types:

* `FindManagedObjectResponseAck`
* `FindMeasurementResponseAck`
* `GenericResponseComplete`

The [API Reference for EPL (ApamaDoc)](https://documentation.softwareag.com/pam/10.15.4/en/webhelp/related/ApamaDoc/index.html) has been amended to make it clear that acknowledgement events are always received on the same channel as the corresponding response events, and to avoid confusion the `CHANNEL` constant has been deprecated on those acknowledgement events where it had been defined.
