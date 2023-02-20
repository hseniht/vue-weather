exports.handler = async function (event, context) {
  console.log("tk functions process", process.env)
  const mapboxAPIKey = process.env.MAPBOX_API_KEY;
  console.log("tk mapboxAPIKey",mapboxAPIKey)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Fetched Weather" }),
  };
};
