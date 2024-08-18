const locationButton = domSelect(".loc-button");
const todayInfo = domSelect(".today-info");
const todayWeatherIcon = domSelect(".today-weather i");
const todayTemp = domSelect(".weather-temp");
const daysList = domSelect(".days-list");

const fetchCurrentWeatherData = (location) => {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&lang=es`;
    fetch(apiUrl)
    .then(response=>response.json())
    .then(data => {
        const todayWeather = data.current.condition.text;
        const todayTemperature = `${Math.round(data.current.temp_c)}°C`;
        const currentWeatherCode = data.current.condition.code;
        // If it isn't daytime and it's Clear, pick the moon as the icon
        const isClearNight = !data.current.is_day && currentWeatherCode == 1000;
        const todayWeatherIconCode = isClearNight ? "moon" : weatherIconMap[currentWeatherCode];

        // Also, fetch current datetime
        


        // Update UI based on received data


    })
}

fetchCurrentWeatherData("Buenos Aires");