var express         = require('express'),
    app             = express(),
    subdomain       = require('wildcard-subdomains'),
    client          = require('google-images');

app
  .set('views', './views')
  .set('view engine', 'jade')
  .use(subdomain({
    domain : 'avocado.republican',
    www : false
  }))
  .get('/', function (req, res) {
    return res.redirect(302, 'http://taco.avocado.republican');
  })
  .get('/sub/www', function (req, res) {
    return res.redirect(302, 'http://taco.avocado.republican');
  })
  .get('/sub/:subdomain', function (req, res) {
    client.search('avocado' + req.params.subdomain, function (err, images) {
      if (err) {
        return res.redirect(302, 'http://taco.avocado.republican');
      }
      return res.render('index', { term: req.params.subdomain, image: images[Math.floor(Math.random() * images.length)].url });
    });
  })
  .listen(process.env.PORT || 3000);
