//Copyright © 2022 Frederik Hutfleß

var isLoaded:boolean = false;
var tnoodlejs;
var puzzles;

export function loadTNoodle(tnoodlejs_, puzzles_){
    isLoaded = true;
    tnoodlejs = tnoodlejs_;
    puzzles = puzzles_;
}

export function cl(){
    console.log("hi");
}

export function drawWCA(cid:string, puzzle, moves:Array<string>, config){
	var c:HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(cid);
	var ctx:CanvasRenderingContext2D = c.getContext("2d");
	var width:number = c.width;
	var height:number = c.height;
    config = global.config;

	var img = /*changeNNNImageColors(*/tnoodlejs.scrambleToSvg(moves.join(" "), puzzles[puzzle], 0, 0)/*, config);*/
	//if(puzzle == "clock") img = changeClockImageColors(img, config);
	var imgwidth = +img.substr(12,3);
	var imgheight = +img.substr(27,3);
	img = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(img);
	var img1 = new Image();
	img1.src = img;
	if(width/imgwidth >= height/imgheight){
		img1.onload = function() {
			ctx.clearRect(0, 0, width, height);ctx.drawImage(img1,0,0,imgwidth*height/imgheight,height);
		}
	} else {
		img1.onload = function() {
			ctx.clearRect(0, 0, width, height);
			ctx.drawImage(img1,0,0,width,imgheight*width/imgwidth);
		}
	}
}