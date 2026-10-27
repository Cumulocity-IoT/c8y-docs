---
date:
title: Certificate access tokens are always returned as JWE
product_area: Platform services
change_type:
  - value: change-3BQrQ6adS
    label: API change
component:
  - value: q3kclF6pO
    label: Authentication
build_artifact:
  - value: tc-QHwMfWtBk7
    label: cumulocity
ticket: MTM-68156
version:
---
The `POST /tenant/oauth/certificate` endpoint now always returns the access token as a JWE encrypted with the public key from the presented certificate. The `X-Cumulocity-Token-Response-Mode` header is no longer supported and the `response_mode` field has been removed from the response. For details, see [Retrieving a platform token using an X.509 certificate](/authentication/oai-secure/#retrieving-a-platform-token-using-an-x509-certificate).
