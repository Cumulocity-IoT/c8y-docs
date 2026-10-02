---
date: '2026-10-01'
title: Cumulocity Streaming Analytics microservices now use Debian 13 and Java 25
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
ticket: PAM-35403
version: 27.256.0
environment_availability:
  - label: eu-latest.cumulocity.com
    date: '2026-10-01'
---

As [previously announced](/change-logs/#apama-in-c8y-20260917-debian13-upgrade), the {{< product-c8y-iot >}} Streaming Analytics microservices have been upgraded to Debian 13 (Trixie) as their base operating system, replacing Debian 12 (Bookworm). This release delivers that change.

**Most applications are unaffected**. The changes matter if you have uploaded custom Java or Python code to the apama-ctrl microservice, for example in an Analytics Builder block, an EPL plugin, or a connectivity plugin.

**Java 25**

The apama-ctrl microservice now runs OpenJDK 25 instead of OpenJDK 17. All Java code executed within the correlator runs on Java 25, so if you have custom EPL plugins or connectivity plugins you should recompile them with Java 25 and test that they still behave as expected.

See the [JDK release notes](https://www.oracle.com/java/technologies/javase/25-relnote-issues.html) for details of the breaking changes and new features between Java 17 and Java 25. Some applications may require updates to third-party library dependencies, but in most cases Apama plugins continue to work without changes.

**Python interpreter path change**

The Python 3 interpreter is now the operating-system-provided `/usr/bin/python3` (Python 3.13 from Debian 13) rather than a Python 3 installation shipped inside the Apama directory. If you have hardcoded the old Apama-provided Python 3 path anywhere — for example in a script or test configuration — update it to `/usr/bin/python3`.

Apama still ships PySys and the Apama PySys extensions; only the interpreter itself comes from the operating system. Review [What's New in Python](https://docs.python.org/3/whatsnew/index.html) for any language changes that may affect your code.

If you build a custom {{< product-c8y-iot >}} microservice on the [Apama base image](https://gallery.ecr.aws/apama), see the [Apama change logs](https://cumulocity.com/apama/docs/latest/change-logs/) for the corresponding changes to those images.

**References & feedback**

For more information on these and other changes, review the [Apama change logs](https://cumulocity.com/apama/docs/latest/change-logs/). If you have any questions, feel free to post to the [streaming-analytics-apama](https://community.cumulocity.com/tag/streaming-analytics-apama) tag on the {{< product-c8y-iot >}} Tech Community.
