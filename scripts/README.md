# Steps for finding and deleting unused images

## Prerequisites
- Node.js with version 20 and more is required to execute the scripts.

## 1. Navigate to the *scripts* folder:
- Create a main directory, In the main directory please clone your *c8y-docs* repository.
- Open the *c8y-docs* folder and look for the *scripts* folder. In the scripts folder, Finding_unused_images.js and Delete_unused_images.js files are stored.

## 2. Copy the JavaScriipt Files:
- Copy the *Finding_unused_images.js* and *Delete_unused_images.js* files and come back to your main directory.
- Paste the  *Finding_unused_images.js* and *Delete_unused_images.js* files back into the main directory under the *c8y-docs* folder.

## 3. Run the script to find unused images:
- Open your windows command line prompt(cmd.exe) or Git Bash
- In the Command line or Git Bash, Navigate to your main project directory where *c8y-docs*, *Finding_unused_images.js*, and *Delete_unused_images.js* are located.
- To identify unused images, run the following command:

    ```
    node Finding_unused_images.js
    ```
  **Note:** If Node.js with version 20 and more is not installed, the above command will fail to execute as it relies on Node.js to run JavaScript files

- After the script executes, you see a newly generated file named *unused_images.csv*. This file contains a list of all the unused images in the current project.

## 4. Run the script to delete unused images:
- To run the deletion script execute:

    ```
    node Delete_unused_images.js
    ```

- The script deletes all the unused images listed in the *unused_images.csv* file.

## 5. Verification:
After deleting the unused images, run the *Finding_unused_images.js* script again to confirm that the unused images have been successfully removed. This updates the *unused_images.csv* file, allowing you to see the updated list of unused images after deletion.
