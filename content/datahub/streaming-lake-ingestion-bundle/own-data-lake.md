---
weight: 15
title: Using your own data lake
layout: redirect
---

By default, Streaming Lake Ingestion writes your IoT data into a data lake that {{< company-c8y >}} operates for you. Alternatively, you can have it write into object storage of your own: an **AWS S3 bucket** or an **Azure Data Lake Storage Gen2 storage account** that belongs to your organization.

The data then lives in your account. You create the access grant, you scope it, and you remove it when you want the data flow to stop. This section describes what to set up in your cloud account and how to complete the setup in {{< product-c8y-iot >}}.

Which of the two clouds applies to you is not a choice you make here: it follows the {{< product-c8y-iot >}} environment your tenant runs in. The setup page named below states which cloud it expects, and provisioning refuses storage belonging to the other one.

{{< c8y-admon-info >}}
You perform the setup yourself, in the **Administration** application under **Settings** > **Data Lake**. You need the tenant administrator role to open that page.

The page is also where the values specific to your environment appear — the identity your grant has to name, the region your storage has to be in, and, on AWS, a suggested External ID. Those values differ per environment, so this documentation refers to them rather than repeating them.
{{< /c8y-admon-info >}}

### What you set up, and what it means {#own-lake-what-you-set-up}

On both clouds the shape is the same. One identity belonging to {{< company-c8y >}} is allowed to write into one location in your storage, and everything it can reach is something you granted.

|On AWS|On Microsoft Azure|
|:---|:---|
|You create an IAM role in your account. Its trust policy says who may assume it, its permissions policy says what it may do. {{< company-c8y >}} assumes that role and writes with the temporary credentials it returns|You approve a {{< company-c8y >}} Entra application in your directory and assign it two storage roles. {{< company-c8y >}} authenticates as that application and writes with short-lived, scoped tokens|
|One role per {{< product-c8y-iot >}} tenant|One approval per Entra directory, one pair of role assignments per container|
|Revoke by deleting the role|Revoke by removing the role assignments|

Three properties hold on both clouds:

* **Everything {{< company-c8y >}} can reach, you granted.** No access exists in your account until you create it, and nothing else in your account or directory is touched.
* **Nothing long-lived is handed over.** Every read and write runs on temporary credentials derived from your grant. You never give {{< company-c8y >}} an access key or a storage account key, and no such field exists.
* **The grant is per environment.** The identity named in your grant belongs to one {{< product-c8y-iot >}} environment, so a grant made for one environment cannot be used by another.

### Terminology {#own-lake-terminology}

|Term|What it means here|
|:---|:---|
|**Base location**|Where your data is written. On AWS `s3://<bucket>/<prefix>`, on Azure `abfss://<container>@<account>.dfs.core.windows.net/<path>`. {{< product-c8y-iot >}} appends the tenant's ID, so that tenant's tables live under `<base location>/<tenant-id>/`|
|**{{< product-c8y-iot >}} tenant**|Your tenant in the {{< product-c8y-iot >}} platform. One tenant gets one Iceberg catalog and one base location|
|**Base principal** (AWS)|The IAM identity in {{< company-c8y >}}'s AWS account that assumes your role. Your trust policy has to name it exactly. The setup page shows its ARN|
|**Trust policy** (AWS)|The policy on a role that says *who* may assume it. Also called the assume-role policy document|
|**Permissions policy** (AWS)|The policy that says *what* the role may do once assumed — here, S3 actions on your bucket and prefix|
|**External ID** (AWS)|An opaque value agreed for your tenant. Your trust policy requires it on every assume-role call, which is what stops the identity from being used with your role on anyone else's behalf|
|**Entra directory** (Azure)|Microsoft's identity store for an organization, identified by a GUID. Microsoft also calls a directory a *tenant*, and the Azure portal labels its GUID **Directory (tenant) ID**. It is unrelated to your {{< product-c8y-iot >}} tenant|
|**Storage Entra directory** (Azure)|The one directory this procedure happens in: the directory that your storage account's Azure **subscription** is associated with. If your organization has several directories, they are not interchangeable|
|**Enterprise application** (Azure)|What the Entra portal calls a *service principal*: the record inside your directory that it trusts an application registered elsewhere. Approving the application creates it, and it is the only kind of object Azure RBAC can grant access to|

### Before you start {#own-lake-before-you-start}

#### On AWS {#own-lake-aws-prerequisites}

|You need|Why|
|:---|:---|
|Permission to create an S3 bucket in the region the setup page names|The bucket has to be co-located with the environment|
|Permission to create an IAM role and attach a policy to it|The role is the grant|
|Certainty about which AWS account the bucket lives in|The role has to be created in that same account|

#### On Microsoft Azure {#own-lake-azure-prerequisites}

|You need|Why|
|:---|:---|
|**Cloud Application Administrator** or **Application Administrator** in the storage Entra directory (**Privileged Role Administrator** also works)|To approve the application|
|**Owner** or **User Access Administrator** on the storage account, or any role that can write role assignments|To assign the two storage roles|
|An ADLS Gen2 storage account with **hierarchical namespace enabled**, and a container for the data|Iceberg tables are written there. Provisioning refuses a storage account whose hierarchical namespace is disabled, and it cannot be enabled after the account is created|
|Certainty about which Entra directory that storage account's subscription belongs to|Every step happens in that directory, and its ID is one of the values you enter|

<!-- SCREENSHOT: /images/datahub-guide/sli-own-lake-setup-page.png
     Caption: "The Data Lake setup page under Settings in the Administration application"
     Blocked: the setup page is not final yet. -->

### Setting up your AWS account {#own-lake-setting-up-aws}

Three steps. The **AWS console** path is the authoritative one; an AWS CLI equivalent is given alongside it for illustration and for administrators who automate.

#### Step 1: Create the bucket {#own-lake-aws-bucket}

The bucket has to live in the region the setup page names, which is the region the {{< product-c8y-iot >}} environment runs in. Provisioning compares the two and refuses a bucket anywhere else, and S3 would reject the signed request regardless: every call is signed for that one region. Cross-region access is not merely slower, it is not configured.

Three settings while you create the bucket:

* **AWS Region** — the region the setup page names.
* **Bucket Versioning** — enable it. Iceberg recovers a table whose metadata file a failed commit overwrote from the previous object version, and without versioning that recovery path does not exist. Provisioning does not refuse a bucket without versioning, so skipping it breaks nothing immediately; it only removes that recovery path. Pair it with a lifecycle rule expiring noncurrent versions if storage cost matters.
* **Block all public access** — leave it enabled. Nothing in this integration needs public access.

Encryption needs no decision: S3 encrypts every object at rest with keys it manages, which works with this setup as it stands. A bucket encrypted with a **customer-managed KMS key** is not covered here, because the role would additionally need permissions on that key. [Contact {{< company-c8y >}} support](/additional-resources/contacting-support/) before onboarding onto such a bucket.

In the AWS console, go to **S3** > **Create bucket**, set **AWS Region** and set **Bucket Versioning** to **Enable**. With the AWS CLI, creating the bucket and enabling versioning are two calls:

```bash
aws s3api create-bucket \
  --bucket <bucket> \
  --region <region> \
  --create-bucket-configuration LocationConstraint=<region>

aws s3api put-bucket-versioning --bucket <bucket> \
  --versioning-configuration Status=Enabled
```

`--create-bucket-configuration` is required for every region except `us-east-1`.

To verify, confirm that the reported location equals the region the setup page named (`us-east-1` reports `null`) and that versioning reports `Enabled`:

```bash
aws s3api get-bucket-location --bucket <bucket>
aws s3api get-bucket-versioning --bucket <bucket>
```

#### Step 2: Create the role {{< company-c8y >}} assumes {#own-lake-aws-role}

Create the role in the **same account as the bucket**. It has two policies and both matter:

|Policy|What it decides|The mistake it invites|
|:---|:---|:---|
|**Trust policy**|That {{< company-c8y >}}'s base principal may assume the role, and only when it presents the External ID|Naming the wrong ARN, omitting the External ID condition, or using a different External ID here than the one you enter on the setup page|
|**Permissions policy**|What the role may do to your bucket|Granting the whole bucket where one prefix would do|

{{< c8y-admon-important >}}
**The role name has to begin with `c8y-streaming-lake-ingestion-`.** The base principal is allowed to assume roles with that name prefix and no others, so a role named anything else cannot be assumed at all — and the resulting failure is indistinguishable from a wrong principal or a wrong External ID. Everything after the prefix is yours to choose; including the tenant name is a good habit, since each tenant gets its own role.
{{< /c8y-admon-important >}}

##### The External ID {#own-lake-aws-external-id}

The External ID is **your** value, not {{< company-c8y >}}'s. The setup page pre-fills a fresh suggestion each time it is opened, so that you need not invent one, and you are free to replace it with anything you prefer. Whatever you write into the trust policy is the value that counts, and the setup page is where you state which value that was.

Three things to know about it:

* **Its length and character set are checked.** At least 32 characters — the suggestion is exactly that long, so keeping it is always safe. The character set is AWS's own: `A-Z a-z 0-9 _ + = , . @ : / -`, with no spaces and no `#`. A value outside it is rejected when you enter it, rather than being rejected later by AWS, where the error would surface far from its cause.
* **Use a different value for each of your {{< product-c8y-iot >}} tenants.** This is not enforced, but a value shared between two tenants removes the protection it exists to provide.
* **Keep a record of it.** It is written into your trust policy, and {{< company-c8y >}} may have to ask you for it again if your tenant is ever provisioned from scratch.

##### Creating the role {#own-lake-aws-create-role}

In the AWS console, go to **IAM** > **Roles** > **Create role** > **Custom trust policy**, paste the trust policy below, then attach the permissions policy as an inline policy. Once the role is created, its page opens with the **ARN** at the top of the summary panel.

With the AWS CLI:

```bash
cat > trust-policy.json <<'EOF'
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
EOF

aws iam create-role --role-name c8y-streaming-lake-ingestion-<suffix> \
  --assume-role-policy-document file://trust-policy.json

cat > s3-policy.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "LocateBucket",
      "Effect": "Allow",
      "Action": ["s3:GetBucketLocation"],
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
EOF

aws iam put-role-policy --role-name c8y-streaming-lake-ingestion-<suffix> \
  --policy-name c8y-streaming-lake-ingestion --policy-document file://s3-policy.json
```

Three details in that permissions policy are deliberate:

* `s3:DeleteObject` is required. Iceberg maintenance rewrites and expires files under the prefix.
* `s3:GetObjectVersion` is used only when bucket versioning is enabled.
* `s3:GetBucketLocation` has to sit in **its own statement**. An `s3:prefix` condition applies to every action in the statement it is written on, and that condition key is absent on a `GetBucketLocation` request, so a shared statement denies it. If listing still fails, drop the condition and allow `s3:ListBucket` on the bucket outright; object access stays prefix-scoped by the statement below it.

To verify, read both policies back from the role:

```bash
aws iam get-role --role-name c8y-streaming-lake-ingestion-<suffix> \
  --query 'Role.AssumeRolePolicyDocument.Statement[0].{principal:Principal,condition:Condition}'
aws iam get-role-policy --role-name c8y-streaming-lake-ingestion-<suffix> \
  --policy-name c8y-streaming-lake-ingestion
```

The principal must be exactly the base principal ARN from the setup page, and the External ID in the condition must be the same value you enter there — character for character. A trust policy that is otherwise correct but carries a different External ID is the most common mistake here, and it looks identical in any listing.

##### Finding the role ARN {#own-lake-aws-role-arn}

The role ARN looks like `arn:aws:iam::<your-account-id>:role/c8y-streaming-lake-ingestion-<suffix>`. In the AWS console, go to **IAM** > **Roles**, open the role and copy the **ARN** from the top of its summary panel; there is a copy button next to it, and copying the value by hand is where transcription mistakes come from. With the CLI:

```bash
aws iam get-role --role-name c8y-streaming-lake-ingestion-<suffix> --query Role.Arn --output text
```

Three ways this goes wrong, all of which produce a well-formed ARN that fails later:

* **Wrong account.** A role of the same name in another of your accounts gives a valid-looking ARN that cannot be used, because the bucket lives in the other account. Confirm with `aws sts get-caller-identity --query Account --output text` that you are in the bucket's account.
* **Not a role ARN.** An IAM user ARN or an instance-profile ARN is not accepted. The ARN must contain `:role/`.
* **A role created under a path.** A role created with `--path /cumulocity/` has the path as part of its ARN. Send the ARN exactly as AWS reports it rather than reconstructing it from the role name.

##### Narrowing further {#own-lake-aws-narrowing}

The permissions policy above is already prefix-scoped, and {{< company-c8y >}} narrows each individual request further on top of it. Because a narrowing can only intersect with what you granted, **whatever you scope the role to is the ceiling** for everything {{< company-c8y >}} and its query clients can reach: narrowing here narrows all of it at once.

You can add conditions to either policy — `"Bool": {"aws:SecureTransport": "true"}` on the permissions policy, for example. Assume-role calls carry a role session name and may carry session tags, both visible in your CloudTrail, so conditions on those are possible; agree the values with {{< company-c8y >}} support first, because a condition on a value that changes would silently stop ingestion.

#### Step 3: Complete the setup in {{< product-c8y-iot >}} {#own-lake-aws-provision}

<!-- SCREENSHOT: /images/datahub-guide/sli-own-lake-aws-values.png
     Caption: "The setup page showing the base principal ARN, the suggested External ID and the required region"
     Blocked: the setup page is not final yet. -->

Open **Settings** > **Data Lake** in the **Administration** application and enter three values:

* **Role ARN** — as retrieved above.
* **External ID** — the value you actually put in the trust policy, whether that is the suggestion or your own. Read it back from the role rather than from your notes: **IAM** > **Roles** > your role > **Trust relationships**.
* **Base location** — `s3://<bucket>/<prefix>`. See [Choosing a base location](#own-lake-base-location).

The region is not one of them, because the setup page gave it to you in the first place. Do confirm that the bucket landed there, since a mismatch fails the setup.

<!-- SCREENSHOT: /images/datahub-guide/sli-own-lake-aws-input.png
     Caption: "Entering the role ARN, External ID and base location"
     Blocked: the setup page is not final yet. -->

Then start the setup. It does not start on its own: nothing watches your AWS account for the role, because only you know when it is actually in place. What happens next is described in [What the setup verifies](#own-lake-verification).

### Setting up your Azure storage account {#own-lake-setting-up-azure}

Four steps. The **Azure portal** path is the authoritative one; an Azure CLI equivalent is given alongside it.

Everything happens in the **storage Entra directory** — the directory that your storage account's subscription belongs to. Azure only allows a storage account to be granted to a service principal that exists in that storage account's own directory. An approval recorded in any other directory cannot even be found in the storage account's access-control picker, and the directory ID you enter in step 4 has to be that same one.

#### Step 1: Approve the Streaming Lake Ingestion application {#own-lake-azure-consent}

You are not creating an application here: {{< company-c8y >}}'s already exists, in {{< company-c8y >}}'s own directory. What you are doing is **recording that your directory trusts it**, which Azure represents as an enterprise application in your directory. It grants access to nothing. It only creates the object that step 2 assigns roles to, and until then the application can do nothing in your directory at all.

{{< c8y-admon-info >}}
**The application requests no API permissions.** It cannot read your directory, its users, or any other resource. The only thing it can ever do is what you grant it with Azure RBAC in step 2.
{{< /c8y-admon-info >}}

In the Azure portal, open the consent link shown on the setup page, signed in as an administrator **of the storage Entra directory**. Review the prompt: it names the application and states that no permissions are requested. **Check the directory name shown on the sign-in and consent screens** — if you hold accounts in several directories, the browser may already be signed in to a different one, and approving there records the approval where it cannot be used. Then accept.

<!-- SCREENSHOT: /images/datahub-guide/sli-own-lake-azure-consent.png
     Caption: "The consent step and the Directory (tenant) ID field on the setup page"
     Blocked: the setup page is not final yet. -->

To verify, go to **Microsoft Entra ID** > **Enterprise applications** and search by the application's **display name**, which the setup page shows. If it does not appear, clear the **Application type** filter before concluding anything. Open the entry and confirm that its **Application ID** equals the client ID on the setup page: that is what distinguishes {{< company-c8y >}}'s application from any similarly named one.

The Azure CLI path produces the same object with no browser and no consent prompt, which helps when the consent prompt is blocked by policy or when your organization automates directory changes:

```bash
az login --tenant <storage-entra-directory-id>
az ad sp create --id <client-id>
az ad sp show --id <client-id> --query "{name:displayName, appId:appId, objectId:id}" -o table
```

The last call must return one row whose `appId` equals the client ID. Confirm which directory the commands ran against with `az account show --query tenantId -o tsv`; a portal session tells you nothing about where the CLI is pointed.

If either path reports the application as missing, or asks for a single-tenant application owned by your directory, the signed-in account is short of privileges rather than the application being wrong. See [If something fails](#own-lake-troubleshooting).

#### Step 2: Assign the two storage roles, at two different scopes {#own-lake-azure-roles}

{{< c8y-admon-important >}}
Both role assignments are required and **their scopes are different**. A container-scoped **Storage Blob Delegator** assignment looks correct in the portal and silently breaks credential vending. The check that matters here is the scope, not the role.
{{< /c8y-admon-important >}}

|Role|Scope|Why|
|:---|:---|:---|
|**Storage Blob Data Contributor**|The **container**|Read and write the data files. Container scope keeps the grant as narrow as the data path allows|
|**Storage Blob Delegator**|The **storage account** (resource group or subscription also work)|Lets {{< company-c8y >}} issue short-lived, scoped access tokens to your data instead of holding long-lived keys. The underlying operation is evaluated at account level, so a container-scoped assignment grants nothing|

In the Azure portal, go to **Storage account** > **Access control (IAM)** > **Add role assignment** > **Members** > **User, group, or service principal**, and **search by the application display name**. Searching by client ID returns nothing for an application owned by another directory; that is an Azure behavior, not an error in your setup.

To verify, go to **Storage account** > **Access control (IAM)** > **Role assignments** and filter to the application's display name. There must be two entries, and the **Scope** column on each is what to read: the Data Contributor's scope must name the **container**, the Delegator's must name the **storage account**. Both showing the container means credential vending will fail.

With the Azure CLI:

```bash
# Data access, container scope
az role assignment create \
    --assignee <client-id> \
    --role "Storage Blob Data Contributor" \
    --scope "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Storage/storageAccounts/<account>/blobServices/default/containers/<container>"

# Delegation, storage account scope
az role assignment create \
    --assignee <client-id> \
    --role "Storage Blob Delegator" \
    --scope "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Storage/storageAccounts/<account>"

az role assignment list --assignee <client-id> --all \
    --query "[].{role:roleDefinitionName, scope:scope}" -o table
```

The last call must report exactly these two. The Data Contributor's scope must end in `/containers/<container>`, the Delegator's in `/storageAccounts/<account>`.

Role assignments are not effective instantly. If step 4 fails immediately after this, wait a few minutes and retry before changing anything.

#### Step 3: Enable soft delete {#own-lake-azure-soft-delete}

{{< c8y-admon-req >}}
Enable **blob soft delete** and **container soft delete** on the storage account before you use Streaming Lake Ingestion in production. Each keeps deleted data recoverable for a retention window you choose. Without them a delete is immediate and final: an accidentally deleted container, or a delete run against the wrong path, takes the tables and their metadata with it, and nothing can bring them back. The service level agreement requires this for production use, so treat it as a step to complete rather than an option to weigh.
{{< /c8y-admon-req >}}

Blob versioning, the other Azure protection of this kind, is **not available on accounts with hierarchical namespace**, which this setup requires, so soft delete is the one to enable.

In the Azure portal, go to **Storage account** > **Data protection**, select **Enable soft delete for blobs** and **Enable soft delete for containers**, and set a retention period on each. With the Azure CLI:

```bash
az storage account blob-service-properties update \
    --account-name <account> \
    --enable-delete-retention true --delete-retention-days 7 \
    --enable-container-delete-retention true --container-delete-retention-days 7

az storage account blob-service-properties show --account-name <account> \
    --query "{blobs:deleteRetentionPolicy, containers:containerDeleteRetentionPolicy}"
```

Both policies must report `enabled: true` with the retention you set. Seven days above is an example; choose a window that matches how long you would want to be able to recover.

Provisioning does not check this setting, so an account without soft delete provisions and runs normally. Confirming that it is on is part of this step, not something you will be warned about later.

##### Encryption {#own-lake-azure-encryption}

Use the encryption Azure provides. A storage account encrypts everything at rest, and this setup needs nothing from you either way: with Microsoft-managed keys there is nothing to configure, and with a customer-managed key in Key Vault the storage account itself uses the key, so {{< company-c8y >}} never needs permission on it.

##### Narrowing the grant to one path {#own-lake-azure-abac}

An [attribute-based access control condition](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-auth-abac) on the **data** role restricts it to a path prefix, typically the base location you are about to enter. Because the short-lived tokens {{< company-c8y >}} issues are themselves authorized through Azure RBAC, the condition also applies to every credential vended from that role, so it narrows {{< company-c8y >}} and its query clients at once.

{{< c8y-admon-caution >}}
Never put a condition on the **Storage Blob Delegator** assignment. It is evaluated at account scope, and a condition there breaks credential vending.
{{< /c8y-admon-caution >}}

#### Step 4: Complete the setup in {{< product-c8y-iot >}} {#own-lake-azure-provision}

Open **Settings** > **Data Lake** in the **Administration** application and enter two values:

* **Directory (tenant) ID** of the storage Entra directory. In the Azure portal it is on **Microsoft Entra ID** > **Overview** for the directory you are signed in to, and the directory switcher at the top right shows which that is. If you hold access to several directories and want certainty rather than the currently selected one, read it from the storage account instead:

  ```bash
  # the subscription the storage account lives in — the first GUID of the resource ID it prints
  az storage account show --name <account> --query id -o tsv

  # the directory that subscription belongs to — this is the value to enter
  az account show --subscription <sub> --query tenantId -o tsv
  ```

  `az account show --query tenantId` on its own reports the directory of whichever subscription is currently selected, which stops being the right answer the moment you have access to more than one.

* **Base location** — `abfss://<container>@<account>.dfs.core.windows.net/<path>`. See [Choosing a base location](#own-lake-base-location).

Then start the setup. It does not start on its own: nothing watches for the role assignments from step 2, because only you know when they are actually in place.

### Choosing a base location {#own-lake-base-location}

The base location is the path your tenant's data is written under. {{< product-c8y-iot >}} appends the tenant's ID to it, so the tenant's tables live under `<base location>/<tenant-id>/`.

Three rules apply on both clouds:

* **One base location per {{< product-c8y-iot >}} tenant.** Two tenants must never share one. Each tenant's data already lands in its own `/<tenant-id>` folder, but that is not a substitute.
* **Overlapping locations are rejected.** A location that contains, or is contained by, one already in use on the same environment is refused, and the message names the other tenant. Choose a location that neither contains nor is contained by it.
* **The base location is fixed once the setup has succeeded.** It is recorded when your tenant's Iceberg catalog is created, and running the setup again does not rewrite it. Entering a different one later therefore moves nothing: the tables stay where they are, and anything already written under the old path would be stranded rather than migrated. [Contact {{< company-c8y >}} support](/additional-resources/contacting-support/) to change it.

### What the setup verifies {#own-lake-verification}

The setup does not take your word for the grant. It exercises it, end to end, through the identity that will actually be used:

1. **The grant.** On AWS it assumes your role with your External ID; on Azure it acquires a token for your directory as the consented application.
2. **The data path.** With those credentials it lists, writes, reads back and deletes a test object under the base location.
3. **Short-lived credentials.** It requests short-lived credentials once — a scoped session on AWS, a user-delegation token on Azure — and confirms that they work. This is how every read and write into your storage is actually performed, so it is verified rather than assumed.
4. **The catalog.** Your tenant's Iceberg catalog is created against the values you entered.

**Setup is complete when that verification passes**, not when the catalog exists. If a step fails, the result names which one and what to fix, and nothing is created.

<!-- SCREENSHOT: /images/datahub-guide/sli-own-lake-verification-result.png
     Caption: "The setup result, reporting the grant, the test write and credential vending as verified"
     Blocked: the setup page is not final yet. -->

Once the setup has succeeded, your data arrives as described in [Using Streaming Lake Ingestion](#using). Running the setup again with the same values is safe and changes nothing.

### If something fails {#own-lake-troubleshooting}

The result names the step that failed and the cause. The table below lists the causes you can act on yourself.

#### On AWS {#own-lake-aws-troubleshooting}

|Cause|What it means|Fix|
|:---|:---|:---|
|The role cannot be assumed|The trust policy names a different principal than the base principal on the setup page, its External ID differs from the one you entered, or the role name does not begin with `c8y-streaming-lake-ingestion-`|Re-read the principal and the External ID from the role and correct them. Watch for a trailing space, and for a value copied over from another tenant. A role name without the prefix has to be recreated under one|
|The External ID is too short, or uses an unaccepted character|It is below 32 characters, or contains a character outside `A-Z a-z 0-9 _ + = , . @ : / -`. A `#` or a space is the usual cause|Correct it in **both** the trust policy and the setup page, then retry|
|Region mismatch, or the bucket cannot be found|The bucket is not in the region the setup page names|Buckets cannot be moved. Create one in the right region and repeat step 2 against it|
|The prefix is not covered by the role's policy|The permissions policy does not cover the base location's prefix, or the `s3:prefix` condition does not match it|Confirm that the prefix in the policy is the same one as in the base location you entered|
|Access denied on the encryption key|The bucket is encrypted with a customer-managed KMS key, which this setup does not cover yet|Use S3's own default encryption, or raise the customer-managed key with support|

#### On Microsoft Azure {#own-lake-azure-troubleshooting}

|Cause|What it means|Fix|
|:---|:---|:---|
|The application cannot be found, or Azure asks for a single-tenant application owned by your directory|The signed-in account does not hold the privileges to approve an application. Azure reports this as a lookup failure, so the message blames the application rather than the account. The application is there, and it is deliberately multi-tenant|Sign in with one of the directory roles listed in [Before you start](#own-lake-azure-prerequisites) and repeat step 1|
|The application cannot be found in the access-control member picker|You searched by client ID, step 1 was not completed, or it was completed in a **different** directory than the storage account's|Search by **display name**, and confirm the enterprise application exists in the storage Entra directory|
|Admin consent is missing or was revoked|Step 1 was not completed in this directory, or the enterprise application has since been deleted|Repeat step 1 in the storage Entra directory|
|A role assignment is missing, or sits at the wrong scope|Most often **Storage Blob Delegator** assigned at container scope instead of storage account scope|Re-read the **Scope** column on both assignments and reassign the Delegator at storage account scope|
|The container or filesystem does not exist|The container named in the base location was never created, or its name is misspelled|Create it, or correct the base location|
|Region mismatch|The storage account is not in the region the setup page names|Storage accounts cannot be moved between regions. Create one in the right region|
|Hierarchical namespace is not enabled|The storage account is a flat blob account rather than ADLS Gen2|It cannot be enabled after creation. Create an ADLS Gen2 account with hierarchical namespace enabled and repeat steps 2 and 3 against it|
|The consent link returns `AADSTS50011`|The environment's application has no static redirect URI registered|Use the Azure CLI path in step 1, which needs no redirect URI, and report the error to support so the registration is fixed|

#### On both clouds {#own-lake-common-troubleshooting}

|Cause|What it means|Fix|
|:---|:---|:---|
|The setup fails immediately after you changed a policy or a role assignment|Propagation. Neither AWS IAM nor Azure RBAC is effective instantly|Wait a few minutes and retry before changing anything|
|The storage cannot be reached|The bucket or storage account restricts public network access|The storage has to be reachable, and {{< company-c8y >}}'s egress identity has to be permitted. Raise it with support|
|The base location overlaps one already in use|Another tenant on this environment is provisioned against a location that contains, or is contained by, yours. The message names it|Choose a location that neither contains nor is contained by the other one|

If the cause is not in these tables, [contact {{< company-c8y >}} support](/additional-resources/contacting-support/) with the reported step and cause.

### Adding more tenants {#own-lake-adding-tenants}

Each {{< product-c8y-iot >}} tenant is one Iceberg catalog with one base location, and the work per additional tenant differs by cloud.

**On AWS**, each tenant gets **its own role, its own External ID and its own prefix**. Reuse the same bucket if you like, but repeat step 2 for the new tenant and run the setup with its own base location. A bucket in a **different** AWS account needs nothing extra: create the role in that account, with the same base principal and that tenant's External ID. Onboarding the same tenant on a **second** {{< product-c8y-iot >}} environment means a second role, because that environment has a different base principal and the existing trust policy does not name it.

**On Azure**, consent is per directory and application, so step 1 happens **once per storage Entra directory**. A second tenant writing into the same directory needs only a container, the two role assignments for it, and its own setup run. A container in a **different** Entra directory is a different storage Entra directory: step 1 has to be repeated there, and that directory's ID is what the new tenant's setup reports.

### Removing access {#own-lake-removing-access}

**On AWS:**

* **Stop one tenant** — delete that tenant's role. Nothing else grants access to your bucket, so that is the whole revocation.
* **Stop everything** — delete every role you created. There is no shared object to revoke and nothing of {{< company-c8y >}}'s left behind in your account.

**On Microsoft Azure:**

* **Stop one container** — remove the two role assignments for it. Ingestion for that tenant stops.
* **Stop everything** — withdraw the approval by deleting the enterprise application under **Enterprise applications**. This revokes access for **every** {{< product-c8y-iot >}} tenant of yours on that environment at once, so it is not the way to offboard a single one. It also leaves the role assignments behind as orphaned entries; remove them too if you want the storage account clean.

On both clouds, the data already written stays in your storage and remains yours.

{{< c8y-admon-caution >}}
Revoking access while ingestion is running produces access-denied errors on the {{< company-c8y >}} side rather than data loss, but the tenant stops ingesting. Tell {{< company-c8y >}} support when you plan it, so that the tenant can be deprovisioned cleanly.
{{< /c8y-admon-caution >}}
