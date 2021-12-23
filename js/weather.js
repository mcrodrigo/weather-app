const APIKey = 'IiojVZuWNMJ1k64UyvWA0t3ixf9QZne2'
const baseUrl = 'https://dataservice.accuweather.com/'

const getCityUrl = cityName => 
    `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}&language=pt-br`

const getWeatherUrl = Key => 
    `${baseUrl}currentconditions/v1/${Key}?apikey=${APIKey}&language=pt-br`

const fetchData = async url => {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('Não foi possível obter os dados')
        }

        return response.json()

    } catch ({name, message}) {
        console.log(name, message);
    }
}

const getCityData = cityName => fetchData(getCityUrl(cityName))

const getCityWeather = cityKey => fetchData(getWeatherUrl(cityKey))
