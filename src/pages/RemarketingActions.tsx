import { Link } from "react-router-dom";
import { getCategoryStats, premiumClients, normalClients, oneTimeClients, getSalesPersonStats, getMonthlyData, MONTHS } from "@/data/clientData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/lib/csvExport";
import { MonthlyTrendsChart } from "@/components/MonthlyTrendsChart";
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
  DollarSign,
  Zap,
  Download,
  Calendar
} from "lucide-react";
import reaLogo from "@/assets/rea_logo.jpg";

const RemarketingActions = () => {
  const stats = getCategoryStats();
  const salesStats = getSalesPersonStats();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Priority calculations
  const highValueOneTime = oneTimeClients
    .filter(c => c.totalAmount >= 5000)
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const atRiskPremium = premiumClients
    .filter(c => c.invoiceCount <= 5)
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const upgradeCandidates = normalClients
    .filter(c => c.invoiceCount >= 3 && c.invoiceCount <= 5 && c.totalAmount >= 2000)
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const quickWins = oneTimeClients
    .filter(c => c.totalAmount >= 2000 && c.totalAmount < 5000)
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 15);

  // Calculate potential revenue
  const oneTimeConversionPotential = highValueOneTime.reduce((sum, c) => sum + c.totalAmount, 0) * 2;
  const normalUpgradePotential = upgradeCandidates.reduce((sum, c) => sum + c.totalAmount, 0) * 1.5;

  // Export functions
  const exportHighValueOneTime = () => {
    const data = highValueOneTime.map(c => ({
      'Client Name': c.name,
      'Amount Spent (AED)': c.totalAmount,
      'Sales Person': c.salesPersons[0],
      'Priority': 'High-Value One-Time',
      'Action': 'Call this week'
    }));
    exportToCSV(data, 'high-value-one-time-clients');
  };

  const exportUpgradeCandidates = () => {
    const data = upgradeCandidates.map(c => ({
      'Client Name': c.name,
      'Invoice Count': c.invoiceCount,
      'Total Spend (AED)': c.totalAmount,
      'Sales Person': c.salesPersons[0],
      'Status': '1 away from Premium'
    }));
    exportToCSV(data, 'upgrade-candidates');
  };

  const exportPremiumClients = () => {
    const data = premiumClients.map(c => ({
      'Client Name': c.name,
      'Invoice Count': c.invoiceCount,
      'Lifetime Value (AED)': c.totalAmount,
      'Sales Person': c.salesPersons[0],
      'Priority': 'VIP Care'
    }));
    exportToCSV(data, 'premium-clients');
  };

  const exportQuickWins = () => {
    const data = quickWins.map(c => ({
      'Client Name': c.name,
      'Amount Spent (AED)': c.totalAmount,
      'Sales Person': c.salesPersons[0],
      'Category': 'Mid-Value One-Time'
    }));
    exportToCSV(data, 'quick-wins');
  };

  const exportAll = () => {
    const allData = [
      ...highValueOneTime.map(c => ({ 'Client Name': c.name, 'Invoice Count': c.invoiceCount, 'Total Amount (AED)': c.totalAmount, 'Sales Person': c.salesPersons[0], 'Category': 'High-Value One-Time', 'Priority': 'Urgent' })),
      ...upgradeCandidates.map(c => ({ 'Client Name': c.name, 'Invoice Count': c.invoiceCount, 'Total Amount (AED)': c.totalAmount, 'Sales Person': c.salesPersons[0], 'Category': 'Upgrade Candidate', 'Priority': 'High Potential' })),
      ...premiumClients.map(c => ({ 'Client Name': c.name, 'Invoice Count': c.invoiceCount, 'Total Amount (AED)': c.totalAmount, 'Sales Person': c.salesPersons[0], 'Category': 'Premium', 'Priority': 'VIP Care' })),
      ...quickWins.map(c => ({ 'Client Name': c.name, 'Invoice Count': c.invoiceCount, 'Total Amount (AED)': c.totalAmount, 'Sales Person': c.salesPersons[0], 'Category': 'Quick Win', 'Priority': 'Easy Target' }))
    ];
    exportToCSV(allData, 'all-remarketing-actions');
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
                <h1 className="text-2xl font-bold text-foreground">Remarketing Actions</h1>
                <p className="text-sm text-muted-foreground">Prioritized strategies for client growth</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={exportAll} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export All
              </Button>
              <Link 
                to="/" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Revenue Opportunity Summary */}
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

        {/* Monthly Trends Overview */}
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
              title="2025 Monthly Overview" 
              description="Track revenue patterns and segment performance across months"
            />
          </CardContent>
        </Card>

        {/* Action Sections */}
        <div className="space-y-8">
          {/* Priority 1: High-Value One-Time Clients */}
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
                    <CardDescription>
                      Clients who spent {formatCurrency(5000)}+ but haven't returned - immediate re-engagement needed
                    </CardDescription>
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
                  <li className="flex items-center gap-2"><Phone className="h-3 w-3" /> Personal call from account manager within 1 week</li>
                  <li className="flex items-center gap-2"><Gift className="h-3 w-3" /> Offer exclusive 15% discount on next project</li>
                  <li className="flex items-center gap-2"><Mail className="h-3 w-3" /> Send portfolio of recent similar work</li>
                </ul>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium">Client</th>
                      <th className="text-right py-2 font-medium">Amount Spent</th>
                      <th className="text-left py-2 font-medium">Sales Person</th>
                      <th className="text-left py-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {highValueOneTime.slice(0, 10).map((client, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-2 font-medium">{client.name}</td>
                        <td className="py-2 text-right text-one-time font-semibold">{formatCurrency(client.totalAmount)}</td>
                        <td className="py-2">
                        <Badge variant="outline">{client.salesPersons[0]}</Badge>
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
                {highValueOneTime.length > 10 && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    +{highValueOneTime.length - 10} more high-value one-time clients
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Priority 2: Normal Clients Ready to Upgrade */}
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
                    <CardDescription>
                      Normal clients with 3 invoices and good spend - one more project makes them Premium
                    </CardDescription>
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
                  <li className="flex items-center gap-2"><Star className="h-3 w-3" /> Offer loyalty discount for 4th project</li>
                  <li className="flex items-center gap-2"><Gift className="h-3 w-3" /> Premium client benefits preview</li>
                  <li className="flex items-center gap-2"><Mail className="h-3 w-3" /> Quarterly business review meeting</li>
                </ul>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium">Client</th>
                      <th className="text-center py-2 font-medium">Invoices</th>
                      <th className="text-right py-2 font-medium">Total Spend</th>
                      <th className="text-left py-2 font-medium">Sales Person</th>
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
                        <Badge variant="outline">{client.salesPersons[0]}</Badge>
                        </td>
                        <td className="py-2">
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                            1 away from Premium
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Priority 3: Premium Client Retention */}
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
                    <CardDescription>
                      Top premium clients to maintain relationships with
                    </CardDescription>
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
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3" /> Monthly check-in calls</li>
                  <li className="flex items-center gap-2"><Gift className="h-3 w-3" /> VIP event invitations</li>
                  <li className="flex items-center gap-2"><Star className="h-3 w-3" /> Annual appreciation gifts</li>
                </ul>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium">Client</th>
                      <th className="text-center py-2 font-medium">Invoices</th>
                      <th className="text-right py-2 font-medium">Lifetime Value</th>
                      <th className="text-left py-2 font-medium">Sales Person</th>
                      <th className="text-left py-2 font-medium">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {premiumClients.slice(0, 10).map((client, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-2 font-medium">{client.name}</td>
                        <td className="py-2 text-center">
                          <Badge variant="secondary">{client.invoiceCount}</Badge>
                        </td>
                        <td className="py-2 text-right text-premium font-semibold">{formatCurrency(client.totalAmount)}</td>
                        <td className="py-2">
                          <Badge variant="outline">{client.salesPersons[0]}</Badge>
                        </td>
                        <td className="py-2">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> VIP Care
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Wins */}
          <Card className="border-primary/30">
            <CardHeader className="border-b border-border bg-primary/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Quick Wins: Mid-Value One-Time
                      <Badge variant="secondary">Easy Targets</Badge>
                    </CardTitle>
                    <CardDescription>
                      Clients with {formatCurrency(2000)}-{formatCurrency(5000)} spend - easier to convert with small incentives
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={exportQuickWins} className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{quickWins.length}</p>
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
                  <li className="flex items-center gap-2"><Mail className="h-3 w-3" /> Email campaign with 10% return discount</li>
                  <li className="flex items-center gap-2"><Gift className="h-3 w-3" /> Free consultation offer</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {quickWins.map((client, i) => (
                  <div key={i} className="p-3 border border-border rounded-lg hover:bg-muted/30">
                    <p className="font-medium text-sm truncate">{client.name}</p>
                    <p className="text-primary font-semibold">{formatCurrency(client.totalAmount)}</p>
                    <Badge variant="outline" className="mt-1 text-xs">{client.salesPersons[0]}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sales Team Assignments */}
          <Card>
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Sales Team Remarketing Assignments
              </CardTitle>
              <CardDescription>
                Distribute remarketing tasks based on existing client relationships
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {salesStats.slice(0, 6).map((sp, i) => {
                  const spOneTime = oneTimeClients.filter(c => c.salesPersons.includes(sp.name));
                  const spNormal = normalClients.filter(c => c.salesPersons.includes(sp.name));
                  const spPremium = premiumClients.filter(c => c.salesPersons.includes(sp.name));
                  
                  return (
                    <Card key={i} className="border">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{sp.name}</h4>
                          <Badge variant="outline">{formatCurrency(sp.totalAmount)}</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <User className="h-3 w-3 text-one-time" /> One-Time to reactivate
                            </span>
                            <span className="font-medium">{spOneTime.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Users className="h-3 w-3 text-normal" /> Normal to upgrade
                            </span>
                            <span className="font-medium">{spNormal.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground flex items-center gap-1">
                              <Crown className="h-3 w-3 text-premium" /> Premium to retain
                            </span>
                            <span className="font-medium">{spPremium.length}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RemarketingActions;
