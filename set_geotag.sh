#!/bin/bash
exiftool -exif:gpslatitude=$2 -exif:gpslatituderef=N -exif:gpslongitude=$3 -exif:gpslongituderef=E $1
rm $1_original
