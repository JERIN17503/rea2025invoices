import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { loadMasterlistAggregates2024 } from "@/lib/masterlistAggregates2024";
import { StatsCard } from "@/components/StatsCard";
import { MonthlyTrendsChart2024 } from "@/components/MonthlyTrendsChart2024";
import { SegmentCharts2024 } from "@/components/SegmentCharts2024";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, 
  User, 
  Users, 
  FileText, 
  DollarSign,
  TrendingUp,
  Calendar,
  ArrowRight
} from "lucide-react";
import reaLogo from "@/assets/rea_logo.jpg";
import { formatCurrency } from "@/lib/formatters";

const Dashboard2024 = () => {
  const { data: masterlist, isLoading } = useQuery({
    queryKey: ["masterlist-2024-aggregates"],
    queryFn: loadMasterlistAggregates2024,
  });

  const totals = masterlist?.totals;
  const monthlyData = masterlist?.monthlyData ?? [];

  // Derive segment stats from monthly data
  const premiumClients = new Set<string>();
  const normalClients = new Set<string>();
  const oneTimeClients = new Set<string>();
  
  let premiumInvoices = 0;
  let normalInvoices = 0;
  let oneTimeInvoices = 0;

  for (const m of monthlyData) {
    premiumInvoices += m.premiumInvoices;
    normalInvoices += m.normalInvoices;
    oneTimeInvoices += m.oneTimeInvoices;
  }

  // Approximate client counts from totals
  const premiumCount = monthlyData.reduce((max, m) => Math.max(max, m.premiumClients), 0);
  const normalCount = monthlyData.reduce((max, m) => Math.max(max, m.normalClients), 0);
  const oneTimeCount = monthlyData.reduce((max, m) => Math.max(max, m.oneTimeClients), 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading 2024 data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={reaLogo} alt="REA Advertising" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Client Remarketing Dashboard</h1>
                <p className="text-sm text-muted-foreground">Invoice Masterlist 2024 Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                View 2025
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{totals?.totalInvoices ?? 0} invoices analyzed</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <StatsCard
            title="Total Clients"
            value={totals?.totalClients ?? 0}
            subtitle={`${totals?.totalInvoices ?? 0} total invoices`}
            icon={Users}
          />
          <StatsCard
            title="Premium Clients"
            value={premiumCount}
            subtitle={`${premiumInvoices} invoices`}
            icon={Crown}
            iconColor="text-premium"
          />
          <StatsCard
            title="Normal Clients"
            value={normalCount}
            subtitle={`${normalInvoices} invoices`}
            icon={Users}
            iconColor="text-normal"
          />
          <StatsCard
            title="One-Time Clients"
            value={oneTimeCount}
            subtitle={`${oneTimeInvoices} invoices`}
            icon={User}
            iconColor="text-one-time"
          />
          <StatsCard
            title="Total Revenue"
            value={formatCurrency(totals?.totalRevenue ?? 0)}
            subtitle="2024 Full Year"
            icon={DollarSign}
            iconColor="text-accent"
          />
        </div>

        {/* Revenue Breakdown */}
        <h2 className="text-lg font-semibold text-foreground mb-4">Revenue Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-premium/10 to-premium/5 rounded-xl border border-premium/20 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-5 w-5 text-premium" />
              <h3 className="font-semibold text-card-foreground">Premium Revenue</h3>
            </div>
            <p className="text-3xl font-bold text-card-foreground">{formatCurrency(totals?.premiumTotal ?? 0)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {totals?.totalRevenue ? ((totals.premiumTotal / totals.totalRevenue) * 100).toFixed(1) : 0}% of total
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-normal/10 to-normal/5 rounded-xl border border-normal/20 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-normal" />
              <h3 className="font-semibold text-card-foreground">Normal Clients Revenue</h3>
            </div>
            <p className="text-3xl font-bold text-card-foreground">{formatCurrency(totals?.normalTotal ?? 0)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {totals?.totalRevenue ? ((totals.normalTotal / totals.totalRevenue) * 100).toFixed(1) : 0}% of total
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-one-time/10 to-one-time/5 rounded-xl border border-one-time/20 p-6">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-5 w-5 text-one-time" />
              <h3 className="font-semibold text-card-foreground">One-Time Revenue</h3>
            </div>
            <p className="text-3xl font-bold text-card-foreground">{formatCurrency(totals?.oneTimeTotal ?? 0)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {totals?.totalRevenue ? ((totals.oneTimeTotal / totals.totalRevenue) * 100).toFixed(1) : 0}% of total
            </p>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="monthly" className="space-y-6">
          <TabsList className="bg-muted p-1.5 rounded-xl w-full flex flex-wrap justify-start gap-1">
            <TabsTrigger value="monthly" className="flex items-center gap-2 px-4 py-2.5">
              <Calendar className="h-4 w-4" />
              Monthly Trends
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-2 data-[state=active]:bg-premium/20 data-[state=active]:text-premium px-4 py-2.5">
              <Crown className="h-4 w-4" />
              Premium
            </TabsTrigger>
            <TabsTrigger value="normal" className="flex items-center gap-2 data-[state=active]:bg-normal/20 data-[state=active]:text-normal px-4 py-2.5">
              <Users className="h-4 w-4" />
              Normal
            </TabsTrigger>
            <TabsTrigger value="one-time" className="flex items-center gap-2 data-[state=active]:bg-one-time/20 data-[state=active]:text-one-time px-4 py-2.5">
              <User className="h-4 w-4" />
              One-Time
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="mt-6 space-y-6">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Monthly Performance Overview — 2024
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Track revenue, client activity, and segment performance across all months of 2024.
              </p>
            </div>
            <MonthlyTrendsChart2024 />
          </TabsContent>

          <TabsContent value="premium" className="mt-6 space-y-6">
            <div className="p-4 bg-premium/5 border border-premium/20 rounded-lg">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <Crown className="h-5 w-5 text-premium" />
                Premium Clients (4+ invoices)
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your most valuable repeat customers in 2024.
              </p>
            </div>
            <SegmentCharts2024 category="premium" categoryColor="hsl(var(--premium))" categoryLabel="Premium" />
          </TabsContent>

          <TabsContent value="normal" className="mt-6 space-y-6">
            <div className="p-4 bg-normal/5 border border-normal/20 rounded-lg">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-normal" />
                Normal Clients (2-3 invoices)
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Clients showing repeat interest in 2024.
              </p>
            </div>
            <SegmentCharts2024 category="normal" categoryColor="hsl(var(--normal))" categoryLabel="Normal" />
          </TabsContent>

          <TabsContent value="one-time" className="mt-6 space-y-6">
            <div className="p-4 bg-one-time/5 border border-one-time/20 rounded-lg">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <User className="h-5 w-5 text-one-time" />
                One-Time Clients (1 invoice)
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Single-transaction clients in 2024.
              </p>
            </div>
            <SegmentCharts2024 category="one-time" categoryColor="hsl(var(--one-time))" categoryLabel="One-Time" />
          </TabsContent>
        </Tabs>

        {/* Summary Stats Footer */}
        <div className="mt-12 bg-card rounded-xl border border-border p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            2024 Data Summary
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Premium Revenue</p>
              <p className="text-2xl font-bold text-premium">{formatCurrency(totals?.premiumTotal ?? 0)}</p>
              <p className="text-xs text-muted-foreground">{premiumInvoices} invoices</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Normal Revenue</p>
              <p className="text-2xl font-bold text-normal">{formatCurrency(totals?.normalTotal ?? 0)}</p>
              <p className="text-xs text-muted-foreground">{normalInvoices} invoices</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">One-Time Revenue</p>
              <p className="text-2xl font-bold text-one-time">{formatCurrency(totals?.oneTimeTotal ?? 0)}</p>
              <p className="text-xs text-muted-foreground">{oneTimeInvoices} invoices</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-accent">{formatCurrency(totals?.totalRevenue ?? 0)}</p>
              <p className="text-xs text-muted-foreground">{totals?.totalInvoices ?? 0} total invoices</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard2024;
