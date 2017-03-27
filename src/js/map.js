var coolgradient = [
	'rgba(0, 255, 255, 0)',
	'rgba(0, 255, 255, 1)',
	'rgba(0, 191, 255, 1)',
	'rgba(0, 127, 255, 1)',
	'rgba(0, 63, 255, 1)',
	'rgba(0, 0, 255, 1)',
	'rgba(0, 0, 223, 1)',
	'rgba(0, 0, 191, 1)',
	'rgba(0, 0, 159, 1)',
	'rgba(0, 0, 127, 1)',
	'rgba(63, 0, 91, 1)',
	'rgba(127, 0, 63, 1)',
	'rgba(191, 0, 31, 1)',
	'rgba(255, 0, 0, 1)'
];
var heatmapValues = {
	7:[1,100000],
	8:[1,40000],
	9:[2,40000],
	10:[3,30000],
	11:[4,18000],
	12:[2,2000],
	13:[2,800],
	14:[3,600],
	15:[5,500],
	16:[8,500],
	17:[9,300],
	18:[12,300]
};
var heatmap, google, map, markers = [], heatmapData = [], markerstoggle = true, radiusValue = 75;

function showMarkers() {
	var zoom = map.getZoom();
	if (zoom > 14) {
		var bounds = map.getBounds()//.toString().replace(/\(/g,'').replace(/\)/g,'').replace(/ /g,'').split(',');
		markers.forEach(e=>{
		e.setMap(null);
		if(bounds.contains(e.position) && markerstoggle) e.setMap(map);
		})
		}
		document.getElementById('radiusform').value = heatmapValues[zoom][0];
		changeRadius();
		document.getElementById('intensityform').value = heatmapValues[zoom][1];
		changeIntensity();
}
function toggleHeatmap() {
	if (heatmap.getMap()) {
		document.getElementById('heatmapbutton').innerHTML = 'Включить тепловую карту';
		heatmap.setMap(null)
		}
	else {
		document.getElementById('heatmapbutton').innerHTML = 'Выключить тепловую карту';
		heatmap.setMap(map);
		}
}
function changeGradient() {

	heatmap.set('gradient', heatmap.get('gradient') ? null : coolgradient);
}
function togglePoints() {
	if (markerstoggle) {markerstoggle = false; document.getElementById('markersbutton').innerHTML = 'Включить маркеры'; markers.forEach(e=>{
	e.setMap(null)})}
else { markerstoggle = true; document.getElementById('markersbutton').innerHTML = 'Выключить маркеры'; showMarkers() }
}

function changeRadius() {
	radiusValue = parseInt(document.getElementById('radiusform').value);
	heatmap.set('radius', radiusValue*map.getZoom());
}
function changeIntensity() {
	var value = parseInt(document.getElementById('intensityform').value);
	heatmap.set('maxIntensity', value);
}

function changeOpacity() {
	heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

function initMap() {
	var mapDiv = document.getElementById('map');
	map = new google.maps.Map(mapDiv, {
		center: {
			lat: 59.950557,
			lng: 30.313425
		},
		zoom: 13
	});
	/*  layer = new google.maps.FusionTablesLayer({
		query: {
			select: 'lat',
			from: '1ceQdlSbaW24D909Wg4uHqoy66NrQhZ_ZD9KTwTL9'
		},
		styles: [{
			where: 'flats >= 100',
			markerOptions: {
				iconName: "small_red"
			}
		}, {
			where: 'flats >= 30 AND flats < 100',
			markerOptions: {
				iconName: "small_yellow"
			}
		}, {
			where: 'flats < 30',
			markerOptions: {
				iconName: "small_green"
			}
		}]
	});*/
	//layer.setMap(map);
			for (var i = 0, len = data.length; i < len; i++) {
				var coords = new google.maps.LatLng(data[i][0], data[i][1]);
				var marker = new MarkerWithLabel({
					position: coords,
					visible: true,
					draggable: true,
					id: data[i][0] + " " + data[i][1],
					title: data[i][0] + ", " + data[i][1],
					labelContent: data[i][2],
					icon: '/media/ghost_icon.png',
					map: null,
					//labelAnchor: new google.maps.Point(22, 0),
					labelClass: "labels", // the CSS class for the label
					//labelStyle: {}
				});
				var init_coords_to_drag;
				google.maps.event.addListener(marker, 'dragstart', function (event) {
					init_coords_to_drag = event.latLng.toString().replace(/\(/,'').replace(/\)/,'').split(', ').map(function(e){return parseFloat(e).toFixed(6)});
			});
				google.maps.event.addListener(marker, 'dragend', function (event) {
			alert('Изначальные координаты: ' + init_coords_to_drag + '\n' + 'Новые координаты: ' +
					event.latLng.toString().replace(/\(/,'').replace(/\)/,'').split(', ').map(function(e){return parseFloat(e).toFixed(6)}));
			});
				markers.push(marker);
				var weightedLoc = {
					location: coords,
					weight: data[i][2]
				};
				heatmapData.push(weightedLoc);
			}
			heatmap = new google.maps.visualization.HeatmapLayer({
				data: heatmapData,
				gradient: coolgradient,
				dissipating: true,
				maxIntensity: 800,
				radius: 2,
				//opacity: 0.9,
				map: map
});

	google.maps.event.addListener(map, 'idle', showMarkers);

}
window.onload = function(){
	changeRadius();
	changeIntensity();
}
