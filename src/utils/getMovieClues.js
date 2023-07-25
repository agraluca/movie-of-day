import fetch from "node-fetch";

const apiUrl = "https://api.openai.com/v1/chat/completions";

export async function getMovieClues(movieName) {
  const prompt = `Give me 4 hints about the movie ${movieName} (from difficult to easy). Make sure the hint doesn't have the movie name on it. Format as an array of strings`;
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
    const clues = JSON.parse(content);
    return clues;
  } catch (error) {
    console.error("Error making the API request:", error);
  }
}
