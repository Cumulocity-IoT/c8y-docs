---
weight: 110
title: "N"
layout: bundle
sector:
  - getting_started
build:
  render: false

---

### Navigator {#navigator}

The navigator is an element on the left of the {{< product-c8y-iot >}} platform's UI. It provides a list of menu items that direct you to various pages within the [application](#application) currently in use.  

{{< c8y-details title="Developer details" >}}
The navigator is a UI component and does not have a direct REST API. It is extended using the Web SDK's `hookNavigator` provider to add new menu items (nodes).
{{< /c8y-details >}}  
