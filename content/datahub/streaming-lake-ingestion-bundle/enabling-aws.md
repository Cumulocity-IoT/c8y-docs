---
weight: 14
title: Enabling Streaming Lake Ingestion on AWS
layout: redirect
---

Streaming Lake Ingestion writes your data into an S3 bucket in your AWS account. To enable it, you complete a one-time setup in which you grant {{< product-c8y-iot >}} access to one prefix of your bucket. Beyond this setup, Streaming Lake Ingestion needs no configuration.

You perform the setup in the Administration application under **Settings** > **Data Lake**. The setup page guides you through each step, with instructions for the AWS console and the AWS CLI, and fills in the values for your environment. If the page shows "You cannot complete the setup yet", contact [{{< company-c8y >}} support](/additional-resources/contacting-support/).

### Before you start {#before-you-start-on-aws}

{{< c8y-admon-req >}}
* Your {{< product-c8y-iot >}} user has the ROLE_OFFLOADING_ADMIN permission. The OFFLOADING_ADMINISTRATOR global role carries it. Assign it to a user in the Administration application under **Accounts** > **Roles**.
* In AWS, you have permission to create an S3 bucket.
* In the same AWS account, you have permission to create an IAM role and attach an inline policy to it (`iam:CreateRole` and `iam:PutRolePolicy`).
{{< /c8y-admon-req >}}

The bucket must meet the following requirements:

* It is in the region of your {{< product-c8y-iot >}} environment. The setup page shows the region, and the setup refuses a bucket in any other region.
* Bucket versioning is enabled. Versioning keeps deleted files recoverable. If it is off, the setup completes and your data arrives, but the page shows a warning and the **Setup status** shows "Provisioning failed" until you enable it and try again.
* It uses the default S3 encryption. A bucket encrypted with a customer-managed KMS key is not supported.

### Setting up the tenant {#setting-up-the-tenant-on-aws}

The setup page leads you through the following steps:

1. **Create the bucket**: Create a bucket that meets the requirements above, and enter its name.
2. **Create the role**: Create an IAM role with a trust policy that allows {{< product-c8y-iot >}} to assume it with the external ID of your tenant. The role name must begin with `c8y-streaming-lake-ingestion-`. {{< product-c8y-iot >}} cannot assume a role with any other name, and you cannot rename a role later.
3. **Grant the role access to your prefix**: Add an inline permissions policy that allows the role to read and write under your prefix. Enter the prefix, or leave it empty to use the root of the bucket.
4. **Provision the tenant**: Enter the ARN of the role and the external ID.
5. **Review and provision**: Check the base location `s3://<bucket>/<prefix>`, select **These values are correct**, and click **Save**.

The setup page shows both policies with your values filled in. The external ID protects your role against use on behalf of anyone else. Keep the suggested value or use your own with at least 32 characters. Use a different external ID for each tenant and keep a record of it. After the setup, the page shows only its last characters.

When you click **Save**, {{< product-c8y-iot >}} assumes your role, tests a write, a read, and a delete under the base location, creates the Iceberg catalog of your tenant, and checks bucket versioning. When all checks pass, the **Setup status** shows "Provisioned", and your data arrives as described in [Using Streaming Lake Ingestion](#using).

{{< product-c8y-iot >}} stores your tables under `s3://<bucket>/<prefix>/<tenant-id>/`. Several of your tenants can therefore share one prefix. You cannot change the base location after the setup. To change it, contact [{{< company-c8y >}} support](/additional-resources/contacting-support/).

### What the access consists of {#what-the-access-consists-of-on-aws}

After the setup, the following objects in your AWS account give {{< product-c8y-iot >}} access. If you delete them or reduce what they allow, ingestion stops:

* The IAM role of the tenant. Its trust policy names the {{< product-c8y-iot >}} principal shown on the setup page and requires the external ID of the tenant.
* The inline policy "c8y-streaming-lake-ingestion" on the role. It allows the role to locate the bucket, read its versioning setting, list the prefix, and read, write, and delete objects under the prefix.

### Changing the role or the external ID {#changing-the-role-or-the-external-id}

You can replace the role or the external ID at any time in the **Catalog identity** section on the **Data Lake** page. When you click **Save**, the setup checks the new values again. The new role must be in the same AWS account as the current one.

### If something fails {#if-something-fails-on-aws}

If a check fails, the setup page shows the reason. If the catalog was already created, the **Setup status** shows "Provisioning failed". Hover over the icon of a step to see its result. After you fix the cause, click **Save** in the **Catalog identity** section to try again.

|Cause|Solution|
|:---|:---|
|The role cannot be assumed.|Check that the trust policy contains the principal from the setup page and the same external ID that you entered. Check that the role name begins with `c8y-streaming-lake-ingestion-`.|
|The external ID is rejected.|Use at least 32 characters from `A-Z a-z 0-9 _ + = , . @ : / -`. Change the value in the trust policy and on the setup page.|
|The bucket is in a different region, or cannot be found.|Create a bucket in the region that the setup page shows. You cannot move a bucket.|
|Access to the prefix is denied.|Check that the prefix in the permissions policy is the same as the one in the base location.|
|The base location overlaps the location of another tenant.|Choose a prefix that neither contains nor is contained in the other location. Sharing the same prefix is allowed.|
|The page warns that data loss protection is off.|Bucket versioning is off. Enable it, then click **Save** in the **Catalog identity** section.|
|The setup fails right after you changed the role.|IAM changes take up to a minute to become effective. Wait and try again.|

If the cause is not listed, contact [{{< company-c8y >}} support](/additional-resources/contacting-support/) with the reason that the setup page shows.

### Adding more tenants {#adding-more-tenants-on-aws}

Each tenant needs its own role and its own external ID. The tenants can share a bucket and a prefix. Repeat the setup for each tenant.

### Removing access {#removing-access-on-aws}

To stop the data flow, unsubscribe the tenant from Streaming Lake Ingestion. Afterwards, delete the role of the tenant. AWS deletes its inline policy with it. The data already written stays in your bucket.

{{< c8y-admon-caution >}}
If you only delete the role, Streaming Lake Ingestion treats this as a temporary failure state and still applies the service surcharge.
{{< /c8y-admon-caution >}}
