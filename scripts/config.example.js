const API_KEY="Your WeatherAPI URL goes here";

/**
 * A map containing WeatherAPI's weather code
 */
const weatherIconMap = {
    1000: 'sun',    // Sunny / Clear
    1003: 'cloud',  // Partly cloudy
    1006: 'cloud',  // Cloudy
    1009: 'cloud',  // Overcast
    1030: 'cloud',  // Mist
    1063: 'cloud-light-rain', // Patchy rain possible
    1066: 'cloud-snow', // Patchy snow possible
    1069: 'cloud-snow', // Patchy sleet possible
    1072: 'cloud-drizzle', // Patchy freezing drizzle possible
    1087: 'cloud-lightning', // Thundery outbreaks possible
    1114: 'wind',   // Blowing snow
    1117: 'wind',   // Blizzard
    1135: 'cloud',  // Fog
    1147: 'cloud',  // Freezing fog
    1150: 'cloud-drizzle', // Patchy light drizzle
    1153: 'cloud-drizzle', // Light drizzle
    1168: 'cloud-drizzle', // Freezing drizzle
    1171: 'cloud-drizzle', // Heavy freezing drizzle
    1180: 'cloud-light-rain', // Patchy light rain
    1183: 'cloud-light-rain', // Light rain
    1186: 'cloud-rain', // Moderate rain at times
    1189: 'cloud-rain', // Moderate rain
    1192: 'cloud-rain', // Heavy rain at times
    1195: 'cloud-rain', // Heavy rain
    1198: 'cloud-rain', // Light freezing rain
    1201: 'cloud-rain', // Moderate or heavy freezing rain
    1204: 'cloud-snow', // Light sleet
    1207: 'cloud-snow', // Moderate or heavy sleet
    1210: 'cloud-snow', // Patchy light snow
    1213: 'cloud-snow', // Light snow
    1216: 'cloud-snow', // Patchy moderate snow
    1219: 'cloud-snow', // Moderate snow
    1222: 'cloud-snow', // Patchy heavy snow
    1225: 'cloud-snow', // Heavy snow
    1237: 'cloud-snow', // Ice pellets
    1240: 'cloud-light-rain', // Light rain shower
    1243: 'cloud-rain', // Moderate or heavy rain shower
    1246: 'cloud-rain', // Torrential rain shower
    1249: 'cloud-snow', // Light sleet showers
    1252: 'cloud-snow', // Moderate or heavy sleet showers
    1255: 'cloud-snow', // Light snow showers
    1258: 'cloud-snow', // Moderate or heavy snow showers
    1261: 'cloud-snow', // Light showers of ice pellets
    1264: 'cloud-snow', // Moderate or heavy showers of ice pellets
    1273: 'cloud-lightning', // Patchy light rain with thunder
    1276: 'cloud-lightning', // Moderate or heavy rain with thunder
    1279: 'cloud-lightning', // Patchy light snow with thunder
    1282: 'cloud-lightning',  // Moderate or heavy snow with thunder
    9999: 'moon' // Handled on index.js
};