window.addEventListener("load", onPageLoadComplete, false);

var rect_x = 100;
var rect_y = 100;

function onPageLoadComplete()
{
	var FPS = 30;
	setInterval(gameLoop, 1000/FPS);
}

function gameLoop()
{
	Update();
	Render();
	frameCounter.countFrame();
}

function Update()
{
	if(inputSystem.isKeyDown(37))
	{
		rect_x -= 10;
	}
	if(inputSystem.isKeyDown(39))
	{
		rect_x += 10;
	}
	if(inputSystem.isKeyDown(38))
	{
		rect_y -= 10;
	}
	if(inputSystem.isKeyDown(40))
	{
		rect_y += 10;
	}
}

function Render()
{
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	Context.fillStyle = "#770000";
	Context.fillRect(0, 0, 800, 600);
	Context.fillStyle = "#ffff00";
	Context.fillRect(rect_x, rect_y, 40, 40);
	/*Context.font = '15px Arial';
	Context.textBaseline = "top";
	Context.fillText("fps : " + frameCounter.Lastfps, 10, 10);*/
}