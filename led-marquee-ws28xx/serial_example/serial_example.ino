String temperature;
String gas;
String readString;

char IncomingData[13];


void setup() {
  Serial.begin(9600);
  Serial.setTimeout(500);
}

void loop() {
  while (Serial.available() > 0) {
    String IncomingData = Serial.readString();
    if (IncomingData.charAt(0) == 'T') {
      Serial.println("T");
      Serial.println(IncomingData.substring(1, IncomingData.length()));
    }
    else if (IncomingData.charAt(0) == 'C') {
      Serial.println("C");
      Serial.println(IncomingData.substring(1, IncomingData.length()));
    }
  }
}