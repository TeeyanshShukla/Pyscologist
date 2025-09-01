"use client"

import Link from "next/link"

type Props = { colors: { navy: string; deepBlue: string; gold: string; white: string } }

export default function FloatingControls({ colors }: Props) {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      <a
        href="tel:988"
        className="rounded-full px-4 py-2 text-sm font-medium shadow-lg focus-visible:outline-none focus-visible:ring-2"
        style={{ backgroundColor: colors.gold, color: colors.navy, outlineColor: colors.gold }}
        aria-label="Call the crisis helpline"
      >
        Call Helpline
      </a>
      <Link
        href="/chat"
        className="rounded-full border px-4 py-2 text-sm shadow-lg focus-visible:outline-none focus-visible:ring-2"
        style={{
          backgroundColor: "#ffffff0d",
          borderColor: `${colors.white}1a`,
          color: colors.white,
          outlineColor: colors.gold,
        }}
        aria-label="Back to regular chat"
      >
        Back to Chat
      </Link>
    </div>
  )
}
