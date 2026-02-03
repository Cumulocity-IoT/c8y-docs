---
date: 2024-04-04
title: New utility functions for the EPL TimeFormat event library
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAM-34632
version: 25.93.0
---
The following utility functions have been added to the TimeFormat event library to help with comparing and manipulating datetimes. As with the existing functions, the new utility functions work for the local time zone, an arbitrary time zone and, where appropriate, the UTC time zone.

* `dateComponent`: Gives the datetime for the previous midnight in the time zone at the given datetime.
* `timeComponent`: Gives the number of seconds since the previous midnight in the time zone at the given datetime.
* `daysSinceEpoch`: Gives the number of Julian days since the beginning of the epoch at the given datetime.
* `getOffset`: Gives the offset in seconds of the time zone from UTC at the given datetime, taking into account any daylight savings that may be being applied.
* `getRawOffset`: Gives the base offset in seconds of the time zone, that is, without daylight savings applied.

For example, there are two ways to check if it is midnight in your local time zone:

```
float now := currentTime;

// Method 1
if TimeFormat.dateComponent(now) = now
{
     // It's midnight.
}
// Method 2
if TimeFormat.timeComponent(now) = 0.0
{
     // It's midnight.
}
```

For usage information, see the API Reference for EPL (ApamaDoc). This is available in Apama 10.15.5.
