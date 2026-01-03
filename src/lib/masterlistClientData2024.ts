import type { ClientSummary } from "@/data/clientData";

type ClientCategory = "premium" | "normal" | "one-time";

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

// ========== HARDCODED 2024 DATA ==========
// Premium clients (4+ invoices) - sorted by revenue descending
const PREMIUM_CLIENTS_2024: ClientSummary[] = [
  { name: "IDP Education (Merged)", invoiceCount: 53, totalAmount: 360616, category: "premium", salesPersons: ["REENA"] },
  { name: "Stellar Advertising LLC", invoiceCount: 129, totalAmount: 284917, category: "premium", salesPersons: ["REENA"] },
  { name: "Navitas / Murdoch (Merged)", invoiceCount: 73, totalAmount: 230500, category: "premium", salesPersons: ["REENA"] },
  { name: "GrokGlobal Services", invoiceCount: 20, totalAmount: 75474, category: "premium", salesPersons: ["REENA"] },
  { name: "Continental Middle East DMCC", invoiceCount: 13, totalAmount: 71383, category: "premium", salesPersons: ["REENA"] },
  { name: "Dubai Academic Health (DAHC)", invoiceCount: 7, totalAmount: 66353, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Deakin University (Merged)", invoiceCount: 7, totalAmount: 60730, category: "premium", salesPersons: ["REENA"] },
  { name: "Gulftainer Company Limited", invoiceCount: 11, totalAmount: 58080, category: "premium", salesPersons: ["REENA"] },
  { name: "Hult Investments (Merged)", invoiceCount: 13, totalAmount: 57280, category: "premium", salesPersons: ["REENA"] },
  { name: "Trane BVBA (Merged)", invoiceCount: 52, totalAmount: 39926, category: "premium", salesPersons: ["REENA"] },
  { name: "Dunecrest American School", invoiceCount: 8, totalAmount: 37493, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Logic Utilities District Cooling", invoiceCount: 18, totalAmount: 35947, category: "premium", salesPersons: ["REENA"] },
  { name: "Tappy Toes Nursery DWC-LLC", invoiceCount: 7, totalAmount: 25039, category: "premium", salesPersons: ["REENA"] },
  { name: "Aurantius Real Estate Broker", invoiceCount: 21, totalAmount: 23411, category: "premium", salesPersons: ["REENA"] },
  { name: "Lloyds Energy DMCC", invoiceCount: 12, totalAmount: 18065, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Byyu Gift Trading LLC", invoiceCount: 7, totalAmount: 17276, category: "premium", salesPersons: ["REENA"] },
  { name: "ANB Automobiles L.L.C", invoiceCount: 7, totalAmount: 15749, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "M E A D Medical Supplies", invoiceCount: 8, totalAmount: 14199, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Narjis Printing and Publishing", invoiceCount: 6, totalAmount: 14067, category: "premium", salesPersons: ["REENA"] },
  { name: "Sea Centre Shipping Services", invoiceCount: 8, totalAmount: 13966, category: "premium", salesPersons: ["BNI"] },
  { name: "Locke Lifestyle Properties", invoiceCount: 10, totalAmount: 11611, category: "premium", salesPersons: ["REENA"] },
  { name: "Huxley Associates Global", invoiceCount: 8, totalAmount: 10553, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Bianca and Bianco Trading", invoiceCount: 9, totalAmount: 7445, category: "premium", salesPersons: ["REENA"] },
  { name: "J C S Artificial Flowers", invoiceCount: 6, totalAmount: 6859, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "BNI Polaris", invoiceCount: 14, totalAmount: 6594, category: "premium", salesPersons: ["BNI"] },
];

// Normal clients (2-3 invoices) - placeholder, will be filled if user provides data
const NORMAL_CLIENTS_2024: ClientSummary[] = [];

// One-time clients (1 invoice) - placeholder, will be filled if user provides data
const ONE_TIME_CLIENTS_2024: ClientSummary[] = [];

export async function loadMasterlistClientData2024(): Promise<MasterlistClientData2024> {
  const premiumClients = [...PREMIUM_CLIENTS_2024];
  const normalClients = [...NORMAL_CLIENTS_2024];
  const oneTimeClients = [...ONE_TIME_CLIENTS_2024];
  const allClients = [...premiumClients, ...normalClients, ...oneTimeClients];

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

  // Calculate sales person stats from client data
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
