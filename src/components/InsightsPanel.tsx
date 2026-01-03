import { getCategoryStats, getSalesPersonStats, premiumClients, oneTimeClients, getAllClients, normalClients } from "@/data/clientData";
import { TrendingUp, Target, AlertTriangle, Lightbulb, Users, DollarSign, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/lib/csvExport";

export function InsightsPanel() {
  const clients = getAllClients();
  const stats = getCategoryStats();
  const salesPersonStats = getSalesPersonStats();

  // Calculate insights
  const topPremiumClients = premiumClients.slice(0, 5);
  const avgPremiumValue = stats.premium.totalAmount / stats.premium.count;
  const avgOneTimeValue = stats.oneTime.totalAmount / stats.oneTime.count;
  
  // One-time clients with high value (potential for conversion)
  const highValueOneTime = oneTimeClients
    .filter(c => c.totalAmount > avgOneTimeValue * 2)
    .slice(0, 10);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const exportInsightsReport = () => {
    const data = [
      { 'Metric': 'Premium Client Average Value', 'Value (AED)': Math.round(avgPremiumValue), 'Count': stats.premium.count },
      { 'Metric': 'Normal Client Average Value', 'Value (AED)': Math.round(stats.normal.totalAmount / stats.normal.count), 'Count': stats.normal.count },
      { 'Metric': 'One-Time Client Average Value', 'Value (AED)': Math.round(avgOneTimeValue), 'Count': stats.oneTime.count },
      { 'Metric': 'Total Revenue', 'Value (AED)': stats.total.totalAmount, 'Count': stats.total.count },
    ];
    exportToCSV(data, 'insights-summary');
  };

  const exportTopPremiumClients = () => {
    const data = topPremiumClients.map((c, i) => ({
      'Rank': i + 1,
      'Client Name': c.name,
      'Invoice Count': c.invoiceCount,
      'Total Amount (AED)': c.totalAmount
    }));
    exportToCSV(data, 'top-premium-clients');
  };

  const exportHighValueOneTimeClients = () => {
    const data = highValueOneTime.map((c, i) => ({
      'Rank': i + 1,
      'Client Name': c.name,
      'Total Amount (AED)': c.totalAmount,
      'Conversion Priority': 'High'
    }));
    exportToCSV(data, 'high-value-one-time-insights');
  };

  const exportSalesPerformance = () => {
    const data = salesPersonStats.map((sp, i) => ({
      'Rank': i + 1,
      'Sales Person': sp.name,
      'Total Revenue (AED)': sp.totalAmount,
      'Invoice Count': sp.invoiceCount
    }));
    exportToCSV(data, 'sales-team-performance');
  };

  const exportAllClients = () => {
    const allClients = [
      ...premiumClients.map(c => ({ 'Client Name': c.name, 'Category': 'Premium', 'Invoice Count': c.invoiceCount, 'Total Amount (AED)': c.totalAmount, 'Sales Persons': c.salesPersons.join(', ') })),
      ...normalClients.map(c => ({ 'Client Name': c.name, 'Category': 'Normal', 'Invoice Count': c.invoiceCount, 'Total Amount (AED)': c.totalAmount, 'Sales Persons': c.salesPersons.join(', ') })),
      ...oneTimeClients.map(c => ({ 'Client Name': c.name, 'Category': 'One-Time', 'Invoice Count': c.invoiceCount, 'Total Amount (AED)': c.totalAmount, 'Sales Persons': c.salesPersons.join(', ') }))
    ];
    exportToCSV(allClients, 'all-clients-report');
  };

  return (
    <div className="space-y-6">
      {/* Export All Button */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={exportAllClients} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export All Clients
        </Button>
        <Button variant="outline" size="sm" onClick={exportInsightsReport} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Insights Summary
        </Button>
      </div>

      {/* Key Metrics Summary */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Key Remarketing Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <TrendingUp className="h-4 w-4 text-accent" />
              Premium Client Value
            </div>
            <p className="text-xl font-bold text-card-foreground">
              {formatCurrency(avgPremiumValue)}
            </p>
            <p className="text-xs text-muted-foreground">average per client</p>
          </div>
          
          <div className="bg-one-time/5 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Users className="h-4 w-4 text-one-time" />
              One-Time Client Value
            </div>
            <p className="text-xl font-bold text-card-foreground">
              {formatCurrency(avgOneTimeValue)}
            </p>
            <p className="text-xs text-muted-foreground">average per client</p>
          </div>
          
          <div className="bg-accent/5 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <TrendingUp className="h-4 w-4 text-accent" />
              Normal Client Value
            </div>
            <p className="text-xl font-bold text-card-foreground">
              {formatCurrency(stats.normal.totalAmount / stats.normal.count)}
            </p>
            <p className="text-xs text-muted-foreground">average per client</p>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <DollarSign className="h-4 w-4 text-primary" />
              Total Revenue
            </div>
            <p className="text-xl font-bold text-card-foreground">
              {formatCurrency(stats.total.totalAmount)}
            </p>
            <p className="text-xs text-muted-foreground">{stats.total.count} clients</p>
          </div>
        </div>
      </div>

      {/* Remarketing Recommendations */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-premium" />
          Remarketing Recommendations
        </h3>
        
        <div className="space-y-4">
          <div className="border-l-4 border-premium pl-4 py-2">
            <h4 className="font-semibold text-card-foreground">Premium Client Retention</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Your {stats.premium.count} premium clients contribute <strong>{formatCurrency(stats.premium.totalAmount)}</strong> ({((stats.premium.totalAmount / stats.total.totalAmount) * 100).toFixed(1)}% of total revenue). 
              Focus on personalized outreach, exclusive offers, and dedicated account management to maintain these relationships.
            </p>
          </div>
          
          <div className="border-l-4 border-one-time pl-4 py-2">
            <h4 className="font-semibold text-card-foreground">Convert High-Value One-Time Clients</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {highValueOneTime.length} one-time clients spent above average ({formatCurrency(avgOneTimeValue * 2)}+). 
              Target them with follow-up campaigns, loyalty incentives, and referral programs to convert them into repeat customers.
            </p>
          </div>
          
          <div className="border-l-4 border-normal pl-4 py-2">
            <h4 className="font-semibold text-card-foreground">Normal Clients Growth Opportunity</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {stats.normal.count} clients with 2-5 invoices represent <strong>{formatCurrency(stats.normal.totalAmount)}</strong> in revenue. 
              Create tiered loyalty programs to encourage more frequent purchases and upgrade them to premium status.
            </p>
          </div>
          
          <div className="border-l-4 border-accent pl-4 py-2">
            <h4 className="font-semibold text-card-foreground">Account Manager Strategy</h4>
            <p className="text-sm text-muted-foreground mt-1">
              REENA manages the majority of high-value accounts. Consider capacity planning and backup coverage 
              to ensure consistent service for premium clients.
            </p>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-accent" />
            Top 5 Premium Clients to Prioritize
          </h3>
          <Button variant="ghost" size="sm" onClick={exportTopPremiumClients} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
        
        <div className="space-y-3">
          {topPremiumClients.map((client, index) => (
            <div key={client.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-premium/20 text-premium-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-card-foreground text-sm">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.invoiceCount} invoices</p>
                </div>
              </div>
              <span className="font-bold text-card-foreground tabular-nums">
                {formatCurrency(client.totalAmount)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* High-Value One-Time Clients */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-one-time" />
            High-Value One-Time Clients (Re-engagement Priority)
          </h3>
          <Button variant="ghost" size="sm" onClick={exportHighValueOneTimeClients} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
        
        <div className="space-y-2">
          {highValueOneTime.slice(0, 5).map((client, index) => (
            <div key={client.name} className="flex items-center justify-between p-3 bg-one-time/5 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-one-time/20 text-one-time-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <p className="font-medium text-card-foreground text-sm">{client.name}</p>
              </div>
              <span className="font-bold text-card-foreground tabular-nums">
                {formatCurrency(client.totalAmount)}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          These clients spent significantly above average for one-time purchases. High conversion potential for repeat business.
        </p>
      </div>

      {/* Sales Person Performance */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Sales Team Performance
          </h3>
          <Button variant="ghost" size="sm" onClick={exportSalesPerformance} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
        
        <div className="space-y-3">
          {salesPersonStats.map((sp, index) => (
            <div key={sp.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'bg-premium/20 text-premium-foreground' : 'bg-secondary text-secondary-foreground'
                }`}>
                  {index + 1}
                </span>
                <span className="font-medium text-card-foreground">{sp.name}</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-card-foreground tabular-nums">{formatCurrency(sp.totalAmount)}</p>
                <p className="text-xs text-muted-foreground">{sp.invoiceCount} invoices</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}