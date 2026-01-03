import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FileDown, FileSpreadsheet, FileText } from "lucide-react";
import { exportToCSV, formatClientForExport } from "@/lib/csvExport";
import { exportClientsPDF, exportAllClientsPDF } from "@/lib/pdfExport";
import { ClientSummary } from "@/data/clientData";

interface CategoryStats {
  count: number;
  totalInvoices: number;
  totalAmount: number;
}

interface ExportDialogProps {
  clients: ClientSummary[];
  title: string;
  category: string;
  stats: CategoryStats;
  chartRef?: React.RefObject<HTMLDivElement>;
  trigger?: React.ReactNode;
}

interface ExportAllDialogProps {
  premiumClients: ClientSummary[];
  normalClients: ClientSummary[];
  oneTimeClients: ClientSummary[];
  premiumStats: CategoryStats;
  normalStats: CategoryStats;
  oneTimeStats: CategoryStats;
  trigger?: React.ReactNode;
}

export function ExportDialog({ 
  clients, 
  title, 
  category, 
  stats,
  chartRef,
  trigger 
}: ExportDialogProps) {
  const [format, setFormat] = useState<"csv" | "pdf">("pdf");
  const [open, setOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      if (format === "csv") {
        const exportData = clients.map(client => formatClientForExport(client, category));
        const filename = title.toLowerCase().replace(/\s+/g, '_');
        exportToCSV(exportData, filename);
      } else {
        // Get chart image if ref is provided
        let chartImage: string | undefined;
        if (chartRef?.current) {
          const html2canvas = (await import('html2canvas')).default;
          const canvas = await html2canvas(chartRef.current, {
            backgroundColor: '#ffffff',
            scale: 2,
          });
          chartImage = canvas.toDataURL('image/png');
        }
        await exportClientsPDF(clients, title, stats, chartImage);
      }
      setOpen(false);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <FileDown className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Export {title}</DialogTitle>
          <DialogDescription>
            Choose your preferred export format. PDF includes charts and visual data.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup value={format} onValueChange={(v) => setFormat(v as "csv" | "pdf")}>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer" onClick={() => setFormat("csv")}>
              <RadioGroupItem value="csv" id="csv" />
              <Label htmlFor="csv" className="flex items-center gap-3 cursor-pointer flex-1">
                <FileSpreadsheet className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">CSV File</p>
                  <p className="text-xs text-muted-foreground">Spreadsheet format, easy to edit</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer mt-2" onClick={() => setFormat("pdf")}>
              <RadioGroupItem value="pdf" id="pdf" />
              <Label htmlFor="pdf" className="flex items-center gap-3 cursor-pointer flex-1">
                <FileText className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">PDF Report</p>
                  <p className="text-xs text-muted-foreground">Includes charts, figures & formatting</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleExport} disabled={exporting}>
            {exporting ? "Exporting..." : `Export as ${format.toUpperCase()}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ExportAllDialog({
  premiumClients,
  normalClients,
  oneTimeClients,
  premiumStats,
  normalStats,
  oneTimeStats,
  trigger,
}: ExportAllDialogProps) {
  const [format, setFormat] = useState<"csv" | "pdf">("pdf");
  const [open, setOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      if (format === "csv") {
        const allClients = [
          ...premiumClients.map(c => formatClientForExport(c, 'Premium')),
          ...normalClients.map(c => formatClientForExport(c, 'Normal')),
          ...oneTimeClients.map(c => formatClientForExport(c, 'One-Time')),
        ];
        exportToCSV(allClients, 'all_clients_report');
      } else {
        await exportAllClientsPDF(
          premiumClients,
          normalClients,
          oneTimeClients,
          premiumStats,
          normalStats,
          oneTimeStats
        );
      }
      setOpen(false);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Export All
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Export All Client Data</DialogTitle>
          <DialogDescription>
            Choose your preferred export format. PDF includes charts, pie charts, and visual data.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup value={format} onValueChange={(v) => setFormat(v as "csv" | "pdf")}>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer" onClick={() => setFormat("csv")}>
              <RadioGroupItem value="csv" id="csv-all" />
              <Label htmlFor="csv-all" className="flex items-center gap-3 cursor-pointer flex-1">
                <FileSpreadsheet className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">CSV File</p>
                  <p className="text-xs text-muted-foreground">All clients in spreadsheet format</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer mt-2" onClick={() => setFormat("pdf")}>
              <RadioGroupItem value="pdf" id="pdf-all" />
              <Label htmlFor="pdf-all" className="flex items-center gap-3 cursor-pointer flex-1">
                <FileText className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">PDF Report</p>
                  <p className="text-xs text-muted-foreground">Full report with charts & analytics</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleExport} disabled={exporting}>
            {exporting ? "Exporting..." : `Export as ${format.toUpperCase()}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
