"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import HeroHeader from "@/components/hero-header"

const COLORS = {
  navy: "#0b1b3a",
  deepBlue: "#102a54",
  gold: "#d4af37",
  white: "#ffffff",
}

export default function HomePage() {
  console.log("[v0] Rendering HomePage (/) - landing page")
  return (
    <div
      className="relative min-h-screen"
      aria-label="Pyscologist AI Therapy App Landing Page"
      style={{
        backgroundImage: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.deepBlue} 55%, ${COLORS.gold} 120%)`,
      }}
    >
      {/* Decorative subtle star/paisley-esque pattern overlay for a Bollywood touch */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 10%, #ffffff 1px, transparent 1px), radial-gradient(circle at 30% 30%, #ffffff 1px, transparent 1px), radial-gradient(circle at 50% 20%, #ffffff 1px, transparent 1px), radial-gradient(circle at 70% 40%, #ffffff 1px, transparent 1px), radial-gradient(circle at 90% 30%, #ffffff 1px, transparent 1px)",
          backgroundSize: "120px 120px, 140px 140px, 160px 160px, 180px 180px, 200px 200px",
          backgroundRepeat: "repeat",
        }}
      />

      <header className="relative z-10">
        <HeroHeader colors={COLORS} smallCta />
      </header>

      <main className="relative">
        <Hero />
        <Features />
      </main>

      <Footer />
    </div>
  )
}

function Hero() {
  return (
    <section
      className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-10 md:grid-cols-2 md:px-6 md:pt-16"
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col gap-6">
        <h1
          id="hero-heading"
          className="font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl text-balance"
        >
          Your Personal Journey with the <span style={{ color: COLORS.gold }}>King of Hearts</span>
        </h1>
        <p className="max-w-prose text-white/90 leading-relaxed">
          Meet Pyscologist — an AI therapy companion inspired by the warmth and charm of Shah Rukh Khan. Compassionate,
          consistent, and always available to support your emotional well-being.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <StartSessionButton />
          <Link
            href="#features"
            className="text-white/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 rounded-md px-3 py-2 text-sm"
          >
            Learn more
          </Link>
        </div>

        {/* Accessibility note */}
        <p className="sr-only">
          This app offers 24/7 support, memory-enhanced sessions, and professional guidance. Press Start Your Session to
          begin.
        </p>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-white/10">
        <Image
          src="/warm-srk-inspired-silhouette-portrait-soft-gold-li.png"
          alt="Warm, SRK-inspired silhouette with soft golden light"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority
        />
        {/* Gentle gold vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(80% 80% at 80% 20%, rgba(212,175,55,0.25), transparent 60%)",
          }}
        />
      </div>
    </section>
  )
}

function Features() {
  const items = [
    {
      title: "24/7 Support",
      body: "Always by your side — day or night. Speak freely and safely whenever you need a listening heart.",
    },
    {
      title: "Memory-Enhanced Sessions",
      body: "Thoughtful continuity that remembers your journey, helping you build healthier patterns over time.",
    },
    {
      title: "Professional Guidance",
      body: "Grounded in therapeutic best practices with a gentle Bollywood warmth to keep you encouraged.",
    },
  ]

  return (
    <section
      id="features"
      className="relative z-10 mx-auto max-w-6xl px-4 pb-20 md:px-6"
      aria-labelledby="features-heading"
    >
      <h2 id="features-heading" className="font-serif text-3xl md:text-4xl text-white mb-6 text-balance">
        Thoughtful features, crafted with care
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((f) => (
          <Card
            key={f.title}
            className="bg-white/5 backdrop-blur-sm border-white/10 text-white"
            role="article"
            aria-label={f.title}
          >
            <CardHeader>
              <CardTitle className="font-serif text-xl" style={{ color: COLORS.gold }}>
                {f.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 leading-relaxed">{f.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function StartSessionButton({ small = false }: { small?: boolean }) {
  const className = cn(
    "group inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70",
    "transition-transform duration-200 motion-reduce:transition-none",
    "hover:-translate-y-0.5 active:translate-y-0",
    "shadow-[0_8px_24px_rgba(0,0,0,0.25)]",
  )

  return (
    <Button
      asChild
      className={className}
      style={{
        backgroundColor: COLORS.gold,
        color: COLORS.navy,
      }}
    >
      <a href="/chat" aria-label="Start your session with Pyscologist">
        <span className="relative">
          Start Your Session
          {/* gentle shimmer underline */}
          <span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full opacity-70 motion-safe:animate-pulse"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(11,27,58,0.6) 20%, rgba(11,27,58,0.9) 50%, rgba(11,27,58,0.6) 80%, rgba(0,0,0,0) 100%)",
            }}
          />
        </span>
      </a>
    </Button>
  )
}

function Footer() {
  return (
    <footer id="start" className="relative z-10 border-t border-white/10" aria-labelledby="footer-heading">
      {/* Elegant Bollywood-inspired scallop pattern top border */}
      <div
        aria-hidden="true"
        className="h-3 w-full"
        style={{
          backgroundImage: `repeating-radial-gradient(circle at 10px -8px, ${COLORS.gold} 0 4px, transparent 4px 20px)`,
          backgroundSize: "20px 20px",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <h3 id="footer-heading" className="font-serif text-white text-xl">
          Your privacy, always respected
        </h3>
        <p className="mt-2 max-w-prose text-white/80 leading-relaxed">
          Sessions are confidential and secured. We never sell your data. You stay in control of what you share.
        </p>
        <p className="mt-4 text-xs text-white/60">
          Pyscologist is an AI therapy companion inspired by a beloved Bollywood persona for warmth and encouragement.
          It does not replace licensed clinical care.
        </p>
      </div>
    </footer>
  )
}
