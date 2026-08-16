# KELP Education AI Chatbot Setup Guide

## Overview
The KELP website now includes an AI-powered chatbot using Google Gemini API to help visitors understand KELP's educational offerings.

## Getting Your Google Gemini API Key

### Step 1: Visit Google AI Studio
1. Go to: **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account

### Step 2: Create API Key
1. Click **"Get API Key"** or **"Create API Key"**
2. Select **"Create API key in new project"** (or choose an existing project)
3. Copy the API key that appears (format: `AIzaSy...`)
4. **IMPORTANT:** Save this key securely - you won't be able to see it again!

### Step 3: Configure Your Project

1. **Create a `.env.local` file** in your project root directory.

2. **Add your API key** to the `.env.local` file:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=AIzaSy...your_actual_key_here
   ```

3. **Restart your dev server**:
   - Stop the current server (Ctrl+C in terminal)
   - Run `npm run dev` again

## Features

### What the Chatbot Can Do
- ✅ Answer questions about KELP's services (English Courses, Coaching, Teacher Training, School Consultancy)
- ✅ Provide pricing information
- ✅ Share contact details and location
- ✅ Explain KELP's mission, vision, and values
- ✅ Offer quick-reply suggestions for common questions

### What the Chatbot Won't Do
- ❌ Answer general questions unrelated to KELP
- ❌ Process enrollments (directs users to contact KELP directly)
- ❌ Handle payments

## Usage

### For Visitors
1. Click the blue chat button in the bottom-right corner
2. Type a question or use quick-reply buttons
3. Get instant answers about KELP's offerings

### Quick Reply Examples
- "What services does KELP offer?"
- "How much do courses cost?"
- "How can I contact KELP?"
- "Tell me about English courses"

## API Limits & Costs

### Free Tier (Gemini API)
- **60 requests per minute** (very generous for most websites)
- Free for moderate usage
- Monitor usage at: https://aistudio.google.com/

### If You Exceed Limits
The chatbot will display a friendly error message directing users to contact KELP directly.

## Customization

### Modify Chatbot Behavior
Edit `src/lib/kelpKnowledge.ts` to:
- Update service information
- Add new FAQs
- Change pricing
- Modify the system prompt

### Change Appearance
Edit `src/components/ChatBot.tsx` to:
- Adjust colors (currently uses KELP's aqua/teal brand colors)
- Modify position or size
- Change welcome message
- Add/remove quick replies

## Troubleshooting

### Chatbot Shows "Not Configured" Message
- **Cause:** API key is missing or incorrect
- **Solution:** Check your `.env.local` file and ensure `NEXT_PUBLIC_GEMINI_API_KEY` is set correctly

### Chatbot Shows Error Messages
- **Cause:** Network issues or API quota exceeded
- **Solution:** Check your internet connection and API usage limits

### Changes Not Appearing
- **Cause:** Dev server needs restart after `.env` changes
- **Solution:** Stop and restart `npm run dev`

## Security Notes

### Important: Keep Your API Key Secret
- ✅ **DO:** Add `.env.local` to `.gitignore` (already done)
- ❌ **DON'T:** Commit `.env.local` to version control
- ❌ **DON'T:** Share your API key publicly

### For Production Deployment
Consider using environment variables on your hosting platform (Vercel, Netlify, etc.) instead of a `.env` file.

## Support

If you encounter issues:
1. Check this guide first
2. Verify your API key is correct
3. Check the browser console for error messages
4. Contact the development team

## Files Modified/Created

- ✅ `src/components/ChatBot.tsx` - Main chatbot component
- ✅ `src/lib/gemini.ts` - Gemini API integration
- ✅ `src/lib/kelpKnowledge.ts` - KELP knowledge base
- ✅ `pages/_app.tsx` - Added ChatBot to app
- ✅ `package.json` - Added @google/generative-ai dependency

---

**Ready to test?** Get your API key, add it to `.env`, restart the server, and start chatting! 🚀
