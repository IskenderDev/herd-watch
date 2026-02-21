import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { AnimalHistoryEntry } from "@/types/animal";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface AnalyticsLineChartProps {
  history: AnimalHistoryEntry[];
}

const chartConfig = {
  activityLevel: {
    label: "Активность",
    color: "hsl(var(--primary))",
  },
};

export default function AnalyticsLineChart({ history }: AnalyticsLineChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-56 w-full">
      <LineChart data={history} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="timestamp" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis
          domain={[0, 100]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={28}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent labelFormatter={(value) => `Дата: ${value}`} />}
        />
        <Line
          type="monotone"
          dataKey="activityLevel"
          name="Активность"
          stroke="var(--color-activityLevel)"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
