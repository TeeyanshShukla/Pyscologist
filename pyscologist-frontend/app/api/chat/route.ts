import { NextRequest, NextResponse } from 'next/server'
import { getChatResponse } from '../../../lib/chat-service.js'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { message, userId, messageHistory } = body

        // Validate required fields
        if (!message || !userId) {
            return NextResponse.json(
                { error: 'Message and userId are required' },
                { status: 400 }
            )
        }

        // Get response from chat service
        const result = await getChatResponse(message, userId, messageHistory || [])

        return NextResponse.json({
            success: true,
            response: result.response,
            messageHistory: result.messageHistory
        })

    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json(
            { 
                error: 'Internal server error',
                response: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment."
            },
            { status: 500 }
        )
    }
}