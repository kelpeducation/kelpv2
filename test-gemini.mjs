// Quick smoke test for the Gemini API key used by the KELP chatbot.
// Usage: node test-gemini.mjs
import { GoogleGenerativeAI } from '@google/generative-ai';
import { readFileSync } from 'fs';

function loadEnvLocal() {
  try {
    const contents = readFileSync('.env.local', 'utf-8');
    for (const line of contents.split('\n')) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2]?.replace(/^["']|["']$/g, '') ?? '';
      }
    }
  } catch {
    // .env.local is optional; ignore if missing
  }
}

loadEnvLocal();

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.error('NEXT_PUBLIC_GEMINI_API_KEY is not set. Add it to .env.local first.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

try {
  const result = await model.generateContent('Reply with a short confirmation that the connection works.');
  const response = await result.response;
  console.log('Gemini API key is working. Response:');
  console.log(response.text());
} catch (error) {
  console.error('Gemini API request failed:', error.message ?? error);
  process.exit(1);
}
