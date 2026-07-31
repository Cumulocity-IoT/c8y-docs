---
date: ""
title: "Asset definition schema now reflects removal of allowed property definitions."
product_area: "Application enablement & solutions"
change_type:
    - value: "change-VSkj2iV9m"
      label: "Fix"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-3086"
version: "1025.8.4"
---
Asset definition schemas previously retained removed property
definitions in the generated JSON schema, which could cause validation
issues and confusion when properties were no longer intended to be used.
The schema generation now correctly removes property definitions from
the JSON schema when you remove them from the asset definition.

This change ensures that your JSON schemas accurately reflect the
current state of your asset definitions. Existing asset definitions are
not affected, but any new schema generations after this update will
exclude removed properties, preventing validation errors on devices or
applications that submit data using the updated schema.