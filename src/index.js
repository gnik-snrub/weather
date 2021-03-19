import './style.sass'

async function getWeatherByCity(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=79000ca5329e6de29a91aff757bde56a`, { mode: 'cors' })
    if (response.status == 404) {
        console.log('Error - City not found')
    } else {
        const weatherData = await response.json()
        console.log(weatherData)
    }
}