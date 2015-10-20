window.addEventListener("load", drawScreen, false);
window.addEventListener("keydown", onkeydown, false);
window.addEventListener("keyup", onkeyup, false);

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
var isKeyDown = [];

var score = 0;

var intPlayerX = 480;
var intPlayerY = 300;
var PosX = 480;
var PosY = 300;

var intervalID;

var arrBalls = new Array();

t = setInterval(update, 1000/30);

function update()
{
	if(GameState == S_GAME)
	{
  		if(isKeyDown[37]){ 
		    if(intPlayerX > 0) PosX -= 5;
		}
		if(isKeyDown[39]){ 
		    if(intPlayerX < 910) PosX += 5;
		}
		if(isKeyDown[38]){ 
		    if(intPlayerY > 0) PosY -= 5;
  		}
  		if(isKeyDown[40]){ 
   			if(intPlayerY < 570) PosY += 5;
  		}
	}
	if(PosX != intPlayerX && (intPlayerX > 0 || intPlayerX < 910) ) intPlayerX += (PosX - intPlayerX) / 20;
	if(PosY != intPlayerY && (intPlayerY > 0 || intPlayerY < 570)) intPlayerY += (PosY - intPlayerY) / 20;
	
	if(intervalID == true) MoveBall();
	score+=1;

	drawScreen();
}

function drawScreen() {
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	Context.drawImage(imgBackground, 0, 0, 1020, 780);
	Context.fillStyle="#ff0";
	Context.drawImage(imgPlayer, intPlayerX, intPlayerY, 100, 100);
	for(var i = 0; i < arrBalls.length; i++)
	{
		Context.drawImage(ball, arrBalls[i].x, arrBalls[i].y, 15, 15);
	}
	Context.fillStyle = "#000";
	Context.font = '24px Arial';
	Context.textBaseline = "top";
	if( GameState == S_READY) Context.fillText("READY!", 470, 250);
	else if ( GameState == S_GAME)
	{
		Context.fillText("GO!", 300, 200);
		Context.fillText("점수 : " + score, 0, 0);
	}
	else if ( GameState == S_OVER) Context.fillText("GAME OVER", 400, 300);
}

function onkeydown(e)
{
	if(e.keyCode == 13 && (GameState == S_READY || GameState == S_OVER))
	{
		onReady();
		onGameStart();
	}
	else
	{
		if(GameState == S_GAME) isKeyDown[e.keyCode] = true;
	}
	//drawScreen();
}

function onkeyup(e)
{
	isKeyDown[e.keyCode] = false;
}

function RandomNextInt(n)
{
	return 1 + Math.floor(Math.random() * n);
}

function chkCollision(x,y) 
{
	if(intPlayerX + 75 > x + 5 &&
	   intPlayerX + 35 < x + 25 &&
	   intPlayerY + 35 < y + 25 &&
	   intPlayerY + 90 > y + 5)
	{
		soundBack.pause();
		soundOver.play();
		score = 0;
		return true;
	}
	return false;
}

function MoveBall()
{

	for(var i = 0; i < arrBalls.length; i++)
	{
		if(arrBalls[i].y >= 760 || arrBalls[i].y <= 0 || 
		   arrBalls[i].x <= 0 || arrBalls[i].x >= 1000) 
		{
			var BallType = RandomNextInt(4);
			switch(BallType)
			{
				case 1:
					arrBalls[i].x = 0;
					arrBalls[i].y = RandomNextInt(760);
					arrBalls[i].go_x = RandomNextInt(2);
					arrBalls[i].go_y = -2 + RandomNextInt(4);
					break;
				case 2:
					arrBalls[i].x = 1000;
					arrBalls[i].y = RandomNextInt(760);
					arrBalls[i].go_x = -1 * RandomNextInt(2);
					arrBalls[i].go_y = -2 + RandomNextInt(4);
					break;
				case 3:
					arrBalls[i].y = 0;
					arrBalls[i].x = RandomNextInt(1000);
					arrBalls[i].go_y = RandomNextInt(2);
					arrBalls[i].go_x = -2 + RandomNextInt(4);
					break;
				case 4:
					arrBalls[i].y = 760;
					arrBalls[i].x = RandomNextInt(1000);
					arrBalls[i].go_y = -1 * RandomNextInt(2);
					arrBalls[i].go_x = -2 + RandomNextInt(4);
			}
		}
		arrBalls[i].x += arrBalls[i].go_x * 5;
		arrBalls[i].y += arrBalls[i].go_y * 5;
		if( chkCollision(arrBalls[i].x, arrBalls[i].y) ) onGameOver();
		
	}

	drawScreen();
}

function onReady()
{
	GameState = S_READY;
	intPlayerX = 480;
	intPlayerY = 300;
	PosX = 480;
	PosY = 300;
}

function onGameStart()
{
	soundBack = new Audio();
	soundBack.src = "../image/back.mp3"
	soundBack.loop = true;
	document.body.appendChild(soundBack);

	soundOver = new Audio();
	soundOver.src = "../image/gameover.mp3"
	document.body.appendChild(soundOver);

	soundBack.play();

	GameState = S_GAME;
	intervalID = setInterval(MoveBall, 100);
	t = setInterval(update, 1000/60);
	aB = setInterval(addBall, 800); //총알을 추가하는 타이머 800을 조정하여 딜레이수정

	arrBalls.push({x:0, y:0, go_x:1, go_y:1});
	arrBalls.push({x:980, y:0, go_x:-1, go_y:1});
	arrBalls.push({x:980, y:680, go_x:-1, go_y:-1});
	arrBalls.push({x:0, y:680, go_x:1, go_y:-1}); //기본으로 4개총알 생성
}

function addBall()
{
	var BallType = RandomNextInt(4);
	var intX, intY, intGoX, intGoY;
	var BallType = RandomNextInt(4);
	switch(BallType)
	{
		case 1:
			intX = 0;
			intY = RandomNextInt(680);
			intGoX = RandomNextInt(2);
			intGoY = -2 + RandomNextInt(4);
			break;
		case 2:
			intX = 980;
			intY = RandomNextInt(680);
			intGoX = -1 * RandomNextInt(2);
			intGoY = -2 + RandomNextInt(4);
			break;
		case 3:
			intY = 0;
			intX = RandomNextInt(980);
			intGoY = RandomNextInt(2);
			intGoX = -2 + RandomNextInt(4);
			break;
		case 4:
			intY = 680;
			intX = RandomNextInt(980);
			intGoY = -1 * RandomNextInt(2);
			intGoX = -2 + RandomNextInt(4);
	}
	arrBalls.push({x:intX, y:intY, go_x:intGoX, go_y:intGoY});
}

function onGameOver()
{
	GameState = S_OVER;
	while(arrBalls.length != 0) arrBalls.pop();
	clearInterval(intervalID);
	clearInterval(t);
	clearInterval(aB);
}


