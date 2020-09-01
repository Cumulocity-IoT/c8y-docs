---
weight: 10
title: Requirements
layout: redirect
---

### Installation requirements

|Item|Details|
|:---|:---|
|**Hypervisor**|- VMWare ESXi 6.5 and 6.7 <br> - VMware Workstation Player 15.x <br>- Hyper-V on Microsoft Windows 10 Pro and Windows 10 Enterprise, version 1809 <br> - Virtualbox version 5.2.8, to be downloaded from [https://www.virtualbox.org](https://www.virtualbox.org/wiki/Download_Old_Builds_5_2)<br>**Info:** Support for VirtualBox is deprecated and it is not recommended to be used in a production environment. The Virtualbox version 5.2.8 can be used only for testing.
|**Edge VM image**|To be downloaded from the [Software AG Empower portal](https://empower.softwareag.com), based on the target hypervisor. <br> For VMware (ESXi and Workstation Player), download all the 4 files of VMware (ovf, mf and two disks vmdk files). <br> For Hyper-V, download the ZIP file. <br> For VirtualBox, download the OVA file.|
|**Cumulocity IoT Edge license file**|To request the license file for Cumulocity IoT Edge, contact the logistics team for your region:<br> - North and South America: LogisSrvus@softwareagusa.com <br>- All Other Regions: LogisticsServiceCenterGER@softwareag.com <br>In the email, you must include <br> - your company name, under which the license has been bought <br> - the domain name (for example, myedge.domain.com), where Cumulocity IoT Edge will be reachable<br>For more information, see [Domain name validation for Edge license key generation](#domain-name-validation-for-edge-license-key-generation).|
|**SSL key and SSL certificate**|Use your internal or an external CA (Certification Authority) to create these.<br>**Info:** Ensure that the .crt and .key files are in PEM format and the .key file is not encrypted.|
|**Apama license**|The Apama license key is provided as part of your purchase. To request the license keys for your Apama purchase, contact the logistics team for your region:<br> - North and South America: LogisSrvus@softwareagusa.com <br> - All Other Regions: LogisticsServiceCenterGER@softwareag.com<br>**You must procure the Apama license key if you plan to use Apama functionality in Cumulocity IoT Edge.**<br>|
|**DNS entry**|The DNS (Domain Name System) is used to resolve human readable host names like www.cumulocity.com to machine readable IP addresses like 192.198.1.10. <br> If you want to connect to Edge VM within your LAN, the DNS entry has to be added for the domain name (URL under which Cumulocity IoT Edge can be reached) with the IP address of the host.|
|**Edge cloud remote access**|To connect and manage one (or multiple) Edge devices to your Cumulocity IoT cloud tenant, you need an active Cumulocity IoT standard tenant with the Data Broker and Cloud Remote Access extensions.<br>**Info:** The Edge cloud remote access is an optional feature in Cumulocity IoT Edge.|

### Domain name validation for Edge license key generation

To procure the Cumulocity IoT Edge license file, you must provide the right domain name to the Software AG's logistics team for Edge license key generation.

When you provide the domain name, consider the following points:

* The domain name does not need to be a Fully Qualified Domain Name (FQDN).<br>
For example, to access the Edge platform with the domain name **myown.iot.com**, request the Edge license for **myown.iot.com** or **iot.com** (without the sub-domain **myown**).

	>**Important:** When you are running the Edge post installation process, you must use the FQDN. For example, **myown.iot.com**.

* If you exclude the sub-domain from the domain name in the Edge license, you should possess a wildcard SSL certificate which can be used with multiple sub-domains (**myown** or others) of the domain (**iot.com**).<br>
For example, if you provide **iot.com** as the domain name, you should possess an SSL certificate for ***.iot.com**.

* If you have an Internationalized Domain Name (IDN), then you should provide the translated ASCII equivalent domain name.<br>
For example, if your domain name is **myown.iöt.com** (for example, containing **ö**), then you should use **myown.xn--it-fka.com**.<br>Also, provide the same translated ASCII equivalent domain name as the tenant domain name during the Edge post installation process.<br>

	>**Info:** An Internationalized Domain Name (IDN) is an internet domain name that contains at least one label, in whole or in part, in a language-specific script or alphabet, such as Arabic, Chinese, Cyrillic, Devanagari, Hebrew or the Latin alphabet-based characters with diacritics or ligatures, such as French. The internationalization of domain names is a technical solution to translate names written in language-native scripts into an ASCII text representation that is compatible with the Domain Name System. See [Wikipedia](https://en.wikipedia.org/wiki/Internationalized_domain_name).

* Ensure that you adhere to the following domain name validation rules:
	* The domain name may contain lowercase letters, digits or hyphens. It must start with a letter; hyphens are only allowed in the middle; minimum is 2 characters. The domain name can be a combination of lowercase or alphanumeric characters separated by dot ( . ) or hyphen ( - ) Note that the usage of underscore characters is deprecated, but still possible for backward compatibility reasons.
		* Cannot contain any letters of languages like Chinese, Latin or Arabic.
		* Cannot contain any special characters like (+ , ! @ # $ % ^ & * ( ) ; \ \ / | < > \ " \ ' ) other than dot ( . ) or hyphen ( - ).
	* The length of the domain name including the dot must not exceed 255 characters.
	* Each segment of the domain name separated by a dot must be between 1 to 63 characters long.
		* The Top-Level Domain (TLD) which refers to the last segment of the domain name must be between two to six characters long.
		* The domain name cannot begin or end with a hyphen.

### Network connectivity

The following network ports must be reachable from the local network:

* HTTPS
* MQTT over TLS
* SSH, only for configuring the appliance

If Cumulocity IoT Edge should communicate with the cloud, the following ports of www.cumulocity.com (or another instance) need to be available:

* HTTPS
* MQTT over TLS

There is no internet connection required during installation. Internet connection during runtime is optional, and only used if this is configured in the Data Broker. 

#### Incoming traffic

The following ports need to be enabled by default in order to accept traffic from users and devices on the internet (also refer to "Setting up port forwarding" in [Setting up the environment](/edge/installation#setting-up-the-environment)):

|Source IP|Source Port|Destination IP|Destination Port|Service
|:---|:---|:---|:---|:---
|any|any|Edge VM IP|TCP/80|HTTP
|any|any|Edge VM IP|TTCP/443|HTTPS
|any|any|Edge VM IP|TCP/1883|MQTT
|any|any|Edge VM IP|TCP/8883|MQTT/TLS

Depending on additional integrations more ports must be opened. 

#### Outgoing Traffic

The core node must be able to connect to the internet. Ports required to outside are:

|Service|Port|
|:---|:---|
|HTTP|80|
|HTTPS|443|

Depending on the installed integrations (email, SMS, etc.) different ports might have to be opened in order to make these services available to the Cumulocity IoT platform. The descriptions of these ports are delivered with the corresponding integrations.

Depending on the DNS and NTP setup it might be the case that DNS (UDP/53) and NTP (UDP/123) connections to the internet must be possible from all hosts.


### Hardware requirements

The virtual machine has the following minimum hardware requirements:

|Hardware|Configuration|
|:---|:---|
|Disk space|100 GB
|CPU|Intel x86
|Number of CPU cores|2 - without microservice <br>4 - with microservice
|RAM|6 GB - without microservice <br>8 GB - with microservice
|Network Interface Controller (NIC)|1

These are the minimum system requirements to enable the microservice hosting feature. If the microservice requires additional system resources, you must configure the system requirements accordingly in addition to minimum system requirements. For example, if the microservice requires 2 CPU cores and 4 GB of RAM, then the VM must have 6 CPU cores (4 cores for VM + 2 cores for microservice) and 12 GB of RAM (8 GB for VM + 4 GB for microservice).

>**Info:** This does not cover host operating system hardware requirements. The host operating system resource requirements should be sized independently and should be over and above the resource allocated to the virtual machines.

