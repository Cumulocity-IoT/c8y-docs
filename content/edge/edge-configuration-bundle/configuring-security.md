---
weight: 30
title: Configuring security
layout: bundle
sector:
  - edge_server
---

### Configuring security using the UI {#configuring-security-using-the-ui}

The Edge appliance is security hardened by default.
Furthermore, you can apply specific security configurations to enhance the security of your Edge appliance.

{{< c8y-admon-important >}}
For information about deployment security best practices and tenant administration security configuration guidelines, see [Security Hardening Guidelines](/files/edge/Security_Hardening_Guidelines_guide_1018.pdf).
{{< /c8y-admon-important >}}

To apply the security configuration, follow the steps below:

1. Log in to the {{< management-tenant >}} using the Edge administrator credentials created during the installation.

   - Username: management/<*Edge admin username*>
   - Password: password provided during the installation

2. Switch to the Administration application using the application switcher at the right of the top bar **<img class="Default" src="/images/icons/switcher-icon.png" alt="Application switcher" style="display: inline; float: none">**.

3. Click **Edge** > **Security** in the navigator.

4. Click **Download configuration** to download a sample JSON syntax for the current configuration. You can use the same JSON file in the POST operation using the REST API.

5. Click **Edit configuration** to edit the configuration.

   You can either import a JSON file to prefill the values or enter the values manually.

6. Specify the following parameters:
    |<div style="width:100px">Configuration</div>|Category|Parameter|Description
    |:---|:---|:---|:---
    |Operating system|SELinux|**SELinux mode**|SELinux secures the operating system from unprivileged actions of confined users. When enabled, SELinux has two modes: permissive and enforcing.<br><br>**permissive**: In the permissive mode, SELinux policy is not enforced. The system remains operational and SELinux does not deny any operations but only logs AVC messages, which can be then used for troubleshooting, debugging, and SELinux policy improvements. Each AVC is logged only once in this case.<br><br>**enforcing**: In the enforcing mode, it enforces the SELinux policy and denies access based on SELinux policy rules.<br><br>{{< c8y-admon-important >}}
In the enforcing mode, you cannot access the Edge appliance remotely through VNC.
    {{< /c8y-admon-important >}}<br>Default value: permissive
    ||SSH|**SSH enabled**|Enables or disables the SSH functionality of the Edge appliance. By default, the SSH functionality is enabled.<br><br>Changing the value to false disables the SSH functionality. When disabled, you will not be able to SSH into the Edge appliance, locally or remotely.<br><br>Default value: True
    ||Session inactivity|**Login sessions inactivity timeout (seconds)**|The idle duration before a user session is terminated. When configured, the user session terminates after the specified idle duration.<br><br>Default value: 600 seconds<br>Minimum value: 0<br>
    ||Linux Auditing System|**Audit logging enabled**|The *Linux Auditing System* helps system administrators create an audit trail, a log for every action on the server. You can track the security-relevant events, record the events in a log file, and detect misuse or unauthorized activities by inspecting the audit log files.<p>Enables or disables Linux Auditing System. A value of true enables and creates an audit log file at `/var/log/audit/audit.log`.<p>Enabling auditing system increases the consumption of disk space.<br>You can configure the operating system to transfer the audit logs to a centralized logging server by configuring **Audisp remote logging server**.<br>{{< c8y-admon-important >}}
Once enabled, you cannot disable the auditing system configuration.
    {{< /c8y-admon-important >}}<br>Default value: False
    ||Remote logging|**Audisp remote logging server**|The centralized logging server to transfer the audit logs to.<br> When configured, the operating system audit logs are transferred to the specified centralized logging server.
    |||**Server**|The IP address or the hostname of the destination server.
    |||**Port**|The port on the destination server.
    ||Remote logging|**Rsyslog remote logging server**|The centralized logging server to transfer the local logs to.<br> When configured, the local logs are transferred to the specified centralized logging server.
    |||**Server**|The IP address or the hostname of the destination server.
    |||**Port**|The port on the destination server.
    |||**Protocol**|The protocol (TCP or UDP) used to transfer the logs.
    ||Login banner|**Login banner**|The login banner for your Edge appliance.
    |Kubernetes|Audit policy||Kubernetes audit policy defines the rules about what events should be recorded and what data they should include.
    |||**Level**|The audit level controls what Kubernetes event data is recorded. When configured, the Kubernetes event data is logged to the specified level. Logging more data increases the consumption of disk space. <br><br>**None** - do not log events.<br>**Metadata** - log request metadata (requesting user, timestamp, resource, verb, and so on) but not request or response body.<br>**Request** - log event metadata and request body but not response body. This does not apply for non-resource requests.<br>**RequestResponse** - log event metadata, request and response bodies. This does not apply for non-resource requests.<br><br>Default value: None
    |||**Maximum age (days)**|The maximum number of days to retain the old Kubernetes audit log files. A high value has more impact on the disk space.<br><br>Default value: 30 days<br>Minimum value: 0<br>
      |||**Maximum numbers of log files to retain**|The maximum number of Kubernetes audit log files to retain. Setting a value of 0 indicates that there is no restriction on the number of files to retain. A high value has more impact on the disk space.<br><br>Default value: 10 files<br>Minimum value: 0<br>
      |||**Maximum size (megabytes)**|The maximum size in megabytes of the Kubernetes audit log file before it gets rotated. A high value has more impact on the disk space.<br><br>Default value: 100 MB<br>Minimum value: 0<br>

7. Click **Save**.

### Configuring security using the REST APIs {#configuring-security-using-the-rest-apis}

To configure security using the REST APIs, see the `/edge/configuration/security` API in the [{{< product-c8y-iot >}} Edge OpenAPI Specification](https://{{< domain-c8y >}}/api/edge/{{< c8y-edge-current-version-alt >}}.0/#operation/postSecurityConfiguration).
