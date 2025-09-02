# Pyscologist - Integrated Frontend & Backend

This project now features a fully integrated Next.js frontend with the AI backend for Shah Rukh Khan-inspired therapy sessions.

## Quick Start

### Prerequisites
- Node.js 20+ 
- npm

### Running the Application

1. **Install dependencies:**
```bash
cd pyscologist-frontend
npm install
```

2. **Set up environment variables (optional):**
```bash
# Create .env.local in pyscologist-frontend directory
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*Note: The app works with intelligent mock responses even without the API key*

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to `http://localhost:3000`

## Features

- 🎭 **SRK Persona**: Warm, empathetic responses inspired by Shah Rukh Khan
- 💬 **Real-time Chat**: Instant responses with typing indicators
- 🧠 **Intelligent Responses**: Context-aware replies based on user emotions
- 📱 **Responsive Design**: Works on desktop and mobile
- 🎨 **Beautiful UI**: Professional therapy app interface
- ⚡ **Fast Performance**: Optimized with Next.js and Turbopack

## Architecture

- **Frontend**: Next.js 15 with React 19 and Tailwind CSS
- **Backend**: API routes with Google Generative AI integration
- **Fallback**: Smart mock responses when API is unavailable
- **UI Components**: shadcn/ui for consistent design

## Usage

1. Click "Start Your Session" from the landing page
2. Begin chatting with the SRK-inspired AI therapist
3. Experience personalized, contextual responses
4. Use features like mood tracking and session history

The app gracefully handles both real AI responses (with API key) and intelligent mock responses (without API key) for seamless demo experiences.