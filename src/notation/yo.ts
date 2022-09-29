//From https://docs.google.com/document/d/1bfDsydw6pxBftd8Xwik95FNjILGkdrJMBO5EORbftII/edit
//Addition of f2 and B2 by me to avoid failing on WCA Scrambles

const moveToYo = {
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
}

const wideMoveToYo = {
    ...moveToYo,
    "u":"QA",
    "u'":"BP",
    "u2":"RC",
    "l":"MG",
    "l'":"NH",
    "l2":"OI",
    "r":"NJ",
    "r'":"MK",
    "r2":"OL",
    "f":"SV",
    "f'":"WT",
    "f2":"SVSV",
    "x":"LI",
    "x'":"MI",
    "y":"GI",
    "y'":"KJ",
    "z":"QP",
    "z'":"DP"
}

export function NNN2yo(moves:string[], useExtended:boolean = false){
	var out:string[] = [];
    var table:object = useExtended ? wideMoveToYo : moveToYo;
	for(var i:number = 0; i < moves.length; ++i){
		out.push(table[moves[i]] || moves[i]);
	}
	return out;
}