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
    const parts = data.version.split('.');
    const normalizedVersion = `${parts[0]}${parts[1]}.${parts[2]}.${parts[3]}`;
    console.warn("Non-semantic version: ", data.version ,"converted to semantic version format: ", normalizedVersion);
    data.version=normalizedVersion ;
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
