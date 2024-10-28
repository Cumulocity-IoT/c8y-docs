---
weight: 20
title: Documentation versions
layout: bundle
sector:
  - about_website
---

This {{< product-c8y-iot >}} documentation website provides the documentation for the SaaS cloud offering and for the yearly releases under maintenance. Documentation for previous releases is accessible as described below.

### Release 10.18 and 10.17 {#release-10-18-and-10-17}

The user documentation for the releases 10.18 and 10.17 is available at [https://cumulocity.com/guides/welcome/intro-documentation/](https://cumulocity.com/guides/welcome/intro-documentation/).

### Releases out of maintenance {#release-out-of-maintenance}

The user documentation for previous releases which are out of maintenance is available in a  GitHub repository called [c8y-docs](https://github.com/SoftwareAG/c8y-docs) which stores the documentation sources. The c8y-docs repository is public which means that no credentials are required to access it.

The user documentation is available in the [Releases](https://github.com/SoftwareAG/c8y-docs/releases) section of the repository for all release versions that are no longer maintained. It is provided as a ZIP file called *c8y-guides-&lt;release-version&gt;.zip*, for example, *c8y-guides-10-16-0.zip*.

{{< c8y-admon-info >}}
Documentation ZIP files are available in the **Releases** section for the following {{< product-c8y-iot >}} release versions:

10.16.0, 10.15.0, 10.14.0, 10.13.0, 10.11.0, 10.10.0, 10.9.0, 10.7.0, 10.6.6, 10.6.0, 10.5.7, 10.5.0, 10.4.6
{{< /c8y-admon-info >}}

#### Add the documentation as custom application to your tenant {#add-the-documentation-as-custom-application-to-your-tenant}

1. In the [Releases](https://github.com/SoftwareAG/c8y-docs/releases) section of the c8y-docs repository, select the release version and download the ZIP file (*c8y-guides-&lt;release-version&gt;.zip*) from the Assets list.
2. Log in to your {{< product-c8y-iot >}} tenant.
3. In the Administration application, navigate to **Ecosystem** > **Applications**.
4. Click **Add application** on the top right and select **Upload web application**.
5. Drop the downloaded ZIP file and follow the prompts to complete the upload.

Once uploaded, the application is created and available in the application list of your Cumulocity IoT tenant.

#### Access the documentation in a web browser {#access-the-documentation-in-a-web-browser}

1. In the [Releases](https://github.com/SoftwareAG/c8y-docs/releases) section of the c8y-docs repository, select the release version and download the ZIP file (*c8y-guides-&lt;release-version&gt;.zip*) from the Assets list.
2. Open the ZIP file in a browser.
3. Double-click the file named "index.html" in the root folder. It will open in your default browser.

### Release notes for previous releases {#release-notes-for-previous-versions}

The {{< product-c8y-iot >}} documentation website provides change logs for the SaaS cloud offering and release notes for the yearly releases under maintenance.

Release notes for previous {{< product-c8y-iot >}} releases (back to 10.4.0) are available at [https://cumulocity.com/releasenotes/about/introduction/](https://cumulocity.com/releasenotes/about/introduction/).
