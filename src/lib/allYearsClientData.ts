import { ClientSummary } from "@/data/clientData";
import { loadMasterlistClientData2022 } from "./masterlistClientData2022";
import { loadMasterlistClientData2023 } from "./masterlistClientData2023";
import { loadMasterlistClientData2024 } from "./masterlistClientData2024";
import { premiumClients, normalClients, oneTimeClients } from "@/data/clientData";

export interface MultiYearClient {
  name: string;
  years: {
    [year: number]: {
      invoiceCount: number;
      totalAmount: number;
      category: "premium" | "normal" | "one-time";
    } | null;
  };
  totalInvoices: number;
  totalRevenue: number;
  yearsActive: number[];
  latestCategory: "premium" | "normal" | "one-time";
}

export interface AllYearsData {
  clients: MultiYearClient[];
  yearTotals: {
    [year: number]: {
      revenue: number;
      invoices: number;
      clients: number;
      premiumRevenue: number;
      normalRevenue: number;
      oneTimeRevenue: number;
    };
  };
}

function normalizeClientName(name: string): string {
  return name
    .replace(/\s*\(.*?\)\s*/g, " ")
    .replace(/\s*(L\.?L\.?C\.?|LLC|FZE|FZCO|DMCC|FZ-LLC|Ltd\.?|Limited|Inc\.?)\s*/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

let cachedData: AllYearsData | null = null;

export async function loadAllYearsClientData(): Promise<AllYearsData> {
  if (cachedData) return cachedData;

  const [data2022, data2023, data2024] = await Promise.all([
    Promise.resolve(loadMasterlistClientData2022()),
    loadMasterlistClientData2023(),
    loadMasterlistClientData2024(),
  ]);

  // 2025 data from clientData.ts
  const all2025: ClientSummary[] = [...premiumClients, ...normalClients, ...oneTimeClients];

  // Build a map of normalized names to year data
  const clientMap = new Map<string, MultiYearClient>();

  const processYear = (clients: ClientSummary[], year: number) => {
    for (const client of clients) {
      const normalized = normalizeClientName(client.name);
      
      if (!clientMap.has(normalized)) {
        clientMap.set(normalized, {
          name: client.name,
          years: {},
          totalInvoices: 0,
          totalRevenue: 0,
          yearsActive: [],
          latestCategory: client.category,
        });
      }
      
      const entry = clientMap.get(normalized)!;
      
      // Use the most readable name (prefer longer names with proper casing)
      if (client.name.length > entry.name.length || 
          (client.name.length === entry.name.length && client.name !== client.name.toUpperCase())) {
        entry.name = client.name;
      }
      
      entry.years[year] = {
        invoiceCount: client.invoiceCount,
        totalAmount: client.totalAmount,
        category: client.category,
      };
      
      entry.totalInvoices += client.invoiceCount;
      entry.totalRevenue += client.totalAmount;
      
      if (!entry.yearsActive.includes(year)) {
        entry.yearsActive.push(year);
      }
      
      // Update latest category based on most recent year
      if (year >= Math.max(...entry.yearsActive)) {
        entry.latestCategory = client.category;
      }
    }
  };

  processYear(data2022.allClients, 2022);
  processYear(data2023.allClients, 2023);
  processYear(data2024.allClients, 2024);
  processYear(all2025, 2025);

  // Sort years active
  clientMap.forEach((client) => {
    client.yearsActive.sort((a, b) => a - b);
  });

  const clients = Array.from(clientMap.values()).sort((a, b) => b.totalRevenue - a.totalRevenue);

  // Calculate year totals
  const yearTotals: AllYearsData["yearTotals"] = {
    2022: {
      revenue: data2022.stats.total.totalAmount,
      invoices: data2022.stats.total.totalInvoices,
      clients: data2022.stats.total.count,
      premiumRevenue: data2022.stats.premium.totalAmount,
      normalRevenue: data2022.stats.normal.totalAmount,
      oneTimeRevenue: data2022.stats.oneTime.totalAmount,
    },
    2023: {
      revenue: data2023.stats.total.totalAmount,
      invoices: data2023.stats.total.totalInvoices,
      clients: data2023.stats.total.count,
      premiumRevenue: data2023.stats.premium.totalAmount,
      normalRevenue: data2023.stats.normal.totalAmount,
      oneTimeRevenue: data2023.stats.oneTime.totalAmount,
    },
    2024: {
      revenue: data2024.stats.total.totalAmount,
      invoices: data2024.stats.total.totalInvoices,
      clients: data2024.stats.total.count,
      premiumRevenue: data2024.stats.premium.totalAmount,
      normalRevenue: data2024.stats.normal.totalAmount,
      oneTimeRevenue: data2024.stats.oneTime.totalAmount,
    },
    2025: {
      revenue: all2025.reduce((sum, c) => sum + c.totalAmount, 0),
      invoices: all2025.reduce((sum, c) => sum + c.invoiceCount, 0),
      clients: all2025.length,
      premiumRevenue: premiumClients.reduce((sum, c) => sum + c.totalAmount, 0),
      normalRevenue: normalClients.reduce((sum, c) => sum + c.totalAmount, 0),
      oneTimeRevenue: oneTimeClients.reduce((sum, c) => sum + c.totalAmount, 0),
    },
  };

  cachedData = { clients, yearTotals };
  return cachedData;
}
