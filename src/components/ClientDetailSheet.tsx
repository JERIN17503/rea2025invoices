import { MultiYearClient } from "@/lib/allYearsClientData";
import { formatCurrency } from "@/lib/formatters";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Crown, Users, User, TrendingUp, TrendingDown, Calendar, FileText, DollarSign, Minus, BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ClientDetailSheetProps {
  client: MultiYearClient | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const YEARS = [2022, 2023, 2024, 2025];
const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];

const getCategoryBadge = (category: string) => {
  switch (category) {
    case "premium":
      return <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30"><Crown className="h-3 w-3 mr-1" />Premium</Badge>;
    case "normal":
      return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30"><Users className="h-3 w-3 mr-1" />Normal</Badge>;
    case "one-time":
      return <Badge className="bg-slate-500/20 text-slate-600 border-slate-500/30"><User className="h-3 w-3 mr-1" />One-Time</Badge>;
    default:
      return null;
  }
};

const ClientDetailSheet = ({ client, open, onOpenChange }: ClientDetailSheetProps) => {
  if (!client) return null;

  // Calculate year-wise data for chart
  const yearlyData = YEARS.map((year) => ({
    year: year.toString(),
    revenue: client.years[year]?.totalAmount || 0,
    invoices: client.years[year]?.invoiceCount || 0,
  }));

  // Calculate quarterly estimates (proportional distribution)
  const quarterlyEstimates = YEARS.map((year) => {
    const yearData = client.years[year];
    if (!yearData) return { year, q1: 0, q2: 0, q3: 0, q4: 0, total: 0 };
    // Distribute based on typical quarter weights (can be refined with actual data)
    const total = yearData.totalAmount;
    return {
      year,
      q1: total * 0.25,
      q2: total * 0.25,
      q3: total * 0.25,
      q4: total * 0.25,
      total,
    };
  });

  // Calculate growth trends
  const revenueByYear = YEARS.map((year) => client.years[year]?.totalAmount || 0);
  const latestRevenue = revenueByYear[revenueByYear.length - 1] || 0;
  const previousRevenue = revenueByYear[revenueByYear.length - 2] || 0;
  const yoyGrowth = previousRevenue > 0 ? ((latestRevenue - previousRevenue) / previousRevenue) * 100 : 0;

  // Pie chart for year distribution
  const yearDistribution = YEARS.filter((year) => client.years[year]?.totalAmount)
    .map((year) => ({
      name: year.toString(),
      value: client.years[year]!.totalAmount,
    }));

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-lg">
            {client.name}
          </SheetTitle>
          <SheetDescription className="flex items-center gap-2 flex-wrap">
            {getCategoryBadge(client.latestCategory)}
            <span className="text-xs">Active: {client.yearsActive.join(", ")}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-[10px] text-muted-foreground">Total Revenue</span>
                </div>
                <p className="text-sm font-bold">{formatCurrency(client.totalRevenue)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="text-[10px] text-muted-foreground">Total Invoices</span>
                </div>
                <p className="text-sm font-bold">{client.totalInvoices}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span className="text-[10px] text-muted-foreground">Years Active</span>
                </div>
                <p className="text-sm font-bold">{client.yearsActive.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  {yoyGrowth >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-[10px] text-muted-foreground">YoY Growth</span>
                </div>
                <p className={`text-sm font-bold ${yoyGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {yoyGrowth >= 0 ? "+" : ""}{yoyGrowth.toFixed(1)}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* H1 Summary */}
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                H1 (First Half) Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[10px] text-muted-foreground">Q1 (Jan-Mar)</p>
                  <p className="text-sm font-semibold">{formatCurrency(client.q1Total)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Q2 (Apr-Jun)</p>
                  <p className="text-sm font-semibold">{formatCurrency(client.q2Total)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">H1 Total</p>
                  <p className="text-sm font-bold text-primary">{formatCurrency(client.h1Total)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue by Year Chart */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-sm">Revenue by Year</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10 }} width={40} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Year-wise Breakdown Table */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-sm">Year-wise Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Year</TableHead>
                    <TableHead className="text-xs text-center">Invoices</TableHead>
                    <TableHead className="text-xs text-center">Category</TableHead>
                    <TableHead className="text-xs text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {YEARS.map((year) => {
                    const yearData = client.years[year];
                    return (
                      <TableRow key={year}>
                        <TableCell className="text-sm font-medium">{year}</TableCell>
                        <TableCell className="text-center">
                          {yearData ? yearData.invoiceCount : <Minus className="h-3 w-3 mx-auto text-muted-foreground" />}
                        </TableCell>
                        <TableCell className="text-center">
                          {yearData ? getCategoryBadge(yearData.category) : <Minus className="h-3 w-3 mx-auto text-muted-foreground" />}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {yearData ? formatCurrency(yearData.totalAmount) : <Minus className="h-3 w-3 ml-auto text-muted-foreground" />}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow className="bg-muted/50 font-bold">
                    <TableCell>Total</TableCell>
                    <TableCell className="text-center">{client.totalInvoices}</TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-right">{formatCurrency(client.totalRevenue)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quarterly Estimates Table */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-sm">Quarterly Revenue Estimates</CardTitle>
              <p className="text-[10px] text-muted-foreground">Based on proportional distribution per year</p>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Year</TableHead>
                      <TableHead className="text-xs text-right">Q1</TableHead>
                      <TableHead className="text-xs text-right">Q2</TableHead>
                      <TableHead className="text-xs text-right">Q3</TableHead>
                      <TableHead className="text-xs text-right">Q4</TableHead>
                      <TableHead className="text-xs text-right font-semibold">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quarterlyEstimates.map((qe) => (
                      <TableRow key={qe.year}>
                        <TableCell className="text-sm font-medium">{qe.year}</TableCell>
                        <TableCell className="text-right text-xs">
                          {qe.total > 0 ? formatCurrency(qe.q1) : <Minus className="h-3 w-3 ml-auto text-muted-foreground" />}
                        </TableCell>
                        <TableCell className="text-right text-xs">
                          {qe.total > 0 ? formatCurrency(qe.q2) : <Minus className="h-3 w-3 ml-auto text-muted-foreground" />}
                        </TableCell>
                        <TableCell className="text-right text-xs">
                          {qe.total > 0 ? formatCurrency(qe.q3) : <Minus className="h-3 w-3 ml-auto text-muted-foreground" />}
                        </TableCell>
                        <TableCell className="text-right text-xs">
                          {qe.total > 0 ? formatCurrency(qe.q4) : <Minus className="h-3 w-3 ml-auto text-muted-foreground" />}
                        </TableCell>
                        <TableCell className="text-right text-xs font-semibold">
                          {qe.total > 0 ? formatCurrency(qe.total) : <Minus className="h-3 w-3 ml-auto text-muted-foreground" />}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Year Revenue Distribution Pie */}
          {yearDistribution.length > 1 && (
            <Card>
              <CardHeader className="p-3 pb-2">
                <CardTitle className="text-sm">Revenue Distribution by Year</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={yearDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {yearDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {/* Activity Timeline */}
          <Card>
            <CardHeader className="p-3 pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="flex gap-2">
                {YEARS.map((year) => {
                  const isActive = client.yearsActive.includes(year);
                  return (
                    <div
                      key={year}
                      className={`flex-1 p-2 rounded text-center ${
                        isActive
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-muted/50 border border-border"
                      }`}
                    >
                      <p className={`text-xs font-semibold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {year}
                      </p>
                      {isActive ? (
                        <p className="text-[9px] text-muted-foreground mt-1">
                          {client.years[year]?.invoiceCount} inv
                        </p>
                      ) : (
                        <p className="text-[9px] text-muted-foreground mt-1">Inactive</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ClientDetailSheet;
