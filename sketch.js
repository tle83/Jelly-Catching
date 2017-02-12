var guy = [];
var count = 10;
var jellyCount = 10;
var timer = 3;
var seconds;
var startTime;
var menuScreen = true;
var gameOverScreen = false;
var playScreen = false;
var aboutScreen = false;
var c;

function preload(){
	for (var i = 0; i < count; i++){
		guy[i] = new Walker("Jelly.png", random(40, 640), random(480), random([-1, +1]));
	}
}

function setup() {
	createCanvas(720, 480);
	imageMode(CENTER);

	startTime = millis()/1000 + timer;

	c = color(155, 0, 155);
}

function draw(){
	//menu screen will always come first
	if(menuScreen){
		background(c);

		//title
		textSize(40);
		fill(255);
		text("Jellyfish Catching", 720/8, 100);	

		//buttons
		stroke(255);
		fill(235, 154, 89);
		rect(720/1.5, 160, 150, 50);
		rect(720/1.5, 260, 150, 50)

		fill(255);
		text("Play", 720/1.39, 200);
		text("About", 720/1.43, 300);

	}

	//if play button is pressed, load play screen
	if(playScreen){
		background(0, 255, 255);

		for (var i = 0; i < count; i++){
			guy[i].draw();
		}

		//number of bugs displayed on screen in the upper left corner
		stroke(255);
		strokeWeight(4);
		textSize(20);
		fill(0);
		text("Jellies: " + jellyCount, 10, 20);

		//Timer counter displayed under the bug counter
		stroke(255);
		strokeWeight(4);
		textSize(20);
		fill(0);

		seconds = startTime - millis()/1000;
		if(seconds < 0){
			//once the timer runs out, the game over screen will appear
			gameOverScreen = true;
		}
		else{
			text("Timer:  " + round(seconds), 10, 40);
		}
	
	}

	//load game over screen immediately after timer runs out
	if(gameOverScreen){
		background(0, 255, 255);
		textSize(50);
		text("Game Over", 720/3, 480/2);

		//back to menu screen button
		noStroke();
		textSize(30);
		fill(235, 154, 89);
		rect(720/2.52, 300, 150, 50);
		fill(255);
		text("Menu", 720/2.2, 330);
	}

	//if about button is pressed, load how to play screen
	if(aboutScreen == true){
		background(0, 0, 255);

		text("How to play", 720/8, 100);
		textSize(20);		
		text("These Jellyfish accidentally washed up by the shore! \n Help catch them inside jars to release in open water!\n Click on each jellyfish to trap inside a jar.",
		720/8, 200);

	}
}

function mousePressed(){
	for(var i = 0; i < count; i++){
		guy[i].grab(mouseX, mouseY);
		//guy[i].squish(mouseX, mouseY);
	}
	if((mouseX >= 720/1.5) && (mouseX <= 720/1.5 + 150) &&
		(mouseY >= 160) && (mouseY <= 160 + 50)){
			playScreen = true;
	}
	else if((mouseX >= 720/1.5) && (mouseX <= 720/1.5 + 150) &&
		(mouseY >= 260) && (mouseY <= 260 + 50)){
			aboutScreen = true;
		}
}

function mouseReleased(){
	for(var i = 0; i < count; i++){
		guy[i].drop();
	}
}

function mouseDragged(){
	for(var i = 0; i < count; i++){
		guy[i].drag(mouseX, mouseY);
	}
}

//define an object
//when defining an object, capitalize the name
//this function is called when creating
//a new walking person
function Walker(imageName, x, y, moving){
	this.spritesheet = loadImage(imageName);
	this.frame = 0;
	this.x = x;
	this.y = y;
	this.moving = moving;
	this.facing = moving;

	this.draw = function(){
		push();

		translate(this.x, this.y);

		if(this.facing < 0){
			scale(-1.0, 1.0);
		}

		if(this.moving == 0){
			image(this.spritesheet, 0, 0, 80, 80, 0, 0, 80, 80);
		}
		else{
			if(this.frame == 0)
				image(this.spritesheet, 0, 0, 80, 80, 80, 0, 80, 80);
			if(this.frame == 1)
				image(this.spritesheet, 0, 0, 80, 80, 160, 0, 80, 80);
			if(this.frame == 2)
				image(this.spritesheet, 0, 0, 80, 80, 240, 0, 80, 80);
			if(this.frame == 3)
				image(this.spritesheet, 0, 0, 80, 80, 320, 0, 80, 80);
			if(this.frame == 4)
				image(this.spritesheet, 0, 0, 80, 80, 400, 0, 80, 80);
			if(this.frame == 5)
				image(this.spritesheet, 0, 0, 80, 80, 480, 0, 80, 80);
			if(this.frame == 6)
				image(this.spritesheet, 0, 0, 80, 80, 560, 0, 80, 80);
			if(this.frame == 7)
				image(this.spritesheet, 0, 0, 80, 80, 640, 0, 80, 80);
			if(frameCount % 8 == 0){
				this.frame = (this.frame + 1) % 7;
				this.x = this.x + 6 * this.moving;
				if(this.x < 40 || this.x > width - 40){
					this.moving = -this.moving;
					this.facing = -this.facing;
				}
			}
		}

		pop();

	}

	this.grab = function(x, y){
		if(this.x - 40 < x && x < this.x + 40 &&
			this.y - 40 < y && y < this.y + 40){
			this.stop();
			this.mouseX = x;
			this.mouseY = y;
			this.initialX = this.x;
			this.initialY = this.y;
		}
	}

	this.drag = function(x, y){
		if(this.moving == 0){
			this.x = (x - this.mouseX) + this.initialX;
			this.y = (y - this.mouseY) + this.initialY;
		}
	}

	this.drop = function(){
		this.go(this.facing);
	}

	this.stop = function(){
		this.moving = 0;
		this.frame = 3;
	}

	this.go = function(direction){
		this.moving = direction;
		this.facing = direction;
	}

	this.squish = function(x,y){
		if(this.x - 40 < x && x < this.x + 40 &&
		this.y - 40 < y && y < this.y + 40){
			this.stop();
			this.mouseX = x;
			this.mouseY = y;
			
		}
	}
}

