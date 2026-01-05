import { ClientSummary, getMonthlyData } from "@/data/clientData";
import { loadMasterlistClientData2022 } from "./masterlistClientData2022";
import { loadMasterlistClientData2023 } from "./masterlistClientData2023";
import { loadMasterlistClientData2024 } from "./masterlistClientData2024";
import { premiumClients, normalClients, oneTimeClients } from "@/data/clientData";
import { loadMasterlistAggregates2022 } from "./masterlistAggregates2022";
import { loadMasterlistAggregates2023 } from "./masterlistAggregates2023";
import { loadMasterlistAggregates2024 } from "./masterlistAggregates2024";

export interface QuarterData {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

export interface MultiYearClient {
  name: string;
  years: {
    [year: number]: {
      invoiceCount: number;
      totalAmount: number;
      category: "premium" | "normal" | "one-time";
      quarters?: QuarterData;
    } | null;
  };
  totalInvoices: number;
  totalRevenue: number;
  yearsActive: number[];
  latestCategory: "premium" | "normal" | "one-time";
  q1Total: number;
  q2Total: number;
  h1Total: number; // First half (Q1 + Q2)
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
      q1Revenue: number;
      q2Revenue: number;
      q3Revenue: number;
      q4Revenue: number;
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

// Calculate quarterly revenue from monthly data
function calculateQuarterlyFromMonthly(monthlyData: { month: string; revenue: number }[]): QuarterData {
  const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const revenues = monthOrder.map(m => monthlyData.find(md => md.month === m)?.revenue || 0);
  
  return {
    q1: revenues[0] + revenues[1] + revenues[2],
    q2: revenues[3] + revenues[4] + revenues[5],
    q3: revenues[6] + revenues[7] + revenues[8],
    q4: revenues[9] + revenues[10] + revenues[11],
  };
}

let cachedData: AllYearsData | null = null;

export async function loadAllYearsClientData(): Promise<AllYearsData> {
  if (cachedData) return cachedData;

  const [data2022, data2023, data2024] = await Promise.all([
    Promise.resolve(loadMasterlistClientData2022()),
    loadMasterlistClientData2023(),
    loadMasterlistClientData2024(),
  ]);

  // Get monthly aggregates for quarterly calculations
  const aggregates2022 = loadMasterlistAggregates2022();
  const aggregates2023 = await loadMasterlistAggregates2023();
  const aggregates2024 = await loadMasterlistAggregates2024();
  const monthlyData2025 = getMonthlyData();

  // 2025 data from clientData.ts
  const all2025: ClientSummary[] = [...premiumClients, ...normalClients, ...oneTimeClients];

  // Calculate quarterly totals per year
  const yearQuarterly: { [year: number]: QuarterData } = {
    2022: calculateQuarterlyFromMonthly(aggregates2022.monthlyData),
    2023: calculateQuarterlyFromMonthly(aggregates2023.monthlyData),
    2024: calculateQuarterlyFromMonthly(aggregates2024.monthlyData),
    2025: calculateQuarterlyFromMonthly(monthlyData2025),
  };

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
          q1Total: 0,
          q2Total: 0,
          h1Total: 0,
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

  // Sort years active and calculate quarter proportions
  clientMap.forEach((client) => {
    client.yearsActive.sort((a, b) => a - b);
    
    // Estimate quarterly contribution based on year proportion 
    // (we distribute client revenue proportionally to year's quarterly revenue)
    for (const year of client.yearsActive) {
      const yearData = client.years[year];
      if (yearData && yearQuarterly[year]) {
        const yearTotal = yearQuarterly[year].q1 + yearQuarterly[year].q2 + yearQuarterly[year].q3 + yearQuarterly[year].q4;
        if (yearTotal > 0) {
          const q1Ratio = yearQuarterly[year].q1 / yearTotal;
          const q2Ratio = yearQuarterly[year].q2 / yearTotal;
          client.q1Total += yearData.totalAmount * q1Ratio;
          client.q2Total += yearData.totalAmount * q2Ratio;
        }
      }
    }
    client.h1Total = client.q1Total + client.q2Total;
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
      q1Revenue: yearQuarterly[2022].q1,
      q2Revenue: yearQuarterly[2022].q2,
      q3Revenue: yearQuarterly[2022].q3,
      q4Revenue: yearQuarterly[2022].q4,
    },
    2023: {
      revenue: data2023.stats.total.totalAmount,
      invoices: data2023.stats.total.totalInvoices,
      clients: data2023.stats.total.count,
      premiumRevenue: data2023.stats.premium.totalAmount,
      normalRevenue: data2023.stats.normal.totalAmount,
      oneTimeRevenue: data2023.stats.oneTime.totalAmount,
      q1Revenue: yearQuarterly[2023].q1,
      q2Revenue: yearQuarterly[2023].q2,
      q3Revenue: yearQuarterly[2023].q3,
      q4Revenue: yearQuarterly[2023].q4,
    },
    2024: {
      revenue: data2024.stats.total.totalAmount,
      invoices: data2024.stats.total.totalInvoices,
      clients: data2024.stats.total.count,
      premiumRevenue: data2024.stats.premium.totalAmount,
      normalRevenue: data2024.stats.normal.totalAmount,
      oneTimeRevenue: data2024.stats.oneTime.totalAmount,
      q1Revenue: yearQuarterly[2024].q1,
      q2Revenue: yearQuarterly[2024].q2,
      q3Revenue: yearQuarterly[2024].q3,
      q4Revenue: yearQuarterly[2024].q4,
    },
    2025: {
      revenue: all2025.reduce((sum, c) => sum + c.totalAmount, 0),
      invoices: all2025.reduce((sum, c) => sum + c.invoiceCount, 0),
      clients: all2025.length,
      premiumRevenue: premiumClients.reduce((sum, c) => sum + c.totalAmount, 0),
      normalRevenue: normalClients.reduce((sum, c) => sum + c.totalAmount, 0),
      oneTimeRevenue: oneTimeClients.reduce((sum, c) => sum + c.totalAmount, 0),
      q1Revenue: yearQuarterly[2025].q1,
      q2Revenue: yearQuarterly[2025].q2,
      q3Revenue: yearQuarterly[2025].q3,
      q4Revenue: yearQuarterly[2025].q4,
    },
  };

  cachedData = { clients, yearTotals };
  return cachedData;
}
