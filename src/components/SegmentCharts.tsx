import type { ClientSummary, MonthlyData } from "@/data/clientData";
import { getMonthlyDataByCategory } from "@/data/clientData";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Users, TrendingUp, Target } from "lucide-react";
import { SegmentMonthlyChart } from "./MonthlyTrendsChart";
import { formatCurrency, formatAxisValue } from "@/lib/formatters";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { loadMasterlistAggregates } from "@/lib/masterlistAggregates";
import { loadMasterlistAggregates2024 } from "@/lib/masterlistAggregates2024";

interface SegmentChartsProps {
  clients: ClientSummary[];
  category: "premium" | "normal" | "one-time";
  categoryColor: string;
  categoryLabel: string;
  year?: number;
  queryKey?: any[];
}

function sumInvoices(list: ClientSummary[]) {
  return list.reduce((s, c) => s + c.invoiceCount, 0);
}

function sumAmount(list: ClientSummary[]) {
  return list.reduce((s, c) => s + c.totalAmount, 0);
}

export function SegmentCharts({
  clients,
  category,
  categoryColor,
  categoryLabel,
  year = 2025,
  queryKey,
}: SegmentChartsProps) {
  const queryFn = year === 2024 ? loadMasterlistAggregates2024 : loadMasterlistAggregates;

  const { data: masterlist } = useQuery({
    queryKey: queryKey ?? [year === 2024 ? "masterlist-2024-aggregates" : "masterlist-2025-aggregates"],
    queryFn,
  });

  const monthlyData: MonthlyData[] = useMemo(() => {
    if (!masterlist?.monthlyData) return getMonthlyDataByCategory(category);

    return masterlist.monthlyData.map((m) => {
      const revenue = category === "premium" ? m.premiumRevenue : category === "normal" ? m.normalRevenue : m.oneTimeRevenue;
      const invoices = category === "premium" ? m.premiumInvoices : category === "normal" ? m.normalInvoices : m.oneTimeInvoices;
      const clientsCount = category === "premium" ? m.premiumClients : category === "normal" ? m.normalClients : m.oneTimeClients;

      return {
        ...m,
        revenue,
        invoices,
        clients: clientsCount,
        avgInvoiceValue: invoices > 0 ? revenue / invoices : 0,
        topClients: (m.topClients ?? []).filter((c: any) => c.category === category),
      };
    });
  }, [masterlist, category]);

  const categoryStats = useMemo(() => {
    const totalAmountFromAggregates =
      category === "premium"
        ? masterlist?.totals.premiumTotal
        : category === "normal"
          ? masterlist?.totals.normalTotal
          : masterlist?.totals.oneTimeTotal;

    return {
      count: clients.length,
      totalInvoices: sumInvoices(clients),
      // Use aggregates segment totals so the shares across Premium/Normal/One-Time add up correctly
      totalAmount: totalAmountFromAggregates ?? sumAmount(clients),
    };
  }, [clients, masterlist, category]);

  const totalStats = useMemo(
    () => ({
      totalAmount: masterlist?.totals.totalRevenue ?? sumAmount(clients),
      totalInvoices: masterlist?.totals.totalInvoices ?? sumInvoices(clients),
      totalClients: masterlist?.totals.totalClients ?? clients.length,
    }),
    [masterlist, clients]
  );

  const topClientsData = clients.slice(0, 10).map((c) => ({
    name: c.name.length > 15 ? c.name.slice(0, 15) + "..." : c.name,
    fullName: c.name,
    revenue: c.totalAmount,
    invoices: c.invoiceCount,
  }));

  const revenueRanges = useMemo(() => {
    const ranges = [
      { name: "< 1K", min: 0, max: 1000, count: 0, revenue: 0 },
      { name: "1K-5K", min: 1000, max: 5000, count: 0, revenue: 0 },
      { name: "5K-10K", min: 5000, max: 10000, count: 0, revenue: 0 },
      { name: "10K-25K", min: 10000, max: 25000, count: 0, revenue: 0 },
      { name: "25K-50K", min: 25000, max: 50000, count: 0, revenue: 0 },
      { name: "50K+", min: 50000, max: Infinity, count: 0, revenue: 0 },
    ];

    for (const client of clients) {
      const range = ranges.find((r) => client.totalAmount >= r.min && client.totalAmount < r.max);
      if (range) {
        range.count++;
        range.revenue += client.totalAmount;
      }
    }

    return ranges.filter((r) => r.count > 0);
  }, [clients]);

  const salesPersonData = useMemo(() => {
    const map = new Map<string, { revenue: number; invoices: number; clients: number }>();

    for (const client of clients) {
      for (const sp of client.salesPersons) {
        const prev = map.get(sp) ?? { revenue: 0, invoices: 0, clients: 0 };
        map.set(sp, {
          revenue: prev.revenue + client.totalAmount,
          invoices: prev.invoices + client.invoiceCount,
          clients: prev.clients + 1,
        });
      }
    }

    return Array.from(map.entries())
      .map(([name, v]) => ({ name, revenue: v.revenue, clients: v.clients, invoices: v.invoices }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [clients]);

  const categoryComparison = [
    { name: categoryLabel, value: categoryStats.totalAmount, color: categoryColor },
    { name: "Others", value: Math.max(0, totalStats.totalAmount - categoryStats.totalAmount), color: "hsl(var(--muted))" },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-card-foreground">{payload[0]?.payload?.fullName || label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.name === "revenue" || entry.name === "Revenue" ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const avgValue = categoryStats.count > 0 ? categoryStats.totalAmount / categoryStats.count : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Total Revenue</p>
            </div>
            <p className="text-lg font-bold mt-1">{formatCurrency(categoryStats.totalAmount)}</p>
            <p className="text-xs text-muted-foreground">
              {totalStats.totalAmount > 0 ? ((categoryStats.totalAmount / totalStats.totalAmount) * 100).toFixed(1) : "0.0"}% of total
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Clients</p>
            </div>
            <p className="text-xl font-bold mt-1">{categoryStats.count}</p>
            <p className="text-xs text-muted-foreground">
              {totalStats.totalClients > 0 ? ((categoryStats.count / totalStats.totalClients) * 100).toFixed(1) : "0.0"}% of total
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Avg Value</p>
            </div>
            <p className="text-lg font-bold mt-1">{formatCurrency(avgValue)}</p>
            <p className="text-xs text-muted-foreground">per client</p>
          </CardContent>
        </Card>
        <Card className="bg-card border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Invoices</p>
            </div>
            <p className="text-xl font-bold mt-1">{categoryStats.totalInvoices}</p>
            <p className="text-xs text-muted-foreground">
              {totalStats.totalInvoices > 0 ? ((categoryStats.totalInvoices / totalStats.totalInvoices) * 100).toFixed(1) : "0.0"}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue Share</CardTitle>
            <CardDescription>{categoryLabel} vs Other Segments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryComparison}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  dataKey="value"
                >
                  {categoryComparison.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue Distribution</CardTitle>
            <CardDescription>Clients by spending tier</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueRanges}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    name === "revenue" ? formatCurrency(value) : value,
                    name === "revenue" ? "Revenue" : "Clients",
                  ]}
                />
                <Area type="monotone" dataKey="count" name="Clients" stroke={categoryColor} fill={categoryColor} fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top 10 {categoryLabel} Clients</CardTitle>
            <CardDescription>By revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topClientsData} layout="vertical" margin={{ left: 0, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" tickFormatter={formatAxisValue} tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" name="Revenue" fill={categoryColor} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Sales Performance</CardTitle>
            <CardDescription>For {categoryLabel.toLowerCase()} segment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesPersonData} margin={{ left: 0, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={formatAxisValue} tick={{ fontSize: 10 }} />
                <Tooltip
                  formatter={(value: number, name: string) => [name === "revenue" ? formatCurrency(value) : value, name === "revenue" ? "Revenue" : name]}
                />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill={categoryColor} radius={[4, 4, 0, 0]} />
                <Bar dataKey="clients" name="Clients" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <SegmentMonthlyChart category={category} categoryColor={categoryColor} categoryLabel={categoryLabel} data={monthlyData} />
    </div>
  );
}
