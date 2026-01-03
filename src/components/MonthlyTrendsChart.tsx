import { getMonthlyData, MonthlyData, getAccurateTotals } from "@/data/clientData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { forwardRef } from "react";
import { formatCurrency, formatInteger, formatAxisValue } from "@/lib/formatters";
import { FileText, DollarSign, Users, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { loadMasterlistAggregates } from "@/lib/masterlistAggregates";

interface MonthlyTrendsChartProps {
  data?: MonthlyData[];
  title?: string;
  description?: string;
  showDetailedTable?: boolean;
}

export function MonthlyTrendsChart({
  data,
  title = "Monthly Performance Analysis",
  description = "Detailed monthly breakdown of invoices, revenue, and clients",
  showDetailedTable = true,
}: MonthlyTrendsChartProps) {
  const {
    data: masterlist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["masterlist-2025-aggregates"],
    queryFn: loadMasterlistAggregates,
  });

  const monthlyData: MonthlyData[] = masterlist?.monthlyData ?? data ?? getMonthlyData();

  const accurateTotals = masterlist?.totals
    ? {
        totalRevenue: masterlist.totals.totalRevenue,
        totalInvoices: masterlist.totals.totalInvoices,
        avgInvoiceValue: masterlist.totals.avgInvoiceValue,
        totalClients: masterlist.totals.totalClients,
        premiumTotal: masterlist.totals.premiumTotal,
        normalTotal: masterlist.totals.normalTotal,
        oneTimeTotal: masterlist.totals.oneTimeTotal,
      }
    : getAccurateTotals();

  const CustomTooltip = forwardRef<HTMLDivElement, any>(({ active, payload, label }, ref) => {
    if (active && payload && payload.length) {
      const monthData = monthlyData.find((m) => m.month === label);
      return (
        <div ref={ref} className="bg-card border border-border rounded-lg p-4 shadow-lg min-w-[280px]">
          <p className="font-semibold text-card-foreground mb-3 text-lg border-b border-border pb-2">{label} 2025</p>
          <div className="space-y-2">
            {payload.map((entry: any, index: number) => (
              <p key={index} style={{ color: entry.color }} className="text-sm flex justify-between">
                <span>{entry.name}:</span>
                <span className="font-medium">
                  {entry.name.includes("Revenue") || entry.name.includes("Value")
                    ? formatCurrency(entry.value)
                    : formatInteger(entry.value)}
                </span>
              </p>
            ))}
          </div>
          {monthData && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">Top clients this month:</p>
              {monthData.topClients.slice(0, 3).map((client: any, i: number) => (
                <p key={i} className="text-xs text-muted-foreground truncate">
                  • {client.name}: {formatCurrency(client.revenue)}
                </p>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'premium':
        return <Badge className="bg-premium/20 text-premium border-premium/30">Premium</Badge>;
      case 'normal':
        return <Badge className="bg-normal/20 text-normal border-normal/30">Normal</Badge>;
      case 'one-time':
        return <Badge className="bg-one-time/20 text-one-time border-one-time/30">One-Time</Badge>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>Loading masterlist totals…</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">Please wait while we tally monthly trends from the masterlist.</div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>Could not load the masterlist file.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">The monthly trends need the masterlist at /public/data/masterlist2025.xlsx.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards - Using accurate totals from actual client data */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Total Revenue</p>
            </div>
            <p className="text-lg font-bold mt-1">{formatCurrency(accurateTotals.totalRevenue)}</p>
            <p className="text-xs text-muted-foreground">Jan - Dec 2025 (Actual)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Total Invoices</p>
            </div>
            <p className="text-lg font-bold mt-1">{formatInteger(accurateTotals.totalInvoices)}</p>
            <p className="text-xs text-muted-foreground">Across all clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Avg Invoice Value</p>
            </div>
            <p className="text-lg font-bold mt-1">{formatCurrency(accurateTotals.avgInvoiceValue)}</p>
            <p className="text-xs text-muted-foreground">Per invoice</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Total Clients</p>
            </div>
            <p className="text-lg font-bold mt-1">{formatInteger(accurateTotals.totalClients)}</p>
            <p className="text-xs text-muted-foreground">All categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="segments">Segments</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="table">Data Table</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="left" tickFormatter={formatAxisValue} tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="revenue" 
                    name="Total Revenue"
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1}
                    fill="url(#colorRevenue)" 
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="invoices"
                    name="Invoices"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="invoices">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="premiumInvoices" name="Premium Invoices" fill="hsl(var(--premium))" stackId="invoices" />
                  <Bar dataKey="normalInvoices" name="Normal Invoices" fill="hsl(var(--normal))" stackId="invoices" />
                  <Bar dataKey="oneTimeInvoices" name="One-Time Invoices" fill="hsl(var(--one-time))" stackId="invoices" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="segments">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={formatAxisValue} tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="premiumRevenue" name="Premium Revenue" fill="hsl(var(--premium))" stackId="a" />
                  <Bar dataKey="normalRevenue" name="Normal Revenue" fill="hsl(var(--normal))" stackId="a" />
                  <Bar dataKey="oneTimeRevenue" name="One-Time Revenue" fill="hsl(var(--one-time))" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="clients">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="premiumClients" 
                    name="Premium Clients"
                    stroke="hsl(var(--premium))" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="normalClients" 
                    name="Normal Clients"
                    stroke="hsl(var(--normal))" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="oneTimeClients" 
                    name="One-Time Clients"
                    stroke="hsl(var(--one-time))" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clients" 
                    name="Total Active"
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="table">
              <ScrollArea className="h-[350px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Invoices</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Clients</TableHead>
                      <TableHead className="text-right">Avg Value</TableHead>
                      <TableHead className="text-right">Premium</TableHead>
                      <TableHead className="text-right">Normal</TableHead>
                      <TableHead className="text-right">One-Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyData.map((month) => (
                      <TableRow key={month.month}>
                        <TableCell className="font-medium">{month.month}</TableCell>
                        <TableCell className="text-right">{formatInteger(month.invoices)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(month.revenue)}</TableCell>
                        <TableCell className="text-right">{formatInteger(month.clients)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(month.avgInvoiceValue)}</TableCell>
                        <TableCell className="text-right text-premium">{formatCurrency(month.premiumRevenue)}</TableCell>
                        <TableCell className="text-right text-normal">{formatCurrency(month.normalRevenue)}</TableCell>
                        <TableCell className="text-right text-one-time">{formatCurrency(month.oneTimeRevenue)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50 font-semibold">
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right">{formatInteger(accurateTotals.totalInvoices)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(accurateTotals.totalRevenue)}</TableCell>
                      <TableCell className="text-right">{formatInteger(accurateTotals.totalClients)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(accurateTotals.avgInvoiceValue)}</TableCell>
                      <TableCell className="text-right text-premium">{formatCurrency(accurateTotals.premiumTotal)}</TableCell>
                      <TableCell className="text-right text-normal">{formatCurrency(accurateTotals.normalTotal)}</TableCell>
                      <TableCell className="text-right text-one-time">{formatCurrency(accurateTotals.oneTimeTotal)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Top Clients Per Month */}
      {showDetailedTable && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top Performing Clients by Month</CardTitle>
            <CardDescription>Highest revenue clients for each month</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Top Client</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Invoices</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyData.map((month) => (
                    month.topClients.slice(0, 3).map((client, i) => (
                      <TableRow key={`${month.month}-${i}`} className={i > 0 ? "border-0" : ""}>
                        {i === 0 && (
                          <TableCell rowSpan={Math.min(3, month.topClients.length)} className="font-medium align-top">
                            {month.month}
                          </TableCell>
                        )}
                        <TableCell className="max-w-[200px] truncate">{client.name}</TableCell>
                        <TableCell>{getCategoryBadge(client.category)}</TableCell>
                        <TableCell className="text-right">{formatInteger(client.invoices)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(client.revenue)}</TableCell>
                      </TableRow>
                    ))
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface SegmentMonthlyChartProps {
  category: 'premium' | 'normal' | 'one-time';
  categoryColor: string;
  categoryLabel: string;
  data: MonthlyData[];
}

export function SegmentMonthlyChart({ category, categoryColor, categoryLabel, data }: SegmentMonthlyChartProps) {
  // Calculate totals for this category
  const totals = data.reduce((acc, month) => ({
    revenue: acc.revenue + month.revenue,
    invoices: acc.invoices + month.invoices,
    clients: Math.max(acc.clients, month.clients)
  }), { revenue: 0, invoices: 0, clients: 0 });

  const CustomTooltip = forwardRef<HTMLDivElement, any>(({ active, payload, label }, ref) => {
    if (active && payload && payload.length) {
      const monthData = data.find((m) => m.month === label);
      return (
        <div ref={ref} className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-card-foreground mb-2">{label} 2025</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.name.includes("Revenue") ? formatCurrency(entry.value) : formatInteger(entry.value)}
            </p>
          ))}
          {monthData && (
            <>
              <p className="text-sm text-muted-foreground mt-1">Invoices: {formatInteger(monthData.invoices)}</p>
              <p className="text-sm text-muted-foreground">Clients: {formatInteger(monthData.clients)}</p>
            </>
          )}
        </div>
      );
    }
    return null;
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{categoryLabel} Monthly Performance</CardTitle>
        <CardDescription>
          Total: {formatCurrency(totals.revenue)} revenue, {formatInteger(totals.invoices)} invoices across {formatInteger(totals.clients)} clients
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="table">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id={`color${category}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={categoryColor} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={categoryColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tickFormatter={formatAxisValue} tick={{ fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Revenue"
                  stroke={categoryColor} 
                  fillOpacity={1}
                  fill={`url(#color${category})`}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="invoices">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="invoices" 
                  name="Invoices"
                  fill={categoryColor} 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="table">
            <ScrollArea className="h-[200px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead className="text-right">Invoices</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Clients</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((month) => (
                    <TableRow key={month.month}>
                      <TableCell className="font-medium">{month.month}</TableCell>
                      <TableCell className="text-right">{formatInteger(month.invoices)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(month.revenue)}</TableCell>
                      <TableCell className="text-right">{formatInteger(month.clients)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
