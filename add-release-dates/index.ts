import { readdir, writeFile } from "fs/promises";
import { join, sep } from "path";
import { valid, lt } from "semver";
import { stringify as matterStringify, read as matterRead } from "gray-matter";

const relativePathToChangeLogs = "../content/change-logs";

if (process.argv.length < 4) {
  console.error("Usage: node index.js <component> <version>");
  process.exit(1);
}
let [component, version, dateString] = process.argv.slice(2);

if (!valid(version)) {

  console.error("Invalid version:", version);
  process.exit(1);
}

const dateObj = dateString ? new Date(dateString) : new Date();
const date = dateObj.toISOString().substring(0, 10);
console.log(component, version, date);

processFiles();

async function processFile(filePath: string): Promise<boolean> {
  const matterResult = await matterRead(filePath);
  const { data, content, orig } = matterResult;
  if (!!data.date) {
    console.debug("Date already set for: ", filePath, "Skipping..");
    return false;
  }
  if (!data.version) {
    console.warn("No version set in: ", filePath, "Skipping..");
    return false;
  }

  if (!valid(data.version) && data.version.split('.').length==4) {
    data.version=convertVersionFormat(data.version); // converts from non semantic to semantic version format
  }

  if(!valid(data.version)) {
    console.debug("Version in file: ",filePath,"is not a valid semver. Skipping..");
    return false;
  }


  if (lt(version, data.version)) {
    console.debug(
      "Version in file: ",
      filePath,
      " not yet reached. Skipping.."
    );
    return false;
  }

  data.version = convertVersionFormat(data.version) // converts from semantic semantic to non-semantic version format
  data.date = date;
  const newContent = matterStringify({ content }, data);
  await writeFile(filePath, newContent, { encoding: "utf-8" });
  console.log("Updated file: ", filePath);
  return true;
}

async function processFiles() {
  const files = await readdir(relativePathToChangeLogs, {
    recursive: true,
    encoding: "utf-8",
  });
  const changeLogMarkdownFiles = files.filter(
    (file) => file.endsWith(".md") || file.endsWith(".MD")
  );
  const changeLogFilesOfComponent = changeLogMarkdownFiles.filter((file) =>
    file.includes(`${sep}${component}`)
  );

  let updatedFiles = 0;
  for (const filePath of changeLogFilesOfComponent) {
    try {
      const pathToFile = join(relativePathToChangeLogs, filePath);
      const fileUpdated = await processFile(pathToFile);
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
    `Updated ${updatedFiles} out of ${changeLogFilesOfComponent.length} files for component ${component}.`
  );
}

function convertVersionFormat(version: string){ // used to toggle version format between semantic and non-semantic formats
    if (version.split('.').length == 4){
        const versionParts = version.split('.');
        const semanticVersion = `${versionParts[0]}${versionParts[1]}.${versionParts[2]}.${versionParts[3]}`;
        console.debug("Non-Semantic version format:",version,"converted to semantic format",semanticVersion,"for processing")
        return semanticVersion
    }
    else if (version.split('.').length == 3){
        const versionParts = version.split('.');
        const majorVersion = versionParts[0]
        const nonSemanticVersion = `${majorVersion.slice(0,2)}.${majorVersion.slice(2,4)}.${versionParts[1]}.${versionParts[2]}`;
        console.debug("Semantic version format:",version,"converted to non-semantic format",nonSemanticVersion,"for output")
        return nonSemanticVersion;
    }
}