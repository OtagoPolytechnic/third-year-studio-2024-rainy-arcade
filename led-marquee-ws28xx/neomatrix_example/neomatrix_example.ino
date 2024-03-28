#include <Adafruit_GFX.h>
#include <Adafruit_NeoMatrix.h>
#include <Adafruit_NeoPixel.h>

#define NEOPIXEL_PIN    6  // D2 for NodeMCU
#define NCOLUMNS        64 // number of pixel columns
#define NHEIGHT         8  // number of pixel height
#define CHAR_WIDTH      6  // font width

Adafruit_NeoMatrix matrix = Adafruit_NeoMatrix(NCOLUMNS, NHEIGHT, NEOPIXEL_PIN,
  NEO_MATRIX_TOP  + NEO_MATRIX_LEFT + NEO_MATRIX_COLUMNS + 
  NEO_MATRIX_ZIGZAG, NEO_GRB + NEO_KHZ800);

byte red_random = 0;
byte green_random = 0;
byte blue_random = 0;

// ============================== setup ============================================

void setup() {
  Serial.begin(9600);
  Serial.setTimeout(500);

  Serial.println("Booting");
  Serial.println("Ready");

  Neopixel_Initial();
  
}

// =============== Loop ======================
String Scroll_Text[1] = {"Happy Chinese New Year"};
void loop() {

  //Send_Text();
  Send_Text2("I");

  //Neomatrix_scrolltext_random_eachstep("Merry Christmas");

  
}

// ============== Send Text =================

void Send_Text() {
  byte r1,g1,b1, r2,g2,b2;
  
  for (int x=0 ; x < ((Scroll_Text[0].length()+Scroll_Text[1].length())*CHAR_WIDTH+NCOLUMNS); x++) {
     if ( (x % (CHAR_WIDTH*8)) == 0 ) {
        Neomatrix_random_color();
        r1 = red_random;
        g1 = green_random;
        b1 = blue_random;
        Neomatrix_random_color();
        r2 = red_random;
        g2 = green_random;
        b2 = blue_random;
     }
     
     matrix.fillScreen(0);

     Neomatrix_text(Scroll_Text[0], r1, g1, b1, -x+NCOLUMNS-1);
     Neomatrix_text(Scroll_Text[1], r2, g2, b2, -x+NCOLUMNS-1 + (Scroll_Text[0].length() + 3)*CHAR_WIDTH);
   
     matrix.show();
     delay(5);
  }
}

void Send_Text2(String inputstr) {
  Serial.println("Send_Text2");

  Neomatrix_random_color();
  Neomatrix_scrolltext(inputstr ,red_random, green_random, blue_random);
}