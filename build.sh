echo "Building scrambler."
rm -f built/scrambler.js
rm -f built/scrambler.min.js
cat aa_start.js changeNotation.js minx.js cuboid.js other.js changeImageColors.js addColor.js representations/pyr_rep.js representations/nnn_representation.js scramble_special_222.js representations/c123.js drawWCA.js random_move_nnn.js zz_end.js libs/scramble_wca.js libs/scramble_subset.js > built/scrambler.js

echo "Minifying"
npx esbuild built/scrambler.js --target=es6 --outfile=built/scrambler.min.js --minify
echo "Done."
stat --printf="Unminified %s bytes\n" built/scrambler.js
stat --printf="Minified   %s bytes\n" built/scrambler.min.js