"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

type Phase = { label: string; durationMs: number; size: number }
type Props = { colors: { navy: string; deepBlue: string; gold: string; white: string } }

export default function BreathingExercise({ colors }: Props) {
  // Phases: inhale → hold → exhale → hold
  const phases: Phase[] = useMemo(
    () => [
      { label: "Inhale", durationMs: 4000, size: 1.0 },
      { label: "Hold", durationMs: 4000, size: 1.08 },
      { label: "Exhale", durationMs: 6000, size: 0.82 },
      { label: "Hold", durationMs: 2000, size: 0.88 },
    ],
    [],
  )

  const [running, setRunning] = useState<boolean>(false)
  const [phaseIndex, setPhaseIndex] = useState<number>(0)
  const [cycleCount, setCycleCount] = useState<number>(0)
  const timerRef = useRef<number | null>(null)

  const current = phases[phaseIndex]
  const scale = current.size

  useEffect(() => {
    if (!running) return
    timerRef.current = window.setTimeout(() => {
      setPhaseIndex((i) => {
        const next = (i + 1) % phases.length
        if (next === 0) setCycleCount((c) => c + 1)
        return next
      })
    }, current.durationMs)
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, phaseIndex])

  function toggle() {
    setRunning((r) => !r)
  }

  function reset() {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setRunning(false)
    setPhaseIndex(0)
    setCycleCount(0)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div aria-live="polite" className="text-center text-sm" style={{ color: `${colors.white}CC` }}>
        {running ? `Phase: ${current.label}` : "Press Start to begin a calming cycle"}
      </div>

      {/* Visual guide */}
      <div className="relative grid place-items-center">
        <div
          className="size-40 rounded-full shadow-[0_0_0_8px_rgba(212,175,55,0.12)] transition-transform motion-reduce:transition-none"
          style={{
            backgroundColor: colors.gold,
            transform: `scale(${scale})`,
          }}
          aria-hidden="true"
        />
      </div>

      <div className="text-xs" style={{ color: `${colors.white}CC` }}>
        Cycle: <span style={{ color: colors.white }}>{cycleCount}</span>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={toggle}
          className="rounded-md focus-visible:ring-2"
          style={{
            backgroundColor: colors.gold,
            color: colors.navy,
            outlineColor: colors.gold,
          }}
          aria-pressed={running}
        >
          {running ? "Pause" : "Start"}
        </Button>
        <Button
          onClick={reset}
          variant="outline"
          className="border focus-visible:ring-2 bg-transparent"
          style={{
            backgroundColor: "#ffffff0d",
            borderColor: `${colors.white}1a`,
            color: colors.white,
            outlineColor: colors.gold,
          }}
        >
          Reset
        </Button>
      </div>

      <p className="mt-2 max-w-prose text-center text-xs" style={{ color: `${colors.white}CC` }}>
        Breathe gently. Follow the circle — expand to <span style={{ color: colors.white }}>inhale</span>, soften to{" "}
        <span style={{ color: colors.white }}>exhale</span>. If animations are uncomfortable, use the phase text above.
      </p>
    </div>
  )
}
