	function getMoves(move_gen, img_gen, notation_equiv_class, config) {
		switch (move_gen) {
			case "wca":
				return puzzles[config.type].generateScramble().split(" ");
			case "special_222":
				return scramble_special_222.genMoves(config);
			case "NNN_moves":
				return random_move_nnn.genMoves(config);
			case "subset":
        		scramble_subset.setRandomSource(Math);
        		scramble_subset.initialize();
        		scramble_subset.setRandomSource(Math);
				var s = scramble_subset["get" + config.type + "Scramble"]().split("  ").join(" ").split(" ");
				if (s[s.length - 1] == "") s.pop();
				return s;
			case "minx":
				return scrambleMega(megaMoves(config.n), ["U", "U'"], config.movesPerRow, config.moves);
			case "cuboid":
				return genCuboid(config);
			case "other":
				return genOther(config);
		}
	}

	function getImage(imoves, move_gen, img_gen, notation_equiv_class, config) {
		switch (move_gen) {
			case "wca":
				if ([222, 333, 444, "444fast", 555, 666, 777].indexOf(config.type) > -1) {
					if (img_gen == "mirror") {
						return nnn_representation.draw_mir("test", nnn_representation.moves(nnn_representation.init_cube(([] + config.type)[0]), nnn_representation.apply_alg(imoves), ([] + config.type)[0]), ([] + config.type)[0], config);
					} else {
						return nnn_representation.draw("test", nnn_representation.moves(nnn_representation.init_cube(([] + config.type)[0]), nnn_representation.apply_alg(imoves), ([] + config.type)[0]), ([] + config.type)[0], config);
					}
				}
				return drawWCA("test", config.type, imoves, config);
			case "special_222":
				return nnn_representation.draw("test", nnn_representation.moves(nnn_representation.init_cube(2), nnn_representation.apply_alg(imoves), 2), 2, config);
			case "subset":
				return nnn_representation.draw("test", nnn_representation.moves(nnn_representation.init_cube(3), nnn_representation.apply_alg(imoves), 3), 3, config);
			case "NNN_moves":
			case "cubicWCA":
				if (img_gen == "normal")
					return nnn_representation.draw("test", nnn_representation.moves(nnn_representation.init_cube(config.n), nnn_representation.apply_alg(imoves), config.n), config.n, config);
				else if (img_gen == "mirror")
					return nnn_representation.draw_mir("test", nnn_representation.moves(nnn_representation.init_cube(config.n), nnn_representation.apply_alg(imoves), config.n), config.n, config);
			case "minx":
				return;
			case "cuboid":
				return;
			case "other":
				if(config.type == "1x2x3" || config.type == "1x2x3rsru" || config.type == "1x2x3rs")
					return c123.draw("test", c123.moves(c123.init_cube(config.n), c123.apply_alg(imoves), config.n), config.n, config);
				return genOtherImage(imoves, img_gen, config);
		}
	}

	function joinMoves(moves, move_gen, img_gen, notation_equiv_class, config) {
		return moves.join(" ");
	}

	function changeColor(orig_moves, mod_moves, move_gen, img_gen, notation_equiv_class, config) {
		if (move_gen == "NNN_moves")
			return addColor_(orig_moves, mod_moves, config);
		if (move_gen == "wca" && [222, 333, 444, "444fast", 555, 666, 777].indexOf(config.type) > -1)
			return addColor_(orig_moves, mod_moves, config);
		if (move_gen == "wca" && config.type == "clock")
			return addClockColor_(orig_moves, mod_moves, 1, config);
		if (move_gen == "wca" && config.type == "minx" && (config.notationStyle == 0 || config.notationStyle == 1))
			return addMegaminxColor_(orig_moves, mod_moves, config);
		return JSON.parse(JSON.stringify(mod_moves));
	}

	return {
		getMoves: getMoves,
		getImage: getImage,
		joinMoves: joinMoves,
		change_notation: change_notation,
		changeColor: changeColor
	}
})();