function changeNNNImageColors(scrambleSvgCode, config) {
    var colorScheme = ["#ff0000", "#ffffff", "#00ff00", "#ffff00", "#ff8000", "#0000ff"],
        colorScheme2 = ["#R", "#U", "#F", "#D", "#B", "#L"],
        cubicColorScheme = config.colorScheme,
        i;

    for (i = 0; i < colorScheme.length; ++i) {
        scrambleSvgCode = scrambleSvgCode.replace(new RegExp(colorScheme[i], "g"), colorScheme2[i]);
    }
    for (i = 0; i < colorScheme.length; ++i) {
        scrambleSvgCode = scrambleSvgCode.replace(new RegExp(colorScheme2[i], "g"), cubicColorScheme[i]);
    }
    return scrambleSvgCode;
}

function changeClockImageColors(scrambleSvgCode, config) {
    var colorScheme = ["#000000", "#55ccff", "#3375b2", "#ffff00", "#ff0000"],
        colorScheme2 = ["#Border", "#Background", "#Foreground", "#Pins", "#Arrows"],
        cubicColorScheme = config.clockColorScheme,
        i;

    for (i = 0; i < colorScheme.length; ++i) {
        scrambleSvgCode = scrambleSvgCode.replace(new RegExp(colorScheme[i], "g"), colorScheme2[i]);
    }
    for (i = 0; i < colorScheme.length; ++i) {
        scrambleSvgCode = scrambleSvgCode.replace(new RegExp(colorScheme2[i], "g"), cubicColorScheme[i]);
    }
    return scrambleSvgCode;
}