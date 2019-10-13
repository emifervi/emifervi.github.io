const credentials = require('./credentials')
const request = require('request')

const getWeather = (place) => {
  const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${credentials.MAPBOX_TOKEN}`

  request({url:mapUrl, json:true}, (error, response, body) => {
    if(error) {
      if(error.errno === 'ENOTFOUND'){
        return console.log('No se pudo conectar con MapBox');
      } else {
        return console.log('Se produjo un error no conocido');
      }
    }
    if(response.statusCode >= 400) {
      return console.log(body.message);
    }
    const location = body.features[0]
    const long = location.center[0]
    const lat = location.center[1]

    const weatherUrl = `https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${lat},${long}?lang=es&units=si`

    request({url:weatherUrl, json:true}, (error, response, body) => {
      if(error) {
        if(error.errno === 'ENOTFOUND'){
          return console.log('No se pudo conectar con Dark Sky');
        } else {
          return console.log('Se produjo un error no conocido');
        }
      }
      if(response.statusCode >= 400) {
        return console.log(body.error);
      }
      const temp = body.currently.temperature
      const sumary = body.currently.summary
      const precipProb = body.currently.precipProbability
      console.log(sumary + ". Actualmente esta a " + temp + "°C" + ". Hay " + precipProb * 100 + "% de posibilidad de lluvia.");
    });
  });
}

module.exports = {
  getWeather : getWeather
}