import 'dotenv/config'
import { Memory } from 'mem0ai/oss'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

// Initialize embeddings
const embedding = new GoogleGenerativeAIEmbeddings({
    model: "models/embedding-001",
    apiKey: process.env.GEMINI_API_KEY,
})

// Initialize Memory
const mem = new Memory({
    version: 'v1.1',
    vectorStore: {
        provider: 'qdrant',
        config: {
            collectionName: 'memories',
            embeddingModelDims: 768,
            host: 'localhost',
            port: 6333,
        },
    },
    llm: {
        provider: 'gemini',
        config: {
            model: 'gemini-2.5-flash',
            apiKey: process.env.GEMINI_API_KEY,
        }
    },
    embedding: async (text) => {
        try {
            const result = await embedding.embedQuery(text)
            return result
        } catch (error) {
            console.error('Embedding error:', error)
            throw error
        }
    }
})

// SRK System Prompt
const systemPromptSRKpersona = `ShahRukhKhan Psychology App - System Prompt
Core Persona
You are ShahRukhKhan, the King of Bollywood, serving as a personal psychologist and mental health counselor. You combine your natural charisma, emotional intelligence, and life wisdom with professional psychological knowledge to help users navigate their mental health journey.

You have access to memories from previous sessions with this user. Use these memories to provide personalized, contextual support that acknowledges their ongoing journey.

Personality Traits

Warm and Empathetic: Speak with SRK's characteristic warmth, using his gentle yet confident tone
Wise and Philosophical: Draw from his decades of life experience and his thoughtful, reflective nature
Encouraging and Motivational: Use his natural ability to inspire and uplift others
Humble yet Confident: Balance professional competence with his trademark humility and self-deprecating humor when appropriate
Culturally Sensitive: Understand diverse backgrounds and perspectives, drawing from your global appeal
Memory-Aware: Reference previous conversations naturally when relevant to show continuity of care

Communication Style

Use SRK's eloquent speaking style - articulate, thoughtful, and often poetic
Incorporate his occasional philosophical musings and life insights
Maintain his respectful, dignified approach to serious topics
Use gentle humor when appropriate to lighten mood, but never at the expense of the user's feelings
Address users with warmth - terms like "my friend," "beta," or their preferred name
Reference past sessions naturally: "As we discussed before..." or "I remember you mentioned..."

Professional Boundaries

Strict Confidentiality: All conversations are completely private and confidential. Never share, store, or reference any personal information from sessions
Non-Judgmental Approach: Accept all users unconditionally, regardless of their struggles or background
Professional Ethics: While maintaining SRK's persona, adhere to psychological best practices
Crisis Recognition: Identify when users need immediate professional help and guide them appropriately

Therapeutic Approach

Active Listening: Demonstrate deep understanding of user concerns
Cognitive Behavioral Techniques: Help users identify negative thought patterns
Mindfulness and Emotional Regulation: Guide users in managing overwhelming emotions
Solution-Focused: Help users find their own strength and solutions
Cultural Integration: Respect and incorporate users' cultural and spiritual beliefs when relevant
Continuity of Care: Build upon previous sessions and track progress over time

Privacy and Confidentiality Commitment

"What we discuss here stays between us, completely private and confidential"
Never retain or reference previous conversations unless the user brings up the topic
Treat each session as a safe, judgment-free space
Emphasize that seeking help is a sign of strength, not weakness

Key Reminders

Always prioritize user wellbeing over entertainment
Balance SRK's charisma with genuine psychological support
Maintain absolute confidentiality - this is sacred in therapeutic relationships
Guide users to professional help when needed, while providing immediate emotional support
Remember that vulnerability requires the utmost respect and care
Use memory to show genuine care and continuity in the therapeutic relationship

Closing Note
You are not just an AI with SRK's personality - you are a caring guide helping people through their mental health journey, using the wisdom, empathy, and inspirational qualities that make Shah Rukh Khan beloved worldwide. Your memory of previous sessions allows you to provide deeper, more personalized support.`

/**
 * Load user memories for contextualized responses
 */
export async function loadUserMemories(userId) {
    try {
        console.log(`🧠 Loading memories for user: ${userId}`)
        const memories = await mem.getAll({ userId: userId })
        
        if (memories && memories.length > 0) {
            console.log(`✅ Found ${memories.length} memories from previous sessions`)
            const memoryContext = "\n\nRELEVANT MEMORIES FROM PREVIOUS SESSIONS:\n" +
                memories.map(mem => `- ${mem.memory || mem.text || mem.content || JSON.stringify(mem)}`).join('\n') +
                "\n\nUse these memories naturally in your responses.\n"
            return memoryContext
        } else {
            console.log("✨ First time user - starting fresh")
            return ""
        }
    } catch (error) {
        console.error("❌ Memory service connection failed:", error.message)
        return ""
    }
}

/**
 * Save conversation memory
 */
export async function saveMemory(userMessage, assistantResponse, userId) {
    try {
        const conversationText = `User: ${userMessage}\nSRK: ${assistantResponse}`
        await mem.add(conversationText, { userId: userId })
        console.log("💾 Memory saved successfully")
        return true
    } catch (error) {
        console.error("❌ Memory save failed:", error.message)
        
        // Try alternative formats
        const alternativeFormats = [
            () => mem.add(conversationText, { user_id: userId }),
            () => {
                const messages = [
                    { role: "user", content: userMessage },
                    { role: "assistant", content: assistantResponse }
                ]
                return mem.add(messages, { userId: userId })
            },
            () => mem.add({
                text: conversationText,
                metadata: { userId: userId }
            }),
            () => mem.add({
                memory: conversationText,
                user_id: userId
            })
        ]

        for (let i = 0; i < alternativeFormats.length; i++) {
            try {
                await alternativeFormats[i]()
                console.log(`💾 Memory saved successfully (format ${i + 1})`)
                return true
            } catch (altError) {
                console.log(`❌ Format ${i + 1} failed: ${altError.message}`)
            }
        }
        
        console.error("❌ All memory save attempts failed")
        return false
    }
}

/**
 * Get AI chat response using Gemini
 */
export async function getChatResponse(userInput, userId, messageHistory = []) {
    try {
        // Load user memories if this is a new conversation
        if (messageHistory.length === 0) {
            const memoryContext = await loadUserMemories(userId)
            messageHistory.push({ 
                role: "system", 
                content: systemPromptSRKpersona + memoryContext 
            })
        }
        
        // Add user message to history
        messageHistory.push({ role: "user", content: userInput })

        // Generate response using Gemini
        const chat = await chatModel.generateContent({
            contents: messageHistory.map(m => ({
                role: m.role === "system" ? "user" : m.role,
                parts: [{ text: m.content }]
            }))
        })

        const assistantResponse = chat.response.text()
        messageHistory.push({ role: "assistant", content: assistantResponse })
        
        // Save memory (non-blocking)
        saveMemory(userInput, assistantResponse, userId).catch(console.error)
        
        return {
            response: assistantResponse,
            messageHistory: messageHistory
        }
    } catch (error) {
        console.error("❌ Chat response error:", error.message)
        return {
            response: "I apologize, but I'm having trouble processing your message right now. Please try again in a moment.",
            messageHistory: messageHistory
        }
    }
}

/**
 * Validate user name (from CLI version)
 */
export function validateUserName(input) {
    const trimmedInput = input.trim()
    if (!trimmedInput || trimmedInput.length === 0) {
        return { valid: false, message: "❌ Name cannot be empty. Please enter your name." }
    }
    if (trimmedInput.length < 2) {
        return { valid: false, message: "❌ Name must be at least 2 characters long." }
    }
    const anonymousPatterns = ['anonymous','anon','guest','user','test','temp','unknown','none','null','undefined','???','xxx']
    if (anonymousPatterns.includes(trimmedInput.toLowerCase())) {
        return { valid: false, message: "❌ Anonymous entries are not allowed. Please enter your real name." }
    }
    return { valid: true, name: trimmedInput }
}