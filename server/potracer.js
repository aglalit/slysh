function potracer(images){

var exec = require('child_process').exec,
  async = require('async'),
  util = require('util');

//!!!Notice that I am removing the file extension

async.mapSeries(
  images,
  function(image, callback) {
    //Manual
    //http://potrace.sourceforge.net/potrace.1.html
    var params = {
        input: image + ".ppm",
        output: "-o " + image + ".svg",
        extension: "--backend svg",
        resolution: "--resolution 100",
        groupsvg: "--group",
        opaque: "--opaque",
        alphamax: "--alphamax 0.2",
        curve: "--longcurve",//"--opttolerance 0.5"
        progress: "--progress"
    };
      //Simple Example
      //exec("potrace " + composer + ".bmp -o " + image + ".eps " , callback);
    exec(
      util.format("potrace " + "%s %s %s %s %s %s %s",
        params.input,
        params.output,
        params.groupsvg,
        params.extension,
        params.resolution,
        params.opaque,
        params.alphamax,
        params.curve,
        params.progress
      ), callback);
  },
  function(err, results) {
    if (err) console.error(err.message);
    else console.log(results);
  }
);
}
module.exports = potracer;
