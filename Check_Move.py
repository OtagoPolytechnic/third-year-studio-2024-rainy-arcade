import time
import os
import shutil
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class DirectoryMonitor:
    SOURCE_DIRECTORY = "./file-upload/uploads"
    DESTINATION_DIRECTORY = "move"
    ESRB_RATINGS = ['E', 'E10+', 'T', 'M', 'AO']

    def __init__(self):
        self.observer = Observer()
        self.create_esrb_directories()
        print("Instructions: Ensure the game name in the .txt file matches the name of the .exe file.")

    def create_esrb_directories(self):
        """Creates directories for each ESRB rating if they don't exist."""
        for rating in self.ESRB_RATINGS:
            dir_path = os.path.join(self.DESTINATION_DIRECTORY, rating)
            os.makedirs(dir_path, exist_ok=True)

    def start(self):
        event_handler = FileCreatedHandler()
        self.observer.schedule(event_handler, self.SOURCE_DIRECTORY, recursive=True)
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
        if not event.is_directory:
            return None

        dir_path = event.src_path
        print(f"Detected new directory: {dir_path}")

        FileCreatedHandler.check_and_move_folder(dir_path)

    @staticmethod
    def check_and_move_folder(dir_path, attempts=4):
        """Check for at least 3 files in the directory, wait if not enough, and move the folder."""
        for attempt in range(attempts):
            files_in_dir = os.listdir(dir_path)
            print(f"Attempt {attempt + 1}: Files in directory: {files_in_dir}")

            if len(files_in_dir) >= 3:
                time.sleep(5)  # Wait for 5 seconds to ensure files are stable
                txt_file_path = next(f for f in files_in_dir if f.endswith('.txt'))
                txt_file_full_path = os.path.join(dir_path, txt_file_path)
                game_name, esrb_rating = FileCreatedHandler.extract_game_details(txt_file_full_path)
                print(f"Extracted game name: {game_name}, ESRB rating: {esrb_rating}")

                if game_name and esrb_rating:
                    FileCreatedHandler.move_folder(dir_path, game_name, esrb_rating)
                    return
                else:
                    print("Game name or ESRB rating not found in the .txt file.")
                    return
            else:
                print("Not enough files, waiting for 10 seconds...")
                time.sleep(10)
        
        print("Not all files uploaded after 4 attempts.")

    @staticmethod
    def extract_game_details(file_path):
        """Extracts game name and ESRB rating from the given txt file."""
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
    def move_folder(dir_path, game_name, esrb_rating):
        """Move the entire folder to the corresponding ESRB rating folder."""
        destination_folder = os.path.join(DirectoryMonitor.DESTINATION_DIRECTORY, esrb_rating, game_name)
        shutil.move(dir_path, destination_folder)
        print(f"Moved folder {dir_path} to {destination_folder}")

if __name__ == '__main__':
    monitor = DirectoryMonitor()
    monitor.start()
