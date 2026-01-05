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

export interface MasterlistClientData2023 {
  premiumClients: ClientSummary[];
  normalClients: ClientSummary[];
  oneTimeClients: ClientSummary[];
  allClients: ClientSummary[];
  stats: OverallStats;
  salesPersonStats: SalesPersonStat[];
}

// ========== HARDCODED 2023 DATA ==========
// Premium clients (6+ invoices or high-value designation)
const PREMIUM_CLIENTS_2023: ClientSummary[] = [
  { name: "IDP Education", invoiceCount: 57, totalAmount: 386558.84, category: "premium", salesPersons: ["REENA"] },
  { name: "Stellar Advertising LLC", invoiceCount: 171, totalAmount: 343716.95, category: "premium", salesPersons: ["REENA"] },
  { name: "NAVITAS / MURDOCH UNIVERSITY", invoiceCount: 35, totalAmount: 99646.00, category: "premium", salesPersons: ["REENA"] },
  { name: "DUNECREST AMERICAN SCHOOL", invoiceCount: 8, totalAmount: 70530.00, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Continental ME DMCC", invoiceCount: 8, totalAmount: 40955.00, category: "premium", salesPersons: ["REENA"] },
  { name: "GrokGlobal Services", invoiceCount: 14, totalAmount: 40782.72, category: "premium", salesPersons: ["REENA"] },
  { name: "Logic Utilities District Cooling", invoiceCount: 15, totalAmount: 35093.57, category: "premium", salesPersons: ["REENA"] },
  { name: "TRANE BVBA", invoiceCount: 44, totalAmount: 27243.60, category: "premium", salesPersons: ["REENA"] },
  { name: "Tappy Toes Nursery DWC-LLC", invoiceCount: 7, totalAmount: 22238.25, category: "premium", salesPersons: ["REENA"] },
  { name: "Aurantius Real Estate Broker", invoiceCount: 24, totalAmount: 21795.53, category: "premium", salesPersons: ["REENA"] },
  { name: "Unique World Business Centre", invoiceCount: 16, totalAmount: 19837.50, category: "premium", salesPersons: ["REENA"] },
  { name: "WAQAR HUMAN RESOURCES", invoiceCount: 7, totalAmount: 14311.75, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "AL RASHED UNITED DMCC", invoiceCount: 9, totalAmount: 6906.67, category: "premium", salesPersons: ["REENA"] },
  { name: "Momentum Logistics LLC", invoiceCount: 9, totalAmount: 5502.82, category: "premium", salesPersons: ["REENA"] },
  { name: "BNI Polaris", invoiceCount: 12, totalAmount: 4285.80, category: "premium", salesPersons: ["BNI"] },
];

// Normal clients (2-5 invoices)
const NORMAL_CLIENTS_2023: ClientSummary[] = [
  { name: "VL MEA Marketing Management", invoiceCount: 4, totalAmount: 55838.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Dubai Academic Health (DAHC)", invoiceCount: 3, totalAmount: 48000.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Sea Centre Shipping Services", invoiceCount: 5, totalAmount: 29390.00, category: "normal", salesPersons: ["BNI"] },
  { name: "VL MEA Marketing (HACH)", invoiceCount: 2, totalAmount: 12050.00, category: "normal", salesPersons: ["REENA"] },
  { name: "HULT INVESTMENTS", invoiceCount: 4, totalAmount: 11550.00, category: "normal", salesPersons: ["REENA"] },
  { name: "M E A D Medical Supplies", invoiceCount: 5, totalAmount: 9997.75, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Locke Lifestyle Properties", invoiceCount: 5, totalAmount: 9088.00, category: "normal", salesPersons: ["REENA"] },
  { name: "DEAKIN UNIVERSITY", invoiceCount: 2, totalAmount: 8970.00, category: "normal", salesPersons: ["REENA"] },
  { name: "AL YOUSUF MOTORS", invoiceCount: 1, totalAmount: 7896.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Yantee", invoiceCount: 3, totalAmount: 5235.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Huxley Associates Global", invoiceCount: 4, totalAmount: 4200.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Lloyds Energy DMCC", invoiceCount: 5, totalAmount: 4127.50, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Bianca and Bianco Trading", invoiceCount: 3, totalAmount: 3925.00, category: "normal", salesPersons: ["REENA"] },
  { name: "MIGHTHOUSE REALTY", invoiceCount: 3, totalAmount: 3825.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Applus Technical Services", invoiceCount: 2, totalAmount: 2750.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Symbiosis International", invoiceCount: 2, totalAmount: 1930.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Unique Pathfinders", invoiceCount: 2, totalAmount: 1225.00, category: "normal", salesPersons: ["BNI"] },
  { name: "VOXTEL COMMUNICATIONS", invoiceCount: 3, totalAmount: 1225.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Pacific Link", invoiceCount: 2, totalAmount: 1175.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Grandmatic", invoiceCount: 2, totalAmount: 885.00, category: "normal", salesPersons: ["REENA"] },
  { name: "ONESTEP GLOBAL INGRESS", invoiceCount: 2, totalAmount: 350.00, category: "normal", salesPersons: ["REENA"] },
];

// One-time clients (1 invoice)
const ONE_TIME_CLIENTS_2023: ClientSummary[] = [
  { name: "Mohammed Bin Rashid University", invoiceCount: 1, totalAmount: 20700.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "AL WASEEF INDUSTRIES", invoiceCount: 1, totalAmount: 7896.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "J C S ARTIFICIAL FLOWERS", invoiceCount: 1, totalAmount: 6305.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Gulftainer Company", invoiceCount: 1, totalAmount: 3550.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Beekeepers Foundation", invoiceCount: 1, totalAmount: 3150.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Blackswan business center", invoiceCount: 1, totalAmount: 2750.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "AL TABREED INDUSTRIES", invoiceCount: 1, totalAmount: 2250.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Four Corners Printing Press", invoiceCount: 1, totalAmount: 1575.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "ALFATONIC GENERAL TRADING", invoiceCount: 1, totalAmount: 1150.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "ALI ASGER & BROTHERS", invoiceCount: 1, totalAmount: 1142.86, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "AL SHEMAIL GAR. & PERFUMES", invoiceCount: 1, totalAmount: 290.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Al Nahi Logistics LLC", invoiceCount: 1, totalAmount: 325.00, category: "one-time", salesPersons: ["MARINELLE"] },
];

// Calculate stats
function calculateStats(): OverallStats {
  const premiumCount = PREMIUM_CLIENTS_2023.length;
  const normalCount = NORMAL_CLIENTS_2023.length;
  const oneTimeCount = ONE_TIME_CLIENTS_2023.length;

  const premiumInvoices = PREMIUM_CLIENTS_2023.reduce((sum, c) => sum + c.invoiceCount, 0);
  const normalInvoices = NORMAL_CLIENTS_2023.reduce((sum, c) => sum + c.invoiceCount, 0);
  const oneTimeInvoices = ONE_TIME_CLIENTS_2023.reduce((sum, c) => sum + c.invoiceCount, 0);

  const premiumAmount = PREMIUM_CLIENTS_2023.reduce((sum, c) => sum + c.totalAmount, 0);
  const normalAmount = NORMAL_CLIENTS_2023.reduce((sum, c) => sum + c.totalAmount, 0);
  const oneTimeAmount = ONE_TIME_CLIENTS_2023.reduce((sum, c) => sum + c.totalAmount, 0);

  return {
    premium: { count: premiumCount, totalInvoices: premiumInvoices, totalAmount: premiumAmount },
    normal: { count: normalCount, totalInvoices: normalInvoices, totalAmount: normalAmount },
    oneTime: { count: oneTimeCount, totalInvoices: oneTimeInvoices, totalAmount: oneTimeAmount },
    total: {
      count: premiumCount + normalCount + oneTimeCount,
      totalInvoices: premiumInvoices + normalInvoices + oneTimeInvoices,
      totalAmount: premiumAmount + normalAmount + oneTimeAmount,
    },
  };
}

// Calculate sales person stats
function calculateSalesPersonStats(): SalesPersonStat[] {
  const salesMap = new Map<string, { invoices: number; amount: number }>();

  const allClients = [...PREMIUM_CLIENTS_2023, ...NORMAL_CLIENTS_2023, ...ONE_TIME_CLIENTS_2023];

  allClients.forEach((client) => {
    client.salesPersons?.forEach((sp) => {
      const current = salesMap.get(sp) || { invoices: 0, amount: 0 };
      salesMap.set(sp, {
        invoices: current.invoices + client.invoiceCount,
        amount: current.amount + client.totalAmount,
      });
    });
  });

  return Array.from(salesMap.entries())
    .map(([name, data]) => ({
      name,
      invoiceCount: data.invoices,
      totalAmount: data.amount,
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount);
}

let cachedData: MasterlistClientData2023 | null = null;

export async function loadMasterlistClientData2023(): Promise<MasterlistClientData2023> {
  if (cachedData) return cachedData;

  const allClients = [
    ...PREMIUM_CLIENTS_2023,
    ...NORMAL_CLIENTS_2023,
    ...ONE_TIME_CLIENTS_2023,
  ].sort((a, b) => b.totalAmount - a.totalAmount);

  cachedData = {
    premiumClients: PREMIUM_CLIENTS_2023,
    normalClients: NORMAL_CLIENTS_2023,
    oneTimeClients: ONE_TIME_CLIENTS_2023,
    allClients,
    stats: calculateStats(),
    salesPersonStats: calculateSalesPersonStats(),
  };

  return cachedData;
}
