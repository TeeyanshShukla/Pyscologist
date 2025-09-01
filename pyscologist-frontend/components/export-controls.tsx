"use client"

import { Button } from "@/components/ui/button"

export function ExportControls({
  onExportJSON,
  onExportCSV,
  onPrint,
  colors,
}: {
  onExportJSON: () => void
  onExportCSV: () => void
  onPrint: () => void
  colors: { navy: string; deepBlue: string; gold: string; white: string }
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        onClick={onExportJSON}
        className="rounded-full px-4"
        style={{ backgroundColor: colors.gold, color: colors.navy }}
        aria-label="Export as JSON"
      >
        Export JSON
      </Button>
      <Button
        type="button"
        onClick={onExportCSV}
        className="rounded-full px-4"
        style={{ backgroundColor: colors.gold, color: colors.navy }}
        aria-label="Export as CSV"
      >
        Export CSV
      </Button>
      <Button
        type="button"
        onClick={onPrint}
        variant="outline"
        className="rounded-full border px-4 bg-transparent"
        aria-label="Print or Save as PDF"
      >
        Print / PDF
      </Button>
    </div>
  )
}
