var nnn_representation = (function() {

	function rotateA(a) {
		var tmp;
		var n = a.length;
		for (var i = 0; i < n / 2; i++){
			for (var j = i; j < n - i - 1; j++){
				tmp			 = a[i][j];
				a[i][j]		 = a[j][n-i-1];
				a[j][n-i-1]	 = a[n-i-1][n-j-1];
				a[n-i-1][n-j-1] = a[n-j-1][i];
				a[n-j-1][i]	 = tmp;
			}
		}
		return a;
	}

	function tcenter_slice_move(state, face, n, depth, offset=0) {
		var middle = Math.floor(n/2)-offset;
		var smiddle = middle+offset+offset;
		var last = n-1-depth;
		var first = depth;
		if(n%2 == 0){ --smiddle; }
		var moved_faces = [
			[1, 2, 3, 4],
			[0, 4, 5, 2],
			[1, 5, 3, 0],
			[0, 2, 5, 4],
			[1, 0, 3, 5],
			[1, 4, 3, 2],
		][face];
		var a = [
			[middle, middle, middle, smiddle],
			[first, first, first, first],
			[last, middle, first, smiddle],
			[last, last, last, last],
			[first, middle, last, smiddle],
			[smiddle, middle, smiddle, smiddle]
		][face];
		var b = [
			[last, last, last, first],
			[middle, middle, middle, middle],
			[smiddle, last, middle, first],
			[smiddle, smiddle, smiddle, smiddle],
			[middle, last, smiddle, first],
			[first, last, first, first]
		][face];
		var z = state[moved_faces[0]][a[0]][b[0]];
		state[moved_faces[0]][a[0]][b[0]] = state[moved_faces[1]][a[1]][b[1]];
		state[moved_faces[1]][a[1]][b[1]] = state[moved_faces[2]][a[2]][b[2]];
		state[moved_faces[2]][a[2]][b[2]] = state[moved_faces[3]][a[3]][b[3]];
		state[moved_faces[3]][a[3]][b[3]] = z;
		return state;
	}

	function init_cube(n) {
		var pieces = [
			[],
			[],
			[],
			[],
			[],
			[]
		];
		for (var i = 0; i < 6; ++i)
			for (var j = 0; j < n; ++j) {
				pieces[i][j] = [];
				for (var k = 0; k < n; ++k)
					pieces[i][j][k] = i * n * n + j * n + k;
			}
		return pieces;
	}

	function draw(cid, grstate, n, config) {
		var c = document.getElementById(cid);
		var ctx = c.getContext("2d");
		var width = c.width;
		var height = c.height;
		ctx.clearRect(0, 0, width, height);
		ctx.font = "12px Arial";
		ctx.strokeStyle = config.baseColor;
		ctx.lineWidth=2;

		for (var i = 0; i < 6; ++i)
			for (var j = 0; j < n; ++j) {
				for (var k = 0; k < n; ++k)
					draw_cubie(grstate, n, ctx, i, j, k, width, height, config);
			}
	}

	function draw_cubie(grstate, n, ctx, side, x, y, width, height, config) {
		var unit_size = Math.min(width / 4, height / 3) - 5;
		var cubie_size = Math.round(unit_size / n);
		unit_size += 5;
		var heightoffset = [1, 0, 1, 2, 1, 1][side] * unit_size + 1;
		var widthoffset = [2, 1, 1, 1, 3, 0][side] * unit_size + 1;
		var sidecolors = config.colorScheme;

		ctx.fillStyle = sidecolors[Math.floor(grstate[side][x][y] / n / n)];
		ctx.fillRect(widthoffset + y * cubie_size, heightoffset + x * cubie_size, cubie_size, cubie_size);
		if(config.baseColor != "stickerless"){
			ctx.strokeRect(widthoffset + y * cubie_size, heightoffset + x * cubie_size, cubie_size, cubie_size);
		}
		//ctx.fillStyle = "#000000";
		//ctx.fillText(grstate[side][x][y], widthoffset + y * cubie_size, heightoffset + x * cubie_size + 12);
	}

	function draw_mir(cid, grstate, n, config) {
		var l = n-1;
		function gssx(s,i,x,y){
			if(i==0&&x==0) return s[1][l-y][l];
			if(i==0&&x==l) return s[3][y][l];
			if(i==1&&x==0) return s[4][0][l-y];
			if(i==1&&x==l) return s[2][0][y];
			if(i==2&&x==0) return s[1][l][y];
			if(i==2&&x==l) return s[3][0][y];
			if(i==3&&x==0) return s[2][l][y];
			if(i==3&&x==l) return s[4][l][l-y];
			if(i==4&&x==0) return s[1][0][l-y];
			if(i==4&&x==l) return s[3][0][l-y];
			if(i==5&&x==0) return s[1][y][0];
			if(i==5&&x==l) return s[3][l-y][0];
			return s[i][x][y];
		}
		function gssy(s,i,x,y){
			if(i==0&&y==0) return s[2][x][l];
			if(i==0&&y==l) return s[4][x][0];
			if(i==1&&y==0) return s[5][0][x];
			if(i==1&&y==l) return s[0][0][l-x];
			if(i==2&&y==0) return s[5][x][l];
			if(i==2&&y==l) return s[0][x][0];
			if(i==3&&y==0) return s[5][l][l-x];
			if(i==3&&y==l) return s[0][l][x];
			if(i==4&&y==0) return s[0][x][l];
			if(i==4&&y==l) return s[5][x][0];
			if(i==5&&y==0) return s[4][x][l];
			if(i==5&&y==l) return s[2][x][0];
			return s[i][x][y];
		}

		var c = document.getElementById(cid);
		var ctx = c.getContext("2d");
		var width = c.width;
		var height = c.height;
		ctx.clearRect(0, 0, width, height);
		ctx.font = "12px Arial";
		ctx.strokeStyle = config.baseColor;

		var unit_size = Math.min(width / 4, height / 3) - 5;
		var cubie_size = unit_size / n;
		unit_size += 5;
		var piece_size_x, piece_size_y;

		var orstate = JSON.parse(JSON.stringify(grstate));
		grstate = moves(grstate, apply_alg("U R2 F B R B2 R U2 L B2 R U' D' R2 F R' L B2 U2 F2".split(" ")), 3);

		for (var i = 0; i < 6; ++i){
			var heightoffset = [1, 0, 1, 2, 1, 1][i] * unit_size;
			var widthoffset = [2, 1, 1, 1, 3, 0][i] * unit_size;
			for (var x = 0; x < n; ++x) {
				for (var y = 0; y < n; ++y){
					ctx.fillStyle = config.colorScheme[Math.floor(orstate[i][x][y] / n / n)];
					if(y != 1 && x != 1){
						piece_size_x = [6,2,4,7,5,3][Math.floor(gssx(grstate,i,x,y) / n / n)]/7*cubie_size;
						piece_size_y = [6,2,4,7,5,3][Math.floor(gssy(grstate,i,x,y) / n / n)]/7*cubie_size;
					}
					else piece_size_x = piece_size_y = [6,2,4,7,5,3][Math.floor(grstate[i][x][y] / n / n)]/7*cubie_size;
					if(x==0) var xoffset = cubie_size - piece_size_x; else xoffset = 0;
					if(y==0) var yoffset = cubie_size - piece_size_y; else yoffset = 0;
					if(x==n-1) var x2offset = cubie_size - piece_size_x; else x2offset = 0;
					if(y==n-1) var y2offset = cubie_size - piece_size_y; else y2offset = 0;
					ctx.fillRect(widthoffset + yoffset + y * cubie_size, heightoffset + xoffset + x * cubie_size, cubie_size-yoffset-y2offset, cubie_size-xoffset-x2offset);
					if(config.baseColor != "stickerless")
						ctx.strokeRect(widthoffset + y * cubie_size, heightoffset + x * cubie_size, cubie_size, cubie_size);
				}
			}
		}
	}

	function move(state, side, depth, n) {
		for (var i = 0; i < depth; ++i) {
			state = tcenter_slice_move(state, side, n, i);
			for (var j = 1; j < Math.floor(n / 2)+1; ++j) {
				state = tcenter_slice_move(state, side, n, i, j);
				if(n%2!=0 || j<n/2)state = tcenter_slice_move(state, side, n, i, -j);
			}
		}
		state[side] = rotateA(rotateA(rotateA(state[side])));
		return state;
	}

	function moves(grstate, mvs, n) {
		for (var i = 0; i < mvs.length; ++i)
			grstate = move(grstate, mvs[i][0], mvs[i][1], n);
		return grstate;
	}

	function apply_alg(moves){
		var mvs = [];
		for(var i=0;i<moves.length;++i){
			var face = moves[i].replace(/[0-9w]/g, "");
			var isW = moves[i].indexOf("w")>-1;
			moves[i] = moves[i].toUpperCase();
			moves[i] = moves[i].split("w").join("");
			moves[i] = moves[i].replace(/[RUFDBL]/i,"#").split("#");
			if(moves[i][0]=="") moves[i][0]=isW?2:1;
			var mgn = moves[i][1]==""?1:(moves[i][1]=="'"?3:(moves[i][1]=="2"?2:0));
			face = face.split("'").join("");
			face = {"R":0,"U":1,"F":2,"D":3,"B":4,"L":5}[face];
			for(var j=0;j<mgn;++j)
			mvs.push([face,+moves[i][0]]);
		}
		return mvs;
	}

	return {
		draw,
		draw_mir,
		move,
		moves,
		init_cube,
		apply_alg
	}
})();