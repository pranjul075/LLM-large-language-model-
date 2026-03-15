import { config } from "dotenv";
config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SerpAPI } from "@langchain/community/tools/serpapi";
import { initializeAgentExecutorWithOptions } from "langchain/agents";

// STEP 1: Create model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0.7,
  apiKey: process.env.GOOGLE_API_KEY,
});

// STEP 2: Create SERP search tool
const serpTool = new SerpAPI(process.env.SERPAPI_API_KEY, {
  location:"India",
  hl:"en",
  gl:"in",
});

// STEP 3: Create agent
async function run() {

  const executor = await initializeAgentExecutorWithOptions(
    [serpTool],
    model,
    {
      agentType: "zero-shot-react-description",
      verbose: true,
    }
  );

  // STEP 4: Ask question
  const result = await executor.invoke({
    input: "Latest news about AI in 2026",
  });

  console.log(result.output);
}

run();