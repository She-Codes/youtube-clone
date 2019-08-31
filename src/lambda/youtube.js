import axios from 'axios';

export async function handler(event, context) {
  const { part, maxResults, q } = event.queryStringParameters;
  const params = {
    part,
    maxResults,
    q,
    key: process.env.youtubeApiKey
  }
  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", { 
      headers: { Accept: "application/json" },
      params
    })
    const data = response.data
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}

