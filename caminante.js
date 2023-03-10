
class Caminante{


	//--------------------------------------------------------------------

	constructor(){
		this.saltar();
		this.d = 50;		
		this.vel = 4;

	}
	//--------------------------------------------------------------------

	actualizar( intensidad , tono , derivada ){

		//console.log( derivada );

		this.dir += radians( derivada ) * 50;

		this.d = intensidad * 60;
		this.vel = this.d*0.25;
	}
	//--------------------------------------------------------------------

	dibujar(){

		ellipse( this.x , this.y , this.d , this.d );		
	}
	//--------------------------------------------------------------------

	mover(){

		//console.log( this.x + "   " + this.d ); 

		this.x = this.x + this.vel * cos( this.dir );
		this.y = this.y + this.vel * sin( this.dir );

		this.x = ( this.x > windowWidth ? this.x-windowWidth : this.x );
		this.x = ( this.x < 0 ? this.x+windowWidth : this.x );
		this.y = ( this.y > windowHeight ? this.y-windowHeight : this.y );
		this.y = ( this.y < 0 ? this.y+windowHeight : this.y );
	}
	//--------------------------------------------------------------------

	saltar(){

		//console.log( "saltos");

		this.x = random( windowWidth );
		this.y = random( windowHeight );
		this.dir = random( TWO_PI );
	}
	//--------------------------------------------------------------------
}