
let monitor = false;

let vol = 0.0;
let mic;
let pitch;
let audioContext;
let elColor = 0.0;
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let gestorVol;
let gestorPitch;
let caminante;
let haySonido = false;
let antesHabiaSonido = false;

//--------------------------------------------------------------------
function setup() {
	createCanvas( windowWidth, windowHeight );

	gestorVol = new GestorSenial( 0.01 , 0.12 );
	gestorPitch = new GestorSenial( 20 , 90 );
	gestorPitch.dibujarDerivada = true;

	audioContext = getAudioContext();
	mic = new p5.AudioIn();
  	mic.start( startPitch );

  	caminante = new Caminante();
  	background(255);

}
//--------------------------------------------------------------------
function draw() {
	//background( frameCount % 256 );
	vol = mic.getLevel();

	gestorVol.actualizar( vol );

	haySonido = gestorVol.filtrada>0.02;
	let iniciaSonido = haySonido && !antesHabiaSonido;

	push();
	//console.log( vol );
	noStroke();

	colorMode( HSB , 255 , 255 , 255 );
	elColor = color( ( gestorPitch.filtrada * 512 ) % 255 , 255 , 255 );
	fill( elColor );


	//ellipse( mouseX, mouseY, gestorVol.filtrada*500 );

	if( iniciaSonido ){
		caminante.saltar();
	}

	if( haySonido ){
		//console.log( gestorVol.filtrada );
		caminante.actualizar( gestorVol.filtrada , gestorPitch.filtrada , gestorPitch.derivada );
		caminante.mover();
		caminante.dibujar();
	}
	pop();

	if( monitor ){
		gestorVol.dibujar( 100 , 100 );
		gestorPitch.dibujar( 100 , 300 );
	}

	antesHabiaSonido = haySonido;
}
//--------------------------------------------------------------------
function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
}
//--------------------------------------------------------------------
function startPitch() {
  	pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
}
//--------------------------------------------------------------------
function modelLoaded() {
  //select('#status').html('Model Loaded');
  getPitch();
  //console.log( "entro aca !" );
  
}
//--------------------------------------------------------------------
function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {    	
      let midiNum = freqToMidi(frequency);

      gestorPitch.actualizar( midiNum );

    }
    getPitch();
  })
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------


