import { readdir, writeFile } from "fs/promises";
import { readFileSync } from "fs";
import { join, sep } from "path";
import { valid, lt } from "semver";
import { stringify as matterStringify, read as matterRead } from "gray-matter";

interface EnvironmentDetail {
  component_name: string;
  component_version: string;
  component_update_date: string;
  environmentLabel: string;
}

const relativePathToChangeLogs = "../content/change-logs";

if (process.argv.length < 3) {
  console.error("Usage: node index.js <output-file>");
  process.exit(1);
}
let [outputFile] = process.argv.slice(2);

const file = readFileSync(outputFile, { encoding: "utf-8" });
const artifacts = JSON.parse(file);

if (!Array.isArray(artifacts) || artifacts.length === 0) {
  console.error("No artifacts found in the provided file.");
  process.exit(1);
}

processArtifacts().catch((error) => {
  console.error("Error processing artifacts:", error);
  process.exit(1);
});

async function processFile(
  filePath: string,
  component: string,
  version: string,
  date: string,
  environmentDetails: EnvironmentDetail[],
): Promise<boolean> {
  const matterResult = await matterRead(filePath);
  const { data, content, orig } = matterResult;
  if (!data.version) {
    console.warn("No version set in: ", filePath, "Skipping..");
    return false;
  }
  const originalVersion = data.version;

  if (!valid(data.version) && data.version.split(".").length == 4) {
    data.version = toSemverFormat(data.version);
  }

  if (!valid(data.version)) {
    console.debug(
      "Version in file: ",
      filePath,
      "is not a valid semver. Skipping..",
    );
    return false;
  }

  if (lt(version, data.version)) {
    console.debug(
      "Version in file: ",
      filePath,
      " not yet reached. Skipping..",
    );
    return false;
  }

  let environmentAvailability: any[] = data.environment_availability || [];
  if (!Array.isArray(environmentAvailability)) {
    environmentAvailability = [];
  }
  let unchangedEnvironments = true;
  for (const envDetail of environmentDetails) {
    if (environmentAvailability.some(entry => entry.label === envDetail.environmentLabel)) {
      continue;
    }

    if (lt(envDetail.component_version, data.version)) {
      console.debug(`Component "${component}" version "${version}" not yet available in environment "${envDetail.environmentLabel}" (requires "${envDetail.component_version}"). Not adding to "environment_availability"..`);
      continue;
    }

    unchangedEnvironments = false;
    const deploymentDate = new Date(envDetail.component_update_date);
    environmentAvailability.push({
      label: envDetail.environmentLabel,
      date: deploymentDate.toISOString().substring(0, 10),
    });
  }

  if (unchangedEnvironments && !!data.date) {
    console.debug("Date and environment availability already set for: ", filePath, "Skipping..");
    return false;
  }

  data.version = originalVersion;
  if (!data.date) {
    data.date = date;
  }
  if (data.date instanceof Date) {
    data.date = data.date.toISOString().substring(0, 10);
  }
  if (environmentAvailability.length) {
    data.environment_availability = environmentAvailability;
  }
  const newContent = matterStringify({ content }, data);
  await writeFile(filePath, newContent, { encoding: "utf-8" });
  console.log("Updated file: ", filePath);
  return true;
}

async function processFiles(
  component: string,
  version: string,
  date: string,
  environmentDetails: EnvironmentDetail[],
) {
  const files = await readdir(relativePathToChangeLogs, {
    recursive: true,
    encoding: "utf-8",
  });
  const changeLogMarkdownFiles = files.filter(
    (file) => file.endsWith(".md") || file.endsWith(".MD"),
  );
  const changeLogFilesOfComponent = changeLogMarkdownFiles.filter((file) =>
    file.includes(`${sep}${component}`),
  );

  let updatedFiles = 0;
  for (const filePath of changeLogFilesOfComponent) {
    try {
      const pathToFile = join(relativePathToChangeLogs, filePath);
      const fileUpdated = await processFile(
        pathToFile,
        component,
        version,
        date,
        environmentDetails,
      );
      if (fileUpdated) {
        updatedFiles++;
      }
    } catch (error) {
      console.error("Error processing file: ", filePath);
      console.error(error);
      throw error;
    }
  }
  console.log(
    `Updated ${updatedFiles} out of ${changeLogFilesOfComponent.length} files for component ${component}.`,
  );
}

function toSemverFormat(version: string) {
  const versionParts = version.split(".");
  const semanticVersion = `${versionParts[0]}${versionParts[1]}.${versionParts[2]}.${versionParts[3]}`;
  console.debug(
    "Non-Semantic version format:",
    version,
    "converted to semantic format",
    semanticVersion,
    "for processing",
  );
  return semanticVersion;
}

async function processArtifacts() {
  for (const artifactInfo of artifacts) {
    const {
      component_name: component,
      component_version: version,
      component_update_date: dateString,
      environmentDetails,
    } = artifactInfo;
    if (!valid(version)) {
      console.error(`Invalid version '${version}' for component '${component}'. Skipping..`);
      continue;
    }

    const dateObj = dateString ? new Date(dateString) : new Date();
    const date = dateObj.toISOString().substring(0, 10);
    console.log(component, version, date);

    await processFiles(component, version, date, environmentDetails);
  }
}
