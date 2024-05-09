import subprocess

# Define paths
antimicrox_path = r"C:\Program Files\AntiMicroX\bin\antimicrox.exe"
mouse_profile_path = r"mouse.gamecontroller.amgp"
keyboard1_profile_path = r"keyboard1.gamecontroller.amgp"
keyboard2_profile_path = r"keyboard2.gamecontroller.amgp"

def load_profile(input_device):
    if input_device.lower() == "mouse":
        command = [antimicrox_path, "--tray", "--profile", mouse_profile_path]
    elif input_device.lower() == "keyboard":
        #command = [antimicrox_path, "--tray","--profile", keyboard_profile_path]
        command_keyboard1 = [antimicrox_path, "--tray", "--profile", keyboard1_profile_path]
        command_keyboard2 = [antimicrox_path, "--tray", "--profile", keyboard2_profile_path]
    # Execute the commands using subprocess for both keyboard profiles
        try:
            subprocess.Popen(command_keyboard1, stderr=subprocess.PIPE, stdout=subprocess.PIPE, stdin=subprocess.PIPE, creationflags=subprocess.DETACHED_PROCESS)
            subprocess.Popen(command_keyboard2, stderr=subprocess.PIPE, stdout=subprocess.PIPE, stdin=subprocess.PIPE, creationflags=subprocess.DETACHED_PROCESS)
        except Exception as e:
            print(f"Error executing command: {e}")
        return
    else:
        print("Invalid input device. Please choose 'Mouse' or 'Keyboard'.")
        return

    # Execute the command using subprocess
    try:
        subprocess.run(command, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e}")
        
# Launch the command using subprocess.Popen()
    subprocess.Popen(command, stderr=subprocess.PIPE, stdout=subprocess.PIPE, stdin=subprocess.PIPE, creationflags=subprocess.DETACHED_PROCESS)

selected_input = input("Enter input device (Mouse/Keyboard): ")
load_profile(selected_input)