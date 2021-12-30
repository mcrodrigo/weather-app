const cityForm = document.querySelector('[data-js="change-location"]')
const weatherContainer = document.querySelector('[data-js="weather-container"]')
const time = document.querySelector('[data-js="time"]')
const timeIcon = document.querySelector('[data-js="time-icon"]')
const city = document.querySelector('[data-js="city"]')
const weather = document.querySelector('[data-js="weather"]')
const temperature = document.querySelector('[data-js="temperature"]')

const showWeatherContainer = () => {
    if (weatherContainer.classList.contains('d-none')) {
        weatherContainer.classList.remove('d-none')
    }
}

const showCityWeatherInfo = async cityName => {
    const [{ Key, LocalizedName }] = await getCityData(cityName)

    const [{
        WeatherText,
        WeatherIcon,
        IsDayTime,
        Temperature,
    }] = await getCityWeather(Key)

    time.src = IsDayTime ? '/src/day.svg' : '/src/night.svg'
    timeIcon.innerHTML = `<img src="/src/icons/${WeatherIcon}.svg">`
    city.textContent = LocalizedName
    weather.textContent = WeatherText
    temperature.textContent = Temperature.Metric.Value

    showWeatherContainer()
}

const showLocalStorageCity = () => {
    const city = localStorage.getItem('lastCitySearched')

    if (city) {
        showCityWeatherInfo(city)
    }
}

cityForm.addEventListener('submit', event => {
    event.preventDefault()

    const inputValue = event.target.city.value

    showCityWeatherInfo(inputValue)

    localStorage.setItem('lastCitySearched', inputValue)

    event.target.reset()
})

showLocalStorageCity()