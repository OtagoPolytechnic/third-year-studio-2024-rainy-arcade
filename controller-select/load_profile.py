import subprocess
import time

# Define paths
antimicrox_path = r"C:\Program Files\AntiMicroX\bin\antimicrox.exe"
mouse_profile_path = r"mouse.gamecontroller.amgp"
keyboard1_profile_path = r"keyboard1.gamecontroller.amgp"
keyboard2_profile_path = r"keyboard2.gamecontroller.amgp"

def load_profile(input_device):
    if input_device.lower() == "mouse":
        mouseCommand = [antimicrox_path, "--hidden", "--profile", mouse_profile_path]
        try:        
            subprocess.run(mouseCommand, check=True)
        except Exception as e:
            print(f"Error executing command: {e}")
    elif input_device.lower() == "keyboard":
        # Load keyboard1 profile onto joystick 1 and keyboard2 profile onto joystick 2
        command = [antimicrox_path, "--unload", "1", "--hidden"]
        command1 = [antimicrox_path, "--profile-controller", "1", "--profile", keyboard1_profile_path]
        command2 = [antimicrox_path, "--unload", "2"]
        command3 = [antimicrox_path, "--hidden", "--profile-controller", "2", "--profile", keyboard2_profile_path]
        try:        
            subprocess.Popen(command)
            time.sleep(3)
            subprocess.Popen(command1)
            time.sleep(3)
            subprocess.Popen(command2)            
            # Terminate the first instance of AntiMicroX
            kill_antimicrox()
            time.sleep(3)
            subprocess.Popen(command3)
        except Exception as e:
            print(f"Error executing command: {e}")
    else:
        print("Invalid input device. Please choose 'Mouse' or 'Keyboard'.")
        return

def kill_antimicrox():
    # Command to kill AntiMicroX process
    subprocess.run(["taskkill", "/f", "/im", "antimicrox.exe"])

selected_input = input("Enter input device (Mouse/Keyboard): ")
load_profile(selected_input)