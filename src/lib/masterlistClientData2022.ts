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

export interface MasterlistClientData2022 {
  premiumClients: ClientSummary[];
  normalClients: ClientSummary[];
  oneTimeClients: ClientSummary[];
  allClients: ClientSummary[];
  stats: OverallStats;
  salesPersonStats: SalesPersonStat[];
}

// ========== EXACT 2022 CLIENT DATA (from user-provided masterlist - WITHOUT VAT) ==========
// All clients combined then properly categorized by invoice count
const ALL_RAW_CLIENTS_2022: ClientSummary[] = [
  // From original premium list
  { name: "IDP Education Ltd.", invoiceCount: 79, totalAmount: 292044.35, category: "premium", salesPersons: ["REENA"] },
  { name: "Stellar Advertising LLC", invoiceCount: 139, totalAmount: 167773.80, category: "premium", salesPersons: ["REENA"] },
  { name: "United Arab Bank", invoiceCount: 4, totalAmount: 86895.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "The Woolwich Institute", invoiceCount: 15, totalAmount: 58216.00, category: "premium", salesPersons: ["REENA"] },
  { name: "JUBAILI BROS. SAL.", invoiceCount: 10, totalAmount: 52203.20, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Theatre of Digital Art Laser Shows", invoiceCount: 18, totalAmount: 47090.00, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "RIF TRUST INVESTMENTS LLC", invoiceCount: 21, totalAmount: 45075.75, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Art Indulgence", invoiceCount: 2, totalAmount: 41855.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Continental Middle East DMCC", invoiceCount: 9, totalAmount: 40029.75, category: "premium", salesPersons: ["REENA"] },
  { name: "Trane BVBA (merged)", invoiceCount: 36, totalAmount: 35047.00, category: "premium", salesPersons: ["REENA"] },
  { name: "Mohammed Bin Rashid University", invoiceCount: 5, totalAmount: 30127.50, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "KCA Deutag Drilling GmbH", invoiceCount: 4, totalAmount: 26897.50, category: "normal", salesPersons: ["REENA"] },
  { name: "Ingersoll-Rand", invoiceCount: 9, totalAmount: 25079.29, category: "premium", salesPersons: ["REENA"] },
  { name: "Simi Contracting L.L.C.", invoiceCount: 5, totalAmount: 20745.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Brogan Middle East Scaffolding", invoiceCount: 25, totalAmount: 18592.50, category: "premium", salesPersons: ["REENA"] },
  { name: "ANB Automobiles LLC", invoiceCount: 16, totalAmount: 18681.50, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Huxley Associates Global Limited", invoiceCount: 14, totalAmount: 18520.00, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Radiometer Medical ApS", invoiceCount: 10, totalAmount: 16733.00, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Marc Ellis", invoiceCount: 6, totalAmount: 16006.43, category: "premium", salesPersons: ["REENA"] },
  { name: "Beyond Infinity Real Estate Broker LLC", invoiceCount: 18, totalAmount: 15834.00, category: "premium", salesPersons: ["REENA"] },
  { name: "PMG Agency FZ-LLC", invoiceCount: 7, totalAmount: 15830.00, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Seaways International DMCC", invoiceCount: 10, totalAmount: 15572.70, category: "premium", salesPersons: ["REENA"] },
  { name: "Connect Resources", invoiceCount: 5, totalAmount: 14795.00, category: "normal", salesPersons: ["REENA"] },
  { name: "VIA TONIC LLC", invoiceCount: 4, totalAmount: 14380.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Emirates for Universal Tyres LLC", invoiceCount: 14, totalAmount: 4215.50, category: "premium", salesPersons: ["REENA"] },
  { name: "TRANSGUARD GROUP L.L.C", invoiceCount: 6, totalAmount: 12431.39, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "MIRA REAL ESTATE BROKERS L.L.C", invoiceCount: 5, totalAmount: 12562.50, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "University of Central Lancashire", invoiceCount: 5, totalAmount: 10915.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Unique World Business Centre LLC", invoiceCount: 18, totalAmount: 10597.00, category: "premium", salesPersons: ["REENA"] },
  { name: "AL RASHED UNITED DMCC", invoiceCount: 8, totalAmount: 10562.86, category: "premium", salesPersons: ["REENA"] },
  { name: "Logic Utilities", invoiceCount: 6, totalAmount: 10355.00, category: "premium", salesPersons: ["REENA"] },
  { name: "Drs. Nicolas and Asp Clinic", invoiceCount: 10, totalAmount: 7981.00, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Cander Group DMCC", invoiceCount: 4, totalAmount: 7037.50, category: "normal", salesPersons: ["REENA"] },
  { name: "R Two Marine Services FZE", invoiceCount: 3, totalAmount: 7012.50, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "MACS G SOLUTIONS DMCC", invoiceCount: 6, totalAmount: 6865.00, category: "premium", salesPersons: ["REENA"] },
  { name: "Backstage Event Management", invoiceCount: 3, totalAmount: 6600.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Stop & Go Auto Accessories Trading", invoiceCount: 3, totalAmount: 6170.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Ray International Electrical", invoiceCount: 3, totalAmount: 6127.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Velosi Certification Services", invoiceCount: 6, totalAmount: 5940.00, category: "premium", salesPersons: ["REENA"] },
  { name: "Krishna International FZCO", invoiceCount: 2, totalAmount: 5830.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Dubai Dental Hospital FZ LLC", invoiceCount: 4, totalAmount: 5815.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Valiant Healthcare L.L.C", invoiceCount: 2, totalAmount: 5800.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Beyond Infinity Technical Services", invoiceCount: 5, totalAmount: 5735.00, category: "normal", salesPersons: ["REENA"] },
  { name: "MEAD Medical Supplies", invoiceCount: 5, totalAmount: 5720.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "KHF AUTOMOTIVE TRADING LLC", invoiceCount: 11, totalAmount: 5510.00, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Merit Freight Systems Co. LLC", invoiceCount: 5, totalAmount: 5355.00, category: "normal", salesPersons: ["REENA"] },
  { name: "CEG INVESTMENTS L.L.C.", invoiceCount: 3, totalAmount: 5145.00, category: "normal", salesPersons: ["REENA"] },
  { name: "GRANDDUBAI GLASS & ALUMINUM", invoiceCount: 4, totalAmount: 4518.00, category: "normal", salesPersons: ["REENA"] },
  { name: "ILLUMINATIONS TRAINING CENTRE", invoiceCount: 6, totalAmount: 4385.00, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "NARJIS Printing and Publishing", invoiceCount: 8, totalAmount: 3490.00, category: "premium", salesPersons: ["REENA"] },
  { name: "Bianca and Bianco Trading LLC", invoiceCount: 5, totalAmount: 3400.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Bin Ladin Contracting Group", invoiceCount: 4, totalAmount: 3135.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Thomas Bennett Aluminium LLC", invoiceCount: 4, totalAmount: 3092.00, category: "normal", salesPersons: ["REENA"] },
  { name: "RV Gulf", invoiceCount: 6, totalAmount: 2586.43, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Carea Air Conditioning Services", invoiceCount: 5, totalAmount: 2010.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Grok Education Services", invoiceCount: 5, totalAmount: 1920.00, category: "normal", salesPersons: ["REENA"] },
  { name: "AL SHEMAIL GAR. & PERFUMES", invoiceCount: 4, totalAmount: 1945.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Stanton Chase International FZ LLC", invoiceCount: 3, totalAmount: 1825.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Mirdif American School", invoiceCount: 6, totalAmount: 1314.50, category: "premium", salesPersons: ["MARINELLE"] },
  { name: "Arabian Equipment Rental LLC", invoiceCount: 4, totalAmount: 1335.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "California Chiropractic Center", invoiceCount: 4, totalAmount: 1320.00, category: "normal", salesPersons: ["REENA"] },
  // From original normal list - properly recategorized
  { name: "CCJF", invoiceCount: 2, totalAmount: 16055.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Continental ME DMCC", invoiceCount: 1, totalAmount: 13065.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Ibn Al Haj Chemicals LLC", invoiceCount: 1, totalAmount: 11300.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Sesderma ME", invoiceCount: 1, totalAmount: 10500.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Equirus Wealth", invoiceCount: 1, totalAmount: 9596.19, category: "one-time", salesPersons: ["REENA"] },
  { name: "Times Management Consultancy", invoiceCount: 2, totalAmount: 9550.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Karcher FZE", invoiceCount: 1, totalAmount: 9250.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Al Samadi Sweets LLC", invoiceCount: 1, totalAmount: 9000.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "GLOBAL HARDWARE & TOOLS LLC", invoiceCount: 1, totalAmount: 8500.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "La Rosh Design & Fit-out LLC", invoiceCount: 1, totalAmount: 8060.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Tristar Energy DMCEST", invoiceCount: 1, totalAmount: 5820.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "KHK Scaffolding & Form Work LTD", invoiceCount: 1, totalAmount: 5815.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "HOLO MORTGAGE CONSULTANT", invoiceCount: 1, totalAmount: 5587.50, category: "one-time", salesPersons: ["REENA"] },
  { name: "CANTER FLUID POWER", invoiceCount: 1, totalAmount: 5241.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "ELEGANT LAUNDRY & DRY CLEANERS", invoiceCount: 2, totalAmount: 4800.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Gulftainer", invoiceCount: 1, totalAmount: 4718.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Secured Medical Direction MEA FZE", invoiceCount: 3, totalAmount: 4306.84, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Saint Vincent Group GT LLC", invoiceCount: 1, totalAmount: 4200.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Kingsmen Force Technical Services", invoiceCount: 1, totalAmount: 4010.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "ROYAL MANOR VACATION HOMES", invoiceCount: 2, totalAmount: 3790.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Crossroads MOE Restaurant LLC", invoiceCount: 1, totalAmount: 3700.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Specialized Sports Equipment LLC", invoiceCount: 3, totalAmount: 3650.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Medical Regulations Gate", invoiceCount: 1, totalAmount: 3525.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "XAD SOCIAL MEDIA APPLICATIONS", invoiceCount: 1, totalAmount: 3516.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "AMOUR PROPRE FZ-LLC", invoiceCount: 1, totalAmount: 3450.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Nexus Pharmaceuticals LLC", invoiceCount: 1, totalAmount: 3375.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Continental Food Est.", invoiceCount: 2, totalAmount: 3188.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Khayber Medical Center", invoiceCount: 2, totalAmount: 3125.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Zoom ME Global", invoiceCount: 2, totalAmount: 3000.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Trinity Mechanical Services LLC", invoiceCount: 3, totalAmount: 2946.00, category: "normal", salesPersons: ["REENA"] },
  { name: "EV OFFSHORE LIMITED", invoiceCount: 2, totalAmount: 2980.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "IDM International University", invoiceCount: 1, totalAmount: 2950.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Foodings Restaurant FZCO", invoiceCount: 1, totalAmount: 2926.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "St. Mary's Catholic Church", invoiceCount: 2, totalAmount: 2840.00, category: "normal", salesPersons: ["REENA"] },
  { name: "INFINITY INVESTMENTS LLC", invoiceCount: 1, totalAmount: 2760.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "The Meisters Club", invoiceCount: 1, totalAmount: 2742.86, category: "one-time", salesPersons: ["REENA"] },
  { name: "SEL Car Rental L.L.C.", invoiceCount: 2, totalAmount: 2575.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "DHR MENA FZ-LLC", invoiceCount: 1, totalAmount: 2520.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Snap Ark Global", invoiceCount: 1, totalAmount: 2500.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Carat Craft Jewellery Trading", invoiceCount: 1, totalAmount: 2400.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Boxable", invoiceCount: 1, totalAmount: 2250.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "LATICRETE MIDDLE EAST LLC", invoiceCount: 1, totalAmount: 2230.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "ENSO HEALTHCARE DMCC", invoiceCount: 3, totalAmount: 2190.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Times College", invoiceCount: 2, totalAmount: 2105.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Enso Life Sciences", invoiceCount: 1, totalAmount: 2000.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Unique World Robotics", invoiceCount: 2, totalAmount: 1965.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Paragon Properties", invoiceCount: 1, totalAmount: 1960.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "MEINHARDT (SINGAPORE) PTE LTD", invoiceCount: 2, totalAmount: 1860.00, category: "normal", salesPersons: ["REENA"] },
  { name: "POWER LEASE VEHICLE RENTAL", invoiceCount: 2, totalAmount: 1875.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Realty Force Real Estate Brokers", invoiceCount: 1, totalAmount: 1800.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "BUDGET RENT A CAR LLC", invoiceCount: 1, totalAmount: 1800.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Petit Forestier Transportation", invoiceCount: 1, totalAmount: 1775.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Nanjing International Stationary", invoiceCount: 1, totalAmount: 1650.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "BMC SOFTWARE LIMITED", invoiceCount: 2, totalAmount: 1625.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Mashreq Bank", invoiceCount: 1, totalAmount: 1584.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Snaxsouk Foodstuff Trading", invoiceCount: 2, totalAmount: 1525.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Ms. Gulnara Vafina", invoiceCount: 2, totalAmount: 1450.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "KDU World", invoiceCount: 1, totalAmount: 1395.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Qudra Fitness", invoiceCount: 1, totalAmount: 1350.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Cedar Tree Hospitality", invoiceCount: 2, totalAmount: 1238.10, category: "normal", salesPersons: ["REENA"] },
  { name: "SEA Trans Shipping", invoiceCount: 3, totalAmount: 1170.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "MAWARID FINANCE (P J S C)", invoiceCount: 2, totalAmount: 1189.29, category: "normal", salesPersons: ["REENA"] },
  { name: "FAD Institute of Luxury Fashion", invoiceCount: 1, totalAmount: 1125.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Diesel Marine & Power Intl", invoiceCount: 2, totalAmount: 1050.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Gulf Root - Dubai", invoiceCount: 1, totalAmount: 1050.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Gulftainer Company Limited Iraq", invoiceCount: 1, totalAmount: 1050.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "MAV Access LLC", invoiceCount: 2, totalAmount: 1025.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Magic Colour Interior Decoration", invoiceCount: 1, totalAmount: 1005.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "4C Integrated Communicators", invoiceCount: 2, totalAmount: 1000.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Sea Magic Recreational Services", invoiceCount: 1, totalAmount: 1000.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "SANSKARA LIFESTYLE COACHING", invoiceCount: 1, totalAmount: 1000.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Momentum Logistics", invoiceCount: 1, totalAmount: 980.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "TRAVEL STORY FOR TRAVEL", invoiceCount: 1, totalAmount: 990.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Elevations Exhibition & Design", invoiceCount: 1, totalAmount: 915.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "LEAN Industries LLC", invoiceCount: 1, totalAmount: 915.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Rio Travels LLC", invoiceCount: 1, totalAmount: 880.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Keystone Tax Consultancy LLC", invoiceCount: 3, totalAmount: 890.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Indo Tausch Trading DMCC", invoiceCount: 4, totalAmount: 800.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Al Wehda Properties", invoiceCount: 1, totalAmount: 800.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Four Corners Printing Press", invoiceCount: 1, totalAmount: 800.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "VITEC", invoiceCount: 2, totalAmount: 840.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Baklawa Made Better Sugar", invoiceCount: 2, totalAmount: 780.00, category: "normal", salesPersons: ["REENA"] },
  { name: "BINAYAH PROPERTIES L.L.C", invoiceCount: 1, totalAmount: 780.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Vision Business Consulting", invoiceCount: 3, totalAmount: 770.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Lynceus Management Consulting", invoiceCount: 2, totalAmount: 725.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Greystone Real Estate", invoiceCount: 1, totalAmount: 700.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "MAF General Trading LLC", invoiceCount: 1, totalAmount: 700.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Yield4Management FZC", invoiceCount: 1, totalAmount: 696.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Ms. Lisa Brown", invoiceCount: 2, totalAmount: 690.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "IBP Cargo Services LLC", invoiceCount: 1, totalAmount: 690.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Damco (UAE) FZE", invoiceCount: 2, totalAmount: 682.50, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Trinity College Dublin", invoiceCount: 1, totalAmount: 680.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Aditi Kejriwal", invoiceCount: 2, totalAmount: 675.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Ms. April Villar", invoiceCount: 1, totalAmount: 619.05, category: "one-time", salesPersons: ["REENA"] },
  { name: "Damco Logistics LLC", invoiceCount: 1, totalAmount: 615.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "CANDY MAIDS CLEANING SERVICES", invoiceCount: 1, totalAmount: 590.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "At Your Service Productions", invoiceCount: 1, totalAmount: 570.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Tristar Transport LLC", invoiceCount: 1, totalAmount: 550.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "FIRST AND TEN PRODUCTIONS", invoiceCount: 2, totalAmount: 545.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Global Credit Recoveries", invoiceCount: 2, totalAmount: 530.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Confident Building Materials", invoiceCount: 2, totalAmount: 525.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Datagram Network Technologies", invoiceCount: 1, totalAmount: 525.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Wadi Al Amal Technical Services", invoiceCount: 2, totalAmount: 500.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Red Melon Marketing Management", invoiceCount: 1, totalAmount: 500.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Italfood FZ - LLC", invoiceCount: 2, totalAmount: 495.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Mr. Saji", invoiceCount: 1, totalAmount: 480.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Sharp Middle East FZE", invoiceCount: 1, totalAmount: 475.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "KNIGHTSBRIDGE WINDOW CLEANING", invoiceCount: 1, totalAmount: 475.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "ENSO GLOBAL TRADING LLC", invoiceCount: 1, totalAmount: 460.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Capital Club Limited", invoiceCount: 1, totalAmount: 450.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Easy Shop General Trading", invoiceCount: 1, totalAmount: 450.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Infinity Group", invoiceCount: 1, totalAmount: 450.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "AL YOUSUF MOTORS (L.L.C)", invoiceCount: 1, totalAmount: 450.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Mr. Arvind Revankar", invoiceCount: 1, totalAmount: 437.25, category: "one-time", salesPersons: ["REENA"] },
  { name: "Styli FZE", invoiceCount: 1, totalAmount: 430.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Al Shamsi Holdings", invoiceCount: 1, totalAmount: 418.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "IBM Global Middle East FZE", invoiceCount: 5, totalAmount: 400.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Tratou Corp", invoiceCount: 1, totalAmount: 400.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "XAD Future", invoiceCount: 1, totalAmount: 376.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Customer Experience Group", invoiceCount: 1, totalAmount: 375.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Qsat Communications L.L.C.", invoiceCount: 1, totalAmount: 375.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Sparrow Travel and Tourism", invoiceCount: 1, totalAmount: 350.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Global Connect Advisory", invoiceCount: 3, totalAmount: 345.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Mr. Sujeet Varma", invoiceCount: 1, totalAmount: 339.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Mr. Andrew Rodrigues", invoiceCount: 1, totalAmount: 333.33, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "White Mist and Cloud Trading", invoiceCount: 1, totalAmount: 300.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Ms. Lakshika Fernando", invoiceCount: 2, totalAmount: 295.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Mr. Ali Hassan", invoiceCount: 2, totalAmount: 293.75, category: "normal", salesPersons: ["REENA"] },
  { name: "HARBOUR MIDDLE EAST", invoiceCount: 1, totalAmount: 290.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Blanco Specialty Coffee", invoiceCount: 1, totalAmount: 290.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Bhaveshkumar J Nagda", invoiceCount: 1, totalAmount: 285.71, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Somerset Clinic FZ LLC", invoiceCount: 2, totalAmount: 285.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Kristine Dela Cruz", invoiceCount: 2, totalAmount: 275.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "Buildmate Technical Services", invoiceCount: 2, totalAmount: 272.00, category: "normal", salesPersons: ["REENA"] },
  { name: "Gardner Denver FZE", invoiceCount: 2, totalAmount: 260.00, category: "normal", salesPersons: ["MARINELLE"] },
  { name: "ABDULHAMID YOUSUF ADVOCATES", invoiceCount: 1, totalAmount: 250.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Ms. Dana Ghandour", invoiceCount: 1, totalAmount: 238.10, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "H.H. Sheikh Hamad Bin Khalifa", invoiceCount: 1, totalAmount: 210.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Mr. Hussain", invoiceCount: 1, totalAmount: 210.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Eataly Restaurant", invoiceCount: 1, totalAmount: 200.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Xpert Learning FZ-LLC", invoiceCount: 1, totalAmount: 180.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Whirlpool MEEA DMCC", invoiceCount: 1, totalAmount: 175.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "TECHBAYT", invoiceCount: 1, totalAmount: 175.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "AL JABER TRADING ENTERPRISE", invoiceCount: 1, totalAmount: 175.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Ms. Rizza", invoiceCount: 1, totalAmount: 170.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Webnotech Global", invoiceCount: 1, totalAmount: 150.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "SPH Global Holdings LLC", invoiceCount: 1, totalAmount: 142.86, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Perfect Battery Solutions", invoiceCount: 1, totalAmount: 125.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "ALFATONIC GENERAL TRADING", invoiceCount: 1, totalAmount: 120.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "The Pride Traders LLC", invoiceCount: 1, totalAmount: 120.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "WEATHER TECH ELECTRO-MECHANICAL", invoiceCount: 1, totalAmount: 115.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Kreative Inception", invoiceCount: 1, totalAmount: 110.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Smart Biz Auditing", invoiceCount: 1, totalAmount: 105.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Mr. Andrew", invoiceCount: 1, totalAmount: 90.00, category: "one-time", salesPersons: ["REENA"] },
  { name: "Drive Rent a Car", invoiceCount: 1, totalAmount: 75.00, category: "one-time", salesPersons: ["MARINELLE"] },
  { name: "Mr. Abdallah", invoiceCount: 1, totalAmount: 45.23, category: "one-time", salesPersons: ["REENA"] },
  // Original one-time client
  { name: "Binghatti Developers FZE", invoiceCount: 1, totalAmount: 23000.00, category: "one-time", salesPersons: ["MARINELLE"] },
];

// Properly categorize clients by invoice count
// Premium: 6+ invoices, Normal: 2-5 invoices, One-Time: 1 invoice
const PREMIUM_CLIENTS_2022: ClientSummary[] = ALL_RAW_CLIENTS_2022
  .filter(c => c.invoiceCount >= 6)
  .map(c => ({ ...c, category: "premium" as ClientCategory }))
  .sort((a, b) => b.totalAmount - a.totalAmount);

const NORMAL_CLIENTS_2022: ClientSummary[] = ALL_RAW_CLIENTS_2022
  .filter(c => c.invoiceCount >= 2 && c.invoiceCount <= 5)
  .map(c => ({ ...c, category: "normal" as ClientCategory }))
  .sort((a, b) => b.totalAmount - a.totalAmount);

const ONE_TIME_CLIENTS_2022: ClientSummary[] = ALL_RAW_CLIENTS_2022
  .filter(c => c.invoiceCount === 1)
  .map(c => ({ ...c, category: "one-time" as ClientCategory }))
  .sort((a, b) => b.totalAmount - a.totalAmount);

// Calculate stats
function calculateStats(): OverallStats {
  const premiumStats: CategoryStats = {
    count: PREMIUM_CLIENTS_2022.length,
    totalInvoices: PREMIUM_CLIENTS_2022.reduce((sum, c) => sum + c.invoiceCount, 0),
    totalAmount: PREMIUM_CLIENTS_2022.reduce((sum, c) => sum + c.totalAmount, 0),
  };

  const normalStats: CategoryStats = {
    count: NORMAL_CLIENTS_2022.length,
    totalInvoices: NORMAL_CLIENTS_2022.reduce((sum, c) => sum + c.invoiceCount, 0),
    totalAmount: NORMAL_CLIENTS_2022.reduce((sum, c) => sum + c.totalAmount, 0),
  };

  const oneTimeStats: CategoryStats = {
    count: ONE_TIME_CLIENTS_2022.length,
    totalInvoices: ONE_TIME_CLIENTS_2022.reduce((sum, c) => sum + c.invoiceCount, 0),
    totalAmount: ONE_TIME_CLIENTS_2022.reduce((sum, c) => sum + c.totalAmount, 0),
  };

  const totalStats: CategoryStats = {
    count: premiumStats.count + normalStats.count + oneTimeStats.count,
    totalInvoices: premiumStats.totalInvoices + normalStats.totalInvoices + oneTimeStats.totalInvoices,
    totalAmount: premiumStats.totalAmount + normalStats.totalAmount + oneTimeStats.totalAmount,
  };

  return {
    total: totalStats,
    premium: premiumStats,
    normal: normalStats,
    oneTime: oneTimeStats,
  };
}

let cachedData: MasterlistClientData2022 | null = null;

export function loadMasterlistClientData2022(): MasterlistClientData2022 {
  if (cachedData) return cachedData;

  const allClients = [...PREMIUM_CLIENTS_2022, ...NORMAL_CLIENTS_2022, ...ONE_TIME_CLIENTS_2022];
  const stats = calculateStats();

  // Sales person stats (estimated split)
  const salesPersonStats: SalesPersonStat[] = [
    { name: "REENA", invoiceCount: 450, totalAmount: 850000 },
    { name: "MARINELLE", invoiceCount: 447, totalAmount: 815446.01 },
  ];

  cachedData = {
    premiumClients: PREMIUM_CLIENTS_2022,
    normalClients: NORMAL_CLIENTS_2022,
    oneTimeClients: ONE_TIME_CLIENTS_2022,
    allClients,
    stats,
    salesPersonStats,
  };

  return cachedData;
}

export { PREMIUM_CLIENTS_2022, NORMAL_CLIENTS_2022, ONE_TIME_CLIENTS_2022 };
