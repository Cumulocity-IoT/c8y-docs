---
date: ""
title: "Replace internal Hibernate Validator API with custom InterpolationHelper"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-2c7RdTdXo4"
      label: "Improvement"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-3117"
version: "1025.8.5"
---
`UniqueLinkedSeriesValidator` was using
`org.hibernate.validator.internal.engine.messageinterpolation.util.InterpolationHelper`,
an internal Hibernate API not guaranteed to remain stable across
versions.

## Changes

- **New utility class**
`com.cumulocity.microservice.dtm.assets.utils.InterpolationHelper` with:
  ```java
  public static String escapeInterpolationChars(String message) {
      return message.replace("\\", "\\\\")
                    .replace("{", "\\{")
                    .replace("}", "\\}")
                    .replace("$", "\\$");
  }
  ```
- **`UniqueLinkedSeriesValidator`** — swapped Hibernate-internal import
for the new custom class; `escapeMessageParameter` →
`escapeInterpolationChars`
- **ArchUnit rule** added to `JUnitVersionTest` — enforces no production
code depends on `org.hibernate.validator.internal..*` at build time