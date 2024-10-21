import os

def delete_unused_images_from_csv(csv_file):
    with open(csv_file, 'r') as file:
        unused_images = [line.strip() for line in file.readlines()]
    
    for image_path in unused_images:
        try:
            if os.path.exists(image_path):
                os.remove(image_path)
                print(f"Deleted: {image_path}")
            else:
                print(f"File not found: {image_path}")
        except Exception as e:
            print(f"Error deleting {image_path}: {e}")

csv_file = 'unused_images.csv'
delete_unused_images_from_csv(csv_file)
