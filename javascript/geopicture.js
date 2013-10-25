currentDay = 0;
currentDayObject = null;
animatedMarker = null;

/**
 * Source: http://stackoverflow.com/questions/8678371/how-to-convert-gps-degree-to-decimal-and-vice-versa-in-jquery-or-javascript-and
 */
function getDMS2DD(days, minutes, seconds, direction) {
	direction.toUpperCase();
	var dd = days + minutes/60 + seconds/(60*60);
	if (direction == "S" || direction == "W") {
		dd = dd*-1;
	} // Don't do anything for N or E
	return dd;
}

/**
 * Example: 58 deg 55' 23.85" N
 */
function getDMS2DDString(parseableString) {
	parts = parseableString.split(' ');
	return getDMS2DD(parseInt(parts[0]), parseInt(parts[2]), parseFloat(parts[3]), parts[4]);
}

markers = [];

function resizeDivs() {
	var $windowHeight = window.innerHeight;
	$('#pictures').height($windowHeight*3/5);
	$('#content').height($windowHeight*2/5-$('#navigation').height()-10);
	$('#imprint').height($windowHeight*2/5-$('#navigation').height()-10);
	$('#map').height($windowHeight);
}

window.onresize = function () {
	resizeDivs();
	Galleria.loadTheme('javascript/galleria/themes/classic/galleria.classic.js');
}

$(document).ready( function() {
	resizeDivs();

	$('#imprint').append(conf.imprint);
	$('#navigationList').append('<li>' + conf.day.title + '</li>');
	for (var i = 0; i < conf.day.count; i++) {
		$('#navigationList').append('<li onclick="setDay(this);" class="navigation-entry" id="navigation-entry-' + i + '">' + (i + conf.day.offset) + '</li>');
	}

	window.setTimeout(function () {
		setDay( document.getElementById('navigation-entry-0'));
		resizeDivs();
	}, 1000);

	var mapOptions = {
		center: new google.maps.LatLng(conf.map.center.latitude, conf.map.center.longitude),
		zoom: conf.map.zoom,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map"), mapOptions);

	// Initialize pictures
	$.getJSON('images.json', function (pictures) {
		for (i = 0; i < pictures.length; i++) {
			if (pictures[i].GPSLatitude != null && pictures[i].GPSLongitude != null) {
				var latitude = getDMS2DDString(pictures[i].GPSLatitude);
				var longitude = getDMS2DDString(pictures[i].GPSLongitude);
				var timestamp = pictures[i].CreateDate.replace(/:/g, '-').split(' ');
				var pictureDate = timestamp[0];
				var clockParts = timestamp[1].split('-');
				var clock = (parseInt(clockParts[0])*60+parseInt(clockParts[1]))*60+parseInt(clockParts[2]);
				var dayNum = conf.days.indexOf(pictureDate);
				var $md5 = MD5(pictures[i].SourceFile);

				if (conf.pictures[dayNum] == undefined) conf.pictures[dayNum] = [];

				conf.pictures[dayNum].push({
					image: 'cache/image/' + $md5 + '.jpg',
					big: pictures[i].SourceFile,
					thumbnail: 'cache/thumbnail/' + $md5 + '.jpg',
					title: timestamp[1].replace(/-/g, ':'),
					description: '',
					latitude: latitude,
					longitude: longitude,
					clock: clock
				});
			}
		}

		for (var i in conf.pictures) {
			conf.pictures[i].sort(function (a,b) {
				return a.clock > b.clock;
			});
		}

		Galleria.loadTheme('javascript/galleria/themes/classic/galleria.classic.js');
		Galleria.ready(function(options) {
			this.bind('image', function(e) {
				if (animatedMarker != null) {
					animatedMarker.setAnimation(null);
				}

				animatedMarker = conf.pictures[currentDay][e.index].marker;
				animatedMarker.setAnimation(google.maps.Animation.BOUNCE);
			});
		});
		Galleria.run('#pictures', {
			dataSource: [],
			extend: function(options) {
				this.bind('image', function(e) {
					$(e.imageTarget).click(this.proxy(function() {
						this.enterFullscreen();
					}));
				});
			}
		});
	});

});

function setDay(dayObject) {
	if (currentDayObject != null) {
		$(currentDayObject).removeClass('current');
	}
	currentDayObject = dayObject;
	$(dayObject).addClass('current');
	day = parseInt($(dayObject).html())-conf.day.offset;
	currentDay = day;

	var picturesList = conf.pictures[day];

	if (picturesList == undefined) {
		picturesList = [];
	}

	$('#content').html(conf.content[day]);

	for (var i=0; i < markers.length; i++) {
		markers[i].setMap(null);
	}

	Galleria.get(0).load( picturesList);

	for (var i=0; i < picturesList.length; i++) {
		// Markers
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(picturesList[i].latitude, picturesList[i].longitude),
			map: map,
			title: ''
		});
		marker.setMap(map);
		marker.galleriaIndex = i;
		google.maps.event.addListener(marker, 'click', function () {
			Galleria.get(0).show(this.galleriaIndex);
		});
		markers.push(marker);
		conf.pictures[day][i].marker = marker;
	}

	if (conf.paths[day] != undefined) {
		for (var j=0; j < conf.paths[day].length; j++) {
			mapCoords = [];
			for (var i=0; i < conf.paths[day][j].coords.length; i++) {
				mapCoords[i] = new google.maps.LatLng(conf.paths[day][j].coords[i][0], conf.paths[day][j].coords[i][1]);
			}
                
			var mapPath = new google.maps.Polyline({
				path: mapCoords,
				geodesic: true,
				strokeColor: conf.colors[conf.paths[day][j].colors],
				strokeOpacity: 1.0,
				strokeWeight: 2
			});
			
			mapPath.setMap(map);
			markers.push(mapPath);
		}
	}
}

