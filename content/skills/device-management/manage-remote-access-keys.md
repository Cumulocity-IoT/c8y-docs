---
title: Manage SSH keys for Cloud Remote Access
description: Generate an RSA key pair for an SSH endpoint, replace the stored host key of an SSH endpoint configuration, and check whether Cloud Remote Access saves host keys automatically.
weight: 740
requires:
  - authentication
---

SSH endpoints of Cloud Remote Access use two kinds of keys:

* **A key pair**: Cloud Remote Access signs in to the SSH server with the private key. The public key must be installed on the remote device as an authorized key.
* **A host key**: The public key of the SSH server. Cloud Remote Access uses it to verify that it connects to the correct server.

The Cloud Remote Access microservice at `/service/remoteaccess` generates key pairs, stores host keys, and reports the host key setting of the tenant. For the background, see [Managing endpoints](/cloud-remote-access/setting-up-cloud-remote-access/#to-add-a-remote-access-endpoint-via-ssh). To create the endpoint configuration itself, see [Manage remote access endpoints of a device](/skills/device-management/manage-remote-access-configurations/).

{{< c8y-admon-req >}}
ROLES & PERMISSIONS:

* To generate key pairs, replace host keys, and read the host key setting: ROLE_REMOTE_ACCESS_ADMIN

Your tenant is subscribed to the Cloud Remote Access microservice `remoteaccess`.
{{< /c8y-admon-req >}}

If a request returns HTTP 403 with the error "Microservice/Access Denied", your tenant is not subscribed to the microservice. Any other HTTP 403 means that your user lacks ROLE_REMOTE_ACCESS_ADMIN.

### To generate a key pair {#to-generate-a-key-pair}

Send the following request to the microservice. The `hostname` is the host of the SSH server, for example `127.0.0.1`. It is optional. You can also send an empty object, `{}`:

```http
POST /service/remoteaccess/keypair/generate
Content-Type: application/json
Accept: application/json

{
  "hostname": "127.0.0.1"
}
```

The microservice returns HTTP 201 and a 2048-bit RSA key pair in the properties `privateKey` and `publicKey`.

The microservice does not store the key pair. The response is the only copy. Keep the private key secret, and do not write it to logs.

Use the keys in an endpoint configuration with the credentials type KEY_PAIR: send the `privateKey` and the `publicKey` together with the `username`, see [To create an endpoint configuration](/skills/device-management/manage-remote-access-configurations/#to-create-an-endpoint-configuration). Install the public key as an authorized key on the SSH server.

### To replace the host key of an SSH endpoint {#to-replace-the-host-key-of-an-ssh-endpoint}

Replace the stored host key if the host key of the SSH server changed, for example after the SSH server was reinstalled. Only SSH endpoint configurations have a host key. The microservice rejects host keys for configurations with other protocols.

The example uses `<device_id>` for the ID of the device, `<configuration_id>` for the ID of the SSH endpoint configuration, and `<ssh_host_key>` for the new host key. Write the host key in the OpenSSH *authorized_keys* format: the key type, a space, and the Base64-encoded key, for example `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIB6...`.

Send a PUT request:

```http
PUT /service/remoteaccess/devices/<device_id>/configurations/<configuration_id>/hostkey
Content-Type: application/json
Accept: application/json

{
  "hostKey": "<ssh_host_key>"
}
```

The microservice returns HTTP 200 and the endpoint configuration. The new host key is in `credentials.hostKey`.

If the microservice returns HTTP 422, the `hostKey` is missing, empty, or not in the OpenSSH *authorized_keys* format. If it returns HTTP 404, the configuration does not exist on this device.

### To check whether host keys are saved automatically {#to-check-whether-host-keys-are-saved-automatically}

Send the following request to the microservice:

```http
GET /service/remoteaccess/settings/hostkey-autosave
```

The microservice returns HTTP 200 and the boolean property `enabled`:

* **false**: This is the default. When a user connects to an SSH endpoint without a stored host key, Cloud Remote Access first shows the fingerprint of the host key. The connection continues only after the user confirms it. Cloud Remote Access then stores the confirmed host key.
* **true**: Cloud Remote Access trusts the host key of the server and stores it automatically on the first successful connection.

In both cases, Cloud Remote Access verifies the server with the stored host key on every following connection. The setting is the tenant option `hostkey-autosave` in the category `remoteaccess`, see [Auto-saving host key functionality](/cloud-remote-access/setting-up-cloud-remote-access/#auto-saving-host-key-functionality).
