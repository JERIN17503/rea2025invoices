import { getCategoryStats, getSalesPersonStats, getTopClientsByRevenue, premiumClients, normalClients, oneTimeClients } from "@/data/clientData";
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
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Treemap,
  ComposedChart
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, FileText, Target, Award } from "lucide-react";
import { formatCurrency, formatInteger, formatAxisValue } from "@/lib/formatters";

export function ChartsPanel() {
  const stats = getCategoryStats();
  const salesPersonStats = getSalesPersonStats();
  const topClients = getTopClientsByRevenue(10);

  // Revenue distribution by category
  const revenueByCategory = [
    { name: "Premium", value: stats.premium.totalAmount, color: "hsl(var(--premium))" },
    { name: "Normal", value: stats.normal.totalAmount, color: "hsl(var(--normal))" },
    { name: "One-Time", value: stats.oneTime.totalAmount, color: "hsl(var(--one-time))" },
  ];

  // Client count by category
  const clientsByCategory = [
    { name: "Premium", value: stats.premium.count, color: "hsl(var(--premium))" },
    { name: "Normal", value: stats.normal.count, color: "hsl(var(--normal))" },
    { name: "One-Time", value: stats.oneTime.count, color: "hsl(var(--one-time))" },
  ];

  // Invoice count by category
  const invoicesByCategory = [
    { name: "Premium", value: stats.premium.totalInvoices, color: "hsl(var(--premium))" },
    { name: "Normal", value: stats.normal.totalInvoices, color: "hsl(var(--normal))" },
    { name: "One-Time", value: stats.oneTime.totalInvoices, color: "hsl(var(--one-time))" },
  ];

  // Sales person performance data
  const salesData = salesPersonStats.map(sp => ({
    name: sp.name,
    revenue: sp.totalAmount,
    clients: sp.clientCount,
    invoices: sp.invoiceCount,
  }));

  // Top 10 clients bar chart
  const topClientsData = topClients.map(c => ({
    name: c.name.length > 20 ? c.name.slice(0, 20) + "..." : c.name,
    fullName: c.name,
    revenue: c.totalAmount,
    invoices: c.invoiceCount,
  }));

  // Average revenue per client by category - no rounding
  const avgRevenueData = [
    { 
      name: "Premium", 
      avgRevenue: stats.premium.totalAmount / stats.premium.count,
      avgInvoices: stats.premium.totalInvoices / stats.premium.count,
      color: "hsl(var(--premium))"
    },
    { 
      name: "Normal", 
      avgRevenue: stats.normal.totalAmount / stats.normal.count,
      avgInvoices: stats.normal.totalInvoices / stats.normal.count,
      color: "hsl(var(--normal))"
    },
    { 
      name: "One-Time", 
      avgRevenue: stats.oneTime.totalAmount / stats.oneTime.count,
      avgInvoices: 1,
      color: "hsl(var(--one-time))"
    },
  ];

  // Revenue ranges data
  const getRevenueRanges = () => {
    const allClients = [...premiumClients, ...normalClients, ...oneTimeClients];
    const ranges = [
      { name: "< 1K", min: 0, max: 1000, count: 0 },
      { name: "1K-5K", min: 1000, max: 5000, count: 0 },
      { name: "5K-10K", min: 5000, max: 10000, count: 0 },
      { name: "10K-25K", min: 10000, max: 25000, count: 0 },
      { name: "25K-50K", min: 25000, max: 50000, count: 0 },
      { name: "50K-100K", min: 50000, max: 100000, count: 0 },
      { name: "> 100K", min: 100000, max: Infinity, count: 0 },
    ];
    
    allClients.forEach(client => {
      const range = ranges.find(r => client.totalAmount >= r.min && client.totalAmount < r.max);
      if (range) range.count++;
    });
    
    return ranges;
  };
  const revenueRanges = getRevenueRanges();

  // Radar chart data for category comparison
  const radarData = [
    { 
      subject: 'Revenue Share', 
      Premium: (stats.premium.totalAmount / stats.total.totalAmount) * 100,
      Normal: (stats.normal.totalAmount / stats.total.totalAmount) * 100,
      OneTime: (stats.oneTime.totalAmount / stats.total.totalAmount) * 100,
    },
    { 
      subject: 'Client Share', 
      Premium: (stats.premium.count / stats.total.count) * 100,
      Normal: (stats.normal.count / stats.total.count) * 100,
      OneTime: (stats.oneTime.count / stats.total.count) * 100,
    },
    { 
      subject: 'Invoice Share', 
      Premium: (stats.premium.totalInvoices / stats.total.totalInvoices) * 100,
      Normal: (stats.normal.totalInvoices / stats.total.totalInvoices) * 100,
      OneTime: (stats.oneTime.totalInvoices / stats.total.totalInvoices) * 100,
    },
    { 
      subject: 'Avg Value', 
      Premium: Math.min((stats.premium.totalAmount / stats.premium.count) / 500, 100),
      Normal: Math.min((stats.normal.totalAmount / stats.normal.count) / 500, 100),
      OneTime: Math.min((stats.oneTime.totalAmount / stats.oneTime.count) / 500, 100),
    },
  ];

  // Treemap data for revenue distribution
  const treemapData = topClients.slice(0, 15).map(c => ({
    name: c.name.length > 15 ? c.name.slice(0, 15) + "..." : c.name,
    size: c.totalAmount,
    category: c.category,
  }));

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

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const isRevenue = data.value > 1000;
      const total = isRevenue ? stats.total.totalAmount : stats.total.count;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-card-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {isRevenue ? formatCurrency(data.value) : data.value}
          </p>
          <p className="text-xs text-muted-foreground">
            {((data.value / total) * 100).toFixed(1)}%
          </p>
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

  const COLORS = ['hsl(var(--premium))', 'hsl(var(--normal))', 'hsl(var(--one-time))'];

  return (
    <div className="space-y-6">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
                <p className="text-lg font-bold">{formatCurrency(stats.total.totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-premium/10 to-premium/5 border-premium/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-premium/20 rounded-lg">
                <Award className="h-5 w-5 text-premium" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Premium Value</p>
                <p className="text-lg font-bold">{formatCurrency(stats.premium.totalAmount / stats.premium.count)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-normal/10 to-normal/5 border-normal/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-normal/20 rounded-lg">
                <Users className="h-5 w-5 text-normal" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Clients</p>
                <p className="text-xl font-bold">{stats.total.count}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-one-time/10 to-one-time/5 border-one-time/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-one-time/20 rounded-lg">
                <FileText className="h-5 w-5 text-one-time" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Invoices</p>
                <p className="text-xl font-bold">{stats.total.totalInvoices}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pie Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue Distribution Pie */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Revenue by Category
            </CardTitle>
            <CardDescription>Distribution of total revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1">
              {revenueByCategory.map((item) => (
                <div key={item.name} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Client Count Pie */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-normal" />
              Clients by Category
            </CardTitle>
            <CardDescription>Number of clients in each segment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={clientsByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {clientsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1">
              {clientsByCategory.map((item) => (
                <div key={item.name} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium">{item.value} clients</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invoice Count Pie */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-one-time" />
              Invoices by Category
            </CardTitle>
            <CardDescription>Invoice distribution across segments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={invoicesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {invoicesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1">
              {invoicesByCategory.map((item) => (
                <div key={item.name} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium">{item.value} invoices</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Average Revenue & Client Value Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Average Revenue per Client */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Average Value per Client
            </CardTitle>
            <CardDescription>Comparing client value across segments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={avgRevenueData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis tickFormatter={(value) => formatAxisValue(value)} className="text-muted-foreground" />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    name === 'avgRevenue' ? formatCurrency(value) : value,
                    name === 'avgRevenue' ? 'Avg Revenue' : 'Avg Invoices'
                  ]}
                />
                <Legend />
                <Bar dataKey="avgRevenue" name="Avg Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="avgInvoices" name="Avg Invoices" stroke="hsl(var(--chart-2))" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Client Distribution by Revenue Range */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Client Distribution by Revenue
            </CardTitle>
            <CardDescription>Number of clients in each revenue bracket</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueRanges} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  name="Clients"
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top 10 Clients Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-premium" />
            Top 10 Clients by Revenue
          </CardTitle>
          <CardDescription>Your highest value customers</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topClientsData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis type="number" tickFormatter={(value) => formatAxisValue(value)} className="text-muted-foreground" />
              <YAxis type="category" dataKey="name" width={120} className="text-muted-foreground text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--premium))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Radar Chart & Sales Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Category Performance Radar</CardTitle>
            <CardDescription>Multi-dimensional comparison of client segments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid className="stroke-border" />
                <PolarAngleAxis dataKey="subject" className="text-muted-foreground text-xs" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} className="text-muted-foreground" />
                <Radar name="Premium" dataKey="Premium" stroke="hsl(var(--premium))" fill="hsl(var(--premium))" fillOpacity={0.3} />
                <Radar name="Normal" dataKey="Normal" stroke="hsl(var(--normal))" fill="hsl(var(--normal))" fillOpacity={0.3} />
                <Radar name="One-Time" dataKey="OneTime" stroke="hsl(var(--one-time))" fill="hsl(var(--one-time))" fillOpacity={0.3} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales Person Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Sales Person Performance
            </CardTitle>
            <CardDescription>Revenue and client count by account manager</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => formatAxisValue(value)} className="text-muted-foreground" />
                <YAxis yAxisId="right" orientation="right" className="text-muted-foreground" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="clients" name="Clients" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Comparison Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Category Comparison Summary</CardTitle>
          <CardDescription>Detailed breakdown of each client segment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-premium/10 border border-premium/20 rounded-xl p-6">
              <h4 className="font-semibold text-premium mb-4 flex items-center gap-2">
                <Award className="h-5 w-5" />
                Premium Clients
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Clients</span>
                  <span className="font-bold text-2xl">{stats.premium.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Invoices</span>
                  <span className="font-semibold">{stats.premium.totalInvoices}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span className="font-semibold text-premium">{formatCurrency(stats.premium.totalAmount)}</span>
                </div>
                <div className="border-t border-premium/20 pt-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg per Client</span>
                    <span className="font-semibold">{formatCurrency(stats.premium.totalAmount / stats.premium.count)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Invoices</span>
                    <span className="font-semibold">{(stats.premium.totalInvoices / stats.premium.count).toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-normal/10 border border-normal/20 rounded-xl p-6">
              <h4 className="font-semibold text-normal mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Normal Clients
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Clients</span>
                  <span className="font-bold text-2xl">{stats.normal.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Invoices</span>
                  <span className="font-semibold">{stats.normal.totalInvoices}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span className="font-semibold text-normal">{formatCurrency(stats.normal.totalAmount)}</span>
                </div>
                <div className="border-t border-normal/20 pt-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg per Client</span>
                    <span className="font-semibold">{formatCurrency(stats.normal.totalAmount / stats.normal.count)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Invoices</span>
                    <span className="font-semibold">{(stats.normal.totalInvoices / stats.normal.count).toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-one-time/10 border border-one-time/20 rounded-xl p-6">
              <h4 className="font-semibold text-one-time mb-4 flex items-center gap-2">
                <Target className="h-5 w-5" />
                One-Time Clients
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Clients</span>
                  <span className="font-bold text-2xl">{stats.oneTime.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Invoices</span>
                  <span className="font-semibold">{stats.oneTime.totalInvoices}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span className="font-semibold text-one-time">{formatCurrency(stats.oneTime.totalAmount)}</span>
                </div>
                <div className="border-t border-one-time/20 pt-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg per Client</span>
                    <span className="font-semibold">{formatCurrency(stats.oneTime.totalAmount / stats.oneTime.count)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Conversion Target</span>
                    <span className="font-semibold text-one-time">High Priority</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
