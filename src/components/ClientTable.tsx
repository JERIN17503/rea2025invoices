import { useState, useMemo } from "react";
import { ClientSummary } from "@/data/clientData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ChevronUp, ChevronDown, Crown, User, Users } from "lucide-react";

interface ClientTableProps {
  clients: ClientSummary[];
  title: string;
  category: 'premium' | 'one-time' | 'normal' | 'all';
}

type SortField = 'name' | 'invoiceCount' | 'totalAmount';
type SortDirection = 'asc' | 'desc';

export function ClientTable({ clients, title, category }: ClientTableProps) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>('totalAmount');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const filteredAndSortedClients = useMemo(() => {
    let filtered = clients;
    
    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchLower) ||
        c.salesPersons.some(sp => sp.toLowerCase().includes(searchLower))
      );
    }

    // Sort
    return [...filtered].sort((a, b) => {
      let comparison = 0;
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'invoiceCount') {
        comparison = a.invoiceCount - b.invoiceCount;
      } else {
        comparison = a.totalAmount - b.totalAmount;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [clients, search, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4 inline ml-1" /> : 
      <ChevronDown className="h-4 w-4 inline ml-1" />;
  };

  const getCategoryIcon = (cat: ClientSummary['category']) => {
    switch (cat) {
      case 'premium': return <Crown className="h-4 w-4" />;
      case 'one-time': return <User className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getCategoryBadgeClass = (cat: ClientSummary['category']) => {
    switch (cat) {
      case 'premium': return 'bg-premium/20 text-premium-foreground border-premium/30';
      case 'one-time': return 'bg-one-time/20 text-one-time-foreground border-one-time/30';
      default: return 'bg-normal/20 text-normal-foreground border-normal/30';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>
          <Badge variant="outline" className="text-sm">
            {filteredAndSortedClients.length} clients
          </Badge>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by client name or sales person..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="overflow-auto max-h-[600px]">
        <Table>
          <TableHeader className="sticky top-0 bg-card z-10">
            <TableRow>
              <TableHead className="w-[40px]">#</TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 h-auto font-medium" onClick={() => handleSort('name')}>
                  Client Name <SortIcon field="name" />
                </Button>
              </TableHead>
              {category === 'all' && <TableHead>Category</TableHead>}
              <TableHead className="text-center">
                <Button variant="ghost" className="p-0 h-auto font-medium" onClick={() => handleSort('invoiceCount')}>
                  Invoices <SortIcon field="invoiceCount" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" className="p-0 h-auto font-medium" onClick={() => handleSort('totalAmount')}>
                  Total Amount <SortIcon field="totalAmount" />
                </Button>
              </TableHead>
              <TableHead>Sales Person</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedClients.map((client, index) => (
              <TableRow key={client.name} className="hover:bg-muted/50 transition-colors">
                <TableCell className="text-muted-foreground font-mono text-sm">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium max-w-[300px]">
                  <div className="truncate" title={client.name}>
                    {client.name}
                  </div>
                </TableCell>
                {category === 'all' && (
                  <TableCell>
                    <Badge className={`${getCategoryBadgeClass(client.category)} flex items-center gap-1 w-fit`}>
                      {getCategoryIcon(client.category)}
                      {client.category === 'one-time' ? 'One-Time' : client.category.charAt(0).toUpperCase() + client.category.slice(1)}
                    </Badge>
                  </TableCell>
                )}
                <TableCell className="text-center">
                  <span className="inline-flex items-center justify-center min-w-[32px] h-8 px-2 bg-secondary rounded-full font-semibold text-secondary-foreground">
                    {client.invoiceCount}
                  </span>
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  {formatCurrency(client.totalAmount)}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {client.salesPersons.map(sp => (
                      <Badge key={sp} variant="outline" className="text-xs">
                        {sp}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Total for {filteredAndSortedClients.length} clients
          </span>
          <span className="font-bold text-card-foreground">
            {formatCurrency(filteredAndSortedClients.reduce((sum, c) => sum + c.totalAmount, 0))}
          </span>
        </div>
      </div>
    </div>
  );
}
