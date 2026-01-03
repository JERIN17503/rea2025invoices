import { Link } from "react-router-dom";
import { getCategoryStats, premiumClients, normalClients, oneTimeClients } from "@/data/clientData";
import { ClientTable } from "@/components/ClientTable";
import { StatsCard } from "@/components/StatsCard";
import { InsightsPanel } from "@/components/InsightsPanel";
import { SegmentCharts } from "@/components/SegmentCharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Crown, 
  User, 
  Users, 
  FileText, 
  DollarSign,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Target,
  FileDown
} from "lucide-react";
import reaLogo from "@/assets/rea_logo.jpg";
import { exportClientsPDF, exportAllClientsPDF } from "@/lib/pdfExport";

const Index = () => {
  const stats = getCategoryStats();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
                <p className="text-sm text-muted-foreground">Invoice Masterlist 2025 Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to="/remarketing" 
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <Target className="h-4 w-4" />
                Remarketing Actions
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{stats.total.totalInvoices} invoices analyzed</span>
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
            value={stats.total.count}
            subtitle={`${stats.total.totalInvoices} total invoices`}
            icon={Users}
          />
          <StatsCard
            title="Premium Clients"
            value={stats.premium.count}
            subtitle={`${stats.premium.totalInvoices} invoices`}
            icon={Crown}
            iconColor="text-premium"
          />
          <StatsCard
            title="Normal Clients"
            value={stats.normal.count}
            subtitle={`${stats.normal.totalInvoices} invoices`}
            icon={Users}
            iconColor="text-normal"
          />
          <StatsCard
            title="One-Time Clients"
            value={stats.oneTime.count}
            subtitle={`${stats.oneTime.totalInvoices} invoices`}
            icon={User}
            iconColor="text-one-time"
          />
          <StatsCard
            title="Total Revenue"
            value={formatCurrency(stats.total.totalAmount)}
            subtitle="2025 YTD"
            icon={DollarSign}
            iconColor="text-accent"
          />
        </div>

        {/* Revenue Breakdown with PDF Export */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Revenue Breakdown</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => exportAllClientsPDF(premiumClients, normalClients, oneTimeClients, stats.premium, stats.normal, stats.oneTime)}
            className="flex items-center gap-2"
          >
            <FileDown className="h-4 w-4" />
            Export All to PDF
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-premium/10 to-premium/5 rounded-xl border border-premium/20 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-premium" />
                <h3 className="font-semibold text-card-foreground">Premium Revenue</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => exportClientsPDF(premiumClients, 'Premium Clients Report', stats.premium)}
                className="h-8 w-8 p-0"
              >
                <FileDown className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-3xl font-bold text-card-foreground">{formatCurrency(stats.premium.totalAmount)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {((stats.premium.totalAmount / stats.total.totalAmount) * 100).toFixed(1)}% of total
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-normal/10 to-normal/5 rounded-xl border border-normal/20 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-normal" />
                <h3 className="font-semibold text-card-foreground">Normal Clients Revenue</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => exportClientsPDF(normalClients, 'Normal Clients Report', stats.normal)}
                className="h-8 w-8 p-0"
              >
                <FileDown className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-3xl font-bold text-card-foreground">{formatCurrency(stats.normal.totalAmount)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {((stats.normal.totalAmount / stats.total.totalAmount) * 100).toFixed(1)}% of total
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-one-time/10 to-one-time/5 rounded-xl border border-one-time/20 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-one-time" />
                <h3 className="font-semibold text-card-foreground">One-Time Revenue</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => exportClientsPDF(oneTimeClients, 'One-Time Clients Report', stats.oneTime)}
                className="h-8 w-8 p-0"
              >
                <FileDown className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-3xl font-bold text-card-foreground">{formatCurrency(stats.oneTime.totalAmount)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {((stats.oneTime.totalAmount / stats.total.totalAmount) * 100).toFixed(1)}% of total
            </p>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="premium" className="space-y-6">
          <TabsList className="bg-muted p-1.5 rounded-xl w-full flex flex-wrap justify-start gap-1">
            <TabsTrigger value="premium" className="flex items-center gap-2 data-[state=active]:bg-premium/20 data-[state=active]:text-premium px-4 py-2.5">
              <Crown className="h-4 w-4" />
              Premium ({stats.premium.count})
            </TabsTrigger>
            <TabsTrigger value="normal" className="flex items-center gap-2 data-[state=active]:bg-normal/20 data-[state=active]:text-normal px-4 py-2.5">
              <Users className="h-4 w-4" />
              Normal ({stats.normal.count})
            </TabsTrigger>
            <TabsTrigger value="one-time" className="flex items-center gap-2 data-[state=active]:bg-one-time/20 data-[state=active]:text-one-time px-4 py-2.5">
              <User className="h-4 w-4" />
              One-Time ({stats.oneTime.count})
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2 px-4 py-2.5">
              <BarChart3 className="h-4 w-4" />
              All Clients ({stats.total.count})
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2 px-4 py-2.5">
              <Lightbulb className="h-4 w-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <ClientTable clients={[...premiumClients, ...normalClients, ...oneTimeClients]} title="All Clients" category="all" />
          </TabsContent>

          <TabsContent value="premium" className="mt-6 space-y-6">
            <div className="p-4 bg-premium/5 border border-premium/20 rounded-lg">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <Crown className="h-5 w-5 text-premium" />
                Premium Clients (4+ invoices)
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                These are your most valuable repeat customers. Prioritize retention campaigns and personalized service.
              </p>
            </div>
            <SegmentCharts 
              clients={premiumClients} 
              category="premium" 
              categoryColor="hsl(var(--premium))" 
              categoryLabel="Premium" 
            />
            <ClientTable clients={premiumClients} title="Premium Clients" category="premium" />
          </TabsContent>

          <TabsContent value="normal" className="mt-6 space-y-6">
            <div className="p-4 bg-normal/5 border border-normal/20 rounded-lg">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-normal" />
                Normal Clients (2-3 invoices)
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                These clients show interest but haven't reached premium status. Target them with loyalty incentives.
              </p>
            </div>
            <SegmentCharts 
              clients={normalClients} 
              category="normal" 
              categoryColor="hsl(var(--normal))" 
              categoryLabel="Normal" 
            />
            <ClientTable clients={normalClients} title="Normal Clients" category="normal" />
          </TabsContent>

          <TabsContent value="one-time" className="mt-6 space-y-6">
            <div className="p-4 bg-one-time/5 border border-one-time/20 rounded-lg">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <User className="h-5 w-5 text-one-time" />
                One-Time Clients (1 invoice)
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Focus on re-engagement campaigns. High-value one-time clients should be prioritized for conversion.
              </p>
            </div>
            <SegmentCharts 
              clients={oneTimeClients} 
              category="one-time" 
              categoryColor="hsl(var(--one-time))" 
              categoryLabel="One-Time" 
            />
            <ClientTable clients={oneTimeClients} title="One-Time Clients" category="one-time" />
          </TabsContent>

          <TabsContent value="insights" className="mt-6">
            <InsightsPanel />
          </TabsContent>
        </Tabs>

        {/* Summary Stats Footer */}
        <div className="mt-12 bg-card rounded-xl border border-border p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Data Summary & Verification
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Premium Clients</p>
              <p className="text-2xl font-bold text-premium">{stats.premium.count}</p>
              <p className="text-xs text-muted-foreground">{stats.premium.totalInvoices} invoices</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Normal Clients</p>
              <p className="text-2xl font-bold text-normal">{stats.normal.count}</p>
              <p className="text-xs text-muted-foreground">{stats.normal.totalInvoices} invoices</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">One-Time Clients</p>
              <p className="text-2xl font-bold text-one-time">{stats.oneTime.count}</p>
              <p className="text-xs text-muted-foreground">{stats.oneTime.totalInvoices} invoices</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-accent">{formatCurrency(stats.total.totalAmount)}</p>
              <p className="text-xs text-muted-foreground">{stats.total.totalInvoices} total invoices</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
