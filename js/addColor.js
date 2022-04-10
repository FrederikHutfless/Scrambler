function genColorHTML(color, move){
    return "<span style='color:"+color+"'>" + move + "</span>";
}

function addColor_(moves, outmoves, config){
    var nmoves = [];
    var colorScheme = config.colorScheme;
    for(var i=0;i<moves.length;++i){
        var index = 0;
        if(moves[i][0]=="2" || moves[i][0] == "3") index = 1; //unfuck bigger NxNxN
        switch(moves[i][index]){
            case "R": nmoves[i] = genColorHTML(colorScheme[0], outmoves[i]); break;
            case "U": nmoves[i] = genColorHTML(colorScheme[1]=="#ffffff"?"#dddddd":colorScheme[1], outmoves[i]); break;
            case "F": nmoves[i] = genColorHTML(colorScheme[2], outmoves[i]); break;
            case "D": nmoves[i] = genColorHTML(colorScheme[3], outmoves[i]); break;
            case "B": nmoves[i] = genColorHTML(colorScheme[4], outmoves[i]); break;
            case "L": nmoves[i] = genColorHTML(colorScheme[5], outmoves[i]); break;
            default: nmoves[i] = outmoves[i];
        }
    }
    return nmoves;
}

function addMegaminxColor_(moves, outmoves, config){
    var nmoves = [];
    var colorScheme = config.colorScheme;
    for(var i=0;i<moves.length;++i){
        var index = 0;
        switch(moves[i][index]){
            case "R": nmoves[i] = genColorHTML(colorScheme[0], outmoves[i]); break;
            case "D": nmoves[i] = genColorHTML(colorScheme[3], outmoves[i]); break;
            case "U": nmoves[i] = genColorHTML(colorScheme[1]=="#ffffff"?"#dddddd":colorScheme[1], outmoves[i]); break;
            default: nmoves[i] = outmoves[i];
        }
    }
    return nmoves;
}

function addClockColor_(moves, outmoves, type, config){
    var nmoves = [];
    var colorScheme = config.colorScheme;
    for(var i=0;i<moves.length;++i){
        if(type == 0){
            switch(moves[i][moves[i].length-2]){
                case "1": nmoves[i] = genColorHTML(colorScheme[0], outmoves[i]); break;
                case "2": nmoves[i] = genColorHTML(colorScheme[1]=="#ffffff"?"#dddddd":colorScheme[1], outmoves[i]); break;
                case "3": nmoves[i] = genColorHTML(colorScheme[2], outmoves[i]); break;
                case "4": nmoves[i] = genColorHTML(colorScheme[3], outmoves[i]); break;
                case "5": nmoves[i] = genColorHTML(colorScheme[4], outmoves[i]); break;
                case "6": nmoves[i] = genColorHTML(colorScheme[5], outmoves[i]); break;
                default: nmoves[i] = outmoves[i];
            }
        } else if(type == 1){
            switch(moves[i][moves[i].length-2]){
                case "1": nmoves[i] = genColorHTML("#222222", outmoves[i]); break;
                case "2": nmoves[i] = genColorHTML("#444444", outmoves[i]); break;
                case "3": nmoves[i] = genColorHTML("#666666", outmoves[i]); break;
                case "4": nmoves[i] = genColorHTML("#888888", outmoves[i]); break;
                case "5": nmoves[i] = genColorHTML("#aaaaaa", outmoves[i]); break;
                case "6": nmoves[i] = genColorHTML("#cccccc", outmoves[i]); break;
                default: nmoves[i] = outmoves[i];
            }
        } else {
            switch(moves[i][moves[i].length-2]){
                case "y": nmoves[i] = genColorHTML("#777777", outmoves[i]); break;
                default: nmoves[i] = outmoves[i];
            }
        }
    }
   return nmoves;
}