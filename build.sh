#!/usr/bin/bash
ZIP="/c/Program Files/7-Zip/7z.exe"
OUTPUT_DIR=$(pwd)/build
MTLIB=${OUTPUT_DIR}/maptool-jmr-diceoverlay-addon.mtlib
DIST=${OUTPUT_DIR}/maptool-jmr-diceoverlay-addon-dist.zip
build_version=$(cat build_version.txt)
new_build_version=$(expr $build_version + 1)
echo $new_build_version > build_version.txt
sed -e s/build_version/$new_build_version/ library.json.template > src/library.json
echo "Build version ${new_build_version}"

# the build.sh script assumes to be in the root directory of the add-on
( 
	cd src ; 
	rm -f $OUTPUT ; 
	"$ZIP" u -r -tzip $MTLIB .
)
rm -f $DIST
"$ZIP" u  -x\!build -r $DIST .
