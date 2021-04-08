const axios = require('axios');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    const queryParams = event.queryStringParameters;

    // OpenWeather API (OneCall)
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall`, {
        params: {
          appid: process.env.OPEN_WEATHER_MAP_API_KEY,
          ...queryParams,
        },
      });

      return {
        statusCode: 200,
        body: JSON.stringify(res.data),
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ err }),
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      err: 'Only GET requests are expected 🤨',
    }),
  };
};
