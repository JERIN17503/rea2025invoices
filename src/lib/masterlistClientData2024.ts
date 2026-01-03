import * as XLSX from "xlsx";
import { parse, isValid } from "date-fns";
import type { ClientSummary } from "@/data/clientData";

type ClientCategory = "premium" | "normal" | "one-time";

const VAT_RATE = 0.05;

export interface CategoryStats {
  count: number;
  totalInvoices: number;
  totalAmount: number;
}

export interface OverallStats {
  total: CategoryStats;
  premium: CategoryStats;
  normal: CategoryStats;
  oneTime: CategoryStats;
}

export interface SalesPersonStat {
  name: string;
  invoiceCount: number;
  totalAmount: number;
}

export interface MasterlistClientData2024 {
  premiumClients: ClientSummary[];
  normalClients: ClientSummary[];
  oneTimeClients: ClientSummary[];
  allClients: ClientSummary[];
  stats: OverallStats;
  salesPersonStats: SalesPersonStat[];
}

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

  const parsed = parse(s, "d-MMM-yy", new Date());
  if (isValid(parsed)) return parsed;

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

function getCategory(invoiceCount: number): ClientCategory {
  if (invoiceCount >= 4) return "premium";
  if (invoiceCount >= 2) return "normal";
  return "one-time";
}

export async function loadMasterlistClientData2024(): Promise<MasterlistClientData2024> {
  const res = await fetch("/data/masterlist2024.xlsx", { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load masterlist 2024 (HTTP ${res.status})`);

  const buf = await res.arrayBuffer();
  const wb = XLSX.read(buf, { type: "array" });

  const detectRawSheet = (): { sheetName: string; headerRow: number } => {
    const wanted = [
      "client",
      "invoice date",
      "invoice no",
      "total invoice amount",
      "invoice sub-total after rebate",
    ];

    let best: { sheetName: string; headerRow: number; score: number } | null = null;

    for (const name of wb.SheetNames) {
      const ws = wb.Sheets[name];
      const matrix = XLSX.utils.sheet_to_json<unknown[]>(ws, {
        header: 1,
        range: 0,
        blankrows: false,
      });

      const maxRows = Math.min(matrix.length, 30);
      for (let r = 0; r < maxRows; r++) {
        const row = (matrix[r] ?? [])
          .map((v) => String(v ?? "").toLowerCase().replace(/\s+/g, " ").trim())
          .filter(Boolean);

        if (row.length < 3) continue;
        const score = wanted.reduce(
          (s, w) => (row.some((h) => h.includes(w)) ? s + 1 : s),
          0
        );

        if (!best || score > best.score) best = { sheetName: name, headerRow: r, score };
        if (score >= 4) return { sheetName: name, headerRow: r };
      }
    }

    return best && best.score >= 3
      ? { sheetName: best.sheetName, headerRow: best.headerRow }
      : { sheetName: wb.SheetNames[0], headerRow: 0 };
  };

  const { sheetName, headerRow } = detectRawSheet();
  const ws = wb.Sheets[sheetName];

  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, {
    defval: "",
    raw: true,
    range: headerRow,
  });

  type Agg = {
    name: string;
    invoiceCount: number;
    totalAmount: number;
    salesPersons: Set<string>;
    description?: string;
  };

  const byClient = new Map<string, Agg>();

  for (const row of rows) {
    const client = normalizeClientName(rowGet(row, ["CLIENT", "Client"]));
    const date = toDate(rowGet(row, ["INVOICE DATE", "Invoice Date", "DATE"]));
    if (!client || !date) continue;
    if (date.getFullYear() !== 2024) continue;

    const subAfterRebate = toNumber(
      rowGet(row, ["INVOICE SUB-TOTAL AFTER REBATE", "INVOICE SUBTOTAL AFTER REBATE", "SUB-TOTAL AFTER REBATE"])
    );
    const totalInvoiceAmount = toNumber(rowGet(row, ["TOTAL INVOICE AMOUNT", "TOTAL AMOUNT", "INVOICE TOTAL"]));
    const netRevenue = subAfterRebate > 0 ? subAfterRebate : totalInvoiceAmount / (1 + VAT_RATE);
    if (!Number.isFinite(netRevenue) || netRevenue <= 0) continue;

    const salesPersonRaw = String(
      rowGet(row, [
        "SALES PERSON",
        "SALES PERSON NAME",
        "SALES PERSON / ACCOUNT MANAGER",
        "ACCOUNT MANAGER",
        "SALES",
      ]) ??
        ""
    )
      .trim()
      .toUpperCase();

    const descriptionRaw = String(
      rowGet(row, ["DESCRIPTION", "ITEM DESCRIPTION", "DETAILS", "PROJECT", "PARTICULARS"]) ?? ""
    ).trim();

    const agg = byClient.get(client) ?? {
      name: client,
      invoiceCount: 0,
      totalAmount: 0,
      salesPersons: new Set<string>(),
    };

    agg.invoiceCount += 1;
    agg.totalAmount += netRevenue;
    if (salesPersonRaw) agg.salesPersons.add(salesPersonRaw);
    if (!agg.description && descriptionRaw) agg.description = descriptionRaw;

    byClient.set(client, agg);
  }

  if (byClient.size === 0 && rows.length > 0) {
    // eslint-disable-next-line no-console
    console.warn("Masterlist 2024 parsed 0 clients. Available headers:", Object.keys(rows[0] ?? {}));
  }

  const allClients: ClientSummary[] = Array.from(byClient.values()).map((c) => {
    const category = getCategory(c.invoiceCount);
    return {
      name: c.name,
      invoiceCount: c.invoiceCount,
      totalAmount: c.totalAmount,
      category,
      salesPersons: Array.from(c.salesPersons).sort(),
      description: c.description,
    };
  });

  const premiumClients = allClients
    .filter((c) => c.category === "premium")
    .sort((a, b) => b.totalAmount - a.totalAmount);
  const normalClients = allClients
    .filter((c) => c.category === "normal")
    .sort((a, b) => b.totalAmount - a.totalAmount);
  const oneTimeClients = allClients
    .filter((c) => c.category === "one-time")
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const sumInvoices = (list: ClientSummary[]) => list.reduce((s, c) => s + c.invoiceCount, 0);
  const sumAmount = (list: ClientSummary[]) => list.reduce((s, c) => s + c.totalAmount, 0);

  const stats: OverallStats = {
    total: {
      count: allClients.length,
      totalInvoices: sumInvoices(allClients),
      totalAmount: sumAmount(allClients),
    },
    premium: {
      count: premiumClients.length,
      totalInvoices: sumInvoices(premiumClients),
      totalAmount: sumAmount(premiumClients),
    },
    normal: {
      count: normalClients.length,
      totalInvoices: sumInvoices(normalClients),
      totalAmount: sumAmount(normalClients),
    },
    oneTime: {
      count: oneTimeClients.length,
      totalInvoices: sumInvoices(oneTimeClients),
      totalAmount: sumAmount(oneTimeClients),
    },
  };

  const spMap = new Map<string, { totalAmount: number; invoiceCount: number }>();
  for (const client of allClients) {
    for (const sp of client.salesPersons) {
      const prev = spMap.get(sp) ?? { totalAmount: 0, invoiceCount: 0 };
      spMap.set(sp, {
        totalAmount: prev.totalAmount + client.totalAmount,
        invoiceCount: prev.invoiceCount + client.invoiceCount,
      });
    }
  }

  const salesPersonStats: SalesPersonStat[] = Array.from(spMap.entries())
    .map(([name, v]) => ({ name, totalAmount: v.totalAmount, invoiceCount: v.invoiceCount }))
    .sort((a, b) => b.totalAmount - a.totalAmount);

  return {
    premiumClients,
    normalClients,
    oneTimeClients,
    allClients,
    stats,
    salesPersonStats,
  };
}

