---
weight: 30
title: Network security
layout: bundle

---

Network security prevents unauthorized access to data transmitted over the network and tampering with or unauthorized modification of data. It also ensures that network services are available.

{{< product-c8y-iot >}} ensures that your data stays confidential and cannot be tampered with through an end-to-end implementation of [HTTPS](http://en.wikipedia.org/wiki/HTTP_Secure) from devices to applications. It uses up-to-date encryption technology that has been independently rated "A" by [SSLlabs](https://www.ssllabs.com/). Any communication with {{< product-c8y-iot >}} is subject to individual authentication and authorization.

This communication architecture is illustrated below. Inside the sensor networks and from the sensor networks to agents, device- and gateway-specific protocols may be in use (such as ZigBee or Modbus). Securing these is a device-specific matter. Agents communicate with the {{< product-c8y-iot >}} platform using HTTPS to send and receive data. Similarly, IoT applications use HTTPS for communication. If an IoT application exposes own interfaces towards web browsers, it is recommended that these use HTTPS. This way, the whole path from agents to the end user is secured.

<center><img src="/images/concepts-guide/commsecurity.png" alt="Communication security" style="max-width: 100%"></center>

As mentioned above, {{< product-c8y-iot >}} does not require any device that might expose ports or services on the internet. This is an important feature: it not only simplifies the connection of devices to {{< product-c8y-iot >}}, but also simplifies the safety backup of these devices drastically. When deploying an IoT solution, check other services that might make a device available on the internet or expose it, such as web-based device managers or SMS-based configuration options.

### Unencrypted communications {#unencrypted-communications}

The {{< product-c8y-iot >}} platform allows old or low-power devices to connect to it over unencrypted protocols like HTTP since such devices are not capable of doing encryption or only provide weak encryption methods (for example TLSv1.0). Using old devices and unencrypted communications is discretionary and considering the risk that such communications are prone to attacks. For instance, an attacker suitably positioned to view a legitimate device's network traffic could record and monitor their interactions with the platform and obtain any information the device supplies. Note that using a mixture of encrypted and unencrypted communications is an ineffective defense against active attackers, because they can easily remove references to encrypted resources when these references are transmitted over an unencrypted connection.

Hence, it is recommended to use transport-level encryption (SSL/TLS) to protect all communications passing between the device and the platform. The Strict-Transport-Security HTTP header should be used to ensure that devices refuse to access the platform over an insecure connection.
