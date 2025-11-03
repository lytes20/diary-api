import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const summarizeText = async (content: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes diary entries. Provide concise, meaningful summaries that capture the main points and emotional tone of the entry.",
        },
        {
          role: "user",
          content: `Please summarize the following diary entry:\n\n${content}`,
        },
      ],
      // max_tokens: 150,
      temperature: 0,
    });

    const reply = response.choices[0].message.content?.trim() || "";
    console.log("reply", reply);
    return reply;
  } catch (error) {
    console.error("Error summarizing text:", error);
    throw new Error("Failed to generate summary");
  }
};
