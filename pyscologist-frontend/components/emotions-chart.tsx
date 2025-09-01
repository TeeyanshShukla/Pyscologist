"use client"

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

export function EmotionsChart({
  data,
  colors,
}: {
  data: { date: string; score: number }[]
  colors: { navy: string; deepBlue: string; gold: string; white: string }
}) {
  // Keep the chart subtle and calming
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.gold} stopOpacity={0.35} />
              <stop offset="100%" stopColor={colors.gold} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickMargin={8}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis
            domain={[1, 5]}
            hide
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={{ stroke: "#e5e7eb" }}
          />
          <Tooltip
            contentStyle={{ borderRadius: 8, borderColor: "#e5e7eb" }}
            formatter={(val) => [`${val} / 5`, "Mood score"]}
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
          />
          <Area type="monotone" dataKey="score" stroke={colors.gold} strokeWidth={2} fill="url(#goldFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
