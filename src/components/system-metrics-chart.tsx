
"use client"

import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  totalLogs: {
    label: "Total Logs",
    color: "hsl(var(--chart-1))",
  },
  activeUsers: {
    label: "Active Users",
    color: "hsl(var(--chart-2))",
  },
  alertCount: {
    label: "Alerts",
    color: "hsl(var(--chart-3))",
  },
  geminiApiCalls: {
    label: "Gemini Calls",
    color: "hsl(var(--chart-4))",
  },
  functionInvocations: {
    label: "Invocations",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

interface SystemMetricsChartProps {
    data: {
        totalLogs: number;
        activeUsers: number;
        alertCount: number;
        geminiApiCalls: number;
        functionInvocations: number;
    }
}

export function SystemMetricsChart({ data }: SystemMetricsChartProps) {
  const chartData = [
    { metric: "Logs", value: data.totalLogs, fill: "var(--color-totalLogs)" },
    { metric: "Users", value: data.activeUsers, fill: "var(--color-activeUsers)" },
    { metric: "Alerts", value: data.alertCount, fill: "var(--color-alertCount)" },
    { metric: "Gemini Calls", value: data.geminiApiCalls, fill: "var(--color-geminiApiCalls)" },
    { metric: "Invocations", value: data.functionInvocations, fill: "var(--color-functionInvocations)" },
  ];

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 10, right: 10 }}>
        <XAxis type="number" hide />
        <YAxis 
            dataKey="metric" 
            type="category" 
            tickLine={false} 
            axisLine={false} 
            tickMargin={10}
            width={80}
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="value" radius={5} />
      </BarChart>
    </ChartContainer>
  )
}
