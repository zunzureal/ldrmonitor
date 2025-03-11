// api.ts
import axios from 'axios';

const TYHPOON_API_ENDPOINT = process.env.TYHPOON_API_ENDPOINT;

export async function getChatCompletion(messages) {
  try {
    const response = await axios.post(TYHPOON_API_ENDPOINT, {
      "model": "typhoon-instruct",
      "max_tokens": 512,
      "messages": messages,
      "temperature": 0.6,
      "top_p": 0.6,
      "top_k": 0,
      "repetition_penalty": 1.1,
      "min_p": 0.15
    }, {
      headers: {
        Authorization: `${process.env.TYHPOON_API_KEY}`
      }    
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}