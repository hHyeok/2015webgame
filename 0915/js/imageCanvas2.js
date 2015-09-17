window.addEventListener("load", drawScreen, true);

function drawScreen() {
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	var gradient = Context.createLinearGradient(0, 0, 170, 0);
	gradient.addColorStop("0", "magenta");
	gradient.addColorStop("0.5", "blue");
	gradient.addColorStop("1.0", "red");

	//Fill with gradient
	Context.strokeStyle = gradient;
	Context.lineWidth = 5;
	Context.strokeRect(5, 5, 160, 100);
}