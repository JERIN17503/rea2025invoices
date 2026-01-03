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
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <img src={reaLogo} alt="REA Advertising" className="h-10 sm:h-12 w-auto" />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-foreground">Year-over-Year</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">2024 vs 2025 Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/2024"
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-xs sm:text-sm font-medium"
              >
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                2024
              </Link>
              <Link
                to="/"
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-xs sm:text-sm font-medium"
              >
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                2025
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Key Metrics Comparison */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
          <Card>
            <CardContent className="p-3 sm:pt-6 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">Revenue</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendIcon change={revenueChange} />
                  <span className={`text-xs sm:text-sm font-semibold ${getChangeColor(revenueChange)}`}>{formatChange(revenueChange)}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">2024</span>
                  <span className="text-sm sm:text-lg font-bold">{formatCurrency(t2024.totalRevenue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">2025</span>
                  <span className="text-sm sm:text-lg font-bold text-primary">{formatCurrency(t2025.totalRevenue)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:pt-6 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">Invoices</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendIcon change={invoicesChange} />
                  <span className={`text-xs sm:text-sm font-semibold ${getChangeColor(invoicesChange)}`}>{formatChange(invoicesChange)}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">2024</span>
                  <span className="text-sm sm:text-lg font-bold">{t2024.totalInvoices}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">2025</span>
                  <span className="text-sm sm:text-lg font-bold text-primary">{t2025.totalInvoices}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:pt-6 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">Clients</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendIcon change={clientsChange} />
                  <span className={`text-xs sm:text-sm font-semibold ${getChangeColor(clientsChange)}`}>{formatChange(clientsChange)}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">2024</span>
                  <span className="text-sm sm:text-lg font-bold">{t2024.totalClients}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">2025</span>
                  <span className="text-sm sm:text-lg font-bold text-primary">{t2025.totalClients}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:pt-6 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">Avg Value</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendIcon change={avgValueChange} />
                  <span className={`text-xs sm:text-sm font-semibold ${getChangeColor(avgValueChange)}`}>{formatChange(avgValueChange)}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">2024</span>
                  <span className="text-sm sm:text-lg font-bold">{formatCurrency(t2024.avgInvoiceValue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">2025</span>
                  <span className="text-sm sm:text-lg font-bold text-primary">{formatCurrency(t2025.avgInvoiceValue)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Segment Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8">
          {segmentComparison.map((segment) => (
            <Card key={segment.name} className="border-l-4" style={{ borderLeftColor: segment.color }}>
              <CardContent className="p-3 sm:pt-6 sm:px-6">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {segment.name === "Premium" && <Crown className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: segment.color }} />}
                    {segment.name === "Normal" && <Users className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: segment.color }} />}
                    {segment.name === "One-Time" && <User className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: segment.color }} />}
                    <span className="text-sm sm:text-base font-semibold">{segment.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendIcon change={segment.change} />
                    <span className={`text-xs sm:text-sm font-semibold ${getChangeColor(segment.change)}`}>{formatChange(segment.change)}</span>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-stretch justify-between gap-2 sm:space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-xs text-muted-foreground">2024</span>
                    <span className="text-sm sm:text-xl font-bold">{formatCurrency(segment.value2024)}</span>
                  </div>
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground hidden sm:block sm:mx-auto" />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-xs text-muted-foreground">2025</span>
                    <span className="text-sm sm:text-xl font-bold" style={{ color: segment.color }}>{formatCurrency(segment.value2025)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Monthly Revenue Comparison Chart */}
        <Card className="mb-4 sm:mb-8">
          <CardHeader className="p-3 sm:p-6 pb-2 sm:pb-2">
            <CardTitle className="text-base sm:text-lg">Monthly Revenue Comparison</CardTitle>
            <CardDescription className="text-xs sm:text-sm">2024 vs 2025 revenue by month</CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-6 pt-0 sm:pt-0">
            <ResponsiveContainer width="100%" height={250} className="sm:!h-[350px]">
              <LineChart data={monthlyComparison} margin={{ left: -10, right: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10 }} width={35} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line
                  type="monotone"
                  dataKey="revenue2024"
                  name="2024"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="revenue2025"
                  name="2025"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Segment Revenue Comparison by Month */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 mb-4 sm:mb-8">
          <Card>
            <CardHeader className="p-3 sm:p-6 pb-1 sm:pb-2">
              <CardTitle className="text-sm sm:text-base flex items-center gap-1.5 sm:gap-2">
                <Crown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-premium" />
                Premium
              </CardTitle>
              <CardDescription className="text-xs">Monthly comparison</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-6 pt-0 sm:pt-0">
              <ResponsiveContainer width="100%" height={150} className="sm:!h-[200px]">
                <BarChart data={monthlyComparison} margin={{ left: -15, right: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                  <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 9 }} width={30} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="premium2024" name="2024" fill="hsl(var(--muted-foreground))" />
                  <Bar dataKey="premium2025" name="2025" fill="hsl(var(--premium))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-3 sm:p-6 pb-1 sm:pb-2">
              <CardTitle className="text-sm sm:text-base flex items-center gap-1.5 sm:gap-2">
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-normal" />
                Normal
              </CardTitle>
              <CardDescription className="text-xs">Monthly comparison</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-6 pt-0 sm:pt-0">
              <ResponsiveContainer width="100%" height={150} className="sm:!h-[200px]">
                <BarChart data={monthlyComparison} margin={{ left: -15, right: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                  <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 9 }} width={30} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="normal2024" name="2024" fill="hsl(var(--muted-foreground))" />
                  <Bar dataKey="normal2025" name="2025" fill="hsl(var(--normal))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-3 sm:p-6 pb-1 sm:pb-2">
              <CardTitle className="text-sm sm:text-base flex items-center gap-1.5 sm:gap-2">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-one-time" />
                One-Time
              </CardTitle>
              <CardDescription className="text-xs">Monthly comparison</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-6 pt-0 sm:pt-0">
              <ResponsiveContainer width="100%" height={150} className="sm:!h-[200px]">
                <BarChart data={monthlyComparison} margin={{ left: -15, right: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                  <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 9 }} width={30} />
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
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Full Year Summary</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Complete breakdown of 2024 vs 2025 metrics</CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold">Metric</th>
                    <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold">2024</th>
                    <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold">2025</th>
                    <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold">Δ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Revenue</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">{formatCurrency(t2024.totalRevenue)}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold">{formatCurrency(t2025.totalRevenue)}</td>
                    <td className={`py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold ${getChangeColor(revenueChange)}`}>{formatChange(revenueChange)}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Invoices</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">{t2024.totalInvoices}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold">{t2025.totalInvoices}</td>
                    <td className={`py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold ${getChangeColor(invoicesChange)}`}>{formatChange(invoicesChange)}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Clients</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">{t2024.totalClients}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold">{t2025.totalClients}</td>
                    <td className={`py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold ${getChangeColor(clientsChange)}`}>{formatChange(clientsChange)}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Avg Value</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">{formatCurrency(t2024.avgInvoiceValue)}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold">{formatCurrency(t2025.avgInvoiceValue)}</td>
                    <td className={`py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold ${getChangeColor(avgValueChange)}`}>{formatChange(avgValueChange)}</td>
                  </tr>
                  <tr className="border-b border-border/50 bg-premium/5">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-premium" /> <span className="hidden sm:inline">Premium</span><span className="sm:hidden">Prem</span>
                      </div>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">{formatCurrency(t2024.premiumTotal)}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold">{formatCurrency(t2025.premiumTotal)}</td>
                    <td className={`py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold ${getChangeColor(premiumChange)}`}>{formatChange(premiumChange)}</td>
                  </tr>
                  <tr className="border-b border-border/50 bg-normal/5">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-normal" /> Normal
                      </div>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">{formatCurrency(t2024.normalTotal)}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold">{formatCurrency(t2025.normalTotal)}</td>
                    <td className={`py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold ${getChangeColor(normalChange)}`}>{formatChange(normalChange)}</td>
                  </tr>
                  <tr className="bg-one-time/5">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <User className="h-3 w-3 sm:h-4 sm:w-4 text-one-time" /> <span className="hidden sm:inline">One-Time</span><span className="sm:hidden">1-Time</span>
                      </div>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">{formatCurrency(t2024.oneTimeTotal)}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold">{formatCurrency(t2025.oneTimeTotal)}</td>
                    <td className={`py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold ${getChangeColor(oneTimeChange)}`}>{formatChange(oneTimeChange)}</td>
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
