---
weight: 10
title: Introduction
layout: redirect
---

By default, {{< company-c8y >}} provides the object storage of your data lake, and your tenant needs no setup. For details, see [Subscribing to Streaming Lake Ingestion](/streaming-lake-ingestion/datahub-2-overview/#subscribing).

Bringing your own storage is a special case only for dedicated environments. On a dedicated environment, Streaming Lake Ingestion can write your data into object storage in your own cloud account. An environment uses the same kind of storage for all its tenants. To find out which kind of storage your environment uses, contact [{{< company-c8y >}} support](/additional-resources/contacting-support/).

With your own storage:

* The bucket or container is in your AWS or Microsoft Azure account, and its costs appear on your cloud bill.
* You complete a one-time setup for each tenant that grants {{< product-c8y-iot >}} access to your storage. For details, see [Enabling Streaming Lake Ingestion on AWS](#enabling-aws) or [Enabling Streaming Lake Ingestion on Microsoft Azure](#enabling-azure).
* You read your data in the same way as with storage provided by {{< company-c8y >}}. For details, see [Using Streaming Lake Ingestion](/streaming-lake-ingestion/using-streaming-lake-ingestion/).
* When the subscription of your tenant ends, the data flow stops, and the data already written stays in your storage.

### Limitations of your own storage {#limitations-of-your-own-storage}

* On AWS, a bucket encrypted with a customer-managed KMS key is not supported. Use the default encryption of S3.
* You cannot change the base location of your data lake after the setup.
