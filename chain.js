import { config } from "dotenv";
config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

// STEP 1: Create the model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  maxOutputTokens: 2000,
  temperature: 0.7,
  apiKey: process.env.GOOGLE_API_KEY,
});

// STEP 2: Create a prompt
const prompt = PromptTemplate.fromTemplate(
  "Explain the concept of {topic} in simple terms."
);

// STEP 3: Create a chain
const chain = prompt.pipe(model);

// STEP 4: Run the chain
async function run() {
  const response = await chain.invoke({// call the chain with input variables
    topic: "Large Language Models",
  });

  console.log(response.content);
}

run();