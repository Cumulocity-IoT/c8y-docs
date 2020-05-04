---
weight: 60
title: Data Broker
layout: redirect
---

Mit der Funktion Data Broker können Daten gezielt mit anderen Mandanten geteilt werden. Sie können folgende Daten teilen:

- Geräte (und Objekte im Allgemeinen),
- Ereignisse,
- Alarme,
- Messwerte,
- Kommandos.

Navigieren Sie zur Seite **Datenkonnektor** im Menü **Data Broker**, wenn Sie anderen Mandanten Daten senden möchten. Navigieren Sie zur Seite **Datenabonnements**, wenn Sie von anderen Mandanten Daten erhalten möchten.

<img src="/images/benutzerhandbuch/enterprise-tenant/et-data-broker-navigator.png" alt="Data broker menus" >

>**Wichtig**: Geräte, die über Data Broker weitergeleitet werden, werden wie normale Geräte im Zielmandanten abgerechnet.

Beachten Sie folgende Einschränkungen im Zusammenhang mit Data Broker:

* Cloud Remote Access kann beim Zielmandanten nicht verwendet werden.
* Der Management-Mandant kann nicht als Data Broker-Ursprungsmandant verwendet werden.
* Derzeit funktioniert das Fieldbus-Widget nicht bei Mandanten, die die Fieldbus-Geräte über Data Broker empfangen, da die entsprechenden Datenmodelle nicht synchronisiert sind.
* Data Broker garantiert nicht, dass die Zielmandanten dieselbe Nachrichtenreihenfolge aufweisen wie der Ursprungsmandant.
* Wenngleich wir für Rückwärtskompatibilität sorgen, können wir nicht sicherstellen, dass Data Broker Daten an Cumulocity IoT-Mandanten senden kann, die in älteren Cumulocity IoT-Versionen als der Ursprungsmandant ausgeführt werden.

### <a name="data-broker-connectors"></a> Datenkonnektoren

Ein Datenkonnektor beschreibt die Daten, die Sie zu einem Zielmandanten senden möchten sowie die URL dieses Mandanten.

<a name="data-broker-connectors-list"></a> **Viewing data connectors**

Klicken Sie im Navigator auf **Datenkonnektor**, um eine Liste mit allen aktuell definierten Datenkonnektoren mit ihrem jeweiligen Status anzuzeigen.

![Data broker connectors list](/images/benutzerhandbuch/enterprise-tenant/et-data-broker-connector-list.png)

Für jeden Datenkonnektor wird die folgenden Information bereitgestellt:

* der Name des Datenkonnektors
* der Zielmandant
* der Status des Konnektors
* die Anzahl der Filter, die für den Datenkonnektor gesetzt sind

Verwenden Sie den Umschalter, um das Weiterleiten von Daten an den Zielmandanten zu aktivieren bzw. deaktivieren. Werden Daten weitergeleitet, steht der Umschalter auf "Aktiv". Werden keine Daten weitergeleitet, steht der Umschalter auf "Gesperrt" oder "Ausstehend". "Gesperrt" bedeutet, dass Sie das Weiterleiten deaktiviert haben. "Ausstehend" bedeutet, dass der Zielmandant das Weiterleiten deaktiviert hat.

> **Info**: Wenn der Ursprungsmandant gesperrt wurde, sind auch alle seine Data Broker-Konnektoren gesperrt.

#### <a name="data-broker-connector-edit"></a>So fügen Sie einen Datenkonnektor hinzu

1. Klicken Sie **Datenkonnektor hinzufügen** in der oberen Menüleiste.
2. Geben Sie in der Registerkarte **Einstellungen** die folgenden Informationen ein, um einen neuen Datenkonnektor zu erstellen:

	|Feld|Beschreibung|
|:---|:---|
|Titel|Der Name des Datenkonnektors.
|Ziel-URL für den Datenkonnektor|Die URL des Mandanten, an den Daten weitergeleitet werden sollen. Nach dem Speichern ist dieser Wert nicht mehr editierbar.
|Beschreibung|Eine Textbeschreibung der Konfiguration. Nach dem Akzeptieren des Abonnements werden sowohl der Name als auch die Beschreibung auf der Zielseite angezeigt.
|Datenfilter|Eine Reihe von Filtern, die festlegen, was in das Ziel kopiert wird. Sie müssen mindestens einen Filter konfigurieren.

3. Klicken Sie **Filter hinzufügen**, um einen neuen Filter zu konfigurieren.

	![Data broker configure filter](/images/benutzerhandbuch/enterprise-tenant/et-data-broker-connector-filter.png)

4. Jeder Datenfilter enthält die folgenden Informationen:

	<table>
<col width = 150>
<thead>
<tr>
<th style="text-align:left">Feld</th>
<th style="text-align:left">Beschreibung</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Gruppe oder Gerät</td>
<td style="text-align:left">Die Gruppe oder das Gerät, die/das weitergeleitet wird. Wird hier eine Gruppe ausgewählt, werden alle Untergruppen und Untergeräte ebenfalls weitergeleitet. <b>Siehe nachstehende Warnung zur Verwendung von "Alle Objekte".</b> </td>
</tr>
<tr>
<td style="text-align:left">API</td>
<td style="text-align:left">Der Datentyp, der weitergeleitet wird (Alarme, Ereignisse, Messwerte, Objekte) oder empfangen wird (Kommandos).</td>
</tr>
<tr>
<td style="text-align:left">Zu filternde Fragmente</td>
<td style="text-align:left">Fragmente, die in einem Gerät vorhanden sein müssen, damit dieses weitergeleitet wird.</td>
</tr>
<tr>
<td style="text-align:left">Zu kopierende Fragmente</td>
<td style="text-align:left">Fragmente, die zum Ziel kopiert werden. Wenn hier nichts angegeben wird, werden nur die Standardattribute wie Objekte, Alarme, Ereignisse und Messwerte weitergeleitet (siehe unten). Wählen Sie **Alle Fragmente kopieren**, um das gesamte Objekt weiterzuleiten.</td>
</tr>
<tr>
<td style="text-align:left">Type-Filter</td>
<td style="text-align:left">Weitergeleitete Daten müssen diesen Wert in ihrem "Type"-Attribut haben.</td>
</tr>
</tbody>
</table>

5. Klicken Sie **Speichern**, um die Konfiguration zu speichern.

>**Warnung zur Verwendung von "Alle Objekte"**

>Die Option **Alle Objekte** ist weiterhin in der Benutzeroberfläche vorhanden, um Rückwärtskompatibilität mit älteren Versionen sicherzustellen. Wir planen, diese Option künftig nicht mehr zu unterstützen, und empfehlen dringend, sie nicht zu verwenden.

>Wird sie gewählt, synchronisiert Cumulocity IoT alle Arten von System- und benutzerdefinierten Daten und könnte Objekte im Zielmandanten außer Kraft setzen oder remote erstellen. Solche Objekte können Referenzen zu anderen Objekten sowie Konfigurationsinformationen enthalten. Es liegt in der Verantwortung des Benutzers, die Konsistenz solcher Informationen in den übertragenen Objekten in der Zielumgebung sicherzustellen.

>Dies betrifft Elemente wie SmartREST-Templates, Geräteprotokolle, Smart-Rule-Konfigurationen und Dashboards.

>Wenn Sie zum Beispiel auf dem Ursprungsmandanten eine Smart Rule erstellen und alle Objekte synchronisieren, erstellt Data Broker ein Smart-Rule-Objekt auf dem Zielmandanten. Die Regel selbst wird nicht kopiert, da eine synchronisierte Smart Rule dieselbe Aktion auf demselben Gerät für dieselbe Konfiguration ausführen würde. Dadurch würden bei einem Alarm doppelte E-Mails für die jeweiligen Empfänger erstellt werden.


Wenn das Feld **Gruppe oder Gerät** ausgefüllt ist, wird die gesamte nachfolgende Struktur der Stammdaten an den Zielmandanten weitergeleitet, sobald der Konnektor aktiv ist. Wenn das Feld **Gruppe oder Gerät** leer ist oder "Alle" enthält, wird die nachfolgende Struktur nicht weitergeleitet. in diesem Fall arbeitet der Filter im "Lazy Mode", das heißt, das Gerät oder Asset wird erst mit dem ersten Ereignis/Messwert/Alarm weitergeleitet.

Wenn der Datentyp Kommando in Filtern ausgewählt ist, werden die Kommandos, die im Zielmandanten erstellt wurden, an den Ursprungsmandanten weitergeleitet. Dies trifft jedoch nur auf Kommandos zu, die die folgenden Bedingungen erfüllen:

* das Gerät des Kommandos selbst stammt aus weitergeleiteten Daten,
* das Kommando entspricht anderen Filterkriterien.

Aktualisierungen des Kommandostatus vom Ursprungsmandanten werden an den Zielmandanten weitergeleitet.

Die Kopfzeile eines Datenfilters fasst die Konfiguration in einer Zeile zusammen. Die Attribute, die standardmäßig kopiert werden, sind:

* **Für erzeugte Alarme**: type, text, time, severity, status
* **Für aktualisierte Alarme**: status, text, severity
* **Für erzeugte Ereignisse**: type, text, time
* **Für erzeugte Messwerte**: type, text, time
* **Für erstellte und aktualisierte Geräte**: type, name, c8y&#95;IsBinary, c8y&#95;IsDeviceGroup, c8y&#95;IsDevice, c8y&#95;DeviceGroup, c8y&#95;DeviceSubgroup, c8y&#95;SmartRule, c8y&#95;DynamicGroup, c8y&#95;DeviceQueryString
* **Für aktualisierte Kommandos**: status

Nach dem Speichern der Konfiguration wird ein Sicherheitscode unter der Konfiguration angezeigt. Dieser Sicherheitscode verhindert unbeabsichtigtes Weiterleiten von Daten. Sie müssen diesen Sicherheitscode getrennt einem Benutzer mit Administrationsrechten für den Zielmandanten mitteilen. Durch Klicken auf das Kopieren-Symbol neben dem Sicherheitscode können Sie diesen in Ihre Zwischenablage kopieren.

![Security code](/images/benutzerhandbuch/enterprise-tenant/et-data-broker-connector-security-code.png)


#### So bearbeiten Sie einen Datenkonnektor

Klicken Sie auf das Menüsymbol rechts neben einem Datenkonnektor-Eintrag und anschließend auf **Bearbeiten**.

Bearbeiten Sie in der Registerkarte **Einstellungen** die Datenkonnektor-Konfiguration.

Weitere Informationen zu den Einstellungen finden Sie unter [So fügen Sie einen Datenkonnektor hinzu](#data-broker-connector-edit).

#### So duplizieren Sie einen Datenkonnektor

Klicken Sie auf das Menüsymbol rechts neben einem Datenkonnektor-Eintrag und anschließend auf **Duplizieren**, um einen weiteren Datenkonnektor mit der gleichen Konfiguration zu erstellen.

#### So löschen Sie einen Datenkonnektor

Klicken Sie auf das Menüsymbol rechts neben einem Datenkonnektor-Eintrag und anschließend auf **Löschen**, um die Datenweiterleitung zu stoppen und den Datenkonnektor zu löschen.

#### So zeigen Sie Alarme für einen Datenkonnektor an

Öffnen Sie einen Datenkonnektor und wechseln Sie zur Registerkarte **Alarme**, um aktuelle Alarme für den Datenkonnektor anzuzeigen.

![Warnings tab](/images/benutzerhandbuch/enterprise-tenant/et-data-broker-connector-warnings.png)

Weitere Informationen zu Alarmen finden Sie unter [Überwachen und Steuern von Geräten > Verwenden von Alarmen](/benutzerhandbuch/device-management/#alarm-monitoring) im Abschnitt *Device Management*.


### <a name="data-broker-subscriptions"></a> Datenabonnements

Auf der Seite **Datenabonnements** können Sie bestehende Datenabonnements verwalten und neue anlegen.

Klicken Sie **Datenabonnements**, um eine Liste mit allen aktuell zu Ihrem Mandanten weitergeleiteten Daten anzuzeigen.

<img src="/images/benutzerhandbuch/enterprise-tenant/et-subscriptions.png" alt="Data subscriptions">

Für jedes Abonnement wird der Name, der Zielmandant und der Status (aktiviert oder deaktiviert) auf einer Karte bereitgestellt.

Verwenden Sie den Umschalter, um zeitweilig das Weiterleiten von Daten in Ihren Mandanten zu beenden.

#### So richten Sie die Datenweiterleitung auf der Empfängerseite ein

1. Klicken Sie **Datenabonnement hinzufügen** in der oberen Menüleiste, um Daten zu empfangen.
2. Geben Sie in der neuen Karte den Sicherheitscode ein, den Sie vom Sender der Daten erhalten haben.
3. Wenn die Verbindung hergestellt ist, klicken Sie **Annehmen**, um das Weiterleiten in Ihren Mandanten zu starten. Das Abonnement ist nun aktiv.
4. Verschieben Sie den Umschalter in der Karte, um zeitweilig das Weiterleiten von Daten in Ihren Mandanten zu beenden.

Navigieren Sie nun zur Device Management- oder Cockpit-Anwendung. Dort finden Sie eine neue "virtuelle Gruppe" mit einem speziellen Symbol (siehe Abbildung unten), die die weitergeleiteten Geräte anzeigt. Diese Gruppe hat denselben Namen wie das Abonnement. Geräte werden auf der Empfängerseite verzögert erstellt, sobald sie, nach Einrichten eines aktiven Abonnements, das erste mal Daten senden.

<img src="/images/benutzerhandbuch/enterprise-tenant/et-data-broker-group-created.png" alt="Data subscriptions">


#### So löschen Sie einen Datenkonnektor

Klicken Sie auf das Menüsymbol und anschließend auf **Löschen**, um die Datenweiterleitung zu stoppen und den Datenkonnektor zu löschen.

### <a name="data-broker-troubleshooting"></a> Troubleshooting

Im Ursprungsmandanten reiht Data Broker die Daten, die nicht sofort an den Zielmandanten weitergeleitet werden können, in eine Wartschlange ein. Die Datenmenge, die in die Warteschlange eingereiht werden kann, ist begrenzt. Kann Cumulocity IoT keine weiteren Daten in die Warteschlange einreihen, werden die ältesten Daten aus der Warteschlange entfernt. In diesem Fall wird im Mandanten ein Alarm ausgegeben.

**"Data Broker-Verarbeitung ist aktuell überlastet und beendet möglicherweise das Weiterleiten von Daten. Bitte kontaktieren Sie unseren Support."**

Um die Anzahl der Alarme zu reduzieren, werden Alarme höchstens einmal pro Minute ausgelöst.
