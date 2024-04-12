#include <SPI.h>
#include <RFID.h>

#define SS_PIN 10
#define RST_PIN 9
#define GREEN_LED_PIN 4  
#define RED_LED_PIN 5    
#define BUZZER_PIN 6     

RFID rfid(SS_PIN, RST_PIN);
String rfidCard;

// Array of correct RFID card serial numbers
String correctCardSerials[] = {"99 232 44 247", "147 83 28 31"}; 
int numberOfCorrectCards = sizeof(correctCardSerials) / sizeof(correctCardSerials[0]);

enum State { LOCKED, UNLOCKED, DENIED };
State currentState = LOCKED;

unsigned long lastSwipeTime = 0;
const unsigned long timeoutDuration = 10000; // 10 seconds timeout

void setup() {
  Serial.begin(9600);
  Serial.println("Starting the RFID Reader...");
  SPI.begin();
  rfid.init();

  pinMode(GREEN_LED_PIN, OUTPUT);
  pinMode(RED_LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT); // Initialize the buzzer pin as an output

  // Initial state setup
  updateState(LOCKED);
}

bool isCardAuthorized(String cardSerial) {
  for (int i = 0; i < numberOfCorrectCards; i++) {
    if (cardSerial == correctCardSerials[i]) {
      return true;
    }
  }
  return false;
}

void updateState(State newState) {
  currentState = newState;
  switch (currentState) {
    case LOCKED:
      digitalWrite(GREEN_LED_PIN, LOW);
      digitalWrite(RED_LED_PIN, HIGH);
      Serial.println("System is locked.");
      break;
    case UNLOCKED:
      digitalWrite(GREEN_LED_PIN, HIGH);
      digitalWrite(RED_LED_PIN, LOW);
      grantedBeep(); // Sound the buzzer for an authorized card
      Serial.println("Access granted."); // Print "Access granted" to the serial monitor
      break;
    case DENIED:
      digitalWrite(GREEN_LED_PIN, LOW);
      deniedBeep(); // Sound the buzzer for a denied card
      Serial.println("Access denied."); // Print "Access denied" to the serial monitor
      // Flash the red LED for DENIED state
      for (int i = 0; i < 5; i++) {
        digitalWrite(RED_LED_PIN, HIGH);
        delay(200);
        digitalWrite(RED_LED_PIN, LOW);
        delay(200);
      }
      updateState(LOCKED); // After flashing, go back to LOCKED state
      break;
  }
}


void deniedBeep() {
  // Beep for 200 milliseconds
  tone(BUZZER_PIN, 1000); // Set frequency to 1000 Hz
  delay(200);
  noTone(BUZZER_PIN); // Stop the tone
}

void grantedBeep() {
  // A quick double beep for 50 milliseconds each
  tone(BUZZER_PIN, 2000); // Set frequency to 2000 Hz
  delay(50);
  noTone(BUZZER_PIN);
  delay(50);
  tone(BUZZER_PIN, 2000);
  delay(50);
  noTone(BUZZER_PIN);
}

void loop() {
  unsigned long currentTime = millis();

  if (rfid.isCard()) {
    if (rfid.readCardSerial()) {
      rfidCard = String(rfid.serNum[0]) + " " + String(rfid.serNum[1]) + " " + String(rfid.serNum[2]) + " " + String(rfid.serNum[3]);
      Serial.println(rfidCard);

      if (isCardAuthorized(rfidCard)) {
        updateState(UNLOCKED);
        lastSwipeTime = currentTime;
      } else {
        updateState(DENIED);
      }
    }
    rfid.halt();
  } else {
    // Check for timeout to revert to LOCKED state
    if (currentState == UNLOCKED && currentTime - lastSwipeTime >= timeoutDuration) {
      updateState(LOCKED);
    }
  }
}
