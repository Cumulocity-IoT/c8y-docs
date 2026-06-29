---
date: ''
title: Standardized Expires date format in Set-Cookie header
product_area: Platform services
change_type:
  - value: change-inv-3bw8e
    label: Announcement
component:
  - value: component-JlFdtOPva
    label: REST API
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-67152
version: 2026.208.0
---

The Jetty servlet container has been updated from version 11 to version 12. As a result, the `Expires`
attribute of the `Set-Cookie` header is now serialized using the standard RFC 1123 date format with spaces
(for example, `Fri, 10 Jul 2026 07:30:15 GMT`) instead of the legacy dash-separated Netscape cookie-date
format (`Fri, 10-Jul-2026 07:30:15 GMT`).

To facilitate the adaptation of customer integrations, the platform will keep backwards compatibility and
continue returning the legacy dash-separated format until the end of the year. Starting next year
and with the next `2027` yearly release, the backwards compatibility patch will be removed
and the `Expires` date will be returned in accordance with the standards described in the RFC.

Use this transition period to make sure your integrations support the RFC date format. The Apache HTTP Client
is a known example of a library that fails to parse the standard RFC 1123 `Expires` format and rejects the
affected cookies - this particular incompatibility is tracked in the [Jetty project issue #12771](https://github.com/jetty/jetty.project/issues/12771).
Other clients with strict cookie parsers might be affected as well.

For details on the standardized date formats, refer to the
[HTTP-date format in RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#section-5.6.7) and the
[cookie Expires attribute in RFC 6265](https://www.rfc-editor.org/rfc/rfc6265#section-5.1.1).
