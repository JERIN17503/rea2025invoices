import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { loadMasterlistAggregates2024 } from "@/lib/masterlistAggregates2024";
import type { MonthlyData } from "@/data/clientData";
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
import { DollarSign, TrendingUp } from "lucide-react";
import { formatCurrency, formatAxisValue } from "@/lib/formatters";

interface SegmentCharts2024Props {
  category: "premium" | "normal" | "one-time";
  categoryColor: string;
  categoryLabel: string;
}

export function SegmentCharts2024({ category, categoryColor, categoryLabel }: SegmentCharts2024Props) {
  const { data: masterlist, isLoading } = useQuery({
    queryKey: ["masterlist-2024-aggregates"],
    queryFn: loadMasterlistAggregates2024,
  });

  const monthlyData = useMemo(() => {
    if (!masterlist?.monthlyData) return [];

    return masterlist.monthlyData.map((m) => {
      const revenue =
        category === "premium" ? m.premiumRevenue : category === "normal" ? m.normalRevenue : m.oneTimeRevenue;
      const invoices =
        category === "premium" ? m.premiumInvoices : category === "normal" ? m.normalInvoices : m.oneTimeInvoices;
      const clientsCount =
        category === "premium" ? m.premiumClients : category === "normal" ? m.normalClients : m.oneTimeClients;

      return {
        month: m.month,
        revenue,
        invoices,
        clients: clientsCount,
        avgInvoiceValue: invoices > 0 ? revenue / invoices : 0,
      };
    });
  }, [masterlist, category]);

  if (isLoading) {
    return <p className="text-muted-foreground text-center py-8">Loading segment data...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" style={{ color: categoryColor }} />
            {categoryLabel} Revenue — 2024
          </CardTitle>
          <CardDescription>Monthly revenue trend for {categoryLabel.toLowerCase()} clients</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={formatAxisValue} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={categoryColor}
                fill={categoryColor}
                fillOpacity={0.4}
                name="Revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Invoice & Client Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Invoices per Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                <Bar dataKey="invoices" fill={categoryColor} name="Invoices" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Active Clients per Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                <Bar dataKey="clients" fill={categoryColor} name="Clients" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
