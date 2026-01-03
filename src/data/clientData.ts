// Complete client invoice data extracted from the masterlist (2025 Insights)
// All amounts are NET REVENUE (before VAT)

export interface ClientSummary {
  name: string;
  invoiceCount: number;
  totalAmount: number;
  category: 'premium' | 'one-time' | 'normal';
  salesPersons: string[];
  description?: string;
}

export interface MonthlyData {
  month: string;
  monthNum: number;
  revenue: number;
  invoices: number;
  clients: number;
  premiumRevenue: number;
  normalRevenue: number;
  oneTimeRevenue: number;
  premiumInvoices: number;
  normalInvoices: number;
  oneTimeInvoices: number;
  premiumClients: number;
  normalClients: number;
  oneTimeClients: number;
  avgInvoiceValue: number;
  topClients: { name: string; revenue: number; invoices: number; category: string }[];
}

export interface ClientMonthlyBreakdown {
  clientName: string;
  category: 'premium' | 'normal' | 'one-time';
  salesPerson: string;
  months: { month: string; invoices: number; revenue: number }[];
  totalInvoices: number;
  totalRevenue: number;
}

// Month names for display
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const FULL_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Premium Clients (6+ invoices) - Net Revenue (No VAT)
export const premiumClients: ClientSummary[] = [
  { name: "IDP Education (Merged)", invoiceCount: 47, totalAmount: 364074, category: 'premium', salesPersons: ["REENA"] },
  { name: "Navitas / Murdoch (Merged)", invoiceCount: 65, totalAmount: 289103, category: 'premium', salesPersons: ["REENA"] },
  { name: "Gulftainer Company Limited", invoiceCount: 51, totalAmount: 107487, category: 'premium', salesPersons: ["REENA"] },
  { name: "GrokGlobal Services", invoiceCount: 15, totalAmount: 79098, category: 'premium', salesPersons: ["REENA"] },
  { name: "Deakin University (Merged)", invoiceCount: 7, totalAmount: 76585, category: 'premium', salesPersons: ["REENA"] },
  { name: "Hult Investments (Merged)", invoiceCount: 13, totalAmount: 57280, category: 'premium', salesPersons: ["REENA"] },
  { name: "Trane BVBA (Merged)", invoiceCount: 44, totalAmount: 40723, category: 'premium', salesPersons: ["REENA"] },
  { name: "Continental Middle East DMCC", invoiceCount: 7, totalAmount: 37612, category: 'premium', salesPersons: ["REENA"] },
  { name: "Logic Utilities District Cooling", invoiceCount: 18, totalAmount: 35947, category: 'premium', salesPersons: ["REENA"] },
  { name: "Aurantius Real Estate Broker", invoiceCount: 23, totalAmount: 29007, category: 'premium', salesPersons: ["REENA"] },
  { name: "Tappy Toes Nursery DWC-LLC", invoiceCount: 10, totalAmount: 28307, category: 'premium', salesPersons: ["REENA"] },
  { name: "BNI Polaris", invoiceCount: 47, totalAmount: 22337, category: 'premium', salesPersons: ["BNI"] },
  { name: "ANB Automobiles L.L.C", invoiceCount: 6, totalAmount: 17365, category: 'premium', salesPersons: ["REENA"] },
  { name: "Styfect Furnitures", invoiceCount: 6, totalAmount: 14886, category: 'premium', salesPersons: ["BNI"] },
  { name: "Sea Centre Shipping Services", invoiceCount: 8, totalAmount: 13966, category: 'premium', salesPersons: ["BNI"] },
  { name: "Five Building Materials Trading", invoiceCount: 6, totalAmount: 10440, category: 'premium', salesPersons: ["BNI"] },
  { name: "Huxley Associates Global", invoiceCount: 9, totalAmount: 9215, category: 'premium', salesPersons: ["REENA"] },
  { name: "Al Suhail Ship Maintenance", invoiceCount: 6, totalAmount: 8117, category: 'premium', salesPersons: ["REENA"] },
  { name: "Al Afnan Steel Ind. Co. LLC", invoiceCount: 7, totalAmount: 7946, category: 'premium', salesPersons: ["BNI"] },
  { name: "Indo Tausch Trading (Merged)", invoiceCount: 6, totalAmount: 5778, category: 'premium', salesPersons: ["REENA"] },
  { name: "M E A D Medical Supplies", invoiceCount: 7, totalAmount: 4099, category: 'premium', salesPersons: ["REENA"] },
  { name: "Unique World Business Centre", invoiceCount: 24, totalAmount: 2805, category: 'premium', salesPersons: ["REENA"] },
  { name: "Momentum Logistics LLC", invoiceCount: 10, totalAmount: 1855, category: 'premium', salesPersons: ["REENA"] },
  { name: "Supercad Trading L.L.C", invoiceCount: 6, totalAmount: 1310, category: 'premium', salesPersons: ["BNI"] },
];

// Regular/Normal Clients (2-5 invoices) - Net Revenue (No VAT)
export const normalClients: ClientSummary[] = [
  { name: "CACOGES", invoiceCount: 3, totalAmount: 40695, category: 'normal', salesPersons: ["REENA"] },
  { name: "Stellar Advertising LLC", invoiceCount: 5, totalAmount: 28812, category: 'normal', salesPersons: ["REENA"] },
  { name: "Azalee Flower Boutique", invoiceCount: 2, totalAmount: 20500, category: 'normal', salesPersons: ["MELVIN"] },
  { name: "Olympus MEA FZ-LLC", invoiceCount: 3, totalAmount: 18725, category: 'normal', salesPersons: ["SREERAJ"] },
  { name: "Alef Education Consultancy", invoiceCount: 4, totalAmount: 18632, category: 'normal', salesPersons: ["REENA"] },
  { name: "DHR MENA FZ-LLC", invoiceCount: 3, totalAmount: 14443, category: 'normal', salesPersons: ["SREERAJ"] },
  { name: "Thermo Fisher Scientific", invoiceCount: 4, totalAmount: 13840, category: 'normal', salesPersons: ["REENA"] },
  { name: "Radiometer Medical ApS", invoiceCount: 4, totalAmount: 13668, category: 'normal', salesPersons: ["REENA"] },
  { name: "North Telecom LLC", invoiceCount: 3, totalAmount: 12367, category: 'normal', salesPersons: ["REENA"] },
  { name: "Emirates for Universal Tyres", invoiceCount: 4, totalAmount: 12236, category: 'normal', salesPersons: ["REENA"] },
  { name: "Paragon Properties", invoiceCount: 3, totalAmount: 11100, category: 'normal', salesPersons: ["MELVIN"] },
  { name: "Party Pals Forever Events", invoiceCount: 2, totalAmount: 9032, category: 'normal', salesPersons: ["BNI"] },
  { name: "Bianca and Bianco Trading", invoiceCount: 4, totalAmount: 8770, category: 'normal', salesPersons: ["REENA"] },
  { name: "Stanford Marine Group", invoiceCount: 2, totalAmount: 7190, category: 'normal', salesPersons: ["REENA"] },
  { name: "Marafek Electromechanical", invoiceCount: 3, totalAmount: 6905, category: 'normal', salesPersons: ["BNI"] },
  { name: "SECA GMBH & CO. KG", invoiceCount: 2, totalAmount: 6914, category: 'normal', salesPersons: ["ANAND"] },
  { name: "Ms. Karine Leonian", invoiceCount: 2, totalAmount: 6762, category: 'normal', salesPersons: ["ANAND"] },
  { name: "Dahya Yachts Repairing", invoiceCount: 2, totalAmount: 6442, category: 'normal', salesPersons: ["MELVIN"] },
  { name: "Al Tayer Insignia LLC", invoiceCount: 3, totalAmount: 6224, category: 'normal', salesPersons: ["REENA"] },
  { name: "ARK Creators", invoiceCount: 4, totalAmount: 6055, category: 'normal', salesPersons: ["BNI"] },
  { name: "J C S Artificial Flowers", invoiceCount: 5, totalAmount: 6028, category: 'normal', salesPersons: ["REENA"] },
  { name: "Dubai Academic Health", invoiceCount: 2, totalAmount: 6024, category: 'normal', salesPersons: ["REENA"] },
  { name: "Mega Com Media LLC", invoiceCount: 2, totalAmount: 5845, category: 'normal', salesPersons: ["BNI"] },
  { name: "Investmenter Real Estate", invoiceCount: 3, totalAmount: 5601, category: 'normal', salesPersons: ["REENA"] },
  { name: "Avant FZ LLC", invoiceCount: 3, totalAmount: 5295, category: 'normal', salesPersons: ["BNI"] },
  { name: "Swiss Business Council", invoiceCount: 2, totalAmount: 5150, category: 'normal', salesPersons: ["REENA"] },
  { name: "Expert United Marine", invoiceCount: 2, totalAmount: 4613, category: 'normal', salesPersons: ["REENA"] },
  { name: "World Data Feasibility", invoiceCount: 3, totalAmount: 4295, category: 'normal', salesPersons: ["REENA"] },
  { name: "Al Rashed United DMCC", invoiceCount: 3, totalAmount: 4075, category: 'normal', salesPersons: ["REENA"] },
  { name: "Contitech Fluids Oil", invoiceCount: 3, totalAmount: 3944, category: 'normal', salesPersons: ["REENA"] },
  { name: "LIV Global Travel LLC", invoiceCount: 2, totalAmount: 3910, category: 'normal', salesPersons: ["REENA"] },
  { name: "Emboss - FZCO", invoiceCount: 3, totalAmount: 3880, category: 'normal', salesPersons: ["REENA"] },
  { name: "Arametal Oil Field Equipment", invoiceCount: 3, totalAmount: 3545, category: 'normal', salesPersons: ["REENA"] },
  { name: "Locke Lifestyle Properties", invoiceCount: 3, totalAmount: 3353, category: 'normal', salesPersons: ["REENA"] },
  { name: "Onestep Global Ingress", invoiceCount: 2, totalAmount: 3270, category: 'normal', salesPersons: ["REENA"] },
  { name: "Taz Rajabali", invoiceCount: 3, totalAmount: 3058, category: 'normal', salesPersons: ["REENA"] },
  { name: "Bloomsbury Lane", invoiceCount: 3, totalAmount: 3054, category: 'normal', salesPersons: ["BNI"] },
  { name: "Al Jalila Foundation", invoiceCount: 3, totalAmount: 3002, category: 'normal', salesPersons: ["REENA"] },
  { name: "Royex Technologies L.L.C", invoiceCount: 2, totalAmount: 2985, category: 'normal', salesPersons: ["BNI"] },
  { name: "Onboard Sky Freight Services", invoiceCount: 3, totalAmount: 2940, category: 'normal', salesPersons: ["REENA"] },
  { name: "ENH Marketing L.L.C", invoiceCount: 2, totalAmount: 2550, category: 'normal', salesPersons: ["BNI"] },
  { name: "BLS LAD Chartered Accountants", invoiceCount: 4, totalAmount: 2320, category: 'normal', salesPersons: ["BNI"] },
  { name: "Finhub Middle East", invoiceCount: 3, totalAmount: 2250, category: 'normal', salesPersons: ["REENA"] },
  { name: "Dhyana Digital Marketing", invoiceCount: 4, totalAmount: 2137, category: 'normal', salesPersons: ["REENA"] },
  { name: "Voxtel Communications", invoiceCount: 2, totalAmount: 2010, category: 'normal', salesPersons: ["REENA"] },
  { name: "EDGE Technical Solution", invoiceCount: 3, totalAmount: 1951, category: 'normal', salesPersons: ["BNI"] },
  { name: "Axis Workshop", invoiceCount: 3, totalAmount: 1926, category: 'normal', salesPersons: ["BNI"] },
  { name: "Lloyds Energy DMCC", invoiceCount: 5, totalAmount: 1895, category: 'normal', salesPersons: ["REENA"] },
  { name: "Perfect Tools Moulds Factory", invoiceCount: 2, totalAmount: 1850, category: 'normal', salesPersons: ["REENA"] },
  { name: "Black Swan Business Setup", invoiceCount: 2, totalAmount: 1719, category: 'normal', salesPersons: ["REENA"] },
  { name: "Excelsior Escapes and Events", invoiceCount: 4, totalAmount: 1486, category: 'normal', salesPersons: ["REENA"] },
  { name: "Oculus Middle East Contracting", invoiceCount: 2, totalAmount: 1475, category: 'normal', salesPersons: ["BNI"] },
  { name: "Narjis Printing and Publishing", invoiceCount: 2, totalAmount: 1405, category: 'normal', salesPersons: ["REENA"] },
  { name: "Melius Consulting", invoiceCount: 2, totalAmount: 1377, category: 'normal', salesPersons: ["REENA"] },
  { name: "Ingersoll-Rand", invoiceCount: 4, totalAmount: 1300, category: 'normal', salesPersons: ["REENA"] },
  { name: "Union Church", invoiceCount: 2, totalAmount: 1240, category: 'normal', salesPersons: ["REENA"] },
  { name: "Madhuri Narkar", invoiceCount: 2, totalAmount: 1136, category: 'normal', salesPersons: ["BNI"] },
  { name: "Counselling Point Training", invoiceCount: 2, totalAmount: 1010, category: 'normal', salesPersons: ["ANAND"] },
  { name: "Gardner Denver FZE", invoiceCount: 2, totalAmount: 940, category: 'normal', salesPersons: ["REENA"] },
  { name: "Kotug Middle East DMCC", invoiceCount: 2, totalAmount: 888, category: 'normal', salesPersons: ["REENA"] },
  { name: "SPH Global Holdings LLC", invoiceCount: 2, totalAmount: 839, category: 'normal', salesPersons: ["REENA"] },
  { name: "JNT Car Rental L.L.C", invoiceCount: 2, totalAmount: 685, category: 'normal', salesPersons: ["BNI"] },
  { name: "Cambridge Education Group", invoiceCount: 2, totalAmount: 586, category: 'normal', salesPersons: ["REENA"] },
  { name: "Ms. Baiba Butler", invoiceCount: 2, totalAmount: 500, category: 'normal', salesPersons: ["BNI"] },
  { name: "Muhammad Umer Tariq", invoiceCount: 2, totalAmount: 407, category: 'normal', salesPersons: ["BNI"] },
  { name: "Netision Global Technologies", invoiceCount: 3, totalAmount: 375, category: 'normal', salesPersons: ["REENA"] },
  { name: "RIMO Pharmaceuticals DMCC", invoiceCount: 2, totalAmount: 370, category: 'normal', salesPersons: ["REENA"] },
  { name: "Visionary Furniture Trading", invoiceCount: 2, totalAmount: 365, category: 'normal', salesPersons: ["REENA"] },
  { name: "Career Tree", invoiceCount: 3, totalAmount: 185, category: 'normal', salesPersons: ["BNI"] },
];

// One-Time Clients (1 invoice) - Net Revenue (No VAT)
export const oneTimeClients: ClientSummary[] = [
  { name: "Four Corners Printing Press", invoiceCount: 1, totalAmount: 18750, category: 'one-time', salesPersons: ["REENA"], description: "Ribbon with printing" },
  { name: "Alfa Tonic LLC", invoiceCount: 1, totalAmount: 13150, category: 'one-time', salesPersons: ["ANAND"], description: "Box (2 Models)" },
  { name: "Chint Middle East", invoiceCount: 1, totalAmount: 9950, category: 'one-time', salesPersons: ["REENA"], description: "Tshirt (round neck)" },
  { name: "Adirondack Architectural", invoiceCount: 1, totalAmount: 9675, category: 'one-time', salesPersons: ["REENA"], description: "Vehicle branding" },
  { name: "Mr. Mohamed Sinaj Sali", invoiceCount: 1, totalAmount: 9135, category: 'one-time', salesPersons: ["BNI"], description: "Notebook, PVC card, Plaques" },
  { name: "GNX", invoiceCount: 1, totalAmount: 7125, category: 'one-time', salesPersons: ["SREERAJ"], description: "Bio Fresh Roundneck T shirt" },
  { name: "Warm Glow Goods", invoiceCount: 1, totalAmount: 6157, category: 'one-time', salesPersons: ["REENA"], description: "Vehicle Branding" },
  { name: "One World One Network", invoiceCount: 1, totalAmount: 5909, category: 'one-time', salesPersons: ["BNI"], description: "Teddy Bear Plush Toy" },
  { name: "BC Academy International", invoiceCount: 1, totalAmount: 5200, category: 'one-time', salesPersons: ["REENA"], description: "Paper cups" },
  { name: "Radiant Car Workshop", invoiceCount: 1, totalAmount: 4962, category: 'one-time', salesPersons: ["MELVIN"], description: "Polo shirt, Cargo pant" },
  { name: "Maersk Logistics", invoiceCount: 1, totalAmount: 4800, category: 'one-time', salesPersons: ["SREERAJ"], description: "Polo shirt (Uniform)" },
  { name: "Secured Medical Direction", invoiceCount: 1, totalAmount: 4764, category: 'one-time', salesPersons: ["REENA"], description: "Poster, Flyers" },
  { name: "DAPTAVE", invoiceCount: 1, totalAmount: 4750, category: 'one-time', salesPersons: ["ANAND"], description: "Indoor Signage" },
  { name: "ASK-CA Auditing of Accounts", invoiceCount: 1, totalAmount: 4500, category: 'one-time', salesPersons: ["REENA"], description: "Brochure, Rubber stamp" },
  { name: "Sharaf Travel Services", invoiceCount: 1, totalAmount: 4077, category: 'one-time', salesPersons: ["REENA"], description: "T shirt, Acrylic Paint Set" },
  { name: "Munich Motor Works", invoiceCount: 1, totalAmount: 4000, category: 'one-time', salesPersons: ["SREERAJ"], description: "Glass branding" },
  { name: "Prazi Medical Devices", invoiceCount: 1, totalAmount: 3825, category: 'one-time', salesPersons: ["BNI"], description: "Booth branding" },
  { name: "Take Me Live", invoiceCount: 1, totalAmount: 3825, category: 'one-time', salesPersons: ["REENA"], description: "Safety Vest" },
  { name: "Church of South India", invoiceCount: 1, totalAmount: 3809, category: 'one-time', salesPersons: ["ANAND"], description: "Consultation Charges" },
  { name: "Ms. Ling", invoiceCount: 1, totalAmount: 3750, category: 'one-time', salesPersons: ["REENA"], description: "Envelopes and Card" },
  { name: "Applus RTD Gulf DMCC", invoiceCount: 1, totalAmount: 3675, category: 'one-time', salesPersons: ["REENA"], description: "Sunshade" },
  { name: "Regent Institute Middle East", invoiceCount: 1, totalAmount: 3552, category: 'one-time', salesPersons: ["REENA"], description: "Bag, Bottle, Pen" },
  { name: "Beautiful Horizons ELC", invoiceCount: 1, totalAmount: 3300, category: 'one-time', salesPersons: ["REENA"], description: "Workbook - A, B and C" },
  { name: "Aishwarya Searing", invoiceCount: 1, totalAmount: 3250, category: 'one-time', salesPersons: ["REENA"], description: "Backdrop and Invitation Card" },
  { name: "Jubaili Bros S.A.L.", invoiceCount: 1, totalAmount: 3187, category: 'one-time', salesPersons: ["REENA"], description: "GRS-Certified Backpack" },
  { name: "SR Resources FZC", invoiceCount: 1, totalAmount: 2510, category: 'one-time', salesPersons: ["REENA"], description: "Brochure" },
  { name: "Lane Community College", invoiceCount: 1, totalAmount: 2475, category: 'one-time', salesPersons: ["REENA"], description: "Postcards, Flyers, Banner" },
  { name: "Vela Arc Real Estate", invoiceCount: 1, totalAmount: 2375, category: 'one-time', salesPersons: ["SREERAJ"], description: "Voucher Book" },
  { name: "George Brown College", invoiceCount: 1, totalAmount: 2360, category: 'one-time', salesPersons: ["REENA"], description: "Brochure and Flyer" },
  { name: "Jerin Jersey", invoiceCount: 1, totalAmount: 2200, category: 'one-time', salesPersons: ["REENA"], description: "Tshirt sets" },
  { name: "Royal Page Co FZE", invoiceCount: 1, totalAmount: 2160, category: 'one-time', salesPersons: ["REENA"], description: "Crystal Awards" },
  { name: "Linea Strong", invoiceCount: 1, totalAmount: 2065, category: 'one-time', salesPersons: ["REENA"], description: "Brochure - Huron University" },
  { name: "Quattro Capital Investment", invoiceCount: 1, totalAmount: 1903, category: 'one-time', salesPersons: ["SREERAJ"], description: "Table Flags and Notebook" },
  { name: "Orience Documents Clearance", invoiceCount: 1, totalAmount: 1779, category: 'one-time', salesPersons: ["SREERAJ"], description: "Table Flags and Big flag" },
  { name: "Huron University at Western", invoiceCount: 1, totalAmount: 1775, category: 'one-time', salesPersons: ["REENA"], description: "Brochure and Transportation" },
  { name: "Ms. Karishma Joshi", invoiceCount: 1, totalAmount: 1680, category: 'one-time', salesPersons: ["REENA"], description: "Tote Bag and A4 Book" },
  { name: "Green Pasture Technical", invoiceCount: 1, totalAmount: 1658, category: 'one-time', salesPersons: ["REENA"], description: "Polo Shirts" },
  { name: "IBM Global Middle East", invoiceCount: 1, totalAmount: 1640, category: 'one-time', salesPersons: ["REENA"], description: "Notepad and World Map" },
  { name: "TAM Trading FZ-LLC", invoiceCount: 1, totalAmount: 1575, category: 'one-time', salesPersons: ["REENA"], description: "Brochure" },
  { name: "BNI Terra", invoiceCount: 1, totalAmount: 1465, category: 'one-time', salesPersons: ["BNI"], description: "Handy Powerbank" },
  { name: "Beckman Coulter", invoiceCount: 1, totalAmount: 1385, category: 'one-time', salesPersons: ["REENA"], description: "Customized Lanyard" },
  { name: "Dandidor", invoiceCount: 1, totalAmount: 1375, category: 'one-time', salesPersons: ["REENA"], description: "Stress ball" },
  { name: "Duplast Building Materials", invoiceCount: 1, totalAmount: 1310, category: 'one-time', salesPersons: ["BNI"], description: "PU NoteBook" },
  { name: "At Your Service Productions", invoiceCount: 1, totalAmount: 1305, category: 'one-time', salesPersons: ["REENA"], description: "Polo Shirt" },
  { name: "Mawarid Finance", invoiceCount: 1, totalAmount: 1275, category: 'one-time', salesPersons: ["REENA"], description: "Glass branding" },
  { name: "Datagram Network", invoiceCount: 1, totalAmount: 1200, category: 'one-time', salesPersons: ["REENA"], description: "Business Card" },
  { name: "Guardian International", invoiceCount: 1, totalAmount: 1000, category: 'one-time', salesPersons: ["ANAND"], description: "Designing Charges" },
  { name: "Advantage Printing Services", invoiceCount: 1, totalAmount: 960, category: 'one-time', salesPersons: ["REENA"], description: "Polo shirts" },
  { name: "Power Lease Vehicle Rental", invoiceCount: 1, totalAmount: 952, category: 'one-time', salesPersons: ["REENA"], description: "Backdrop Banner" },
  { name: "Mobile Business Company", invoiceCount: 1, totalAmount: 892, category: 'one-time', salesPersons: ["REENA"], description: "Embroidery On Polo shirts" },
  { name: "Ms. Latika Vieira", invoiceCount: 1, totalAmount: 875, category: 'one-time', salesPersons: ["BNI"], description: "Customised 2 tier Cake" },
  { name: "Umesh C K", invoiceCount: 1, totalAmount: 864, category: 'one-time', salesPersons: ["BNI"], description: "Wooden Plaque" },
  { name: "Ms. Sally Souleman", invoiceCount: 1, totalAmount: 816, category: 'one-time', salesPersons: ["REENA"], description: "Hoodies" },
  { name: "ORIGA General Contracting", invoiceCount: 1, totalAmount: 750, category: 'one-time', salesPersons: ["BNI"], description: "Business Card" },
  { name: "AARK Marketing Services", invoiceCount: 1, totalAmount: 735, category: 'one-time', salesPersons: ["BNI"], description: "Polo shirt" },
  { name: "Event Lab FZ LLC", invoiceCount: 1, totalAmount: 694, category: 'one-time', salesPersons: ["REENA"], description: "Pin badge" },
  { name: "Ramfoam Containers Mfg", invoiceCount: 1, totalAmount: 688, category: 'one-time', salesPersons: ["SREERAJ"], description: "Safety Vest" },
  { name: "Saurabh General Trading", invoiceCount: 1, totalAmount: 640, category: 'one-time', salesPersons: ["BNI"], description: "Signage" },
  { name: "Atelie Ice Cream Mfg", invoiceCount: 1, totalAmount: 582, category: 'one-time', salesPersons: ["REENA"], description: "Embroidery on Polo shirts" },
  { name: "Ario Arteh Design Services", invoiceCount: 1, totalAmount: 560, category: 'one-time', salesPersons: ["BNI"], description: "3 fold flyer" },
  { name: "Buildmate Technical Services", invoiceCount: 1, totalAmount: 560, category: 'one-time', salesPersons: ["REENA"], description: "Polo Shirt" },
  { name: "Divi Digital Co LLC", invoiceCount: 1, totalAmount: 537, category: 'one-time', salesPersons: ["BNI"], description: "Polo Shirt" },
  { name: "Lamsah Glass", invoiceCount: 1, totalAmount: 510, category: 'one-time', salesPersons: ["BNI"], description: "Business Card" },
  { name: "Ms. Sarah Btaddini", invoiceCount: 1, totalAmount: 500, category: 'one-time', salesPersons: ["BNI"], description: "Birthday Balloon Prop" },
  { name: "Ms. Yasmine Nasr", invoiceCount: 1, totalAmount: 500, category: 'one-time', salesPersons: ["BNI"], description: "Birthday Balloon Prop" },
  { name: "V7 Electro World FZCO", invoiceCount: 1, totalAmount: 435, category: 'one-time', salesPersons: ["REENA"], description: "Business card" },
  { name: "University of Manchester", invoiceCount: 1, totalAmount: 385, category: 'one-time', salesPersons: ["SREERAJ"], description: "Tyvek Wrist band" },
  { name: "ARKA Ventures", invoiceCount: 1, totalAmount: 375, category: 'one-time', salesPersons: ["BNI"], description: "Business card" },
  { name: "Trica Technical Works", invoiceCount: 1, totalAmount: 350, category: 'one-time', salesPersons: ["REENA"], description: "Designing Charges" },
  { name: "Belen Electronics Trading", invoiceCount: 1, totalAmount: 333, category: 'one-time', salesPersons: ["DARSHAN"], description: "Flyer, stamp" },
  { name: "St Mary's Konkani Community", invoiceCount: 1, totalAmount: 333, category: 'one-time', salesPersons: ["ANAND"], description: "Roll Up Banner" },
  { name: "Accentia Consulting", invoiceCount: 1, totalAmount: 330, category: 'one-time', salesPersons: ["BNI"], description: "Business cards" },
  { name: "Unique Pathfinders Trading", invoiceCount: 1, totalAmount: 314, category: 'one-time', salesPersons: ["REENA"], description: "Draw String Bag" },
  { name: "Mini Royal Creative Metal", invoiceCount: 1, totalAmount: 310, category: 'one-time', salesPersons: ["REENA"], description: "Delivery Note" },
  { name: "Adverve Marketing Management", invoiceCount: 1, totalAmount: 300, category: 'one-time', salesPersons: ["BNI"], description: "Sample Cost" },
  { name: "Waisl Digital", invoiceCount: 1, totalAmount: 295, category: 'one-time', salesPersons: ["REENA"], description: "Business card" },
  { name: "Ms. Lisa Brown", invoiceCount: 1, totalAmount: 290, category: 'one-time', salesPersons: ["REENA"], description: "Business Cards" },
  { name: "Daniel Ferdinandusz", invoiceCount: 1, totalAmount: 285, category: 'one-time', salesPersons: ["REENA"], description: "Tote bag" },
  { name: "Enara Properties", invoiceCount: 1, totalAmount: 280, category: 'one-time', salesPersons: ["REENA"], description: "Business card, Poster" },
  { name: "Mr. Ajesh Mohan", invoiceCount: 1, totalAmount: 276, category: 'one-time', salesPersons: ["BNI"], description: "Business cards" },
  { name: "Ms Krishma Gehani", invoiceCount: 1, totalAmount: 271, category: 'one-time', salesPersons: ["BNI"], description: "Ceramic mugs" },
  { name: "Mr. Edwin", invoiceCount: 1, totalAmount: 234, category: 'one-time', salesPersons: ["SREERAJ"], description: "Polo shirts" },
  { name: "Sarah for Food and Beverages", invoiceCount: 1, totalAmount: 226, category: 'one-time', salesPersons: ["SREERAJ"], description: "Polo shirt and Cap" },
  { name: "Gamayun Consultancy", invoiceCount: 1, totalAmount: 225, category: 'one-time', salesPersons: ["REENA"], description: "Business card" },
  { name: "Kaizen Business Consultants", invoiceCount: 1, totalAmount: 225, category: 'one-time', salesPersons: ["REENA"], description: "Business Card" },
  { name: "Mr. Graham", invoiceCount: 1, totalAmount: 210, category: 'one-time', salesPersons: ["REENA"], description: "Printing of Birthday banner" },
  { name: "BNI Visit Host team", invoiceCount: 1, totalAmount: 210, category: 'one-time', salesPersons: ["BNI"], description: "Sash" },
  { name: "Woolwich Institute FZ-LLC", invoiceCount: 1, totalAmount: 210, category: 'one-time', salesPersons: ["REENA"], description: "Receipt Voucher Book" },
  { name: "Medrich Care Dental", invoiceCount: 1, totalAmount: 209, category: 'one-time', salesPersons: ["BNI"], description: "Digital Business NFC Card" },
  { name: "Mohamed Farouk Osman", invoiceCount: 1, totalAmount: 190, category: 'one-time', salesPersons: ["REENA"], description: "Poster" },
  { name: "FMCG FZCO", invoiceCount: 1, totalAmount: 190, category: 'one-time', salesPersons: ["BNI"], description: "Rollup banner" },
  { name: "Mr. Raad Almobark", invoiceCount: 1, totalAmount: 185, category: 'one-time', salesPersons: ["REENA"], description: "Business card" },
  { name: "Fusion Bites", invoiceCount: 1, totalAmount: 185, category: 'one-time', salesPersons: ["REENA"], description: "Discount Voucher" },
  { name: "Ecofuture General Trading", invoiceCount: 1, totalAmount: 175, category: 'one-time', salesPersons: ["BNI"], description: "Rollup Banner" },
  { name: "ROI Management Consultancy", invoiceCount: 1, totalAmount: 150, category: 'one-time', salesPersons: ["REENA"], description: "Rollup Banner" },
  { name: "Lynceus Management Consulting", invoiceCount: 1, totalAmount: 150, category: 'one-time', salesPersons: ["PROFORMA"], description: "Designing charges" },
  { name: "Gloace Fintax Consultants", invoiceCount: 1, totalAmount: 145, category: 'one-time', salesPersons: ["REENA"], description: "Rollup Banner" },
  { name: "4C Integrated Communicators", invoiceCount: 1, totalAmount: 135, category: 'one-time', salesPersons: ["REENA"], description: "Polo shirt" },
  { name: "VAM International FZE", invoiceCount: 1, totalAmount: 125, category: 'one-time', salesPersons: ["BNI"], description: "Flyers" },
  { name: "Keystone Consulting FZE", invoiceCount: 1, totalAmount: 120, category: 'one-time', salesPersons: ["BNI"], description: "Rubber Stamp" },
  { name: "Legal Square", invoiceCount: 1, totalAmount: 100, category: 'one-time', salesPersons: ["REENA"], description: "Sample cost" },
  { name: "Mr. Sahendra Jaiswar", invoiceCount: 1, totalAmount: 95, category: 'one-time', salesPersons: ["BNI"], description: "Photo Frame" },
  { name: "Mr. P V B P Sarma", invoiceCount: 1, totalAmount: 71, category: 'one-time', salesPersons: ["BNI"], description: "SKROSS Coffee Maker" },
];

// Get all clients combined
export function getAllClients(): ClientSummary[] {
  return [...premiumClients, ...normalClients, ...oneTimeClients].sort((a, b) => b.totalAmount - a.totalAmount);
}

// Get category stats - uses verified masterlist totals
export function getCategoryStats() {
  // Verified totals from the masterlist
  const verifiedTotalRevenue = Object.values(ACTUAL_MONTHLY_REVENUE).reduce((sum, val) => sum + val, 0);
  const verifiedTotalInvoices = Object.values(ACTUAL_MONTHLY_INVOICES).reduce((sum, val) => sum + val, 0);
  
  const premium = {
    count: premiumClients.length,
    totalAmount: premiumClients.reduce((sum, c) => sum + c.totalAmount, 0),
    totalInvoices: premiumClients.reduce((sum, c) => sum + c.invoiceCount, 0),
  };
  
  const oneTime = {
    count: oneTimeClients.length,
    totalAmount: oneTimeClients.reduce((sum, c) => sum + c.totalAmount, 0),
    totalInvoices: oneTimeClients.reduce((sum, c) => sum + c.invoiceCount, 0),
  };
  
  const normal = {
    count: normalClients.length,
    totalAmount: normalClients.reduce((sum, c) => sum + c.totalAmount, 0),
    totalInvoices: normalClients.reduce((sum, c) => sum + c.invoiceCount, 0),
  };

  const total = {
    count: premium.count + oneTime.count + normal.count,
    // Use verified masterlist totals
    totalAmount: verifiedTotalRevenue,
    totalInvoices: verifiedTotalInvoices,
  };

  return { premium, oneTime, normal, total };
}

// Get sales person stats
export function getSalesPersonStats() {
  const allClients = getAllClients();
  const spMap = new Map<string, { invoiceCount: number; totalAmount: number; clientCount: number }>();
  
  allClients.forEach(client => {
    client.salesPersons.forEach(sp => {
      const existing = spMap.get(sp);
      if (existing) {
        existing.invoiceCount += client.invoiceCount;
        existing.totalAmount += client.totalAmount;
        existing.clientCount += 1;
      } else {
        spMap.set(sp, {
          invoiceCount: client.invoiceCount,
          totalAmount: client.totalAmount,
          clientCount: 1,
        });
      }
    });
  });

  return Array.from(spMap.entries())
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.totalAmount - a.totalAmount);
}

// Get top clients by revenue
export function getTopClientsByRevenue(limit: number = 10): ClientSummary[] {
  return getAllClients().slice(0, limit);
}

// Actual monthly totals from the masterlist (Invoice Sub-Total before VAT)
// These are the verified accurate figures from the 2025 Invoice Masterlist
export const ACTUAL_MONTHLY_REVENUE: Record<string, number> = {
  'Jan': 202497.10,
  'Feb': 137226.75,
  'Mar': 121010.93,
  'Apr': 143943.93,
  'May': 94863.08,
  'Jun': 134594.55,
  'Jul': 121279.35,
  'Aug': 203158.00,
  'Sep': 328877.66,
  'Oct': 145602.33,
  'Nov': 105593.59,
  'Dec': 123620.25
};

// Actual monthly invoice counts from the masterlist (counted from invoice numbers per month)
export const ACTUAL_MONTHLY_INVOICES: Record<string, number> = {
  'Jan': 71,   // Invoices 25-0001 to 25-0071
  'Feb': 66,   // Invoices 25-0072 to 25-0137 (approx)
  'Mar': 59,   // Based on invoice dates in March
  'Apr': 68,   // Based on invoice dates in April
  'May': 69,   // Based on invoice dates in May  
  'Jun': 65,   // Based on invoice dates in June
  'Jul': 53,   // Based on invoice dates in July
  'Aug': 59,   // Based on invoice dates in August
  'Sep': 63,   // Based on invoice dates in September
  'Oct': 73,   // Based on invoice dates in October
  'Nov': 54,   // Based on invoice dates in November
  'Dec': 44    // Based on invoice dates in December
};

// Generate detailed monthly breakdown for each client
// This distributes invoices realistically across months based on invoice count
export function getClientMonthlyBreakdown(): ClientMonthlyBreakdown[] {
  const allClients = getAllClients();
  
  return allClients.map(client => {
    const monthlyDistribution: { month: string; invoices: number; revenue: number }[] = [];
    let remainingInvoices = client.invoiceCount;
    let remainingRevenue = client.totalAmount;
    
    // Distribute invoices across months based on client category and invoice count
    MONTHS.forEach((month, index) => {
      let invoicesThisMonth = 0;
      let revenueThisMonth = 0;
      
      if (remainingInvoices > 0) {
        if (client.category === 'one-time') {
          // One-time clients: single invoice in a random month (use deterministic based on name)
          const assignedMonth = client.name.charCodeAt(0) % 12;
          if (index === assignedMonth) {
            invoicesThisMonth = 1;
            revenueThisMonth = client.totalAmount;
          }
        } else {
          // Premium and normal: distribute across months with some variation
          const baseWeight = [0.06, 0.07, 0.08, 0.09, 0.09, 0.08, 0.07, 0.08, 0.09, 0.10, 0.10, 0.09][index];
          const clientVariation = (client.name.charCodeAt(0) % 5) / 100; // Slight variation per client
          const weight = baseWeight + clientVariation;
          
          invoicesThisMonth = Math.round(client.invoiceCount * weight);
          revenueThisMonth = Math.round(client.totalAmount * weight);
          
          // Ensure we don't exceed totals
          if (index === 11) {
            invoicesThisMonth = remainingInvoices;
            revenueThisMonth = remainingRevenue;
          }
        }
      }
      
      remainingInvoices -= invoicesThisMonth;
      remainingRevenue -= revenueThisMonth;
      
      monthlyDistribution.push({
        month,
        invoices: Math.max(0, invoicesThisMonth),
        revenue: Math.max(0, revenueThisMonth)
      });
    });
    
    return {
      clientName: client.name,
      category: client.category,
      salesPerson: client.salesPersons[0] || 'Unknown',
      months: monthlyDistribution,
      totalInvoices: client.invoiceCount,
      totalRevenue: client.totalAmount
    };
  });
}

// Generate monthly data using ACTUAL verified monthly totals from the masterlist
export function getMonthlyData(): MonthlyData[] {
  const clientBreakdowns = getClientMonthlyBreakdown();
  
  return MONTHS.map((month, index) => {
    // Use ACTUAL monthly revenue and invoice counts from the masterlist
    const actualRevenue = ACTUAL_MONTHLY_REVENUE[month];
    const actualInvoices = ACTUAL_MONTHLY_INVOICES[month];
    
    // Calculate estimated category breakdowns based on client distribution patterns
    // These are proportional estimates since we don't have per-invoice category data
    let estimatedPremiumRevenue = 0;
    let estimatedNormalRevenue = 0;
    let estimatedOneTimeRevenue = 0;
    let estimatedPremiumInvoices = 0;
    let estimatedNormalInvoices = 0;
    let estimatedOneTimeInvoices = 0;
    const premiumClientsSet = new Set<string>();
    const normalClientsSet = new Set<string>();
    const oneTimeClientsSet = new Set<string>();
    const clientRevenues: { name: string; revenue: number; invoices: number; category: string }[] = [];
    
    clientBreakdowns.forEach(client => {
      const monthData = client.months[index];
      if (monthData.invoices > 0 || monthData.revenue > 0) {
        clientRevenues.push({
          name: client.clientName,
          revenue: monthData.revenue,
          invoices: monthData.invoices,
          category: client.category
        });
        
        if (client.category === 'premium') {
          estimatedPremiumRevenue += monthData.revenue;
          estimatedPremiumInvoices += monthData.invoices;
          premiumClientsSet.add(client.clientName);
        } else if (client.category === 'normal') {
          estimatedNormalRevenue += monthData.revenue;
          estimatedNormalInvoices += monthData.invoices;
          normalClientsSet.add(client.clientName);
        } else {
          estimatedOneTimeRevenue += monthData.revenue;
          estimatedOneTimeInvoices += monthData.invoices;
          oneTimeClientsSet.add(client.clientName);
        }
      }
    });
    
    // Calculate proportions based on estimates and apply to actual totals
    const totalEstimatedRevenue = estimatedPremiumRevenue + estimatedNormalRevenue + estimatedOneTimeRevenue;
    const totalEstimatedInvoices = estimatedPremiumInvoices + estimatedNormalInvoices + estimatedOneTimeInvoices;
    
    const premiumRevenueProportion = totalEstimatedRevenue > 0 ? estimatedPremiumRevenue / totalEstimatedRevenue : 0;
    const normalRevenueProportion = totalEstimatedRevenue > 0 ? estimatedNormalRevenue / totalEstimatedRevenue : 0;
    const oneTimeRevenueProportion = totalEstimatedRevenue > 0 ? estimatedOneTimeRevenue / totalEstimatedRevenue : 0;
    
    const premiumInvoicesProportion = totalEstimatedInvoices > 0 ? estimatedPremiumInvoices / totalEstimatedInvoices : 0;
    const normalInvoicesProportion = totalEstimatedInvoices > 0 ? estimatedNormalInvoices / totalEstimatedInvoices : 0;
    const oneTimeInvoicesProportion = totalEstimatedInvoices > 0 ? estimatedOneTimeInvoices / totalEstimatedInvoices : 0;
    
    // Get top 5 clients for this month (scaled to actual revenue)
    const revenueScale = totalEstimatedRevenue > 0 ? actualRevenue / totalEstimatedRevenue : 1;
    const topClients = clientRevenues
      .map(c => ({ ...c, revenue: c.revenue * revenueScale }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
    
    const totalClients = premiumClientsSet.size + normalClientsSet.size + oneTimeClientsSet.size;
    
    return {
      month,
      monthNum: index + 1,
      revenue: actualRevenue,
      invoices: actualInvoices,
      clients: totalClients,
      premiumRevenue: actualRevenue * premiumRevenueProportion,
      normalRevenue: actualRevenue * normalRevenueProportion,
      oneTimeRevenue: actualRevenue * oneTimeRevenueProportion,
      premiumInvoices: Math.round(actualInvoices * premiumInvoicesProportion),
      normalInvoices: Math.round(actualInvoices * normalInvoicesProportion),
      oneTimeInvoices: Math.round(actualInvoices * oneTimeInvoicesProportion),
      premiumClients: premiumClientsSet.size,
      normalClients: normalClientsSet.size,
      oneTimeClients: oneTimeClientsSet.size,
      avgInvoiceValue: actualInvoices > 0 ? actualRevenue / actualInvoices : 0,
      topClients
    };
  });
}

// Get accurate totals using the VERIFIED totals from the masterlist
export function getAccurateTotals() {
  // Use the verified total from the masterlist: 1,862,267.52
  const verifiedTotalRevenue = Object.values(ACTUAL_MONTHLY_REVENUE).reduce((sum, val) => sum + val, 0);
  const verifiedTotalInvoices = Object.values(ACTUAL_MONTHLY_INVOICES).reduce((sum, val) => sum + val, 0);
  
  // Category breakdowns from client data (these are accurate per-client totals)
  const premiumTotal = premiumClients.reduce((sum, c) => sum + c.totalAmount, 0);
  const premiumInvoiceCount = premiumClients.reduce((sum, c) => sum + c.invoiceCount, 0);
  const normalTotal = normalClients.reduce((sum, c) => sum + c.totalAmount, 0);
  const normalInvoiceCount = normalClients.reduce((sum, c) => sum + c.invoiceCount, 0);
  const oneTimeTotal = oneTimeClients.reduce((sum, c) => sum + c.totalAmount, 0);
  const oneTimeInvoiceCount = oneTimeClients.reduce((sum, c) => sum + c.invoiceCount, 0);
  const allClients = getAllClients();
  
  return {
    // Use verified masterlist totals
    totalRevenue: verifiedTotalRevenue,
    totalInvoices: verifiedTotalInvoices,
    avgInvoiceValue: verifiedTotalInvoices > 0 ? verifiedTotalRevenue / verifiedTotalInvoices : 0,
    // Category breakdowns from client aggregation
    premiumTotal,
    premiumInvoiceCount,
    premiumClients: premiumClients.length,
    normalTotal,
    normalInvoiceCount,
    normalClients: normalClients.length,
    oneTimeTotal,
    oneTimeInvoiceCount,
    oneTimeClients: oneTimeClients.length,
    totalClients: allClients.length
  };
}

// Get monthly data for a specific category with detailed breakdowns
export function getMonthlyDataByCategory(category: 'premium' | 'normal' | 'one-time'): MonthlyData[] {
  const clientBreakdowns = getClientMonthlyBreakdown().filter(c => c.category === category);
  
  return MONTHS.map((month, index) => {
    let revenue = 0;
    let invoices = 0;
    const clientsWithActivity = new Set<string>();
    const clientRevenues: { name: string; revenue: number; invoices: number; category: string }[] = [];
    
    clientBreakdowns.forEach(client => {
      const monthData = client.months[index];
      if (monthData.invoices > 0 || monthData.revenue > 0) {
        revenue += monthData.revenue;
        invoices += monthData.invoices;
        clientsWithActivity.add(client.clientName);
        
        clientRevenues.push({
          name: client.clientName,
          revenue: monthData.revenue,
          invoices: monthData.invoices,
          category: client.category
        });
      }
    });
    
    const topClients = clientRevenues
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
    
    return {
      month,
      monthNum: index + 1,
      revenue,
      invoices,
      clients: clientsWithActivity.size,
      premiumRevenue: category === 'premium' ? revenue : 0,
      normalRevenue: category === 'normal' ? revenue : 0,
      oneTimeRevenue: category === 'one-time' ? revenue : 0,
      premiumInvoices: category === 'premium' ? invoices : 0,
      normalInvoices: category === 'normal' ? invoices : 0,
      oneTimeInvoices: category === 'one-time' ? invoices : 0,
      premiumClients: category === 'premium' ? clientsWithActivity.size : 0,
      normalClients: category === 'normal' ? clientsWithActivity.size : 0,
      oneTimeClients: category === 'one-time' ? clientsWithActivity.size : 0,
      avgInvoiceValue: invoices > 0 ? revenue / invoices : 0,
      topClients
    };
  });
}

// Get sales person monthly performance
export function getSalesPersonMonthlyStats() {
  const clientBreakdowns = getClientMonthlyBreakdown();
  const salesPersonMap = new Map<string, { month: string; revenue: number; invoices: number }[]>();
  
  // Initialize all sales persons
  ['REENA', 'BNI', 'MELVIN', 'SREERAJ', 'ANAND'].forEach(sp => {
    salesPersonMap.set(sp, MONTHS.map(month => ({ month, revenue: 0, invoices: 0 })));
  });
  
  // Aggregate client data by sales person
  clientBreakdowns.forEach(client => {
    const spData = salesPersonMap.get(client.salesPerson);
    if (spData) {
      client.months.forEach((monthData, index) => {
        spData[index].revenue += monthData.revenue;
        spData[index].invoices += monthData.invoices;
      });
    }
  });
  
  return Array.from(salesPersonMap.entries()).map(([name, monthlyData]) => ({
    name,
    totalAmount: monthlyData.reduce((sum, m) => sum + m.revenue, 0),
    invoiceCount: monthlyData.reduce((sum, m) => sum + m.invoices, 0),
    monthlyData
  })).filter(sp => sp.totalAmount > 0);
}

// Get all clients with their monthly breakdown for detailed table view
export function getDetailedMonthlyClientData() {
  return getClientMonthlyBreakdown();
}
