const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoibWlhZC1oYXNhbiIsImEiOiJjazh6dXBtdXExd3QyM2dxc2R5bXZ2eWg0In0.kcEN7_j2SNB4a8_q7VcKDA&limit=1';

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to server! Please check your internet.', undefined);
        } else if (!body || body.features.length == 0) {
            callback('Unable to find the location! Try another search.', undefined);
        } else { 
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const location = body.features[0].place_name;
            const data = {
                latitude,
                longitude,
                location
            }
            callback(undefined, data);
        }
    })
}

module.exports = geocode;