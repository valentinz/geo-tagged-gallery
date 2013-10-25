geo-tagged-gallery
==================

Use galleria.io with Google Maps for displaying geotagged pictures as a blog
for short journeys or other trips.

To setup this Gallery, you need a Google Maps API V3 Access Code. To get this,
visit the following website:
https://developers.google.com/maps/documentation/javascript/tutorial

The API Access Code must be written to index.html at the
[API_KEY_HERE]-Placeholder. You can also modify the side title in this file.

After that, you only must setup the gallery. Remove the sample picture from the
images/ folder and copy your pictures (currently only .jpg-files supported) to
this folder. After that run the following commands:

```
./generate_image_list.sh
./generate_thumbnails.sh
```

If your pictures not geo tagged, you can do this with:
```
./set_geotag.sh PATH LATITUDE LONGITUDE
./set_geotag.sh images/picture.JPG 59.328242209838535 18.065471649169922
```

This set the geotag of the given picture to a latitude and longitude. The
gallery only notices this after the generation of the image list (see above).

Now a configuration is needed. A sample configuration you can find in
javascript/configuration.sample.js. You can copy this file to
javascript/configuration.js and modify the content. This is a simple JSON File
which is parsed by the browser.

Now you can run your browser on index.html. No webserver or some one else
is needed.

For more information about the gallery or other themes visit http://galleria.io/
