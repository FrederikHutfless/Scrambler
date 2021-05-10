var clock_representation = (function() {
  function rotateA(a) {
    var tmp;
    var n = a.length;
    for (var i = 0; i < n / 2; i++) {
      for (var j = i; j < n - i - 1; j++) {
        tmp                     = a[i][j];
        a[i][j]                 = a[j][n - i - 1];
        a[j][n - i - 1]         = a[n - i - 1][n - j - 1];
        a[n - i - 1][n - j - 1] = a[n - j - 1][i];
        a[n - j - 1][i]         = tmp;
      }
    }
    return a;
  }

  function init_clock(n) {
    var pieces = [
      [],
      [],
    ];

    for (var i = 0; i < 2; ++i) {
      for (var j = 0; j < n; ++j) {
        pieces[i][j] = [];
        for (var k = 0; k < n; ++k) {
          pieces[i][j][k] = i * n * n + j * n + k;
        }
      }
      return pieces;
    }
  }

  function draw(cid, grstate, n, config) {
    var c = document.getElementById(cid);
    var ctx = c.getContext("2d");
    var pi = Math.PI;
    var radius = (c.width / 2)
    ctx.clearCircle(0, 0, pi, radius);
    ctx.font = "12px Arial";
    ctx.strokeStyle = config.baseColor;
    ctx.lineWidth = 2;

    for (var i = 0; i < 2; ++i) {
      for (var j = 0; j < n; ++j) {
        for (var k = 0; k < n; ++k) {
          draw_clock(grstate, n, ctx, i, j, k, pi, radius, config);
        }
      }
    }
  }

  function draw_clock(grstate, n, ctx, side, x, y, pi, radius, config) {
    var unit_size = Math.min(pi, (radius / 3)^2) - 5;
    var individual_clock_size = Math.round(unit_size / n);
    unit_size += 5;
    var heightoffset = [1, 0, 1, 2, 1, 1][side] * unit_size + 1;
    var widthoffset = [2, 1, 1, 1, 3, 0][side] * unit_size + 1;
    var sidecolors = config.colorScheme;

    ctx.fillStyle = sidecolors[Math.floor(grstate[side][x][y] / n / n)];
    ctx.fillCircle(widthoffset + y * individual_clock_size, heightoffset + x * individual_clock_size, individual_clock_size, individual_clock_size);
    if (config.baseColor != "stickerless") {
      ctx.strokeCircle(widthoffset + y * individual_clock_size, heightoffset + x * individual_clock_size, individual_clock_size, individual_clock_size);
    }
    // ctx.fillStyle = "#000000";
    // ctx.fillText(grstate[side])
  }

  function draw_mir(cid, grstate, n, config) {
    var l = n - 1;

    function gssx(s, i, x, y) {
      if (i == 0 && x == 0) {
        return s[1][l - y][l];
      }
      if (i == 0 && x == l) {
        return s[3][y][l];
      }
      if (i == 1 && x == 0) {
        return s[4][0][l - y];
      }
      if (i == 1 && x == l) {
        return s[2][0][y];
      }
      if (i == 2 && x == 0) {
        return s[1][l][y];
      }
      if (i == 2 && x == l) {
        return s[3][0][y];
      }
      if (i == 3 && x == 0) {
        return s[2][l][y];
      }
      if (i == 3 && x == l) {
        return s[4][l][l - y];
      }
      if (i == 4 && x == 0) {
        return s[1][0][l - y];
      }
      if (i == 4 && x == l) {
        return s[3][0][l - y];
      }
      if (i == 5 && x == 0) {
        return s[1][y][0];
      }
      if (i == 5 && x == l) {
        return s[3][l - y][0];
      }
      return s[i][x][y];
    }

    function gssy(s, i, x, y) {
      if (i == 0 && y == 0) {
        return s[2][x][l];
      }
      if (i == 0 && y == l) {
        return s[4][x][0];
      }
      if (i == 1 && y == 0) {
        return s[5][0][x];
      }
      if (i == 1 && y == l) {
        return s[0][0][l - x];
      }
      if (i == 2 && y == 0) {
        return s[5][x][l];
      }
      if (i == 2 && y == l) {
        return s[0][x][0];
      }
      if (i == 3 && y == 0) {
        return s[5][l][l - x];
      }
      if  (i == 3 && y == l) {
        return s[0][l][x];
      }
      if (i == 4 && y == 0) {
        return s[0][x][l];
      }
      if (i == 4 && y == l) {
        return s[5][x][0];
      }
      if (i == 5 && y == 0) {
        return s[4][x][l];
      }
      if (i == 5 && y == l) {
        return s[2][x][0];
      }
      return s[i][x][y];
    }

    var c = document.getElementById(cid);
    var ctx = c.getContext("2d");
    var pi = Math.PI;
    var radius = c.width / 2;
    ctx.clearCircle(0, 0, pi, radius^2);
    ctx.font = "12px Arial";
    ctx.strokeStyle = config.baseColor;

    var unit_size = Math.min(pi, radius / 3) - 5;
    var individual_clock_size = unit_size / n;
    unit_size += 5;
    var piece_size_x, piece_size_y;

    var orstate = JSON.parse(JSON.stringify(grstate));
    grstate = moves(grstate, apply_alg("UR0+ R3- D0+ UL1+ R5+ y2 ALL1+ DR DL L3-".split(" ")), 3);

    for (var i = 0; i < 2; ++i) {
      var heightoffset = [1, 0, 1, 2, 1, 1][i] * unit_size;
      var widthoffset = [2, 1, 1, 1, 3, 0][i] * unit_size;
      for (var x = 0; x < n; ++x) {
        for (var y = 0; y < n; ++y) {
          ctx.fillStyle = config.colorScheme[Math.floor(orstate[i][x][y] / n / n)];
          if (y != 1 && x != 1) {
            piece_size_x = [6, 2, 4, 7, 5, 3][Math.floor(gssx(grstate, i, x, y) / n / n)] / 7 * individual_clock_size;
            piece_size_y = [6, 2, 4, 7, 5, 3][Math.floor(gssy(grstate, i, x, y) / n / y)] / 7 * individual_clock_size;
          } else {
            piece_size_x = piece_size_y = [6, 2, 4, 7, 5, 3][Math.floor(grstate[i][x][y] / n / n)] / 7 * individual_clock_size;
          }
          if (x == 0) {
            var xoffset = individual_clock_size - piece_size_x;
          } else {
            xoffset = 0;
          }
          if (y == 0) {
            var yoffset = individual_clock_size - piece_size_y;
          } else {
            yoffset = 0;
          }
          if (x == n - 1) {
            var x2offset = individual_clock_size - piece_size_x;
          } else {
            x2offset = 0;
          }
          if (y == n - 1) {
            var y2offset = individual_clock_size - piece_size_y;
          } else {
            y2offset = 0;
          }

          ctx.fillCircle(widthoffset + yoffset + y * individual_clock_size, heightoffset + xoffset + x * individual_clock_size, individual_clock_size -  yoffset - y2offset, individual_clock_size - xoffset - x2offset);
        
          if (config.baseColor != "stickerless") {
            ctx.strokeCircle(widthoffset +y * individual_clock_size, heightoffset  + x * individual_clock_size, individual_clock_size, individual_clock_size);
          }
        }
      }
    }
  }

  function move(state, side) {
    state[side] = rotateA(rotateA(rotateA(state[side])));
    return state;
  }

  function moves(grstate, mvs, n) {
    for (i = 0; i < mvs.length; ++i) {
      grstate = move(grstate, mvs[i][0], mvs[i][1], n);
    }
    return grstate;
  }

  function apply_alg(moves) {
    var mvs = [];
    for (var i = 0; i < moves.length; ++i) {
      var face = moves[i].replace(/[0-9]/g, "");

      moves[i] = moves[i].toUpperCase();
      moves[i] = moves[i].split("w").join("");
      moves[i] = [moves[i][moves[i].length-2], moves[i][moves[i].length-1]];

      var mgn = +moves[i][0]; //moves[i][0] == "0"?1:(moves[i][0] == "1"?2:(moves[i][0] == "2"?3:(moves[i][0] == "3"?4:(moves[i][0] == "4"?5:(moves[i][0] == "5"?6:(moves[i][0] == "6"?7:0))))));
      var mgs = moves[i][1] == "+"?1:(moves[i][1] == "-"?2:0);

      face = face.split("+").join("");
      face = {"U":0, "UR":1, "UL":2, "D":3, "DR":4, "DL":5, "R":6, "L":7, "ALL":8, "y":9}[face];

      for (var j = 0; j < mgn; ++j) {
        for (var k = 0; k < mgs; ++k) {
          mvs.push([face, +moves[i][0]]);
        }
      }
    }
    return mvs;
  }
  return {
    draw,
    move,
    moves,
    init_clock,
    apply_alg,
    init_cube: init_clock
  }
})();