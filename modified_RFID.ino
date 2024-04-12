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


unsigned long lastSwipeTime = 0;
const unsigned long timeoutDuration = 10000; // 10 seconds timeout

void setup() {
  Serial.begin(9600);
  Serial.println("Starting the RFID Reader...");
  SPI.begin();
  rfid.init();

  pinMode(GREEN_LED_PIN, OUTPUT);
  pinMode(RED_LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT); 

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
      break;
    case UNLOCKED:
      digitalWrite(GREEN_LED_PIN, HIGH);
      digitalWrite(RED_LED_PIN, LOW);
      grantedBeep(); // Sound the buzzer for an authorized card
      break;
    case DENIED:
      digitalWrite(GREEN_LED_PIN, LOW);
      deniedBeep(); // Sound the buzzer for a denied card
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































