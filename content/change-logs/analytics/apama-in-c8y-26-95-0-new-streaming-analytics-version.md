---
date: '2025-04-29'
title: >-
  Cumulocity Streaming Analytics will switch to a new “26.x” version of Apama
  engine
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
ticket: PAM-35184
version: 26.95.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---

{{< product-c8y-iot >}} Streaming Analytics is switching to the new “26.x” version of the Apama engine. The 26.x release is focused around the real-world needs of {{< product-c8y-iot >}} customers, delivering a simplified and more relevant feature set. 

The new version includes some changes that may affect customers with their own custom EPL or connectivity plugins, as well as those who build and test analytics applications using their own installation of Apama (for example, on Windows).

We expect **most applications to be unaffected**. However if you use **custom Python or Java plugins in an Analytics Builder Block** that you have uploaded to the apama-ctrl microservice, it is important to prepare for these changes immediately, so you are ready when the update is rolled out to SaaS environments over the coming weeks.

If you use Apama in a {{< product-c8y-iot >}} **custom microservice** there is less urgency, but you should plan to switch to the new (`latest` or `26.X.X`) [Apama base image](https://gallery.ecr.aws/apama) at some point over the next year.

## Release Changes

### Windows and Eclipse support

Installation of the Apama engine is no longer supported on Windows, and the Apama plugin for Eclipse is removed.
* Instead, to develop Apama applications on Windows (for example to build EPL Apps, execute the Block SDK, or build PySys tests for your application), instead of Eclipse you can use the community-maintained [Apama Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ApamaCommunity.apama-extensions).
* It is also possible to install Apama using our [Debian Package Repository](https://download.cumulocity.com/Apama/Debian/) into a Windows Subsystem for Linux (WSL) instance of Debian.
 
### Docker base image update

The Apama Docker images now use Debian 12 (Bookworm) for the base image instead of Red Hat UBI. These images can be used for both development and as a base image for custom {{< product-c8y-iot >}} microservices. The names and tags of some Docker images have changed, as has the directory where Apama is installed. If you need to install any extra packages on your image, the command line for doing so will need to be changed for Debian.

### Supported operating systems changes

For users who need to install Apama onto a Linux machine without Docker for development purposes, the installation options have changed. Debian 12 (Bookworm) is now the only supported distribution for installing Apama, and the Apama packages must be installed from our [Debian Package Repository](https://download.cumulocity.com/Apama/Debian/) as we no longer publish .zip or .tar.gz packages. Support for installing Apama on Red Hat Enterprise Linux and Ubuntu is removed. In addition to the usual x86 packages, support for ARMv8 (64-bit) has been added and replaces ARMv7HF (32-bit).

### Java upgrade

This release of Apama comes with Java 17 instead of Java 11. All Java code executed within the correlator is now executed with Java 17, so if you have any custom EPL plugins or connectivity plugins you should recompile them with Java 17 and test that they are still working as expected. If you use Java in a block uploaded to an apama-ctrl microservice, any required changes should be performed immediately so you are ready when the update is rolled out to SaaS environments.

See online resources such as the [JDK release notes](https://www.oracle.com/java/technologies/javase/17-relnote-issues.html) for detailed information about breaking changes and new features in Java 17. Some applications may be affected by the different [locale data](https://openjdk.org/jeps/252) provided in this version of Java, or may require updates to third party library dependencies, but we expect that in most cases Apama plugins will continue to work without changes.

### Python upgrade

Python will soon be upgraded from 3.9 to a newer version (likely 3.13). We advise customers using Python to review [What’s New in Python](https://docs.python.org/3/whatsnew/index.html) to familiarize themselves with any changes that may affect their application. If Python is being used within a block uploaded to an apama-ctrl microservice, any required changes should be performed immediately so you are ready when the update is rolled out to SaaS environments.

### References & feedback

For more information on these and other changes, review the [Apama Change Logs](https://cumulocity.com/apama/docs/latest/change-logs/). If you have any questions, feel free to post to the [streaming-analytics-apama](https://community.cumulocity.com/tag/streaming-analytics-apama) tag on the {{< product-c8y-iot >}} Tech Community.
