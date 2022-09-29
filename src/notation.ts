import {NNN2yo} from "./notation/yo";

export function changeNotation(moves:string[], notation:string, notationOptions){
    if(notation == "yo"){
        if(!notationOptions.useExtended) notationOptions.useExtended = false;
        return NNN2yo(moves, notationOptions.useExtended);
    }
    return moves;
}