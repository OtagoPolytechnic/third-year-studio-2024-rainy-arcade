import time
import os
import shutil
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class DirectoryMonitor:
    SOURCE_DIRECTORY = "./file-upload/upload"
    DESTINATION_DIRECTORY = "move"

    def __init__(self):
        self.observer = Observer()

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

        FileCreatedHandler.wait_until_file_is_ready(file_path)
        FileCreatedHandler.copy_and_delete_file(file_path)

    @staticmethod
    def wait_until_file_is_ready(file_path, check_interval=1, retries=300):
        """Wait until the file is fully written to disk"""
        previous_size = -1
        for _ in range(retries):
            time.sleep(check_interval)
            current_size = os.path.getsize(file_path)
            if current_size == previous_size:
                return
            previous_size = current_size
        raise Exception(f"File {file_path} is still being written to after {retries} checks.")

    @staticmethod
    def copy_and_delete_file(file_path):
        
        destination_path = os.path.join(DirectoryMonitor.DESTINATION_DIRECTORY, os.path.basename(file_path))
        shutil.copy(file_path, destination_path)
        print(f"Copied {file_path} to {destination_path}")
        
        

        os.remove(file_path)
        print(f"Deleted {file_path}")


if __name__ == '__main__':
    monitor = DirectoryMonitor()
    monitor.start()
