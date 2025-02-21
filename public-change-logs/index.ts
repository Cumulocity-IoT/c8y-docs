import { readdir, writeFile } from "fs/promises";
import path, { join, sep, basename } from "path";
import { stringify as matterStringify, read as matterRead } from "gray-matter";
import { format } from 'date-fns';

const relativePathToChangeLogs = "../content/change-logs";
const changeLogCategoryId = 22;
const changeLogCategorySlug = "cumulocity-change-log";
const toBeCreated = new Map<string, string>();
const toBeUpdated = new Map<string, (string | number)[]>();
const toBeDeleted = new Map<string, number>();

if (process.argv.length < 4) {
  console.error("Usage: node index.ts <discourseURL> <discourseApiKey> <discourseUser>");
  process.exit(1);
}
let [discourseURL, discourseApiKey, discourseUser] = process.argv.slice(2);

//console.log(discourseURL, discourseApiKey, discourseUser)

processFiles();

async function createNewChangeLog(raw: string, title: string, tags: string[]) {
  console.log("Creating article with title "+title+" ...");
  console.log("Tags: "+tags);
  let body = {
    title: title,
    category: changeLogCategoryId,
    raw: raw,
    tags: tags
  }
  const res = await fetch(`${discourseURL}/posts.json`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Api-Key': discourseApiKey,
      'Api-Username': discourseUser
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    console.log(await res.json());
    throw new Error(res.statusText);
  }
  return await res.json();
}

async function getDiscourseChangeLogs():Promise<any> {

  const res = await fetch(`${discourseURL}/c/${changeLogCategorySlug}/${changeLogCategoryId}.json`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Api-Key': discourseApiKey,
      'Api-Username': discourseUser
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
}

async function deleteDiscourseChangeLog(id: number):Promise<any> {
  const res = await fetch(`${discourseURL}/t/${id}}.json`, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Api-Key': discourseApiKey,
      'Api-Username': discourseUser
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
}

async function updateDiscourseChangeLog(id: number, raw: string):Promise<any> {
  let body = {
    raw: raw
  }
  const res = await fetch(`${discourseURL}/posts/${id}}.json`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Api-Key': discourseApiKey,
      'Api-Username': discourseUser
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
}

async function updateTags(id: number, title: string, tags: string[]):Promise<any> {
  let body = {
    title: title,
    tags: tags
  }
  const res = await fetch(`${discourseURL}/t/-/${id}.json`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Api-Key': discourseApiKey,
      'Api-Username': discourseUser
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
}

async function getDiscourseChangeLog(id: number):Promise<any> {
  const res = await fetch(`${discourseURL}/t/${id}}.json?include_raw=true`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Api-Key': discourseApiKey,
      'Api-Username': discourseUser
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
}

async function processFiles() {
  try {
  const files = await readdir(relativePathToChangeLogs, {
    recursive: true,
    encoding: "utf-8",
  });
  const changeLogMarkdownFiles = files.filter(
    (file) => file.endsWith(".md") || file.endsWith(".MD")
  );
  const existingChangeLogs = await getDiscourseChangeLogs();
  const existingTopics = existingChangeLogs.topic_list.topics;
  //Checking existing change log topics
  for (const changeLogTopic of existingTopics) {
      const articleTitle = changeLogTopic.title;
      if(!articleTitle.startsWith("About"))
        toBeDeleted.set(articleTitle, changeLogTopic.id);
      for(const filePath of changeLogMarkdownFiles) {
        let fileName = basename(filePath);
        const pathToFile = join(relativePathToChangeLogs, filePath);
        const fileTitle = await processFile(pathToFile);
        if (fileTitle && !toBeUpdated.has(fileTitle)) {
          //Change-log file is valid - create new article
          toBeCreated.set(fileTitle, pathToFile);
        }
        if(articleTitle === fileTitle) {
          //console.log("Article Title: "+articleTitle+ ", Change Log Title: "+fileTitle);
          //Article is still active, don't delete
          toBeDeleted.delete(articleTitle);
          //Article already exists - no new creation
          toBeCreated.delete(fileTitle);
          //Article already exists - check if update is needed
          toBeUpdated.set(articleTitle, [changeLogTopic.id, pathToFile]);
        }
      }
  }
  //Create new articles
  for (const title of toBeCreated.keys()) {
      const filePath = toBeCreated.get(title) as string;
      let rawAndTags = await getRawAndTagsFromFile(filePath);
      createNewChangeLog(rawAndTags.raw, title, rawAndTags.tags);
  }
  //Delete old articles
  for(const title of toBeDeleted.keys()) {
    let id = toBeDeleted.get(title) as number;
    console.log("Deleting article with title "+title+" and id: "+id);
    try {
      deleteDiscourseChangeLog(id);
    } catch(error) {
        console.log("Error on deleting article:"+ error);
    }
  }

  //Update existing articles
  for(const title of toBeUpdated.keys()) {
    let fileIdArray = toBeUpdated.get(title) as (string | number)[];
    let id:number = fileIdArray[0] as number;
    let pathToFile:string = fileIdArray[1] as string;
    let existingChangeLog = await getDiscourseChangeLog(id);
    let slug = existingChangeLog.slug;
    let posts = existingChangeLog.post_stream.posts;

    if (posts.length > 0) {
      const articleContent = posts[0].raw;
      const postId = posts[0].id;
      const fileContent = await getRawAndTagsFromFile(pathToFile);
      if(articleContent.trim() === fileContent.raw.trim()) {
        //No update needed- ignore
        console.log("No update needed for article with title "+title+" and id: "+id);
      } else {
        //Update article
        console.log("Updating article with title "+title+" and id: "+id);
        updateDiscourseChangeLog(postId, fileContent.raw);
        updateTags(id, title, fileContent.tags );
      }
    }

  }
  } catch(error) {
    console.log("Error during processing: "+error);
  }
}

async function processFile(filePath: string) {
  const matterResult = await matterRead(filePath);
  const { data, content, orig } = matterResult;
  let date = data.date;
  if(!date) {
    //console.warn("No date in change-log file: ", filePath, "Skipping..");
    return "";
  }
  if (!data.version) {
    //console.warn("No version set in: ", filePath, "Skipping..");
    return "";
  }
  if(!content) {
    //console.warn("No content set in: ", filePath, "Skipping..");
    return "";
  }
  if(!data.change_type[0].label || (data.change_type[0].label && data.change_type[0].label === "Fix")) {
    //console.warn("Change Type 'Fix' in: ", filePath, "Skipping..");
    return "";
  }
  if(date instanceof Date) {
    date = format(date, "yyyy-MM-dd");
  }
  const title = date + " - "+ data.title;
  return title;

}
function renameTag(tag: string) {
  return tag.replace(/\s+/g, '-').toLowerCase();
}

async function getRawAndTagsFromFile(filePath: string) {
  const matterResult = await matterRead(filePath);
  const { data, content, orig } = matterResult;
  let fileName = basename(filePath);
  let changeType =data.change_type[0].label;
  let productArea = data.product_area;
  let date = data.date;
  if(date instanceof Date) {
    date = format(date, "yyyy-MM-dd");
  }

  let version = data.version;
  let component = data.component[0].label;
  let buildArtifact = data.build_artifact[0].label;
  let ticket = data.ticket;
  let raw: string = `<!-- ${fileName} -->
  **Change Type:** ${changeType}
  **Date:** ${date}
  **Product area:** ${productArea}
  **Component:** ${component}
  **Build artifact:** ${buildArtifact}
  **Version:** ${version}

  ---

  ${content}
  `
  return {raw: raw, tags: [renameTag(changeType), mapProductAreaToTag(productArea), renameTag(component), buildArtifact].flat()};
}

function mapProductAreaToTag(productArea: string) {
  if(productArea === "Application enablement & solutions")
    return ["app-enablement"];
  if(productArea === "Device management & connectivity")
    return ["device-management", "device-connectivity"];
  else
    return [productArea];
}