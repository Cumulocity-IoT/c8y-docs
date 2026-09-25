---
date: 
title: >-
  Cumulocity Streaming Analytics runtime images now use Debian 13 and Java 25
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
---

As [previously announced](/change-logs/#apama-in-c8y-20260917-debian13-upgrade), the {{< product-c8y-iot >}} Streaming Analytics (Apama) runtime images have been upgraded to Debian 13 (Trixie) as their base operating system, replacing Debian 12 (Bookworm).

This release contains the following customer-visible changes:

- **Debian 13 base image**: the published Apama runtime images are now based on Debian 13 (Trixie). If you build a custom {{< product-c8y-iot >}} microservice on the [Apama base image](https://gallery.ecr.aws/apama) and install extra operating system packages, check that those packages are still available and that their names have not changed.
- **Java 25**: Apama now ships with OpenJDK 25 instead of OpenJDK 17. Recompile any custom EPL or connectivity plugins with Java 25 and test that they still behave as expected.
- **Multi-architecture images**: the published runtime image tags are now multi-architecture manifest lists covering both `amd64` and `arm64`, so pulling a tag on an arm64 machine gives you a native arm64 image.
- **Python interpreter path**: the Python 3 interpreter is now the operating-system-provided `/usr/bin/python3` (Python 3.13 from Debian 13) instead of a Python 3 installation shipped inside the Apama directory. Update any hardcoded references to the old path. PySys and the Apama PySys extensions are still shipped with Apama.

For more information on these and other changes, review the [Apama change logs](https://cumulocity.com/apama/docs/latest/change-logs/).
