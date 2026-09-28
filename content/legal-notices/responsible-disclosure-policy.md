---
weight: 65
title: Responsible Disclosure Policy
layout: bundle
sector:
  - terms_conditions
---

### General statement

At Cumulocity, the security and integrity of our systems and application platforms are our top priorities. We are dedicated to safeguarding data and appreciate the contributions of security researchers who help us maintain these high standards.

If you are a security researcher and have discovered a potential vulnerability in our systems or applications, we encourage you to report it to us responsibly. The Cumulocity security team values the vital role independent researchers play in strengthening Internet security. We are committed to working closely with you to validate and address any reported vulnerabilities responsibly.

Before conducting any tests or submitting a report, we kindly ask that you review this policy carefully. We guarantee that all legitimate reports will be thoroughly investigated, and we will strive to resolve any confirmed issues promptly.

We also request that you do not disclose, share, or publicize any potential or unresolved vulnerabilities with third parties.

Please note that this program does not provide monetary compensation for submitted reports.

Thank you for partnering with us to ensure the security of Cumulocity.


### Reporting a potential security vulnerability

To report a potential security vulnerability, please privately share the details with Cumulocity by sending an email to csirt@cumulocity.com with “Cumulocity \- Potential Security Vulnerability” in the subject line. Ensure that you provide comprehensive details of the suspected vulnerability to enable our security team to validate and reproduce the issue effectively.

Please note that duplicates may occur if the vulnerability is already known to Cumulocity, either through prior reports from other researchers or identification by our security teams. In such cases, we will recognize the first report received as the unique submission, and any subsequent reports of the same issue will be marked as duplicates.

### Attributes of a good report

To assist our security team in effectively addressing the reported vulnerability, please include the following details in your report:

* **Reproduction steps**\*: Provide detailed, step-by-step instructions on how to reproduce the vulnerability.  
* **Relevant links and URLs**\*: Include any links clicked, pages visited, and specific URLs involved.  
* **Environment details**\*: Mention the environment in which the vulnerability was discovered, including the operating system, browser, and any relevant software versions.  
* **User information**: Mention any user IDs or accounts used, along with a clear description of their relationships and interactions.  
* **Visual aids**: Attach images or videos that illustrate the issue, as these can be highly beneficial.  
* **Impact assessment**: Describe the potential impact of the vulnerability, including possible risks and damages.  
* **Technical details**: Provide any technical information or code snippets that can help in understanding the vulnerability.  
* **Timeline**: Include the date and time when the vulnerability was discovered and any subsequent tests were conducted.

Items marked with \* are considered mandatory.

### Conduct

We encourage responsible discovery and reporting of vulnerabilities. However, to ensure a safe and productive collaboration, the following conduct is expected. If you adhere to this policy when reporting a potential security vulnerability to Cumulocity, we will not pursue legal action or law enforcement investigation against you in response to your report. We ask that you:

* **Allow reasonable time for mitigation**: Give us a reasonable amount of time to investigate and mitigate any reported issue before disclosing it publicly or sharing it with others. Depending on the complexity of the issue, this might take 90 days or more.  
* **Respect customer data**: Do not interact with, modify, or access data from a Cumulocity customer or potential customer without their explicit consent.  
* **Avoid privacy violations and disruptions**: Make a good faith effort to avoid violating privacy, destroying data, or causing interruptions or degradation of our services.  
* **Do not exploit vulnerabilities**: Refrain from exploiting any security issue you discover. This includes demonstrating additional risks or probing for further issues, such as attempting to compromise sensitive company data.  
* **Adhere to laws and regulations**: Ensure that you do not violate any applicable laws or regulations while conducting your research.

By following these guidelines, you help maintain a secure and cooperative environment for vulnerability disclosure.

### Prohibited security research activities

Cumulocity does not permit the following types of security research:

1. **Negative impact actions**:  
   Performing actions that may harm Cumulocity’s services, systems, or users, such as:  
   * Spam, brute force attacks, or credential stuffing.  
   * Denial of Service (DoS) or Distributed Denial of Service (DDoS) attacks.  
   * Actions causing device malfunctions or service interruptions.  
2. **Unauthorized data access**:  
   Accessing, attempting to access, or tampering with data, configurations, or accounts that do not belong to you, including:  
   * Device telemetry data.  
   * Device certificates or provisioning credentials.  
3. **Data destruction or corruption**:  
   Destroying, modifying, corrupting, or attempting to harm data, firmware, or configurations belonging to Cumulocity or its users.  
4. **Attacks on personnel, property, or devices**:  
   Conducting any kind of attack, including:  
   * Physical attacks on Cumulocity personnel, offices, or data centers.  
   * Electronic attacks on hardware devices, gateways, or IoT endpoints.  
5. **Social engineering**:  
   Attempting to manipulate or deceive Cumulocity personnel, contractors, or support teams through phishing, impersonation, or other social engineering tactics.  
6. **Use of high-throughput automated tools**:  
   Deploying automated tools or scripts that generate excessive traffic or disrupt device communications, APIs, or platform services.  
7. **Firmware tampering**:  
   Modifying or reverse-engineering firmware or software beyond authorized scopes to identify vulnerabilities.  
8. **Unauthorized device onboarding**:  
   Attempting to onboard unauthorized devices or abusing device provisioning mechanisms.  
9. **Interference with multi-tenancy**:  
   Testing for vulnerabilities that impact or compromise other tenants' data, devices, or services.  
10. **Physical device access or manipulation**:  
    Gaining unauthorized physical access to Cumulocity-connected IoT devices, hardware, or gateways.  
11. **Legal and contractual violations**:  
    Breaching any laws, agreements, or terms of service while conducting security research.

### Program exclusions

While we encourage any submission affecting the security of our products and services, unless evidence is provided demonstrating exploitability, the following examples are excluded from this program:

* Clickjacking/UI redressing with no practical security impact  
* Content spoofing/text injection  
* Software version disclosure  
* Self-XSS (cross-site scripting issues must be exploitable via reflected, stored, or DOM-based attacks to be considered valid)  
* Logout and other instances of low-severity Cross-Site Request Forgery
* Password and account recovery policies, such as reset link expiration or password complexity  
* Cross-site tracing (XST)  
* Open redirects with low security impact (exceptions are those cases where the impact is higher such as stealing OAuth tokens)  
* Missing HTTP security headers  
* Missing cookie flags on non-sensitive cookies  
* Invalid or missing SPF (Sender Policy Framework) records (Incomplete or missing SPF/DKIM)  
* Vulnerabilities only affecting users of outdated or unpatched browsers and platforms  
* Missing best practices in SSL/TLS configuration  
* Vulnerabilities that require disabling security features enabled in default configurations  
* Comma Separated Values (CSV) injection without demonstrating a vulnerability  
* Use of known-vulnerable libraries without proof of exploitation, for example, OpenSSL  
* Attacks requiring MITM (Man-in-the-Middle) or physical access to a user's device


### Commitment

Cumulocity greatly appreciates the efforts of security researchers who identify vulnerabilities and enable us to address issues that might affect our customers. We thank you for your dedication to helping us minimize risks to our customers and supporting our vision to enhance the overall security of our products and the Internet as a whole.
