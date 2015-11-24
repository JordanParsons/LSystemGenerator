//L System Rule function example
var phrase = "F"; //Input pattern
var gens = 0; //Number of times the code has run
var len = 10; //Length of line segments
var angle; //Angle to rotate

function setup() {
	//This line makes the canvas for processing to draw on the size of the window
	createCanvas(windowWidth, windowHeight); 
	background(50); //sets the background color for the app
	smooth(); //draws geometry with anti-aliased edges
	console.log("Hello World"); //console.log("MESSAGE"); prints a message

  angle = PI / 3;
  console.log("Seed: " + phrase +" at " + angle + " radians.");
}

function draw() {
	background(50); //sets the background color for the app
	stroke(255, 255, 255); //stroke(red, green, blue) sets the stroke color
  stroke(255, 255, 255, 50) //Cool fade effect
	push(); //Prepare to draw in an isolated space
  translate(windowWidth/2, 0);  //move where we are going to draw
  drawPhrase(phrase); //draw
  pop();  //reset our draw location
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); //This changes the size of the canvas with the window
  background(50); //sets the background color for the app
    push(); //Prepare to draw in an isolated space
  translate(windowWidth/2, 0);  //move where we are going to draw
  drawPhrase(phrase); //draw
  pop();  //reset our draw location
}

//If a key is pressed, reset our phrase
function keyPressed(){
  phrase = "F"
}

//This will handle making a large string for us to later parse
function generatePhrase(s) {
  var next = "";
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    //the switch statement lets us check a variable against a list of options
    switch(c) {
      case 'F':
        next += "FF-[-F+F+F]+[+F-F-F]";
        break;
      case 'X':
        next += "FF";
        break;
      case '[':
        next += "[";
        break;
      case ']':
        next += "]";
        break;
      case '+':
        next += "+";
        break;
      case '-':
        next += "-";
        break;
    }
  }
  s = next;
  gens++;
  
  return s;
}

//Lets parse our phrase, and use each character as a command
function drawPhrase(s) {
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i); //grab a character
    
    switch(c) {
      case 'F':
        line(0, 0, 0, len); 
        translate(0, len);
        break;

      case 'X':
        translate(0, len);
        break;

      case '[':
        push();
        break;

      case ']':
        pop(); 
        break;

      case '+':
        rotate(angle);
        break;

      case '-':
        rotate(-angle);
        break;
      }
  }
}

function mousePressed() { //Every time you click, run the code
  phrase = generatePhrase(phrase); //set the input phrase to equal the value returned
  console.log("Generation " + gens + ": " + phrase); // print the generation number and resulting phrase
}