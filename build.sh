echo "Building scrambler."
rm -f scrambler.js
rm -f scrambler.min.js
cat aa_start.js changeNotation.js minx.js cuboid.js other.js changeImageColors.js addColor.js pyr_rep.js nnn_representation.js scramble_special_222.js c123.js drawWCA.js random_move_nnn.js zz_end.js scramble_wca.js scramble_subset.js > scrambler.js
echo "Minifying"
npx esbuild scrambler.js --target=es6 --outfile=scrambler.min.js --minify
echo "Done."
stat --printf="Unminified %s\n" scrambler.js
stat --printf="Minified   %s\n" scrambler.min.js