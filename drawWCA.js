function drawWCA(cid, puzzle, moves, config){
	var c = document.getElementById(cid);
	var ctx = c.getContext("2d");
	var width = c.width;
	var height = c.height;

	var img = /*changeNNNImageColors(*/tnoodlejs.scrambleToSvg(moves.join(" "), puzzles[puzzle], 0, 0)/*, config);*/
	if(puzzle == "clock") img = changeClockImageColors(img, config);
	var imgwidth = +img.substr(12,3);
	var imgheight = +img.substr(27,3);
	img = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(img);
	var img1 = new Image();
	img1.src = img;
	if(width/imgwidth >= height/imgheight){
		img1.onload = function() {
			ctx.clearRect(0, 0, width, height);
			//if(puzzle == "sq1fast")
			//	ctx.drawImage(img1,0,0,imgwidth*height/imgheight + (width - imgwidth*height/imgheight)/2 + imgwidth*height/imgheight/2,height);
			ctx.drawImage(img1,0,0,imgwidth*height/imgheight,height);
		}
	} else {
		img1.onload = function() {
			ctx.clearRect(0, 0, width, height);
			ctx.drawImage(img1,0,0,width,imgheight*width/imgwidth);
		}
	}
}