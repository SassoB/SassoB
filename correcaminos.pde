class Cor {
  float ax, ay, as;
  int ancho, alto;
  Cor(float ax, float ay, int ancho, int alto) {
    this.ax = ax;
    this.ay = ay;
    this.ancho = ancho;
    this.alto = alto;
  }
  void dibujarCor() {
    fill(200, 130, 20);
    rect(ax, ay, ancho, alto);
    ax=ax-as;
    ax-=15;
    
    if(ax<0-ancho){
    ax=width+200;
    as+=0.6;
    }  
  }
}
