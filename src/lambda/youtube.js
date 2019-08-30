import axios from 'axios';

// export default axios.create({
//   baseURL: 'https://www.googleapis.com/youtube/v3'
// })

// const response = await youtube.get('search', {
//   params: {
//     part: 'snippet',
//     maxResults: 5,
//     key: API_KEY,
//     q: searchTerm
//   }
// });

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

// export function handler(event, context, callback) {
//   console.log('queryStringParameters', event.queryStringParameters)
//   callback(null, {
//     statusCode: 200,
//     body: JSON.stringify({ msg: 'Hello, World!', params: event.queryStringParameters }),
//   })
// }

// export async function handler(event, context) {
//   console.log('queryStringParameters', JSON.stringify(event.queryStringParameters))
//   //console.log(process.env.youtubeApiKey)
//   //const paramObj = Object.assign({ key: process.env.youtubeApiKey }, event.queryStringParameters)
//   try {
//     const response = await axios.get("https://icanhazdadjoke.com", { headers: { Accept: "application/json" } })
//     const data = response.data
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ msg: data.joke })
//     }
//   } catch (err) {
//     console.log(err) // output to netlify function log
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
//     }
//   }
// }
