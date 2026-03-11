const Gemini_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

export const generateGeminiResponse = async (prompt, retries = 3) => {
  try {
    // Sending a request to Gemini
    const response = await fetch(
      `${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      },
    );

    // Retry if Gemini overloaded
    if (response.status === 503 && retries > 0) {
      console.log("Gemini overloaded. Retrying...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return generateGeminiResponse(prompt, retries - 1);
    }

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const data = await response.json();

    // Extract AI Text
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No text returned from Gemini");
    }

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanText);
  } catch (error) {
    console.log("Gemini Fetch Error: ", error.message);
    throw new Error("Gemini API fetch failed");
  }
};
