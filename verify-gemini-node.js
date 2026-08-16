// Diagnostic script for the Gemini API key used by the KELP chatbot.
// Checks that the key is present, well-formed, and can actually reach the API.
// Usage: node verify-gemini-node.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

function loadEnvLocal() {
  const envPath = path.join(__dirname, '.env.local');
  if (!fs.existsSync(envPath)) return;

  const contents = fs.readFileSync(envPath, 'utf-8');
  for (const line of contents.split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = (match[2] ?? '').replace(/^["']|["']$/g, '');
    }
  }
}

async function main() {
  loadEnvLocal();

  console.log('--- KELP Gemini API Key Verification ---\n');

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  console.log('1. Checking .env.local for NEXT_PUBLIC_GEMINI_API_KEY...');
  if (!apiKey) {
    console.error('   ✗ Not found. Add NEXT_PUBLIC_GEMINI_API_KEY=<your key> to .env.local');
    process.exitCode = 1;
    return;
  }
  console.log('   ✓ Found key starting with:', apiKey.slice(0, 8) + '...');

  console.log('\n2. Checking key format...');
  if (!apiKey.startsWith('AIza')) {
    console.warn('   ! Key does not start with "AIza" — double-check it was copied correctly from Google AI Studio.');
  } else {
    console.log('   ✓ Key format looks correct.');
  }

  console.log('\n3. Sending a test request to the Gemini API...');
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
    const result = await model.generateContent('Reply with the single word: OK');
    const response = await result.response;
    console.log('   ✓ Request succeeded. Response:', response.text().trim());
    console.log('\nAll checks passed — the chatbot is ready to use.');
  } catch (error) {
    console.error('   ✗ Request failed:', error.message ?? error);
    process.exitCode = 1;
  }
}

main();
