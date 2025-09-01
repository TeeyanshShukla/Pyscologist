"use client"

import Link from "next/link"

type Resource = {
  name: string
  description: string
  href?: string
  tel?: string
  region?: string
}

type Props = { colors: { navy: string; deepBlue: string; gold: string; white: string } }

const RESOURCES: Resource[] = [
  {
    name: "Emergency (Local)",
    description: "If you’re in immediate danger, call your local emergency number.",
    tel: "112", // Placeholder; customize per region
    region: "Global (example)",
  },
  {
    name: "Crisis Helpline (US)",
    description: "988 Suicide & Crisis Lifeline — call or text 988.",
    tel: "988",
    region: "United States",
  },
  {
    name: "Samaritans (UK & ROI)",
    description: "24/7 support. Call 116 123 or visit Samaritans.",
    tel: "116123",
    href: "https://www.samaritans.org/",
    region: "UK & Ireland",
  },
  {
    name: "Find Local Services",
    description: "Search for local mental health services and professionals in your area.",
    href: "https://www.findahelpline.com/",
    region: "Global directory",
  },
]

export default function ResourcesPanel({ colors }: Props) {
  return (
    <ul className="space-y-3">
      {RESOURCES.map((r) => {
        const key = `${r.name}-${r.region}`
        return (
          <li
            key={key}
            className="rounded-md p-3"
            style={{ backgroundColor: "#ffffff0d", border: `1px solid ${colors.white}1a` }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium" style={{ color: colors.white }}>
                  {r.name}
                </p>
                <p className="text-sm" style={{ color: `${colors.white}CC` }}>
                  {r.description}
                </p>
                {r.region ? (
                  <p className="mt-1 text-xs" style={{ color: `${colors.white}99` }}>
                    Region: {r.region}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                {r.tel ? (
                  <a
                    className="rounded-md px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2"
                    style={{ backgroundColor: colors.gold, color: colors.navy, outlineColor: colors.gold }}
                    href={`tel:${r.tel}`}
                  >
                    Call
                  </a>
                ) : null}
                {r.href ? (
                  <Link
                    className="rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2"
                    style={{
                      backgroundColor: "#ffffff0d",
                      borderColor: `${colors.white}1a`,
                      color: colors.white,
                      outlineColor: colors.gold,
                    }}
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit
                  </Link>
                ) : null}
              </div>
            </div>
          </li>
        )
      })}
      <li
        className="rounded-md p-3 text-xs"
        style={{ backgroundColor: "#ffffff0d", border: `1px solid ${colors.white}1a`, color: `${colors.white}CC` }}
      >
        Note: Numbers and links are examples. Please update with your region’s official services in Project Settings or
        by editing the resources list.
      </li>
    </ul>
  )
}
