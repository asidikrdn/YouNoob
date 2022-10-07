const axios = require("axios");

exports.handler = async function (event, context) {
  //Securely access environment variables here
  console.log(event);
  console.log(context);

  try {
    const { query } = event.queryStringParameters;
    let response = await axios.get(
      `https://youtube138.p.rapidapi.com/search/?q=${query}`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_FIRST_KEY,
          "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
        },
      }
    );
    return {
      statusCode: 200,
      body: response,
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
