var random_move_nnn = (function() {

    function rndEl(x) {
        return x[~~(Math.random() * x.length)];
    }

    function rn(n) {
        return ~~(Math.random() * n);
    }

    // If lgth = -1, calculate a good value
    function genMoves(config) {
        if(!config.lgth) config.lgth = -1;
        var l = config.lgth == -1 ? Math.ceil(2*config.n*config.n - 5*config.n + 13) : config.lgth;
        return scrambleNNN(config.n, l);
    }

    function scrambleNNN(n, length){
        var side, fn, magnitude, suffix, moves=[], prevside = "", prevused = [], doubleprevside = "_";
        while(moves.length < length){
            side = rndEl(["R","U","F","D","B","L"]);
            fn = side < 3 ? Math.ceil: Math.floor;
            magnitude = rn(fn(n/2-0.5))+1;
            suffix = rndEl(["","2","'"]);
            if(prevside != side){
                if(!(prevside == {"R":"L","L":"R","U":"D","D":"U","F":"B","B":"F"}[side] && doubleprevside == side)){
                    doubleprevside = prevside;
                    prevside = side;
                    prevused = [magnitude];
                    moves.push((magnitude==1?"":magnitude) + side + suffix);
                }
            } else {
                if(prevused.indexOf(magnitude) == -1){
                    prevused.push(magnitude);
                    moves.push((magnitude==1?"":magnitude) + side + suffix);
                }
            }
        }
        return moves;
    }

    function genImage(moves, config) {
        if (config.n >= 2 && config.n <= 5)
            return scramble_colors.changeImageColors(scrambler_wca.genImage(moves.join(" "), 111 * config.n));
        return "";
    }
    return {
        genMoves: genMoves,
        genImage: genImage
    }
})();