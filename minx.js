function megaMoves(n) {
    var moves = [];
    if (n % 2 == 1) --n;
    n /= 2;
    for (var i = 0; i < n; ++i) {
        moves.push(i == 0 ? "R" : (i + 1) + "R");
        moves.push(i == 0 ? "D" : (i + 1) + "D");
    }
    return moves;
}

function scrambleMega(turns, rotations, movesPerRow, rows) {
    var i, j, alg = [],
        turnsIndex = 0;
    for (i = 0; i < rows; ++i) {
        for (j = 0; j < movesPerRow; ++j) {
            alg.push(turns[turnsIndex++] + rndEl(["++", "--"]));
            if (turnsIndex > turns.length - 1)
                turnsIndex = 0;

        }
        // Do the 5U 4U 3U ... U
        alg.push(rndEl(rotations) + "<br/>");
        turnsIndex = rn(turns.length);
    }
    return alg;
}