---
weight: 30
title: Registering the Sensor App in the platform
layout: bundle
sector:
  - getting_started
---


There are two ways of connecting your smartphone to {{< product-c8y-iot >}}, depending on the platform's version.
You can connect your smartphone via [QR code](#registration-using-qr-code). If that does not work, for example, because you are using an earlier {{< product-c8y-iot >}} version, follow the steps in [Manual registration](#manual-registration).

### Registration using QR code {#registration-using-qr-code}

1.  On a desktop or laptop computer, open a web browser and log in to your {{< product-c8y-iot >}} tenant. From the Cockpit application, click **Connect Smartphone** in the right drawer or in the Welcome widget.

    ![Cockpit application](/images/users-guide/csa/csa-connect-smartphone-right-drawer.png)

2.  Follow the instructions in the wizard to step 3, ensuring that the app is installed on the smartphone.

    ![QR code](/images/users-guide/csa/csa-connect-smartphone-wizard-step3.png)

3.  From your smartphone, launch the app and tap **Register** in the top right corner of the screen. 
4.  Grant access to your camera if the app asks you for permission.
5.  Scan the QR code shown on your PC's web browser. If you can't scan the QR code, tap **Manual registration** on your smartphone and fill in the details at the right side of the wizard screen.
6.  Back on your smartphone, tap **Done**. Sensor measurements are sent to the server. They can be viewed in the device's dashboard.

When using the **Connect Smartphone** wizard for device registration, your smartphone is automatically registered by {{< product-c8y-iot >}} and assigned to the "Phones" group. Tap **Done** on your smartphone to return to the main screen.

{{< c8y-admon-info >}}
QR codes not supported by the {{< sensor-app >}} are highlighted using a red region of interest in the Camera view. QR codes from older versions of {{< product-c8y-iot >}} will be scanned, but it is not possible to connect automatically. Instead, you are forwarded to the **Manual registration** dialog with your tenant and instance pre-filled. From there you should continue with step 4 in [Manual registration](#manual-registration).
{{< /c8y-admon-info >}}

### Manual registration {#manual-registration}

1.  On a desktop or laptop computer, open a web browser and log in to your {{< product-c8y-iot >}} tenant. In the Device Management application, select **Devices > Registration** from the navigator.

    ![Manual registration](/images/users-guide/csa/csa-device-registration.png)

2.  From your smartphone, launch the app and tap **Register** at the top right of the screen. When the camera opens, tap **Register manually**.

3. Back in your web browser, click **Register device** at the top-right of the page and select **General**. Choose a meaningful and unique device ID for your smartphone and a group to assign your device to. Click **Next** and then **Complete**. The server will notice the pending registration and wait for your smartphone to show up.

4. On your smartphone, fill in your tenant, for example, "companytenant01", select your instance, for example, "{{< domain-c8y >}}", and enter your selected device ID. If your instance is not available in the list, you can enter it manually if you click **Add other instance**. Click **Register** for your device to contact the server and ask to be accepted.

    ![Manual registration](/images/users-guide/csa/csa-manual-registration-smartphone.png)

5.  Back on your web browser, your device's card now shows the options to accept or reject the connection. Accept the connection. Your device will be registered with the server and assigned to the selected group.

6.  Back on your smartphone, tap **Done**. Sensor measurements are sent to the server. They can be viewed in the device's dashboard.

For further information about registering a device on the platform manually, refer to [Registering devices](/device-management-application/registering-devices/).

If you want to deregister from {{< product-c8y-iot >}}, tap **Deregister** in the top right corner of the screen and approve the confirmation dialog. After that you can connect to the same or any other {{< product-c8y-iot >}} instance or tenant.

{{< c8y-admon-info >}}
Deregistering a device automatically removes the device from {{< product-c8y-iot >}}.
{{< /c8y-admon-info >}}
