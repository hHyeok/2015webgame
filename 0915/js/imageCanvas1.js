window.addEventListener("load", drawScreen, true);

function drawScreen() {
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	/*Context.beginPath();
	Context.moveTo(100, 50);
	Context.lineTo(450, 150);
	Context.moveTo(350, 150);
	Context.lineTo(700, 50);
	Context.strokeStyle="#ff0";
	Context.stroke();*/

	Context.beginPath();
	Context.arc(400, 100, 100, 1*Math.PI, 2*Math.PI, true);
	Context.arc(400, 200, 100, 2*Math.PI, 1*Math.PI, true);
	//시작점(x, y), 반지름, 시작각도, 끝각도, 반시계방향
	Context.fillStyle="#ff0";
	Context.fill();

	Context.beginPath();
	Context.arc(360, 150, 10, 2*Math.PI, 4*Math.PI, true);
	Context.fillStyle="#000";
	Context.fill();

	Context.fillStyle = "#000000";
	Context.fillRect(0, 0, 313, 700);


}