window.onload = function(){
	var myp5 = new p5(sketch);
	var gui = new dat.GUI();
	gui.add(myp5, 'angle', 0,5);
};