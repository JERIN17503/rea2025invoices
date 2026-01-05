import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { loadMasterlistAggregates } from "@/lib/masterlistAggregates";
import { loadMasterlistAggregates2022 } from "@/lib/masterlistAggregates2022";
import { loadMasterlistAggregates2023 } from "@/lib/masterlistAggregates2023";
import { loadMasterlistAggregates2024 } from "@/lib/masterlistAggregates2024";
import { formatCurrency } from "@/lib/formatters";
import { exportYoYComparisonPDF } from "@/lib/pdfExport";
import reaLogo from "@/assets/rea_logo.jpg";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
  FileDown,
  Loader2,
  List,
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

const YEARS = [2022, 2023, 2024, 2025];
const YEAR_COLORS = {
  2022: "hsl(var(--muted-foreground))",
  2023: "hsl(220, 70%, 50%)",
  2024: "hsl(280, 70%, 50%)",
  2025: "hsl(var(--primary))",
};

const YoYComparison = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const { data: data2022, isLoading: loading2022 } = useQuery({
    queryKey: ["masterlist-2022-aggregates"],
    queryFn: () => Promise.resolve(loadMasterlistAggregates2022()),
  });

  const { data: data2023, isLoading: loading2023 } = useQuery({
    queryKey: ["masterlist-2023-aggregates"],
    queryFn: loadMasterlistAggregates2023,
  });

  const { data: data2024, isLoading: loading2024 } = useQuery({
    queryKey: ["masterlist-2024-aggregates", "v6"],
    queryFn: loadMasterlistAggregates2024,
  });

  const { data: data2025, isLoading: loading2025 } = useQuery({
    queryKey: ["masterlist-2025-aggregates"],
    queryFn: loadMasterlistAggregates,
  });

  const isLoading = loading2022 || loading2023 || loading2024 || loading2025;

  if (isLoading || !data2022 || !data2023 || !data2024 || !data2025) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading comparison data…</p>
      </div>
    );
  }

  const yearData = {
    2022: data2022.totals,
    2023: data2023.totals,
    2024: data2024.totals,
    2025: data2025.totals,
  };

  const calcChange = (vPrev: number, vCurrent: number) => {
    if (vPrev === 0) return vCurrent > 0 ? 100 : 0;
    return ((vCurrent - vPrev) / vPrev) * 100;
  };

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

  // Build comparison data for all 4 years
  const revenueComparison = YEARS.map((year, idx) => ({
    year: year.toString(),
    revenue: yearData[year].totalRevenue,
    change: idx > 0 ? calcChange(yearData[YEARS[idx - 1]].totalRevenue, yearData[year].totalRevenue) : 0,
  }));

  const segmentComparison = YEARS.map((year) => ({
    year: year.toString(),
    premium: yearData[year].premiumTotal,
    normal: yearData[year].normalTotal,
    oneTime: yearData[year].oneTimeTotal,
  }));

  // Monthly comparison (using 2024 vs 2025 as primary for charts)
  const monthlyComparison = data2024.monthlyData.map((m, idx) => {
    const m2022 = data2022.monthlyData[idx];
    const m2023 = data2023.monthlyData[idx];
    const m2025 = data2025.monthlyData[idx];
    return {
      month: m.month.slice(0, 3),
      revenue2022: m2022?.revenue ?? 0,
      revenue2023: m2023?.revenue ?? 0,
      revenue2024: m.revenue,
      revenue2025: m2025?.revenue ?? 0,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-card-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportYoYComparisonPDF(
        data2024.totals,
        data2025.totals,
        data2024.monthlyData,
        data2025.monthlyData,
        'yoy-charts-section'
      );
      toast({
        title: "PDF Exported",
        description: "Year-over-Year comparison report has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Calculate YoY changes
  const yoyChanges = {
    revenue: calcChange(yearData[2024].totalRevenue, yearData[2025].totalRevenue),
    invoices: calcChange(yearData[2024].totalInvoices, yearData[2025].totalInvoices),
    clients: calcChange(yearData[2024].totalClients, yearData[2025].totalClients),
    avgValue: calcChange(yearData[2024].avgInvoiceValue, yearData[2025].avgInvoiceValue),
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
                <p className="text-xs sm:text-sm text-muted-foreground">4-Year Analysis (2022-2025)</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                disabled={isExporting}
                className="flex items-center gap-1.5 text-xs sm:text-sm"
              >
                {isExporting ? (
                  <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                ) : (
                  <FileDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
                <span className="hidden sm:inline">Export PDF</span>
                <span className="sm:hidden">PDF</span>
              </Button>
              <Link
                to="/all-clients"
                className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium"
              >
                <List className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">All Clients</span>
              </Link>
              {YEARS.map((year) => (
                <Link
                  key={year}
                  to={year === 2025 ? "/" : `/${year}`}
                  className="flex items-center gap-1.5 px-2 sm:px-3 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-xs sm:text-sm font-medium"
                >
                  <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  {year}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Key Metrics - All Years (2022-2025) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
          <Card>
            <CardContent className="p-3 sm:pt-6 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">Revenue</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendIcon change={yoyChanges.revenue} />
                  <span className={`text-xs sm:text-sm font-semibold ${getChangeColor(yoyChanges.revenue)}`}>{formatChange(yoyChanges.revenue)}</span>
                </div>
              </div>
              <div className="space-y-1">
                {YEARS.map((year) => (
                  <div key={year} className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{year}</span>
                    <span className={`text-xs sm:text-base font-bold ${year === 2025 ? 'text-primary' : ''}`}>{formatCurrency(yearData[year].totalRevenue)}</span>
                  </div>
                ))}
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
                  <TrendIcon change={yoyChanges.invoices} />
                  <span className={`text-xs sm:text-sm font-semibold ${getChangeColor(yoyChanges.invoices)}`}>{formatChange(yoyChanges.invoices)}</span>
                </div>
              </div>
              <div className="space-y-1">
                {YEARS.map((year) => (
                  <div key={year} className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{year}</span>
                    <span className={`text-xs sm:text-base font-bold ${year === 2025 ? 'text-primary' : ''}`}>{yearData[year].totalInvoices}</span>
                  </div>
                ))}
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
                  <TrendIcon change={yoyChanges.clients} />
                  <span className={`text-xs sm:text-sm font-semibold ${getChangeColor(yoyChanges.clients)}`}>{formatChange(yoyChanges.clients)}</span>
                </div>
              </div>
              <div className="space-y-1">
                {YEARS.map((year) => (
                  <div key={year} className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{year}</span>
                    <span className={`text-xs sm:text-base font-bold ${year === 2025 ? 'text-primary' : ''}`}>{yearData[year].totalClients}</span>
                  </div>
                ))}
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
                  <TrendIcon change={yoyChanges.avgValue} />
                  <span className={`text-xs sm:text-sm font-semibold ${getChangeColor(yoyChanges.avgValue)}`}>{formatChange(yoyChanges.avgValue)}</span>
                </div>
              </div>
              <div className="space-y-1">
                {YEARS.map((year) => (
                  <div key={year} className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{year}</span>
                    <span className={`text-xs sm:text-base font-bold ${year === 2025 ? 'text-primary' : ''}`}>{formatCurrency(yearData[year].avgInvoiceValue)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="yoy-charts-section">
          {/* 4-Year Revenue Trend */}
          <Card className="mb-4 sm:mb-8">
            <CardHeader className="p-3 sm:p-6 pb-2 sm:pb-2">
              <CardTitle className="text-base sm:text-lg">4-Year Revenue Trend</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Annual revenue comparison across all years</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-6 pt-0 sm:pt-0">
              <ResponsiveContainer width="100%" height={250} className="sm:!h-[350px]">
                <BarChart data={revenueComparison}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 10 }} width={50} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Segment Breakdown by Year */}
          <Card className="mb-4 sm:mb-8">
            <CardHeader className="p-3 sm:p-6 pb-2 sm:pb-2">
              <CardTitle className="text-base sm:text-lg">Segment Breakdown by Year</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Premium, Normal, and One-Time revenue distribution</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-6 pt-0 sm:pt-0">
              <ResponsiveContainer width="100%" height={280} className="sm:!h-[350px]">
                <BarChart data={segmentComparison}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 10 }} width={50} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar dataKey="premium" name="Premium" fill="hsl(var(--premium))" stackId="a" />
                  <Bar dataKey="normal" name="Normal" fill="hsl(var(--normal))" stackId="a" />
                  <Bar dataKey="oneTime" name="One-Time" fill="hsl(var(--one-time))" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Revenue Comparison (All 4 Years) */}
          <Card className="mb-4 sm:mb-8">
            <CardHeader className="p-3 sm:p-6 pb-2 sm:pb-2">
              <CardTitle className="text-base sm:text-lg">Monthly Revenue Comparison</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Monthly trends across all 4 years</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-6 pt-0 sm:pt-0">
              <ResponsiveContainer width="100%" height={280} className="sm:!h-[400px]">
                <LineChart data={monthlyComparison} margin={{ left: -10, right: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10 }} width={40} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <Line type="monotone" dataKey="revenue2022" name="2022" stroke={YEAR_COLORS[2022]} strokeWidth={1.5} dot={{ r: 2 }} strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="revenue2023" name="2023" stroke={YEAR_COLORS[2023]} strokeWidth={1.5} dot={{ r: 2 }} strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="revenue2024" name="2024" stroke={YEAR_COLORS[2024]} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="revenue2025" name="2025" stroke={YEAR_COLORS[2025]} strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Full Year Summary Table */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Full Year Summary</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Complete breakdown across all 4 years</CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold">Metric</th>
                    {YEARS.map((year) => (
                      <th key={year} className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold">{year}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Revenue</td>
                    {YEARS.map((year) => (
                      <td key={year} className={`py-2 sm:py-3 px-2 sm:px-4 text-right ${year === 2025 ? "font-semibold" : ""}`}>
                        {formatCurrency(yearData[year].totalRevenue)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Invoices</td>
                    {YEARS.map((year) => (
                      <td key={year} className={`py-2 sm:py-3 px-2 sm:px-4 text-right ${year === 2025 ? "font-semibold" : ""}`}>
                        {yearData[year].totalInvoices}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Clients</td>
                    {YEARS.map((year) => (
                      <td key={year} className={`py-2 sm:py-3 px-2 sm:px-4 text-right ${year === 2025 ? "font-semibold" : ""}`}>
                        {yearData[year].totalClients}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Avg Value</td>
                    {YEARS.map((year) => (
                      <td key={year} className={`py-2 sm:py-3 px-2 sm:px-4 text-right ${year === 2025 ? "font-semibold" : ""}`}>
                        {formatCurrency(yearData[year].avgInvoiceValue)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50 bg-premium/5">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-premium" />
                        <span className="hidden sm:inline">Premium</span>
                        <span className="sm:hidden">Prem</span>
                      </div>
                    </td>
                    {YEARS.map((year) => (
                      <td key={year} className={`py-2 sm:py-3 px-2 sm:px-4 text-right ${year === 2025 ? "font-semibold" : ""}`}>
                        {formatCurrency(yearData[year].premiumTotal)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50 bg-normal/5">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-normal" />
                        Normal
                      </div>
                    </td>
                    {YEARS.map((year) => (
                      <td key={year} className={`py-2 sm:py-3 px-2 sm:px-4 text-right ${year === 2025 ? "font-semibold" : ""}`}>
                        {formatCurrency(yearData[year].normalTotal)}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-one-time/5">
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <User className="h-3 w-3 sm:h-4 sm:w-4 text-one-time" />
                        <span className="hidden sm:inline">One-Time</span>
                        <span className="sm:hidden">1-Time</span>
                      </div>
                    </td>
                    {YEARS.map((year) => (
                      <td key={year} className={`py-2 sm:py-3 px-2 sm:px-4 text-right ${year === 2025 ? "font-semibold" : ""}`}>
                        {formatCurrency(yearData[year].oneTimeTotal)}
                      </td>
                    ))}
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
