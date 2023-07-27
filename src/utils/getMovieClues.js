import fetch from "node-fetch";
import { isJSON } from "./isJSONstring.js";

const apiUrl = "https://api.openai.com/v1/chat/completions";

export async function getMovieClues(movieName) {
  const prompt = `Please provide four hints about the movie ${movieName} without mentioning its name. Format your response as an array of strings.`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: prompt }],
        max_tokens: 1000,
        n: 1,
        stop: "\n\n",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });
    const data = await response.json();

    const content = data.choices[0].message.content;

    console.log(typeof content, content);
    if (!isJSON(content)) {
      const regex = /\d+\.\s+/;
      const clues = content.split(regex).filter(Boolean);

      return clues;
    }
    const clues = JSON.parse(content);
    return clues;
  } catch (error) {
    console.error("Error making the API request:", error);
  }
}
