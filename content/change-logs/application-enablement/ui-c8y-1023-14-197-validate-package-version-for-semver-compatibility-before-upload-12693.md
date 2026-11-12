---
date: 2026-09-01
title: Package version validation for semantic versioning compatibility
product_area: Application enablement & solutions
change_type:
  - value: change-VSkj2iV9m
    label: Fix
component:
  - value: component-YbYJ3gLU_
    label: Web SDK
build_artifact:
  - value: tc-pjJiURv9Y
    label: ui-c8y
ticket: MTM-67047
version: 1023.14.197
---
When uploading application packages, it is important to ensure that package versions follow semantic versioning standards to maintain compatibility and consistency across your deployments. Previously, the system did not validate package versions before upload, which could result in invalid or inconsistent version formats being stored in your repository. Now, the system validates that package versions conform to semantic versioning requirements before allowing the upload to proceed. This validation helps prevent version-related issues and ensures that all packages in your repository follow a consistent versioning scheme, making it easier to manage dependencies and track application updates across your installations.