import { NextRequest, NextResponse } from 'next/server'

// Simplified chat logic without memory for now
// We'll enhance this with proper memory integration later
export async function POST(request: NextRequest) {
  try {
    const { message, userId } = await request.json()

    if (!message || !userId) {
      return NextResponse.json(
        { error: 'Message and userId are required' },
        { status: 400 }
      )
    }

    // For now, use the Google Generative AI directly in the API route
    const response = await getChatResponse(message, userId)

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function getChatResponse(userMessage: string, userId: string): Promise<string> {
  try {
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      console.log("⚠️ No Gemini API key found, using mock response")
      return generateMockSRKResponse(userMessage)
    }

    // Import here to avoid build issues
    const { GoogleGenerativeAI } = await import("@google/generative-ai")
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

    const systemPrompt = `You are ShahRukhKhan, the King of Bollywood, serving as a personal psychologist and mental health counselor. You combine your natural charisma, emotional intelligence, and life wisdom with professional psychological knowledge to help users navigate their mental health journey.

Personality Traits:
- Warm and Empathetic: Speak with SRK's characteristic warmth, using his gentle yet confident tone
- Wise and Philosophical: Draw from his decades of life experience and his thoughtful, reflective nature  
- Encouraging and Motivational: Use his natural ability to inspire and uplift others
- Humble yet Confident: Balance professional competence with his trademark humility

Communication Style:
- Use SRK's eloquent speaking style - articulate, thoughtful, and often poetic
- Maintain his respectful, dignified approach to serious topics
- Use gentle humor when appropriate to lighten mood, but never at the expense of the user's feelings
- Address users with warmth - terms like "my friend," "beta," or their preferred name

Keep responses conversational, supportive, and under 200 words. Always prioritize user wellbeing.`

    const chat = await chatModel.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: systemPrompt + "\n\nUser message: " + userMessage }]
        }
      ]
    })

    const response = chat.response.text()
    return response
  } catch (error) {
    console.error("❌ Chat response error:", error)
    // Fallback to mock response if real API fails
    return generateMockSRKResponse(userMessage)
  }
}

function generateMockSRKResponse(userMessage: string): string {
  // Create contextual mock responses based on user message content
  const lowerMessage = userMessage.toLowerCase()
  
  if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
    return "My friend, I can sense the weight you're carrying. Stress is like a storm cloud - it feels overwhelming, but remember, every storm passes. Let's take a moment together. What small step can we take right now to bring you some peace?"
  }
  
  if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depressed')) {
    return "Beta, your heart is speaking, and I'm here to listen. Sadness is not weakness - it shows you care deeply. In my journey, I've learned that our lowest moments often teach us the most about our strength. Tell me, what would feel like a gentle comfort right now?"
  }
  
  if (lowerMessage.includes('presentation') || lowerMessage.includes('work') || lowerMessage.includes('performance')) {
    return "Ah, the stage - whether it's Bollywood or your workplace, the nerves are the same! You know what I've learned? The audience wants you to succeed. They're on your side. Let's channel that nervous energy into preparation and confidence. What specific part worries you most?"
  }
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('good')) {
    return "Hello, my dear friend! Your presence here shows such courage - seeking support is the mark of true strength. I'm honored you've chosen to share your time with me. How are you feeling in this moment? What's on your heart today?"
  }
  
  // Default responses
  const responses = [
    "I hear you, my friend. Your words carry weight, and I want you to know that sharing them takes real courage. What feels most important for us to explore together right now?",
    "Thank you for trusting me with your thoughts. In my years, I've learned that every challenge holds within it the seeds of growth. Tell me more about what you're experiencing.",
    "My dear friend, you are not alone in this journey. Sometimes the heart needs to speak before the mind can find clarity. I'm here, listening with complete attention. What would feel most helpful?",
    "Beta, life has a way of testing us, doesn't it? But you're here, you're speaking, you're fighting - that itself is victory. Let's work through this together, one gentle step at a time.",
    "You know, in all my roles, the most important one is being present for people like you. Your feelings are valid, your struggles are real, and your strength - even when you can't feel it - is remarkable. What do you need most right now?"
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}