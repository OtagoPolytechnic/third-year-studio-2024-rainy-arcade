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

