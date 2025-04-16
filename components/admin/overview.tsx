"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    users: 12,
    stores: 8,
  },
  {
    name: "Feb",
    users: 18,
    stores: 12,
  },
  {
    name: "Mar",
    users: 24,
    stores: 18,
  },
  {
    name: "Apr",
    users: 32,
    stores: 24,
  },
  {
    name: "May",
    users: 48,
    stores: 36,
  },
  {
    name: "Jun",
    users: 56,
    stores: 42,
  },
  {
    name: "Jul",
    users: 70,
    stores: 50,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="users" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        <Bar dataKey="stores" fill="#22c55e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
