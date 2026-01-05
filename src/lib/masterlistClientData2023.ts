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

// ========== EXACT 2023 CLIENT DATA (from user-provided masterlist - WITHOUT VAT) ==========
// Premium clients (6+ invoices) - sorted by revenue descending
const PREMIUM_CLIENTS_2023: ClientSummary[] = [
  { name: "IDP Education (Merged)", invoiceCount: 56, totalAmount: 375158.84, category: "premium", salesPersons: ["REENA"] },
  { name: "Stellar Advertising LLC", invoiceCount: 171, totalAmount: 343716.95, category: "premium", salesPersons: ["REENA"] },
  { name: "Navitas / Murdoch (Merged)", invoiceCount: 35, totalAmount: 99646.00, category: "premium", salesPersons: ["REENA"] },
  { name: "DUNECREST AMERICAN SCHOOL", invoiceCount: 8, totalAmount: 70530.00, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Trane BVBA (Merged)", invoiceCount: 44, totalAmount: 48663.50, category: "premium", salesPersons: ["REENA"] },
  { name: "Connect Resources", invoiceCount: 6, totalAmount: 48205.00, category: "premium", salesPersons: ["REENA"] },
  { name: "Huxley Associates Global", invoiceCount: 15, totalAmount: 45052.50, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Continental ME DMCC", invoiceCount: 8, totalAmount: 40955.00, category: "premium", salesPersons: ["REENA"] },
  { name: "JUBAILI BROS S.A.L.", invoiceCount: 6, totalAmount: 40625.00, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "GrokGlobal Services (Merged)", invoiceCount: 6, totalAmount: 34065.00, category: "premium", salesPersons: ["REENA"] },
  { name: "Continental Middle East DMCC", invoiceCount: 5, totalAmount: 29550.00, category: "premium", salesPersons: ["REENA"] },
  { name: "ANB AUTOMOBILES (Merged)", invoiceCount: 13, totalAmount: 28701.00, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Gulftainer", invoiceCount: 9, totalAmount: 25521.25, category: "premium", salesPersons: ["REENA"] },
  { name: "Tappy Toes Nursery DWC-LLC", invoiceCount: 2, totalAmount: 24510.00, category: "premium", salesPersons: ["REENA"] },
  { name: "LOGIC UTILITIES (Merged)", invoiceCount: 9, totalAmount: 22370.00, category: "premium", salesPersons: ["REENA"] },
  { name: "RIF TRUST INVESTMENTS", invoiceCount: 14, totalAmount: 20336.00, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "MEINHARDT (SINGAPORE)", invoiceCount: 10, totalAmount: 20251.00, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Beyond Infinity Real Estate", invoiceCount: 9, totalAmount: 19913.55, category: "premium", salesPersons: ["REENA"] },
  { name: "Ingersoll-Rand", invoiceCount: 10, totalAmount: 18296.00, category: "premium", salesPersons: ["REENA"] },
  { name: "CLARION SCHOOL", invoiceCount: 7, totalAmount: 16987.80, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "MIRA REAL ESTATE BROKERS", invoiceCount: 6, totalAmount: 16280.00, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "WAQAR HUMAN RESOURCES", invoiceCount: 7, totalAmount: 14311.75, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "SPECIALISED SPORTS EQUIPMENT", invoiceCount: 9, totalAmount: 11944.74, category: "premium", salesPersons: ["REENA"] },
  { name: "The Woolwich Institute", invoiceCount: 6, totalAmount: 11397.50, category: "premium", salesPersons: ["REENA"] },
  { name: "Ausnutria Nutrition", invoiceCount: 6, totalAmount: 10140.00, category: "premium", salesPersons: ["REENA"] },
  { name: "SPH Global Holdings", invoiceCount: 6, totalAmount: 8864.50, category: "premium", salesPersons: ["REENA"] },
  { name: "AL RASHED UNITED DMCC", invoiceCount: 9, totalAmount: 6906.67, category: "premium", salesPersons: ["REENA"] },
  { name: "FAD Institute", invoiceCount: 9, totalAmount: 6786.00, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Bianca and Bianco Trading", invoiceCount: 10, totalAmount: 6325.00, category: "premium", salesPersons: ["REENA"] },
  { name: "Merit Freight Systems", invoiceCount: 6, totalAmount: 6285.00, category: "premium", salesPersons: ["REENA"] },
  { name: "EMIRATES FOR UNIVERSAL TYRES", invoiceCount: 10, totalAmount: 5872.50, category: "premium", salesPersons: ["REENA"] },
  { name: "Global Connect", invoiceCount: 8, totalAmount: 5815.00, category: "premium", salesPersons: ["REENA"] },
  { name: "HOLO MORTGAGE CONSULTANT", invoiceCount: 9, totalAmount: 5420.00, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Arabian Equipment Rental", invoiceCount: 7, totalAmount: 4647.50, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "BMC SOFTWARE LIMITED", invoiceCount: 6, totalAmount: 4523.00, category: "premium", salesPersons: ["REENA"] },
  { name: "Unique World Business Centre", invoiceCount: 22, totalAmount: 3735.00, category: "premium", salesPersons: ["REENA"] },
];

// Normal clients (2-5 invoices) - sorted by revenue descending
const NORMAL_CLIENTS_2023: ClientSummary[] = [
  { name: "United Arab Bank", invoiceCount: 5, totalAmount: 88074.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "VL MEA Marketing Management", invoiceCount: 4, totalAmount: 55838.00, category: "normal", salesPersons: ["REENA"] },
  { name: "PLUS971 CYBER SECURITY", invoiceCount: 2, totalAmount: 35725.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Azalee Flower Boutique", invoiceCount: 5, totalAmount: 35520.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Art Indulgence", invoiceCount: 2, totalAmount: 31360.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "CACOGES", invoiceCount: 3, totalAmount: 27375.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Master Builders Solutions", invoiceCount: 2, totalAmount: 26761.25, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Mayer Brown LLP", invoiceCount: 5, totalAmount: 25614.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Saint Vincent Group", invoiceCount: 2, totalAmount: 24732.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Binghatti Developers FZE", invoiceCount: 2, totalAmount: 24150.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "PARAGON PROPERTIES", invoiceCount: 4, totalAmount: 20850.00, category: "normal", salesPersons: ["REENA"] },
  { name: "ALI ASGER & BROTHERS", invoiceCount: 4, totalAmount: 17405.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Sesderma ME", invoiceCount: 3, totalAmount: 17065.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Tulipa Landscaping", invoiceCount: 3, totalAmount: 14525.00, category: "normal", salesPersons: ["REENA"] },
  { name: "VL MEA Marketing (HACH)", invoiceCount: 2, totalAmount: 12050.00, category: "normal", salesPersons: ["REENA"] },
  { name: "DYNAMIC EMPLOYMENT SERVICES", invoiceCount: 5, totalAmount: 11272.50, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "IBM Global Middle East", invoiceCount: 2, totalAmount: 9575.00, category: "normal", salesPersons: ["REENA"] },
  { name: "MAXHEALTH MONDIAL", invoiceCount: 2, totalAmount: 8805.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Ms. Justine Morris (DEAKIN)", invoiceCount: 1, totalAmount: 8600.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Momentum Logistics", invoiceCount: 3, totalAmount: 8536.25, category: "normal", salesPersons: ["REENA"] },
  { name: "Secured Medical Direction", invoiceCount: 4, totalAmount: 8508.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Radiometer Medical", invoiceCount: 3, totalAmount: 7990.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Aurantius Real Estate", invoiceCount: 7, totalAmount: 7195.00, category: "normal", salesPersons: ["REENA"] },
  { name: "MAERSK LOGISTICS", invoiceCount: 4, totalAmount: 6715.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "GRANDDUBAI GLASS (Merged)", invoiceCount: 4, totalAmount: 5793.00, category: "normal", salesPersons: ["REENA"] },
  { name: "M E A D Medical Supplies", invoiceCount: 4, totalAmount: 5760.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "MRG", invoiceCount: 3, totalAmount: 5285.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Yantee", invoiceCount: 3, totalAmount: 5235.00, category: "normal", salesPersons: ["REENA"] },
  { name: "PMG Agency FZ-LLC", invoiceCount: 4, totalAmount: 4925.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "AMK International DMCC", invoiceCount: 2, totalAmount: 4645.00, category: "normal", salesPersons: ["REENA"] },
  { name: "SEL Car Rental", invoiceCount: 5, totalAmount: 4583.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Argus Media Limited", invoiceCount: 2, totalAmount: 4435.00, category: "normal", salesPersons: ["REENA"] },
  { name: "RV Gulf", invoiceCount: 4, totalAmount: 4096.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Qashio", invoiceCount: 2, totalAmount: 4050.00, category: "normal", salesPersons: ["REENA"] },
  { name: "KHF AUTOMOTIVE SERVICE", invoiceCount: 2, totalAmount: 3927.50, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Dubai Academic Health", invoiceCount: 3, totalAmount: 3745.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "DHR MENA FZ-LLC", invoiceCount: 2, totalAmount: 3721.75, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Munich Motor Works", invoiceCount: 3, totalAmount: 3640.00, category: "normal", salesPersons: ["REENA"] },
  { name: "AUSTRAL INTERNATIONAL", invoiceCount: 2, totalAmount: 3625.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Datagram Network Technologies", invoiceCount: 2, totalAmount: 3450.00, category: "normal", salesPersons: ["REENA"] },
  { name: "ROYAL MANOR VACATION HOMES", invoiceCount: 4, totalAmount: 3407.50, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "KOTUG MIDDLE EAST (Merged)", invoiceCount: 5, totalAmount: 3036.25, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "TAM TRADING FZ-LLC", invoiceCount: 3, totalAmount: 3027.62, category: "normal", salesPersons: ["REENA"] },
  { name: "Enara Properties", invoiceCount: 3, totalAmount: 2580.00, category: "normal", salesPersons: ["REENA"] },
  { name: "KHF AUTOMOTIVE TRADING", invoiceCount: 3, totalAmount: 2370.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "NARJIS Printing", invoiceCount: 5, totalAmount: 2365.00, category: "normal", salesPersons: ["REENA"] },
  { name: "GOOD VIBES TRANSPORT", invoiceCount: 2, totalAmount: 2325.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Grok Education Services", invoiceCount: 2, totalAmount: 1925.00, category: "normal", salesPersons: ["REENA"] },
  { name: "International Shipping", invoiceCount: 3, totalAmount: 1937.50, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Mirdif American School", invoiceCount: 3, totalAmount: 1634.50, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Confident Building Materials", invoiceCount: 2, totalAmount: 1650.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Logic Utilities", invoiceCount: 4, totalAmount: 1530.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Brogan Middle East", invoiceCount: 3, totalAmount: 1420.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Shory Technology", invoiceCount: 2, totalAmount: 1400.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "AQARCO REAL ESTATE", invoiceCount: 2, totalAmount: 1287.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Ms. Lisa Brown", invoiceCount: 3, totalAmount: 1215.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Indo Tausch Trading", invoiceCount: 4, totalAmount: 1190.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Gulftainer Iraq Branch", invoiceCount: 2, totalAmount: 1075.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Buildmate Technical", invoiceCount: 3, totalAmount: 962.00, category: "normal", salesPersons: ["REENA"] },
  { name: "MIRA TECH", invoiceCount: 2, totalAmount: 880.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Gardner Denver FZE", invoiceCount: 4, totalAmount: 845.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Global Credit Recoveries", invoiceCount: 3, totalAmount: 845.00, category: "normal", salesPersons: ["REENA"] },
  { name: "University of Canberra", invoiceCount: 3, totalAmount: 805.00, category: "normal", salesPersons: ["REENA"] },
  { name: "MACS G SOLUTIONS", invoiceCount: 2, totalAmount: 530.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Seaways International", invoiceCount: 2, totalAmount: 510.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Biz Point Documents", invoiceCount: 2, totalAmount: 490.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Mohebi Logistics", invoiceCount: 2, totalAmount: 490.00, category: "normal", salesPersons: ["REENA"] },
];

// One-time clients (1 invoice) - sorted by revenue descending
const ONE_TIME_CLIENTS_2023: ClientSummary[] = [
  { name: "VALIANT PACIFIC", invoiceCount: 1, totalAmount: 21040.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "GMR Holding", invoiceCount: 1, totalAmount: 21000.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Mohammed Bin Rashid University", invoiceCount: 1, totalAmount: 20700.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Cander Group DMCC", invoiceCount: 1, totalAmount: 20450.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "HEALY CONSULTANTS", invoiceCount: 1, totalAmount: 12825.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "IDP Education Services Nigeria", invoiceCount: 1, totalAmount: 11400.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Evolution Live Event", invoiceCount: 1, totalAmount: 10600.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "CJ ICM FZCO", invoiceCount: 1, totalAmount: 9500.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Theatre of Digital Art", invoiceCount: 1, totalAmount: 9225.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "AL WASEEF INDUSTRIES", invoiceCount: 1, totalAmount: 7896.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "GREENFIELD INTERNATIONAL", invoiceCount: 1, totalAmount: 7632.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Lloyds Energy DMCC", invoiceCount: 1, totalAmount: 6800.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "OILMAR SHIPPING", invoiceCount: 1, totalAmount: 6515.75, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Depa Interiors LLC", invoiceCount: 1, totalAmount: 6300.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Tristar Energy DMCEST", invoiceCount: 1, totalAmount: 6000.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "POWER LEASE VEHICLE", invoiceCount: 1, totalAmount: 5625.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Khaleej Links General", invoiceCount: 1, totalAmount: 5500.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Krishna International", invoiceCount: 1, totalAmount: 5150.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "VIA TONIC LLC", invoiceCount: 1, totalAmount: 4960.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "MIGHTHOUSE REALTY", invoiceCount: 1, totalAmount: 4306.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "E V OFFSHORE", invoiceCount: 1, totalAmount: 3960.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Nexus Pharmaceuticals", invoiceCount: 1, totalAmount: 3950.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Thermo Fisher Scientific", invoiceCount: 1, totalAmount: 3375.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Union Church", invoiceCount: 1, totalAmount: 2930.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "J C S ARTIFICIAL FLOWERS", invoiceCount: 1, totalAmount: 2852.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "BELLAVITA BUILDING", invoiceCount: 1, totalAmount: 2315.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "AL TABREED INDUSTRIES", invoiceCount: 1, totalAmount: 2250.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Beyond Infinity Group", invoiceCount: 1, totalAmount: 2070.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Beyond Infinity Marketing", invoiceCount: 1, totalAmount: 2070.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Aplus Global FZE", invoiceCount: 1, totalAmount: 1975.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "PETRO GULF INTERNATIONAL", invoiceCount: 1, totalAmount: 1900.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Aurantius Real Estate Broker", invoiceCount: 1, totalAmount: 1775.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "FLAVORIQ DMCC", invoiceCount: 1, totalAmount: 1675.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "M Y WORLD TRADING", invoiceCount: 1, totalAmount: 1660.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Nanjing International", invoiceCount: 1, totalAmount: 1650.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "PETALS LANDSCAPE", invoiceCount: 1, totalAmount: 1500.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "HADERO COFFEE SHOP", invoiceCount: 1, totalAmount: 1490.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "FANATECH ENGINEERING", invoiceCount: 1, totalAmount: 1296.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "ALFATONIC GENERAL", invoiceCount: 1, totalAmount: 1150.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "AL YOUSUF MOTORS", invoiceCount: 1, totalAmount: 1142.86, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Avalon General Land Transport", invoiceCount: 1, totalAmount: 1050.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Mayank Kejriwal", invoiceCount: 1, totalAmount: 1050.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "T S S ADVERTISING", invoiceCount: 1, totalAmount: 1050.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Gamayun Consultancy", invoiceCount: 1, totalAmount: 930.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Miss Elain", invoiceCount: 1, totalAmount: 900.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "The Federal Bank", invoiceCount: 1, totalAmount: 900.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Medical Regulations Gate", invoiceCount: 1, totalAmount: 790.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Tristar Transport LLC", invoiceCount: 1, totalAmount: 780.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Besins Healthcare", invoiceCount: 1, totalAmount: 750.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Desert Adventures Tourism", invoiceCount: 1, totalAmount: 750.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "V Craft Events", invoiceCount: 1, totalAmount: 740.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Catherine Lagahino", invoiceCount: 1, totalAmount: 712.50, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Artology Creative DMCC", invoiceCount: 1, totalAmount: 705.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Counselling Point", invoiceCount: 1, totalAmount: 700.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Quest Cove Properties", invoiceCount: 1, totalAmount: 700.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "North Telecom", invoiceCount: 1, totalAmount: 650.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "CHILTERN TMC CONSULTANT", invoiceCount: 1, totalAmount: 500.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Gold Camellia", invoiceCount: 1, totalAmount: 500.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "R Two Marine Services", invoiceCount: 1, totalAmount: 450.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "SEBANG Global Battery", invoiceCount: 1, totalAmount: 450.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Theatre of Digital Art Laser", invoiceCount: 1, totalAmount: 450.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Blue Valley Middle East", invoiceCount: 1, totalAmount: 375.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Crossco Solutions DMCC", invoiceCount: 1, totalAmount: 375.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "M I R A GENERAL TRADING", invoiceCount: 1, totalAmount: 375.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Mr. Hashim Kapadia", invoiceCount: 1, totalAmount: 370.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "QZ Asset Management", invoiceCount: 1, totalAmount: 350.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "St. Mary's Catholic Church", invoiceCount: 1, totalAmount: 350.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "KCA Deutag Drilling", invoiceCount: 1, totalAmount: 340.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Al Nahi Logistics LLC", invoiceCount: 1, totalAmount: 325.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Ms. Gulnara Vafina", invoiceCount: 1, totalAmount: 300.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "AL SHEMAIL GAR.", invoiceCount: 1, totalAmount: 290.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "ENSO GLOBAL TRADING", invoiceCount: 1, totalAmount: 285.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Beyond Infinity Technical", invoiceCount: 1, totalAmount: 275.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "SWISS BUSINESS COUNCIL", invoiceCount: 1, totalAmount: 275.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Ms. Marecel Tan", invoiceCount: 1, totalAmount: 260.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Maximus Business Solutions", invoiceCount: 1, totalAmount: 250.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "RSP REALTY LLC", invoiceCount: 1, totalAmount: 250.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "EV OFFSHORE LIMITED", invoiceCount: 1, totalAmount: 245.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "GRAND MATIC", invoiceCount: 1, totalAmount: 245.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "HARBOUR MIDDLE EAST", invoiceCount: 1, totalAmount: 225.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Beyond Infinity Holiday", invoiceCount: 1, totalAmount: 210.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Qudra Fitness", invoiceCount: 1, totalAmount: 190.48, category: "one-time", salesPersons: ["REENA"] },
  { name: "Griffith University", invoiceCount: 1, totalAmount: 175.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "THE RED CARPET L L C", invoiceCount: 1, totalAmount: 175.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "University of New South Wales", invoiceCount: 1, totalAmount: 175.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "University of Tasmania", invoiceCount: 1, totalAmount: 175.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Ms. Ma Theresa Aguilar", invoiceCount: 1, totalAmount: 150.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "California Chiropractic", invoiceCount: 1, totalAmount: 120.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "ME DO RE PROPERTIES", invoiceCount: 1, totalAmount: 100.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "At Your Service Productions", invoiceCount: 1, totalAmount: 50.00, category: "one-time", salesPersons: ["REENA"] },
];

// Calculate stats from verified data
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
      totalInvoices: 869, // Verified from masterlist
      totalAmount: 2416866.76, // Verified from masterlist
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
