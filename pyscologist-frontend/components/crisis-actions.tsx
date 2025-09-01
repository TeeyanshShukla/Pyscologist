"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Bot } from "lucide-react"

type Props = {
  colors: { navy: string; deepBlue: string; gold: string; white: string }
}

export default function CrisisActions({ colors }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Button
        asChild
        className="group inline-flex items-center justify-center gap-2 rounded-lg px-4 py-6 text-base font-medium transition-transform motion-safe:duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2"
        style={{
          backgroundColor: colors.gold,
          color: colors.navy,
          outlineColor: colors.gold,
        }}
        aria-label="Talk now in the chat"
      >
        <Link href="/chat">
          <Bot className="h-5 w-5 transition-transform motion-safe:duration-200 group-hover:scale-110" />
          <span>Talk Now</span>
        </Link>
      </Button>

      <Button
        asChild
        variant="outline"
        className="group inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-6 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 bg-transparent"
        style={{
          backgroundColor: "#ffffff0d",
          borderColor: `${colors.white}1a`,
          color: colors.white,
          outlineColor: colors.gold,
        }}
        aria-label="Call crisis helpline"
      >
        {/* Replace number with your region's hotline; 988 is US-only */}
        <a href="tel:988">
          <Phone className="h-5 w-5" style={{ color: colors.gold }} />
          <span>Call Helpline</span>
        </a>
      </Button>

      <Button
        asChild
        variant="outline"
        className="group inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-6 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 bg-transparent"
        style={{
          backgroundColor: "#ffffff0d",
          borderColor: `${colors.white}1a`,
          color: colors.white,
          outlineColor: colors.gold,
        }}
        aria-label="Text crisis support"
      >
        <a href="sms:988">
          <MessageCircle className="h-5 w-5" style={{ color: colors.gold }} />
          <span>Text Support</span>
        </a>
      </Button>
    </div>
  )
}
