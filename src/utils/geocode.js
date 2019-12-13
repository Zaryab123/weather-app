const request = require('request')


const geocode = (location, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) +
        '.json?access_token=pk.eyJ1IjoiemFyeWFicmF6YSIsImEiOiJjazQxMGY1dGgwM3lnM21wOGNiem1vdnNmIn0.QNGe78BH7cTj_nVrdxeqHQ&limit=1'

    /*
    Using destructuring to get only body from response and to assign 
    url variable to object's url property because of same name
    */
    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather api', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            const data = body
            const co_ordinates = {
                Longitude: data.features[0].center[0],
                Latitude: data.features[0].center[1],
                Location: data.features[0].place_name
            }

            callback(undefined, co_ordinates)
        }
    })
}

module.exports = geocode