class Fondo {
  PImage f;

  Fondo() {
    f = loadImage("fondoo.jpg");
  }
  void dibujarFondo() {
    image(f, 0, 0, width, height );
  }
}
