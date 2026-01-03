import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { loadMasterlistClientData2024 } from "@/lib/masterlistClientData2024";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MonthlyTrendsChart } from "@/components/MonthlyTrendsChart";
import { exportToCSV } from "@/lib/csvExport";
import { formatCurrency } from "@/lib/formatters";
import reaLogo from "@/assets/rea_logo.jpg";
import {
  Crown,
  User,
  Users,
  ArrowLeft,
  Target,
  TrendingUp,
  Mail,
  Phone,
  Gift,
  Star,
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
  Calendar,
  Zap,
} from "lucide-react";

const RemarketingActions2024 = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["masterlist-2024-client-data"],
    queryFn: loadMasterlistClientData2024,
  });

  const stats = data?.stats;
  const premiumClients = data?.premiumClients ?? [];
  const normalClients = data?.normalClients ?? [];
  const oneTimeClients = data?.oneTimeClients ?? [];

  const highValueOneTime = oneTimeClients
    .filter((c) => c.totalAmount >= 5000)
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const atRiskPremium = premiumClients
    .filter((c) => c.invoiceCount <= 5)
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const upgradeCandidates = normalClients
    .filter((c) => c.invoiceCount === 3 && c.totalAmount >= 2000)
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const quickWins = oneTimeClients
    .filter((c) => c.totalAmount >= 2000 && c.totalAmount < 5000)
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 15);

  const oneTimeConversionPotential = highValueOneTime.reduce((sum, c) => sum + c.totalAmount, 0) * 2;
  const normalUpgradePotential = upgradeCandidates.reduce((sum, c) => sum + c.totalAmount, 0) * 1.5;

  const exportHighValueOneTime = () => {
    const rows = highValueOneTime.map((c) => ({
      "Client Name": c.name,
      "Amount Spent (AED)": c.totalAmount,
      "Sales Persons": c.salesPersons.join(", "),
      Priority: "High-Value One-Time",
      Action: "Call this week",
    }));
    exportToCSV(rows, "high-value-one-time-clients-2024");
  };

  const exportUpgradeCandidates = () => {
    const rows = upgradeCandidates.map((c) => ({
      "Client Name": c.name,
      "Invoice Count": c.invoiceCount,
      "Total Spend (AED)": c.totalAmount,
      "Sales Persons": c.salesPersons.join(", "),
      Status: "1 away from Premium",
    }));
    exportToCSV(rows, "upgrade-candidates-2024");
  };

  const exportPremiumClients = () => {
    const rows = premiumClients.map((c) => ({
      "Client Name": c.name,
      "Invoice Count": c.invoiceCount,
      "Lifetime Value (AED)": c.totalAmount,
      "Sales Persons": c.salesPersons.join(", "),
      Priority: "VIP Care",
    }));
    exportToCSV(rows, "premium-clients-2024");
  };

  const exportQuickWins = () => {
    const rows = quickWins.map((c) => ({
      "Client Name": c.name,
      "Amount Spent (AED)": c.totalAmount,
      "Sales Persons": c.salesPersons.join(", "),
      Category: "Mid-Value One-Time",
    }));
    exportToCSV(rows, "quick-wins-2024");
  };

  const exportAll = () => {
    const rows = [
      ...highValueOneTime.map((c) => ({
        "Client Name": c.name,
        "Invoice Count": c.invoiceCount,
        "Total Amount (AED)": c.totalAmount,
        "Sales Persons": c.salesPersons.join(", "),
        Category: "High-Value One-Time",
        Priority: "Urgent",
      })),
      ...upgradeCandidates.map((c) => ({
        "Client Name": c.name,
        "Invoice Count": c.invoiceCount,
        "Total Amount (AED)": c.totalAmount,
        "Sales Persons": c.salesPersons.join(", "),
        Category: "Upgrade Candidate",
        Priority: "High Potential",
      })),
      ...premiumClients.map((c) => ({
        "Client Name": c.name,
        "Invoice Count": c.invoiceCount,
        "Total Amount (AED)": c.totalAmount,
        "Sales Persons": c.salesPersons.join(", "),
        Category: "Premium",
        Priority: "VIP Care",
      })),
      ...quickWins.map((c) => ({
        "Client Name": c.name,
        "Invoice Count": c.invoiceCount,
        "Total Amount (AED)": c.totalAmount,
        "Sales Persons": c.salesPersons.join(", "),
        Category: "Quick Win",
        Priority: "Easy Target",
      })),
    ];
    exportToCSV(rows, "all-remarketing-actions-2024");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading 2024 actions…</p>
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Could not load 2024 masterlist for actions.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={reaLogo} alt="REA Advertising" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Remarketing Actions</h1>
                <p className="text-sm text-muted-foreground">Prioritized strategies for client growth (2024)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={exportAll} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export All
              </Button>
              <Link
                to="/2024"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to 2024 Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm text-muted-foreground">One-Time Conversion Potential</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(oneTimeConversionPotential)}</p>
              <p className="text-xs text-muted-foreground mt-1">If {highValueOneTime.length} high-value clients return</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Star className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm text-muted-foreground">Normal → Premium Potential</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(normalUpgradePotential)}</p>
              <p className="text-xs text-muted-foreground mt-1">{upgradeCandidates.length} clients ready to upgrade</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
                <p className="text-sm text-muted-foreground">Premium at Risk</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{atRiskPremium.length} clients</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatCurrency(atRiskPremium.reduce((s, c) => s + c.totalAmount, 0))} at stake
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader className="border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Monthly Performance Trends</CardTitle>
                <CardDescription>Revenue and client activity breakdown by month</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <MonthlyTrendsChart
              year={2024}
              queryKey={["masterlist-2024-aggregates"]}
              title="2024 Monthly Overview"
              description="Track revenue patterns and segment performance across months"
            />
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="border-one-time/30">
            <CardHeader className="border-b border-border bg-one-time/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-one-time/20 rounded-lg">
                    <Zap className="h-5 w-5 text-one-time" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Priority 1: High-Value One-Time Clients
                      <Badge variant="destructive">Urgent</Badge>
                    </CardTitle>
                    <CardDescription>Clients who spent {formatCurrency(5000)}+ but haven't returned</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={exportHighValueOneTime} className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-one-time">{highValueOneTime.length}</p>
                    <p className="text-xs text-muted-foreground">clients</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" /> Recommended Actions:
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <Phone className="h-3 w-3" /> Personal call within 1 week
                  </li>
                  <li className="flex items-center gap-2">
                    <Gift className="h-3 w-3" /> Offer exclusive discount on next project
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-3 w-3" /> Send portfolio of relevant work
                  </li>
                </ul>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium">Client</th>
                      <th className="text-right py-2 font-medium">Amount Spent</th>
                      <th className="text-left py-2 font-medium">Sales Person(s)</th>
                      <th className="text-left py-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {highValueOneTime.slice(0, 10).map((client, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-2 font-medium">{client.name}</td>
                        <td className="py-2 text-right text-one-time font-semibold">{formatCurrency(client.totalAmount)}</td>
                        <td className="py-2">
                          <Badge variant="outline">{client.salesPersons.join(", ") || "—"}</Badge>
                        </td>
                        <td className="py-2">
                          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                            <Clock className="h-3 w-3 mr-1" /> Call this week
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-normal/30">
            <CardHeader className="border-b border-border bg-normal/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-normal/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-normal" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Priority 2: Upgrade Candidates
                      <Badge className="bg-normal/20 text-normal hover:bg-normal/30">High Potential</Badge>
                    </CardTitle>
                    <CardDescription>Normal clients with 3 invoices and good spend</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={exportUpgradeCandidates} className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-normal">{upgradeCandidates.length}</p>
                    <p className="text-xs text-muted-foreground">clients</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" /> Recommended Actions:
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <Star className="h-3 w-3" /> Offer loyalty discount for 4th project
                  </li>
                  <li className="flex items-center gap-2">
                    <Gift className="h-3 w-3" /> Premium client benefits preview
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-3 w-3" /> Quarterly business review meeting
                  </li>
                </ul>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium">Client</th>
                      <th className="text-center py-2 font-medium">Invoices</th>
                      <th className="text-right py-2 font-medium">Total Spend</th>
                      <th className="text-left py-2 font-medium">Sales Person(s)</th>
                      <th className="text-left py-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upgradeCandidates.map((client, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-2 font-medium">{client.name}</td>
                        <td className="py-2 text-center">
                          <Badge variant="secondary">{client.invoiceCount}</Badge>
                        </td>
                        <td className="py-2 text-right text-normal font-semibold">{formatCurrency(client.totalAmount)}</td>
                        <td className="py-2">
                          <Badge variant="outline">{client.salesPersons.join(", ") || "—"}</Badge>
                        </td>
                        <td className="py-2">
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">1 away from Premium</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-premium/30">
            <CardHeader className="border-b border-border bg-premium/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-premium/20 rounded-lg">
                    <Crown className="h-5 w-5 text-premium" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Priority 3: Premium Retention
                      <Badge className="bg-premium/20 text-premium hover:bg-premium/30">Protect Revenue</Badge>
                    </CardTitle>
                    <CardDescription>Top premium clients to maintain relationships</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={exportPremiumClients} className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-premium">{premiumClients.length}</p>
                    <p className="text-xs text-muted-foreground">clients</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" /> Recommended Actions:
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" /> Quarterly check-ins & dedicated support
                  </li>
                  <li className="flex items-center gap-2">
                    <Gift className="h-3 w-3" /> VIP benefits and early access offers
                  </li>
                </ul>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium">Client</th>
                      <th className="text-center py-2 font-medium">Invoices</th>
                      <th className="text-right py-2 font-medium">Lifetime Value</th>
                      <th className="text-left py-2 font-medium">Sales Person(s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {premiumClients.slice(0, 15).map((client, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-2 font-medium">{client.name}</td>
                        <td className="py-2 text-center">
                          <Badge variant="secondary">{client.invoiceCount}</Badge>
                        </td>
                        <td className="py-2 text-right text-premium font-semibold">{formatCurrency(client.totalAmount)}</td>
                        <td className="py-2">
                          <Badge variant="outline">{client.salesPersons.join(", ") || "—"}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader className="border-b border-border bg-muted/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-lg">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Quick Wins (Mid-Value One-Time)
                      <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">Easy Target</Badge>
                    </CardTitle>
                    <CardDescription>One-time clients with {formatCurrency(2000)}–{formatCurrency(4999)} spend</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={exportQuickWins} className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium">Client</th>
                      <th className="text-right py-2 font-medium">Amount Spent</th>
                      <th className="text-left py-2 font-medium">Sales Person(s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quickWins.map((client, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-2 font-medium">{client.name}</td>
                        <td className="py-2 text-right font-semibold">{formatCurrency(client.totalAmount)}</td>
                        <td className="py-2">
                          <Badge variant="outline">{client.salesPersons.join(", ") || "—"}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RemarketingActions2024;
