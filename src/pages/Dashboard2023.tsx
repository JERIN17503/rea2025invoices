import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ClientTable } from "@/components/ClientTable";
import { StatsCard } from "@/components/StatsCard";
import { SegmentCharts } from "@/components/SegmentCharts";
import { MonthlyTrendsChart } from "@/components/MonthlyTrendsChart";
import { ExportDialog, ExportAllDialog } from "@/components/ExportDialog";
import { InsightsPanel2023 } from "@/components/InsightsPanel2023";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { loadMasterlistClientData2023 } from "@/lib/masterlistClientData2023";
import { loadMasterlistAggregates2023 } from "@/lib/masterlistAggregates2023";
import { formatCurrency } from "@/lib/formatters";
import reaLogo from "@/assets/rea_logo.jpg";
import {
  Crown,
  User,
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  BarChart3,
  Lightbulb,
  FileDown,
  Calendar,
} from "lucide-react";

const Dashboard2023 = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["masterlist-2023-client-data"],
    queryFn: loadMasterlistClientData2023,
  });

  const { data: aggregates, isLoading: aggLoading } = useQuery({
    queryKey: ["masterlist-2023-aggregates"],
    queryFn: loadMasterlistAggregates2023,
  });

  const stats = data?.stats;

  if (isLoading || aggLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading 2023 masterlist…</p>
      </div>
    );
  }

  if (isError || !data || !stats || !aggregates) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Could not load the 2023 masterlist.</p>
      </div>
    );
  }

  const { premiumClients, normalClients, oneTimeClients } = data;

  const round1 = (n: number) => Math.round(n * 10) / 10;
  const revenueDenom = aggregates.totals.totalRevenue || 1;
  const premiumSharePct = round1((aggregates.totals.premiumTotal / revenueDenom) * 100);
  const normalSharePct = round1((aggregates.totals.normalTotal / revenueDenom) * 100);
  const oneTimeSharePct = round1(100 - premiumSharePct - normalSharePct);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src={reaLogo} alt="REA Advertising" className="h-10 sm:h-12 w-auto" />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-foreground">Client Remarketing</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Invoice Masterlist 2023</p>
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <Link
                to="/"
                className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
              >
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                2025
              </Link>
              <Link
                to="/2024"
                className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
              >
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                2024
              </Link>
              <Link
                to="/2022"
                className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
              >
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                2022
              </Link>
              <Link
                to="/yoy"
                className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
              >
                <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                YoY
              </Link>
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground ml-2">
                <FileText className="h-4 w-4" />
                <span>{aggregates.totals.totalInvoices} invoices</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mb-6 sm:mb-8">
          <StatsCard title="Total Clients" value={aggregates.totals.totalClients} subtitle={`${aggregates.totals.totalInvoices} invoices`} icon={Users} />
          <StatsCard
            title="Premium"
            value={stats.premium.count}
            subtitle={`${stats.premium.totalInvoices} invoices`}
            icon={Crown}
            iconColor="text-premium"
          />
          <StatsCard
            title="Normal"
            value={stats.normal.count}
            subtitle={`${stats.normal.totalInvoices} invoices`}
            icon={Users}
            iconColor="text-normal"
          />
          <StatsCard
            title="One-Time"
            value={stats.oneTime.count}
            subtitle={`${stats.oneTime.totalInvoices} invoices`}
            icon={User}
            iconColor="text-one-time"
          />
          <StatsCard
            title="Revenue"
            value={formatCurrency(aggregates.totals.totalRevenue)}
            subtitle="2023 Full Year"
            icon={DollarSign}
            iconColor="text-accent"
          />
        </div>

        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-foreground">Revenue Breakdown</h2>
          <ExportAllDialog
            premiumClients={premiumClients}
            normalClients={normalClients}
            oneTimeClients={oneTimeClients}
            premiumStats={stats.premium}
            normalStats={stats.normal}
            oneTimeStats={stats.oneTime}
            trigger={
              <Button variant="outline" size="sm" className="flex items-center gap-2 text-xs sm:text-sm">
                <FileDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Export All</span>
                <span className="sm:hidden">Export</span>
              </Button>
            }
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-premium/10 to-premium/5 rounded-xl border border-premium/20 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-premium" />
                <h3 className="font-semibold text-card-foreground text-sm sm:text-base">Premium</h3>
              </div>
              <ExportDialog clients={premiumClients} title="Premium Clients Report" category="Premium" stats={stats.premium} />
            </div>
            <p className="text-xl sm:text-3xl font-bold text-card-foreground">{formatCurrency(aggregates.totals.premiumTotal)}</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{premiumSharePct.toFixed(1)}% of total</p>
          </div>

          <div className="bg-gradient-to-br from-normal/10 to-normal/5 rounded-xl border border-normal/20 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-normal" />
                <h3 className="font-semibold text-card-foreground text-sm sm:text-base">Normal</h3>
              </div>
              <ExportDialog clients={normalClients} title="Normal Clients Report" category="Normal" stats={stats.normal} />
            </div>
            <p className="text-xl sm:text-3xl font-bold text-card-foreground">{formatCurrency(aggregates.totals.normalTotal)}</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{normalSharePct.toFixed(1)}% of total</p>
          </div>

          <div className="bg-gradient-to-br from-one-time/10 to-one-time/5 rounded-xl border border-one-time/20 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-one-time" />
                <h3 className="font-semibold text-card-foreground text-sm sm:text-base">One-Time</h3>
              </div>
              <ExportDialog clients={oneTimeClients} title="One-Time Clients Report" category="One-Time" stats={stats.oneTime} />
            </div>
            <p className="text-xl sm:text-3xl font-bold text-card-foreground">{formatCurrency(aggregates.totals.oneTimeTotal)}</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{oneTimeSharePct.toFixed(1)}% of total</p>
          </div>
        </div>

        <Tabs defaultValue="premium" className="space-y-4 sm:space-y-6">
          <TabsList className="bg-muted p-1 sm:p-1.5 rounded-xl w-full flex flex-wrap justify-start gap-1 overflow-x-auto">
            <TabsTrigger value="monthly" className="flex items-center gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Monthly</span>
              <span className="sm:hidden">Trends</span>
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-1.5 data-[state=active]:bg-premium/20 data-[state=active]:text-premium px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm">
              <Crown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Premium</span> ({stats.premium.count})
            </TabsTrigger>
            <TabsTrigger value="normal" className="flex items-center gap-1.5 data-[state=active]:bg-normal/20 data-[state=active]:text-normal px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Normal</span> ({stats.normal.count})
            </TabsTrigger>
            <TabsTrigger value="one-time" className="flex items-center gap-1.5 data-[state=active]:bg-one-time/20 data-[state=active]:text-one-time px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm">
              <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">One-Time</span> ({stats.oneTime.count})
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm">
              <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              All ({stats.total.count})
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm">
              <Lightbulb className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="mt-6 space-y-6">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Monthly Performance Overview
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Track revenue, client activity, and segment performance across all months of 2023.</p>
            </div>
            <MonthlyTrendsChart year={2023} queryKey={["masterlist-2023-aggregates"]} loadFn={loadMasterlistAggregates2023} />
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <ClientTable clients={data.allClients} title="All Clients" category="all" />
          </TabsContent>

          <TabsContent value="premium" className="mt-6 space-y-6">
            <div className="p-4 bg-premium/5 border border-premium/20 rounded-lg">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <Crown className="h-5 w-5 text-premium" />
                Premium Clients (6+ invoices)
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
              year={2023}
              queryKey={["masterlist-2023-aggregates"]}
            />
            <ClientTable clients={premiumClients} title="Premium Clients" category="premium" />
          </TabsContent>

          <TabsContent value="normal" className="mt-6 space-y-6">
            <div className="p-4 bg-normal/5 border border-normal/20 rounded-lg">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-normal" />
                Normal Clients (2-5 invoices)
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
              year={2023}
              queryKey={["masterlist-2023-aggregates"]}
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
              year={2023}
              queryKey={["masterlist-2023-aggregates"]}
            />
            <ClientTable clients={oneTimeClients} title="One-Time Clients" category="one-time" />
          </TabsContent>

          <TabsContent value="insights" className="mt-6">
            <InsightsPanel2023 />
          </TabsContent>
        </Tabs>

        <div className="mt-8 sm:mt-12 bg-card rounded-xl border border-border p-4 sm:p-6 shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-3 sm:mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Data Summary
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Premium</p>
              <p className="text-lg sm:text-2xl font-bold text-premium">{stats.premium.count}</p>
              <p className="text-xs text-muted-foreground">{stats.premium.totalInvoices} invoices</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Normal</p>
              <p className="text-lg sm:text-2xl font-bold text-normal">{stats.normal.count}</p>
              <p className="text-xs text-muted-foreground">{stats.normal.totalInvoices} invoices</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">One-Time</p>
              <p className="text-lg sm:text-2xl font-bold text-one-time">{stats.oneTime.count}</p>
              <p className="text-xs text-muted-foreground">{stats.oneTime.totalInvoices} invoices</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Revenue</p>
              <p className="text-lg sm:text-2xl font-bold text-accent">{formatCurrency(aggregates.totals.totalRevenue)}</p>
              <p className="text-xs text-muted-foreground">{aggregates.totals.totalInvoices} invoices</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard2023;
