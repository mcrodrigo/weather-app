const cityForm = document.querySelector('[data-js="change-location"]')
const weatherContainer = document.querySelector('[data-js="weather-container"]')

const showWeatherContainer = element => {
    if (element.classList.contains('d-none')) {
        element.classList.remove('d-none')
    }
}

const setTimeSrc = (element, timeOfDay) => {
    const dayOrNight = (timeOfDay) ? 'day' : 'night'
    element.setAttribute('src',`/src/${dayOrNight}.svg`)
}

const setTimeIcon = (element, icon) => {
    element.innerHTML = `<img src="/src/icons/${icon}.svg">`
}

const insertDataIntoDOM = (
    LocalizedName, 
    WeatherText, 
    WeatherIcon,
    IsDayTime,
    Temperature
    ) => {

        
    const [time, timeIcon, weatherDetails] = weatherContainer.children
    const [localized, weather, temperature] = weatherDetails.children
        
    showWeatherContainer(weatherContainer)
    
    setTimeSrc(time, IsDayTime)

    setTimeIcon(timeIcon, WeatherIcon)
    
    localized.textContent = LocalizedName
    weather.textContent = WeatherText
    temperature.firstElementChild.textContent = Temperature.Metric.Value
}

const showLocalStorageCity = (cityName)=> {
localStorage.setItem('city', cityName)

}
cityForm.addEventListener('submit', async event => {
    event.preventDefault()

    const cityName = event.target.city.value

    const [{Key, LocalizedName}] = await getCityData(cityName)

    const [{
        WeatherText,
        WeatherIcon,
        IsDayTime,
        Temperature,
    }] = await getCityWeather(Key)
    
    insertDataIntoDOM(
        LocalizedName,  
        WeatherText, 
        WeatherIcon, 
        IsDayTime, 
        Temperature
    )
    event.target.reset()
})