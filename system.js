//L System Rule function example
var sketch = function(p){
  var phrase = "F"; //Input pattern
  var gens = 0; //Number of times the code has run
  var drawn = false;

  var vars = {lineColor:[ 255, 50, 0 ], bgColor:[ 25, 25, 25],  angle:1.1, len:15, alpha:50};

  p.setVars = function(_v){
    vars = _v;
    console.log(vars);
  }

  p.setup = function() {
  	//This line makes the canvas for processing to draw on the size of the window
  	p.createCanvas(window.innerWidth-1, window.innerHeight-1); 
  	p.background(50); //sets the background color for the app
  	p.smooth(); //draws geometry with anti-aliased edges
  	console.log("Hello World"); //console.log("MESSAGE"); prints a message

    //vars.angle = p.PI / 3;
    console.log("Seed: " + phrase +" at " + vars.angle + " radians.");
    for(var i = 0; i < 4; i++){
      phrase = p.generatePhrase(phrase);
    }
  };

  p.draw = function(){
    if(drawn == false){
    	p.background(vars.bgColor[0], vars.bgColor[1], vars.bgColor[2]); //sets the background color for the app
      p.stroke(vars.lineColor[0], vars.lineColor[1], vars.lineColor[2], vars.alpha) //Cool fade effect
    	p.push(); //Prepare to draw in an isolated space
      p.translate(window.innerWidth/2-25, 0);  //move where we are going to draw
      p.drawPhrase(phrase); //draw
      p.pop();  //reset our draw location
      drawn = false;
    }
  };

  p.windowResized = function() {
    p.resizeCanvas(window.innerWidth-1, window.innerHeight-1); //This changes the size of the canvas with the window
    p.background(50); //sets the background color for the app
    p.push(); //Prepare to draw in an isolated space
    p.translate(window.innerWidth/2, 0);  //move where we are going to draw
    //drawPhrase(phrase); //draw
    drawn = false;
    p.pop();  //reset our draw location
  };

  //If a key is pressed, reset our phrase
  p.keyPressed = function(){
    phrase = "F"
  };

  //This will handle making a large string for us to later parse
  p.generatePhrase = function(s) {
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
  };

  //Lets parse our phrase, and use each character as a command
  p.drawPhrase = function(s) {
    for (var i = 0; i < s.length; i++) {
      var c = s.charAt(i); //grab a character
      
      switch(c) {
        case 'F':
          p.line(0, 0, 0, vars.len); 
          p.translate(0, vars.len);
          break;

        case 'X':
          p.translate(0, vars.len);
          break;

        case '[':
          p.push();
          break;

        case ']':
          p.pop(); 
          break;

        case '+':
          p.rotate(vars.angle);
          break;

        case '-':
          p.rotate(-vars.angle);
          break;
        }
    }
  };

  p.mousePressed = function() { //Every time you click, run the code
    //phrase = p.generatePhrase(phrase); //set the input phrase to equal the value returned
    //console.log("Generation " + gens + ": " + phrase); // print the generation number and resulting phrase
  };
};