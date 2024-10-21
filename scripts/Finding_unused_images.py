import os
import re

file_extensions_to_check = ['.html', '.css', '.js', '.md','.toml']  
image_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg'] 

# Function to collect a list of all images in the specified folder and its subfolders
def get_images_from_specific_path(image_folder, image_extensions):
    image_list = []
    for root, _, files in os.walk(image_folder):
        for file in files:
            if any(file.lower().endswith(ext) for ext in image_extensions):
                image_list.append(os.path.join(root, file))
    return image_list

# Function to collect a list of all files with the specified extensions in the project folder
def get_files_by_extension(project_folder, extensions):
    file_list = []
    for root, _, files in os.walk(project_folder):
        for file in files:
            if any(file.lower().endswith(ext) for ext in extensions):
                file_list.append(os.path.join(root, file))
    return file_list

# Function to find image references in the specified files
def find_ImageFiles(file_paths):
    image_references = set()
    image_regex = re.compile(r'["\'](.*?\.(?:png|jpg|jpeg|gif|svg))["\']|!\[.*?\]\((.*?\.(?:png|jpg|jpeg|gif|svg))\)')
    for file_path in file_paths:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
            content = file.read()
            matches = image_regex.findall(content)
            for match in matches:
                image_reference = match[0] if match[0] else match[1]
                if image_reference:
                    image_references.add(os.path.basename(image_reference))
    return image_references

# To write unused image paths to a CSV file
def write_to_csv(unused_imagespaths, output_file):
    with open(output_file, 'w') as file:
        for image_path in unused_imagespaths:
            file.write(f"{image_path}\n")

# To find and save unused images
def find_unused_images(image_folder, project_folder, output_csv, image_extensions):
    image_files = get_images_from_specific_path(image_folder, image_extensions)
    image_files_with_paths = {os.path.basename(image): image for image in image_files}
    project_files = get_files_by_extension(project_folder, file_extensions_to_check)
    referenced_images = find_ImageFiles(project_files)
    unused_images = set(image_files_with_paths.keys()) - referenced_images
    unused_images_with_paths = [image_files_with_paths[img] for img in unused_images]

    write_to_csv(unused_images_with_paths, output_csv)
    print(f"Unused images: {len(unused_images)}")
    print(f"Unused image paths from '{image_folder}' have been saved to: {output_csv}")

image_folder_path = 'c8y-docs\static\images'  
project_folder_path = 'c8y-docs'  
output_csv_file = 'unused_images.csv' 
 

find_unused_images(image_folder_path, project_folder_path, output_csv_file, image_extensions)
