---
weight: 20
title: Device certificates
layout: bundle
sector:
  - device_management
---

Devices can authenticate to {{< product-c8y-iot >}} using X.509 certificates over REST (port 8443) using mTLS.

Devices can also generate JWT session tokens by using X.509 certificates for authentication over a defined REST endpoint - device access token API. This session token can be used in subsequent requests to authenticate to {{< product-c8y-iot >}}.

Each tenant individually defines whom it trusts by uploading the base CA certificate.

Devices can communicate using the MQTT interface of the platform, but MQTT over WebSocket is not supported. The {{< product-c8y-iot >}} platform expects devices to connect using SSL on port 8883.

Devices connecting to the platform with certificates do not need to provide the tenant ID, username and password. Authentication information will be obtained from the certificates.


### Prerequisites {#prerequisites}

In order to follow this tutorial, check if the following prerequisites are met:

-   You have a valid tenant, user and password in order to access {{< product-c8y-iot >}}.
-   The command line tool CURL is installed on your system.

#### General requirements for connecting devices with certificates {#general-requirements-for-connecting-devices-with-certificates}

* The CA certificate may also be a self-signed certificate.
* Certificates must be uploaded as X.509 version 3 certificates.
* Uploaded certificates must have set `BasicConstraints:[CA:true]`.
* Devices must trust the {{< product-c8y-iot >}} server certificate.
* Certificates used by devices must contain the certificate chain that includes the uploaded CA certificate.
* If only the device certificate is provided, then the immediate issuer certificate must be uploaded to the platform’s truststore.
* Certificates used by devices must be signed either by uploaded CA certificates or by intermediate certificates signed by uploaded CA certificates.

### Registering devices using certificates {#registering-devices-using-certificates}

{{< product-c8y-iot >}} supports two ways to register devices which will be able to connect using certificates:

**Auto registration**

The user for the device will be created during the first MQTT call, if a device certificate is derived from a trusted certificate which was uploaded to the {{< product-c8y-iot >}} platform with a flag _autoRegistrationEnabled_ with a value of true.
Auto-registration must be activated for the uploaded certificate.
If auto-registration is not activated it is required to use the bulk registration (see below).
To manage the auto registration field of uploaded certificates in the UI refer to [Managing trusted certificates](/device-management-application/managing-device-data/#managing-trusted-certificates).

The device_user will be created when the API is called for the first time, provided:

* The trusted certificate is uploaded to the platform.
* The auto registration is enabled.
* The device certificate is derived from a trusted certificate uploaded to the {{< product-c8y-iot >}}.

**Bulk registration**

The user for the device can also be created via the standard [bulk registration](/device-management-application/registering-devices/#to-bulk-register-devices) in the Device Management application.

The CSV file used in bulk registration should meet the requirements described in [Create a bulk device credentials request](https://{{< domain-c8y >}}/api/core/#operation/postBulkNewDeviceRequestCollectionResource) in the {{< openapi >}}. Moreover, it is required that the CSV file has an additional column AUTH_TYPE with value CERTIFICATES, and that the column CREDENTIALS is either not present or has an empty value.

**Single registration**

Single registration is not supported for devices which are going to use certificates for authentication.

{{< c8y-admon-info >}}
During device registration, the device user is created, which is necessary for device communication with the platform.
{{< /c8y-admon-info >}}

### Introduction to X.509 certificates {#introduction-to-x509-certificates}

X.509 is a standard that defines public key certificates, which are commonly used in the SSL protocol to provide secure connection and data transfer.
Version 3 is up-to-date since 1995.

The general purpose of an X.509 certificate is to bind an identity to a pair of keys: the public key is publicly known as a part of the certificate while the private key is known only by the certificate owner.
Such pairs of keys should be created with an asymmetric-key algorithm, which is considered secure nowadays.
An example of such an algorithm is RSA with at least 2048 bits key size.
A size of 1024 bits or lower is no longer considered safe.
A private key can be used in two ways:

* To prove that the message was sent by the certificate owner - The owner encrypts some message with his private key and sends it. Then the receiver can decrypt it with the sender's public key. If the decrypted message matches his expectation, then he can be sure that it was sent by the certificate owner.
* To read a message intended only for the certificate owner - If someone encrypts the message with receiver public key, then only the owner of the private key would be able to decrypt it. No third party who somehow intercepted the message will be able to read it.

Every certificate can be self-signed or can be signed by another certificate.
To tell if the certificate is self-signed you can look at the "Issuer Name" and "Subject Name" fields of the certificate.
If they are the same then it means that it is a self-signed certificate, otherwise the certificate claims to be signed by the issuer.
To verify if the issuer really signed the certificate, you must check the "Signature" field of the certificate.
After decryption with the issuer's public key, the signature should match the data of the signed certificate.
Signing a certificate by another, means that if the issuer's certificate is trusted then the signed certificate also can be trusted.

For example if a platform trusts the customer certificate and that customer has 20 devices with individual certificates, then he does not have to upload each one of them.

If these device certificates are signed by the customer certificate, then the platform should trust them too.
In this case, every device should send not only its own certificate, but the whole chain of certificates (so-called chain of trust) during the SSL handshake.

The chain of certificates starts with the one belonging to the device, through all used intermediate certificates until it reaches the CA certificate trusted by the platform.
Usually the chain of certificates does not have to contain the trusted CA certificate, so it can end with the certificate signed directly by the CA.
However, in the {{< product-c8y-iot >}} platform it is also required to provide the trusted CA certificate in the chain of certificates.

Providing the chain of certificates lets the platform verify the signatures of every certificate in the chain to make sure that the device certificate is signed directly or indirectly by the trusted certificate.
The chain of the certificates can differ in length, so if the platform trusts certificate A and certificate B is signed by A, and certificate C is signed by B, then certificate C will also be trusted.
However, there are a few things to keep in mind:

* Every certificate which is used to sign another certificate must contain the extension "CA:TRUE".
* The lengths of the chain of certificates can be restricted by the certificate extension "pathlen". This extension limits the amount of other CA certificates that can be placed in the chain between the device certificate and the one with that extension. For example the valid chain of the certificates with minimal values of path length would look like this: "A (CA:TRUE, pathlen: 2) -> B (CA:TRUE, pathlen: 1) -> C (CA:TRUE, pathlen: 0) -> D (device with CA:FALSE)"".

The structure of an X.509 certificate in version 3 looks like this:

* Version - The version number of the x.509 certificate,
* Serial Number - Unique serial number that is created for each certificate that is created by an issuer,
* Issuer - The distinguished name of the issuer,
* Not Before - Date since the certificate is valid,
* Not After - Date since the certificate is expired,
* Subject - Distinguished name of the certificate's owner,
* Public Key Algorithm - Algorithm used to generate the public key,
* Subject Public Key - Public key value,
* Certificate Signature Algorithm - Algorithm used to generate the certificate signature,
* Certificate Signature - Certificate signature generated by encrypting certificate data with the issuer's private key,
* Extensions - optional; they are responsible for providing various pieces of information, for example if the certificate is CA, which means that it can be used to sign another certificate. Added in version 3 of X.509,
* Issuer Unique Identifier - optional; can be present in the certificate to handle the possibility of reuse of issuer names,
* Subject Unique Identifier - optional; can be present in the certificate to handle the possibility of reuse of subject names.

To show how the authentication with X.509 certificates works, there is an example of the simplified mutual SSL handshake:

![Simplified mutual SSL handshake](/images/mqtt/sslMutualSimplified.png)

A server knows that the client is the owner of the certificate it sent, after the server has decrypted the encrypted copy of the message using the client's public key.
The client knows that the server is the owner of the certificate it sent, if the server uses the correct session key, because that means that the server decrypted it with its private key.
In basic authentication with username and password, the password must be sent over the network to authenticate the user.
When certificates are used, the private key is never sent, which makes the use of the certificates much more secure than the basic authentication with username and password.

There are 3 important terms related to X.509 certificates, which everyone should know who wants to start working with them:

* Keystore is a file which a device uses to authenticate itself in the mutual SSL handshake. That means that keystore contains the chain of the certificates used by the device and the private key of the device.
* Truststore is a file which contains all trusted certificates. A server or device would only establish a connection with something that is using a certificate from their truststore. When the chain of certificates is used, only one of the certificates in the chain must be trusted to establish the connection.
* Certificate Authority (CA) in the simplest sense is an entity that signs certificates.

Both keystore and truststore can be stored in the same file, but for security reasons we recommended you to keep them separately.
The truststore contains public data and the keystore contains the private key, which only to the owner should know.
The most popular formats for these files are:

* PKCS12 (Public Key Cryptography Standards, version 12), which can be generated using the OpenSSL toolkit.
* JKS (Java KeyStore), which can be generated with the Java Keytool.

### Generating and signing certificates {#generating-and-signing-certificates}

To generate certificates we use the OpenSSL toolkit. If you do not have it already installed, then you can download if from the website: https://www.openssl.org/source/

#### Creating a self-signed CA certificate {#creating-a-self-signed-ca-certificate}

1. Create a directory for the root certificate and the signing configuration, for example:

   `mkdir /home/user/Desktop/caCertificate`

2. Go to the created directory and create a configuration file for your CA certificate:

   `touch caConfig.cnf`

3. Create a database file for keeping the history of certificates signed by the CA:

   `touch database.txt`

4. Create a serial file with initial serial number, which will be used to identify signed certificates. After assigning this serial to the signed certificate, the value in this file will be automatically incremented:

   `echo 1000 > serial`

5. Create subdirectories for signed certificates and the certificate revocation list:

   `mkdir deviceCertificates crl`

6. Fill in the configuration file. This is the example configuration, which can be used for tests after changing the directory `dir` to your own. If you want to use it in the production environment then please consult it first with some security specialist:

    ```text
    [ ca ]
    default_ca = CA_default
    [ CA_default ]
    # Directory and file locations.
    dir               = /home/user/Desktop/caCertificate
    certs             = $dir # directory where the CA certificate will be stored.
    crl_dir           = $dir/crl # directory where the certificate revocation list will be stored.
    new_certs_dir     = $dir/deviceCertificates # directory where certificates signed by CA certificate will be stored.
    database          = $dir/database.txt # database file, where the history of the certificates signing operations will be stored.
    serial            = $dir/serial # directory to the file, which stores next value that will be assigned to signed certificate.

    # The CA key and CA certificate for signing other certificates.
    private_key       = $dir/caKey.pem # CA private key which will be used for signing certificates.
    certificate       = $dir/caCert.pem # CA certificate, which will be the issuer of signed certificate.

    default_md        = sha256 # hash function
    default_days      = 375 # default number of days for which the certificate will be valid since the date of its generation.
    preserve          = no # if set to 'no' then it will determine the same order of the distinguished name in every signed certificate.
    policy            = signing_policy # the name of the tag in this file that specifies the fields of the certificate. The fields must be filled in or even match the CA certificate values to be signed.

    # For certificate revocation lists.
    crl               = $crl_dir/caCrl.pem # CA certificate revocation list
    crlnumber         = $crl_dir/crlnumber # serial, but for the certificate revocation list
    crl_extensions    = crl_ext # the name of the tag in this file, which specifies certificates revocation list extensions, which will be added to the certificate revocation by default.
    default_crl_days  = 30 # default number of days for which the certificate revocation list will be valid since the date of its generation. After that date it should be updated to see if there are new entries on the list.

    [ req ]
    default_bits        = 4096 # default key size in bits.
    distinguished_name  = req_distinguished_name # the name of the tag in this file, which specifies certificates fields description during certificate creation and eventually set some default values.
    string_mask         = utf8only # permitted string type mask.
    default_md          = sha256 # hash function.
    x509_extensions     = v3_ca # the name of the tag in this file, which specifies certificates extensions, which will be added to the created certificate by default.

    # descriptions and default values of the created certificate fields.
    [ req_distinguished_name ]
    countryName                     = Country Name (2 letter code)
    stateOrProvinceName             = State or Province Name
    localityName                    = Locality Name
    organizationName                = Organization Name
    organizationalUnitName          = Organizational Unit Name
    commonName                      = Common Name
    emailAddress                    = Email Address

    # A default value for each field can be set by adding an extra line with field name and postfix "_default". For example: "countryName_default = PL". If you add this line here, then leaving country name empty during certificate creation will result in the value "PL" being used. If the default value was specified there, but during certificate creation you do not want to use this value, then instead use "." as the value. It will leave the value empty and not use the default.

    # default extensions for the CA certificate.
    [ v3_ca ]
    subjectKeyIdentifier = hash # subject key value will be calculated using hash funtion. It's the recommended setting by PKIX.
    authorityKeyIdentifier = keyid:always,issuer # The subject key identifier will be copied from the parent certificate. It's the recommended setting by PKIX.
    basicConstraints = critical, CA:true, pathlen:10 # "critical" specifies that the extension is important and must be read by the platform. CA says if it is the CA certificate so it can be used to sign different certificates. "pathlen" specifies the maximum path length between this certificate and the device certificate in the chain of certificates during authentication. Path length is set here only to show how it is done. If you do not want to specify max path length, you can keep only the "basicConstraints = critical, CA:true" part here.
    keyUsage = digitalSignature, cRLSign, keyCertSign # specifies permitted key usages.

    # Default extensions for the device certificate. This tag is not used directly anywhere in this file, but will be used from the command line to create signed certificate with "-extensions v3_signed" parameter.
    [ v3_signed ]
    subjectKeyIdentifier = hash
    authorityKeyIdentifier = keyid,issuer
    basicConstraints = critical, CA:false
    keyUsage = nonRepudiation, digitalSignature, keyEncipherment

    # default extensions for certificate revocation list
    [ crl_ext ]
    authorityKeyIdentifier=keyid:always

    # Policy of certificates signing. It specifies which certificate fields must be filled in during certificate creation. There are three possible values here:
    # "optional" - field value can be empty
    # "supplied" - field value must be filled in
    # "match" - signed certificate field value must match the CA certificate value to be created
    [ signing_policy ]
    countryName             = optional
    stateOrProvinceName     = optional
    organizationName        = optional
    organizationalUnitName  = optional
    commonName              = supplied # every certificate should have a unique common name, so this value should not be changed.
    emailAddress            = optional
    ```

7. Create a private key with aes256 encryption and a length of at least 2048 bits. You will also be asked to set the password for the key during its creation:

   `openssl genrsa -aes256 -out caKey.pem 4096`

8. Create a self-signed certificate using specifications from the configuration file. The "days" parameter says how long this certificate will be valid since the generation, so set it as you prefer:

   `openssl req -config caConfig.cnf -key caKey.pem -new -x509 -days 7300 -sha256 -extensions v3_ca -out caCert.pem`

9. You can print the created certificate with the command:

   `openssl x509 -noout -text -in caCert.pem`

#### Creating an intermediate certificate {#creating-an-intermediate-certificate}

The intermediate certificate is signed by the CA certificate, but will also be used to sign device certificates.
This step is optional.
If you are fine with signing all the device certificates with one common CA certificate, then you can skip this step.
However, if you need some certificates between the CA certificate and the device certificate then it is the way to go.
Keep in mind that in the {{< product-c8y-iot >}} cloud the maximum length of the chain of certificates is currently restricted to 10.
This behaviour can be changed for dedicated installations by changing a platform wide configuration setting and increasing (or decreasing) the allowed maximum length of the chain of certificates to more (or less) than 10.
If you use a chain with a length greater than 2, we strongly recommend you to use the proof of possession feature to protect your service from DOS attacks.

To create the intermediate certificate:

1. Create a new directory for intermediate certificates inside the caCertificate path: `mkdir intermediateCertificate`
2. Go to this directory and create a configuration file for your intermediate certificate: `touch intermediateConfig.cnf`
3. Create a database file for keeping the history of certificates signed by the intermediate certificate: `touch database.txt`
4. Create a serial file with initial serial number, which will be used to identify signed certificates: `echo 1000 > serial`
5. Create subdirectories for the signed certificates and the certificate revocation list: `mkdir deviceCertificates crl`
6. Fill in the configuration file as in the CA configuration, but remember to change the general directory ("dir") to your intermediateCertificate folder. Also don't forget to change private_key, certificate and crl names from current with "ca" prefix to "intermediate" prefix (for example: caKey.pem -> intermediateKey.pem), because files with this prefix will be generated in the next steps.
7. Generate a private key for the intermediate certificate: `openssl genrsa -aes256 -out intermediateKey.pem 4096`
8. Generate a certificate signing request: `openssl req -config intermediateConfig.cnf -new -sha256 -key intermediateKey.pem -out intermediateCsr.pem`
9. Go to the caCertificate directory and generate a signed intermediate certificate. You must use the CA configuration here, because the private key specified in the configuration file will be used to sign the certificate: `openssl ca -config caConfig.cnf -extensions v3_ca -days 3650 -notext -md sha256 -in intermediateCertificate/intermediateCsr.pem -out intermediateCertificate/intermediateCert.pem`
10. Verify if the generated certificate is correctly signed by CA: `openssl verify -CAfile caCert.pem intermediateCertificate/intermediateCert.pem`

#### Creating a device certificate signed by CA or intermediate {#creating-a-device-certificate-signed-by-ca-or-intermediate}

1. Go to the directory of your caCertificate or intermediateCertificate depending on which one is used to sign the device certificate.
2. Generate the private key for the new certificate: `openssl genrsa -aes256 -out deviceCertificates/deviceKey.pem 4096`
3. Generate the certificate signing request (change "caConfig.cnf" to "intermediateConfig.cnf" if you are in the intermediateCertificate directory): `openssl req -config caConfig.cnf -new -sha256 -key deviceCertificates/deviceKey.pem -out deviceCertificates/deviceCsr.pem`
   Remember that the `commonName` of the device certificate, which you will be asked to provide in the console, must match the [ClientId](/device-integration/mqtt/#mqtt-clientid) of the device during the connection.
4. Generate the certificate signed by the CA or intermediate (change "caConfig.cnf" to "intermediateConfig.cnf" if you are in the intermediateCertificate directory): `openssl ca -config caConfig.cnf -extensions v3_signed -days 365 -notext -md sha256 -in deviceCertificates/deviceCsr.pem -out deviceCertificates/deviceCert.pem`
5. Verify if the generated certificate is correctly signed by CA or intermediate (change "caCert.pem" to "intermediateCert.pem" if you are in the intermediateCertificate directory): `openssl verify -partial_chain -CAfile caCert.pem deviceCertificates/deviceCert.pem`

#### Creating the chain of certificates {#creating-the-chain-of-certificates}

Go into your caCertificate directory.

If you created the CA certificate, which was used to sign the intermediate certificate and then the intermediate certificate was used to sign the device certificate, then you create your chain with the command:

```shell
cat intermediateCertificate/deviceCertificates/deviceCert.pem intermediateCertificate/intermediateCert.pem caCert.pem > intermediateCertificate/deviceCertificates/deviceCertChain.pem
```
If you are not using the intermediate certificate then the command is:

```shell
cat deviceCertificates/deviceCert.pem caCert.pem > deviceCertificates/deviceCertChain.pem
```

If you are using multiple intermediate certificates between the CA certificate and the device certificate, then remember that you must keep the correct order during the chain creation (Every certificate must be followed by the certificate, which it is signed by).

#### Creating keystore and truststore {#creating-keystore-and-truststore}

1. Go into your deviceCertificates directory with the device's private key and the generated chain of certificates. If you are using an intermediate certificate between the CA certificate and the device certificate then it will be the `caCertificate/intermediateCertificate/deviceCertificates` path, otherwise it will be `caCertificate/deviceCertificates`. Create keystore using the generated chain of certificates and the private key of the device: `openssl pkcs12 -export -name devicekeyentry -inkey deviceKey.pem -in deviceCertChain.pem -out deviceKeystore.pkcs12`
2. If you want to convert your keystore to JKS format then you would need the Java Keytool which is usually downloaded together with Java Development Kit: `keytool -importkeystore -srckeystore deviceKeystore.pkcs12 -srcstoretype PKCS12 -destkeystore deviceKeystore.jks -deststoretype JKS`
3. If you do not have the server certificate, get it by the command: `openssl s_client -showcerts -connect <cumulocity url>:<mqtt mutual ssl port (currently 8883, but that can be changed in the future)> | openssl x509 -outform PEM > serverCertificate.pem`
4. Now you can create a truststore, which will contain the server certificate. It must be created with Java Keytool (openssl does not support creating truststore, so if you don't want to use Java keytool then you must keep every trusted certificate in a separate PEM file).
   Remember that `alias` is the unique identifier for every keystore or truststore entry. It means that if you want to add a second trusted certificate to the same truststore then you must change the alias from `servercertificate` in the command below to some other name:
    * In PKCS12 format: `keytool -importcert -noprompt -keystore deviceTruststore.pkcs12 -alias servercertificate -file serverCertificate.pem`
    * In JKS format: `keytool -import -file serverCertificate.pem -alias servercertificate -keystore deviceTruststore.jks`
5. Optionally, instead of creating a new file for the truststore, you can add the trusted certificates to your created keystore and store everything in one file, which is not the recommended solution:
    * If your keystore is in the PKCS12 format: `keytool -importcert -noprompt -keystore deviceKeystore.pkcs12 -alias servercertificate -file serverCertificate.pem`
    * If your keystore is in the JKS format: `keytool -import -file serverCertificate.pem -alias servercertificate -keystore deviceKeystore.jks`
6. You can check the content of your keystore (or truststore) with the command: `keytool -list -v -keystore deviceKeystore.jks`

### Keystore and truststore {#keystore-and-truststore}

Generate a keystore and a truststore as described in [Generating and signing certificates](#generating-and-signing-certificates) if you didn't do it yet.

### Upload your CA certificate {#upload-your-ca-certificate}

Upload your CA (or intermediate) certificate to the platform. This operation will add your uploaded certificate to the server's truststore. It can be done in two ways, both of which have a role requirement of either ROLE_TENANT_ADMIN or ROLE_TENANT_MANAGEMENT_ADMIN:

**Via UI:**

1. In the Device Management application, navigate to the **Management** menu in the navigator and select **Trusted certificates**.
2. In the resulting dialog, enter a custom name for the new certificate.
3. Drop your CA certificate (caCert.pem or intermediateCert.pem).
4. Select the **Auto registration** check box.
5. Set the toggle to **Enabled**.
6. Click **Add certificate**.

Then new certificate will be added to the trusted certificates list:

![Trusted certificate added](/images/mqtt/mqtt-certificate-added.png)

**Via REST:**

1. Display your CA (or intermediate) certificate, which you want to upload to the {{< product-c8y-iot >}} platform and copy its PEM value, which starts with "-----BEGIN CERTIFICATE-----" and ends with "-----END CERTIFICATE-----" (including the hyphens). Remove new line symbols (`\n`) if they were added automatically at the end of each line: `openssl x509 -in caCert.pem -text`
2. Send it to the platform via POST request:

```text
    POST /tenant/tenants/<TENANT_ID>/trusted-certificates
    Host: https://<TENANT_DOMAIN>/
    Authorization: Basic <YOUR_AUTHENTICATION>
    Content-Type: application/json
    {
    	"status" :  "ENABLED",
    	"name" : "certificateName",
    	"autoRegistrationEnabled" : "true",
    	"certInPemFormat" : "<CERT_PEM_VALUE>"
    }
```
### Perform a proof of possession {#perform-a-proof-of-possession}

{{< product-c8y-iot >}} platform uses X.509 certificates to authenticate end devices.
The certificates work with a chain of trust: you can create trustworthy subcertificates with a trusted certificate.
Each certificate consists of a public and a private part.
Also see [asymmetric encryption](https://en.wikipedia.org/wiki/Public-key_cryptography).

{{< product-c8y-iot >}} platform receives the public part of each certificate that is to be used for device authentication.
The assignment of the device to a tenant is also done by the certificate, since each certificate must be uniquely assigned.
Performing the proof of possession steps filters out all certificates without prior proof of possession, giving preference to tenant mappings of certificates with a validated proof of possession.

However, since the public part of a certificate (and the subcertificates) is not secret, anyone on the internet theoretically has access to it.
A potential attacker could upload the public part of a certificate to {{< product-c8y-iot >}} platform even if he does not have access to the private part of the certificate (thus not being the owner of the certificate).
In this case the {{< product-c8y-iot >}} platform cannot decide which uploader is the legitimate one, so the platform does not accept any reference to this certificate as valid, which would result in a DOS scenario.

To ensure verification of ownership by the uploader, a proof of possession is required by the platform.

The steps for the proof of possession are as follows:

1. Navigate to **Management** > **Trusted certificates** in the Device Management application and verify that the certificate has been uploaded properly.
   <br>![Verify certificate](/images/mqtt/mqtt-cert-check.png)

2. In the **Proof of Possession** section of the certificate details, download the verification code.
   <br>![Download verification code](/images/mqtt/mqtt-cert-download-unsigned.png)

3. Encrypt the verification code using the private key of the certificate to produce the signed verification code.
   Use the following OpenSSL command:

   `openssl dgst -sha256 -sign <private.key> <verification_code.txt> | openssl base64 -A`

4. Upload the signed verification code to the platform.
   <br>![Upload signed verification code](/images/mqtt/mqtt-cert-upload-signed.png)

The proof of possession is confirmed if the uploaded signed verification code matches the signed verification code expected by the platform. This is indicated by switching the state from "Incomplete" to "Complete" in the **Proof of Possession** section.


{{< c8y-admon-info >}}
If administrators cannot carry out this process on their own for organizational reasons, they can manually request the proof of possession for the corresponding certificate and the {{< product-c8y-iot >}} support team can complete the proof of possession through a back end API upon reasonable verification.
{{< /c8y-admon-info >}}
