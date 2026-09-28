# Add release dates

This tool allows to update the date attributes of change log entries.
It is supposed to be executed when a new version of your Cumulocity component is deployed.
The provided release date will be added to all changelog entries where the version is below or equal to the provided version and no date has been set yet.

The tool can be used like this:
```
npm ci
npm start <componentName> <releaseVersion> <dateOfRelease>
```

The `dateOfRelease` parameter is optional.

In case a new UI version was deployed, you would e.g. execute:
```
npm start ui-c8y 1020.0.10 2024-06-06
```

The release note files need to start with the components name.
The version field of the changelog file needs to be filled.

The version numbers for your component need to be valid semantic versions in order to compare them.
