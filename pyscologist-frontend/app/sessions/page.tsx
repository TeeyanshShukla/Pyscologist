"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmotionsChart } from "@/components/emotions-chart"
import { Filters, type FiltersState } from "@/components/filters"
import { TimelineItem } from "@/components/timeline-item"
import { NotesCard } from "@/components/notes-card"
import { ExportControls } from "@/components/export-controls"

// Keep the palette aligned with the landing page
const COLORS = {
  navy: "#0b1b3a",
  deepBlue: "#102a54",
  gold: "#d4af37",
  white: "#ffffff",
}

export type Session = {
  id: string
  date: string // ISO
  mood: "low" | "steady" | "uplifted"
  topic: string
  summary: string
  insights: string[]
  continuityNote?: string
}

const SAMPLE_SESSIONS: Session[] = [
  {
    id: "s-006",
    date: "2025-08-31",
    mood: "uplifted",
    topic: "self-confidence",
    summary:
      "You explored strengths at work and practiced reframing self-talk with supportive prompts in SRK’s warm voice.",
    insights: ["Reframing works", "Daily 2-min mirror practice"],
    continuityNote: "Continues the self-talk reframing from 08/24",
  },
  {
    id: "s-005",
    date: "2025-08-24",
    mood: "steady",
    topic: "work stress",
    summary:
      "You identified triggers around deadlines and set a ‘three-breath pause’ to respond calmly instead of reacting.",
    insights: ["Three-breath pause", "Name the trigger aloud"],
    continuityNote: "Follows the boundaries plan from 08/17",
  },
  {
    id: "s-004",
    date: "2025-08-17",
    mood: "steady",
    topic: "boundaries",
    summary:
      "Practiced saying ‘no’ gracefully. Created a script for difficult conversations with SRK’s gentle encouragement.",
    insights: ["Script for ‘no’", "Practice in low-stakes settings"],
  },
  {
    id: "s-003",
    date: "2025-08-10",
    mood: "low",
    topic: "sleep & rumination",
    summary:
      "Explored night-time worry patterns. Tried jotting worries to a notes app before bed and short guided breathing.",
    insights: ["Worry dump at night", "4-4-6 breathing"],
  },
  {
    id: "s-002",
    date: "2025-08-03",
    mood: "low",
    topic: "motivation dip",
    summary:
      "Normalized energy fluctuations. Built a ‘tiny task’ list and celebrated wins with SRK’s signature warmth.",
    insights: ["Tiny task list", "Celebrate micro-wins"],
  },
  {
    id: "s-001",
    date: "2025-07-27",
    mood: "steady",
    topic: "getting started",
    summary: "Set intentions for therapy companion use. Established safety, privacy expectations, and session cadence.",
    insights: ["Weekly cadence", "Privacy expectations"],
  },
]

// Map moods to a gentle score for charting
function moodToScore(mood: Session["mood"]): number {
  switch (mood) {
    case "low":
      return 2
    case "steady":
      return 3
    case "uplifted":
      return 4
  }
}

export default function SessionsPage() {
  const [filters, setFilters] = useState<FiltersState>({ from: "", to: "", mood: "all", topic: "" })

  const sessions = useMemo(() => {
    const fromT = filters.from ? new Date(filters.from).getTime() : Number.NEGATIVE_INFINITY
    const toT = filters.to ? new Date(filters.to).getTime() : Number.POSITIVE_INFINITY
    const topicQ = filters.topic.trim().toLowerCase()

    return SAMPLE_SESSIONS.filter((s) => {
      const dT = new Date(s.date).getTime()
      const dateOk = dT >= fromT && dT <= toT
      const moodOk = filters.mood === "all" ? true : s.mood === filters.mood
      const topicOk = topicQ ? s.topic.toLowerCase().includes(topicQ) : true
      return dateOk && moodOk && topicOk
    }).sort((a, b) => (a.date > b.date ? -1 : 1))
  }, [filters])

  const chartData = useMemo(
    () =>
      [...sessions]
        .sort((a, b) => (a.date > b.date ? 1 : -1))
        .map((s) => ({ date: s.date, score: moodToScore(s.mood) })),
    [sessions],
  )

  function exportJSON() {
    const blob = new Blob([JSON.stringify(sessions, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "pyscologist-sessions.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  function exportCSV() {
    const headers = ["id", "date", "mood", "topic", "summary", "insights"].join(",")
    const rows = sessions.map((s) =>
      [
        s.id,
        s.date,
        s.mood,
        s.topic.replace(/,/g, ";"),
        s.summary.replace(/,/g, ";"),
        `"${s.insights.join(" | ").replace(/"/g, '""')}"`,
      ].join(","),
    )
    const csv = [headers, ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "pyscologist-sessions.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  function printPage() {
    window.print()
  }

  return (
    <div
      className="min-h-screen"
      aria-label="Session history - therapeutic progress"
      style={{
        backgroundImage: `linear-gradient(180deg, ${COLORS.white} 0%, ${COLORS.white} 65%, ${COLORS.deepBlue} 135%)`,
      }}
    >
      <header className="border-b border-black/10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/40 rounded-md"
              aria-label="Back to home"
            >
              <span className="font-serif text-xl tracking-wide" style={{ color: COLORS.gold }}>
                Pyscologist
              </span>
            </Link>
            <span className="hidden text-sm text-black/60 md:inline" aria-hidden="true">
              • Session History
            </span>
          </div>
          <nav className="flex items-center gap-2">
            <Link
              href="/chat"
              className="text-sm text-black/80 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/40 rounded-md px-2 py-1"
            >
              Back to Chat
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:px-6">
        {/* Filters */}
        <Card role="region" aria-label="Filter session history" className="bg-white border-black/10">
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-balance" style={{ color: COLORS.navy }}>
              Review your journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Filters value={filters} onChange={setFilters} colors={COLORS} />
          </CardContent>
        </Card>

        {/* Emotional Journey */}
        <Card role="region" aria-labelledby="emotional-journey-heading" className="bg-white border-black/10">
          <CardHeader>
            <CardTitle
              id="emotional-journey-heading"
              className="font-serif text-xl md:text-2xl text-balance"
              style={{ color: COLORS.navy }}
            >
              Emotional journey (gentle trend)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EmotionsChart data={chartData} colors={COLORS} />
          </CardContent>
        </Card>

        {/* Timeline */}
        <section aria-labelledby="timeline-heading" className="grid grid-cols-1 gap-4">
          <h2 id="timeline-heading" className="font-serif text-2xl md:text-3xl" style={{ color: COLORS.navy }}>
            Timeline
          </h2>
          <ol className="relative ml-2 border-l-2" style={{ borderColor: COLORS.gold }}>
            {sessions.map((s) => (
              <TimelineItem key={s.id} session={s} colors={COLORS} />
            ))}
          </ol>
        </section>

        {/* Notes + Export */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <NotesCard colors={COLORS} />
          <Card role="region" aria-label="Export options" className="bg-white border-black/10">
            <CardHeader>
              <CardTitle className="font-serif text-xl" style={{ color: COLORS.navy }}>
                Share with your therapist
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className="text-sm text-black/70">
                Export your session summaries to share with a licensed professional.
              </p>
              <ExportControls onExportJSON={exportJSON} onExportCSV={exportCSV} onPrint={printPage} colors={COLORS} />
              <p className="text-xs text-black/50">
                Note: Exports exclude private notes by default. You control what you share.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Decorative subtle pattern near footer to echo Bollywood elegance */}
      <div
        aria-hidden="true"
        className="mt-6 h-3 w-full"
        style={{
          backgroundImage: `repeating-radial-gradient(circle at 10px -8px, ${COLORS.gold} 0 4px, transparent 4px 20px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <footer className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <p className="text-sm text-black/60">
          Your progress is private and stays with you. Pyscologist is an AI companion and does not replace licensed
          care.
        </p>
      </footer>
    </div>
  )
}
