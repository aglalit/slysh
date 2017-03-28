var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homepage', { title: 'СЛЫШЬ' });
});

router.get('/download', function(req, res, next) {
  res.render('express-albums', { title: 'Быстрые Альбомы' });
});

router.get('/express-albums', function(req, res, next) {
  res.render('express-albums', { title: 'Быстрые Альбомы' });
});

router.get('/romantic-collection', function(req, res, next) {
  res.render('romantic-collection', { title: 'Romantic Collection Vol.1' });
});

router.get('/book-cartoon', function(req, res, next) {
  res.render('book-cartoon', { title: 'Book Cartoon' });
});

router.get('/B&F/pre1', function(req, res, next) {
  res.render('B&F/pre1', { title: 'Выноска и Фрустрация - Предпредпредпилотная Серия' });
});

router.get('/kineograph', function(req, res, next) {
  res.render('book-cartoon', { title: 'Book Cartoon' });
});

router.get('/gigme', function(req, res, next) {
  res.redirect('http://192.168.2.1:3000/gigmelocal');
});

router.get('/gigmelocal', function(req, res, next) {
  res.render('gigmelocal', { title: 'Gig Me' });
});

router.get('/gigmecontroller', function(req, res, next) {
  res.render('gigmecontroller', { title: 'Gig Me Controller' });
});

// All undefined asset or api routes should return a 404
//router.get('/:url(api|auth|components|app|bower_components|assets)/*', function(req, res, next) {
//  res.render('express-albums', { title: 'Быстрые альбомы' });
//});

module.exports = router;
