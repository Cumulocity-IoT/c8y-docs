const fs = require('fs');
const path = require('path');

const fileExtensionsToCheck = ['.html', '.css', '.js', '.md', '.toml'];
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];

// Function to collect a list of all images in the specified folder and its subfolders
function getImagesFromSpecificPath(imageFolder, imageExtensions) {
    let imageList = [];
    const walk = (dir) => {
        fs.readdirSync(dir).forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                walk(filePath);
            } else if (imageExtensions.some(ext => file.toLowerCase().endsWith(ext))) {
                imageList.push(filePath);
            }
        });
    };
    walk(imageFolder);
    return imageList;
}

// Function to collect a list of all files with the specified extensions in the project folder
function getFilesByExtension(projectFolder, extensions) {
    let fileList = [];
    const walk = (dir) => {
        fs.readdirSync(dir).forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                walk(filePath);
            } else if (extensions.some(ext => file.toLowerCase().endsWith(ext))) {
                fileList.push(filePath);
            }
        });
    };
    walk(projectFolder);
    return fileList;
}

// Function to find image references in the specified files
function findImageFiles(filePaths) {
    const imageReferences = new Set();
    const imageRegex = /["'](.*?\.(?:png|jpg|jpeg|gif|svg))["']|!\[.*?\]\((.*?\.(?:png|jpg|jpeg|gif|svg))\)/g;
    filePaths.forEach(filePath => {
        const content = fs.readFileSync(filePath, 'utf-8');
        let match;
        while ((match = imageRegex.exec(content)) !== null) {
            const imageReference = match[1] || match[2];
            if (imageReference) {
                imageReferences.add(path.basename(imageReference));
            }
        }
    });
    return imageReferences;
}

// To write unused image paths to a CSV file
function writeToCsv(unusedImagesPaths, outputFile) {
    fs.writeFileSync(outputFile, unusedImagesPaths.join('\n'));
}

// To find and save unused images
function findUnusedImages(imageFolder, projectFolder, outputCsv, imageExtensions) {
    const imageFiles = getImagesFromSpecificPath(imageFolder, imageExtensions);
    const imageFilesWithPaths = Object.fromEntries(imageFiles.map(image => [path.basename(image), image]));
    const projectFiles = getFilesByExtension(projectFolder, fileExtensionsToCheck);
    const referencedImages = findImageFiles(projectFiles);
    const unusedImages = new Set(Object.keys(imageFilesWithPaths).filter(img => !referencedImages.has(img)));
    const unusedImagesWithPaths = Array.from(unusedImages).map(img => imageFilesWithPaths[img]);

    writeToCsv(unusedImagesWithPaths, outputCsv);
    console.log(`Unused images: ${unusedImages.size}`);
    console.log(`Unused image paths from '${imageFolder}' have been saved to: ${outputCsv}`);
}

const imageFolderPath = 'c8y-docs/static/images';
const projectFolderPath = 'c8y-docs';
const outputCsvFile = 'unused_images.csv';

findUnusedImages(imageFolderPath, projectFolderPath, outputCsvFile, imageExtensions);

