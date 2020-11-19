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
    if(config.l==config.n&&config.n==config.m)
        return scramble([...nncmoves("U","D",config.l),...nncmoves("F","B",config.m),...nncmoves("R","L",config.n)], ["", "'", "2"], config.lgth, { "U": "D", "L": "R", "B": "F", "D": "U", "R": "L", "F": "B" });
    else if(config.n == config.m)
        return scramble([...nncmoves("U","D",config.l),...nncmoves("F","B",config.m),...nncmoves("R","L",config.n)], ["2"], config.lgth, { "U": "D", "L": "R", "B": "F", "D": "U", "R": "L", "F": "B" });
    else return scramble([...nncmoves("U","D",config.l),...nncmoves("F","B",config.m),...nncmoves("R","L",config.n)], ["2"], config.lgth, { "U": "D", "L": "R", "B": "F", "D": "U", "R": "L", "F": "B" });
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