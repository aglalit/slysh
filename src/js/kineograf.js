/*
Functions' params:
  drawSVG(svg_fill_color, svg_stroke_weight, svg_stroke_color, svg_scale);
  getSVG(paths) (pass an array of paths as argument);
  scaleCoords(coords_array, coordsFactor);
  changeFrames(interval);
*/
// Main kineograf functions:

//fast random() implementation
for (var r = 10000, randomTable = []; r--;) {
  randomTable.push(Math.random() - 0.5);
}

function lookup() {
  return ++r >= randomTable.length ? randomTable[r = 0] : randomTable[r];
}

/*
SVG drawing functions
*/

var svgs = [];
var frame_counter;
var loaded;
// Load SVG files (pass an array of paths as argument)
function getSVG(paths) {
  var path_arr = [];
  for (var n = 0; n < paths[1]; n++) {
    path_arr.push(paths[0] + '.svg');
  }
  path_arr.forEach(function(path) {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', path, true);
    ajax.send();
    ajax.onload = function(e) {
      /*for (var i=0;i<ajax.responseXML.getElementsByTagName('path').length;i++){
        convertToAbsolute(ajax.responseXML.getElementsByTagName('path')[i]);
      }*/
      svgs.push(ajax.responseXML);
      frame_counter = svgs.length;
      loaded = true;
    };
  });

}

// Convert relative paths to absolute

function convertToAbsolute(path) {
  var x0, y0, x1, y1, x2, y2, segs = path.pathSegList;
  for (var x = 0, y = 0, i = 0, len = segs.numberOfItems; i < len; ++i) {
    var seg = segs.getItem(i),
      c = seg.pathSegTypeAsLetter;
    if (/[MLHVCSQTA]/.test(c)) {
      if ('x' in seg) x = seg.x;
      if ('y' in seg) y = seg.y;
    } else {
      if ('x1' in seg) x1 = x + seg.x1;
      if ('x2' in seg) x2 = x + seg.x2;
      if ('y1' in seg) y1 = y + seg.y1;
      if ('y2' in seg) y2 = y + seg.y2;
      if ('x' in seg) x += seg.x;
      if ('y' in seg) y += seg.y;
      switch (c) {
        case 'm':
          segs.replaceItem(path.createSVGPathSegMovetoAbs(x, y), i);
          break;
        case 'l':
          segs.replaceItem(path.createSVGPathSegLinetoAbs(x, y), i);
          break;
        case 'h':
          segs.replaceItem(path.createSVGPathSegLinetoHorizontalAbs(x), i);
          break;
        case 'v':
          segs.replaceItem(path.createSVGPathSegLinetoVerticalAbs(y), i);
          break;
        case 'c':
          segs.replaceItem(path.createSVGPathSegCurvetoCubicAbs(x, y, x1, y1, x2, y2), i);
          break;
        case 's':
          segs.replaceItem(path.createSVGPathSegCurvetoCubicSmoothAbs(x, y, x2, y2), i);
          break;
        case 'q':
          segs.replaceItem(path.createSVGPathSegCurvetoQuadraticAbs(x, y, x1, y1), i);
          break;
        case 't':
          segs.replaceItem(path.createSVGPathSegCurvetoQuadraticSmoothAbs(x, y), i);
          break;
        case 'a':
          segs.replaceItem(path.createSVGPathSegArcAbs(x, y, seg.r1, seg.r2, seg.angle, seg.largeArcFlag, seg.sweepFlag), i);
          break;
        case 'z':
        case 'Z':
          x = x0;
          y = y0;
          break;
      }
    }
    // Record the start of a subpath
    if (c == 'M' || c == 'm') x0 = x, y0 = y;
  }
}

// Draw SVG (without lines yet)
function drawSVG(svg_fill_color, svg_stroke_weight, svg_stroke_color, svg_scale) {
  if (loaded) {
    var frame = svgs.length - frame_counter;
    if (svg_scale) scale(svg_scale[0], svg_scale[1]);
    strokeWeight(svg_stroke_weight || 1);
    stroke(svg_stroke_color || 0, 0, 0);
    for (p = 0; p < svgs.length; p++) {
      var paths = svgs[p].getElementsByTagName('path');
      //noStroke();

      for (j = 0; j < paths.length; j++) {
        var path_coords = paths[j].getAttribute('d').replace(/M/g, 'M ').replace(/z/g, ' Z').replace(/L/g, ' L ').replace(/C/g, ' C ').split(' ');
        if (paths[j].getAttribute('style')) fill(paths[j].getAttribute('style').split(';')[0].split(':')[1]);
        else if (svg_fill_color == 'noFill') noFill();
        else fill(svg_fill_color);
        beginShape();
        for (var i = 0; i < path_coords.length; i++) {
          switch (path_coords[i]) {
            case 'M':
              {
                i++;
                vertex(+path_coords[i] + random(-gap, gap), +path_coords[i + 1] + random(-gap, gap));
                i++;
              }
              break;
            case 'L':
              {
                i++;
                bezierVertex(+path_coords[i] + random(-gap, gap), +path_coords[i + 1] + random(-gap, gap), +path_coords[i] + random(-gap, gap), +path_coords[i + 1] + random(-gap, gap), +path_coords[i] + random(-gap, gap), +path_coords[i + 1] + random(-gap, gap));
                i++;
              }
              break;
            case 'C':
              {
                i++;
                bezierVertex(+path_coords[i], +path_coords[i + 1] + random(-gap, gap), +path_coords[i + 2] + random(-gap, gap), +path_coords[i + 3] + random(-gap, gap), +path_coords[i + 4] + random(-gap, gap), +path_coords[i + 5] + random(-gap, gap));
                i += 5;
              }
              break;
            case 'S':
              {
                i++;
                bezierVertex(+path_coords[i - 3] + random(-gap, gap), +path_coords[i - 2] + random(-gap, gap), +path_coords[i] + random(-gap, gap), +path_coords[i + 1] + random(-gap, gap), +path_coords[i + 2] + random(-gap, gap), +path_coords[i + 3] + random(-gap, gap));
                i += 3;
              }
              break;
            case 'Z':
              {
                endShape();
                if (i < path_coords.length - 1) {
                  i++;
                  beginShape();
                  vertex(+path_coords[i] + random(-gap, gap), +path_coords[i + 1] + random(-gap, gap));
                  i++;
                }
              }
              break;
          }
        }
      }
      if (svgs[frame].getElementsByTagName('polygon')) {
        var polygons = svgs[frame].getElementsByTagName('polygon');
        for (var k = 0; k < polygons.length; k++) {
          var polygon_coords = polygons[k].getAttribute('points').split(' ');
          if (svg_fill_color == 'noFill') noFill();
          else if (!polygons[k].getAttribute('fill')) noFill();
          else fill(svg_fill_color || polygons[k].getAttribute('fill'));
          beginShape();
          for (var m = 0; m < polygon_coords.length; m++) {
            vertex(+polygon_coords[m].split(',')[0] + randomize(), +polygon_coords[m].split(',')[1] + random(-gap, gap));
          }
          endShape();
        }
      }
      if (svgs[frame].querySelector('line')) {
        var line_coords = svgs[frame].querySelector('line');
        if (svg_fill_color == 'noFill') noFill();
        else fill(svg_fill_color || svg.querySelector('line').getAttribute('fill'));
        line(line_coords.getAttribute('x1'), line_coords.getAttribute('y1'), line_coords.getAttribute('x2'), line_coords.getAttribute('y2'));
      }
    }
  }
}

// Scale object's relative coords without scaling strokeWeight (as it is in p5.js scale() function):
function scaleCoords(coords_array, coordsFactor) {
  coords_array = coords_array.map(function(e) {
    e[0] *= coordsFactor;
    e[1] *= coordsFactor;
    return e;
  });
  return coords_array;
}

/*function changeFrames(interval){
  setInterval(function() {
  if (frame_counter > 1) frame_counter--;
  else frame_counter = svgs.length;
  }, interval);
}*/
