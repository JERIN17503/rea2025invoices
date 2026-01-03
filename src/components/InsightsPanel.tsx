import { getCategoryStats, getSalesPersonStats, premiumClients, oneTimeClients, getAllClients } from "@/data/clientData";
import { TrendingUp, Target, AlertTriangle, Lightbulb, Users, DollarSign } from "lucide-react";

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

  return (
    <div className="space-y-6">
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
        <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-accent" />
          Top 5 Premium Clients to Prioritize
        </h3>
        
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
        <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-one-time" />
          High-Value One-Time Clients (Re-engagement Priority)
        </h3>
        
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
        <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Sales Team Performance
        </h3>
        
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
