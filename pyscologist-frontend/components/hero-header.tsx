"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Colors = { navy: string; deepBlue: string; gold: string; white: string }

const DEFAULT_COLORS: Colors = {
  navy: "#0b1b3a",
  deepBlue: "#102a54",
  gold: "#d4af37",
  white: "#ffffff",
}

type Props = {
  // Optional theme colors; defaults prevent runtime errors like "reading 'white'"
  colors?: Colors
  smallCta?: boolean
}

export default function HeroHeader({ colors = DEFAULT_COLORS, smallCta = false }: Props) {
  const startCtaClass = cn(
    "group inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70",
    "transition-transform duration-200 motion-reduce:transition-none",
    "hover:-translate-y-0.5 active:translate-y-0",
    "shadow-[0_8px_24px_rgba(0,0,0,0.25)]",
    smallCta && "px-4 py-2 text-xs",
  )

  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6" aria-label="Primary">
      <Link
        href="/"
        className="flex items-baseline gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 rounded-md"
        aria-label="Pyscologist Home"
      >
        <span className="font-serif text-2xl md:text-3xl tracking-wide text-balance" style={{ color: colors.gold }}>
          Pyscologist
        </span>
        <span className="sr-only">Pyscologist - AI therapy app</span>
      </Link>

      <div className="hidden md:flex items-center gap-3">
        <Link
          href="#features"
          className="text-sm text-white/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 rounded-md px-2 py-1"
        >
          Features
        </Link>
        <Link
          href="#start"
          className="text-sm text-white/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 rounded-md px-2 py-1"
        >
          Privacy
        </Link>

        <Button
          asChild
          className={startCtaClass}
          style={{
            backgroundColor: colors.gold,
            color: colors.navy,
          }}
        >
          <a href="#start" aria-label="Start your session with Pyscologist">
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
      </div>
    </nav>
  )
}
