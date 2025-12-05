---
weight: 50
title: Configuring Nginx
layout: bundle
sector:
  - edge_server
---

### Blocking Sensitive Endpoints in NGINX

To prevent access to the /service/<service>/heapdump endpoint, create an NGINX location rule that returns 403 Forbidden for all heapdump requests.

{{< c8y-admon-important >}}

Perform these operations as root user

{{< /c8y-admon-important >}}

```shell
tee /etc/nginx/conf.d/blocked_endpoints.common.location.conf > /dev/null <<'EOF'
location ~* ^/service/[^/]+/heapdump$ {
    return 403;
}
EOF

chown nginx:nginx /etc/nginx/conf.d/blocked_endpoints.common.location.conf
chmod 644 /etc/nginx/conf.d/blocked_endpoints.common.location.conf

systemctl restart nginx
```