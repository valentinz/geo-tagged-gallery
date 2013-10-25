#!/bin/bash
find images/ -iname "*.JPG" | xargs exiftool -j -a -FileName -Directory -CreateDate -GPSLatitude -GPSLongitude > images.json
