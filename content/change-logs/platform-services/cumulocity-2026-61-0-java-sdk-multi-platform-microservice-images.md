---
date: '2026-11-13'
title: Microservice package Maven plugin can build multi-platform images with docker buildx
product_area: Application enablement & solutions
change_type:
  - value: change-2c7RdTdXo4
    label: Improvement
component:
  - value: QWPx3rFfn
    label: Java SDK
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-68526
version: 2026.61.0
environment_availability:
  - label: eu-latest.cumulocity.com
  - label: apj.cumulocity.com
  - label: jp.cumulocity.com
  - label: emea.cumulocity.com
  - label: us.cumulocity.com
  - label: cumulocity.com
---
The `microservice-package-maven-plugin` can now build one multi-platform image for `amd64` and `arm64` with `docker buildx`. To turn on this build, set `-Dmicroservice.package.buildx=true` and choose the target platforms with `-Dmicroservice.package.dockerBuildArchs`. The default build through the Docker daemon is unchanged. For details, see [Building images for several platforms](/microservice-sdk/java/#package-goal-multi-platform).

{{< product-c8y-iot >}} currently runs only `linux/amd64` microservices. `arm64` is not supported yet.

The new `dockerBuildNoCache` parameter defaults to `true`, so each build pulls the base image and builds every layer again. To use the Docker build cache, for example for offline builds, set `-Dmicroservice.package.dockerBuildNoCache=false`.
