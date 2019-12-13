const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()

//Setting up port through env variable
const port = process.env.PORT || 3000


//Setting up templating engine
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../template/views'))

//Setting up partials
hbs.registerPartials(path.join(__dirname, '../template/partials'))

//static path
app.use(express.static(path.join(__dirname, '../public')))

//Serving template pages
app.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Zaryab Raza Malghani'
    })
})

app.get('/about', (req, res, next) => {
    res.render('about', {
        title: 'About Me',
        name: 'Zaryab Raza Malghani'
    })
})

app.get('/help', (req, res, next) => {
    res.render('help', {
        title: 'Help',
        name: 'Zaryab Raza Malghani'
    })
})

app.get('/help/*', (req, res) => {
    res.render('help_404', {
        title: 'Help page not found'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            'error': 'No address provided...'
        })
    } else {
        geocode(req.query.address, (error, { Latitude, Longitude, Location }={}) => {
            if (Latitude && Longitude) {
                forecast(Latitude, Longitude, (error, { summary, temperature, cloud_Cover }={}) => {
                    if (error) {
                        return res.send(error)
                    } else {
                        return res.send({
                            Location,
                            Summary: summary,
                            Temperature: temperature,
                            Cover: cloud_Cover
                        })
                    }
                })
            } else {
                return res.send({ 'Error: ': error })
            }
        })
    }
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404, PAGE NOT FOUND'
    })
})



app.listen(port, () => {
    console.log('Server Working...')
})