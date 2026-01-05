import { useQuery } from "@tanstack/react-query";
import { loadMasterlistClientData2023 } from "@/lib/masterlistClientData2023";
import { loadMasterlistAggregates2023 } from "@/lib/masterlistAggregates2023";
import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  AlertTriangle,
  Lightbulb,
  Crown,
  Users,
  User,
  DollarSign,
  Calendar,
} from "lucide-react";

export function InsightsPanel2023() {
  const { data: clientData, isLoading: clientLoading } = useQuery({
    queryKey: ["masterlist-2023-client-data"],
    queryFn: loadMasterlistClientData2023,
  });

  const { data: aggregates, isLoading: aggLoading } = useQuery({
    queryKey: ["masterlist-2023-aggregates"],
    queryFn: loadMasterlistAggregates2023,
  });

  if (clientLoading || aggLoading || !clientData || !aggregates) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-5 w-32 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const { stats, premiumClients, normalClients, oneTimeClients } = clientData;
  const { monthlyData, totals } = aggregates;

  // Find best/worst months
  const sortedByRevenue = [...monthlyData].sort((a, b) => b.revenue - a.revenue);
  const bestMonth = sortedByRevenue[0];
  const worstMonth = sortedByRevenue[sortedByRevenue.length - 1];

  // Top clients
  const topPremium = premiumClients.slice(0, 3);
  const topNormal = normalClients.slice(0, 3);
  const highValueOneTime = oneTimeClients.filter((c) => c.totalAmount >= 5000);

  // Revenue concentration
  const top3PremiumRevenue = topPremium.reduce((sum, c) => sum + c.totalAmount, 0);
  const top3Concentration = (top3PremiumRevenue / totals.totalRevenue) * 100;

  // Segment shares
  const premiumShare = (totals.premiumTotal / totals.totalRevenue) * 100;
  const normalShare = (totals.normalTotal / totals.totalRevenue) * 100;
  const oneTimeShare = (totals.oneTimeTotal / totals.totalRevenue) * 100;

  // Average invoice values by segment
  const avgPremiumInvoice = stats.premium.totalAmount / stats.premium.totalInvoices;
  const avgNormalInvoice = stats.normal.totalAmount / stats.normal.totalInvoices;
  const avgOneTimeInvoice = stats.oneTime.totalAmount / stats.oneTime.totalInvoices;

  return (
    <div className="space-y-6">
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <h3 className="font-semibold text-card-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          2023 Business Insights
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Key performance indicators and actionable insights from 2023 data.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Best & Worst Months */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Monthly Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Best Month</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">{bestMonth.month}</p>
                <p className="text-xs text-muted-foreground">{formatCurrency(bestMonth.revenue)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Slowest Month</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-red-600">{worstMonth.month}</p>
                <p className="text-xs text-muted-foreground">{formatCurrency(worstMonth.revenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Concentration */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Revenue Concentration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Top 3 clients share</span>
                <Badge variant={top3Concentration > 50 ? "destructive" : "secondary"}>
                  {top3Concentration.toFixed(1)}%
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                {topPremium.map((c) => (
                  <div key={c.name} className="flex justify-between">
                    <span className="truncate max-w-[60%]">{c.name}</span>
                    <span>{formatCurrency(c.totalAmount)}</span>
                  </div>
                ))}
              </div>
              {top3Concentration > 50 && (
                <p className="text-xs text-amber-600 mt-2">
                  ⚠️ High concentration risk - diversify client base
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Segment Analysis */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-accent" />
              Revenue by Segment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-premium" />
                <span className="text-sm">Premium</span>
              </div>
              <div className="text-right">
                <span className="font-semibold">{premiumShare.toFixed(1)}%</span>
                <p className="text-xs text-muted-foreground">{formatCurrency(totals.premiumTotal)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-normal" />
                <span className="text-sm">Normal</span>
              </div>
              <div className="text-right">
                <span className="font-semibold">{normalShare.toFixed(1)}%</span>
                <p className="text-xs text-muted-foreground">{formatCurrency(totals.normalTotal)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-one-time" />
                <span className="text-sm">One-Time</span>
              </div>
              <div className="text-right">
                <span className="font-semibold">{oneTimeShare.toFixed(1)}%</span>
                <p className="text-xs text-muted-foreground">{formatCurrency(totals.oneTimeTotal)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Invoice Values */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Avg Invoice Value
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-premium/10 rounded">
              <span className="text-sm">Premium</span>
              <span className="font-semibold text-premium">{formatCurrency(avgPremiumInvoice)}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-normal/10 rounded">
              <span className="text-sm">Normal</span>
              <span className="font-semibold text-normal">{formatCurrency(avgNormalInvoice)}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-one-time/10 rounded">
              <span className="text-sm">One-Time</span>
              <span className="font-semibold text-one-time">{formatCurrency(avgOneTimeInvoice)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="h-4 w-4 text-premium" />
              Top Performers by Segment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="text-sm font-medium text-premium mb-2 flex items-center gap-1">
                  <Crown className="h-3 w-3" /> Premium
                </h4>
                <div className="space-y-1 text-xs">
                  {topPremium.map((c, i) => (
                    <div key={c.name} className="flex justify-between items-center p-1.5 bg-muted/50 rounded">
                      <span className="truncate max-w-[65%]">
                        {i + 1}. {c.name}
                      </span>
                      <span className="text-muted-foreground">{formatCurrency(c.totalAmount)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-normal mb-2 flex items-center gap-1">
                  <Users className="h-3 w-3" /> Normal
                </h4>
                <div className="space-y-1 text-xs">
                  {topNormal.map((c, i) => (
                    <div key={c.name} className="flex justify-between items-center p-1.5 bg-muted/50 rounded">
                      <span className="truncate max-w-[65%]">
                        {i + 1}. {c.name}
                      </span>
                      <span className="text-muted-foreground">{formatCurrency(c.totalAmount)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-one-time mb-2 flex items-center gap-1">
                  <User className="h-3 w-3" /> High-Value One-Time
                </h4>
                <div className="space-y-1 text-xs">
                  {highValueOneTime.length > 0 ? (
                    highValueOneTime.slice(0, 3).map((c, i) => (
                      <div key={c.name} className="flex justify-between items-center p-1.5 bg-muted/50 rounded">
                        <span className="truncate max-w-[65%]">
                          {i + 1}. {c.name}
                        </span>
                        <span className="text-muted-foreground">{formatCurrency(c.totalAmount)}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No high-value one-time clients (≥AED 5,000)</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Remarketing Opportunities */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Remarketing Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-3 bg-normal/10 border border-normal/20 rounded-lg">
                <h4 className="font-medium text-normal mb-2">Normal → Premium Candidates</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {normalClients.filter((c) => c.invoiceCount >= 4).length} clients with 4+ invoices
                </p>
                <div className="space-y-1">
                  {normalClients
                    .filter((c) => c.invoiceCount >= 4)
                    .slice(0, 3)
                    .map((c) => (
                      <div key={c.name} className="text-xs flex justify-between">
                        <span className="truncate max-w-[60%]">{c.name}</span>
                        <span>{c.invoiceCount} invoices</span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="p-3 bg-one-time/10 border border-one-time/20 rounded-lg">
                <h4 className="font-medium text-one-time mb-2">One-Time Re-engagement</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {highValueOneTime.length} high-value one-time clients to re-engage
                </p>
                <div className="space-y-1">
                  {highValueOneTime.slice(0, 3).map((c) => (
                    <div key={c.name} className="text-xs flex justify-between">
                      <span className="truncate max-w-[60%]">{c.name}</span>
                      <span>{formatCurrency(c.totalAmount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
