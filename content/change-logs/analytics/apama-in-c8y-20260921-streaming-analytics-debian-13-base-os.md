---
date: '2026-09-21'
title: Streaming Analytics microservices move to a Debian 13 base operating system
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

The {{< product-c8y-iot >}} Streaming Analytics (Apama) runtime images will be upgraded to Debian 13 (Trixie) as their base operating system in a forthcoming “27.x” release, replacing Debian 12 (Bookworm). The upgrade also brings a new Java version, multi-architecture image support, and a change to the location of the Python 3 interpreter.

{{< c8y-admon-important >}}
If you use custom Java or Python code in an Analytics Builder block uploaded to the apama-ctrl microservice, make the required changes promptly so that you are ready before the update is rolled out to your environment.
{{< /c8y-admon-important >}}

Most existing applications are not affected. Review the following sections if you build custom microservices on the Apama base image, use custom Java EPL or connectivity plugins, or run Python code from a block or extension uploaded to the apama-ctrl microservice.

### Debian 13 base operating system

The published Apama runtime images are now based on Debian 13 (Trixie). If you build a custom {{< product-c8y-iot >}} microservice on the Apama base image and install additional operating system packages, verify that those packages are still available in Debian 13 and that their names have not changed.

### Java 25

Apama now ships with OpenJDK 25 instead of OpenJDK 17. All Java code running within the correlator therefore runs on Java 25. If you have custom EPL plugins, connectivity plugins, or Java code in a block uploaded to an apama-ctrl microservice, recompile them with Java 25 and test them before the update is rolled out to your environment. In most cases no code changes are required, although some applications may need updated third-party library dependencies.

### Multi-architecture images

The published runtime image tags are now multi-architecture manifest lists covering both `amd64` and `arm64`. Pulling an image tag on an arm64 machine now gives you a native arm64 image, so you can build and run custom microservices on arm64 hardware without emulation.

### Python interpreter path

The Python 3 interpreter is now the operating-system-provided `/usr/bin/python3` (Python 3.13 from Debian 13) instead of a Python 3 installation shipped inside the Apama directory. If you have hardcoded the previous Apama-provided Python 3 path in a script, Dockerfile, or test configuration, update it to `/usr/bin/python3`. PySys and the Apama PySys extensions continue to be shipped with Apama; only the interpreter itself is now provided by the operating system.

For more details on these and other changes, see the [Apama change logs](https://cumulocity.com/apama/docs/latest/change-logs/).
