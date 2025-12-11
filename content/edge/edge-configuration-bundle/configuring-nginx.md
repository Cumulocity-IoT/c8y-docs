---
weight: 50
title: Configuring NGINX
layout: bundle
sector:
  - edge_server
---

### Blocking sensitive endpoints in NGINX

Configure an NGINX `location` block to return a `403 Forbidden` status code for all matching incoming requests. This method can be used to effectively disable access to an endpoint with a defined URL pattern or to blacklist specific users within that location block.

{{< c8y-admon-important >}}

Perform these operations as `root` user.

{{< /c8y-admon-important >}}

The following example shows how to block a specific endpoint. You can modify the location pattern to match any endpoint you want to disable:

```shell
CONFIG_FILE="/etc/nginx/conf.d/blocked-endpoints.common.location.conf"

cat >> "$CONFIG_FILE" <<'EOF'

# Add your exact regex inside the location directive
# Example1: Blocks health endpoint for all services
# location ~* ^/service/[^/]+/health$ {
#     return 403;
# }
# Example2: Blocks health endpoint only for cep service
# location ~* ^/service/cep/health$ {
#     return 403;
# }

location ~* <your-regex-here> {
    return 403;
}
EOF

chown nginx:nginx "$CONFIG_FILE"
chmod 644 "$CONFIG_FILE"
systemctl restart nginx
```

```shell
CONFIG_FILE="/etc/nginx/conf.d/blocked-endpoints.common.location.conf"

cat >> "$CONFIG_FILE" <<'EOF'

# Block requests based on the HTTP Authorization header.
# Example1:
# if ($http_authorization = "Basic abc123") {
#     return 403;
# }
# This blocks all the end points for given user

# Block based on exact Authorization header value
if ($http_authorization = "<your-basic-auth-header>") {
    return 403;
}
EOF

chown nginx:nginx "$CONFIG_FILE"
chmod 644 "$CONFIG_FILE"
systemctl restart nginx
```


