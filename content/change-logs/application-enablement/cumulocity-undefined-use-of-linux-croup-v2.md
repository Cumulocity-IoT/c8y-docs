---
date: 2024-02-13T14:53:24.832Z
title: Switching to Linux cgroup v2
change_type:
  - value: change-inv-3bw8e
    label: Announcement
product_area: Application enablement & solutions
component:
  - value: component-7lcnqU5FL
    label: Microservice SDK
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
---
As announced earlier, see [release 10.18](https://cumulocity.com/releasenotes/release-10-18-0/announcements-10-18-0), {{< product-c8y-iot >}} SaaS instances will gradually be switched to Linux cgroup v2 in the second half of the year 2024. Microservices must use a Linux cgroup v2 aware application runtime from then on. When executing microservices which are not compatible with cgroup v2 on {{< product-c8y-iot >}} in these versions it might happen that the information provided by the application runtime concerning available CPU and memory is not correct. This might lead to incorrect memory and thread allocation in the microservice container process.

cgroup is a Linux kernel feature to organize processes hierarchically and distribute system resources along the hierarchy in a controlled and configurable manner. Every process in the system belongs to one and only one cgroup. In {{< product-c8y-iot >}} cgroups are used to enforce container resource limits.

When using the {{< product-c8y-iot >}} Microservice SDK for developing microservices, ensure to configure a Java version which is cgroup v2 aware when building your microservice. When using Java 8, ensure to use openjdk8u372 or higher. When using Java 11, use Java 11.0.16 or higher, or use Java 15 or higher. When using a server runtime other than OpenJDK Java as microservice application runtime, refer to the documentation of the provider.
