function nncmoves(move, opp, n) {
	var moves = [],
		i;

	if (n == 2)
		return [move];

	for (i = 0; i < ((n % 2) == 0 ? (n / 2) : ((n - 1) / 2)); ++i) {
		moves.push(i == 0 ? move : (i + 1) + move);
		if (n % 2 != 0) {
			moves.push(i == 0 ? opp : (i + 1) + opp);
		}
	}
	return moves;
}

function rndEl(x) {
	return x[~~(Math.random() * x.length)];
}

function rn(n) {
	return ~~(Math.random() * n);
}

function genCuboid(config) {
	return scrambleNPQ(config.l, config.n, config.m, config.lgth);
}

function scrambleNPQ(n, p, q, length){
	var side, magnitude, suffix, moves=[], prevside = "", prevused = [], doubleprevside = "_";
	while(moves.length < length){
		side = rndEl(["U","D","R","L","F","B"]);
		magnitude = rn(Math.ceil({"U":n,"D":n,"R":p,"L":p,"F":q,"B":q}[side]/2-0.5))+1;
		suffix = ((side=="U"||side=="D")&&q==p)?rndEl(["","2","'"]):rndEl(["2"]);
		if(prevside != side){
			if(!(prevside == {"R":"L","L":"R","U":"D","D":"U","F":"B","B":"F"}[side] && doubleprevside == side)){
				doubleprevside = prevside;
				prevside = side;
				prevused = [magnitude];
                moves.push((magnitude==1?"":magnitude) + side + suffix);
			}
		} else if(prevused.indexOf(magnitude) == -1){
			prevused.push(magnitude);
            moves.push((magnitude==1?"":magnitude) + side + suffix);
		}
	}
	return moves;
}

function scramble(turns, suffixes, length, oppositeTable) {
	var i, j, moves = [],
		scrambleMoves = [];
	if (!oppositeTable) oppositeTable = {};

	// Check: We can't generate a scramble with only one move available and more than one move needed
	// Check: We need at least one suffix. It may be "".
	if ((turns.length < 2 && length > 1) || suffixes.length < 1) return;

	// Generate list of all combinations of turns and suffixes
	for (i = 0; i < turns.length; ++i)
		for (j = 0; j < suffixes.length; ++j)
			moves.push("" + turns[i] + suffixes[j]);

	// Add moves until the needed length is reached
	while (scrambleMoves.length < length) {
		scrambleMoves.push(rndEl(moves));
		// Don't do A[n] A[m]
		if (scrambleMoves.length > 1 && scrambleMoves[scrambleMoves.length - 1][0] == scrambleMoves[scrambleMoves.length - 2][0])
			scrambleMoves.pop();
		// Don't do A[n] B[m] A[o] if A is opposite to B
		if (scrambleMoves.length > 1 && oppositeTable[scrambleMoves[scrambleMoves.length - 1][0]] == scrambleMoves[scrambleMoves.length - 2][0])
			scrambleMoves.pop();
	}
	return scrambleMoves;
}