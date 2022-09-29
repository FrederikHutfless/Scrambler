import {NNN_move} from "./move-generators/NNN_move";

function eventToGenerator(event:string){
    if(event.split("x").length == 3 && event.split("x")[0] == event.split("x")[1] && event.split("x")[1] == event.split("x")[2])
        return "NNN_move";
}

export function generateMoves(args){
    var generator;
    var config;

    if(args[1] == undefined){
        //Only event given
        if(args[0][0] == ":")
            generator = args[0].substr(1);
        else
            generator = eventToGenerator(args[0]);
        config = {};
    } else if(args[2] == undefined){
        //Event and config given
        if(args[0][0] == ":")
            generator = args[0].substr(1);
        else
            generator = eventToGenerator(args[0]);
        config = args[1];
    }
    
    generator = {"NNN_move": NNN_move}[generator] || function(){return "Invalid generator"};
    return generator(config);
}