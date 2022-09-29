

//Generate random move scrambles for generalized puzzles
export function randomMove(turns:string[], suffixes:string[], length:number, oppositeTable) {
	function rndEl(x) {
		return x[~~(Math.random() * x.length)];
	}
	var i:number, j:number, moves:string[] = [],
		scrambleMoves:string[] = [];
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