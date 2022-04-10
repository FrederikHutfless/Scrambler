var pyr_rep = (function(){
	var solved = [
		[0,0,0,0], //URLB tips
		[0,0,0,0], //URLB centers
		[1,1,1],[2,2,2],[3,3,3],[4,4,4] //FLRD Edges
	];

	function U(state){
		return [
			[(state[0][0]+1)%3, state[0][1], state[0][2], state[0][3]],
			[(state[1][0]+1)%3, state[1][1], state[1][2], state[1][3]],
			[state[4][0], state[2][1], state[2][2]],
			[state[2][0], state[3][1], state[3][2]],
			[state[3][0], state[4][1], state[4][2]],
			state[5]
		];
	}

	function move_tip(state, index, amount){
		state[0][index] = (state[0][index] + amount)%3;
		return state;
	}

	function move_center(state, index, amount){
		state[1][index] = (state[0][index] + amount)%3;
		return state;
	}

	function y(state){
		return [
			[(state[0][0]+1)%3, state[0][3], state[0][1], state[0][2]],
			[(state[1][0]+1)%3, state[1][3], state[1][1], state[1][2]],
			state[4],
			state[2],
			state[3],
			[state[5][2], state[5][0], state[5][1]]
		];
	}

	function R(state){
		return [
			[state[0][0], (state[0][1]+1)%3, state[0][2], state[0][3]],
			[state[1][0], (state[1][1]+1)%3, state[1][2], state[1][3]],
			[state[5][0], state[5][1], state[2][2]],
			state[3],
			[state[4][0], state[0][0], state[0][1]],
			[state[3][1], state[3][0], state[5][2]],
		];
	}


})();