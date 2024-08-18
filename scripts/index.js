const fetchCurrentWeatherData = (location) => {
    const locationButton = domSelect(".loc-button");
    const todayInfo = domSelect(".today-info");
    const todayWeatherIcon = domSelect(".today-weather i");
    const todayTemp = domSelect(".weather-temp");
    const daysList = domSelect(".days-list");
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&lang=es`;
    const locationEl = domSelect('.today-info > div > span');
    const currentWeatherDescription = domSelect(".today-weather h3");
    fetch(apiUrl)
    .then(response=>response.json())
    .then(data => {
        const todayWeather = data.current.condition.text;
        const todayTemperature = `${Math.round(data.current.temp_c)}°C`;
        const currentWeatherCode = data.current.condition.code;
        // If it isn't daytime and it's Clear, pick the moon as the icon
        const isClearNight = !data.current.is_day && currentWeatherCode == 1000;
        const todayWeatherIconCode = isClearNight ? "moon" : weatherIconMap[currentWeatherCode];

        // Update weekday, date, and current location
        todayInfo.querySelector('h2').textContent = new Date().toLocaleDateString('es-AR', {
            weekday: 'long'
        });
        todayInfo.querySelector('span').textContent = new Date().toLocaleDateString('es-AR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        locationEl.textContent = data.location.name;
        
        // Update weather description
        todayWeatherIcon.className = `bx bx-${todayWeatherIconCode}`;
        todayTemp.textContent = todayTemperature;
        currentWeatherDescription.textContent = data.current.condition.text;
        

    })
}

// fetchCurrentWeatherData("Buenos Aires"); 