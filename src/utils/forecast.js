const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + encodeURIComponent(lat) +
                '&lon=' + encodeURIComponent(lon) + '&APPID=d4b3e17f30d0bccf925962a3ccf15591';

    request({ url, json: true}, (error, { body } = {}) => { //object destructring is used
        if (error) {
            callback('Unable to connect to server!', undefined);
        } else if (!body.current) {
            callback('Unable to find the location!', undefined);
        } else { 
            const temparature = body.current.temp - 273.15;
            const sunRise = (new Date(body.current.sunrise * 1000)).toLocaleTimeString();
            const sunSet = (new Date(body.current.sunset * 1000)).toLocaleTimeString();
            const data = {
                temparature,
                sunRise,
                sunSet
            }
            callback(undefined, data);
        }
    })
}

module.exports = forecast;