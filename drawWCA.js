function drawWCA(cid, puzzle, moves, config){
	var c = document.getElementById(cid);
	var ctx = c.getContext("2d");
	var width = c.width;
	var height = c.height;
	ctx.clearRect(0, 0, width, height);

	var img = /*changeNNNImageColors(*/tnoodlejs.scrambleToSvg(moves.join(" "), puzzles[puzzle], 0, 0)/*, config);*/
	if(puzzle == "clock") img = changeClockImageColors(img, config);
	img = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(img);
	var img1 = new Image();
	img1.src = img;
	img1.onload = function() {
		ctx.drawImage(img1,-5,0,width,height);
	}
	
}