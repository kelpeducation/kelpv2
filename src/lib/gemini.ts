import { GoogleGenerativeAI } from '@google/generative-ai';
import { kelpKnowledge, getSystemPrompt } from './kelpKnowledge';

// Initialize the Gemini API
let genAI: GoogleGenerativeAI | null = null;

const getGeminiAPI = () => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not set. Please add it to your .env.local file.');
    }

    if (!genAI) {
        genAI = new GoogleGenerativeAI(apiKey);
    }

    return genAI;
};

// Send a message to Gemini
export const sendMessage = async (userMessage: string): Promise<string> => {
    try {
        const api = getGeminiAPI();
        const model = api.getGenerativeModel({ model: 'gemini-flash-latest' });

        // Prepend context to user message
        const fullPrompt = `${getSystemPrompt()}

User Question: ${userMessage}

Please provide a helpful answer about KELP Ltd:`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error: any) {
        console.error('Error sending message to Gemini:', error);

        // Handle specific error cases
        if (error.message?.includes('API_KEY') || error.message?.includes('API key')) {
            throw new Error('API key error');
        }

        if (error.message?.includes('quota') || error.message?.includes('QUOTA')) {
            throw new Error('Quota exceeded');
        }

        throw error;
    }
};

// Initialize chat session (for compatibility with existing code)
export const initializeChatSession = () => {
    // Just validate API key
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('API key not configured');
    }
    return true;
};

// Reset chat session (for compatibility)
export const resetChatSession = () => {
    genAI = null;
};

// Check if API key is configured
export const isAPIKeyConfigured = (): boolean => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    return !!apiKey && apiKey !== 'your_api_key_here';
};

