## WeatherX

WeatherX is a clean and minimal Progressive Web App (PWA) that provides accurate and reliable weather forecasts for mobile users. With features such as current weather, 48-hour and 7-day forecasts, interactive charts, city search, dynamic backgrounds, unit options, and 12/24 hour time formats, WeatherX makes it easy to plan your day and stay informed.

[![Netlify Status](https://api.netlify.com/api/v1/badges/24388ee8-9efc-4a0e-a1c9-a98bc5011275/deploy-status)](https://app.netlify.com/sites/weatherx-abdulsamad/deploys)

### :sparkles: Features

- Current weather forecast
- 48-hour and 7-day weather forecasts
- Interactive charts for Next 48 hours, Next 7 days, and UV Index data
- Search for weather forecasts by city
- Dynamic background images that reflect the weather conditions 
- Option to view details in Imperial, Metric, and Universal units
- Option to view time in 12/24-hour format
- Get an awesome new background everytime you open the app, you'll never tire of checking the weather.

With these features, our web application provides an accurate and reliable way to stay informed about the weather, plan your day, and enjoy a beautiful and engaging user experience.

### :link: URL Structures

https://weatherx-abdulsamad.netlify.app/<code>City Name</code> <br>
https://weatherx-abdulsamad.netlify.app/<code>City Name</code>/Next48Hours <br>
https://weatherx-abdulsamad.netlify.app/<code>City Name</code>/Next7Days <br>
https://weatherx-abdulsamad.netlify.app/<code>City Name</code>/Stats <br>


### Installation
Clone the repository
```bash
git clone https://github.com/abdulsamad/weatherx.git
```

Install dependencies
```bash
yarn 
```
Netlify CLI is also required to run netlify serverless functions

```bash
yarn install -g netlify-cli
```

### Environment Variables
Create a .env file in the project root and add the following variables
```js
OPEN_WEATHER_MAP_API_KEY = /* Open Weather Map API Key */
REACT_APP_PROJECT_URL = /* Production URL */
```

### Screenshots

## [![weatherx app screenshot](readme/home-screenshot.png 'Home')](https://weatherx-abdulsamad.netlify.app/Toronto)

## [![weatherx app screenshot](readme/next48hours-screenshot.png 'Next 48 Hours')](https://weatherx-abdulsamad.netlify.app/Toronto/Next48Hours)

## [![weatherx app screenshot](readme/next7days-screenshot.png 'Next 7 Days')](https://weatherx-abdulsamad.netlify.app/Toronto/Next7Days)

[![weatherx app screenshot](readme/stats-screenshot.png 'Stats')](https://weatherx-abdulsamad.netlify.app/Toronto/Stats)
