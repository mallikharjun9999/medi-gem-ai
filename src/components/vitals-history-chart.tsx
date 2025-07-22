"use client"

import { Line, LineChart, CartesianGrid, XAxis, Tooltip } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { day: "Mon", heartRate: 72, bp: 120 },
  { day: "Tue", heartRate: 75, bp: 122 },
  { day: "Wed", heartRate: 68, bp: 118 },
  { day: "Thu", heartRate: 80, bp: 125 },
  { day: "Fri", heartRate: 78, bp: 121 },
  { day: "Sat", heartRate: 82, bp: 128 },
  { day: "Sun", heartRate: 76, bp: 165 },
]

const chartConfig = {
  heartRate: {
    label: "Heart Rate (BPM)",
    color: "hsl(var(--chart-1))",
  },
  bp: {
    label: "Systolic BP (mmHg)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function VitalsHistoryChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="heartRate"
          type="monotone"
          stroke="var(--color-heartRate)"
          strokeWidth={2}
          dot={true}
        />
        <Line
          dataKey="bp"
          type="monotone"
          stroke="var(--color-bp)"
          strokeWidth={2}
          dot={true}
        />
      </LineChart>
    </ChartContainer>
  )
}
