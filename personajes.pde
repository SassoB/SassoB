class Skate {
  float ax, ay;
  int ancho, alto;

  Skate(float ax, float ay, int ancho, int alto ) {
    this.ax = ax;
    this.ay = ay;
    this.ancho = ancho;
    this.alto = alto;
  }
  void dibujarSkate() {
    fill(200, 130, 20);
    rect(ax, ay, ancho, alto);
    if (ay==height-alto && mousePressed)
      ay=ay-200;
    else
      ay=ay+10;
    if (ay>=height-alto)
      ay=height-alto;
      if(ay<=height/2)
      ay=height/2;
  }
}
