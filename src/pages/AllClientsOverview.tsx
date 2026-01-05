import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { loadAllYearsClientData, MultiYearClient } from "@/lib/allYearsClientData";
import ClientDetailSheet from "@/components/ClientDetailSheet";
import { formatCurrency } from "@/lib/formatters";
import { exportToCSV } from "@/lib/csvExport";
import reaLogo from "@/assets/rea_logo.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Crown,
  Users,
  User,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  BarChart3,
  DollarSign,
  FileText,
  ChevronDown,
  ChevronUp,
  Minus,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const YEARS = [2022, 2023, 2024, 2025];

const getCategoryBadge = (category: string) => {
  switch (category) {
    case "premium":
      return <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30"><Crown className="h-3 w-3 mr-1" />Premium</Badge>;
    case "normal":
      return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30"><Users className="h-3 w-3 mr-1" />Normal</Badge>;
    case "one-time":
      return <Badge className="bg-slate-500/20 text-slate-600 border-slate-500/30"><User className="h-3 w-3 mr-1" />One-Time</Badge>;
    default:
      return null;
  }
};

type SortField = "name" | "totalRevenue" | "totalInvoices" | "yearsActive" | "h1Total";
type SortDirection = "asc" | "desc";

const AllClientsOverview = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [activityFilter, setActivityFilter] = useState<string>("all");
  const [quarterFilter, setQuarterFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("totalRevenue");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedClient, setSelectedClient] = useState<MultiYearClient | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleClientClick = (client: MultiYearClient) => {
    setSelectedClient(client);
    setSheetOpen(true);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["all-years-client-data"],
    queryFn: loadAllYearsClientData,
  });

  const filteredAndSortedClients = useMemo(() => {
    if (!data) return [];

    let filtered = data.clients;

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((c) => c.name.toLowerCase().includes(searchLower));
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((c) => c.latestCategory === categoryFilter);
    }

    // Year filter - show clients active in this year
    if (yearFilter !== "all") {
      const year = parseInt(yearFilter);
      filtered = filtered.filter((c) => c.yearsActive.includes(year));
    }

    // Activity filter
    if (activityFilter === "returning") {
      filtered = filtered.filter((c) => c.yearsActive.length > 1);
    } else if (activityFilter === "new-2025") {
      filtered = filtered.filter((c) => c.yearsActive.length === 1 && c.yearsActive[0] === 2025);
    } else if (activityFilter === "churned") {
      filtered = filtered.filter((c) => !c.yearsActive.includes(2025) && c.yearsActive.includes(2024));
    } else if (activityFilter === "loyal") {
      filtered = filtered.filter((c) => c.yearsActive.length >= 3);
    }

    // Quarter filter - filter by H1 contribution
    if (quarterFilter === "h1-top") {
      filtered = filtered.filter((c) => c.h1Total > 0);
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "totalRevenue":
          comparison = a.totalRevenue - b.totalRevenue;
          break;
        case "totalInvoices":
          comparison = a.totalInvoices - b.totalInvoices;
          break;
        case "yearsActive":
          comparison = a.yearsActive.length - b.yearsActive.length;
          break;
        case "h1Total":
          comparison = a.h1Total - b.h1Total;
          break;
      }
      return sortDirection === "desc" ? -comparison : comparison;
    });

    return filtered;
  }, [data, search, categoryFilter, yearFilter, activityFilter, quarterFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="h-3 w-3 opacity-30" />;
    return sortDirection === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />;
  };

  // Export functionality
  const handleExport = () => {
    const exportData = filteredAndSortedClients.map((client) => ({
      "Client Name": client.name,
      "Category": client.latestCategory,
      "Years Active": client.yearsActive.join(", "),
      "2022 Revenue": client.years[2022]?.totalAmount || 0,
      "2023 Revenue": client.years[2023]?.totalAmount || 0,
      "2024 Revenue": client.years[2024]?.totalAmount || 0,
      "2025 Revenue": client.years[2025]?.totalAmount || 0,
      "Q1 Total (Est.)": Math.round(client.q1Total),
      "Q2 Total (Est.)": Math.round(client.q2Total),
      "H1 Total (Est.)": Math.round(client.h1Total),
      "Total Invoices": client.totalInvoices,
      "Total Revenue": client.totalRevenue,
    }));
    
    const filterLabel = [
      categoryFilter !== "all" ? categoryFilter : "",
      yearFilter !== "all" ? yearFilter : "",
      activityFilter !== "all" ? activityFilter : "",
      quarterFilter !== "all" ? "H1-focus" : "",
    ].filter(Boolean).join("_") || "all";
    
    exportToCSV(exportData, `all-clients-${filterLabel}-${new Date().toISOString().split("T")[0]}`);
  };

  // Stats calculations
  const stats = useMemo(() => {
    if (!data) return null;

    const totalClients = data.clients.length;
    const returningClients = data.clients.filter((c) => c.yearsActive.length > 1).length;
    const loyalClients = data.clients.filter((c) => c.yearsActive.length >= 3).length;
    const newIn2025 = data.clients.filter((c) => c.yearsActive.length === 1 && c.yearsActive[0] === 2025).length;
    const churnedFrom2024 = data.clients.filter((c) => c.yearsActive.includes(2024) && !c.yearsActive.includes(2025)).length;

    const totalRevenue = Object.values(data.yearTotals).reduce((sum, y) => sum + y.revenue, 0);

    return {
      totalClients,
      returningClients,
      loyalClients,
      newIn2025,
      churnedFrom2024,
      totalRevenue,
    };
  }, [data]);

  // Chart data
  const yearlyRevenueData = useMemo(() => {
    if (!data) return [];
    return YEARS.map((year) => ({
      year: year.toString(),
      revenue: data.yearTotals[year]?.revenue || 0,
      premium: data.yearTotals[year]?.premiumRevenue || 0,
      normal: data.yearTotals[year]?.normalRevenue || 0,
      oneTime: data.yearTotals[year]?.oneTimeRevenue || 0,
    }));
  }, [data]);

  const clientGrowthData = useMemo(() => {
    if (!data) return [];
    return YEARS.map((year) => ({
      year: year.toString(),
      clients: data.yearTotals[year]?.clients || 0,
    }));
  }, [data]);

  const categoryDistribution = useMemo(() => {
    if (!data) return [];
    const counts = { premium: 0, normal: 0, "one-time": 0 };
    data.clients.forEach((c) => counts[c.latestCategory]++);
    return [
      { name: "Premium", value: counts.premium, color: "hsl(var(--premium))" },
      { name: "Normal", value: counts.normal, color: "hsl(var(--normal))" },
      { name: "One-Time", value: counts["one-time"], color: "hsl(var(--one-time))" },
    ];
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading all years data…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <img src={reaLogo} alt="REA Advertising" className="h-10 sm:h-12 w-auto" />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-foreground">All Clients Overview</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">4-Year Client Analysis (2022-2025)</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {YEARS.map((year) => (
                <Link
                  key={year}
                  to={year === 2025 ? "/" : `/${year}`}
                  className="flex items-center gap-1.5 px-3 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-xs sm:text-sm font-medium"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  {year}
                </Link>
              ))}
              <Link
                to="/yoy"
                className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium"
              >
                <TrendingUp className="h-3.5 w-3.5" />
                YoY
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 mb-6">
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Total Clients</span>
              </div>
              <p className="text-lg sm:text-xl font-bold">{stats?.totalClients}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-xs text-muted-foreground">Returning</span>
              </div>
              <p className="text-lg sm:text-xl font-bold">{stats?.returningClients}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-1">
                <Crown className="h-4 w-4 text-amber-500" />
                <span className="text-xs text-muted-foreground">Loyal (3+ yrs)</span>
              </div>
              <p className="text-lg sm:text-xl font-bold">{stats?.loyalClients}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-1">
                <User className="h-4 w-4 text-blue-500" />
                <span className="text-xs text-muted-foreground">New in 2025</span>
              </div>
              <p className="text-lg sm:text-xl font-bold">{stats?.newIn2025}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-xs text-muted-foreground">Churned</span>
              </div>
              <p className="text-lg sm:text-xl font-bold">{stats?.churnedFrom2024}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">4-Yr Revenue</span>
              </div>
              <p className="text-sm sm:text-lg font-bold truncate">{formatCurrency(stats?.totalRevenue || 0)}</p>
            </CardContent>
          </Card>
        </div>

        {/* TOP H1 CONTRIBUTORS - Most Prominent Section */}
        <Card className="mb-6 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Crown className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Top 30 H1 Business Contributors</CardTitle>
                <CardDescription className="text-sm">Clients who gave most business in Q1+Q2 (Jan-Jun) across all 4 years</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            {/* Top 5 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
              {data.clients
                .filter((c) => c.h1Total > 0)
                .sort((a, b) => b.h1Total - a.h1Total)
                .slice(0, 5)
                .map((client, idx) => (
                  <div 
                    key={client.name} 
                    className="relative p-4 bg-card border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleClientClick(client)}
                  >
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <div className="pt-1">
                      <p className="font-semibold text-sm truncate" title={client.name}>{client.name}</p>
                      <div className="mt-1">{getCategoryBadge(client.latestCategory)}</div>
                      <div className="mt-3 pt-2 border-t">
                        <p className="text-xl font-bold text-primary">{formatCurrency(client.h1Total)}</p>
                        <p className="text-[10px] text-muted-foreground">H1 Revenue (Q1+Q2)</p>
                      </div>
                      <div className="mt-2 flex gap-1 flex-wrap">
                        {client.yearsActive.map((y) => (
                          <Badge key={y} variant="outline" className="text-[9px] px-1 py-0">{y}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            
            {/* Ranks 6-30 Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-12 text-center">#</TableHead>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-center">Years</TableHead>
                    <TableHead className="text-right">H1 Revenue (Q1+Q2)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.clients
                    .filter((c) => c.h1Total > 0)
                    .sort((a, b) => b.h1Total - a.h1Total)
                    .slice(5, 30)
                    .map((client, idx) => (
                      <TableRow 
                        key={client.name} 
                        className="hover:bg-muted/30 cursor-pointer"
                        onClick={() => handleClientClick(client)}
                      >
                        <TableCell className="text-center font-semibold text-muted-foreground">{idx + 6}</TableCell>
                        <TableCell className="font-medium truncate max-w-[200px]">{client.name}</TableCell>
                        <TableCell>{getCategoryBadge(client.latestCategory)}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex gap-0.5 justify-center">
                            {client.yearsActive.map((y) => (
                              <Badge key={y} variant="outline" className="text-[9px] px-1 py-0">{y}</Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-primary">{formatCurrency(client.h1Total)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 pt-3 border-t flex items-center justify-between text-sm">
              <p className="text-muted-foreground">
                These clients contributed the most during the first half of the year (January-June) across 2022-2025
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExport}
              >
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="clients" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:inline-flex">
            <TabsTrigger value="clients">All Clients</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search clients..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="one-time">One-Time</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={yearFilter} onValueChange={setYearFilter}>
                      <SelectTrigger className="w-full sm:w-[120px]">
                        <Calendar className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        {YEARS.map((y) => (
                          <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={activityFilter} onValueChange={setActivityFilter}>
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Activity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Activity</SelectItem>
                        <SelectItem value="returning">Returning</SelectItem>
                        <SelectItem value="loyal">Loyal (3+ yrs)</SelectItem>
                        <SelectItem value="new-2025">New in 2025</SelectItem>
                        <SelectItem value="churned">Churned (no 2025)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={quarterFilter} onValueChange={setQuarterFilter}>
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <FileText className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Quarter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Quarters</SelectItem>
                        <SelectItem value="h1-top">H1 (Q1+Q2) Focus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {filteredAndSortedClients.length} clients match filters
                    </p>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                          <div className="flex items-center gap-1">Client Name <SortIcon field="name" /></div>
                        </TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="cursor-pointer" onClick={() => handleSort("yearsActive")}>
                          <div className="flex items-center gap-1">Years <SortIcon field="yearsActive" /></div>
                        </TableHead>
                        {YEARS.map((year) => (
                          <TableHead key={year} className="text-center text-xs">{year}</TableHead>
                        ))}
                        <TableHead className="cursor-pointer text-right" onClick={() => handleSort("h1Total")}>
                          <div className="flex items-center justify-end gap-1">H1 (Est.) <SortIcon field="h1Total" /></div>
                        </TableHead>
                        <TableHead className="cursor-pointer text-right" onClick={() => handleSort("totalInvoices")}>
                          <div className="flex items-center justify-end gap-1">Invoices <SortIcon field="totalInvoices" /></div>
                        </TableHead>
                        <TableHead className="cursor-pointer text-right" onClick={() => handleSort("totalRevenue")}>
                          <div className="flex items-center justify-end gap-1">Total Revenue <SortIcon field="totalRevenue" /></div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedClients.map((client) => (
                        <TableRow 
                          key={client.name} 
                          className="cursor-pointer hover:bg-muted/70"
                          onClick={() => handleClientClick(client)}
                        >
                          <TableCell className="font-medium max-w-[200px] truncate">{client.name}</TableCell>
                          <TableCell>{getCategoryBadge(client.latestCategory)}</TableCell>
                          <TableCell>
                            <div className="flex gap-0.5">
                              {client.yearsActive.map((y) => (
                                <Badge key={y} variant="outline" className="text-[10px] px-1">{y}</Badge>
                              ))}
                            </div>
                          </TableCell>
                          {YEARS.map((year) => (
                            <TableCell key={year} className="text-center text-xs">
                              {client.years[year] ? (
                                <span className="text-foreground">{formatCurrency(client.years[year]!.totalAmount)}</span>
                              ) : (
                                <Minus className="h-3 w-3 text-muted-foreground mx-auto" />
                              )}
                            </TableCell>
                          ))}
                          <TableCell className="text-right text-xs text-muted-foreground">
                            {client.h1Total > 0 ? formatCurrency(client.h1Total) : <Minus className="h-3 w-3 mx-auto" />}
                          </TableCell>
                          <TableCell className="text-right">{client.totalInvoices}</TableCell>
                          <TableCell className="text-right font-semibold">{formatCurrency(client.totalRevenue)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="p-3 border-t text-sm text-muted-foreground">
                  Showing {filteredAndSortedClients.length} clients — Click any row to view details
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Yearly Revenue Trend */}
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Revenue by Year</CardTitle>
                  <CardDescription className="text-xs">4-year revenue comparison</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={yearlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                      <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 10 }} width={45} />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                      <Bar dataKey="premium" name="Premium" fill="hsl(var(--premium))" stackId="a" />
                      <Bar dataKey="normal" name="Normal" fill="hsl(var(--normal))" stackId="a" />
                      <Bar dataKey="oneTime" name="One-Time" fill="hsl(var(--one-time))" stackId="a" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Client Count Trend */}
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Client Count by Year</CardTitle>
                  <CardDescription className="text-xs">Unique clients per year</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={clientGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="clients" name="Clients" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Current Category Distribution</CardTitle>
                  <CardDescription className="text-xs">Based on latest year activity</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top H1 Contributors - First Half of Year */}
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Top H1 Contributors (Q1+Q2)</CardTitle>
                  <CardDescription className="text-xs">Clients with highest first-half revenue across all years</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    {data.clients
                      .filter((c) => c.h1Total > 0)
                      .sort((a, b) => b.h1Total - a.h1Total)
                      .slice(0, 10)
                      .map((client, idx) => (
                        <div key={client.name} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-5">{idx + 1}.</span>
                            <span className="text-sm font-medium truncate max-w-[160px]">{client.name}</span>
                            {getCategoryBadge(client.latestCategory)}
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">{formatCurrency(client.h1Total)}</p>
                            <p className="text-[10px] text-muted-foreground">H1 Est.</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Loyal Clients */}
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Top Loyal Clients (3+ Years)</CardTitle>
                  <CardDescription className="text-xs">Highest lifetime value clients</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    {data.clients
                      .filter((c) => c.yearsActive.length >= 3)
                      .slice(0, 8)
                      .map((client, idx) => (
                        <div key={client.name} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-5">{idx + 1}.</span>
                            <span className="text-sm font-medium truncate max-w-[180px]">{client.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px]">{client.yearsActive.length} yrs</Badge>
                            <span className="text-sm font-semibold">{formatCurrency(client.totalRevenue)}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quarterly Revenue Comparison */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Quarterly Revenue by Year</CardTitle>
                <CardDescription className="text-xs">Q1 (Jan-Mar), Q2 (Apr-Jun), Q3 (Jul-Sep), Q4 (Oct-Dec)</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead className="text-right">Q1</TableHead>
                        <TableHead className="text-right">Q2</TableHead>
                        <TableHead className="text-right font-semibold">H1 Total</TableHead>
                        <TableHead className="text-right">Q3</TableHead>
                        <TableHead className="text-right">Q4</TableHead>
                        <TableHead className="text-right font-semibold">H2 Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {YEARS.map((year) => {
                        const yt = data.yearTotals[year];
                        const h1 = (yt?.q1Revenue || 0) + (yt?.q2Revenue || 0);
                        const h2 = (yt?.q3Revenue || 0) + (yt?.q4Revenue || 0);
                        return (
                          <TableRow key={year}>
                            <TableCell className="font-medium">{year}</TableCell>
                            <TableCell className="text-right">{formatCurrency(yt?.q1Revenue || 0)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(yt?.q2Revenue || 0)}</TableCell>
                            <TableCell className="text-right font-semibold text-primary">{formatCurrency(h1)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(yt?.q3Revenue || 0)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(yt?.q4Revenue || 0)}</TableCell>
                            <TableCell className="text-right font-semibold">{formatCurrency(h2)}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Year-over-Year Revenue Table */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Year-over-Year Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Invoices</TableHead>
                      <TableHead className="text-right">Clients</TableHead>
                      <TableHead className="text-right">Premium</TableHead>
                      <TableHead className="text-right">Normal</TableHead>
                      <TableHead className="text-right">One-Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {YEARS.map((year) => (
                      <TableRow key={year}>
                        <TableCell className="font-medium">{year}</TableCell>
                        <TableCell className="text-right font-semibold">{formatCurrency(data.yearTotals[year]?.revenue || 0)}</TableCell>
                        <TableCell className="text-right">{data.yearTotals[year]?.invoices || 0}</TableCell>
                        <TableCell className="text-right">{data.yearTotals[year]?.clients || 0}</TableCell>
                        <TableCell className="text-right">{formatCurrency(data.yearTotals[year]?.premiumRevenue || 0)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(data.yearTotals[year]?.normalRevenue || 0)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(data.yearTotals[year]?.oneTimeRevenue || 0)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Client Detail Sheet */}
        <ClientDetailSheet 
          client={selectedClient} 
          open={sheetOpen} 
          onOpenChange={setSheetOpen} 
        />
      </main>
    </div>
  );
};

export default AllClientsOverview;
