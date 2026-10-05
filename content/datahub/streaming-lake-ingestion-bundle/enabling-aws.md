---
weight: 14
title: Enabling Streaming Lake Ingestion on AWS
layout: redirect
---

Streaming Lake Ingestion writes your data into an S3 bucket in your AWS account. To enable it, you complete a one-time setup: you create an IAM role in your account, and {{< company-c8y >}} assumes this role to write into one prefix of your bucket. Beyond this setup, the service needs no configuration.

{{< c8y-admon-req >}}
* Your {{< product-c8y-iot >}} user has the ROLE_OFFLOADING_ADMIN permission. The **OFFLOADING_ADMINISTRATOR** global role carries it. Assign it to a user in the Administration application under **Accounts** > **Roles**.
* In AWS, you have permission to create an S3 bucket and an IAM role in the account that holds the bucket.
{{< /c8y-admon-req >}}

You perform the setup in the Administration application under **Settings** > **Data Lake**. The page guides you through each step and fills in the values that apply to your environment, such as the region and the ARN of the {{< company-c8y >}} identity that assumes your role. Under **Instructions for**, select **AWS console** or **AWS CLI**. If the page shows "You cannot complete the setup yet", contact [{{< company-c8y >}} support](/additional-resources/contacting-support/).

![The Data Lake setup page under Settings in the Administration application, at the first step of the AWS setup](/images/datahub-guide/sli-own-lake-setup-page.png)

### To create the bucket {#to-create-the-bucket}

1. In the AWS console, go to **S3** > **Create bucket**.
2. Select the **AWS Region** that the setup page shows. The setup refuses a bucket in any other region.
3. Under **Bucket Versioning**, select **Enable**. Versioning keeps overwritten and deleted files recoverable and protects your data against loss.
4. Leave **Block all public access** selected and keep the default encryption.
5. Create the bucket and enter its name on the setup page.

A bucket encrypted with a customer-managed KMS key is not supported.

### To create the role {#to-create-the-role}

The trust policy of the role allows {{< company-c8y >}} to assume it, but only with the External ID of your tenant. The setup page suggests an External ID. Keep it, or enter your own value with at least 32 characters. Use a different External ID for each tenant and keep a record of it. After the setup, the page shows only its last characters.

1. In the AWS console, go to **IAM** > **Roles** and click **Create role**.
2. As the trusted entity type, select **Custom trust policy**.
3. Replace the policy with the trust policy from the setup page and click **Next**. The trust policy has the following form:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": { "AWS": "<base-principal-arn>" },
         "Action": "sts:AssumeRole",
         "Condition": { "StringEquals": { "sts:ExternalId": "<external-id>" } }
       }
     ]
   }
   ```

4. On the **Add permissions** page, click **Next** without selecting a policy.
5. Enter a role name that begins with `c8y-streaming-lake-ingestion-`, for example, "c8y-streaming-lake-ingestion-prod", and click **Create role**.

The **Trust relationships** tab of the role shows the principal and the External ID from the setup page.

{{< c8y-admon-important >}}
The role name must begin with `c8y-streaming-lake-ingestion-`. {{< company-c8y >}} cannot assume a role with any other name, and you cannot rename a role later.
{{< /c8y-admon-important >}}

### To grant the role access to your prefix {#to-grant-the-role-access-to-your-prefix}

1. Open the role. On the **Permissions** tab, click **Add permissions** > **Create inline policy**.
2. Select **JSON** and replace the policy with the permissions policy from the setup page. The permissions policy has the following form:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "ReadBucketSettings",
         "Effect": "Allow",
         "Action": ["s3:GetBucketLocation", "s3:GetBucketVersioning"],
         "Resource": "arn:aws:s3:::<bucket>"
       },
       {
         "Sid": "ListPrefix",
         "Effect": "Allow",
         "Action": ["s3:ListBucket"],
         "Resource": "arn:aws:s3:::<bucket>",
         "Condition": { "StringLike": { "s3:prefix": ["<prefix>", "<prefix>/*"] } }
       },
       {
         "Sid": "ObjectReadWrite",
         "Effect": "Allow",
         "Action": ["s3:GetObject", "s3:GetObjectVersion", "s3:PutObject", "s3:DeleteObject"],
         "Resource": "arn:aws:s3:::<bucket>/<prefix>/*"
       }
     ]
   }
   ```

3. Click **Next**, enter "c8y-streaming-lake-ingestion" as the policy name, and click **Create policy**.
4. On the setup page, enter the prefix. Leave it empty to write to the root of the bucket.

The **Permissions** tab of the role lists the inline policy. The role can now read and write under your prefix and nothing else in the bucket. It needs `s3:DeleteObject` because Iceberg table maintenance replaces and removes files. It can also read whether versioning is on, so that the setup can warn you if it is off.

### To provision the tenant {#to-provision-the-tenant-on-aws}

1. On the setup page, enter the **Role ARN**. In the AWS console, copy it from the summary of the role. It has the form `arn:aws:iam::<account-id>:role/c8y-streaming-lake-ingestion-<suffix>`.
2. Enter the **External ID** from the trust policy and click **Continue**.
3. In the **Review and provision** step, check the base location `s3://<bucket>/<prefix>`.
4. Select **These values are correct** and click **Save**.

![The Provision the tenant step, with the Role ARN and External ID fields](/images/datahub-guide/sli-own-lake-aws-input.png)

{{< company-c8y >}} assumes your role, tests a write, a read, and a delete under the base location, and creates the Iceberg catalog of your tenant. When all checks pass, the **Setup status** shows "Provisioned", and your data arrives as described in [Using Streaming Lake Ingestion](#using). The last check confirms that bucket versioning is on. If it is off, the setup still completes, but the page shows a warning.

![The setup status after a successful setup, with the tooltip of a provisioning step reading Successful](/images/datahub-guide/sli-own-lake-verification-result.png)

{{< product-c8y-iot >}} stores your tables under `s3://<bucket>/<prefix>/<tenant-id>/`. Several of your tenants can therefore share one prefix. You cannot change the base location after the setup. To change it, contact [{{< company-c8y >}} support](/additional-resources/contacting-support/).

### Changing the role or the External ID {#changing-the-role-or-the-external-id}

You can replace the role or the External ID at any time, for example, to rotate the External ID. Use the **Catalog identity** section on the **Data Lake** page. When you click **Save**, the setup checks the new values in the same way as during the first setup. The new role must be in the same AWS account as the current one.

![The Catalog identity section, with the Role ARN field and the stored External ID masked down to its last characters](/images/datahub-guide/sli-own-lake-catalog-identity.png)

### If something fails {#if-something-fails-on-aws}

If a check fails, the setup page shows the reason. If the catalog was already created, the **Setup status** shows "Provisioning failed". Hover over the icon of a step to see its result. After you fix the cause, click **Save** in the **Catalog identity** section to try again.

|Cause|Solution|
|:---|:---|
|The role cannot be assumed.|Check that the trust policy contains the principal from the setup page and the same External ID that you entered. Check that the role name begins with `c8y-streaming-lake-ingestion-`.|
|The External ID is rejected.|Use at least 32 characters from `A-Z a-z 0-9 _ + = , . @ : / -`. Change the value in the trust policy and on the setup page.|
|The bucket is in a different region, or cannot be found.|Create a bucket in the region that the setup page shows. You cannot move a bucket.|
|Access to the prefix is denied.|Check that the prefix in the permissions policy is the same as the one in the base location.|
|The base location overlaps the location of another tenant.|Choose a prefix that neither contains nor is contained in the other location. Sharing the same prefix is allowed.|
|The page warns that your storage cannot recover overwritten or deleted files.|Bucket versioning is off. Enable it, then click **Save** in the **Catalog identity** section.|
|The setup fails right after you changed the role.|IAM changes take up to a minute to become effective. Wait and try again.|

If the cause is not listed, contact [{{< company-c8y >}} support](/additional-resources/contacting-support/) with the reason that the setup page shows.

### Adding more tenants {#adding-more-tenants-on-aws}

Each tenant needs its own role and its own External ID. The tenants can share a bucket and a prefix. Repeat the setup for each tenant.

### Removing access {#removing-access-on-aws}

To stop the data flow, unsubscribe the tenant from Streaming Lake Ingestion. Afterwards, delete the role of the tenant. AWS deletes its inline policy with it. The data already written stays in your bucket.

{{< c8y-admon-caution >}}
If you only delete the role, the service treats this as a temporary failure state and still applies the service surcharge for Streaming Lake Ingestion.
{{< /c8y-admon-caution >}}
