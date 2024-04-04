#include <Adafruit_NeoMatrix.h>
#include <Adafruit_GFX.h>

#define NEOPIXEL_PIN 6 // D2 for NodeMCU
#define NCOLUMNS 45    // number of pixel columns
#define NHEIGHT 8      // number of pixel height
#define CHAR_WIDTH 6   // font width

String readString;
String colorString;
String textString;

Adafruit_NeoMatrix matrix = Adafruit_NeoMatrix(NCOLUMNS, NHEIGHT, NEOPIXEL_PIN,
                                               NEO_MATRIX_TOP + NEO_MATRIX_LEFT + NEO_MATRIX_ROWS +
                                                   NEO_MATRIX_ZIGZAG,
                                               NEO_GRB + NEO_KHZ800);

byte red = 255;
byte green = 255;
byte blue = 255;

// ============================== setup ============================================

void setup()
{
  Serial.begin(115200);
  Serial.setTimeout(500);

  Neopixel_Initial();
}

// =============== Loop ======================

void loop()
{

  while (Serial.available() > 0)
  {
    String IncomingData = Serial.readString();
    if (IncomingData.charAt(0) == 'T')
    {
      textString = IncomingData.substring(1, IncomingData.length());
      Send_Text(textString, red, green, blue);
    }
    else if (IncomingData.charAt(0) == 'C' && IncomingData.charAt(1) == '#')
    {
      colorString = IncomingData.substring(2, IncomingData.length());
      hexToRGB(colorString, red, green, blue);
    }
  }
}

// ============== Send Text =================

void Send_Text(String inputstr, byte red, byte green, byte blue)
{

  Neomatrix_random_color();
  Neomatrix_scrolltext(inputstr, red, green, blue);
}


// ================== Convert HEX to RGB ========================

void hexToRGB(String hex, byte &r, byte &g, byte &b)
{
  // Remove '#' if present
  hex.replace("#", "");

  // Parse hexadecimal values for red, green, and blue
  long value = strtol(hex.c_str(), NULL, 16);

  r = (value >> 16) & 0xFF;
  g = (value >> 8) & 0xFF;
  b = value & 0xFF;
}
