import { useQuery } from "@tanstack/react-query";
import { loadMasterlistAggregates2024 } from "@/lib/masterlistAggregates2024";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, DollarSign, FileText, Users } from "lucide-react";
import { formatCurrency, formatAxisValue } from "@/lib/formatters";

export function MonthlyTrendsChart2024() {
  const { data: masterlist, isLoading } = useQuery({
    queryKey: ["masterlist-2024-aggregates"],
    queryFn: loadMasterlistAggregates2024,
  });

  const monthlyData = masterlist?.monthlyData ?? [];

  if (isLoading) {
    return <p className="text-muted-foreground text-center py-8">Loading 2024 trends...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Monthly Revenue Trend — 2024
          </CardTitle>
          <CardDescription>Revenue distribution by client segment</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={formatAxisValue} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="premiumRevenue"
                stackId="1"
                stroke="hsl(var(--premium))"
                fill="hsl(var(--premium))"
                fillOpacity={0.6}
                name="Premium"
              />
              <Area
                type="monotone"
                dataKey="normalRevenue"
                stackId="1"
                stroke="hsl(var(--normal))"
                fill="hsl(var(--normal))"
                fillOpacity={0.6}
                name="Normal"
              />
              <Area
                type="monotone"
                dataKey="oneTimeRevenue"
                stackId="1"
                stroke="hsl(var(--one-time))"
                fill="hsl(var(--one-time))"
                fillOpacity={0.6}
                name="One-Time"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Invoice Count Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Monthly Invoice Count — 2024
          </CardTitle>
          <CardDescription>Number of invoices by segment per month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Bar dataKey="premiumInvoices" stackId="a" fill="hsl(var(--premium))" name="Premium" />
              <Bar dataKey="normalInvoices" stackId="a" fill="hsl(var(--normal))" name="Normal" />
              <Bar dataKey="oneTimeInvoices" stackId="a" fill="hsl(var(--one-time))" name="One-Time" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Client Count */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Active Clients per Month — 2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Bar dataKey="premiumClients" fill="hsl(var(--premium))" name="Premium" />
              <Bar dataKey="normalClients" fill="hsl(var(--normal))" name="Normal" />
              <Bar dataKey="oneTimeClients" fill="hsl(var(--one-time))" name="One-Time" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
