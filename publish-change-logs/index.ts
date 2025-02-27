import { readdir, readFile} from "fs/promises";
import path, { join, sep, basename } from "path";
import { stringify as matterStringify, read as matterRead } from "gray-matter";
import { format } from 'date-fns';
import matter from "gray-matter";
import { valid, gte, eq} from "semver";

const relativePathToChangeLogs = "../content/change-logs";
const changeLogCategoryId = 22;
const changeLogCategorySlug = "cumulocity-change-log";
const toBeCreated = new Map<string, matter.GrayMatterFile<string>>();
const toBeUpdated = new Map<string, (string | number)[]>();
const toBeDeleted = new Map<string, number>();
const requestDelay = 2000;
let requestsSent = 0;
const maxRequests = 0;
const categoryMap = {
  "analytics": 23,
  "application enablement & solutions": 24,
  "device management & connectivity": 25,
  "device management": 25,
  "device connectivity": 25,
  "platform services": 26,
  "edge": 27
}

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

async function createNewChangeLog(raw: string, title: string, category: number, tags: string[]) {
  console.log("Creating article with title "+title+" ...");
  console.log("Tags: "+tags);
  let body = {
    title: title,
    category: category,
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

async function getMatterForFiles(files: string[]) : Promise<matter.GrayMatterFile<string>[]> {
  let filesList: matter.GrayMatterFile<string>[] = [];
  for(const filePath of files) {
    const pathToFile = join(relativePathToChangeLogs, filePath);
    const matterResult = await matterRead(pathToFile);
    filesList.push(matterResult);
  }
  return filesList;
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
  console.log("Reading and sorting change log files...");
  let sortedFileContent = await getMatterForFiles(changeLogMarkdownFiles);
  //console.log("Change log files sorted by date: ", sortedFileContent);
  console.log("Retreaving Tech Community Change logs ...");
  const existingTopics = await getDiscourseChangeLogs();
  //Checking existing change log topics
  for (const changeLogTopic of existingTopics) {
      const articleTitle = changeLogTopic.title;
      if(!articleTitle.startsWith("About"))
        toBeDeleted.set(articleTitle, changeLogTopic.id);
      for(const matterResult of sortedFileContent) {
        const fileTitle = await processFile(matterResult);
        if (fileTitle && !toBeUpdated.has(fileTitle)) {
          //Change-log file is valid - create new article
          toBeCreated.set(fileTitle, matterResult);
        }
        if(articleTitle === fileTitle) {
          //console.log("Article Title: "+articleTitle+ ", Change Log Title: "+fileTitle);
          //Article is still active, don't delete
          toBeDeleted.delete(articleTitle);
          //Article already exists - no new creation
          toBeCreated.delete(fileTitle);
          //Article already exists - check if update is needed
          toBeUpdated.set(articleTitle, [changeLogTopic.id, matterResult]);
        }
      }
  }
  var toBeCreatedSorted = new Map([...toBeCreated.entries()].sort());
  //Create new articles
  for (const title of toBeCreatedSorted.keys()) {
      if(maxRequests > 0 && requestsSent >= maxRequests) break;
      const matterResult = toBeCreated.get(title);
      if (matterResult) {
        let rawAndTags = await getRawAndTagsFromFile(matterResult);
        try {
          createNewChangeLog(rawAndTags.raw, title, rawAndTags.category, rawAndTags.tags);
        } catch(error) {
          console.log("Error on creating article with title: "+title + ", Error: "+ error);
        }
        if(requestDelay > 0) await delay(requestDelay);
      }
  }
  //Delete old articles
  for(const title of toBeDeleted.keys()) {
    if(maxRequests > 0 && requestsSent >= maxRequests) break;
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
    if(maxRequests > 0 && requestsSent >= maxRequests) break;
    let fileIdArray = toBeUpdated.get(title) as (matter.GrayMatterFile<string> | number)[];
    let id:number = fileIdArray[0] as number;
    let matterResult = fileIdArray[1] as matter.GrayMatterFile<string>;
    //let pathToFile:string = fileIdArray[1] as string;
    let existingChangeLog = await getDiscourseChangeLog(id);
    if(requestDelay > 0) await delay(requestDelay);
    //let slug = existingChangeLog.slug;
    let posts = existingChangeLog.post_stream.posts;

    if (posts.length > 0) {
      if(maxRequests > 0 && requestsSent >= maxRequests) break;
      const articleContent = posts[0].raw;
      const postId = posts[0].id;
      const fileContent = await getRawAndTagsFromFile(matterResult);
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



async function processFile(matterResult: matter.GrayMatterFile<string>) {
  const { data, content, orig } = matterResult;
  let date = data.date;
  if(!date) {
    //console.warn("No date in change-log file: ", filePath, "Skipping..");
    return "";
  }
  //if (!data.version || (data.version && data.version === "''")) {
    //console.warn("No version set in: ", filePath, "Skipping..");
  //  return "";
  //}
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

async function getRawAndTagsFromFile(matterResult: matter.GrayMatterFile<string>) {
  const { data, content, orig } = matterResult;
  //let fileName = basename(filePath);
  let changeType =data.change_type[0].label;
  let productArea = data.product_area;
  let category = changeLogCategoryId;
  let date = data.date;
  if(date instanceof Date) {
    date = format(date, "yyyy-MM-dd");
  }

  let version = data.version;
  if(version && version === "''") version = "";
  let component = "";
  if(data.component && data.component.length >= 1)
     component = data.component[0].label;
  let buildArtifact = "";
  if(data.build_artifact && data.build_artifact.length >= 1)
    buildArtifact = data.build_artifact[0].label;
  let ticket = data.ticket;
  let tags = [];

  let formattedContent = ""
  if(content)  {
    formattedContent = formatContent(content);
  }
  if(changeType) tags.push(renameTag(changeType));
  if(productArea) {
    tags.push(mapProductAreaToTag(productArea));
    category = getSubCategoryFromProductArea(productArea);
  }
  if(component) tags.push(renameTag(component)); 
  let deployments: Map<string, string> = new Map();
  if(buildArtifact) {
    tags.push(renameTag(buildArtifact)); 
    deployments = await getDeploymentsForBuildArtifact(component, buildArtifact, version);
    //for(let deployment of deployments.keys()) {
    //  tags.push(deployment);
    //}
  }
 

  let raw: string = `
  **Change Type:** ${changeType}
  **Date:** ${date}
  **Product area:** ${productArea}
  **Component:** ${component}
  **Build artifact:** ${buildArtifact} ${version? "("+ version +")" : ""}
  **Internal ID:** ${ticket? ticket : ""}
  **Deployed at:** ${getDeploymentListString(deployments, false)}

  ---

  ${formattedContent}
  `
  return {raw: raw, category: category, tags: tags.flat()};
}

function formatContent(content: string) {
  let formattedContent = content.replaceAll("{{< c8y-admon-important >}}", "> **Important**").replaceAll("{{< /c8y-admon-important >}}", "");
  formattedContent = formattedContent.replaceAll("{{< c8y-admon-note >}}", "> **Note**").replaceAll("{{< /c8y-admon-note >}}", "");
  formattedContent = formattedContent.replaceAll("{{< c8y-admon-info >}}", "> **Info**").replaceAll("{{< /c8y-admon-info >}}", "");
  formattedContent = formattedContent.replaceAll("{{< c8y-admon-tip >}}", "> **Tip**").replaceAll("{{< /c8y-admon-tip >}}", "");
  formattedContent = formattedContent.replaceAll("{{< c8y-admon-preview >}}", "> **Preview**").replaceAll("{{< /c8y-admon-preview >}}", "");
  formattedContent = formattedContent.replaceAll("{{< c8y-admon-caution >}}", "> **Caution**").replaceAll("{{< /c8y-admon-caution >}}", "");
  formattedContent = formattedContent.replaceAll("{{< management-tenant >}}", "Management tenant");
  formattedContent = formattedContent.replaceAll("{{< enterprise-tenant >}}", "Enterprise tenant");
  formattedContent = formattedContent.replaceAll("{{< company-c8y >}}", "Cumulocity");
  formattedContent = formattedContent.replaceAll("{{<link-apama-webhelp>}}", "https://cumulocity.com/apama/docs/latest");
  formattedContent = formattedContent.replaceAll("{{<link-apamadoc-api>}}", "https://cumulocity.com/apama/docs/latest/related/ApamaDoc/index.html");
  formattedContent = formattedContent.replaceAll("{{< openapi >}}", "Cumulocity OpenAPI Specification");
  formattedContent = formattedContent.replaceAll("{{< link-c8y-github >}}", "https://github.com/Cumulocity-IoT");
  return formattedContent.replaceAll("{{< product-c8y-iot >}}", "Cumulocity").replaceAll("{{< enterprise-tenant >}}", "Enterprise Tenant"); 
}
function getSubCategoryFromProductArea(productArea: string): number {
  return categoryMap[productArea.toLocaleLowerCase() as keyof typeof categoryMap];
}

function mapProductAreaToTag(productArea: string) {
  if(productArea.toLowerCase() === "application enablement & solutions")
    return ["app-enablement"];
  if(productArea.toLowerCase() === "device management & connectivity")
    return ["device-management", "device-connectivity"];
  else
    return [renameTag(productArea)];
}

async function getDeploymentsForBuildArtifact(component: string, build_artifact: string, version: string):Promise<Map<string, string>> {
  const deploymentMap = new Map<string, string>();
  //console.log("Checking deployment zones for component: '"+component+"', build artifact: '"+build_artifact + "' and version: '"+version+"'");
  for(let artifact in deploymentObj) {
    if(build_artifact === deploymentObj[artifact].component_name) {

      if(version && version === "''") version = "";
      if (version && !valid(version) && version.split('.').length==4) {
        version=toSemverFormat(version);
      }
      if(version) {
        if(gte(deploymentObj[artifact].zones["c8y-ops-zone-1"].clusters["eu-latest-cumulocity-com"].version, version))
          //Only retrieve updated date when version is equal
          deploymentMap.set("eu-latest-cumulocity-com", deploymentObj[artifact].zones["c8y-ops-zone-1"].clusters["eu-latest-cumulocity-com"].updated_at);
        if(gte(deploymentObj[artifact].zones["c8y-ops-zone-2"].clusters["apj-cumulocity-com"].version, version))
          deploymentMap.set("apj-cumulocity-com", deploymentObj[artifact].zones["c8y-ops-zone-2"].clusters["apj-cumulocity-com"].updated_at);
        if(gte(deploymentObj[artifact].zones["c8y-ops-zone-2"].clusters["jp-cumulocity-com"].version, version))
          deploymentMap.set("jp-cumulocity-com", deploymentObj[artifact].zones["c8y-ops-zone-2"].clusters["jp-cumulocity-com"].updated_at);
        if(gte(deploymentObj[artifact].zones["c8y-ops-zone-3"].clusters["c8y-cumulocity-com"].version, version))
          deploymentMap.set("c8y-cumulocity-com", deploymentObj[artifact].zones["c8y-ops-zone-3"].clusters["c8y-cumulocity-com"].updated_at);
        if(gte(deploymentObj[artifact].zones["c8y-ops-zone-3"].clusters["us-cumulocity-com"].version, version))
          deploymentMap.set("us-cumulocity-com", deploymentObj[artifact].zones["c8y-ops-zone-3"].clusters["us-cumulocity-com"].updated_at);
        if(gte(deploymentObj[artifact].zones["c8y-ops-zone-3"].clusters["emea-cumulocity-com"].version, version))
          deploymentMap.set("emea-cumulocity-com", deploymentObj[artifact].zones["c8y-ops-zone-3"].clusters["emea-cumulocity-com"].updated_at);
        //Abort after first match
        break;
      }
    }
  }
  return deploymentMap;
}

function getDeploymentListString(deploymentMap: Map<string, string>, withDate: boolean) {
  let deploymentListstring = "";
  if(withDate) {
    for (let deployment of deploymentMap.keys()) {
      if(!deploymentListstring)
        deploymentListstring = deployment.replaceAll("-",".") + " ("+deploymentMap.get(deployment)?.slice(0,10)+")";
      else {
        deploymentListstring += ", "+deployment.replaceAll("-",".") + " ("+deploymentMap.get(deployment)?.slice(0,10)+")";
      }
    };
  } else {
    for (let deployment of deploymentMap.keys()) {
      if(!deploymentListstring)
        deploymentListstring = deployment.replaceAll("-",".");
      else {
        deploymentListstring += ", "+deployment.replaceAll("-",".");
      }
    };
  }
  return deploymentListstring;
}

function toSemverFormat(version: string){
  const versionParts = version.split('.');
  const semanticVersion = `${versionParts[0]}${versionParts[1]}.${versionParts[2]}.${versionParts[3]}`;
  console.debug("Non-Semantic version format:",version,"converted to semantic format",semanticVersion,"for processing")
  return semanticVersion
}