var guy = [];
var count = 15;
var timer = 30;
var seconds, startTime;
var menuScreen = false;
var gameOverScreen = false;
var playScreen = false;
var aboutScreen = false;
var clickJelly, menuJelly, captureJelly, arrow, jellyCount, jellyCountLeft, speed;

function preload(){
	for (var i = 0; i < count; i++){
		guy[i] = new Walker("images/Jelly.png", random(40, 720), random(480), random([-1, +1]));
	}
	clickJelly = loadImage("images/clickJelly.png");
	menuJelly = loadImage("images/menuJelly.png");
	arrow = loadImage("images/arrow.png");
	captureJelly = loadImage("images/captureJelly.png");
}

function setup() {
	createCanvas(720, 480);
	imageMode(CENTER);

	startTime = millis()/1000 + timer;

	jellyCount = 0;
	jellyCountLeft = count;
	speed = 6;

	menuScreen = true;
}

function draw(){
	//menu screen will always appear first
	if(menuScreen){
		background(76, 155, 210);
		image(menuJelly, 720/3, 250, 360, 360);

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

	//if about button is pressed, load how to play screen
	if(aboutScreen == true){
		background(30, 155, 210);
		//background(c);

		text("How to play", 720/8, 70);
		textSize(20);		
		text("These Jellyfish accidentally washed up by the shore. \nHelp catch them inside jars to release them back in open water!",
		720/8, 100);

		image(clickJelly, 720/4, 320, 128, 128);
		image(arrow, 720/2, 320, 288/3, 288/3);
		image(captureJelly, 720/1.3, 320, 160, 80, 320, 0, 160, 80);

		text("Click on a jellyfish to catch them.\nThey will try to move away faster with every catch.", 
		720/8, 220);

		triangle(30, 425, 58, 395, 58, 450);
		text("Refresh to go \nback to Menu", 70, 418);
	}

	//if play button is pressed, load play screen
	if(playScreen){
		
		background(0, 221, 255);

		for (var i = 0; i < count; i++){
			guy[i].draw();
		}
		seconds = startTime - millis()/1000;
		
		//number of bugs displayed on screen in the upper left corner
		stroke(255);
		strokeWeight(4);
		textSize(20);
		fill(0);
		text("Jellyfish left: " + jellyCountLeft, 10, 20);

		//Timer counter displayed under the bug counter
		stroke(255);
		strokeWeight(4);
		textSize(20);
		fill(0);

		if(seconds < 0 || count == 0){
			//once the timer runs out, the game over screen will appear
			gameOverScreen = true;
		}
		else{
			text("Timer:  " + round(seconds), 10, 40);
		}
	
	}

	//load game over screen immediately after timer runs out
	if(gameOverScreen || jellyCountLeft <= 0){
		background(76, 155, 210);
		textSize(50);
		text("Game Over", 720/3, 480/3);

		strokeWeight(1);
		textSize(30);
		fill(255);
		text("You've captured: " + jellyCount + " Jellyfish", 720/3.7, 480/2);

		textSize(20);
		triangle(30, 425, 58, 395, 58, 450);
		text("Refresh to go \nback to Menu", 70, 418);

	}

}

function mousePressed(){
	for(var i = 0; i < count; i++){
		guy[i].grab(mouseX, mouseY);
	}
	if((mouseX >= 720/1.5) && (mouseX <= 720/1.5 + 150) &&
		(mouseY >= 160) && (mouseY <= 160 + 50)){
			playScreen = true;
			startTime = millis()/1000 + timer;
	}
	else if((playScreen == false) && ((mouseX >= 720/1.5) && (mouseX <= 720/1.5 + 150) &&
		(mouseY >= 260) && (mouseY <= 260 + 50))){
			aboutScreen = true;
	}
	else if((gameOverScreen == true) && ((mouseX >= 720/2.52) && (mouseX <= 720/2.52 + 150) && 
		(mouseY >= 300) && (mouseY <= 300 + 50))){
			menuScreen = true;
	}
	else if((aboutScreen == true) && (mouseX >= 30) && (mouseX <= 58) &&
		(mouseY >= 395) && (mouseY <= 450)){
			menuScreen = true;
	}
}

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
			image(captureJelly, 0, 0, 160, 80, 320, 0, 160, 80);		
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
			if(frameCount % 6 == 0){
				this.frame = (this.frame + 1) % 6;
				//this line determines the speed of the frames
				this.x = this.x + speed * this.moving;
				if(this.x < 40 || this.x > width - 40){
					this.moving = -this.moving;
					this.facing = -this.facing;
				}
			}
		}

		pop();

	}

	this.grab = function(x, y){
		if(this.x - 20 < x && x < this.x + 20 &&
			this.y - 20 < y && y < this.y + 20){
			this.stop();
			this.mouseX = x;
			this.mouseY = y;
			this.initialX = this.x;
			this.initialY = this.y;
			speed += 3;
			jellyCount += 1;
			jellyCountLeft -= 1;
		}
	}

	this.stop = function(){
		this.moving = 0;
	}

	this.go = function(direction){
		this.moving = direction;
		this.facing = direction;
	}
}

