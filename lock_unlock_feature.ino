#include <Keyboard.h>
#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 5
#define KEY_RETURN 0xB0  // The hex value for the return key is 0xB0.

MFRC522 mfrc522(SS_PIN, RST_PIN);
char Enter = KEY_RETURN;  // Return key is declared as Enter.
String readid;
String card1 = "3A3D9D9E";  // Change this value to the UID of your card.
bool screenLocked = false;

void setup() {
  Serial.begin(9600);
  Keyboard.begin();
  SPI.begin();
  mfrc522.PCD_Init();
  Serial.println("Setup complete. Scan your RFID tag.");
}

void temp(byte *buffer, byte bufferSize) {
  // Function to store card UID as a string datatype.
  readid = "";
  for (byte i = 0; i < bufferSize; i++) {
    readid = readid + String(buffer[i], HEX);
  }
  readid.toUpperCase(); // Ensure the UID is in uppercase
  Serial.print("Card UID: ");
  Serial.println(readid);
}

void lockScreen() {
  Serial.println("Card recognized. Locking screen.");
  Keyboard.press(KEY_LEFT_GUI);  // Press the left Windows key.
  Keyboard.press('l');           // Press the "l" key.
  Keyboard.releaseAll();         // Release all keys.
  screenLocked = true;
}

void unlockScreen() {
  Serial.println("Card recognized. Unlocking screen.");
  Keyboard.print("23990");       // Change this value to your Windows PIN/Password.
  Keyboard.press(Enter);         // Press the Enter key to submit the PIN/Password
  Keyboard.releaseAll();
  screenLocked = false;
}

void loop() {
  if (!mfrc522.PICC_IsNewCardPresent()) {
    return;
  }
  if (!mfrc522.PICC_ReadCardSerial()) {
    return;
  }
  mfrc522.PICC_DumpToSerial(&(mfrc522.uid));  // Display card details in serial monitor.
  temp(mfrc522.uid.uidByte, mfrc522.uid.size);
  if (readid == card1) {
    if (!screenLocked) {
      lockScreen();
    } else {
      unlockScreen();
    }
  } else {
    Serial.println("Unrecognized card.");
  }
}
