import './style.sass'

async function getWeatherByCity(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=d613739b96b6418a920153139211903&q=${city}`, { mode: 'cors' })
    if (response.status == 400) {
        console.log('Error - City not found')
    } else {
        const apiData = await response.json()
        const weatherData = processJson(apiData)
        console.log(weatherData)
    }
}

function processJson(jsonData) {
    return  {
        location: `${jsonData.location.name}, ${jsonData.location.country}`,
        temp: `Temp: ${jsonData.current.temp_c}`,
        feelsLike:`Max: ${jsonData.current.feelslike_c}`,
        humidity: `Min: ${jsonData.current.humidity}`,
        weather: `Weather: ${jsonData.current.condition.text}`,
        localTime: `Local time: ${jsonData.location.localtime}`
    }
}

getWeatherByCity('paris')