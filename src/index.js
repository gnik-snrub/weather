import './style.sass'
import Loading from './loading.gif'

async function getWeatherByCity(city) {
    document.getElementById('loading').classList.toggle('hidden')
    document.getElementById('detail-wrapper').classList.add('hidden')
    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=d613739b96b6418a920153139211903&q=${city}`,
        {
            mode: 'cors'
        })
    if (response.status == 400) {
        document.getElementById('searchbox').value = 'Error - City not found'
    } else {
        const apiData = await response.json()
        const weatherData = processJson(apiData)
        injectDetails(weatherData)
        document.getElementById('detail-wrapper').classList.remove('hidden')
    }
    document.getElementById('loading').classList.toggle('hidden')
}

function processJson(jsonData) {
    return  {
        tempc: jsonData.current.temp_c,
        feelsLikec: jsonData.current.feelslike_c,
        tempf: jsonData.current.temp_f,
        feelsLikef: jsonData.current.feelslike_f,
        humidity: jsonData.current.humidity,
        weather: jsonData.current.condition.text,
        icon: jsonData.current.condition.icon,
        city: jsonData.location.name,
        country: jsonData.location.country,
        localTime: jsonData.location.localtime
    }
}

function generateDomElements() {
    backgroundVideo()

    const pageContent = document.querySelector('#content')
    loadIconArea(pageContent)

    const wrapper = document.createElement('div')
    wrapper.id = 'content-wrapper'
    weatherDetailElements(wrapper)
    searchbox(wrapper)

    pageContent.appendChild(wrapper)
}

function backgroundVideo() {
    const vid = document.createElement('iframe')
    vid.id = 'video-background'
    vid.src = `https://www.youtube.com/embed/z4yB65vh1DI?autoplay=1&mute=1&loop=1&controls=0`
    document.body.appendChild(vid)
}

function loadIconArea(parent) {
    const loading = document.createElement('img')
    loading.id = 'loading'
    loading.classList.add('hidden')
    loading.src = Loading
    parent.appendChild(loading)
}

function weatherDetailElements(parent) {
    const wrapper = document.createElement('div')
    wrapper.id = 'detail-wrapper'
    parent.appendChild(wrapper)
    locationDisplay(wrapper)
    weatherDisplay(wrapper)
}

function locationDisplay(parent) {
    const locationDisplay = document.createElement('div')
    locationDisplay.id = 'location-wrapper'
    parent.appendChild(locationDisplay)

    genericElement('time-display', 'div', locationDisplay)
    genericElement('city-display', 'div', locationDisplay)
    genericElement('country-display', 'div', locationDisplay)
}

function weatherDisplay(parent) {
    const weatherDetailsDisplay = document.createElement('div')
    weatherDetailsDisplay.id = 'weather-details-display'
    parent.appendChild(weatherDetailsDisplay)

    genericElement('temp-display', 'div', weatherDetailsDisplay)
    genericElement('feels-display', 'div', weatherDetailsDisplay)
    genericElement('humid-display', 'div', weatherDetailsDisplay)

    setToggleEvent(weatherDetailsDisplay)

    const weatherDisplay = document.createElement('div')
    weatherDisplay.id = 'weather-display-wrapper'
    weatherDetailsDisplay.appendChild(weatherDisplay)
    
    genericElement('weather-icon', 'img', weatherDisplay)
    genericElement('weather-status', 'div', weatherDisplay)
}

function setToggleEvent(parent) {
    const tempDisplay = parent.querySelector('#temp-display')
    const feelsDisplay = parent.querySelector('#feels-display')

    tempDisplay.setAttribute('data-deg', 'C')
    tempDisplay.addEventListener('click', function() {
        if (tempDisplay.getAttribute('data-deg') == 'C') {
            tempDisplay.setAttribute('data-deg', 'F')
            tempDisplay.textContent = `${tempDisplay.getAttribute('data-fahren')}º`
            feelsDisplay.textContent = `Feels like ${feelsDisplay.getAttribute('data-fahren')}º`
        } else if (tempDisplay.getAttribute('data-deg') == 'F') {
            tempDisplay.setAttribute('data-deg', 'C')
            tempDisplay.textContent = `${tempDisplay.getAttribute('data-celsius')}º`
            feelsDisplay.textContent = `Feels like ${feelsDisplay.getAttribute('data-celsius')}º`
        }
    })
}

function genericElement(id, type, parent) {
    const newElement = document.createElement(type)
    newElement.id = id
    parent.appendChild(newElement)
}

function injectDetails(jsonData) {
    document.getElementById('time-display').textContent = `Local time: ${jsonData.localTime.slice(10)}`
    document.getElementById('city-display').textContent = jsonData.city
    document.getElementById('country-display').textContent = jsonData.country

    document.getElementById('weather-icon').src = `https:${jsonData.icon}`
    document.getElementById('weather-status').textContent = jsonData.weather
    document.getElementById('humid-display').textContent = `Humidity: ${jsonData.humidity}`

    const temperature = document.getElementById('temp-display')
    temperature.setAttribute('data-fahren', jsonData.tempf)
    temperature.setAttribute('data-celsius', jsonData.tempc)

    const feelsLike = document.getElementById('feels-display')
    feelsLike.setAttribute('data-fahren', jsonData.feelsLikef)
    feelsLike.setAttribute('data-celsius', jsonData.feelsLikec)

    if (temperature.getAttribute('data-deg') == 'C') {
        temperature.textContent = `${jsonData.tempc}º`
        feelsLike.textContent = `Feels like ${jsonData.feelsLikec}º`
    } else if (temperature.getAttribute('data-deg') == 'F') {
        temperature.textContent = `${jsonData.tempf}º`
        feelsLike.textContent = `Feels like ${jsonData.feelsLike}º`
    }
}

function searchbox(parent) {
    let search = document.createElement('input')
    search.id = 'searchbox'
    search.placeholder = '~Enter to Search~'
    search.autocomplete = 'off'

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

    parent.appendChild(search)
}

generateDomElements()
getWeatherByCity('melbourne')