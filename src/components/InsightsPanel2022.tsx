import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Star, 
  Target,
  DollarSign,
  Users,
  FileText,
  Award,
  Lightbulb
} from "lucide-react";
import { loadMasterlistClientData2022 } from "@/lib/masterlistClientData2022";
import { loadMasterlistAggregates2022 } from "@/lib/masterlistAggregates2022";
import { formatCurrency } from "@/lib/formatters";

export const InsightsPanel2022 = () => {
  const clientData = loadMasterlistClientData2022();
  const aggregates = loadMasterlistAggregates2022();

  const { premiumClients, normalClients, oneTimeClients, stats } = clientData;
  const totals = aggregates.totals;

  // Top performers
  const topClients = [...premiumClients].sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 5);
  
  // Upgrade candidates (Normal clients close to premium threshold)
  const upgradeCandidates = normalClients
    .filter(c => c.invoiceCount >= 4)
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 5);

  // High-value one-time clients for re-engagement
  const highValueOneTime = oneTimeClients
    .filter(c => c.totalAmount > 5000)
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 5);

  // Calculate segment percentages
  const premiumPct = ((stats.premium.totalAmount / totals.totalRevenue) * 100).toFixed(1);
  const normalPct = ((stats.normal.totalAmount / totals.totalRevenue) * 100).toFixed(1);
  const oneTimePct = (100 - parseFloat(premiumPct) - parseFloat(normalPct)).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Key Metrics Summary */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-primary" />
            2022 Performance Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background rounded-lg">
              <DollarSign className="h-6 w-6 mx-auto mb-2 text-accent" />
              <p className="text-2xl font-bold">{formatCurrency(totals.totalRevenue)}</p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <FileText className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{totals.totalInvoices}</p>
              <p className="text-sm text-muted-foreground">Total Invoices</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <Users className="h-6 w-6 mx-auto mb-2 text-normal" />
              <p className="text-2xl font-bold">{totals.totalClients}</p>
              <p className="text-sm text-muted-foreground">Total Clients</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <Award className="h-6 w-6 mx-auto mb-2 text-premium" />
              <p className="text-2xl font-bold">{formatCurrency(totals.avgInvoiceValue)}</p>
              <p className="text-sm text-muted-foreground">Avg Invoice Value</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Segment Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-premium/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4 text-premium" />
              Premium Segment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-premium">{premiumPct}%</p>
              <p className="text-sm text-muted-foreground">of total revenue</p>
              <div className="pt-2 border-t">
                <p className="text-sm"><span className="font-medium">{stats.premium.count}</span> clients</p>
                <p className="text-sm"><span className="font-medium">{stats.premium.totalInvoices}</span> invoices</p>
                <p className="text-sm font-medium">{formatCurrency(stats.premium.totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-normal/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-normal" />
              Normal Segment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-normal">{normalPct}%</p>
              <p className="text-sm text-muted-foreground">of total revenue</p>
              <div className="pt-2 border-t">
                <p className="text-sm"><span className="font-medium">{stats.normal.count}</span> clients</p>
                <p className="text-sm"><span className="font-medium">{stats.normal.totalInvoices}</span> invoices</p>
                <p className="text-sm font-medium">{formatCurrency(stats.normal.totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-one-time/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-one-time" />
              One-Time Segment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-one-time">{oneTimePct}%</p>
              <p className="text-sm text-muted-foreground">of total revenue</p>
              <div className="pt-2 border-t">
                <p className="text-sm"><span className="font-medium">{stats.oneTime.count}</span> clients</p>
                <p className="text-sm"><span className="font-medium">{stats.oneTime.totalInvoices}</span> invoices</p>
                <p className="text-sm font-medium">{formatCurrency(stats.oneTime.totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Top 5 Revenue Generators (2022)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topClients.map((client, index) => (
              <div key={client.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-primary">#{index + 1}</span>
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.invoiceCount} invoices</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{formatCurrency(client.totalAmount)}</p>
                  <Badge variant="outline" className="text-premium border-premium">Premium</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Candidates */}
      {upgradeCandidates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-normal" />
              Upgrade Candidates (4-5 invoices)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              These Normal clients are close to Premium status. Target them for additional engagement.
            </p>
            <div className="space-y-3">
              {upgradeCandidates.map((client) => (
                <div key={client.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.invoiceCount} invoices (need {6 - client.invoiceCount} more for Premium)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(client.totalAmount)}</p>
                    <Badge variant="outline" className="text-normal border-normal">Normal</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* High-Value One-Time Clients */}
      {highValueOneTime.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-one-time" />
              High-Value One-Time Clients (Re-engagement Priority)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              These clients spent over AED 5,000 in a single transaction. High potential for conversion to repeat customers.
            </p>
            <div className="space-y-3">
              {highValueOneTime.map((client) => (
                <div key={client.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">Single high-value transaction</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-one-time">{formatCurrency(client.totalAmount)}</p>
                    <Badge variant="outline" className="text-one-time border-one-time">One-Time</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Observations */}
      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingDown className="h-5 w-5 text-muted-foreground" />
            Key Observations (2022)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>IDP Education and Stellar Advertising dominate with {formatCurrency(292044.35 + 167773.80)} combined revenue ({((292044.35 + 167773.80) / totals.totalRevenue * 100).toFixed(1)}% of total)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Average invoice value of {formatCurrency(totals.avgInvoiceValue)} indicates healthy transaction sizes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Strong Q4 performance with October peaking at {formatCurrency(241925.29)}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Premium segment ({stats.premium.count} clients) contributes {premiumPct}% of total revenue</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
