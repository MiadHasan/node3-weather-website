//to understand read express documentation at 'expressjs.com' in api reference
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
//If port is not provided then 3000 will be the default value
const port = process.env.PORT || 3000;
//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//setting express to work with handlebars engine
app.set('view engine', 'hbs');
//setting views location to a custom directory
app.set('views', viewsPath);

hbs.registerPartials(partialsPath)
//setting a static directory to serve for web
app.use(express.static(publicDirectoryPath));

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You should provide an valid address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
    
        forecast(latitude, longitude, (error, { temparature, sunRise, sunSet } = {}) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                location,
                temparature,
                sunRise,
                sunSet
            });
        })
    })
})

//rendering the index.hbs file to express
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Miad Hasan'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Miad Hasan'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Miad Hasan'
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Miad Hasan',
        errorMassage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Miad Hasna',
        errorMassage: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server is running on port '+ port);
})