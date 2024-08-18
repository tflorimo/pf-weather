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
        const currentData = data.current;
        const todayWeather = currentData.condition.text;
        const todayTemperature = `${Math.round(currentData.temp_c)}°C`;
        const currentWeatherCode = currentData.condition.code;
        // If it isn't daytime and it's Clear, pick the moon as the icon
        const isClearNight = !currentData.is_day && currentWeatherCode == 1000;
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
        
        // Update weather information, leftside
        todayWeatherIcon.className = `bx bx-${todayWeatherIconCode}`;
        todayTemp.textContent = todayTemperature;
        currentWeatherDescription.textContent = todayWeather;
        
        // Update current weather information, rightside
        const feelsLike = `${Math.round(currentData.feelslike_c)}°C`;
        const precipitation = `${currentData.precip_mm} mm`;
        const humidity = `${currentData.humidity} %`;
        const winds = `${currentData.wind_dir} - ${Math.round(currentData.wind_kph)} km/h`;
        const uv = Math.round(currentData.uv);
        const visibility = `${Math.round(currentData.vis_km)} km`;

        const dayInfo = domSelect(".day-info");
        dayInfo.innerHTML = `
                <div>
                    <span class="title">SENSACIÓN TÉRMICA</span>
                    <span class="value">${feelsLike}</span>
                </div>
                <div>
                    <span class="title">PRECIPITACIONES</span>
                    <span class="value">${precipitation}</span>
                </div>
                <div>
                    <span class="title">HUMEDAD</span>
                    <span class="value">${humidity}</span>
                </div>
                <div>
                    <span class="title">VIENTOS</span>
                    <span class="value">${winds}</span>
                </div>
                <div>
                    <span class="title">ÍNDICE UV</span>
                    <span class="value">${uv}</span>
                </div>
                <div>
                    <span class="title">VISIBILIDAD</span>
                    <span class="value">${visibility}</span>
                </div>
        `;
    })
}

// fetchCurrentWeatherData("Buenos Aires"); 