import { getCategoryStats, getSalesPersonStats, getTopClientsByRevenue, premiumClients, normalClients, oneTimeClients } from "@/data/clientData";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-card-foreground">{payload[0]?.payload?.fullName || label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.name === 'revenue' ? formatCurrency(entry.value) : entry.value}
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
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-card-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.name === 'Revenue' || data.payload?.value > 1000 
              ? formatCurrency(data.value) 
              : data.value}
          </p>
          <p className="text-xs text-muted-foreground">
            {((data.value / (data.payload?.value > 1000 ? stats.total.totalAmount : stats.total.count)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-medium">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      {/* Pie Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue Distribution Pie */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Revenue by Category</CardTitle>
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
            <CardTitle className="text-lg">Clients by Category</CardTitle>
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
            <CardTitle className="text-lg">Invoices by Category</CardTitle>
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

      {/* Top 10 Clients Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Clients by Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topClientsData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} className="text-muted-foreground" />
              <YAxis type="category" dataKey="name" width={120} className="text-muted-foreground text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sales Person Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Person Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-muted-foreground" />
              <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => formatCurrency(value)} className="text-muted-foreground" />
              <YAxis yAxisId="right" orientation="right" className="text-muted-foreground" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="clients" name="Clients" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Category Comparison: Revenue vs Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-premium/10 border border-premium/20 rounded-xl p-6 text-center">
              <h4 className="font-semibold text-premium mb-2">Premium Clients</h4>
              <p className="text-3xl font-bold text-card-foreground">{stats.premium.count}</p>
              <p className="text-sm text-muted-foreground">{stats.premium.totalInvoices} invoices</p>
              <p className="text-lg font-semibold text-premium mt-2">{formatCurrency(stats.premium.totalAmount)}</p>
              <p className="text-xs text-muted-foreground">
                Avg: {formatCurrency(stats.premium.totalAmount / stats.premium.count)} per client
              </p>
            </div>
            <div className="bg-normal/10 border border-normal/20 rounded-xl p-6 text-center">
              <h4 className="font-semibold text-normal mb-2">Normal Clients</h4>
              <p className="text-3xl font-bold text-card-foreground">{stats.normal.count}</p>
              <p className="text-sm text-muted-foreground">{stats.normal.totalInvoices} invoices</p>
              <p className="text-lg font-semibold text-normal mt-2">{formatCurrency(stats.normal.totalAmount)}</p>
              <p className="text-xs text-muted-foreground">
                Avg: {formatCurrency(stats.normal.totalAmount / stats.normal.count)} per client
              </p>
            </div>
            <div className="bg-one-time/10 border border-one-time/20 rounded-xl p-6 text-center">
              <h4 className="font-semibold text-one-time mb-2">One-Time Clients</h4>
              <p className="text-3xl font-bold text-card-foreground">{stats.oneTime.count}</p>
              <p className="text-sm text-muted-foreground">{stats.oneTime.totalInvoices} invoices</p>
              <p className="text-lg font-semibold text-one-time mt-2">{formatCurrency(stats.oneTime.totalAmount)}</p>
              <p className="text-xs text-muted-foreground">
                Avg: {formatCurrency(stats.oneTime.totalAmount / stats.oneTime.count)} per client
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
