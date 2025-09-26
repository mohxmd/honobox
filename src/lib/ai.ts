import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { HTTPException } from "hono/http-exception";
import { stream } from "hono/streaming";
import type { AppContext } from "./init-app";

async function getAIResponse(prompt: string) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY)
    throw new HTTPException(500, {
      message:
        "❌ GOOGLE_GENERATIVE_AI_API_KEY is missing in environment variables",
    });

  return streamText({
    model: google("gemini-2.5-flash"),
    prompt,
  });
}

export async function handleStreamResponse(c: AppContext, prompt: string) {
  const result = await getAIResponse(prompt);

  return stream(c, async (stream) => {
    const prependStream = `Prompt: ${prompt}\n\n`;
    await stream.write(prependStream);
    for await (const textPart of result.textStream) {
      await stream.write(textPart);
    }
  });
}
