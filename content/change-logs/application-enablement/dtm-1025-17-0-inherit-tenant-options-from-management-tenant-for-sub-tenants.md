---
date: ""
title: "Inherit tenant options from management tenant for sub-tenants"
product_area: "Application enablement & solutions"
change_type:
    - value: "change-QHu1GdukP"
      label: "Feature"
component:
    - value: "component-Tl88RYb4A"
      label: "Digital Twin Manager"
build_artifact:
    - value: "tc-wYIY0MBDO"
      label: "dtm"
ticket: "CTM-3287"
version: "1025.17.0"
---
Sub-tenants can now inherit tenant options from the management tenant
when their own options are not explicitly configured and are also not
configured in the enterprise tenant. Previously, sub-tenants required
all tenant options to be individually configured - or in the parent
enterprise tenant -, which created unnecessary duplication and made it
difficult to apply consistent settings across your tenant hierarchy.

With this change, when a sub-tenant does not have a specific tenant
option defined, the system automatically uses the management tenant's
value as fallback if the enterprise tenant's value is not defined. This
simplifies tenant configuration by allowing you to set default options
at the management level and override them only when needed for specific
sub-tenants. Sub-tenants can still maintain their own custom options to
override inherited values.

From a sub-tenant, the tenant options are searched in the following
order:
sub-tenant -> enterprise tenant -> management -> built-in defaults
From an enterprise tenant, the tenant options are searched in the
following order:
enterprise tenant -> management -> built-in defaults

In the response, the field "source" indicates where the tenant option is
defined: "TENANT_OPTION", "ENTERPRISE_TENANT_OPTION",
"MANAGEMENT_TENANT_OPTION".

This change improves configuration management across your tenant
structure, reducing setup time and ensuring consistent behavior across
sub-tenants unless explicitly customized.