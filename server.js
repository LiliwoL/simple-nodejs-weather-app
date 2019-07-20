const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

// Clé API fournie par OpenWeatherMap
const apiKey = 'ca18014071190091d4be752b98e34330';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Erreur... Veuillez réessayer'});
    } else {
      let weather = JSON.parse(body)

      // Debug in console
      console.log (weather)

      // Liste des informations renvoyées
      // https://openweathermap.org/current#name

      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Erreur... Veuillez réessayer'});
      } else {
        let weatherText = `Il fait actuellement ${weather.main.temp} °C à ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('***************************************')
  console.log('Rendez vous sur http://localhost:3000 !')
  console.log('***************************************')
})
