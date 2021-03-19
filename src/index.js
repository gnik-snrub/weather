import './style.sass'

async function getWeatherByCity(city) {
    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=d613739b96b6418a920153139211903&q=${city}`,
        {
            mode: 'cors'
        })
    if (response.status == 400) {
        console.log('Error - City not found')
    } else {
        const apiData = await response.json()
        const weatherData = processJson(apiData)
        console.log(weatherData)
        document.querySelector('#testout').textContent = weatherData.location + '\n' +
            weatherData.temp + ', ' +
            weatherData.feelsLike + ', ' +
            weatherData.humidity + ', ' +
            weatherData.weather + ', ' +
            weatherData.localTime
    }
}

function processJson(jsonData) {
    return  {
        location: `${jsonData.location.name}, ${jsonData.location.country}`,
        temp: `Temp: ${jsonData.current.temp_c}`,
        feelsLike:`Feels like: ${jsonData.current.feelslike_c}`,
        humidity: `Humidity: ${jsonData.current.humidity}`,
        weather: `Weather: ${jsonData.current.condition.text}`,
        localTime: `Local time: ${jsonData.location.localtime}`
    }
}

function searchbox() {
    let search = document.createElement('input')
    search.id = 'search'
    search.placeholder = 'Hit "Enter" to search~'

    let keyDown = false
    search.addEventListener('keydown', function(e) {
        if (keyDown) { return }
        keyDown = true
        if (e.key === 'Enter') {
            getWeatherByCity(search.value)
        }
    })
    search.addEventListener('keyup', function() {
        keyDown = false
    })

    document.querySelector('.content').appendChild(search)

    let output = document.createElement('span')
    output.id = 'testout'
    document.querySelector('.content').appendChild(output)
}

searchbox()
getWeatherByCity('paris')