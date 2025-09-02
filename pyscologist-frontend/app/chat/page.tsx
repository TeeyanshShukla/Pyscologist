"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ThemeMode = "sunrise" | "sunset"

const COLORS = {
  navy: "#0b1b3a",
  deepBlue: "#102a54",
  gold: "#d4af37",
  white: "#ffffff",
} as const

type Message = {
  id: string
  role: "assistant" | "user"
  content: string
  time: string
}

const initialMessages: Message[] = [
  {
    id: "m1",
    role: "assistant",
    content: "Hello. I'm here with you. Take a slow breath—what would you like to share today?",
    time: "09:15",
  },
  {
    id: "m2",
    role: "user",
    content: "I’m anxious about an upcoming presentation. I keep imagining everything going wrong.",
    time: "09:16",
  },
  {
    id: "m3",
    role: "assistant",
    content: "Thank you for trusting me with that. Let's unpack the fear gently and build a plan you can lean on.",
    time: "09:17",
  },
]

// Compute background and bubble colors within the 4-color palette
function useThemedStyles(mode: ThemeMode) {
  const backgroundImage =
    mode === "sunrise"
      ? `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.gold} 40%, ${COLORS.deepBlue} 100%)`
      : `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.deepBlue} 60%, ${COLORS.gold} 110%)`

  const bubble = {
    assistant:
      mode === "sunrise"
        ? { bg: COLORS.navy, text: COLORS.white, ring: COLORS.gold }
        : { bg: COLORS.navy, text: COLORS.white, ring: COLORS.gold },
    user:
      mode === "sunrise"
        ? { bg: COLORS.white, text: COLORS.navy, ring: COLORS.gold }
        : { bg: "#0f1a33", text: COLORS.white, ring: COLORS.gold }, // a deepened navy tone for contrast, derived from palette
  }

  return { backgroundImage, bubble }
}

export default function ChatPage() {
  console.log("[v0] Rendering ChatPage (/chat) - chat interface")
  const [mode, setMode] = useState<ThemeMode>("sunrise")
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userId] = useState("Alex") // For demo purposes, using hardcoded user
  const [messageHistory, setMessageHistory] = useState<any[]>([])

  const { backgroundImage, bubble } = useThemedStyles(mode)

  const typingLabel = useMemo(() => (isTyping ? "SRK is thinking…" : "Ready"), [isTyping])

  async function handleSend() {
    const text = input.trim()
    if (!text) return
    
    const newMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => [...prev, newMsg])
    setInput("")
    setIsTyping(true)

    try {
      // Call our API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          userId: userId,
          messageHistory: messageHistory
        })
      })

      const data = await response.json()
      
      if (data.success && data.response) {
        // Update message history for context
        setMessageHistory(data.messageHistory || [])
        
        // Add AI response to messages
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.response,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ])
      } else {
        // Fallback response
        const fallbackResponse = data.response || "I apologize, but I'm having trouble processing your message right now. Please try again in a moment."
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: fallbackResponse,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ])
      }
    } catch (error) {
      console.error('Chat API error:', error)
      // Fallback response for network errors
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "I'm having trouble connecting right now. Please check your connection and try again.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <TooltipProvider>
      <main className="min-h-[100dvh] w-full" style={{ backgroundImage }} aria-label="Therapy chat with SRK persona">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 p-4 md:grid md:grid-cols-[280px_1fr] md:gap-6 md:p-6">
          {/* Sidebar */}
          <aside className="flex flex-col gap-4">
            <ProfileCard mode={mode} onToggleMode={() => setMode(mode === "sunrise" ? "sunset" : "sunrise")} />
            <SessionHistory />
            <MoodTracker />
          </aside>

          {/* Main chat area */}
          <section className="flex min-h-[70dvh] flex-col gap-4">
            <MemoryIndicator />
            <Card className="flex min-h-[60dvh] flex-1 flex-col overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between border-b">
                <div className="flex items-center gap-3">
                  <Avatar
                    className="h-8 w-8 motion-safe:transition-transform motion-safe:duration-700 motion-safe:hover:scale-105"
                    aria-label="SRK-inspired avatar"
                  >
                    <AvatarImage
                      src="/srk-inspired-avatar-gentle-smile.png"
                      alt="SRK-inspired avatar with gentle, empathetic expression"
                    />
                    <AvatarFallback>SRK</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Your Guide</span>
                    <span className="text-xs text-muted-foreground">{typingLabel}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="border-0" aria-label="Persona badge">
                    King of Hearts
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setMode(mode === "sunrise" ? "sunset" : "sunrise")}
                    aria-pressed={mode === "sunset"}
                    aria-label={`Toggle theme to ${mode === "sunrise" ? "sunset" : "sunrise"}`}
                  >
                    {mode === "sunrise" ? "Sunset mode" : "Sunrise mode"}
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex min-h-[40dvh] flex-1 flex-col p-0">
                <ScrollArea className="h-[48vh] md:h-[52vh]">
                  <div className="flex flex-col gap-3 p-4">
                    {messages.map((m) => (
                      <MessageBubble
                        key={m.id}
                        role={m.role}
                        time={m.time}
                        style={{
                          backgroundColor: m.role === "assistant" ? bubble.assistant.bg : bubble.user.bg,
                          color: m.role === "assistant" ? bubble.assistant.text : bubble.user.text,
                          borderColor: m.role === "assistant" ? bubble.assistant.ring : bubble.user.ring,
                        }}
                      >
                        {m.content}
                      </MessageBubble>
                    ))}

                    {isTyping && <TypingIndicator />}
                  </div>
                </ScrollArea>

                <div className="border-t p-3">
                  <MessageInput value={input} onChange={setInput} onSend={handleSend} />
                </div>
              </CardContent>
            </Card>

            <FloatingActions />
          </section>
        </div>

        {/* Local keyframes for typing indicator */}
        <style jsx global>{`
          @keyframes v0-bounce {
            0%,
            80%,
            100% {
              transform: translateY(0);
              opacity: 0.7;
            }
            40% {
              transform: translateY(-4px);
              opacity: 1;
            }
          }
        `}</style>
      </main>
    </TooltipProvider>
  )
}

function ProfileCard({
  mode,
  onToggleMode,
}: {
  mode: ThemeMode
  onToggleMode: () => void
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-pretty text-lg font-serif">Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/soft-profile-avatar.png" alt="Your profile avatar" />
          <AvatarFallback aria-hidden>YOU</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 items-center justify-between">
          <div>
            <p className="text-sm font-medium">Alex</p>
            <p className="text-xs text-muted-foreground">Grounded & growing</p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleMode}
                className="underline-offset-4 hover:underline"
                aria-label={`Switch to ${mode === "sunrise" ? "sunset" : "sunrise"} theme`}
              >
                {mode === "sunrise" ? "Sunset" : "Sunrise"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle background theme</TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  )
}

function SessionHistory() {
  const items = [
    { id: "s1", title: "Managing uncertainty", when: "Yesterday", mood: "calm" },
    { id: "s2", title: "Presentation practice", when: "3 days ago", mood: "hopeful" },
    { id: "s3", title: "Breathing & grounding", when: "Last week", mood: "steady" },
  ]
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-pretty text-lg font-serif">Session History</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3">
          {items.map((it) => (
            <li key={it.id} className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{it.title}</p>
                <p className="text-xs text-muted-foreground">{it.when}</p>
              </div>
              <Badge
                variant="outline"
                className="whitespace-nowrap border-0 text-xs"
                style={{
                  backgroundColor: `${COLORS.gold}22`,
                  color: "#1f2937",
                  border: `1px solid ${COLORS.gold}`,
                }}
              >
                {it.mood}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function MoodTracker() {
  const moods = [
    { k: "calm", color: COLORS.gold },
    { k: "hopeful", color: COLORS.deepBlue },
    { k: "steady", color: COLORS.navy },
  ]
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-pretty text-lg font-serif">Mood Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {moods.map((m) => (
            <span
              key={m.k}
              className="rounded-full px-2 py-1 text-xs"
              style={{
                backgroundColor: m.color + "22",
                color: "#1f2937",
                border: `1px solid ${m.color}`,
              }}
              aria-label={`Mood: ${m.k}`}
            >
              {m.k}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function MemoryIndicator() {
  return (
    <div className="flex items-center gap-2">
      <Badge className="border-0" style={{ backgroundColor: COLORS.gold, color: "#111827" }} aria-live="polite">
        Memory On
      </Badge>
      <p className="text-sm text-muted-foreground">Resuming from last session — 3 insights recalled.</p>
    </div>
  )
}

function MessageBubble({
  role,
  time,
  children,
  style,
}: {
  role: "assistant" | "user"
  time: string
  children: React.ReactNode
  style: React.CSSProperties
}) {
  const isAssistant = role === "assistant"
  return (
    <div
      className={cn("flex w-full items-end gap-2", isAssistant ? "justify-start" : "justify-end")}
      role="group"
      aria-label={isAssistant ? "Assistant message" : "Your message"}
    >
      {isAssistant && (
        <Avatar className="h-7 w-7 shrink-0">
          <AvatarImage src="/srk-inspired-mini-avatar.png" alt="SRK-inspired avatar" />
          <AvatarFallback>SRK</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-2xl border px-3 py-2 shadow-sm md:max-w-[70%]",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2",
        )}
        style={{
          backgroundColor: style.backgroundColor,
          color: style.color,
          borderColor: style.borderColor,
        }}
        tabIndex={0}
      >
        <p className="text-pretty text-sm leading-relaxed">{children}</p>
        <span className="mt-1 block text-right text-[11px] opacity-70">{time}</span>
      </div>
      {!isAssistant && (
        <Avatar className="h-7 w-7 shrink-0">
          <AvatarImage src="/neutral-user-avatar.png" alt="Your avatar" />
          <AvatarFallback aria-hidden>YOU</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

function MessageInput({
  value,
  onChange,
  onSend,
}: {
  value: string
  onChange: (v: string) => void
  onSend: () => void
}) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }
  return (
    <div className="flex items-center gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Share what's on your mind..."
        aria-label="Message input"
        className="flex-1"
      />
      <Button
        onClick={onSend}
        style={{ backgroundColor: COLORS.gold, color: COLORS.navy }}
        className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-[1.02]"
        aria-label="Send message"
      >
        Send
      </Button>
    </div>
  )
}

function FloatingActions() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 mx-auto flex w-full max-w-2xl justify-center">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-background/80 p-2 shadow-lg ring-1 ring-border backdrop-blur">
        <Button
          className="px-3"
          aria-label="Crisis Support"
          title="Immediate help"
          style={{ backgroundColor: COLORS.gold, color: COLORS.navy }}
        >
          Crisis Support
        </Button>
        <Button variant="outline" className="px-3 bg-transparent" aria-label="Start new session">
          New Session
        </Button>
        <Button variant="outline" className="px-3 bg-transparent" aria-label="Pause session">
          Pause
        </Button>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 pl-10" aria-live="polite" aria-label="SRK is typing">
      <div className="flex items-center gap-1">
        <TypingDot delay="0ms" />
        <TypingDot delay="150ms" />
        <TypingDot delay="300ms" />
      </div>
      <span className="text-xs text-muted-foreground">Thinking…</span>
    </div>
  )
}

function TypingDot({ delay }: { delay: string }) {
  return (
    <span
      className="inline-block h-2 w-2 rounded-full"
      style={{
        backgroundColor: COLORS.gold,
        animation: "v0-bounce 1.4s infinite",
        animationDelay: delay,
      }}
      aria-hidden
    />
  )
}
