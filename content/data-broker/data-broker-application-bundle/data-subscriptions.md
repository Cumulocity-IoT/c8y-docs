---
weight: 30
title: Data subscriptions
layout: bundle
sector:
  - platform_administration
helpcontent:
  - label: data-subscriptions
    title: Data subscriptions
    content: "The **Data subscriptions** page shows a list of all currently defined data forwarded to your tenant. For each subscription, the name, target tenant and status (enabled or disabled) are provided on a card. Use the toggle to temporarily stop forwarding data to your tenant."
---

In the **Data subscriptions** page, you can manage existing data subscriptions or create new ones.

### To view subscriptions {#to-view-subscriptions}

Click **Data subscriptions** to see a list of all currently defined data forwarded to your tenant.

For each subscription, the name, the target tenant and the status (enabled or disabled) is provided on a card.

Use the toggle to temporarily stop forwarding data into your tenant.

### To set up data forwarding on the receiving end {#to-set-up-data-forwarding-on-the-receiving-end}

1. Click **Add data subscription** in the top menu bar to receive data.
2. In the new card, enter the security code that you received from the sending end of the data.
3. When the connection is established, click **Accept** to start forwarding data into your tenant. The subscription is active now.
4. You can use the toggle in the card to temporarily stop forwarding data into your tenant.

You can now navigate to the Device Management application or the Cockpit application. You will find a new "virtual group" with a specific icon <i class="c8y-icon c8y-icon-group-remote c8y-icon-duocolor"></i> showing the forwarded devices. The group will have the same name as your subscription. Devices are "lazily" created on the destination side whenever they send data for the first time after setting up an active subscription.

![Data broker group in cockpit app](/images/users-guide/enterprise-tenant/et-data-broker-group-created.png)

### To delete a data connector {#to-delete-a-data-connector}

Click the menu icon <i class="dlt-c8y-icon-menu-vertical text-muted icon-20"></i> and then click **Delete** to stop data forwarding and delete the data connector.
