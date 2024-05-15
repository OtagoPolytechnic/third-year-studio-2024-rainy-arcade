import time
import os
import shutil
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class DirectoryMonitor:
    SOURCE_DIRECTORY = "./file-upload/upload"
    DESTINATION_DIRECTORY = "move"
    ESRB_RATINGS = ['E', 'E10+', 'T', 'M', 'AO']  # Define ESRB ratings

    def __init__(self):
        self.observer = Observer()
        self.create_esrb_directories()  # Ensure ESRB directories are created on start

    def create_esrb_directories(self):
        """Creates directories for each ESRB rating if they don't exist."""
        for rating in self.ESRB_RATINGS:
            dir_path = os.path.join(self.DESTINATION_DIRECTORY, rating)
            os.makedirs(dir_path, exist_ok=True)

    def start(self):
        event_handler = FileCreatedHandler()
        self.observer.schedule(event_handler, self.SOURCE_DIRECTORY, recursive=False)
        self.observer.start()
        print(f"Monitoring {self.SOURCE_DIRECTORY} for new files...")
        try:
            while True:
                time.sleep(60)
        except KeyboardInterrupt:
            self.observer.stop()
            print("Stopped monitoring.")
        self.observer.join()

class FileCreatedHandler(FileSystemEventHandler):
    @staticmethod
    def on_created(event):
        if event.is_directory:
            return None

        file_path = event.src_path
        print(f"Detected new file: {file_path}")

        if file_path.endswith('.txt'):
            game_name, esrb_rating = FileCreatedHandler.extract_game_details(file_path)
            if game_name and esrb_rating:
                FileCreatedHandler.handle_related_files(game_name, esrb_rating, file_path)

    @staticmethod
    def extract_game_details(file_path):
        """Extracts game name and ESRB rating from the given txt file"""
        game_name = None
        esrb_rating = None
        with open(file_path, 'r') as file:
            for line in file:
                if line.startswith('Game Name:'):
                    game_name = line.split(': ')[1].strip()
                elif line.startswith('ESRB Rating:'):
                    esrb_rating = line.split(': ')[1].strip()
        return game_name, esrb_rating

    @staticmethod
    def handle_related_files(game_name, esrb_rating, txt_file_path):
        """Handle the renaming, moving of files and organizing them based on ESRB rating"""
        source_dir = os.path.dirname(txt_file_path)
        game_folder_path = os.path.join(DirectoryMonitor.DESTINATION_DIRECTORY, game_name)
        os.makedirs(game_folder_path, exist_ok=True)

        # Move and rename the txt file
        new_txt_path = os.path.join(game_folder_path, 'assets.txt')
        shutil.move(txt_file_path, new_txt_path)
        print(f"Moved and renamed txt file to {new_txt_path}")

        # Move other files to game folder
        for file_name in os.listdir(source_dir):
            if file_name != os.path.basename(new_txt_path):
                original_file_path = os.path.join(source_dir, file_name)
                new_file_path = os.path.join(game_folder_path, f"{game_name}{os.path.splitext(file_name)[1]}")
                shutil.move(original_file_path, new_file_path)
                print(f"Moved {original_file_path} to {new_file_path}")

        # Move the entire game folder to the corresponding ESRB rating folder
        esrb_folder_path = os.path.join(DirectoryMonitor.DESTINATION_DIRECTORY, esrb_rating)
        final_destination_path = os.path.join(esrb_folder_path, game_name)
        shutil.move(game_folder_path, final_destination_path)
        print(f"Moved game folder to {final_destination_path}")

if __name__ == '__main__':
    monitor = DirectoryMonitor()
    monitor.start()
