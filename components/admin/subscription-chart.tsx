"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface SubscriptionStats {
  plans: {
    basic: number
    professional: number
    enterprise: number
  }
  billingCycles: {
    monthly: number
    yearly: number
  }
  trials: {
    active: number
    expired: number
  }
}

interface SubscriptionChartProps {
  stats: SubscriptionStats
}

export function SubscriptionChart({ stats }: SubscriptionChartProps) {
  const data = [
    { name: "Basic", value: stats.plans.basic, color: "#3b82f6" },
    { name: "Professional", value: stats.plans.professional, color: "#8b5cf6" },
    { name: "Enterprise", value: stats.plans.enterprise, color: "#f59e0b" },
    { name: "Trial", value: stats.trials.active, color: "#10b981" },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} users`, "Count"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
