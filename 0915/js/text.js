window.addEventListener("load", drawScreen, false);
window.addEventListener("keydown", onkeydown, false);
window.addEventListener("keyup", onkeyup, false);

var imgBackground = new Image();
imgBackground.src = "../image/background.png";

var strKeyEventType = "맞춰봥";
var strKeyEventValue = "뭘까용?";

function onkeydown(e) {
	strKeyEventType = e.type;
	if(e.keyCode) code = e.keyCode;
	strKeyEventValue = code;
	drawScreen();
}

function drawScreen() {
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	Context.drawImage(imgBackground, 0, 0, 1000, 700);
	Context.fillStyle = "#4ee";
	Context.font = '24px nanumgothic';
	Context.textBaseline = "top";
	Context.fillText("입력된 키는 : " + strKeyEventValue, 5, 5);
	Context.fillText("키 입력상태는 : " + strKeyEventType, 5, 30);
}

