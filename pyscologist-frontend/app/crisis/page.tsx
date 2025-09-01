import Link from "next/link"
import HeroHeader from "@/components/hero-header"
import CrisisActions from "@/components/crisis-actions"
import BreathingExercise from "@/components/breathing-exercise"
import ResourcesPanel from "@/components/resources-panel"
import FloatingControls from "@/components/floating-controls"

const COLORS = {
  navy: "#0b1b3a",
  deepBlue: "#102a54",
  gold: "#d4af37",
  white: "#ffffff",
}

export const metadata = {
  title: "Crisis Support — Pyscologist",
  description:
    "Immediate, calm support with SRK-inspired presence: talk now, call helpline, text support, breathing guidance, and local resources.",
}

export default function CrisisPage() {
  return (
    <main
      className="min-h-dvh"
      aria-label="Crisis Support Page"
      style={{
        background: `radial-gradient(80% 80% at 80% 20%, ${COLORS.deepBlue} 0%, ${COLORS.navy} 60%)`,
        color: COLORS.white,
      }}
    >
      <header className="sticky top-0 z-30 backdrop-blur">
        <div
          className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6"
          style={{ borderBottom: `1px solid ${COLORS.white}1a` }}
        >
          <Link
            href="/chat"
            className="rounded-md px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2"
            style={{ color: `${COLORS.white}CC`, outlineColor: COLORS.gold }}
            aria-label="Back to regular chat"
          >
            ← Back to Chat
          </Link>
          <div className="font-semibold" style={{ color: COLORS.gold }}>
            Pyscologist Crisis Support
          </div>
        </div>
      </header>

      <section aria-labelledby="crisis-hero" className="mx-auto max-w-6xl px-4 py-8 md:py-10 md:px-6">
        <HeroHeader colors={COLORS} />
      </section>

      <section aria-labelledby="immediate-actions" className="mx-auto max-w-6xl px-4 md:px-6 pb-2">
        <h2 id="immediate-actions" className="sr-only">
          Immediate Actions
        </h2>
        <CrisisActions colors={COLORS} />
      </section>

      <section aria-labelledby="guided-breathing" className="mx-auto max-w-6xl px-4 md:px-6 py-6">
        <div className="grid gap-6 md:grid-cols-5">
          <div
            className="rounded-lg p-4 md:col-span-3"
            style={{ backgroundColor: "#ffffff0d", border: `1px solid ${COLORS.white}1a` }}
          >
            <h3 id="guided-breathing" className="text-lg font-medium">
              Guided Breathing
            </h3>
            <div className="mt-2">
              <BreathingExercise colors={COLORS} />
            </div>
          </div>

          <div
            className="rounded-lg p-4 md:col-span-2"
            style={{ backgroundColor: "#ffffff0d", border: `1px solid ${COLORS.white}1a` }}
          >
            <h3 className="text-lg font-medium">Emergency Contacts & Resources</h3>
            <div className="mt-2">
              <ResourcesPanel colors={COLORS} />
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-4 md:px-6 py-10">
        <div
          className="rounded-lg p-4 text-sm"
          style={{ backgroundColor: "#ffffff0d", border: `1px solid ${COLORS.white}1a`, color: `${COLORS.white}CC` }}
        >
          If you are in immediate danger or thinking of harming yourself, call your local emergency number right now.
          You’re not alone — help is available.
        </div>
      </footer>

      <FloatingControls colors={COLORS} />
    </main>
  )
}
