# Steps for Finding and Deleting Unused Images

## 1. Navigate to the `c8y-docs` Folder:
- Open the `c8y-docs` folder, then locate the `scripts` folder. This is where the necessary scripts for finding and deleting unused images are stored.

## 2. Copy the Scripts:
- Copy the `Finding_unused_images.js` and `Delete_unused_images.js` scripts.
- Paste them under the `c8y-docs` folder.

## 3. Run the Script to Find Unused Images:
- Open the command prompt (or terminal).
- Navigate to your project directory using the command:

   ```
    cd your_filepath
    ```

    **Note:** Make sure you navigate to the folder where `c8y-docs`, `Finding_unused_images.js`, and `Delete_unused_images.js` are located.

- To identify unused images, run the following command:

    ```
    node Finding_unused_images.js
    ```

    **Note:** Ensure Nodejs is installed.

- After the script executes, a file named `unused_images.csv` will be generated. This file contains a list of all the unused images in the project.

## 4. Run the Script to Delete Unused Images:
- Open the command prompt and navigate to the `c8y-docs` folder:

    ```
    cd your_filepath
    ```

- Run the deletion script by executing:

    ```
    node Delete_unused_images.js
    ```

- The script will delete all the unused images listed in the `unused_images.csv` file.

## 5. Verification:
After deleting the unused images, you can run the `Finding_unused_images.js` script again to confirm that the unused images have been successfully removed. Running the script will update the `unused_images.csv` file, allowing you to see the updated list of unused images after deletion.
