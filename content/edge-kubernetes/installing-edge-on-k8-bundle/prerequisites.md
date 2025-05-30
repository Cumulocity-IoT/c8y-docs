---
weight: 10
title: Prerequisites
layout: redirect
---

|<div style="width:140px">Item</div>|Details|
|:---|:---|
|Hardware|CPU: 6 cores<br>RAM: 10 GB<br>CPU Architecture: x86-64 <p>An additional **2 CPU cores** and **4 GB RAM** are required if the {{< product-c8y-iot >}} Messaging Service is enabled, which is required for using the microservice-based data broker and Notifications 2.0. <br><br>**Info:** If you plan to install {{< product-c8y-iot >}} DataHub Edge, ensure your system meets the additional resource requirements outlined in the [DataHub Edge prerequisites](/datahub/running-datahub-on-the-edge/#prerequisites).<br><br>**Info:** These are the minimum system requirements for deploying Edge. If a custom microservice requires additional resources, you must allocate them on top of the minimum requirements. For example, if a microservice needs 2 CPU cores and 4 GB RAM, the Kubernetes node must have an additional 2 CPU cores and 4 GB RAM. <br><br>**Important:** MongoDB requires a CPU that supports AVX instructions. Ensure that the CPU type of the Kubernetes node supports AVX instructions. Use the command `lscpu` to check whether the CPU supports AVX instructions.|
|Kubernetes| Required only when [installing with the Kubernetes-native approach](/edge-kubernetes/installing-edge-on-k8/#install-edge-with-edge-operator). <br>Edge has been tested and validated on Kubernetes version 1.32.x, the latest GA release at the time of product release. However, we support any Cloud Native Computing Foundation (CNCF) certified Kubernetes distribution that is still in active support, including: <p style="margin: 0; padding-left: 2em;">- [Lightweight Kubernetes (K3s)](https://docs.k3s.io/installation)<p style="margin: 0; padding-left: 2em;">- [Amazon Elastic Kubernetes Service (EKS)](https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html)<p style="margin: 0; padding-left: 2em;">- [Microsoft Azure Kubernetes Service (AKS)](https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-portal?tabs=azure-cli)<p style="margin: 0; padding-left: 2em;">- [Upstream Kubernetes (K8s)](https://kubernetes.io/docs/setup/)|
|Helm version 3.x|Required only when [installing with the Kubernetes-native approach](/edge-kubernetes/installing-edge-on-k8/#install-edge-with-edge-operator). <br>Refer to [Installing Helm](https://helm.sh/docs/intro/install/) for the installation instructions.|
|Disk space|100 GB <p>An additional **15 GB** is required for Pulsar’s persistent message storage if the {{< product-c8y-iot >}} Messaging Service is enabled, which is required for using the microservice-based data broker and Notifications 2.0. <br><br>**Info:** If you plan to install {{< product-c8y-iot >}} DataHub Edge, ensure your system meets the additional resource requirements outlined in the [DataHub Edge prerequisites](/datahub/running-datahub-on-the-edge/#prerequisites). <p>For more information about configuring the storage, see [Configuring storage](/edge-kubernetes/installing-edge-on-k8/#configuring-storage).|
|Edge license file|To request the license file for Edge, [contact product support](/additional-resources/contacting-support/)<br>In the email, you must include <p style="margin: 0; padding-left: 2em;">- Your company name, under which the license has been bought <p style="margin: 0; padding-left: 2em;">- The domain name (for example, myown.iot.com), where Edge will be reachable</p><br>For more information, see [Domain name validation for Edge license key generation](/edge-kubernetes/installing-edge-on-k8/#domain-name-validation-for-edge-license-key-generation).|
|The Edge operator registry credentials|You will receive the Edge operator registry credentials along with the Edge license.|
|TLS/SSL key and certificates|Optional. <br>TLS/SSL private key and domain certificates in PEM format.<br>Generate a TLS/SSL key pair and a Certificate Signing Request (CSR) following your organization's policies, specifying either a wildcard domain in the Common Name (CN) (for example, **.iot.com*) or listing required domains in the Subject Alternative Name (SAN) field, including the Edge tenant, {{< management-tenant >}}, and, if applicable, {{< product-c8y-iot >}} DataHub domains (for example, *myown.iot.com*, *management-myown.iot.com*, *datahub-myown.iot.com*).<br>Additionally, verify that the TLS/SSL certificate includes the complete certificate chain in the correct order.|
|Connect Edge to the cloud|Optional. <br>To connect and manage one or more Edge deployments from your {{< product-c8y-iot >}} cloud tenant, you will need an active {{< product-c8y-iot >}} {{< standard-tenant >}} with a subscription plan that includes the _advanced-software-mgmt_ microservice.|

### Domain name validation for Edge license key generation

To procure the Edge license, you must provide the right domain name to the {{< company-c8y >}}'s logistics team for Edge license key generation.

When you provide the domain name, consider the following points:

* The domain name does not need to be a Fully Qualified Domain Name (FQDN). For example, to access the Edge with the domain name **myown.iot.com**, request the Edge license for **myown.iot.com** or **iot.com** (without the subdomain **myown**).

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

