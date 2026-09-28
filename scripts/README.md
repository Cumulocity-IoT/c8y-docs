# Steps for finding and deleting unused images

## Prerequisites
- Node.js with version 20 and more is required to execute the scripts.

## 1. Navigate to the *scripts* folder:
- Create a main directory folder, In the main directory folder please clone your *c8y-docs* repository.
**Note:** You can name the main directory folder anything you like; it just needs to hold your *c8y-docs* repository and *scripts*.
- Open the *c8y-docs* folder and navigate to the *scripts* folder. In the scripts folder the files *Finding_unused_images.js* and *Delete_unused_images.js* are stored.

## 2. Copy the JavaScriipt Files:
- Copy the *Finding_unused_images.js* and *Delete_unused_images.js* files and come back to your main directory and Paste the  *Finding_unused_images.js* and *Delete_unused_images.js* files back into the main directory below the *c8y-docs* folder.
structure: main directory
          |- c8y-docs
          |- Finding_unused_images.js
          |- Delete_unused_images.js


## 3. Run the script to find unused images:
- For Windows: Open your windows command line prompt(cmd.exe) or Git Bash.
  For Macos or Linux: Open your terminal.
- In the command line or Git Bash, navigate to your main project directory where the folder *c8y-docs*, as well as the files *Finding_unused_images.js*, and *Delete_unused_images.js* are located.
- To identify any unused images, run the following command:

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
- To verify, run the *Finding_unused_images.js* script again to confirm that the unused images have been successfully removed. This will update the *unused_images.csv* file, allowing you to see the updated list of unused images after deletion.
