window.addEventListener("load", drawScreen, false);
window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("mousedown", onMouseDown, false);
window.addEventListener("mouseup", onMouseUp, false);
window.addEventListener("keydown", onkeydown, false);

var imgBackground = new Image();
imgBackground.src = "../image/background.png";

var imgPlayer = new Image();
imgPlayer.src = "../image/player.png";

var ball = new Image();
ball.src = "../image/ball.png";

imgPlayer.addEventListener("load", drawScreen, false);

var S_READY = 0;
var S_GAME = 1;
var S_OVER = 2;

var GameState = S_READY;

var bMouseClicked = false;
var intMouseX = 480;
var intMouseY = 300;
var PosX = 480;
var PosY = 300;
var strMouseStatus = "준비중";

var intervalID;

var tempBall1 = { x: 0, y: 0, go_x: 1, go_y: 1};
var tempBall2 = { x: 980, y: 0, go_x: -1, go_y: 1};
var tempBall3 = { x: 980, y: 680, go_x: -1, go_y: -1};
var tempBall4 = { x: 0, y: 680, go_x: 1, go_y: -1};

t = setInterval(update, 1000/30);

function update()
{
	if(PosX != intMouseX) intMouseX += (PosX - intMouseX) / 10;
	if(PosY != intMouseY) intMouseY += (PosY - intMouseY) / 10;
	
	if(intervalID == true) MoveBall();

	drawScreen();
}

function drawScreen() {
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	Context.drawImage(imgBackground, 0, 0, 1000, 700);
	Context.fillStyle="#ff0";
	Context.drawImage(imgPlayer, intMouseX, intMouseY, 100, 100);
	Context.drawImage(ball, tempBall1.x, tempBall1.y, 15, 15);
	Context.drawImage(ball, tempBall2.x, tempBall2.y, 15, 15);
	Context.drawImage(ball, tempBall3.x, tempBall3.y, 15, 15);
	Context.drawImage(ball, tempBall4.x, tempBall4.y, 15, 15);
	Context.fillStyle = "#ff0";
	Context.font = '24px Arial';
	Context.textBaseline = "top";
	if( GameState == S_READY) Context.fillText("READY!", 470, 250);
	else if ( GameState == S_GAME) Context.fillText("GO!", 300, 200);
	else if ( GameState == S_OVER) Context.fillText("GAME OVER", 400, 300);
}

function onkeydown(e)
{
	if(e.keyCode == 13 && (GameState == S_READY || GameState == S_OVER))
	{
		GameState = S_GAME;
		onGameStart();
	}
	if(GameState == S_GAME)
	{
		switch(e.keyCode)
		{
			case 37 : if(intMouseX > 0) PosX -= 10; break;
			case 39 : if(intMouseX < 910) PosX += 10; break;
			case 38 : if(intMouseY > 0) PosY -= 10; break;
			case 40 : if(intMouseY < 570) PosY += 10; break;
		}
	}
	//drawScreen();
}

function onGameStart()
{
	intervalID = true;
}

function MoveBall()
{
	tempBall1.x += tempBall1.go_x * 5;
	tempBall1.y += tempBall1.go_y * 5;
	tempBall2.x += tempBall2.go_x * 5;
	tempBall2.y += tempBall2.go_y * 5;
	tempBall3.x += tempBall3.go_x * 5;
	tempBall3.y += tempBall3.go_y * 5;
	tempBall4.x += tempBall4.go_x * 5;
	tempBall4.y += tempBall4.go_y * 5;
	console.log(tempBall1.x);
	drawScreen();
}

function onMouseDown(e) {
	strMouseStatus = "클릭 !";
	var theCanvas = document.getElementById("GameCanvas");
	bMouseClicked = true;
	intMouseX = e.clientX - theCanvas.offsetLeft-42;
	intMouseY = e.clientY - theCanvas.offsetTop-50;
	drawScreen();
}

function onMouseMove(e) {
	strMouseStatus = "Moving now";
	if(bMouseClicked) {
		var theCanvas = document.getElementById("GameCanvas");
		intMouseX = e.clientX - theCanvas.offsetLeft-42;
		intMouseY = e.clientY - theCanvas.offsetTop-50;
		drawScreen();
	}
}

function onMouseUp(e) {
	strMouseStatus = "클릭 끝!";
	bMouseClicked = false;
	intMouseX = 480;
	intMouseY = 300;
	drawScreen();
}

