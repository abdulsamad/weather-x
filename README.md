## WeatherX

A clean and minimal weather forecast PWA aims toward mobile

[![Netlify Status](https://api.netlify.com/api/v1/badges/24388ee8-9efc-4a0e-a1c9-a98bc5011275/deploy-status)](https://app.netlify.com/sites/weatherx-abdulsamad/deploys)

### :sparkles: Features

- Shows current weather forecast
- Shows weather forecast for next 48 hours
- Shows weather forecast for next 7 days
- View the Next 48 hours, Next 7 days, and UV Index data in interactive charts
- Search weather forecast for city
- Dynamic background images according to weather 
- View details in Imperial, Metric, and Universal units
- View time in 12/24 hours format
- Option to download a new background image on every load

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
