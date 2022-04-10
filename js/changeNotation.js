function id(x) {
	return x;
}

function change_notation(moves, move_gen, img_gen, notation_equiv_class, config) {
	var cfg = {
		"222": [id, NNN2yo],
		"333": [id, NNN2yo],
		"444": [id, c444],
		"555": [id, c444],
		"666": [id, c444],
		"777": [id, c444],
		"megam": [id, mega2nolinebr, mega2carrot, mega2oldstyle],
		"clock": [id],
		"sq1": [id, karnaukh]
	};
	if (cfg[notation_equiv_class] && cfg[notation_equiv_class][config.notationStyle])
		return cfg[notation_equiv_class][config.notationStyle](moves);
	return id(moves);
}

function mega2carrot(moves) {
	moves = moves.join(" ").split("\n").join(" ").split(" ");
	var out = [];
	for (var i = 0; i < moves.length; ++i) {
		if (moves[i][0] == "R") {
			out.push(moves[i][1] + moves[i + 1][1]);
			++i;
		} else if(moves[i][0] == "U"){
			out.push(moves[i]+"\n");
		}
	}
	return out;
}

function mega2nolinebr(moves) {
	return moves.join(" ").split("\n").join(" ").split(" ");
}

function mega2oldstyle(moves){
	var out = [];
	var sides = ["U","F","R","D","B","L","DR","DL","DBR","DBL","BR","BL"];
	function doRPP(sides){
		return [sides[7], sides[9], sides[3], sides[10], sides[0], sides[5], sides[8], sides[4], sides[11], sides[2], sides[6], sides[1]]
	}
	function doRMM(sides){
		return doRPP(doRPP(doRPP(doRPP(sides))));
	}
	function doUPP(sides){
		return [sides[0], sides[11], sides[5], sides[3], sides[6], sides[10], sides[9], sides[8], sides[7], sides[4], sides[1], sides[2]]
	}
	function doUMM(sides){
		return doUPP(doUPP(doUPP(doUPP(sides))));
	}
	for(var i=0;i<moves.length;++i){
		switch(moves[i]){
			case "R++": sides = doRPP(sides); out.push(sides[5]+"2-"); break;
			case "R--": sides = doRMM(sides); out.push(sides[5]+"2+"); break;
			case "D++": sides = doUPP(sides); out.push(sides[0]+"2-"); break;
			case "D--": sides = doUMM(sides); out.push(sides[0]+"2+"); break;
			case "U": out.push(sides[0]); break;
			case "U'": out.push(sides[0]+"-"); break;
		}
	}
	return out;
}

function NNN2yo(moves){
	var out = [];
	for(var i=0;i<moves.length;++i){
		out.push({
			"U":"A",
			"U'":"B",
			"U2":"C",
			"D":"D",
			"D'":"E",
			"D2":"F",
			"L":"G",
			"L'":"H",
			"L2":"I",
			"R":"J",
			"R'":"K",
			"R2":"L",
			"M":"M",
			"M'":"N",
			"M2":"O",
			"E":"P",
			"E'":"Q",
			"E2":"R",
			"S":"S",
			"S'":"T",
			"S2":"U",
			"F":"V",
			"F'":"W",
			"F2":"X",
			"B":"Y",
			"B'":"Z",
			"B2": "YY"
		}[moves[i]] || moves[i]);
	}
	return out;
}

function c444(moves){
	return moves.join(" ")
		.split("Fw").join("f").split("Bw").join("b")
		.split("Rw").join("r").split("Lw").join("l")
		.split("Uw").join("u").split("Dw").join("d")
		.split(" ");
}

function karnaukh(moves){
	return moves.join(" ")
		.split("3,0").join("U")
		.split("-3,0").join("U'")
		.split("0,3").join("D")
		.split("0,-3").join("D'")
		.split("2,1").join("u")
		.split("-2,1").join("u'")
		.split("-1,2").join("d")
		.split("1,-2").join("d'")
		.split("(").join("")
		.split(")").join("")
		.split(" ")
}