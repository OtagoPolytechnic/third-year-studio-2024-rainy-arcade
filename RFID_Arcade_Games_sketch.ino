#include <SPI.h>
#include <RFID.h>

#define SS_PIN 10
#define RST_PIN 9
#define GREEN_LED_PIN 4  // Set to the actual pin number for the green LED
#define RED_LED_PIN 5    // Set to the actual pin number for the red LED

RFID rfid(SS_PIN, RST_PIN);
String rfidCard;

// Array of correct RFID card serial numbers
String correctCardSerials[] = {"99 232 44 247", "147 83 28 31"}; // Example serials, add your own
int numberOfCorrectCards = sizeof(correctCardSerials) / sizeof(correctCardSerials[0]);

void setup() {
  Serial.begin(9600);
  Serial.println("Starting the RFID Reader...");
  SPI.begin();
  rfid.init();

  pinMode(GREEN_LED_PIN, OUTPUT);
  pinMode(RED_LED_PIN, OUTPUT);
}

bool isCardAuthorized(String cardSerial) {
  for (int i = 0; i < numberOfCorrectCards; i++) {
    if (cardSerial == correctCardSerials[i]) {
      return true;
    }
  }
  return false;
}

void loop() {
  if (rfid.isCard()) {
    if (rfid.readCardSerial()) {
      rfidCard = String(rfid.serNum[0]) + " " + String(rfid.serNum[1]) + " " + String(rfid.serNum[2]) + " " + String(rfid.serNum[3]);
      Serial.println(rfidCard);

      if (isCardAuthorized(rfidCard)) {
        digitalWrite(GREEN_LED_PIN, HIGH);
        digitalWrite(RED_LED_PIN, LOW);
        Serial.println("Access Granted");
      } else {
        digitalWrite(GREEN_LED_PIN, LOW);
        digitalWrite(RED_LED_PIN, HIGH);
        Serial.println("Access Denied");
      }
    }
    rfid.halt();
  } else {
    // Turn off both LEDs if no card is present
    digitalWrite(GREEN_LED_PIN, LOW);
    digitalWrite(RED_LED_PIN, LOW);
  }
}
