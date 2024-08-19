/**
 * A wrapper for document query selector. 
 * I've just had enough of typing the same function all the time
 */
const domSelect = (selector) => {
    const element =  document.querySelector(selector);
    if(!element){
        console.warn(`[WARN] Element with selector ${selector} not found`);
    }
    return element;
}

/**
 * After the API responded with the desired information, 
 * update every UI element attached to the current day.
 */
const updateCurrentDayUI = (data) => {
    const todayInfo = domSelect(".today-info");
    const todayWeatherIcon = domSelect(".today-weather i");
    const todayTemp = domSelect(".weather-temp");
    const locationEl = domSelect('.today-info > div > span');
    const currentWeatherDescription = domSelect(".today-weather h3");

    const currentData = data.current;
    const todayWeather = currentData.condition.text;
    const todayTemperature = `${Math.round(currentData.temp_c)}°C`;
    const currentWeatherCode = currentData.condition.code;

    // If it isn't daytime and it's Clear, pick the moon as the icon
    const isClearNight = !currentData.is_day && currentWeatherCode == 1000;
    const todayWeatherIconCode = isClearNight ? "moon" : weatherIconMap[currentWeatherCode];

    // Update weekday, date, and current location
    const today = new Date().toLocaleDateString('es-AR', {
        weekday: 'long'
    });
    const capitalizedToday = capitalizeFirstLetter(today);
    todayInfo.querySelector('h2').textContent = capitalizedToday;
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
}

/**
 * Update UI elements related to forecast.
 */
const updateForecastUI = (data) => {
    const daysList = domSelect(".days-list");
    daysList.innerHTML = "";
        
    data.forEach(element => {
        const forecastWeatherIcon = weatherIconMap[element.day.condition.code];
        // Date must be created manually since we must avoid timezone issues
        const [year, month, day] = element.date.split("-");
        const correctedDate = new Date(year, month-1, day);

        const dayAbbrv = new Date(correctedDate).toLocaleDateString("es-AR", {
            weekday: "short",
        });

        const capitalDay = capitalizeFirstLetter(dayAbbrv);

        const dayMonth = new Date(correctedDate).toLocaleDateString("es-AR", {
            day: "2-digit",
            month:"2-digit"
        });

        const averageTemp = Math.round(element.day.avgtemp_c);
        
        daysList.innerHTML += `<li>
            <i class='bx bx-${forecastWeatherIcon}'></i>
            <span>${capitalDay}</span>
            <span>${dayMonth}</span>
            <span class="day-temp">${averageTemp}°C</span>
        </li>`;
    });

}

/**
 * Fetches current day data from the API and sends it to the UI.
 */
const fetchCurrentWeatherData = (location) => {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&lang=es`;
    fetch(apiUrl)
    .then(response=>response.json())
    .then(data => {
        updateCurrentDayUI(data);
    })
    .catch((error)=>{
        console.error(`WeatherAPI failed to provide information for the current day, responded with code ${response.status}. Error: ${error}`);
    });
}

/**
 * Fetches a 5 day forecast from the API.
 */
const fetchForecast = (location) => {
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&lang=es&days=5`;
    fetch(apiUrl)
    .then(response=>response.json())
    .then(data => {
        const forecast=data.forecast.forecastday;
        /*
        * We need to sanitize the response, in order to ensure that we aren't sending
        * current day's data since it isn't displayed on the right lower side.
        * 
        * Also, we don't need the hourly forecast for each day, since it's a lot of data to process.
        * 
        * We filter each element of the array, to remove the element with today's date, and we map the array 
        * to delete the "hour" object.
        */
        const today = getTimeZoneISOString();
        const validForecast = forecast.filter(item=>item.date !== today).map(({hour, ...rest}) => rest);
        updateForecastUI(validForecast);
    })
    .catch((error)=>{
        console.error(`WeatherAPI failed to provide forecast information. Error: ${error}`);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // fetchCurrentWeatherData("Buenos Aires");
    // fetchForecast("Buenos Aires");
})

/**
 * A reimplementation of Date.prototype.toISOString(),
 * since it would return UTC and we need to adjust it to local timezone.
 */
const getTimeZoneISOString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; 
}

/**
 * Capitalizes the given string.
 * Input: "saturday"
 * Output: "Saturday"
 */
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}