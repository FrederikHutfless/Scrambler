var rainbow_representation = (function() {

	function init_cube(n) {
		//012 oben von hinten i.u.. 345 unten von vorne i.u.. 67 89 11 i.u.. Middle slice FLR
		return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	}

	function draw(cid, grstate, config) {
		var c = document.getElementById(cid);
		var ctx = c.getContext("2d");
		var width = c.width;
		var height = c.height;
		ctx.clearRect(0, 0, width, height);
		ctx.font = "12px Arial";
		ctx.strokeStyle = config.baseColor;
		ctx.lineWidth = 2;

		var Unit = Math.min(height / 8, width / 9);
		draw4(ctx, config, 4 * Unit, 3 * Unit, Unit);
		draw4R(ctx, config, 4.59 * Unit, 2.42 * Unit, Unit);
		draw4L(ctx, config, 3.23 * Unit, 2.42 * Unit, Unit);
		draw3B(ctx, config, 4*Unit, 2*Unit, Unit);
		draw3F(ctx, config, 4*Unit, 3*Unit, Unit);
	}

	function fillRect(ctx, config, y, x, sx, sy, color, rotation = 0) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(y+sx/2, x+sy/2);
		ctx.rotate(rotation*Math.PI/180);
		ctx.rect(-sx/2, -sy/2, sx, sy);
		ctx.fillStyle = color;
		ctx.fill();
		if (config.baseColor != "stickerless") {
			ctx.strokeRect(-sx/2, -sy/2, sx, sy);
		}
		ctx.restore();
	}

	function drawTriangle(context, config, x, y, triangleWidth, triangleHeight, fillStyle){
		context.beginPath();
		context.moveTo(x, y);
		context.lineTo(x + triangleWidth / 2, y + triangleHeight);
		context.lineTo(x - triangleWidth / 2, y + triangleHeight);
		context.closePath();
		context.fillStyle = fillStyle;
		context.fill();
		if (config.baseColor != "stickerless") {
			context.stroke();
		}
	}

	function draw4(ctx, config, offsety, offsetx, Unit) {
		fillRect(ctx, config, offsety, offsetx, Unit / 2, Unit / 2, "#FF0000");
		fillRect(ctx, config, offsety + Unit / 2, offsetx, Unit / 2, Unit / 2, "#00FF00");
		fillRect(ctx, config, offsety, offsetx + Unit / 2, Unit / 2, Unit / 2, "#F0F00F");
		fillRect(ctx, config, offsety + Unit / 2, offsetx + Unit / 2, Unit / 2, Unit / 2, "#0000FF");
	}

	function draw4R(ctx, config, offsety, offsetx, Unit) {
		fillRect(ctx, config, offsety + Unit*(1+Math.sqrt(3)) / 4, offsetx - Unit/4, Unit/2, Unit / 2, "#FF0000", 60);
		fillRect(ctx, config, offsety + Unit *Math.sqrt(3) / 4, offsetx - Unit *(1+Math.sqrt(3)) / 4, Unit / 2, Unit / 2, "#00FF00", 60);
		fillRect(ctx, config, offsety + Unit/4, offsetx, Unit / 2, Unit / 2, "#F0F00F", 60);
		fillRect(ctx, config, offsety, offsetx - Unit*Math.sqrt(3)/4, Unit / 2, Unit / 2, "#0000FF", 60);
	}

	function draw4L(ctx, config, offsety, offsetx, Unit) {
		fillRect(ctx, config, offsety + Unit*(1+Math.sqrt(3)) / 4, offsetx - Math.sqrt(3)*Unit/4, Unit/2, Unit / 2, "#FF0000", 120);
		fillRect(ctx, config, offsety + Unit *Math.sqrt(3) / 4, offsetx, Unit / 2, Unit / 2, "#00FF00", 120);
		fillRect(ctx, config, offsety + Unit/4, offsetx- Unit *(1+Math.sqrt(3))/4, Unit / 2, Unit / 2, "#F0F00F", 120);
		fillRect(ctx, config, offsety, offsetx - Unit/4, Unit / 2, Unit / 2, "#0000FF", 120);
	}

	function draw3B(ctx, config, offsetx, offsety, Unit) {
		var offsetxs = [Unit/4, 0, Unit/2, Unit/4];
		var offsetys = [Unit, Unit/2+(1-Math.sqrt(3)/2)*Unit/2, Unit/2+(1-Math.sqrt(3)/2)*Unit/2, (1-Math.sqrt(3)/2)*Unit];
		var colors = ["#FF00FF","#CC00CC","#990099","#550055"];
		offsetx += Unit*1/4;
		for(var i=0;i<4;++i)
			drawTriangle(ctx, config, offsetx+offsetxs[i], offsety+offsetys[i], Unit/2, (i==0?-1:1)*Math.sqrt(3)/2*Unit/2, colors[i]);
	}

	function draw3F(ctx, config, offsetx, offsety, Unit) {
		var offsetxs = [Unit/4, 0, Unit/2, Unit/4];
		var offsetys = [Unit, Unit/2+Unit-(1-Math.sqrt(3)/2)*Unit/2, Unit/2+Unit-(1-Math.sqrt(3)/2)*Unit/2, -(1-Math.sqrt(3)/2)*Unit+2*Unit];
		var colors = ["#FF00FF","#CC00CC","#990099","#550055"];
		offsetx += Unit*1/4;
		for(var i=0;i<4;++i)
			drawTriangle(ctx, config, offsetx+offsetxs[i], offsety+offsetys[i], Unit/2, (i==0?1:-1)*Math.sqrt(3)/2*Unit/2, colors[i]);
	}


	/*old 3F: 
	drawTriangle(ctx, config, offsetx+Unit/4, offsety+Unit, Unit/2, Unit/2*Math.sqrt(3)/2, "#FF00FF");
	offsety -= (1-Math.sqrt(3)/2)*Unit/2;
	drawTriangle(ctx, config, offsetx, offsety+Unit/2+Unit, Unit/2, -Math.sqrt(3)/2*Unit/2, "#FF00FF");
	drawTriangle(ctx, config, offsetx+Unit/2, offsety+Unit/2+Unit, Unit/2, -Math.sqrt(3)/2*Unit/2, "#FF00FF");
	offsety -= (1-Math.sqrt(3)/2)*Unit/2;
	drawTriangle(ctx, config, offsetx+Unit/4, offsety+Unit+Unit, Unit/2, -Math.sqrt(3)/2*Unit/2, "#FF00FF");*/

	/*old 3B: drawTriangle(ctx, config, offsetx+Unit/4, offsety+Unit, Unit/2, -Unit/2*Math.sqrt(3)/2, "#FF00FF");
	offsety += (1-Math.sqrt(3)/2)*Unit/2;
	drawTriangle(ctx, config, offsetx, offsety+Unit/2, Unit/2, Math.sqrt(3)/2*Unit/2, "#FF00FF");
	drawTriangle(ctx, config, offsetx+Unit/2, offsety+Unit/2, Unit/2, Math.sqrt(3)/2*Unit/2, "#FF00FF");
	offsety += (1-Math.sqrt(3)/2)*Unit/2;
	drawTriangle(ctx, config, offsetx+Unit/4, offsety, Unit/2, Math.sqrt(3)/2*Unit/2, "#FF00FF");*/

	function move(state, side) {
		var permutation = [
			[0, 1, 2],
			[1, 6, 11],
			[2, 7, 8],
			[6, 7, 3],
			[3, 4, 5],
			[0, 9, 10],
			[5, 8, 9],
			[4, 10, 11]
		][side];
		var tmp = state[permutation[0]];
		state[permutation[0]] = state[permutation[2]];
		state[permutation[1]] = state[permutation[1]];
		state[permutation[2]] = tmp;
		return state;
	}

	function moves(grstate, mvs) {
		for (var i = 0; i < mvs.length; ++i)
			grstate = move(grstate, mvs[i][0]);
		return grstate;
	}

	function apply_alg(moves) {
		var out = [];
		for (var i = 0; i < moves.length; ++i) {
			var move = moves[i][0];
			move = { "U": 0, "R": 1, "L": 2, "F": 3, "D": 4, "B": 5, "P": 6, "Q": 7 } [move];
			out.push([move]);
			if (moves[i].length == 2) out.push([move]);
		}
		return out;
	}

	return {
		draw,
		move,
		moves,
		init_cube,
		apply_alg
	}
})();