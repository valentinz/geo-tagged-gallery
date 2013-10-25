#!/bin/bash
mkdir -p cache/thumbnail
mkdir -p cache/image
for i in `find images/ -iname "*.JPG"`; do
	echo "--- $i ---"
	NEW_NAME=$(echo -n $i|md5sum|awk '{print $1}')
	convert -size 200x60 $i -resize 200x60 cache/thumbnail/$NEW_NAME.jpg
	convert -size 600x600 $i -resize 600x600 cache/image/$NEW_NAME.jpg
done
