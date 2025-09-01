"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { Session } from "@/app/sessions/page"

export function TimelineItem({
  session,
  colors,
}: {
  session: Session
  colors: { navy: string; deepBlue: string; gold: string; white: string }
}) {
  return (
    <li className="relative ml-4 py-4">
      {/* gold connector dot */}
      <span
        aria-hidden="true"
        className="absolute -left-[9px] top-6 h-3 w-3 rounded-full ring-2"
        style={{ backgroundColor: colors.gold, ringColor: colors.white }}
      />
      <Card className="bg-white border-black/10">
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/10">
                <Image
                  src="/warm-srk-inspired-silhouette-portrait-soft-gold-li.png"
                  alt="SRK-inspired comforting avatar"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-black/60">{new Date(session.date).toLocaleDateString()}</p>
                <h3 className="font-serif text-lg" style={{ color: colors.navy }}>
                  {session.topic}
                </h3>
              </div>
            </div>
            <span
              className="rounded-full px-2 py-1 text-xs"
              style={{ backgroundColor: colors.gold, color: colors.navy }}
              aria-label={`Mood: ${session.mood}`}
            >
              {session.mood}
            </span>
          </div>

          <p className="text-black/80 leading-relaxed">{session.summary}</p>

          {/* Insights */}
          {session.insights?.length ? (
            <div className="flex flex-wrap items-center gap-2">
              {session.insights.map((ins) => (
                <span
                  key={ins}
                  className="rounded-full border px-2 py-1 text-xs"
                  style={{ borderColor: colors.gold, color: colors.navy, backgroundColor: "#fff" }}
                >
                  {ins}
                </span>
              ))}
            </div>
          ) : null}

          {/* Continuity */}
          {session.continuityNote ? (
            <p className="text-xs text-black/60" aria-label="Memory continuity">
              Continues: {session.continuityNote}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </li>
  )
}
