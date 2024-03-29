echo "Building scrambler."
rm -f built/scrambler.js
rm -f built/scrambler.min.js
rm -f built/index.js
cd js
cat aa_start.js changeNotation.js minx.js cuboid.js other.js changeImageColors.js addColor.js representations/pyr_rep.js representations/nnn_representation.js scramble_special_222.js representations/c123.js drawWCA.js random_move_nnn.js zz_end.js worker.js libs/scramble_wca.js libs/scramble_subset.js > ../built/scrambler.js
cat aa_start.js changeNotation.js minx.js cuboid.js other.js changeImageColors.js addColor.js representations/pyr_rep.js representations/nnn_representation.js scramble_special_222.js representations/c123.js drawWCA.js random_move_nnn.js zz_end.js zz_node.js libs/scramble_subset.js > ../built/index.js
cd ..
echo "Minifying"
npx esbuild built/scrambler.js --target=es6 --outfile=built/scrambler.min.js --minify
npx esbuild built/index.js --target=es6 --outfile=index.js --minify
echo "Done."
stat --printf="Unminified %s bytes\n" built/scrambler.js
stat --printf="Minified   %s bytes\n" built/scrambler.min.js