//Copyright © 2023 Frederik Hutfleß

import {drawWCA, cl} from './TNoodle';
import { generateMoves as genMoves } from './move-generators';

export class Scrambler {
    public static scramble() {
        console.log("Scrambling");
        global.config= {"Hallo": "Welt"};
        cl();
    }

    public static generateMoves(a,b?,c?) {
        return genMoves([a,b,c]);
    }

    public static generateImage(event, config) {
        
    }

    public static cmosinit(algorithmRegistration) { //initialize as cmos plugin
        console.log("DeltaScrambler plugin loaded");
        algorithmRegistration.registerMoveGen("deltascrambler", "333-nWCA-qRM-m24-fN", function(){return Scrambler.generateMoves("3x3x3",{lgth:24})});
        algorithmRegistration.registerMoveGen("deltascrambler", "333-nWCA-qRM-m?-fN", function(l){return Scrambler.generateMoves("3x3x3",{lgth:l})});
    }

    public static cmosunload() {
        console.log("DeltaScrambler plugin unloaded");
    }
}