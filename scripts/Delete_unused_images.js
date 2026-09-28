const fs = require('fs');

function deleteUnusedImagesFromCSV(csvFile) {
    const unusedImages = fs.readFileSync(csvFile, 'utf-8').split('\n').map(line => line.trim());

    unusedImages.forEach(imagePath => {
        try {
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log(`Deleted: ${imagePath}`);
            } else {
                console.log(`File not found: ${imagePath}`);
            }
        } catch (e) {
            console.log(`Error deleting ${imagePath}: ${e}`);
        }
    });
}

const csvFile = 'unused_images.csv';
deleteUnusedImagesFromCSV(csvFile);

