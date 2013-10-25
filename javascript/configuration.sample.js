conf = {
	day: {
		title: 'Day',
		count: 1,
		offset: 1,
	},
	map: {
		center: {
			latitude: 59.32893000000001,
			longitude: 18.064910000000054
		},
		zoom: 9
	},
	days: [
		'2013-10-13',
	],
	content: [
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam gravida nisl vitae molestie fringilla. Nulla nibh mauris, lobortis eget leo in, mollis feugiat urna. Nullam ornare nibh id nibh dapibus sagittis. Nulla sed diam enim. Suspendisse lobortis congue diam, vitae ornare nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam at lacus elit.'
	],
	colors: [
		'#ff0000', // 0 Walk
		'#00ff00', // 1 Train
		'#0000ff', // 2 Flight
		'#ffff00', // 3 Bus
	],
	paths: [
		[
			{ /* Flight */
				coords: [
					[52.363860434566206,	13.508377075195312],
					[59.644022114099144,	17.938613891601562],
				],
				colors: 2
			},
			{ /* Train */
				coords: [
					[59.644022114099144,	17.938613891601562],
					[59.3322416990733,	18.056175112724304],
				],
				colors: 1
			},
			{ /* Walk */
				coords: [
					[59.3322416990733,	18.056175112724304],
					[59.33251531492923,	18.057602047920227],
					[59.328454629339504,	18.06130349636078 ],
					[59.328202872748214,	18.06305229663849 ],
					[59.32840434658242,	18.064173460006714],
					[59.32805407551633, 	18.065460920333862],
					[59.32847002200535,	18.066855669021606],
					[59.32683904477263,	18.06855082511902 ],
					[59.326882830418846,	18.06855082511902 ],
					[59.32795556112847,	18.072928190231323],
					[59.32525177700791,	18.07625412940979 ],
					[59.321792371114,	18.074194192886353],
					[59.320336250053735,	18.0734646320343  ],
					[59.31757505975474,	18.08896780014038 ],
					[59.316458202355705,	18.094847202301025],
					[59.31545080930832,	18.09519052505493 ],
					[59.315518562901985,	18.08376431465149 ],
					[59.314027268241944,	18.071715831756592],
					[59.30607213556159,	18.075814247131348],
					[59.2991928886946,	18.08173656463623 ]
				],
				colors: 0
			},
			{ /* Bus */
				coords: [
					[59.2991928886946,	18.08173656463623 ],
					[59.24401622593946,	18.229762315750122],
				],
				colors: 3
			},
		],
	],
	pictures: {},
	imprint: "<strong>Signs</strong><br />" + 
			"<span style='background-color:#ff0000'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Walk<br />" +
			"<span style='background-color:#00ff00'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Train<br />" +
			"<span style='background-color:#0000ff'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Flight<br />" +
			"<span style='background-color:#ffff00'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Bus<br />"
};

