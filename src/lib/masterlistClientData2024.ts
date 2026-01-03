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

// Normal clients (2-5 invoices) - consistent buyers
const NORMAL_CLIENTS_2024: ClientSummary[] = [
  { name: "Al Jalila Foundation", invoiceCount: 4, totalAmount: 50032, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "MSB Private School", invoiceCount: 2, totalAmount: 47922, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "DHR MENA FZ-LLC", invoiceCount: 3, totalAmount: 30680, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Ducon Industries FZCO", invoiceCount: 3, totalAmount: 27126, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "PLUS971 CYBER SECURITY", invoiceCount: 3, totalAmount: 24100, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Azalee Flower Boutique", invoiceCount: 2, totalAmount: 19925, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "CACOGES", invoiceCount: 3, totalAmount: 18572, category: "normal", salesPersons: ["REENA"] },
  { name: "Al Tayer Insignia LLC", invoiceCount: 2, totalAmount: 18165, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "BorgRollsWarner Middle East", invoiceCount: 3, totalAmount: 18112, category: "normal", salesPersons: ["REENA"] },
  { name: "Radiometer Medical ApS", invoiceCount: 3, totalAmount: 15002, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Regent Institute Middle East", invoiceCount: 4, totalAmount: 14824, category: "normal", salesPersons: ["REENA"] },
  { name: "Gulftainer (Iraq Branch)", invoiceCount: 5, totalAmount: 14061, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Krishna International FZCO", invoiceCount: 2, totalAmount: 13570, category: "normal", salesPersons: ["REENA"] },
  { name: "Sea Centre Shipping", invoiceCount: 5, totalAmount: 12457, category: "normal", salesPersons: ["BNI"] },
  { name: "CHINT MIDDLE EAST", invoiceCount: 2, totalAmount: 11982, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "TETR, College of Business", invoiceCount: 3, totalAmount: 11490, category: "normal", salesPersons: ["REENA"] },
  { name: "MAERSK LOGISTICS", invoiceCount: 3, totalAmount: 9605, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "PMMUE Eduservices", invoiceCount: 3, totalAmount: 9487, category: "normal", salesPersons: ["REENA"] },
  { name: "GRAND STAR ALUMINUM", invoiceCount: 3, totalAmount: 9035, category: "normal", salesPersons: ["REENA"] },
  { name: "MAV Access LLC", invoiceCount: 4, totalAmount: 8582, category: "normal", salesPersons: ["SABARISH"] },
  { name: "JUBAILI BROS S.A.L.", invoiceCount: 2, totalAmount: 7587, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Tristar Transport LLC", invoiceCount: 2, totalAmount: 7140, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "AL RASHED UNITED DMCC", invoiceCount: 3, totalAmount: 6670, category: "normal", salesPersons: ["REENA"] },
  { name: "Pacific Link", invoiceCount: 2, totalAmount: 6625, category: "normal", salesPersons: ["REENA"] },
  { name: "Applus Technical Services", invoiceCount: 5, totalAmount: 6460, category: "normal", salesPersons: ["REENA"] },
  { name: "BECKMAN COULTER", invoiceCount: 2, totalAmount: 6058, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "A-Technologies FZCO", invoiceCount: 2, totalAmount: 6050, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "VISIONARY FURNITURE", invoiceCount: 4, totalAmount: 5975, category: "normal", salesPersons: ["REENA"] },
  { name: "E V OFFSHORE LIMITED", invoiceCount: 4, totalAmount: 5814, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "PHARMAPAL DRUG STORE", invoiceCount: 2, totalAmount: 5781, category: "normal", salesPersons: ["GLEN"] },
  { name: "Logic Utilities (DC)", invoiceCount: 2, totalAmount: 4952, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Eternal Home Building", invoiceCount: 2, totalAmount: 4595, category: "normal", salesPersons: ["REENA"] },
  { name: "Al Naser International FZE", invoiceCount: 5, totalAmount: 4572, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Ingersoll-Rand Technical", invoiceCount: 9, totalAmount: 4476, category: "normal", salesPersons: ["REENA"] },
  { name: "Ecotag", invoiceCount: 2, totalAmount: 4273, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "AUSTRAL INTERNATIONAL", invoiceCount: 4, totalAmount: 4182, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Momentum Logistics LLC", invoiceCount: 4, totalAmount: 3950, category: "normal", salesPersons: ["REENA"] },
  { name: "VL MEA Marketing", invoiceCount: 2, totalAmount: 3907, category: "normal", salesPersons: ["REENA"] },
  { name: "Waterline Freight Solutions", invoiceCount: 3, totalAmount: 3562, category: "normal", salesPersons: ["REENA"] },
  { name: "Aram Precious Metals", invoiceCount: 4, totalAmount: 3485, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Shory Technology L.L.C", invoiceCount: 4, totalAmount: 3299, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "MIRA REAL ESTATE", invoiceCount: 2, totalAmount: 3150, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "IBM Global Middle East", invoiceCount: 3, totalAmount: 3033, category: "normal", salesPersons: ["REENA"] },
  { name: "August Real Estate", invoiceCount: 2, totalAmount: 2412, category: "normal", salesPersons: ["REENA"] },
  { name: "Global Connect", invoiceCount: 4, totalAmount: 2275, category: "normal", salesPersons: ["REENA"] },
  { name: "Crescent Real Estate", invoiceCount: 2, totalAmount: 2208, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Orthopro Clinic", invoiceCount: 3, totalAmount: 2100, category: "normal", salesPersons: ["REENA"] },
  { name: "EMIRATES FOR UNIVERSAL TYRES", invoiceCount: 4, totalAmount: 1765, category: "normal", salesPersons: ["REENA"] },
  { name: "Axis Workshop", invoiceCount: 3, totalAmount: 1755, category: "normal", salesPersons: ["REENA"] },
  { name: "The Woolwich Institute", invoiceCount: 4, totalAmount: 1577, category: "normal", salesPersons: ["REENA"] },
  { name: "Symbiosis International", invoiceCount: 2, totalAmount: 1510, category: "normal", salesPersons: ["REENA"] },
  { name: "INDO TAUSCH TRADING", invoiceCount: 7, totalAmount: 1485, category: "normal", salesPersons: ["REENA"] },
  { name: "Mr Sanup", invoiceCount: 2, totalAmount: 1485, category: "normal", salesPersons: ["REENA"] },
  { name: "SPH Global Holdings", invoiceCount: 2, totalAmount: 1460, category: "normal", salesPersons: ["REENA"] },
  { name: "KOTUG MIDDLE EAST", invoiceCount: 2, totalAmount: 1417, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Career Tree", invoiceCount: 3, totalAmount: 1278, category: "normal", salesPersons: ["BNI"] },
  { name: "Enara Properties", invoiceCount: 3, totalAmount: 1105, category: "normal", salesPersons: ["REENA"] },
  { name: "One Blue Clover FZCO", invoiceCount: 2, totalAmount: 1075, category: "normal", salesPersons: ["BNI"] },
  { name: "RIF TRUST INVESTMENTS", invoiceCount: 2, totalAmount: 1055, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Lane Community College", invoiceCount: 2, totalAmount: 1015, category: "normal", salesPersons: ["REENA"] },
  { name: "Kaizen Business Consultants", invoiceCount: 2, totalAmount: 972, category: "normal", salesPersons: ["BNI"] },
  { name: "The Luxury Real Estate", invoiceCount: 2, totalAmount: 951, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Gardner Denver FZE", invoiceCount: 2, totalAmount: 705, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "SPECIALISED SPORTS", invoiceCount: 2, totalAmount: 625, category: "normal", salesPersons: ["REENA"] },
  { name: "Aurantius Real Estate", invoiceCount: 2, totalAmount: 450, category: "normal", salesPersons: ["REENA"] },
  { name: "Aplus Global FZE LLC", invoiceCount: 2, totalAmount: 397, category: "normal", salesPersons: ["REENA"] },
  { name: "LAYAN TRADING FZE", invoiceCount: 2, totalAmount: 285, category: "normal", salesPersons: ["MARINELLE"] },
];

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
