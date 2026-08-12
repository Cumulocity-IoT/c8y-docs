---
weight: 10
title: Prerequisites
layout: redirect
---

|<div style="width:140px">Item</div>|Details|
|:---|:---|
|Hardware|<p>CPU: 8 cores<br>RAM: 16 GB<br>CPU Architecture: x86-64<br></p> **Info:** These are the minimum system requirements for deploying Edge. If a custom microservice requires additional resources, you must allocate them on top of the minimum requirements. For example, if a microservice needs 2 CPU cores and 4 GB RAM, the Kubernetes node must have an additional 2 CPU cores and 4 GB RAM. You can add more CPU cores or RAM to the host at any time, and Edge will use the additional resources automatically without further configuration. For an illustration of how additional resources can affect performance, see [Benchmarks](/edge/benchmarks/). <br><br>**Important:** MongoDB requires a CPU that supports AVX instructions and an **x86-64-v3** (or later) microarchitecture. Ensure that the CPU type of the Kubernetes node supports AVX instructions. Use the command `lscpu` to check whether the CPU supports AVX instructions. AVX2 instructions are _not_ required.|
|Disk space|<p>150 GB</p> <p>Most of this disk space will be consumed as Kubernetes Persistent Volumes, whose nature depends on which Kubernetes distribution you are using and the storage classes you have configured. If you are using the **c8yedge** tool, this space will be consumed under the directory */var/lib/rancher/*. </p>|
|Edge license file|To request the license file for Edge, [contact product support](/additional-resources/contacting-support/)<br>In the email, you must include <p style="margin: 0; padding-left: 2em;">- Your company name, under which the license has been bought <p style="margin: 0; padding-left: 2em;">- The domain name (for example, myown.iot.com), where Edge will be reachable</p><br>For more information, see [Domain name validation for Edge license key generation](/edge/installing-edge/#domain-name-validation-for-edge-license-key-generation).|
|The Edge registry credentials|You will receive the Edge registry credentials along with the Edge license.|
|TLS/SSL key and certificates|Optional. <br>TLS/SSL private key and domain certificates in PEM format.<br>Generate a TLS/SSL key pair and a Certificate Signing Request (CSR) following your organization's policies, specifying either a wildcard domain in the Common Name (CN) (for example, **.iot.com*) or listing required domains in the Subject Alternative Name (SAN) field, including the Edge tenant and {{< management-tenant >}} tenant domains (for example, *myown.iot.com*, *management-myown.iot.com*).<br>Additionally, verify that the TLS/SSL certificate includes the complete certificate chain in the correct order.|
|Connect Edge to the cloud|Optional. <br>To connect and manage one or more Edge deployments from your {{< product-c8y-iot >}} cloud tenant, you will need an active {{< product-c8y-iot >}} {{< standard-tenant >}} with a subscription plan that includes the _advanced-software-mgmt_ microservice.|

### Domain name validation for Edge license key generation

To procure the Edge license, you must provide the right domain name to product support for Edge license key generation.

When you provide the domain name, consider the following points:

* The domain name does not need to be a Fully Qualified Domain Name (FQDN). For example, to access Edge with the domain name **myown.iot.com**, request the Edge license for **myown.iot.com** or **iot.com** (without the subdomain **myown**).

* If you exclude the subdomain from the domain name in the Edge license, you must possess a wildcard SSL certificate which can be used with multiple subdomains (**myown** or others) of the domain (**iot.com**).<br>
For example, if you provide **iot.com** as the domain name, you must possess an SSL certificate for **.iot.com**.

* If you have an Internationalized Domain Name (IDN), then you must provide the translated ASCII equivalent domain name.<br>
For example, if your domain name is **myown.iöt.com** (for example, containing **ö**), then you must use **myown.xn--it-fka.com**.<br>Also, provide the same translated ASCII equivalent domain name as the tenant domain name during the Edge installation process.<br>

	{{< c8y-admon-info >}}
An Internationalized Domain Name (IDN) is an internet domain name that contains at least one label, in whole or in part, in a language-specific script or alphabet, such as Arabic, Chinese, Cyrillic, Devanagari, Hebrew or the Latin alphabet-based characters with diacritics or ligatures, such as French. The internationalization of domain names is a technical solution to translate names written in language-native scripts into an ASCII text representation that is compatible with the Domain Name System. See [Wikipedia](https://en.wikipedia.org/wiki/Internationalized_domain_name).
	{{< /c8y-admon-info >}}

* Ensure that you adhere to the following domain name validation rules:
	* The domain name must be a combination of case-insensitive alphanumeric characters separated by dot ( . ) or hyphen ( - ).
		* Cannot contain any letters of languages like Chinese, Latin or Arabic.
		* Cannot contain any special characters like (+ , ! @ # $ % ^ & * ( ) ; \ \ / | < > \ " \ ' ) other than dot ( . ) or hyphen ( - ).
	* The length of the domain name including the dot must not exceed 255 characters.
	* The domain name must contain at least one dot.
	* Each segment of the domain name must be separated by a dot.
		* The domain name must be between 1 to 63 characters long.
		* The Top-Level Domain (TLD) which refers to the last segment of the domain name must be between two to six characters long.
		* The domain name cannot begin or end with a hyphen.

