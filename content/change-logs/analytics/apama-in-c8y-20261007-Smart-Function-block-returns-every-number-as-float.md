---
date: 
title: Smart Function block returns every number as a float and reports values it cannot convert
change_type:
  - value: change-VSkj2iV9m
    label: Fix
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAM-35437
version: 
---

The [Smart Function](/streaming-analytics/block-reference/#smart-function) block, which is in Public Preview, now converts the values your Javascript code returns more consistently, and reports an error instead of silently returning a wrong value.

Every Javascript number in the `properties` of an output now becomes a `float`, consistent with the `value` and `timestamp` of an output, which were already a `float`. This applies whatever the value of the number or however it was calculated. Javascript has only one number type, so the block cannot tell whether a number is meant to be an integer. To return an `integer` property, return a `BigInt`, for example, `BigInt(n)`. A `BigInt` returned as the `value` or `timestamp` still becomes a `float`.

{{< c8y-admon-important >}}
Whole numbers in `properties`, such as `1 + 1` or an `integer` property passed through your code unchanged, previously stayed an `integer` and now become a `float`. Check any blocks downstream of the Smart Function block that read these properties and expect an `integer`.
{{< /c8y-admon-important >}}

Integer dictionary keys reach your code as numbers, so they come back as `float` keys.

Integers outside the range -2<sup>53</sup> to 2<sup>53</sup>, which a Javascript number cannot hold exactly, now automatically reach your code as a `BigInt` rather than a rounded number. These include hash values and timestamps in nanoseconds. A `BigInt` cannot be mixed with numbers in arithmetic or passed to `JSON.stringify`, so code such as `x / 1000`, `Math.floor(x)`, or `JSON.stringify({id: x})` throws a `TypeError` when an input is this large. Use `Number(x)` if rounding is acceptable, or check `typeof x === "bigint"` to handle both.

The block now reports an error instead of returning a truncated or altered value if your code returns any of the following:

- An object that contains itself.
- Objects nested more than 256 levels deep.
- A value larger than 256 MB once converted.
- A string containing a NUL character.
- Two keys that would become the same key.
- A value with no equivalent, such as a function, an `Error`, or a `Symbol`.

Properties with symbol keys are now skipped, and unpaired surrogates in strings are replaced with U+FFFD.

For details, see [Smart Function](/streaming-analytics/block-reference/#smart-function).
