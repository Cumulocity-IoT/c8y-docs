const fs = require('fs').promises;
const path = require('path');

const fileExtensionsToCheck = ['.html', '.css', '.js', '.md', '.toml'];
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];

// Function to get all files with specific extensions from a folder and its subfolders
async function getFilesByExtensions(folderPath, extensions) {
    const allFiles = await fs.readdir(folderPath, { recursive: true });
    return allFiles
        .map(file => path.join(folderPath, file))
        .filter(file => extensions.some(ext => file.toLowerCase().endsWith(ext)));
}


// Function to find image references in the specified files
async function findImageFiles(filePaths) {
    const imageReferences = new Set();
    const imageRegex = /["'](.*?\.(?:png|jpg|jpeg|gif|svg))["']|!\[.*?\]\((.*?\.(?:png|jpg|jpeg|gif|svg))\)/g;
    for (const filePath of filePaths) {
        const content = await fs.readFile(filePath, 'utf-8');
        let match;
        while ((match = imageRegex.exec(content)) !== null) {
            const imageReference = match[1] || match[2];
            if (imageReference) {
                imageReferences.add(path.basename(imageReference));
            }
        }
    }
    return imageReferences;
}

// To write unused image paths to a CSV file
async function writeToCsv(unusedImagesPaths, outputFile) {
    await fs.writeFile(outputFile, unusedImagesPaths.join('\n'));
}

// To find and save unused images
async function findUnusedImages(imageFolder, projectFolder, outputCsv, imageExtensions) {
    const imageFiles = await getFilesByExtensions(imageFolder, imageExtensions);
    const imageFilesWithPaths = Object.fromEntries(imageFiles.map(image => [path.basename(image), image]));
    const projectFiles = await getFilesByExtensions(projectFolder, fileExtensionsToCheck);
    const referencedImages = await findImageFiles(projectFiles);
    const unusedImages = new Set(Object.keys(imageFilesWithPaths).filter(img => !referencedImages.has(img)));
    const unusedImagesWithPaths = Array.from(unusedImages).map(img => imageFilesWithPaths[img]);
    await writeToCsv(unusedImagesWithPaths, outputCsv);
    console.log(`Unused images: ${unusedImages.size}`);
    console.log(`Unused image paths from '${imageFolder}' have been saved to: ${outputCsv}`);
}

const imageFolderPath = 'c8y-docs/static/images';
const projectFolderPath = 'c8y-docs';
const outputCsvFile = 'unused_images.csv';

findUnusedImages(imageFolderPath, projectFolderPath, outputCsvFile, imageExtensions);