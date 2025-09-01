"use client"

type Mood = "all" | "low" | "steady" | "uplifted"

export type FiltersState = {
  from: string
  to: string
  mood: Mood
  topic: string
}

export function Filters({
  value,
  onChange,
  colors,
}: {
  value: FiltersState
  onChange: (v: FiltersState) => void
  colors: { navy: string; deepBlue: string; gold: string; white: string }
}) {
  return (
    <form className="grid grid-cols-1 gap-4 md:grid-cols-4" aria-describedby="filters-help">
      <div className="flex flex-col gap-1">
        <label htmlFor="from" className="text-sm font-medium" style={{ color: colors.navy }}>
          From
        </label>
        <input
          id="from"
          type="date"
          className="rounded-md border px-3 py-2 text-sm"
          style={{ borderColor: "#e5e7eb" }}
          value={value.from}
          onChange={(e) => onChange({ ...value, from: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="to" className="text-sm font-medium" style={{ color: colors.navy }}>
          To
        </label>
        <input
          id="to"
          type="date"
          className="rounded-md border px-3 py-2 text-sm"
          style={{ borderColor: "#e5e7eb" }}
          value={value.to}
          onChange={(e) => onChange({ ...value, to: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="mood" className="text-sm font-medium" style={{ color: colors.navy }}>
          Mood
        </label>
        <select
          id="mood"
          className="rounded-md border px-3 py-2 text-sm"
          style={{ borderColor: "#e5e7eb" }}
          value={value.mood}
          onChange={(e) => onChange({ ...value, mood: e.target.value as Mood })}
        >
          <option value="all">All</option>
          <option value="uplifted">Uplifted</option>
          <option value="steady">Steady</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="topic" className="text-sm font-medium" style={{ color: colors.navy }}>
          Topic
        </label>
        <input
          id="topic"
          type="text"
          placeholder="e.g., boundaries"
          className="rounded-md border px-3 py-2 text-sm placeholder:text-black/40"
          style={{ borderColor: "#e5e7eb" }}
          value={value.topic}
          onChange={(e) => onChange({ ...value, topic: e.target.value })}
        />
      </div>

      <p id="filters-help" className="sr-only">
        Filter your session history by date range, mood, or topic.
      </p>
    </form>
  )
}
