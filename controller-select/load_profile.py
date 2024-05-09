import subprocess

# Define paths
antimicrox_path = r"C:\Program Files\AntiMicroX\bin\antimicrox.exe"
mouse_profile_path = r"mouse.gamecontroller.amgp"
keyboard_profile_path = r"keyboard.gamecontroller.amgp"

def load_profile(input_device):
    if input_device.lower() == "mouse":
        command = [antimicrox_path, "--tray", "--profile", mouse_profile_path]
    elif input_device.lower() == "keyboard":
        command = [antimicrox_path, "--tray","--profile", keyboard_profile_path]
    else:
        print("Invalid input device. Please choose 'Mouse' or 'Keyboard'.")
        return

    # Execute the command using subprocess
    try:
        subprocess.run(command, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {e}")

selected_input = input("Enter input device (Mouse/Keyboard): ")
load_profile(selected_input)