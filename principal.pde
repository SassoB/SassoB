class Principal {
  Fondo fondito;
  Skate s;
  Cor c;
  Principal() {
    fondito = new Fondo();
    s= new Skate(100, 450, 50, 65);
    c = new Cor(width+200,height-50, 50,50);
  }
  void display() {

    fondito.dibujarFondo();
    s.dibujarSkate();
    c.dibujarCor();
  }
  //void mueveSkate(int presionada) {
   // s.moverSkate(presionada);
 // }
}
