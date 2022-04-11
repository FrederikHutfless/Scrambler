Scrambler and Image generator
===
Code to generate scrambles and scramble images for all WCA and lots of non-WCA puzzles. I've build this mainly to run my own timer (speed-cmos.com).

Build using ./build.sh.

Usage: Include scrambler.min.js into a HTML file. If you want to use WCA scrambles, provide a suitable TNOODLE_ENV and a function puzzlesLoaded that accepts the scramblers from tnoodle and makes them available to the scrambler in window.puzzles whenever they need to be accessed while generating a scramble. Using subset scramblers also requires initialization and setting of a random source.
Include worker.js in the build script if you want to use this as a web worker. Worker WCA tnoodle scrambles are a bit hacky but should work.

All code is written and copyrighted by me (Frederik Hutfleß), with exception of the contents of the following files, where I at most have done very small changes to what the authors originally wrote:
- scramble_wca.js (taken from https://github.com/thewca/tnoodle and released under GPLv3)
- scramble_subset.js (taken from https://github.com/cubing/jsss/tree/scrambles and released under GPLv3)
- small parts of other.js (taken from https://github.com/cs0x7f/cstimer and released under GPLv3)
