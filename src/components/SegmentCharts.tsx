import { getCategoryStats, getSalesPersonStats, ClientSummary, getMonthlyDataByCategory, MonthlyData } from "@/data/clientData";
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
import { formatCurrency, formatInteger, formatAxisValue } from "@/lib/formatters";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { loadMasterlistAggregates } from "@/lib/masterlistAggregates";

interface SegmentChartsProps {
  clients: ClientSummary[];
  category: "premium" | "normal" | "one-time";
  categoryColor: string;
  categoryLabel: string;
}

export function SegmentCharts({ clients, category, categoryColor, categoryLabel }: SegmentChartsProps) {
  const stats = getCategoryStats();
  const salesPersonStats = getSalesPersonStats();

  const { data: masterlist } = useQuery({
    queryKey: ["masterlist-2025-aggregates"],
    queryFn: loadMasterlistAggregates,
  });

  const monthlyData: MonthlyData[] = useMemo(() => {
    if (!masterlist?.monthlyData) return getMonthlyDataByCategory(category);

    return masterlist.monthlyData.map((m) => {
      const revenue =
        category === "premium" ? m.premiumRevenue : category === "normal" ? m.normalRevenue : m.oneTimeRevenue;
      const invoices =
        category === "premium" ? m.premiumInvoices : category === "normal" ? m.normalInvoices : m.oneTimeInvoices;
      const clientsCount =
        category === "premium" ? m.premiumClients : category === "normal" ? m.normalClients : m.oneTimeClients;

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

  // Get category-specific stats
  const categoryStats = category === "premium" ? stats.premium : 
                        category === "normal" ? stats.normal : stats.oneTime;

  // Revenue distribution within this segment (top 10 clients)
  const topClientsData = clients.slice(0, 10).map(c => ({
    name: c.name.length > 15 ? c.name.slice(0, 15) + "..." : c.name,
    fullName: c.name,
    revenue: c.totalAmount,
    invoices: c.invoiceCount,
  }));

  // Revenue ranges for this segment
  const getRevenueRanges = () => {
    const ranges = [
      { name: "< 1K", min: 0, max: 1000, count: 0, revenue: 0 },
      { name: "1K-5K", min: 1000, max: 5000, count: 0, revenue: 0 },
      { name: "5K-10K", min: 5000, max: 10000, count: 0, revenue: 0 },
      { name: "10K-25K", min: 10000, max: 25000, count: 0, revenue: 0 },
      { name: "25K-50K", min: 25000, max: 50000, count: 0, revenue: 0 },
      { name: "50K+", min: 50000, max: Infinity, count: 0, revenue: 0 },
    ];
    
    clients.forEach(client => {
      const range = ranges.find(r => client.totalAmount >= r.min && client.totalAmount < r.max);
      if (range) {
        range.count++;
        range.revenue += client.totalAmount;
      }
    });
    
    return ranges.filter(r => r.count > 0);
  };
  const revenueRanges = getRevenueRanges();

  // Salesperson performance for this segment
  const salesPersonData = salesPersonStats
    .filter(sp => {
      const spClients = clients.filter(c => c.salesPersons.includes(sp.name));
      return spClients.length > 0;
    })
    .map(sp => {
      const spClients = clients.filter(c => c.salesPersons.includes(sp.name));
      const spRevenue = spClients.reduce((sum, c) => sum + c.totalAmount, 0);
      const spInvoices = spClients.reduce((sum, c) => sum + c.invoiceCount, 0);
      return {
        name: sp.name,
        revenue: spRevenue,
        clients: spClients.length,
        invoices: spInvoices,
      };
    })
    .sort((a, b) => b.revenue - a.revenue);

  // Category comparison pie data
  const categoryComparison = [
    { name: categoryLabel, value: categoryStats.totalAmount, color: categoryColor },
    { name: "Others", value: stats.total.totalAmount - categoryStats.totalAmount, color: "hsl(var(--muted))" },
  ];

  // Use imported formatters from @/lib/formatters

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-card-foreground">{payload[0]?.payload?.fullName || label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.name === 'revenue' || entry.name === 'Revenue' ? formatCurrency(entry.value) : entry.value}
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
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-medium">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const avgValue = categoryStats.count > 0 ? categoryStats.totalAmount / categoryStats.count : 0;

  return (
    <div className="space-y-6">
      {/* Key Metrics for this segment */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card border">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Total Revenue</p>
            </div>
            <p className="text-lg font-bold mt-1">{formatCurrency(categoryStats.totalAmount)}</p>
            <p className="text-xs text-muted-foreground">
              {((categoryStats.totalAmount / stats.total.totalAmount) * 100).toFixed(1)}% of total
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
              {((categoryStats.count / stats.total.count) * 100).toFixed(1)}% of total
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
              {((categoryStats.totalInvoices / stats.total.totalInvoices) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Share Pie */}
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

        {/* Client Distribution by Revenue Range */}
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
                    name === 'revenue' ? formatCurrency(value) : value,
                    name === 'revenue' ? 'Revenue' : 'Clients'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  name="Clients"
                  stroke={categoryColor}
                  fill={categoryColor}
                  fillOpacity={0.3} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Clients & Sales Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top 10 Clients */}
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

        {/* Sales Person Performance */}
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
                  formatter={(value: number, name: string) => [
                    name === 'revenue' ? formatCurrency(value) : value,
                    name === 'revenue' ? 'Revenue' : name
                  ]}
                />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill={categoryColor} radius={[4, 4, 0, 0]} />
                <Bar dataKey="clients" name="Clients" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend Chart */}
      <SegmentMonthlyChart 
        category={category}
        categoryColor={categoryColor}
        categoryLabel={categoryLabel}
        data={monthlyData}
      />
    </div>
  );
}
