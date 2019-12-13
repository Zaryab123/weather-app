const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#one')
const messageTwo = document.querySelector('#two')
const messageThree = document.querySelector('#three')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value

    if (address) {
        messageOne.textContent = 'loading...'
        messageTwo.textContent = ''
        messageThree.textContent = ''
        fetch('/weather?address=' + address)
            .then((response) => {
                response.json()
                    .then((data) => {
                        if (data.error) {
                            messageOne.textContent = data.error
                        } else {
                            messageOne.textContent = 'Location:    ' + data.Location
                            messageTwo.textContent = 'Forecast:    ' + data.Summary
                            messageThree.textContent = 'Temperature: ' + data.Temperature + 'C'
                        }
                    })
            })

    } else {
        messageOne.textContent = 'No address provided'
    }
})