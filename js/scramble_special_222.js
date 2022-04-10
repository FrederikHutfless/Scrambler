var scramble_special_222 = (function() {
	//Using https://github.com/FrederikHutfless/FastVirtual2x2
	const UBL = 0;
	const UBR = 1;
	const UFR = 2;
	const UFL = 3;
	const DBL = 4;
	const DBR = 5;
	const DFR = 6;
	const DFL = 7;

	//Solved Cube
	var cp = [UBL, UBR, UFR, UFL, DBL, DBR, DFR, DFL];
	var co = [0, 0, 0, 0, 0, 0, 0, 0];

	const moveU = 0;
	const moveUP = 1;
	const moveU2 = 2;
	const moveR = 3;
	const moveRP = 4;
	const moveR2 = 5;
	const moveF = 6;
	const moveFP = 7;
	const moveF2 = 8;const movey = 9;
	const moveyP = 10;
	const movey2 = 11;

	const cpMaps = [
		[3, 0, 1, 2, 4, 5, 6, 7],
		[1, 2, 3, 0, 4, 5, 6, 7],
		[2, 3, 0, 1, 4, 5, 6, 7],
		[0, UFR, DFR, 3, 4, UBR, DBR, 7],
		[0, DBR, UBR, 3, 4, DFR, UFR, 7],
		[0, DFR, DBR, 3, 4, 2, 1, 7],
		[0, 1, UFL, DFL, 4, 5, UFR, DFR],
		[0, 1, DFR, UFR, 4, 5, DFL, UFL],
		[0, 1, DFL, DFR, 4, 5, UFL, UFR],
		[3,0,1,2,7,4,5,6],
		[1,2,3,0,5,6,7,4],
		[2,3,0,1,6,7,4,5]
	];

	const coMaps = [
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 2, 1, 0, 0, 1, 2, 0],
		[0, 2, 1, 0, 0, 1, 2, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 2, 1, 0, 0, 1, 2],
		[0, 0, 2, 1, 0, 0, 1, 2],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0]
	];

	const inverseMoves = [1, 0, 2, 4, 3, 5, 7, 6, 8];

	function applyCpMove(cp, map) {
		return [cp[map[0]], cp[map[1]], cp[map[2]], cp[map[3]], cp[map[4]], cp[map[5]], cp[map[6]], cp[map[7]]];
	}

	function applyCoMove(co, map) {
		return [(co[0] + map[0]) % 3, (co[1] + map[1]) % 3, (co[2] + map[2]) % 3, (co[3] + map[3]) % 3, (co[4] + map[4]) % (2+1), (co[5] + map[5]) % 3, (co[6] + map[6]) % 3, (co[7] + map[7]) % 3];
	}

	function applyMove(co, cp, move) {
		return [applyCoMove(applyCpMove(co, cpMaps[move]), coMaps[move]), applyCpMove(cp, cpMaps[move])];
	}

	function applyMoves(moves, co, cp) {
		var i, s;
		for (i = 0; i < moves.length; ++i) {
			s = applyMove(co, cp, moves[i]);
			cp = s[1];
			co = s[0];
		}
		return [co, cp];
	}

	function generateOrientations(cube) {
		return [
			cube,
			applyMoves([moveR, movey2, moveRP, movey2], ...cube), //x
			applyMoves([moveRP, movey2, moveR, movey2], ...cube), //x'
			applyMoves([movey], ...cube), //y
			applyMoves([moveyP], ...cube), //y'
			applyMoves([movey2], ...cube), //y2
			applyMoves([moveF, movey2, moveFP, movey2], ...cube), //z
			applyMoves([moveFP, movey2, moveF, movey2], ...cube), //z'
			applyMoves([moveR2, movey2, moveR2], ...cube), //z2
			applyMoves([moveR2, movey2, moveR2, movey], ...cube), //z2 y
			applyMoves([moveR2, movey2, moveR2, movey2], ...cube), //z2 y2
			applyMoves([moveR2, movey2, moveR2, moveyP], ...cube), //z2 y'
			applyMoves([moveF, movey2, moveFP], ...cube), //z y2
			applyMoves([moveF, movey2, moveFP, moveyP], ...cube), //z y
			applyMoves([moveF, movey2, moveFP, movey], ...cube), //z y'
			applyMoves([moveFP, movey2, moveF, moveyP], ...cube), //z' y
			applyMoves([moveFP, movey2, moveF, movey], ...cube), //z' y'
			applyMoves([moveFP, movey2, moveF], ...cube), //z' y2
			applyMoves([moveR, movey2, moveRP, movey], ...cube), //x y'
			applyMoves([moveRP, movey2, moveR, movey], ...cube), //x' y'
			applyMoves([moveR, movey2, moveRP], ...cube), //x y2
			applyMoves([moveRP, movey2, moveR], ...cube), //x' y2
			applyMoves([moveR, movey2, moveRP, moveyP], ...cube), //x y
			applyMoves([moveRP, movey2, moveR, moveyP], ...cube) //x' y
		];
	}

	function checkScrambleCharacteristic(cube, fn) {
		var orientations = generateOrientations(cube);
		for (var i = 0; i < orientations.length; ++i) {
			var orientedCube = orientations[i];
			if (fn(...orientedCube)) return true;
		}
		return false;
	}

	function isSideBlock(co, cp) {
		return pieceToStickers(cp[DFL])[(co[DFL] + 0) % 3] == pieceToStickers(cp[DBL])[(co[DBL] + 0) % 3];
	}

	function is112Block(co, cp) {
		return isSideBlock(co, cp) && pieceToStickers(cp[DBL])[(co[DBL] + 2) % 3] == pieceToStickers(cp[DFL])[(co[DFL] + 1) % 3];
	}

	function convertMoves(moves) {
		return moves.split(" ").map(function(a) { return { "U": 0, "U'": 1, "U2": 2, "R": 3, "R'": 4, "R2": 5, "F": 6, "F'": 7, "F2": 8} [a] });
	}

	function movesReadable(moves) {
		return moves.map(function(a) { return ["U", "U'", "U2", "R", "R'", "R2", "F", "F'", "F2"][a] }).join(" ");
	}

	function pieceToStickers(piece) {
		return ["WOB", "WBR", "WRG", "WGO", "YBO", "YRB", "YGR", "YOG"][piece];
	}

	function cancel(alg) {
		return alg.split("R R'").join("").split("F F'").join("").split("U U'").join("")
			.split("R2 R2").join("").split("F2 F2").join("").split("U2 U2").join("")
			.split("R' R").join("").split("F' F").join("").split("U' U").join("");
	}

	function get112BlockScramble() {
		var s = puzzles["222"].generateScramble();
		s = convertMoves(s);
		var c = applyMoves(s, co, cp);
		if (checkScrambleCharacteristic(c, is112Block)) return movesReadable(s).split(" ");
		for (var i = 0; i < 9; ++i) {
			if (Math.floor(s[s.length - 1] / 3) != Math.floor(i / 3) || s[s.length - 1] == i) {
				c = applyMove(c[0], c[1], i);
				if (checkScrambleCharacteristic(c, is112Block)) return cancel(movesReadable([...s, i])).split(" ");
				c = applyMove(c[0], c[1], inverseMoves[i]);
			}
		}
		return get112BlockScramble();
	}

	function getNoBarScramble() {
		var s = puzzles["222"].generateScramble();
		s = convertMoves(s);
		var c = applyMoves(s, co, cp);
		if (!checkScrambleCharacteristic(c, is112Block)) return movesReadable(s).split(" ");
		for (var i = 0; i < 9; ++i) {
			if (Math.floor(s[s.length - 1] / 3) != Math.floor(i / 3) || s[s.length - 1] == i) {
				c = applyMove(c[0], c[1], i);
				if (!checkScrambleCharacteristic(c, is112Block)) return cancel(movesReadable([...s, i])).split(" ");
				c = applyMove(c[0], c[1], inverseMoves[i]);
			}
		}
		return get112BlockScramble();
	}

	function getSideBlockScramble() {
		var s = puzzles["222"].generateScramble();
		s = convertMoves(s);
		var c = applyMoves(s, co, cp);
		if (checkScrambleCharacteristic(c, isSideBlock)) return movesReadable(s).split(" ");
		for (var i = 0; i < 9; ++i) {
			if (Math.floor(s[s.length - 1] / 3) != Math.floor(i / 3) || s[s.length - 1] == i) {
				c = applyMove(c[0], c[1], i);
				if (checkScrambleCharacteristic(c, isSideBlock)) return cancel(movesReadable([...s, i])).split(" ");
				c = applyMove(c[0], c[1], inverseMoves[i]);
			}
		}
		return getSideBlockScramble();
	}

	function genMoves(config) {
		if (config.type == "112Block")
			return get112BlockScramble();
		if (config.type == "SideBlock")
			return getSideBlockScramble();
		if (config.type == "NoBar")
			return getNoBarScramble();
		if (config.type == "Any")
			return randomScramble();
		return getSideBlockScramble();
	}

	function genImage(moves, config) {
		if (moves.join) moves = moves.join(" ");
		var c = tnoodlejs.scrambleToSvg(moves, puzzles["222"], 0, 0);
		return scramble_colors.changeImageColors(c);
	}

	//Solver attempt
	var statesfound = {};

	function recurse1(c, isdepth, shoulddepth, movesdone) {
		var lm = movesdone[movesdone.length - 1];
		for (var i = 0; i < 9; ++i) {
			if (movesdone.length == 0 || Math.floor(lm / 3) != Math.floor(i / 3)) {
				c = applyMove(c[0], c[1], i);
				statesfound[c[0].join("") + c[1].join("")] = [...movesdone,i].join("");
				if (isdepth < shoulddepth)
					recurse1(c, isdepth + 1, shoulddepth, [...movesdone, i]);
				c = applyMove(c[0], c[1], inverseMoves[i]);
			}
		}
	}

	function phase1() {
		recurse1([co, cp], 1 - 1, 6 - 1, []);
	}

	function recurse2(c, isdepth, shoulddepth, movesdone) {
		var lm = movesdone[movesdone.length - 1],
			z, i;
		for (i = 0; i < 9; ++i) {
			if (movesdone.length == 0 || Math.floor(lm / 3) != Math.floor(i / 3)) {
				c = applyMove(c[0], c[1], i);
				if (statesfound[c[0].join("") + c[1].join("")]) {
					return [statesfound[c[0].join("") + c[1].join("")].split(""), [...movesdone,i]];
				}
				if (isdepth < shoulddepth)
					z = recurse2(c, isdepth + 1, shoulddepth, [...movesdone, i]);
				if (z != "no" && z !== undefined) return z;
				c = applyMove(c[0], c[1], inverseMoves[i]);
			}
		}
		return "no";
	}

	function phase2(s) {
		if (Object.keys(statesfound).length == 0) phase1();
		s = convertMoves(s);
		var c = applyMoves(s, co, cp);
		var zz = recurse2([co,cp], 1 - 1, 5 - 1, []);
		return m2sol(zz[0], zz[1]);
	}

	function randomScramble() {
		if (Object.keys(statesfound).length == 0) phase1();
		function shuffleArray(arr) {
			var i,j;
			for (i = arr.length - 1; i > 0; --i) {
				j = Math.floor(Math.random() * (i + 1));
				[arr[i], arr[j]] = [arr[j], arr[i]];
			}
			return arr;
		}
		var cp = shuffleArray([UBL, UBR, UFR, UFL, DBR, DFR, DFL]);
		cp = [cp[0], cp[1], cp[2], cp[3], DBL, cp[4], cp[5], cp[6]];
		var co = [0, 0, 0, 0, 0, 0, 0, 0];
		var parity = 0;
		for(var i=0;i<7;++i){
			var x = Math.floor(Math.random()*3);
			if(i==4) x=0;
			co[i]=x;
			parity += x;
		}
		co[7] = [0,2,1][parity%3];
		var zz = recurse2([co,cp], 1 - 1, 5 - 1, []);
		return m2sol(zz[0], zz[1]);
	}

	function cancel2(p){
		var h = [];
		for(var i=0;i<p.length;++i){
			if((i < p.length && p[i+1] === undefined) || Math.floor(p[i]/3) != Math.floor(p[i+1]/3)){
				h.push(p[i]);
			}else{
				var tg = [1,-1,2][p[i]%3]+[1,-1,2][p[i+1]%3];
				++i;
				if(tg == 1) h.push(Math.floor(p[i]/3)*3);
				else if(tg == 2) h.push(Math.floor(p[i]/3)*3+2);
				else if(tg == 3) h.push(Math.floor(p[i]/3)*3+1);
			}
		}
		return h;
	}

	function m2sol(m,p){
		p = p.reverse();
		p = p.map(function(a){return inverseMoves[a]});
		p = [...m, ...p];
		p=cancel2(p);
		return movesReadable(p).split(" ");
	}

	return {
		genMoves: genMoves,
		genImage: genImage,
		solve: phase2,
		statesfound: statesfound,
		randomScramble: randomScramble
	};
})();