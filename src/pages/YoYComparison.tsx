import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { loadMasterlistAggregates } from "@/lib/masterlistAggregates";
import { loadMasterlistAggregates2024 } from "@/lib/masterlistAggregates2024";
import { formatCurrency } from "@/lib/formatters";
import reaLogo from "@/assets/rea_logo.jpg";
import {
  Crown,
  User,
  Users,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  ArrowRight,
  DollarSign,
  FileText,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
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

const YoYComparison = () => {
  const { data: data2024, isLoading: loading2024 } = useQuery({
    queryKey: ["masterlist-2024-aggregates", "v6"],
    queryFn: loadMasterlistAggregates2024,
  });

  const { data: data2025, isLoading: loading2025 } = useQuery({
    queryKey: ["masterlist-2025-aggregates"],
    queryFn: loadMasterlistAggregates,
  });

  if (loading2024 || loading2025 || !data2024 || !data2025) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading comparison data…</p>
      </div>
    );
  }

  const t2024 = data2024.totals;
  const t2025 = data2025.totals;

  const calcChange = (v2024: number, v2025: number) => {
    if (v2024 === 0) return v2025 > 0 ? 100 : 0;
    return ((v2025 - v2024) / v2024) * 100;
  };

  const revenueChange = calcChange(t2024.totalRevenue, t2025.totalRevenue);
  const invoicesChange = calcChange(t2024.totalInvoices, t2025.totalInvoices);
  const clientsChange = calcChange(t2024.totalClients, t2025.totalClients);
  const avgValueChange = calcChange(t2024.avgInvoiceValue, t2025.avgInvoiceValue);
  const premiumChange = calcChange(t2024.premiumTotal, t2025.premiumTotal);
  const normalChange = calcChange(t2024.normalTotal, t2025.normalTotal);
  const oneTimeChange = calcChange(t2024.oneTimeTotal, t2025.oneTimeTotal);

  const TrendIcon = ({ change }: { change: number }) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const formatChange = (change: number) => {
    const sign = change > 0 ? "+" : "";
    return `${sign}${change.toFixed(1)}%`;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-500";
    if (change < 0) return "text-red-500";
    return "text-muted-foreground";
  };

  // Monthly comparison data
  const monthlyComparison = data2024.monthlyData.map((m2024, idx) => {
    const m2025 = data2025.monthlyData[idx];
    return {
      month: m2024.month.slice(0, 3),
      revenue2024: m2024.revenue,
      revenue2025: m2025?.revenue ?? 0,
      invoices2024: m2024.invoices,
      invoices2025: m2025?.invoices ?? 0,
      premium2024: m2024.premiumRevenue,
      premium2025: m2025?.premiumRevenue ?? 0,
      normal2024: m2024.normalRevenue,
      normal2025: m2025?.normalRevenue ?? 0,
      oneTime2024: m2024.oneTimeRevenue,
      oneTime2025: m2025?.oneTimeRevenue ?? 0,
    };
  });

  // Segment comparison data
  const segmentComparison = [
    {
      name: "Premium",
      value2024: t2024.premiumTotal,
      value2025: t2025.premiumTotal,
      change: premiumChange,
      color: "hsl(var(--premium))",
    },
    {
      name: "Normal",
      value2024: t2024.normalTotal,
      value2025: t2025.normalTotal,
      change: normalChange,
      color: "hsl(var(--normal))",
    },
    {
      name: "One-Time",
      value2024: t2024.oneTimeTotal,
      value2025: t2025.oneTimeTotal,
      change: oneTimeChange,
      color: "hsl(var(--one-time))",
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-card-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.name.includes("revenue") || entry.name.includes("Revenue") ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={reaLogo} alt="REA Advertising" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Year-over-Year Comparison</h1>
                <p className="text-sm text-muted-foreground">2024 vs 2025 Performance Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/2024"
                className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium"
              >
                <Calendar className="h-4 w-4" />
                View 2024
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium"
              >
                <Calendar className="h-4 w-4" />
                View 2025
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Key Metrics Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendIcon change={revenueChange} />
                  <span className={`text-sm font-semibold ${getChangeColor(revenueChange)}`}>{formatChange(revenueChange)}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">2024</span>
                  <span className="text-lg font-bold">{formatCurrency(t2024.totalRevenue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">2025</span>
                  <span className="text-lg font-bold text-primary">{formatCurrency(t2025.totalRevenue)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Total Invoices</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendIcon change={invoicesChange} />
                  <span className={`text-sm font-semibold ${getChangeColor(invoicesChange)}`}>{formatChange(invoicesChange)}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">2024</span>
                  <span className="text-lg font-bold">{t2024.totalInvoices}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">2025</span>
                  <span className="text-lg font-bold text-primary">{t2025.totalInvoices}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Total Clients</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendIcon change={clientsChange} />
                  <span className={`text-sm font-semibold ${getChangeColor(clientsChange)}`}>{formatChange(clientsChange)}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">2024</span>
                  <span className="text-lg font-bold">{t2024.totalClients}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">2025</span>
                  <span className="text-lg font-bold text-primary">{t2025.totalClients}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Avg Invoice Value</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendIcon change={avgValueChange} />
                  <span className={`text-sm font-semibold ${getChangeColor(avgValueChange)}`}>{formatChange(avgValueChange)}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">2024</span>
                  <span className="text-lg font-bold">{formatCurrency(t2024.avgInvoiceValue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">2025</span>
                  <span className="text-lg font-bold text-primary">{formatCurrency(t2025.avgInvoiceValue)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Segment Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {segmentComparison.map((segment) => (
            <Card key={segment.name} className="border-l-4" style={{ borderLeftColor: segment.color }}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {segment.name === "Premium" && <Crown className="h-5 w-5" style={{ color: segment.color }} />}
                    {segment.name === "Normal" && <Users className="h-5 w-5" style={{ color: segment.color }} />}
                    {segment.name === "One-Time" && <User className="h-5 w-5" style={{ color: segment.color }} />}
                    <span className="font-semibold">{segment.name} Revenue</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendIcon change={segment.change} />
                    <span className={`text-sm font-semibold ${getChangeColor(segment.change)}`}>{formatChange(segment.change)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">2024</span>
                    <span className="text-xl font-bold">{formatCurrency(segment.value2024)}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 mx-auto text-muted-foreground" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">2025</span>
                    <span className="text-xl font-bold" style={{ color: segment.color }}>{formatCurrency(segment.value2025)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Monthly Revenue Comparison Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Monthly Revenue Comparison</CardTitle>
            <CardDescription>2024 vs 2025 revenue by month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyComparison}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue2024"
                  name="2024 Revenue"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="revenue2025"
                  name="2025 Revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Segment Revenue Comparison by Month */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Crown className="h-4 w-4 text-premium" />
                Premium Revenue
              </CardTitle>
              <CardDescription>Monthly comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="premium2024" name="2024" fill="hsl(var(--muted-foreground))" />
                  <Bar dataKey="premium2025" name="2025" fill="hsl(var(--premium))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-normal" />
                Normal Revenue
              </CardTitle>
              <CardDescription>Monthly comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="normal2024" name="2024" fill="hsl(var(--muted-foreground))" />
                  <Bar dataKey="normal2025" name="2025" fill="hsl(var(--normal))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-one-time" />
                One-Time Revenue
              </CardTitle>
              <CardDescription>Monthly comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="oneTime2024" name="2024" fill="hsl(var(--muted-foreground))" />
                  <Bar dataKey="oneTime2025" name="2025" fill="hsl(var(--one-time))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Summary Table */}
        <Card>
          <CardHeader>
            <CardTitle>Full Year Summary</CardTitle>
            <CardDescription>Complete breakdown of 2024 vs 2025 metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Metric</th>
                    <th className="text-right py-3 px-4 font-semibold">2024</th>
                    <th className="text-right py-3 px-4 font-semibold">2025</th>
                    <th className="text-right py-3 px-4 font-semibold">Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">Total Revenue</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(t2024.totalRevenue)}</td>
                    <td className="py-3 px-4 text-right font-semibold">{formatCurrency(t2025.totalRevenue)}</td>
                    <td className={`py-3 px-4 text-right font-semibold ${getChangeColor(revenueChange)}`}>{formatChange(revenueChange)}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">Total Invoices</td>
                    <td className="py-3 px-4 text-right">{t2024.totalInvoices}</td>
                    <td className="py-3 px-4 text-right font-semibold">{t2025.totalInvoices}</td>
                    <td className={`py-3 px-4 text-right font-semibold ${getChangeColor(invoicesChange)}`}>{formatChange(invoicesChange)}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">Total Clients</td>
                    <td className="py-3 px-4 text-right">{t2024.totalClients}</td>
                    <td className="py-3 px-4 text-right font-semibold">{t2025.totalClients}</td>
                    <td className={`py-3 px-4 text-right font-semibold ${getChangeColor(clientsChange)}`}>{formatChange(clientsChange)}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">Average Invoice Value</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(t2024.avgInvoiceValue)}</td>
                    <td className="py-3 px-4 text-right font-semibold">{formatCurrency(t2025.avgInvoiceValue)}</td>
                    <td className={`py-3 px-4 text-right font-semibold ${getChangeColor(avgValueChange)}`}>{formatChange(avgValueChange)}</td>
                  </tr>
                  <tr className="border-b border-border/50 bg-premium/5">
                    <td className="py-3 px-4 font-medium flex items-center gap-2">
                      <Crown className="h-4 w-4 text-premium" /> Premium Revenue
                    </td>
                    <td className="py-3 px-4 text-right">{formatCurrency(t2024.premiumTotal)}</td>
                    <td className="py-3 px-4 text-right font-semibold">{formatCurrency(t2025.premiumTotal)}</td>
                    <td className={`py-3 px-4 text-right font-semibold ${getChangeColor(premiumChange)}`}>{formatChange(premiumChange)}</td>
                  </tr>
                  <tr className="border-b border-border/50 bg-normal/5">
                    <td className="py-3 px-4 font-medium flex items-center gap-2">
                      <Users className="h-4 w-4 text-normal" /> Normal Revenue
                    </td>
                    <td className="py-3 px-4 text-right">{formatCurrency(t2024.normalTotal)}</td>
                    <td className="py-3 px-4 text-right font-semibold">{formatCurrency(t2025.normalTotal)}</td>
                    <td className={`py-3 px-4 text-right font-semibold ${getChangeColor(normalChange)}`}>{formatChange(normalChange)}</td>
                  </tr>
                  <tr className="bg-one-time/5">
                    <td className="py-3 px-4 font-medium flex items-center gap-2">
                      <User className="h-4 w-4 text-one-time" /> One-Time Revenue
                    </td>
                    <td className="py-3 px-4 text-right">{formatCurrency(t2024.oneTimeTotal)}</td>
                    <td className="py-3 px-4 text-right font-semibold">{formatCurrency(t2025.oneTimeTotal)}</td>
                    <td className={`py-3 px-4 text-right font-semibold ${getChangeColor(oneTimeChange)}`}>{formatChange(oneTimeChange)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default YoYComparison;
