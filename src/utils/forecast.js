const request = require('request')


const forecast = (latitude, longitude, callback) => {
    
    const url = 'https://api.darksky.net/forecast/0a44b2d089f45c3f7ed8648a315775ff/'+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude) +'?units=si'

    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to connect to weather api',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            const data = body
            const temp = {
                summary: data.currently.summary,
                temperature: data.currently.temperature,
                cloud_Cover: data.currently.cloudCover
            }
            callback(undefined,temp)
        }
    })
}

module.exports = forecast