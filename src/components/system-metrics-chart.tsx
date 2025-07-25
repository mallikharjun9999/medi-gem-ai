
"use client"

import { Pie, PieChart, Line, LineChart, CartesianGrid, XAxis, Tooltip } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

const trendsData = [
  { date: "Day 1", vitals: 150, users: 5, alerts: 3, gemini: 100, invocations: 200 },
  { date: "Day 2", vitals: 200, users: 8, alerts: 5, gemini: 120, invocations: 250 },
  { date: "Day 3", vitals: 350, users: 12, alerts: 10, gemini: 200, invocations: 400 },
  { date: "Day 4", vitals: 500, users: 15, alerts: 15, gemini: 300, invocations: 600 },
  { date: "Day 5", vitals: 750, users: 18, alerts: 25, gemini: 500, invocations: 900 },
  { date: "Day 6", vitals: 1000, users: 20, alerts: 35, gemini: 650, invocations: 1200 },
  { date: "Day 7", vitals: 1254, users: 23, alerts: 42, gemini: 789, invocations: 1560 },
];


const systemHealthConfig = {
  "Vitals Logs": {
    label: "Vitals Logs",
    color: "hsl(var(--chart-1))",
  },
  "Active Users": {
    label: "Active Users",
    color: "hsl(var(--chart-2))",
  },
  "Alerts": {
    label: "Critical Alerts",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

const apiUsageConfig = {
    "Gemini Calls": {
      label: "Gemini API Calls",
      color: "hsl(var(--chart-4))",
    },
    "Invocations": {
      label: "Function Invocations",
      color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

const trendsConfig = {
    vitals: { label: "Vitals Logs", color: "hsl(var(--chart-1))" },
    users: { label: "Active Users", color: "hsl(var(--chart-2))" },
    alerts: { label: "Alerts", color: "hsl(var(--chart-3))" },
    gemini: { label: "Gemini Calls", color: "hsl(var(--chart-4))" },
    invocations: { label: "Invocations", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

interface SystemMetricsChartProps {
    metrics: {
        totalLogs: number;
        activeUsers: number;
        alertCount: number;
        geminiApiCalls: number;
        functionInvocations: number;
    }
}

export function SystemMetricsChart({ metrics }: SystemMetricsChartProps) {
    const systemHealthData = [
        { metric: "Vitals Logs", value: metrics.totalLogs, fill: "var(--color-Vitals Logs)" },
        { metric: "Active Users", value: metrics.activeUsers, fill: "var(--color-Active Users)" },
        { metric: "Alerts", value: metrics.alertCount, fill: "var(--color-Alerts)" },
    ]

    const apiUsageData = [
        { metric: "Gemini Calls", value: metrics.geminiApiCalls, fill: "var(--color-Gemini Calls)" },
        { metric: "Invocations", value: metrics.functionInvocations, fill: "var(--color-Invocations)" },
    ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader>
                <CardTitle>System Health Overview</CardTitle>
                <CardDescription>A summary of key system health metrics.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                config={systemHealthConfig}
                className="mx-auto aspect-square max-h-[250px]"
                >
                <PieChart>
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie data={systemHealthData} dataKey="value" nameKey="metric" innerRadius={0} />
                    <ChartLegend
                        content={<ChartLegendContent nameKey="metric" />}
                    />
                </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>API & Function Usage</CardTitle>
                <CardDescription>Usage statistics for backend services.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={apiUsageConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                    >
                    <PieChart>
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie data={apiUsageData} dataKey="value" nameKey="metric" innerRadius={60} />
                         <ChartLegend
                            content={<ChartLegendContent nameKey="metric" />}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
                <CardTitle>Usage Trends (Last 7 Days)</CardTitle>
                <CardDescription>Metrics trends over the last week.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={trendsConfig} className="min-h-[300px] w-full">
                    <LineChart data={trendsData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Line dataKey="vitals" type="monotone" stroke="var(--color-vitals)" strokeWidth={2} dot={false} />
                        <Line dataKey="users" type="monotone" stroke="var(--color-users)" strokeWidth={2} dot={false} />
                        <Line dataKey="alerts" type="monotone" stroke="var(--color-alerts)" strokeWidth={2} dot={false} />
                        <Line dataKey="gemini" type="monotone" stroke="var(--color-gemini)" strokeWidth={2} dot={false} />
                        <Line dataKey="invocations" type="monotone" stroke="var(--color-invocations)" strokeWidth={2} dot={false} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    </div>
  )
}
