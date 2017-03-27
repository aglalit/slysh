(function() {
  "use strict";

  const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    env = process.env,
    contentTypes = {
      'html': 'text/html',
      'css': 'text/css',
      'tag': 'text/html',
      'ico': 'image/x-icon',
      'png': 'image/png',
      'svg': 'image/svg+xml'
    };

  var express = require('express');
  var router = express.Router();
  var routes = require('./server/routes.js');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var compression = require('compression');

  let app = express();

  //openshift health app test
  app.get('/health', function(req, res) {
    res.writeHead(200);
    res.end();
  });

  app.use(compression({
  threshold: 0,
  filter: function () { return true; },
  level: -1
}));
  app.use('/', routes);
  app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(logger('dev'));
  app.use(express.static(path.join(__dirname, 'public')));

  var ipaddress = env.NODE_IP || '192.168.2.1';
  var port = env.NODE_PORT || 3000;
  app.listen(port, ipaddress, function() {
    console.log(`Application worker ${process.pid} started...`);
  });
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  // error handlers
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    res.render('404');
    err.status = 404;
    next(err);
  });


  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

//   var WebSocket = require('ws'),
//   WebSocketServer = WebSocket.Server,
//   wss = new WebSocketServer({host:ipaddress, port:8000}),
//   clients = [];
//
//
//   wss.on('connection', function(ws) {
//     var client_uuid = uuidV4();
//     clients.push({"id": client_uuid, "ws": ws});
//     console.log(clients.length);
//     console.log('client [%s] connected', client_uuid);
//
//     ws.on('close', function() {
//     for(var i=0; i<clients.length; i++) {
//         if(clients[i].id == client_uuid) {
//             console.log('client [%s] disconnected', client_uuid);
//             clients.splice(i, 1);
//         }
//     }
//   });
//     ws.on('message', function(message) {
//       console.log(message);
//       clients.forEach(function(client){
//         var clientSocket = client.ws;
//         console.log('client [%s]: %s', client.id, message);
//         if (clientSocket.readyState === WebSocket.OPEN) clientSocket.send(message)})
// });
//   });

/*var addresses = fs.readFileSync('59_1_merged2.csv','utf-8').replace(/,/g, '').split('\n').slice(0,-1)//.map(e=>{return e.split(';')});
  var MultiGeocoder = require('multi-geocoder'),
      // Получаем доступ к сервису геокодирования.
      geocoder = new MultiGeocoder({
          coordorder: 'latlong',
          lang: 'ru-RU'
      });
/*var provider = geocoder.getProvider();
      provider.getText = function (point) {

    return point[0];
};*/
//console.log(addresses);
     /*geocoder.geocode(addresses)
        .then(function (res) {
          console.log(JSON.stringify(res.errors));
            var coords = [];
            var results = res.result.features;
            res.result.features.forEach(e=>{coords.push(e.properties.metaDataProperty
              .GeocoderMetaData.AddressDetails.Country.AddressLine + ';' + e.geometry.coordinates.join())});
            fs.writeFileSync('coords.csv', coords.join('\n'))
        });*/
})();
