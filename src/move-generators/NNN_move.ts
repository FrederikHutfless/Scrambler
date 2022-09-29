function rndEl(x) {
    return x[~~(Math.random() * x.length)];
}

function rn(n) {
    return ~~(Math.random() * n);
}

//Generate a random move NxNxN scramble
export function NNN_move(config) {
    var n:number = config.n;
    var lgth:number = config.lgth;
    if(n < 2) return "";
    if(!lgth) lgth = Math.ceil(2*n*n - 5*n + 13);
    return scrambleNNN(n, lgth);
}

//Generate the moves
function scrambleNNN(n:number, length:number){
    var side:string, magnitude, suffix, moves=[], prevside = "", prevused = [], doubleprevside = "_";
    while(moves.length < length){
        //Generate a random move
        side = rndEl(["R","U","F","D","B","L"]);
        if(n%2==1) magnitude=rn(n/2-0.5)+1;
        else if(side =="R" || side == "F" || side == "U") magnitude = rn(n/2)+1;
        else magnitude = rn(n/2-1)+1;
        suffix = rndEl(["","2","'"]);

        //Check if it's valid
        if(prevside != side){
            if(!(prevside == {"R":"L","L":"R","U":"D","D":"U","F":"B","B":"F"}[side] && doubleprevside == side)){
                doubleprevside = prevside;
                prevside = side;
                prevused = [magnitude];
                moves.push((magnitude<3?"":magnitude) + side + (magnitude==1?"":"w") + suffix);
            }
        } else if(prevused.indexOf(magnitude) == -1){
            prevused.push(magnitude);
            moves.push((magnitude<3?"":magnitude) + side + (magnitude==1?"":"w") + suffix);
        }
    }
    return moves;
}