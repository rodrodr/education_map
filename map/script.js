// 'use strict';
//var sidebar = document.getElementById('sidebar');

var levels = [{
  group: 'less_than_hs',
  hex: "#e41a1c"
}, {
  group: 'high_school',
  hex: '#ff7f00'
}, {
  group: 'some_college',
  hex: '#ffff33'
}, {
  group: 'bachelors',
  hex: '#4daf4a'
}, {
  group: 'graduate',
  hex: '#377eb8'
}]; 

mapboxgl.accessToken = 'pk.eyJ1Ijoia3dhbGtlcnRjdSIsImEiOiJMRk9JSmRvIn0.l1y2jHZ6IARHM_rA1-X45A';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kwalkertcu/cih5b786j002y9sm5cvekwiwx',
    zoom: 12,
    maxZoom: 14.5, 
    minZoom: 3, 
    hash: true,
    center: [-122.447303, 37.753574]
});



// Function to determine current map bounds
function current_bounds() {
  var bounds = map.getBounds(); 
  var sw = bounds.getSouthWest(); 
  var ne = bounds.getNorthEast(); 
  // Return an array of sw and ne screen coordinates
  return [map.project(sw), map.project(ne)]; 
}

// Function to figure out current layer id by zoom level
function current_layer() {
  var zm = map.getZoom(); 
  if (zm >= 11) {
    return "education-25"; 
  } else if (zm >= 9 && zm < 11) {
    return "education-50"; 
  } else if (zm >= 7 && zm < 9) {
    return "education-100"; 
  } else if (zm >= 5 && zm < 7) {
    return "education-200"; 
  } else {
    return "education-500"; 
  }
} 

function get_percentages() {
  var all = map.queryRenderedFeatures(current_bounds(),
            {layers: [current_layer()]}); 
  var total = all.length; 
  var arr = levels.map(function(x) {
    var q = map.queryRenderedFeatures(current_bounds(),
        {layers: [current_layer()],
         filter: ["==", "level", x.group]}); 
     var prop = q.length / total; 
     var pct =  100 * (Math.round(prop * 10000) / 10000); 
     if (x.group == "less_than_hs") {
       var name = "Less than HS"; 
     } else if (x.group == "high_school") {
       var name = "High school"; 
     } else if (x.group == "some_college") {
       var name = "Some college"; 
     } else if (x.group == "bachelors") {
       var name = "Bachelor's"; 
     } else if (x.group == "graduate") {
       var name = "Graduate"; 
     }
     return {Level: name, Percent: pct}; 
  }); 
  return arr; 
} 

map.on('load', function () {

  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    }
    }));
    
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');

    map.addLayer({
        'id': 'education-25',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://kwalkertcu.axti0hkv'
        },
        'source-layer': 'us_25-3hrc4o',
        'minzoom': 11,
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
                'base': 1.2,
                'stops': [[12, 1.5], [22, 10]]
            },
            // color circles by ethnicity, using data-driven styles
            'circle-color': {
                property: 'level',
                type: 'categorical',
                stops: [
                    ['high_school', '#ff7f00'],
                    ['some_college', '#ffff33'],
                    ['bachelors', '#4daf4a'],
                    ['graduate', '#377eb8'],
                    ['less_than_hs', '#e41a1c']]
            }
        }
    }, 'waterway-label');
    map.addLayer({
        'id': 'education-50',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://kwalkertcu.9bi985cx'
        },
        'source-layer': 'us_50-7r80sd',
        'minzoom': 8,
        'maxzoom': 10.99999,
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
                'base': 1,
                'stops': [[9, 1], [11, 1.5]]
            },
            // color circles by ethnicity, using data-driven styles
            'circle-color': {
                property: 'level',
                type: 'categorical',
                stops: [
                    ['high_school', '#ff7f00'],
                    ['some_college', '#ffff33'],
                    ['bachelors', '#4daf4a'],
                    ['graduate', '#377eb8'],
                    ['less_than_hs', '#e41a1c']]
            }
        }
    }, 'waterway-label');
    map.addLayer({
        'id': 'education-100',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://kwalkertcu.9zwidbpk'
        },
        'source-layer': 'us_100-cdaif3',
        'minzoom': 7,
        'maxzoom': 8.99999,
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
                'base': 0.7,
                'stops': [[7, 0.7], [9, 1]]
            },
            // color circles by ethnicity, using data-driven styles
            'circle-color': {
                property: 'level',
                type: 'categorical',
                stops: [
                    ['high_school', '#ff7f00'],
                    ['some_college', '#ffff33'],
                    ['bachelors', '#4daf4a'],
                    ['graduate', '#377eb8'],
                    ['less_than_hs', '#e41a1c']]
            }
        }
    }, 'waterway-label');
    map.addLayer({
        'id': 'education-200',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://kwalkertcu.0oie1o0m'
        },
        'source-layer': 'us_200-7cb4an',
        'minzoom': 5,
        'maxzoom': 6.99999,
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
                'base': 0.5,
                'stops': [[5, 0.5], [7, 0.7]]
            },
            // color circles by ethnicity, using data-driven styles
            'circle-color': {
                property: 'level',
                type: 'categorical',
                stops: [
                    ['high_school', '#ff7f00'],
                    ['some_college', '#ffff33'],
                    ['bachelors', '#4daf4a'],
                    ['graduate', '#377eb8'],
                    ['less_than_hs', '#e41a1c']]
            }
        }
    }, 'waterway-label');
    map.addLayer({
        'id': 'education-500',
        'type': 'circle',
        'source': {
            type: 'vector',
            url: 'mapbox://kwalkertcu.58g5eb3a'
        },
        'source-layer': 'us_500-dwxss6',
        'minzoom': 3,
        'maxzoom': 4.99999,
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
                'base': 0.3,
                'stops': [[3, 0.3], [5, 0.5]]
            },
            // color circles by ethnicity, using data-driven styles
            'circle-color': {
                property: 'level',
                type: 'categorical',
                stops: [
                    ['high_school', '#ff7f00'],
                    ['some_college', '#ffff33'],
                    ['bachelors', '#4daf4a'],
                    ['graduate', '#377eb8'],
                    ['less_than_hs', '#e41a1c']]
            }
        }
    }, 'waterway-label');

  var data = get_percentages();

  var svg = dimple.newSvg("#d3chart", 300, 300);

  var mychart = new dimple.chart(svg, data);
  // mychart.setBounds(75, 30, 300, 300);
  
  mychart.setMargins(10, 10, 10, 40); 
  
  // Customize the x axis
  var x = mychart.addMeasureAxis("x", "Percent");
  
  x.showGridlines = false; 
  x.title = "Percent of total"; 
  x.overrideMax = 50; 
  
  // Customize the y axis
  var y = mychart.addCategoryAxis("y", "Level");
  
  // y.addOrderRule("Percent", false); 
  
  y.addOrderRule(["Less than HS", "High school", "Some college", "Bachelor's", "Graduate"]);
  
  y.hidden = true; 

  mychart.addSeries("Level", dimple.plot.bar);
  mychart.assignColor("Less than HS", "#e41a1c");
  mychart.assignColor("High school", "#ff7f00");
  mychart.assignColor("Some college", "#ffff33");
  mychart.assignColor("Bachelor's", "#4daf4a");
  mychart.assignColor("Graduate", "#377eb8");
  mychart.draw(); 
  
  // y.shapes.selectAll("*").attr("fill", "white"); 
  x.shapes.selectAll("*").attr("fill", "white"); 
  x.titleShape.attr("fill", "white"); 
  x.shapes.selectAll("*").style("font-family", "Open Sans"); 
  x.titleShape.style("font-size", "103%"); 
  x.titleShape.style("font-family", "Open Sans"); 
  
  // Re-draw the chart when the user moves on the map
  map.on('moveend', function() {

    mychart.data = get_percentages();
    mychart.draw(1000);
    // y.shapes.selectAll("*").attr("fill", "white"); 
    x.shapes.selectAll("*").attr("fill", "white"); 
    x.titleShape.attr("fill", "white"); 
    x.shapes.selectAll("*").style("font-family", "Open Sans"); 
    x.titleShape.style("font-size", "103%"); 
    x.titleShape.style("font-family", "Open Sans"); 

  });
  
 /* map.on('load', function() {
    mychart.data = get_percentages();
    mychart.draw(1000);
    y.shapes.selectAll("*").attr("fill", "white"); 
    x.shapes.selectAll("*").attr("fill", "white"); 
    x.titleShape.attr("fill", "white"); 
    
  }); 

*/

});