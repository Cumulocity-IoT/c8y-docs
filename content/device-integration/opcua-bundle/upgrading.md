---
weight: 200
title: OPC UA major version upgrade notes
layout: redirect
---

### Upgrading from 1021 to 1022 gateway version {#upgrade-1021-to-1022}
Major version 1022 of the OPC UA gateway introduces significant changes, including a new internal database and updated Java version. 
To ensure a smooth transition, follow these steps:
1. **Back up the existing data**: Before proceeding with the upgrade, back up your existing gateway data folder to prevent any potential data loss.
2. **Stop the existing gateway**: Ensure that the current gateway instance is stopped before starting the upgrade process.
3. **Download and run the data migration tool**: A data migration tool is provided to facilitate the transition of your existing data to the new format. 
Download the tool from [https://resources.cumulocity.com/examples/opc-ua/migration-tool-for-1022-upgrade/](https://resources.cumulocity.com/examples/opc-ua/migration-tool-for-1022-upgrade/) and follow the instructions in the *README.md* file to execute the migration.
4. **Install Java 17**: The new gateway version requires Java 17. Ensure that your system has Java 17 installed and configured properly.
5. **Update the gateway JAR file**: Replace the existing gateway JAR file with the new version.
6. **Start the new gateway**: After completing the above steps, start the new gateway instance.

#### Rollback procedure {#rollback-procedure}
If at any point you encounter issues, stop the new gateway and restore the backup of your data folder. Then, restart the previous version of the gateway using Java 11.