var variables = function(){
  this.len = 15; //Length of line segments
  this.angle = 1.1; //Angle to rotate
  this.lineColor = [ 255, 50, 0];
  this.bgColor = [ 25, 25, 25];
  this.alpha = 50;
};

window.onload = function(){
	var myp5 = new p5(sketch);
	var vars = new variables();

	myp5.setVars(vars);

	var gui = new dat.GUI();
	var f1 = gui.addFolder('Variables');
	var f2 = gui.addFolder('Colors');
	f1.add(vars, 'angle', 0,5);
	f1.add(vars, 'len', 5,25);
	
	f2.addColor(vars, 'lineColor');
	f2.add(vars, 'alpha', 5,255);
	f2.addColor(vars, 'bgColor');
};
