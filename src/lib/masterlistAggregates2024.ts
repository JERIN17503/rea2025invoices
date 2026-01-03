import type { MonthlyData } from "@/data/clientData";

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

// Premium clients monthly revenue breakdown (from user spreadsheet)
const PREMIUM_CLIENTS_MONTHLY = [
  { name: "IDP Education", monthly: [5041, 165011, 585, 4197, 16716, 160, 6260, 20926, 103030, 11308, 15176, 12032], total: 360616 },
  { name: "Stellar Advertising", monthly: [9650, 16016, 18431, 9871, 20166, 76628, 17208, 80215, 21644, 9762, 5328, 0], total: 284917 },
  { name: "Navitas / Murdoch", monthly: [10803, 0, 12395, 4669, 18700, 35008, 3617, 23476, 63751, 6427, 41883, 9772], total: 230501 },
  { name: "GrokGlobal Services", monthly: [4475, 0, 22178, 310, 975, 6445, 275, 15915, 11795, 12557, 550, 0], total: 75474 },
  { name: "Continental Middle East", monthly: [0, 3835, 0, 0, 1266, 3086, 6209, 27440, 18375, 11172, 0, 0], total: 71383 },
  { name: "Dubai Academic Health", monthly: [0, 0, 6920, 0, 12375, 24338, 0, 0, 0, 0, 22720, 0], total: 66354 },
  { name: "Gulftainer Company", monthly: [10000, 0, 0, 0, 0, 0, 0, 0, 8452, 4435, 14292, 13400], total: 58080 },
  { name: "Trane BVBA", monthly: [6380, 3000, 3370, 1250, 4864, 1731, 5129, 549, 2940, 1335, 7770, 1608], total: 39926 },
  { name: "Dunecrest School", monthly: [19194, 0, 0, 0, 3831, 359, 14110, 0, 0, 0, 0, 0], total: 37494 },
  { name: "Tappy Toes Nursery", monthly: [0, 989, 0, 0, 7425, 0, 0, 1080, 3665, 2475, 0, 9405], total: 25039 },
  { name: "Aurantius Real Estate", monthly: [554, 2410, 792, 0, 869, 2138, 1000, 1778, 0, 2482, 4065, 7322], total: 23411 },
  { name: "Lloyds Energy DMCC", monthly: [1250, 0, 9475, 1100, 0, 870, 3110, 0, 435, 365, 0, 1460], total: 18065 },
  { name: "Byyu Gift Trading", monthly: [0, 0, 4225, 0, 350, 5935, 485, 5910, 0, 371, 0, 0], total: 17276 },
  { name: "ANB Automobiles", monthly: [0, 1580, 1130, 0, 0, 390, 0, 2055, 0, 0, 1995, 8600], total: 15750 },
  { name: "M E A D Medical", monthly: [475, 1348, 0, 0, 1060, 10070, 0, 730, 0, 517, 0, 0], total: 14200 },
  { name: "Narjis Printing", monthly: [0, 0, 0, 380, 0, 460, 0, 11658, 0, 0, 0, 1570], total: 14067 },
  { name: "Locke Lifestyle", monthly: [0, 0, 0, 0, 0, 0, 1450, 3045, 4184, 1054, 1877, 0], total: 11611 },
  { name: "Huxley Associates", monthly: [1125, 225, 0, 375, 4355, 1234, 0, 0, 240, 0, 0, 3000], total: 10554 },
  { name: "Bianca and Bianco", monthly: [825, 310, 0, 825, 0, 0, 3210, 0, 650, 1625, 0, 0], total: 7445 },
  { name: "J C S Artificial Flowers", monthly: [0, 779, 0, 0, 770, 0, 2435, 0, 2875, 0, 0, 0], total: 6859 },
  { name: "BNI Polaris", monthly: [0, 0, 0, 0, 0, 714, 1412, 0, 0, 125, 3569, 775], total: 6595 },
  { name: "Ingersoll-Rand", monthly: [310, 0, 0, 0, 1010, 285, 0, 0, 2116, 520, 235, 0], total: 4476 },
  { name: "Mighthouse Realty", monthly: [0, 0, 0, 0, 2195, 893, 700, 0, 0, 0, 400, 0], total: 4188 },
  { name: "Unique World", monthly: [375, 195, 150, 270, 270, 90, 110, 315, 210, 360, 420, 270], total: 3035 },
  { name: "Indo Tausch Trading", monthly: [0, 420, 185, 0, 420, 0, 125, 210, 0, 125, 0, 0], total: 1485 },
];

// Generate topClients for each month (all premium clients with revenue > 0)
function getTopClientsForMonth(monthIndex: number) {
  return PREMIUM_CLIENTS_MONTHLY
    .filter(c => c.monthly[monthIndex] > 0)
    .map(c => ({
      name: c.name,
      revenue: c.monthly[monthIndex],
      invoices: Math.max(1, Math.round(c.monthly[monthIndex] / 2500)), // estimate
      category: "premium" as const,
    }))
    .sort((a, b) => b.revenue - a.revenue);
}

// ========== EXACT 2024 MONTHLY DATA (from user-provided spreadsheets) ==========
const MONTHLY_DATA_2024: MonthlyData[] = [
  {
    month: "January",
    monthNum: 1,
    revenue: 161513,
    invoices: 75,
    clients: 45,
    premiumRevenue: 70457,
    normalRevenue: 74964,
    oneTimeRevenue: 16092,
    premiumInvoices: 37,
    normalInvoices: 27,
    oneTimeInvoices: 11,
    premiumClients: 15,
    normalClients: 18,
    oneTimeClients: 11,
    avgInvoiceValue: 161513 / 75,
    topClients: getTopClientsForMonth(0),
  },
  {
    month: "February",
    monthNum: 2,
    revenue: 267652,
    invoices: 61,
    clients: 42,
    premiumRevenue: 196117,
    normalRevenue: 45770,
    oneTimeRevenue: 25765,
    premiumInvoices: 34,
    normalInvoices: 19,
    oneTimeInvoices: 8,
    premiumClients: 14,
    normalClients: 12,
    oneTimeClients: 8,
    avgInvoiceValue: 267652 / 61,
    topClients: getTopClientsForMonth(1),
  },
  {
    month: "March",
    monthNum: 3,
    revenue: 124056,
    invoices: 60,
    clients: 38,
    premiumRevenue: 79836,
    normalRevenue: 27699,
    oneTimeRevenue: 16521,
    premiumInvoices: 42,
    normalInvoices: 10,
    oneTimeInvoices: 8,
    premiumClients: 16,
    normalClients: 8,
    oneTimeClients: 8,
    avgInvoiceValue: 124056 / 60,
    topClients: getTopClientsForMonth(2),
  },
  {
    month: "April",
    monthNum: 4,
    revenue: 94044,
    invoices: 43,
    clients: 30,
    premiumRevenue: 23247,
    normalRevenue: 66232,
    oneTimeRevenue: 4565,
    premiumInvoices: 26,
    normalInvoices: 12,
    oneTimeInvoices: 5,
    premiumClients: 12,
    normalClients: 10,
    oneTimeClients: 5,
    avgInvoiceValue: 94044 / 43,
    topClients: getTopClientsForMonth(3),
  },
  {
    month: "May",
    monthNum: 5,
    revenue: 132558,
    invoices: 91,
    clients: 50,
    premiumRevenue: 97616,
    normalRevenue: 29931,
    oneTimeRevenue: 5010,
    premiumInvoices: 68,
    normalInvoices: 18,
    oneTimeInvoices: 5,
    premiumClients: 20,
    normalClients: 14,
    oneTimeClients: 5,
    avgInvoiceValue: 132558 / 91,
    topClients: getTopClientsForMonth(4),
  },
  {
    month: "June",
    monthNum: 6,
    revenue: 278942,
    invoices: 65,
    clients: 42,
    premiumRevenue: 170832,
    normalRevenue: 68096,
    oneTimeRevenue: 40012,
    premiumInvoices: 49,
    normalInvoices: 12,
    oneTimeInvoices: 4,
    premiumClients: 18,
    normalClients: 10,
    oneTimeClients: 4,
    avgInvoiceValue: 278942 / 65,
    topClients: getTopClientsForMonth(5),
  },
  {
    month: "July",
    monthNum: 7,
    revenue: 115258,
    invoices: 65,
    clients: 40,
    premiumRevenue: 66844,
    normalRevenue: 37594,
    oneTimeRevenue: 10819,
    premiumInvoices: 44,
    normalInvoices: 12,
    oneTimeInvoices: 9,
    premiumClients: 16,
    normalClients: 10,
    oneTimeClients: 9,
    avgInvoiceValue: 115258 / 65,
    topClients: getTopClientsForMonth(6),
  },
  {
    month: "August",
    monthNum: 8,
    revenue: 256551,
    invoices: 74,
    clients: 48,
    premiumRevenue: 195301,
    normalRevenue: 45381,
    oneTimeRevenue: 15868,
    premiumInvoices: 50,
    normalInvoices: 15,
    oneTimeInvoices: 9,
    premiumClients: 18,
    normalClients: 12,
    oneTimeClients: 9,
    avgInvoiceValue: 256551 / 74,
    topClients: getTopClientsForMonth(7),
  },
  {
    month: "September",
    monthNum: 9,
    revenue: 305716,
    invoices: 81,
    clients: 52,
    premiumRevenue: 244362,
    normalRevenue: 39624,
    oneTimeRevenue: 21730,
    premiumInvoices: 53,
    normalInvoices: 17,
    oneTimeInvoices: 11,
    premiumClients: 20,
    normalClients: 14,
    oneTimeClients: 11,
    avgInvoiceValue: 305716 / 81,
    topClients: getTopClientsForMonth(8),
  },
  {
    month: "October",
    monthNum: 10,
    revenue: 144394,
    invoices: 81,
    clients: 50,
    premiumRevenue: 67015,
    normalRevenue: 59948,
    oneTimeRevenue: 17431,
    premiumInvoices: 50,
    normalInvoices: 17,
    oneTimeInvoices: 14,
    premiumClients: 18,
    normalClients: 14,
    oneTimeClients: 14,
    avgInvoiceValue: 144394 / 81,
    topClients: getTopClientsForMonth(9),
  },
  {
    month: "November",
    monthNum: 11,
    revenue: 188944,
    invoices: 71,
    clients: 46,
    premiumRevenue: 120280,
    normalRevenue: 58980,
    oneTimeRevenue: 9683,
    premiumInvoices: 43,
    normalInvoices: 19,
    oneTimeInvoices: 9,
    premiumClients: 16,
    normalClients: 14,
    oneTimeClients: 9,
    avgInvoiceValue: 188944 / 71,
    topClients: getTopClientsForMonth(10),
  },
  {
    month: "December",
    monthNum: 12,
    revenue: 143383,
    invoices: 52,
    clients: 38,
    premiumRevenue: 69214,
    normalRevenue: 59106,
    oneTimeRevenue: 15062,
    premiumInvoices: 29,
    normalInvoices: 15,
    oneTimeInvoices: 8,
    premiumClients: 12,
    normalClients: 12,
    oneTimeClients: 8,
    avgInvoiceValue: 143383 / 52,
    topClients: getTopClientsForMonth(11),
  },
];

// Calculate totals from monthly data
const TOTAL_REVENUE_2024 = MONTHLY_DATA_2024.reduce((s, m) => s + m.revenue, 0);
const TOTAL_INVOICES_2024 = MONTHLY_DATA_2024.reduce((s, m) => s + m.invoices, 0);
const PREMIUM_TOTAL = MONTHLY_DATA_2024.reduce((s, m) => s + m.premiumRevenue, 0);
const NORMAL_TOTAL = MONTHLY_DATA_2024.reduce((s, m) => s + m.normalRevenue, 0);
const ONE_TIME_TOTAL = MONTHLY_DATA_2024.reduce((s, m) => s + m.oneTimeRevenue, 0);

// 25 premium + 67 normal + 101 one-time = 193 clients
const TOTAL_CLIENTS_2024 = 193;

// Export premium clients monthly data for use in other components
export const PREMIUM_CLIENTS_MONTHLY_2024 = PREMIUM_CLIENTS_MONTHLY;

export async function loadMasterlistAggregates2024(): Promise<MasterlistAggregates2024> {
  return {
    monthlyData: MONTHLY_DATA_2024,
    totals: {
      totalRevenue: TOTAL_REVENUE_2024,
      totalInvoices: TOTAL_INVOICES_2024,
      totalClients: TOTAL_CLIENTS_2024,
      avgInvoiceValue: TOTAL_REVENUE_2024 / TOTAL_INVOICES_2024,
      premiumTotal: PREMIUM_TOTAL,
      normalTotal: NORMAL_TOTAL,
      oneTimeTotal: ONE_TIME_TOTAL,
    },
  };
}
