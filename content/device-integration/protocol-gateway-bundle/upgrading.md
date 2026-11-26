---
weight: 140
title: Protocol Gateway upgrade notes
layout: redirect
---

Before you update Protocol Gateway, back up the data folder on the device:

```bash
sudo cp -a /etc/takebishi /etc/takebishi.backup
```

Then install the new version of the software item. If the new version fails, install the previous version of the software item again and restore the folder from the backup.

The version in this documentation is 3.7.0.2490. Before you update to a newer version, see the [Protocol Gateway release notes](https://www.faweb.net/en/product/devicegateway/releasenote) for changes.
