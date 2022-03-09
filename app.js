const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log(beers[0]), res.render('beers', { b: beers });
    })
    .catch(error => {
      console.log(error), res.render('No beers!!!');
    });
});

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(beers => {
     res.render('random-beer', { beer: beers[0] });
  })
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
