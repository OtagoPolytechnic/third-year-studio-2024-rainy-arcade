#include <Keyboard.h>
#include <SPI.h>
#include <MFRC522.h>
#define SS_PIN 10
#define RST_PIN 5
#define KEY_RETURN 0xB0                 //The hex value for the return key is 0xB0.
 
MFRC522 mfrc522 ( SS_PIN, RST_PIN ) ;
char Enter = KEY_RETURN;                //Return key is declared as Enter.
String readid;
String card1=" 43 A5 F8 F6";                //Change this value to the UID of your card.
 
void setup( ) 
{
 Serial.begin(9600);
 Keyboard.begin();
 SPI.begin();
 mfrc522.PCD_Init();
}

void temp(byte *buffer, byte bufferSize)//function to store card uid as a string datatype.
{
  readid="";
  for(byte i = 0;i<bufferSize; i++)
  {
    readid=readid+String(buffer[i], HEX);
  }
}
void loop( ) 
{
 if(!mfrc522.PICC_IsNewCardPresent())
 {
  return;
 }
 if(!mfrc522.PICC_ReadCardSerial()) 
 {
  return;
 }
 mfrc522.PICC_DumpToSerial(&(mfrc522.uid));  // Display card details in serial Monitor.
 temp(mfrc522.uid.uidByte, mfrc522.uid.size);
 if(readid==card1)
 { 
  Keyboard.press(KEY_LEFT_GUI);              //Press the left windows key.
  Keyboard.press('l');                       //Press the "l" key.
  Keyboard.releaseAll();                     //Release all keys.
  delay (100);
  Keyboard.press(Enter);                     //Press the Enter key.
  Keyboard.release(Enter);                   //Release the Enter key.
  delay(100);
  Keyboard.print("23990");                    // Change this value to your Windows PIN/Password.
  Keyboard.releaseAll();
  delay(100);
  Keyboard.press(Enter);
  Keyboard.releaseAll();
 }
 else
 {
  return;
 } 
}
