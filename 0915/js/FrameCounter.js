function FrameCounter()
{
	this.Lastfps = 0;
	this.FrameCounter = 0;
	this.LastTime = 0;

	return this;
}

var frameCounter = new FrameCounter();

FrameCounter.prototype.countFrame = function()
{
	this.frameCount++;
	var tmpDate = new Date();
	if(this.LastTime + 1000 < tmpDate.getTime())
	{
		this.Lastfps = this.frameCount;
		this.frameCount = 0;
		this.LastTime = tmpDate.getTime();
	}
	delete tmpDate;
}