function scrambleDumb(moves, length){
	var c = [];
	for(var i=0;i<length;++i){
		c.push(rndEl(moves));
	}
	return c;
}

function genneg1(){
	var ret = "", len = 20;
	for (var i = 0; i < len; i++) {
		ret += String.fromCharCode(32 + rn(224));
	}
	return ret;
}

function square2(len){
	var i = 0;
	var ret = [];
	while (i < len) {
		var rndu = rn(12) - 5;
		var rndd = rn(12) - 5;
		if (rndu != 0 || rndd != 0) {
			i++;
			ret.push("(" + rndu + "," + rndd + ") / ");
		}
	}
	return ret;
}

function state122(){
	return rndEl(["R2","R2 U2", "R2 U2 R2", "U2 R2", "U2"]).split(" ");
}
function state123(){
	return rndEl(["R2","R2 U2", "R2 U2 R2", "U2 R2", "U2", "U2 R2 U2 R2 U2", "U2 R2 U2 R2", "U2 R2 U2", "R2 U2 R2 U2", "R2 U2 R2 U2 R2", "R2 U2 R2 U2 R2"]).split(" ");
}
function state111(){
    return rndEl(["y","y2","y'","x","x2","x'","z","z'","z y","z y2","z y''","z' y","z' y2","z' y'","z2 y","z2 y2","z2 y'","x y","x y2","x y'","x' y","x' y2","x' y'"]).split(" ");
}

function genOther(config) {
	switch(config.type){
		case "1x1x1": return scramble(["x","y","z"],["","2","'"],20,{}); break;
        case "1x1x1optrs": return state111(); break;
		case "cs-1x-1x-1": return [genneg1(), rndEl(["Error: subscript out of range","Error: superscript out of range"])]; break;
		case "1x1x2R": return scrambleDumb(["R","R2","R'"],10); break;
		case "1x1x2U": return scrambleDumb(["U","U2","U'"],10); break;
		case "1x2x2rs": return state122(); break;
		case "1x2x3rs": return state123(); break;
		case "csLOL": return [rndEl(["LOLOLOLOLOLOLOLOLOLOLOLOL","OLOLOLOLOLOLOLOLOLOLOLOLO"])]; break;
		case "2RU": return scramble(["R","U"],["","2","'"],15,{}); break;
		case "3RU": return scramble(["R","U"],["","2","'"],25,{}); break;
		case "3RUF": return scramble(["R","U","F"],["","2","'"],25,{}); break;
		case "3RUL": return scramble(["R","U","L"],["","2","'"],25,{"R":"L","L":"R"}); break;
		case "3UL": return scramble(["U","L"],["","2","'"],25,{}); break;
		case "3MU": return scramble(["M","U"],["","2","'"],25,{}); break;
		case "3RUFL": return scramble(["R","U","F","L"],["","2","'"],25,{"R":"L","L":"R"}); break;
		case "3URr": return scramble(["R","U","r"],["","2","'"],30,{"R":"r","r":"R"}); break;
		case "4URr": return scramble(["R","U","r"],["","2","'"],40,{"R":"r","r":"R"}); break;
		case "2half": return scramble(halfmoves(2),[""],12,{}); break;
		case "3half": return scramble(halfmoves(3),[""],22,{}); break;
		case "4half": return scramble(halfmoves(4),[""],38,{}); break;
		case "5half": return scramble(halfmoves(5),[""],50,{}); break;
		case "pyr4tips": return [...puzzles["pyram"].generateScramble().split(" ").filter(function(a){return a.toUpperCase() == a}),rndEl(["r","r'"]),rndEl(["l","l'"]),rndEl(["u","u'"]),rndEl(["b","b'"])]; break;
		case "pyr0tips": return puzzles["pyram"].generateScramble().split(" ").filter(function(a){return a.toUpperCase() == a}); break;
		case "MegaRU": return scramble(["R","U"],["","2","2'","'"],35,{}); break;
		case "Heli": return scramble(["UL","UR","UF","UB","DL","DR","DF","DB","FR","FL","BR","BL"],[""],30,{}); break;
		case "sq2": return square2(30); break;
		case "rainbow": return scramble(["R","U","F","D","B","L","P","Q"],["","'"],30,{}); break; //The scramble function currently does not work with so many independent faces, so this is just for testing
		default: return ["unknown code"];
	}
}

function halfmoves(n){
	if(n==2) return ["R2","F2","U2"];
	var m = ["R2","F2","U2","D2","L2","B2"];
	for(var i=2;i<Math.ceil(n/2);++i){
		m.push(i+"R2");
		m.push(i+"U2");
		m.push(i+"F2");
		m.push(i+"D2");
		m.push(i+"B2");
		m.push(i+"L2");
	}
	if(n%2==0){
		i=n/2;
		m.push(i+"R2");
		m.push(i+"U2");
		m.push(i+"F2");
	}
	return m;
}

function genOtherImage(imoves, img_gen, config){
    var n = 3;
	switch(config.type){
		case "2RU": case "2half":
			n=2; break;
		case "3RU": case "3RUF": case "3RUL": case "3MU": case "3RUFL": case "3URr": case "3half":
			n=3;
			break;
		case "4URr": case "4half":
			n=4;
			break;
		case "5half":
			n=5;
			break;
		case "pyr0tips": case "pyr4tips":
			return drawWCA("test", "pyram", imoves, config);
        case "1x1x2R": case "1x1x2U": case "1x2x2rs": case "1x2x3rs": case "1x1x1": case "-cs-1x-1x-1": case "1x1x1optrs": case "sq2": case "rainbow": case "Heli": case "MegaRU": //Rainbow and MegaRU will get images later
            return;
	}
    return nnn_representation.draw("test",nnn_representation.moves(nnn_representation.init_cube(n),nnn_representation.apply_alg(imoves),n),n,config);
}