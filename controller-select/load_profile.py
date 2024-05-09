import subprocess
import time

# Define paths
antimicrox_path = r"C:\Program Files\AntiMicroX\bin\antimicrox.exe"
mouse_profile_path = r"mouse.gamecontroller.amgp"
keyboard1_profile_path = r"keyboard1.gamecontroller.amgp"
keyboard2_profile_path = r"keyboard2.gamecontroller.amgp"

def load_profile(input_device):
    if input_device.lower() == "mouse":
        command2 = [antimicrox_path, "--hidden"]
        command = [antimicrox_path, "--tray", "--profile", mouse_profile_path]
    elif input_device.lower() == "keyboard":
        # Load keyboard1 profile onto joystick 1 and keyboard2 profile onto joystick 2
        command = [antimicrox_path, "--tray", "--profile", keyboard1_profile_path, "--profile-controller", "1"]
        command2 =  [antimicrox_path, "--hidden", "--profile", keyboard2_profile_path, "--profile-controller", "2"]
    else:
        print("Invalid input device. Please choose 'Mouse' or 'Keyboard'.")
        return
    try:        
        subprocess.Popen(command2)
        time.sleep(2)
        # Terminate the first instance of AntiMicroX
        kill_antimicrox()
        subprocess.run(command, check=True)
    except Exception as e:
        print(f"Error executing command: {e}")

def kill_antimicrox():
    # Command to kill AntiMicroX process
    subprocess.run(["taskkill", "/f", "/im", "antimicrox.exe"])

selected_input = input("Enter input device (Mouse/Keyboard): ")
load_profile(selected_input)