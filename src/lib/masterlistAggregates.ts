import * as XLSX from "xlsx";
import { parse, isValid } from "date-fns";
import type { MonthlyData } from "@/data/clientData";
import { MONTHS } from "@/data/clientData";

type ClientCategory = "premium" | "normal" | "one-time";

const VAT_RATE = 0.05;

function toNumber(value: unknown): number {
  if (value == null) return 0;
  if (typeof value === "number") return value;
  const s = String(value).trim();
  if (!s) return 0;
  // remove commas and non-breaking spaces
  const normalized = s.replace(/,/g, "").replace(/\u00A0/g, " ").trim();
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

function toDate(value: unknown): Date | null {
  if (value instanceof Date && isValid(value)) return value;
  if (typeof value === "number") {
    // Excel serial date
    const d = XLSX.SSF.parse_date_code(value);
    if (!d) return null;
    const js = new Date(d.y, d.m - 1, d.d);
    return isValid(js) ? js : null;
  }
  const s = String(value ?? "").trim();
  if (!s) return null;

  // Common format in your sheet: 2-Jan-25
  const parsed = parse(s, "d-MMM-yy", new Date());
  if (isValid(parsed)) return parsed;

  const fallback = new Date(s);
  return isValid(fallback) ? fallback : null;
}

function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/\s+/g, " ").trim();
}

function rowGet(row: Record<string, unknown>, wanted: string[]): unknown {
  // build once per call (small) – robust to Excel weird headers like __EMPTY, extra spaces, etc.
  const normalized: Record<string, unknown> = {};
  for (const k of Object.keys(row)) {
    normalized[normalizeKey(k)] = row[k];
  }
  for (const w of wanted) {
    const v = normalized[normalizeKey(w)];
    if (v !== undefined && v !== "") return v;
  }
  return undefined;
}

function normalizeClientName(name: unknown): string {
  // Basic normalization + merge common variants (can be extended as you confirm mappings)
  const raw = String(name ?? "").trim();
  if (!raw) return "";
  const collapsed = raw.replace(/\s+/g, " ").trim();

  // Consolidations based on your project memory (examples)
  const upper = collapsed.toUpperCase();
  if (upper.startsWith("IDP")) return "IDP Education";
  if (upper.startsWith("NAVITAS")) return "Navitas Middle East";

  return collapsed;
}

export interface MasterlistAggregates {
  monthlyData: MonthlyData[];
  totals: {
    totalRevenue: number;
    totalInvoices: number;
    totalClients: number;
    avgInvoiceValue: number;
    premiumTotal: number;
    normalTotal: number;
    oneTimeTotal: number;
  };
}

let cache: Promise<MasterlistAggregates> | null = null;

export async function loadMasterlistAggregates(): Promise<MasterlistAggregates> {
  if (cache) return cache;

  cache = (async () => {
    const res = await fetch("/data/masterlist2025.xlsx", { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load masterlist (HTTP ${res.status})`);

    const buf = await res.arrayBuffer();
    const wb = XLSX.read(buf, { type: "array" });
    const sheetName = wb.SheetNames[0];
    const ws = wb.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
      defval: "",
      raw: true,
    });

    // Determine each client's annual invoice count for segmentation
    const clientInvoiceCounts = new Map<string, number>();

    type InvoiceRow = {
      client: string;
      date: Date;
      netRevenue: number; // pre-VAT
    };

    const invoices: InvoiceRow[] = [];

    for (const row of rows) {
      const client = normalizeClientName(
        rowGet(row, ["CLIENT", "Client"]) // tolerant
      );
      const date = toDate(rowGet(row, ["INVOICE DATE", "Invoice Date", "DATE"])) ;
      if (!client || !date) continue;

      const subAfterRebate = toNumber(
        rowGet(row, ["INVOICE SUB-TOTAL AFTER REBATE", "INVOICE SUBTOTAL AFTER REBATE", "SUB-TOTAL AFTER REBATE"])
      );
      const totalInvoiceAmount = toNumber(
        rowGet(row, ["TOTAL INVOICE AMOUNT", "TOTAL AMOUNT", "INVOICE TOTAL"])
      );

      const netRevenue = subAfterRebate > 0 ? subAfterRebate : totalInvoiceAmount / (1 + VAT_RATE);
      if (!Number.isFinite(netRevenue) || netRevenue <= 0) continue;

      invoices.push({ client, date, netRevenue });
      clientInvoiceCounts.set(client, (clientInvoiceCounts.get(client) ?? 0) + 1);
    }

    // Debug (kept lightweight): if we parsed nothing, log the available headers to fix mapping.
    if (invoices.length === 0 && rows.length > 0) {
      // eslint-disable-next-line no-console
      console.warn("Masterlist parsed 0 invoices. Available headers:", Object.keys(rows[0] ?? {}));
    }

    const getCategory = (clientName: string): ClientCategory => {
      const count = clientInvoiceCounts.get(clientName) ?? 0;
      if (count >= 4) return "premium";
      if (count >= 2) return "normal";
      return "one-time";
    };

    const perMonth = MONTHS.map((month, idx) => {
      const monthInvoices = invoices.filter((inv) => inv.date.getFullYear() === 2025 && inv.date.getMonth() === idx);

      const revenue = monthInvoices.reduce((s, i) => s + i.netRevenue, 0);
      const invoiceCount = monthInvoices.length;

      const clientsSet = new Set(monthInvoices.map((i) => i.client));

      const premiumClients = new Set<string>();
      const normalClients = new Set<string>();
      const oneTimeClients = new Set<string>();

      let premiumRevenue = 0;
      let normalRevenue = 0;
      let oneTimeRevenue = 0;
      let premiumInvoices = 0;
      let normalInvoices = 0;
      let oneTimeInvoices = 0;

      // top clients by month revenue
      const clientMonthRevenue = new Map<string, { revenue: number; invoices: number }>();

      for (const inv of monthInvoices) {
        const category = getCategory(inv.client);
        if (category === "premium") {
          premiumRevenue += inv.netRevenue;
          premiumInvoices += 1;
          premiumClients.add(inv.client);
        } else if (category === "normal") {
          normalRevenue += inv.netRevenue;
          normalInvoices += 1;
          normalClients.add(inv.client);
        } else {
          oneTimeRevenue += inv.netRevenue;
          oneTimeInvoices += 1;
          oneTimeClients.add(inv.client);
        }

        const prev = clientMonthRevenue.get(inv.client) ?? { revenue: 0, invoices: 0 };
        clientMonthRevenue.set(inv.client, { revenue: prev.revenue + inv.netRevenue, invoices: prev.invoices + 1 });
      }

      const topClients = Array.from(clientMonthRevenue.entries())
        .map(([name, v]) => ({
          name,
          revenue: v.revenue,
          invoices: v.invoices,
          category: getCategory(name),
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

      const data: MonthlyData = {
        month,
        monthNum: idx + 1,
        revenue,
        invoices: invoiceCount,
        clients: clientsSet.size,
        premiumRevenue,
        normalRevenue,
        oneTimeRevenue,
        premiumInvoices,
        normalInvoices,
        oneTimeInvoices,
        premiumClients: premiumClients.size,
        normalClients: normalClients.size,
        oneTimeClients: oneTimeClients.size,
        avgInvoiceValue: invoiceCount > 0 ? revenue / invoiceCount : 0,
        topClients,
      };

      return data;
    });

    const totalRevenue = perMonth.reduce((s, m) => s + m.revenue, 0);
    const totalInvoices = perMonth.reduce((s, m) => s + m.invoices, 0);
    const totalClients = invoices.length ? new Set(invoices.map((i) => i.client)).size : 0;

    const premiumTotal = perMonth.reduce((s, m) => s + m.premiumRevenue, 0);
    const normalTotal = perMonth.reduce((s, m) => s + m.normalRevenue, 0);
    const oneTimeTotal = perMonth.reduce((s, m) => s + m.oneTimeRevenue, 0);

    return {
      monthlyData: perMonth,
      totals: {
        totalRevenue,
        totalInvoices,
        totalClients,
        avgInvoiceValue: totalInvoices > 0 ? totalRevenue / totalInvoices : 0,
        premiumTotal,
        normalTotal,
        oneTimeTotal,
      },
    };
  })();

  return cache;
}
