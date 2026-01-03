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
  const normalized = s.replace(/,/g, "").replace(/\u00A0/g, " ").trim();
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

function toDate(value: unknown): Date | null {
  if (value instanceof Date && isValid(value)) return value;
  if (typeof value === "number") {
    const d = XLSX.SSF.parse_date_code(value);
    if (!d) return null;
    const js = new Date(d.y, d.m - 1, d.d);
    return isValid(js) ? js : null;
  }

  const s = String(value ?? "").trim();
  if (!s) return null;

  // Masterlists often mix formats (e.g. 2-Jan-24, 2-Jan-2024, 02-Jan-2024).
  const formats = [
    "d-MMM-yy",
    "dd-MMM-yy",
    "d-MMM-yyyy",
    "dd-MMM-yyyy",
    "yyyy-MM-dd",
    "M/d/yyyy",
    "d/M/yyyy",
  ];

  for (const fmt of formats) {
    const parsed = parse(s, fmt, new Date());
    if (isValid(parsed)) return parsed;
  }

  const fallback = new Date(s);
  return isValid(fallback) ? fallback : null;
}

function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/\s+/g, " ").trim();
}

function rowGet(row: Record<string, unknown>, wanted: string[]): unknown {
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
  const raw = String(name ?? "").trim();
  if (!raw) return "";

  const withoutParens = raw.replace(/\([^)]*\)/g, " ");

  const cleaned = withoutParens
    .replace(/&/g, " AND ")
    .replace(/[\u00A0]/g, " ")
    .replace(/[^A-Za-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const upper = cleaned.toUpperCase();

  const suffixStripped = upper
    .replace(/\b(L\s*L\s*C|LTD|LIMITED|FZE|FZCO|FZ\s*LLC|DMCC|LLC|L\.L\.C)\b/g, " ")
    .replace(/\b(BRANCH|HO)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (suffixStripped.includes("IDP")) return "IDP Education";
  if (suffixStripped.includes("NAVITAS") || suffixStripped.includes("MURDOCH")) return "Navitas / Murdoch";
  if (suffixStripped.includes("TRANE")) return "Trane BVBA";
  if (suffixStripped.includes("GULFTAINER")) return "Gulftainer Company Limited";
  if (suffixStripped.includes("DEAKIN")) return "Deakin University";
  if (suffixStripped.includes("HULT")) return "Hult Investments";
  if (suffixStripped.includes("INDO TAUSCH") || suffixStripped.includes("GMR")) return "Indo Tausch Trading";

  return cleaned;
}

export interface MasterlistAggregates2024 {
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

export async function loadMasterlistAggregates2024(): Promise<MasterlistAggregates2024> {
  const res = await fetch("/data/masterlist2024.xlsx", { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load masterlist 2024 (HTTP ${res.status})`);

  const buf = await res.arrayBuffer();
  const wb = XLSX.read(buf, { type: "array" });

  // Some masterlists contain pivot/summary sheets first.
  // Detect the sheet + header row that matches the raw invoice table.
  const detectRawSheet = (): { sheetName: string; headerRow: number } => {
    const wanted = [
      "client",
      "invoice date",
      "invoice no",
      "total invoice amount",
      "invoice sub-total after rebate",
      "invoice sub-total",
    ];

    const mustHave = ["client", "invoice date"]; // avoid pivot/summary tabs

    let best: { sheetName: string; headerRow: number; score: number; rows: number } | null = null;

    for (const name of wb.SheetNames) {
      const ws = wb.Sheets[name];
      const matrix = XLSX.utils.sheet_to_json<unknown[]>(ws, {
        header: 1,
        range: 0,
        blankrows: false,
      });

      const maxHeaderScan = Math.min(matrix.length, 50);
      for (let r = 0; r < maxHeaderScan; r++) {
        const row = (matrix[r] ?? [])
          .map((v) => String(v ?? "").toLowerCase().replace(/\s+/g, " ").trim())
          .filter(Boolean);

        if (row.length < 3) continue;
        if (!mustHave.every((m) => row.some((h) => h.includes(m)))) continue;

        const score = wanted.reduce((s, w) => (row.some((h) => h.includes(w)) ? s + 1 : s), 0);
        if (score < 4) continue;

        const approxRows = Math.max(0, matrix.length - (r + 1));
        const candidate = { sheetName: name, headerRow: r, score, rows: approxRows };

        if (!best || candidate.score > best.score || (candidate.score === best.score && candidate.rows > best.rows)) {
          best = candidate;
        }

        if (score >= 5 && approxRows >= 200) return { sheetName: name, headerRow: r };
      }
    }

    return best ? { sheetName: best.sheetName, headerRow: best.headerRow } : { sheetName: wb.SheetNames[0], headerRow: 0 };
  };

  const { sheetName, headerRow } = detectRawSheet();
  const ws = wb.Sheets[sheetName];

  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
    defval: "",
    raw: true,
    range: headerRow,
  });

  const clientInvoiceCounts = new Map<string, number>();

  type InvoiceRow = {
    client: string;
    date: Date;
    netRevenue: number;
  };

  const invoices: InvoiceRow[] = [];

  let debugRows2024 = 0;
  let debugSumSubAfter = 0;
  let debugSumSub = 0;
  let debugSumTotalDerived = 0;

  for (const row of rows) {
    const client = normalizeClientName(rowGet(row, ["CLIENT", "Client"]));
    const invoiceNo = String(
      rowGet(row, ["INVOICE NO.", "INVOICE NO", "Invoice No", "INVOICE NUMBER", "INVOICE #"]) ?? ""
    ).trim();
    const date = toDate(rowGet(row, ["INVOICE DATE", "Invoice Date", "DATE"]));

    if (!client) continue;

    const inferredYear = (() => {
      const m = invoiceNo.match(/^(\d{2})-/);
      if (!m) return null;
      const yy = Number(m[1]);
      return Number.isFinite(yy) ? 2000 + yy : null;
    })();

    const year = date?.getFullYear() ?? inferredYear;
    if (year !== 2024 || !date) continue;

    debugRows2024 += 1;

    const subAfterRebate = toNumber(
      rowGet(row, [
        "INVOICE SUB-TOTAL AFTER REBATE",
        "INVOICE SUBTOTAL AFTER REBATE",
        "SUB-TOTAL AFTER REBATE",
      ])
    );
    const subTotal = toNumber(
      rowGet(row, ["INVOICE SUB-TOTAL", "INVOICE SUBTOTAL", "SUB-TOTAL", "SUBTOTAL"])
    );
    const totalInvoiceAmount = toNumber(rowGet(row, ["TOTAL INVOICE AMOUNT", "TOTAL AMOUNT", "INVOICE TOTAL"]));

    debugSumSubAfter += subAfterRebate > 0 ? subAfterRebate : 0;
    debugSumSub += subTotal > 0 ? subTotal : 0;
    debugSumTotalDerived += totalInvoiceAmount > 0 ? totalInvoiceAmount / (1 + VAT_RATE) : 0;

    // Pre-VAT revenue:
    // 1) Prefer explicit pre-VAT columns from the sheet
    // 2) Only fall back to total/1.05 if subtotals are missing
    const netRevenue = subAfterRebate > 0 ? subAfterRebate : subTotal > 0 ? subTotal : totalInvoiceAmount / (1 + VAT_RATE);
    if (!Number.isFinite(netRevenue) || netRevenue <= 0) continue;

    invoices.push({ client, date, netRevenue });
    clientInvoiceCounts.set(client, (clientInvoiceCounts.get(client) ?? 0) + 1);
  }

  // eslint-disable-next-line no-console
  console.info("[2024 masterlist] sheet=", sheetName, "headerRow=", headerRow, "rows=", rows.length, "rows2024=", debugRows2024, "invoicesUsed=", invoices.length, {
    sumSubAfterRebate: debugSumSubAfter,
    sumSubTotal: debugSumSub,
    sumTotalDerivedPreVat: debugSumTotalDerived,
  });

  if (invoices.length === 0 && rows.length > 0) {
    console.warn("Masterlist 2024 parsed 0 invoices. Available headers:", Object.keys(rows[0] ?? {}));
  }

  const getCategory = (clientName: string): ClientCategory => {
    const count = clientInvoiceCounts.get(clientName) ?? 0;
    if (count >= 4) return "premium";
    if (count >= 2) return "normal";
    return "one-time";
  };

  const perMonth = MONTHS.map((month, idx) => {
    const monthInvoices = invoices.filter((inv) => inv.date.getMonth() === idx);

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
}

