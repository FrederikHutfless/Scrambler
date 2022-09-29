//Copyright © 2022 Frederik Hutfleß

import {drawWCA, cl} from './TNoodle';
import { generateMoves as genMoves } from './move-generators';

export class Scrambler {
    public static scramble() {
        console.log("Scrambling");
        global.config= {"Hallo": "Welt"};
        cl();
    }

    public static generateMoves(a,b,c) {
        return genMoves([a,b,c]);
    }
}