---
date: '2026-09-21'
title: >-
  Cumulocity Streaming Analytics runtime images move to Debian 13 and Java 25
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Analytics
component:
  - value: component-M5-cepIIS
    label: Streaming Analytics
build_artifact:
  - value: tc-KXXmo2SUR
    label: apama-in-c8y
ticket: PAM-35403
---

The {{< product-c8y-iot >}} Streaming Analytics (Apama) runtime images will be upgraded to Debian 13 (Trixie) as their base operating system in a forthcoming “27.x” release, replacing Debian 12 (Bookworm). The upgrade also brings a new Java version and a change to the location of the Python 3 interpreter.

{{< c8y-admon-important >}}
If you use custom Java or Python code in an Analytics Builder block uploaded to the apama-ctrl microservice, make the required changes promptly so that you are ready before the update is rolled out to your environment.
{{< /c8y-admon-important >}}

We expect **most applications to be unaffected**. The changes matter if you build custom microservices on the Apama base image, use custom Java EPL or connectivity plugins, or run Python code from a block or extension uploaded to the apama-ctrl microservice.

**Debian 13 base image**

The published Apama runtime images are now based on Debian 13 (Trixie) instead of Debian 12 (Bookworm). If you build a custom {{< product-c8y-iot >}} microservice on the [Apama base image](https://gallery.ecr.aws/apama) and install extra operating system packages, check that those packages are still available and that their names have not changed in Debian 13.

**Java 25**

Apama now ships with OpenJDK 25 instead of OpenJDK 17. All Java code executed within the correlator now runs on Java 25, so if you have custom EPL plugins or connectivity plugins you should recompile them with Java 25 and test that they still behave as expected. If you use Java in a block uploaded to an apama-ctrl microservice, make any required changes promptly so you are ready when the update is rolled out to SaaS environments.

See the [JDK release notes](https://www.oracle.com/java/technologies/javase/25-relnote-issues.html) for details of the breaking changes and new features between Java 17 and Java 25. Some applications may require updates to third-party library dependencies, but in most cases we expect Apama plugins to continue to work without changes.

**Python interpreter path change**

The Python 3 interpreter is now the operating-system-provided `/usr/bin/python3` (Python 3.13 from Debian 13) rather than a Python 3 installation shipped inside the Apama directory. If you have hardcoded the old Apama-provided Python 3 path anywhere — for example in a script, Dockerfile, or test configuration — update it to `/usr/bin/python3`.

PySys and the Apama PySys extensions are still shipped with Apama; only the interpreter itself is now provided by the operating system. Review [What's New in Python](https://docs.python.org/3/whatsnew/index.html) for any language changes that may affect your code.

**References & feedback**

For more information on these and other changes, review the [Apama change logs](https://cumulocity.com/apama/docs/latest/change-logs/). If you have any questions, feel free to post to the [streaming-analytics-apama](https://community.cumulocity.com/tag/streaming-analytics-apama) tag on the {{< product-c8y-iot >}} Tech Community.
