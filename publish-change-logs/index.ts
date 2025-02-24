import { readdir, readFile} from "fs/promises";
import path, { join, sep, basename } from "path";
import { stringify as matterStringify, read as matterRead } from "gray-matter";
import { format } from 'date-fns';
import { valid, gte } from "semver";

const relativePathToChangeLogs = "../content/change-logs";
const changeLogCategoryId = 22;
const changeLogCategorySlug = "cumulocity-change-log";
const toBeCreated = new Map<string, string>();
const toBeUpdated = new Map<string, (string | number)[]>();
const toBeDeleted = new Map<string, number>();
const requestDelay = 2000;
let requestsSent = 0;
const maxRequests = 60;

if (process.argv.length < 4) {
  console.error("Usage: node index.ts <discourseURL> <discourseApiKey> <discourseUser> <deployments.json>");
  process.exit(1);
}
let [discourseURL, discourseApiKey, discourseUser, deploymentJSON] = process.argv.slice(2);
let deploymentObj: Record<string, any> = {};

if(deploymentJSON) {
  readJsonFile(deploymentJSON).then((data) => {
    //console.log(data);
    deploymentObj = data;
  });
}

//console.log(discourseURL, discourseApiKey, discourseUser)

processFiles();

async function readJsonFile(path:string) {
  const file = await readFile(path, "utf8");
  return JSON.parse(file);
}

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
  requestsSent++;
  if (!res.ok) {
    console.log("Error on creating article with title: "+title + ", Error: "+ res.statusText);
    console.log(await res.json());
  } else 
    return await res.json();
}

async function getDiscourseChangeLogs():Promise<any> {
  const topics = [];
  let url = `${discourseURL}/c/${changeLogCategorySlug}/${changeLogCategoryId}.json`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Api-Key': discourseApiKey,
      'Api-Username': discourseUser
    },
  });
  requestsSent++;
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  let response = await res.json();
  topics.push(response.topic_list.topics);
  while(response.topic_list.more_topics_url) {
    console.log("Found more pages of topics: Retrieving "+ response.topic_list.more_topics_url +" ...")
    let moreTopics = await fetch(discourseURL + response.topic_list.more_topics_url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Api-Key': discourseApiKey,
        'Api-Username': discourseUser
      },
    });
    requestsSent++;
    if (!moreTopics.ok) {
      throw new Error(moreTopics.statusText);
    }
    response = await moreTopics.json();
    topics.push(response.topic_list.topics);
  }

  return topics.flat();
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
  requestsSent++;
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res;
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
  requestsSent++;
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
  requestsSent++;
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
  requestsSent++;
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
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
  const existingTopics = await getDiscourseChangeLogs();
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
      if(maxRequests >= 0 && requestsSent >= maxRequests) break;
      const filePath = toBeCreated.get(title) as string;
      let rawAndTags = await getRawAndTagsFromFile(filePath);
      try {
        createNewChangeLog(rawAndTags.raw, title, rawAndTags.tags);
      } catch(error) {
        console.log("Error on creating article with title: "+title + ", Error: "+ error);
      }
      if(requestDelay > 0) await delay(requestDelay);
  }
  //Delete old articles
  for(const title of toBeDeleted.keys()) {
    if(maxRequests >= 0 && requestsSent >= maxRequests) break;
    let id = toBeDeleted.get(title) as number;
    console.log("Deleting article with title "+title+" and id: "+id);
    try {
      deleteDiscourseChangeLog(id);
      if(requestDelay > 0) await delay(requestDelay);
    } catch(error) {
        console.log("Error on deleting article:"+ error);
    }
  }

  //Update existing articles
  for(const title of toBeUpdated.keys()) {
    if(maxRequests >= 0 && requestsSent >= maxRequests) break;
    let fileIdArray = toBeUpdated.get(title) as (string | number)[];
    let id:number = fileIdArray[0] as number;
    let pathToFile:string = fileIdArray[1] as string;
    let existingChangeLog = await getDiscourseChangeLog(id);
    if(requestDelay > 0) await delay(requestDelay);
    //let slug = existingChangeLog.slug;
    let posts = existingChangeLog.post_stream.posts;

    if (posts.length > 0) {
      if(requestsSent >= 60) break;
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
        if(requestDelay > 0) await delay(requestDelay);
        updateTags(id, title, fileContent.tags );
        if(requestDelay > 0) await delay(requestDelay);
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
  if (!data.version || (data.version && data.version === "''")) {
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
  if(data.title.endsWith("."))
    data.title = data.title.slice(0, -1);
  const title = date + " - "+ data.title.trim();
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
  let component = "";
  if(data.component && data.component.length >= 1)
     component = data.component[0].label;
  let buildArtifact = "";
  if(data.build_artifact && data.build_artifact.length >= 1)
    buildArtifact = data.build_artifact[0].label;
  let ticket = data.ticket;
  let tags = [];

  let formattedContent = ""
  if(content) formattedContent= content.replaceAll("{{< product-c8y-iot >}}", "Cumulocity").replaceAll("{{< enterprise-tenant >}}", "Enterprise Tenant"); 
  if(changeType) tags.push(renameTag(changeType));
  if(productArea) tags.push(mapProductAreaToTag(productArea));
  if(component) tags.push(renameTag(component)); 
  let deployments: string[] = [];
  if(buildArtifact) {
    tags.push(renameTag(buildArtifact)); 
    deployments = await getDeploymentsForBuildArtifact(component, buildArtifact, version);
  }
 


  let raw: string = `<!-- ${fileName} -->
  **Change Type:** ${changeType}
  **Date:** ${date}
  **Product area:** ${productArea}
  **Component:** ${component}
  **Build artifact:** ${buildArtifact}
  **Version:** ${version}
  **Deployed at:** ${getDeploymentListString(deployments)}

  ---

  ${formattedContent}
  `
  return {raw: raw, tags: tags.flat()};
}

function mapProductAreaToTag(productArea: string) {
  if(productArea.toLowerCase() === "application enablement & solutions")
    return ["app-enablement"];
  if(productArea.toLowerCase() === "device management & connectivity")
    return ["device-management", "device-connectivity"];
  else
    return [renameTag(productArea)];
}

async function getDeploymentsForBuildArtifact(component: string, build_artifact: string, version: string):Promise<string[]>{
  let deploymentList :string[] = [];
  //console.log("Checking deployment zones for component: '"+component+"', build artifact: '"+build_artifact + "' and version: '"+version+"'");
  for(let artifact in deploymentObj) {
    if(build_artifact === deploymentObj[artifact].component_name) {

      if (!valid(version) && version.split('.').length==4) {
        version=toSemverFormat(version);
      }

      if(gte(deploymentObj[artifact].zones["c8y-ops-zone-1"].clusters["eu-latest-cumulocity-com"].version, version))
        deploymentList.push("eu-latest-cumulocity-com");
      if(gte(deploymentObj[artifact].zones["c8y-ops-zone-2"].clusters["apj-cumulocity-com"].version, version))
        deploymentList.push("apj-cumulocity-com");
      if(gte(deploymentObj[artifact].zones["c8y-ops-zone-2"].clusters["jp-cumulocity-com"].version, version))
        deploymentList.push("jp-cumulocity-com");
      if(gte(deploymentObj[artifact].zones["c8y-ops-zone-3"].clusters["c8y-cumulocity-com"].version, version))
        deploymentList.push("c8y-cumulocity-com");
      if(gte(deploymentObj[artifact].zones["c8y-ops-zone-3"].clusters["us-cumulocity-com"].version, version))
        deploymentList.push("us-cumulocity-com");
      if(gte(deploymentObj[artifact].zones["c8y-ops-zone-3"].clusters["emea-cumulocity-com"].version, version))
        deploymentList.push("emea-cumulocity-com");
       //Abort after first match
      break;
    }
  }

  return deploymentList;
}

function getDeploymentListString(deploymentList: string[]) {
  let deploymentListstring = "";
  for (let deployment of deploymentList) {
    if(!deploymentListstring)
      deploymentListstring = deployment.replaceAll("-",".");
    else {
      deploymentListstring += ", "+deployment.replaceAll("-",".");
    }
  };
  return deploymentListstring;
}

function toSemverFormat(version: string){
  const versionParts = version.split('.');
  const semanticVersion = `${versionParts[0]}${versionParts[1]}.${versionParts[2]}.${versionParts[3]}`;
  console.debug("Non-Semantic version format:",version,"converted to semantic format",semanticVersion,"for processing")
  return semanticVersion
}