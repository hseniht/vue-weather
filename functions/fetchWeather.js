const axios = require("axios");
exports.handler = async function (event, context) {
  const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;

  const search = event.queryStringParameters.search;
  try {
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${MAPBOX_API_KEY}&types=place`
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        response: data,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};
