var c123 = (function() {

	function init_cube() {
		return [false, false, 0,1,2,3]; //LFlip, RFlip, UL UR DR DL
	}

	function draw(c: HTMLCanvasElement, grstate, config) {
		var ctx = c.getContext("2d");
		var width = c.width;
		var height = c.height;
		ctx.clearRect(0, 0, width, height);
		ctx.font = "12px Arial";
		ctx.strokeStyle = config.baseColor;
		ctx.lineWidth=2;

		draw_cubie(ctx, 0, 1, (grstate[2]<2)?"blue":"green", width, height, config);
		draw_cubie(ctx, 0, 2, (grstate[3]<2)?"blue":"green", width, height, config);
		draw_cubie(ctx, 1, 0, (grstate[2]==0||grstate[2]==3)?"orange":"red", width, height, config);
		draw_cubie(ctx, 1, 1, (grstate[2]==0||grstate[2]==2)?"white":"yellow", width, height, config);
		draw_cubie(ctx, 1, 2, (grstate[3]==1||grstate[3]==3)?"white":"yellow", width, height, config);
		draw_cubie(ctx, 1, 3, (grstate[3]==0||grstate[3]==3)?"orange":"red", width, height, config);
		draw_cubie(ctx, 2, 0, "orange", width, height, config);
		draw_cubie(ctx, 2, 1, !grstate[0]?"white":"yellow", width, height, config);
		draw_cubie(ctx, 2, 2, !grstate[1]?"white":"yellow", width, height, config);
		draw_cubie(ctx, 2, 3, "red", width, height, config);
		draw_cubie(ctx, 3, 0, (grstate[5]==0||grstate[5]==3)?"orange":"red", width, height, config);
		draw_cubie(ctx, 3, 1, (grstate[5]==1||grstate[5]==3)?"white":"yellow", width, height, config);
		draw_cubie(ctx, 3, 2, (grstate[4]==0||grstate[4]==2)?"white":"yellow", width, height, config);
		draw_cubie(ctx, 3, 3, (grstate[4]==0||grstate[4]==3)?"orange":"red", width, height, config);
		draw_cubie(ctx, 4, 1, (grstate[2]>1)?"blue":"green", width, height, config);
		draw_cubie(ctx, 4, 2, (grstate[3]>1)?"blue":"green", width, height, config);
	}

	function draw_cubie(ctx, x, y, color, width, height, config) {
		var unit_size = Math.min(width / 3, height / 5) - 5;
		var cubie_size = unit_size;
		var offset = 5;

		ctx.fillStyle = color;
		ctx.fillRect(offset + y * cubie_size, offset + x * cubie_size, cubie_size, cubie_size);
		if(config.baseColor != "stickerless"){
			ctx.strokeRect(offset + y * cubie_size, offset + x * cubie_size, cubie_size, cubie_size);
		}
	}

	function move(state, side) {
		if(side == 0){
			state[1] = !state[1];
			var x = state[4];
			state[4] = state[3];
			state[3] = x;
		} else if(side == 1){
			var x = state[2];
			state[2] = state[3];
			state[3] = x;
		} else if(side == 2){
			var x = state[4];
			state[4] = state[5];
			state[5] = x;
		}
		return state;
	}

	function moves(grstate, mvs) {
		for (var i = 0; i < mvs.length; ++i)
			grstate = move(grstate, mvs[i][0]);
		return grstate;
	}

	function apply_alg(moves){
		var mvs = [];
		for(var i=0;i<moves.length;++i){
			var face = {"R":0,"U":1,"D":2}[moves[i][0]];
			mvs.push([face]);
		}
		return mvs;
	}

	return {
		draw,
		move,
		moves,
		init_cube,
		apply_alg
	}
})();

export default c123;