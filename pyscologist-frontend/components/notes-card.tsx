"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function NotesCard({ colors }: { colors: { navy: string; deepBlue: string; gold: string; white: string } }) {
  const [notes, setNotes] = useState("")

  function handleSave() {
    // Placeholder: in a real app, save securely with encryption on the server or client-side vault.
    // console.log("[v0] Saving private notes:", notes)
    alert("Notes saved privately (demo).")
  }

  return (
    <Card role="region" aria-labelledby="private-notes-heading" className="bg-white border-black/10">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle id="private-notes-heading" className="font-serif text-xl" style={{ color: colors.navy }}>
            Private notes
          </CardTitle>
          <span
            className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs"
            style={{ borderColor: "#e5e7eb" }}
          >
            {/* inline lock icon */}
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.navy}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V8a5 5 0 0 1 10 0v3" />
            </svg>
            <span className="text-black/70">Encrypted</span>
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <label htmlFor="notes" className="sr-only">
          Private notes
        </label>
        <textarea
          id="notes"
          className="min-h-32 w-full rounded-md border px-3 py-2 text-sm leading-relaxed"
          style={{ borderColor: "#e5e7eb" }}
          placeholder="Write thoughts you’d like to keep private..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="flex items-center justify-end">
          <Button
            type="button"
            onClick={handleSave}
            className="rounded-full px-4"
            style={{ backgroundColor: colors.gold, color: colors.navy }}
          >
            Save Notes
          </Button>
        </div>
        <p className="text-xs text-black/50">
          Your notes are private to you. This indicator reflects encrypted storage in production (demo only here).
        </p>
      </CardContent>
    </Card>
  )
}
