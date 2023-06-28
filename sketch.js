//------CLASIFICADOR-----
let classifier;
const options = { probabilityThreshold: 0.7 };
let label;
let etiqueta;
const classModel = 'https://teachablemachine.withgoogle.com/models/QCHnyUA0S/'; //url del modelo producido con Teachable Machine

//---SONIDO CONFIG------------------------------------------------------------------------------------------------
let AMP_MAX= 0.1;
let AMP_MIN= 0.01;
let IMPRIMIR = false;

//ENTRADA DE AUDIO
let mic;

//AMPLITUD
let amp;
let haySonido = false;

//...............................CONFIG GENERAL...............................
let puntos = [];
let cantidad = 1000;

let imagen;
let foto;
let foto1;
let foto2;
let foto3;
let foto4;

let triangulos = [];
let cantTri = 12;

let imagenesGeneradas = false;
let imagenesFijas = [];
let cantPng = 1;

let posicionesPredeterminadas = [
  [400, 100, 900],
  [0, 0, 355],
  [0, 400, 900],
  [400, 300, 900],
  [300, 0, 500],
  [800, 800, 400],
  [800, 0, 300],
  [310, 500, -100],
  [800, 100, 460],
  [460, 800, 90],
  [460, 500, 90],
  [460, 428, 900]
  
];

//..................................SETUP...................................................

function setup() {

  createCanvas(800, 800, WEBGL);
  
  classifier.classify(gotResult);
  mic = new p5.AudioIn();
  mic.start();
  userStartAudio();


  grafico = createGraphics(width, height);
  crearPuntos();
  crearTriangulos();
  carga();
}


//...............................DRAW......................................................

function draw() {

   //config sonido
   amp = mic.getLevel();
   haySonido = amp > AMP_MIN;


  grafico.image(imagen, 0, 0, 800, 800);
  

  //dibujar graficos 
  dibujarGrafico_Circulos();
  dibujarGrafico_LetrasChinas();
  dibujarGrafico_Lineales();
 
  translate(-width / 2, -height / 2);
  
  for (let i = 0; i < cantTri; i++) {
    
    triangulos[i].dibujar(grafico);
    
  }

}



//.............................TRIANGULOS........................................................

function crearTriangulos() {
  for (let i = 0; i < cantTri; i++) {
    let posiciones = posicionesPredeterminadas[i];
    let p1 = createVector(posiciones[0], posiciones[1]);
    let p2 = createVector(posiciones[0], posiciones[2]);
    let p3 = createVector(posiciones[2], posiciones[1]);
    triangulos[i] = new Triangulo([p1, p2, p3]);
  }
}

function crearPuntos() {
  for (let i = 0; i < cantidad; i++) {
    puntos[i] = createVector(width, height);
  }
}


//..............................IMAGENES.......................................................

function carga() {
  imagen = loadImage('img/gradiente.png');
  foto = loadImage('img/forma.png');
  foto1 = loadImage('img/circulo2.png');
  foto2 = loadImage('img/circulo.png');
  foto3 = loadImage('img/img.png');
  foto4 = loadImage('img/triangulo.png');
}

//..............CIRCULO..

function dibujarGrafico_Circulos() {

  if (label == 'silbido') {
    for (let i = 0; i < cantPng; i++) {
      const posX = random(-800, 800);
      const posY = random(-800, 800);
      const tam = random(10, 20);
      const imagen = random() > 0.5 ? foto1 : foto2;
      imagenesFijas.push({ x: posX, y: posY, tam: tam, imagen: imagen });
    }
 
  }

  for (let i = 0; i < imagenesFijas.length; i++) {
    const { x, y, tam, imagen } = imagenesFijas[i];
    grafico.image(imagen, x, y, tam, tam);
  }
}

//.............Letras chinas...

function dibujarGrafico_LetrasChinas() {

  if (label == 'shh') {
    for (let i = 0; i < cantPng; i++) {
      const posX = random(-800, 800);
      const posY = random(-800, 800);
      const tam = random(80, 90);
      const imagen =  foto4;
      imagenesFijas.push({ x: posX, y: posY, tam: tam, imagen: imagen });
    }
 
  }

  for (let i = 0; i < imagenesFijas.length; i++) {
    const { x, y, tam, imagen } = imagenesFijas[i];
    grafico.image(imagen, x, y, tam, tam);
  }
}

//.............otro...

function dibujarGrafico_Lineales() {

  if (label == 'aplauso') {
    for (let i = 0; i < cantPng; i++) {
      const posX = random(-800, 800);
      const posY = random(-800, 800);
      const tam = random(80, 90);
      const imagen = random() > 0.5 ? foto : foto3;
      imagenesFijas.push({ x: posX, y: posY, tam: tam, imagen: imagen });
    }
 
  }

  for (let i = 0; i < imagenesFijas.length; i++) {
    const { x, y, tam, imagen } = imagenesFijas[i];
    grafico.image(imagen, x, y, tam, tam);
  }
}

//--------CLASIFICADOR-------------------------------------------------------------------------------
function preload() {
  // Load SpeechCommands18w sound classifier model
  classifier = ml5.soundClassifier(classModel + 'model.json', options);
}

function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  //console.log(results);
  // Show the first label and confidence
  label = results[0].label;
  etiqueta = label;
}


