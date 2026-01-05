import type { MonthlyData } from "@/data/clientData";

export interface MasterlistAggregates2023 {
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

// ========== EXACT 2023 MONTHLY DATA (from user-provided masterlist) ==========
// All values are pre-VAT (WITHOUT VAT) as per the masterlist

// Premium clients (6+ invoices) - monthly revenue breakdown
const PREMIUM_CLIENTS_MONTHLY = [
  { name: "IDP Education (Merged)", monthly: [8948.50, 45760.74, 31699.00, 874.50, 8532.50, 360.00, 50462.75, 15986.50, 158884.20, 20321.10, 2769.00, 30560.05], total: 375158.84, invoices: 56 },
  { name: "Stellar Advertising LLC", monthly: [35742.00, 42350.00, 17294.00, 50671.50, 26157.95, 57980.00, 18755.00, 21762.50, 13098.00, 41175.00, 14166.00, 4565.00], total: 343716.95, invoices: 171 },
  { name: "Navitas / Murdoch (Merged)", monthly: [0, 0, 0, 0, 9851.00, 1090.50, 28382.00, 19775.00, 26931.50, 5844.00, 7172.00, 600.00], total: 99646.00, invoices: 35 },
  { name: "DUNECREST AMERICAN SCHOOL", monthly: [0, 0, 0, 0, 2975.00, 0, 0, 49418.00, 18137.00, 0, 0, 0], total: 70530.00, invoices: 8 },
  { name: "Trane BVBA (Merged)", monthly: [810.00, 8593.50, 2070.00, 2800.00, 3995.00, 405.00, 3360.00, 3995.00, 6570.00, 11555.00, 3760.00, 750.00], total: 48663.50, invoices: 44 },
  { name: "Connect Resources", monthly: [0, 450.00, 19300.00, 5800.00, 0, 0, 0, 0, 22655.00, 0, 0, 0], total: 48205.00, invoices: 6 },
  { name: "Huxley Associates Global", monthly: [0, 2720.00, 19415.00, 5645.00, 760.00, 0, 0, 1575.00, 0, 0, 11537.50, 3400.00], total: 45052.50, invoices: 15 },
  { name: "Continental ME DMCC", monthly: [1694.00, 5680.00, 31831.00, 1750.00, 0, 0, 0, 0, 0, 0, 0, 0], total: 40955.00, invoices: 8 },
  { name: "JUBAILI BROS S.A.L.", monthly: [14250.00, 750.00, 19175.00, 0, 0, 0, 3450.00, 0, 0, 0, 0, 3000.00], total: 40625.00, invoices: 6 },
  { name: "GrokGlobal Services (Merged)", monthly: [4815.00, 0, 0, 0, 0, 0, 0, 0, 740.00, 28510.00, 0, 0], total: 34065.00, invoices: 6 },
  { name: "Continental Middle East DMCC", monthly: [0, 0, 0, 0, 0, 0, 1450.00, 3900.00, 0, 24200.00, 0, 0], total: 29550.00, invoices: 5 },
  { name: "Gulftainer", monthly: [0, 1400.00, 10037.50, 8225.00, 0, 0, 0, 0, 5858.75, 0, 0, 0], total: 25521.25, invoices: 9 },
  { name: "Tappy Toes Nursery DWC-LLC", monthly: [0, 0, 0, 0, 0, 0, 20500.00, 0, 0, 4010.00, 0, 0], total: 24510.00, invoices: 2 },
  { name: "Unique World Business Centre", monthly: [0, 870.00, 405.00, 510.00, 240.00, 270.00, 345.00, 0, 405.00, 180.00, 420.00, 90.00], total: 3735.00, invoices: 22 },
  { name: "RIF TRUST INVESTMENTS", monthly: [0, 0, 2200.00, 960.00, 2255.00, 4690.00, 1690.00, 1045.00, 1014.00, 0, 6482.00, 0], total: 20336.00, invoices: 14 },
  { name: "MEINHARDT (SINGAPORE)", monthly: [0, 7300.00, 0, 0, 9570.00, 500.00, 0, 0, 2113.00, 768.00, 0, 0], total: 20251.00, invoices: 10 },
  { name: "ANB AUTOMOBILES (Merged)", monthly: [875.00, 150.00, 0, 3800.00, 3685.00, 0, 0, 0, 860.00, 14785.00, 4546.00, 0], total: 28701.00, invoices: 13 },
  { name: "Beyond Infinity Real Estate", monthly: [4545.00, 2980.00, 310.00, 0, 803.55, 0, 0, 11275.00, 0, 0, 0, 0], total: 19913.55, invoices: 9 },
  { name: "Ingersoll-Rand", monthly: [130.00, 0, 7360.00, 0, 641.00, 180.00, 0, 0, 560.00, 8960.00, 180.00, 285.00], total: 18296.00, invoices: 10 },
  { name: "CLARION SCHOOL", monthly: [0, 0, 0, 0, 0, 0, 7549.80, 5860.00, 970.50, 1882.50, 725.00, 0], total: 16987.80, invoices: 7 },
  { name: "MIRA REAL ESTATE BROKERS", monthly: [2125.00, 0, 2345.00, 3650.00, 7380.00, 0, 780.00, 0, 0, 0, 0, 0], total: 16280.00, invoices: 6 },
  { name: "LOGIC UTILITIES (Merged)", monthly: [0, 6925.00, 6305.00, 1060.00, 0, 0, 0, 420.00, 0, 660.00, 7000.00, 0], total: 22370.00, invoices: 9 },
  { name: "WAQAR HUMAN RESOURCES", monthly: [0, 0, 0, 0, 0, 0, 0, 3269.00, 0, 3877.75, 1165.00, 6000.00], total: 14311.75, invoices: 7 },
  { name: "SPECIALISED SPORTS EQUIPMENT", monthly: [0, 0, 0, 0, 0, 0, 900.00, 0, 1694.74, 3990.00, 4610.00, 750.00], total: 11944.74, invoices: 9 },
  { name: "The Woolwich Institute", monthly: [8150.00, 847.50, 0, 0, 1050.00, 0, 0, 0, 1350.00, 0, 0, 0], total: 11397.50, invoices: 6 },
  { name: "Ausnutria Nutrition", monthly: [0, 1360.00, 3260.00, 0, 0, 0, 590.00, 0, 0, 1180.00, 3750.00, 0], total: 10140.00, invoices: 6 },
  { name: "HOLO MORTGAGE CONSULTANT", monthly: [0, 200.00, 1790.00, 0, 0, 750.00, 0, 1570.00, 580.00, 0, 530.00, 0], total: 5420.00, invoices: 9 },
  { name: "Bianca and Bianco Trading", monthly: [0, 550.00, 375.00, 0, 310.00, 0, 690.00, 0, 0, 2725.00, 825.00, 850.00], total: 6325.00, invoices: 10 },
  { name: "Global Connect", monthly: [0, 0, 0, 90.00, 330.00, 0, 0, 800.00, 380.00, 3950.00, 265.00, 0], total: 5815.00, invoices: 8 },
  { name: "FAD Institute", monthly: [1125.00, 2620.00, 0, 0, 2190.00, 129.50, 72.00, 49.50, 600.00, 0, 0, 0], total: 6786.00, invoices: 9 },
  { name: "AL RASHED UNITED DMCC", monthly: [1275.00, 1725.00, 300.00, 275.00, 0, 0, 0, 0, 700.00, 1566.67, 1065.00, 0], total: 6906.67, invoices: 9 },
  { name: "Merit Freight Systems", monthly: [0, 395.00, 0, 0, 0, 1800.00, 800.00, 1480.00, 0, 0, 0, 1810.00], total: 6285.00, invoices: 6 },
  { name: "EMIRATES FOR UNIVERSAL TYRES", monthly: [495.00, 0, 0, 0, 0, 0, 550.00, 275.00, 3077.50, 525.00, 0, 950.00], total: 5872.50, invoices: 10 },
  { name: "SPH Global Holdings", monthly: [0, 0, 960.00, 1435.00, 0, 0, 2775.00, 0, 0, 0, 0, 3694.50], total: 8864.50, invoices: 6 },
  { name: "Arabian Equipment Rental", monthly: [590.00, 0, 0, 1540.00, 0, 1380.00, 0, 0, 0, 325.00, 812.50, 0], total: 4647.50, invoices: 7 },
  { name: "BMC SOFTWARE LIMITED", monthly: [0, 0, 0, 0, 1475.00, 240.00, 2268.00, 0, 0, 240.00, 300.00, 0], total: 4523.00, invoices: 6 },
];

// Normal clients (2-5 invoices) - monthly revenue breakdown
const NORMAL_CLIENTS_MONTHLY = [
  { name: "United Arab Bank", monthly: [0, 0, 0, 0, 0, 0, 0, 27748.00, 27050.00, 33276.00, 0, 0], total: 88074.00, invoices: 5 },
  { name: "VL MEA Marketing Management", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 25575.00, 875.00, 29388.00], total: 55838.00, invoices: 4 },
  { name: "PLUS971 CYBER SECURITY", monthly: [0, 0, 32350.00, 0, 0, 3375.00, 0, 0, 0, 0, 0, 0], total: 35725.00, invoices: 2 },
  { name: "Azalee Flower Boutique", monthly: [4800.00, 5750.00, 0, 0, 12300.00, 0, 0, 0, 0, 0, 12670.00, 0], total: 35520.00, invoices: 5 },
  { name: "Art Indulgence", monthly: [0, 0, 8800.00, 0, 22560.00, 0, 0, 0, 0, 0, 0, 0], total: 31360.00, invoices: 2 },
  { name: "CACOGES", monthly: [0, 5500.00, 0, 0, 0, 0, 0, 0, 8000.00, 0, 0, 13875.00], total: 27375.00, invoices: 3 },
  { name: "Master Builders Solutions", monthly: [0, 25556.25, 1205.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 26761.25, invoices: 2 },
  { name: "Mayer Brown LLP", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 25614.00, 0, 0], total: 25614.00, invoices: 5 },
  { name: "Saint Vincent Group", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 24552.00, 0, 180.00, 0], total: 24732.00, invoices: 2 },
  { name: "Binghatti Developers FZE", monthly: [0, 0, 0, 0, 0, 0, 0, 23000.00, 1150.00, 0, 0, 0], total: 24150.00, invoices: 2 },
  { name: "PARAGON PROPERTIES", monthly: [1300.00, 10550.00, 0, 0, 0, 0, 0, 0, 9000.00, 0, 0, 0], total: 20850.00, invoices: 4 },
  { name: "ALI ASGER & BROTHERS", monthly: [11275.00, 1530.00, 0, 0, 4600.00, 0, 0, 0, 0, 0, 0, 0], total: 17405.00, invoices: 4 },
  { name: "Sesderma ME", monthly: [0, 12910.00, 4155.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 17065.00, invoices: 3 },
  { name: "Tulipa Landscaping", monthly: [0, 0, 525.00, 0, 0, 0, 0, 0, 14000.00, 0, 0, 0], total: 14525.00, invoices: 3 },
  { name: "VL MEA Marketing (HACH)", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 12050.00, 0, 0, 0], total: 12050.00, invoices: 2 },
  { name: "DYNAMIC EMPLOYMENT SERVICES", monthly: [0, 0, 0, 1387.50, 1085.00, 0, 0, 4400.00, 0, 0, 4400.00, 0], total: 11272.50, invoices: 5 },
  { name: "IBM Global Middle East", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 9575.00, 0, 0], total: 9575.00, invoices: 2 },
  { name: "Theatre of Digital Art", monthly: [0, 0, 0, 0, 0, 0, 0, 9225.00, 0, 0, 0, 0], total: 9225.00, invoices: 1 },
  { name: "MAXHEALTH MONDIAL", monthly: [0, 0, 0, 0, 0, 0, 0, 2650.00, 6155.00, 0, 0, 0], total: 8805.00, invoices: 2 },
  { name: "Ms. Justine Morris (DEAKIN)", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 8600.00, 0, 0, 0], total: 8600.00, invoices: 1 },
  { name: "Momentum Logistics", monthly: [0, 0, 7837.50, 0, 0, 0, 0, 0, 698.75, 0, 0, 0], total: 8536.25, invoices: 3 },
  { name: "Secured Medical Direction", monthly: [2020.00, 1260.00, 0, 0, 775.00, 0, 0, 0, 0, 0, 4453.00, 0], total: 8508.00, invoices: 4 },
  { name: "Radiometer Medical", monthly: [0, 2000.00, 0, 0, 0, 0, 0, 0, 0, 0, 3490.00, 2500.00], total: 7990.00, invoices: 3 },
  { name: "Aurantius Real Estate", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1250.00, 1390.00, 4555.00], total: 7195.00, invoices: 7 },
  { name: "MAERSK LOGISTICS", monthly: [0, 0, 2015.00, 825.00, 0, 1350.00, 0, 2525.00, 0, 0, 0, 0], total: 6715.00, invoices: 4 },
  { name: "GRANDDUBAI GLASS (Merged)", monthly: [0, 0, 0, 1668.00, 0, 0, 3200.00, 925.00, 0, 0, 0, 0], total: 5793.00, invoices: 4 },
  { name: "M E A D Medical Supplies", monthly: [0, 0, 1600.00, 0, 0, 2750.00, 0, 0, 0, 0, 1410.00, 0], total: 5760.00, invoices: 4 },
  { name: "MRG", monthly: [4975.00, 310.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 5285.00, invoices: 3 },
  { name: "Yantee", monthly: [0, 0, 0, 2585.00, 2650.00, 0, 0, 0, 0, 0, 0, 0], total: 5235.00, invoices: 3 },
  { name: "PMG Agency FZ-LLC", monthly: [4525.00, 400.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 4925.00, invoices: 4 },
  { name: "AMK International DMCC", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4645.00, 0, 0], total: 4645.00, invoices: 2 },
  { name: "SEL Car Rental", monthly: [0, 585.00, 0, 0, 0, 1585.00, 0, 125.00, 0, 238.00, 0, 2050.00], total: 4583.00, invoices: 5 },
  { name: "Argus Media Limited", monthly: [0, 0, 0, 0, 0, 0, 0, 3960.00, 475.00, 0, 0, 0], total: 4435.00, invoices: 2 },
  { name: "RV Gulf", monthly: [0, 0, 810.00, 0, 3286.00, 0, 0, 0, 0, 0, 0, 0], total: 4096.00, invoices: 4 },
  { name: "Qashio", monthly: [0, 0, 990.00, 0, 0, 0, 0, 3060.00, 0, 0, 0, 0], total: 4050.00, invoices: 2 },
  { name: "KHF AUTOMOTIVE SERVICE", monthly: [0, 495.00, 3432.50, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 3927.50, invoices: 2 },
  { name: "Dubai Academic Health", monthly: [0, 0, 0, 2325.00, 0, 1420.00, 0, 0, 0, 0, 0, 0], total: 3745.00, invoices: 3 },
  { name: "DHR MENA FZ-LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 2718.75, 0, 1003.00, 0, 0], total: 3721.75, invoices: 2 },
  { name: "Munich Motor Works", monthly: [0, 0, 0, 0, 0, 690.00, 2950.00, 0, 0, 0, 0, 0], total: 3640.00, invoices: 3 },
  { name: "AUSTRAL INTERNATIONAL", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3625.00, 0], total: 3625.00, invoices: 2 },
  { name: "Datagram Network Technologies", monthly: [0, 0, 0, 2500.00, 0, 0, 0, 0, 0, 950.00, 0, 0], total: 3450.00, invoices: 2 },
  { name: "ROYAL MANOR VACATION HOMES", monthly: [0, 700.00, 250.00, 1210.00, 1247.50, 0, 0, 0, 0, 0, 0, 0], total: 3407.50, invoices: 4 },
  { name: "KOTUG MIDDLE EAST (Merged)", monthly: [0, 0, 0, 0, 160.00, 770.00, 330.00, 0, 0, 1776.25, 0, 0], total: 3036.25, invoices: 5 },
  { name: "TAM TRADING FZ-LLC", monthly: [0, 0, 0, 0, 0, 1537.62, 0, 0, 1490.00, 0, 0, 0], total: 3027.62, invoices: 3 },
  { name: "Enara Properties", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 700.00, 1620.00, 0, 260.00], total: 2580.00, invoices: 3 },
  { name: "KHF AUTOMOTIVE TRADING", monthly: [2370.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 2370.00, invoices: 3 },
  { name: "NARJIS Printing", monthly: [525.00, 0, 0, 0, 0, 600.00, 430.00, 0, 0, 0, 0, 810.00], total: 2365.00, invoices: 5 },
  { name: "GOOD VIBES TRANSPORT", monthly: [0, 0, 1900.00, 425.00, 0, 0, 0, 0, 0, 0, 0, 0], total: 2325.00, invoices: 2 },
  { name: "Grok Education Services", monthly: [1050.00, 0, 875.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 1925.00, invoices: 2 },
  { name: "International Shipping", monthly: [362.50, 0, 0, 0, 0, 0, 0, 0, 0, 700.00, 875.00, 0], total: 1937.50, invoices: 3 },
  { name: "Mirdif American School", monthly: [0, 864.50, 0, 0, 0, 0, 0, 770.00, 0, 0, 0, 0], total: 1634.50, invoices: 3 },
  { name: "Confident Building Materials", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 1650.00, 0, 0, 0], total: 1650.00, invoices: 2 },
  { name: "Logic Utilities", monthly: [0, 0, 0, 0, 0, 0, 0, 420.00, 0, 660.00, 450.00, 0], total: 1530.00, invoices: 4 },
  { name: "Brogan Middle East", monthly: [1150.00, 110.00, 160.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 1420.00, invoices: 3 },
  { name: "Shory Technology", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 150.00, 1250.00, 0, 0], total: 1400.00, invoices: 2 },
  { name: "AQARCO REAL ESTATE", monthly: [0, 0, 0, 0, 0, 0, 0, 1287.00, 0, 0, 0, 0], total: 1287.00, invoices: 2 },
  { name: "Ms. Lisa Brown", monthly: [0, 0, 375.00, 0, 525.00, 0, 0, 315.00, 0, 0, 0, 0], total: 1215.00, invoices: 3 },
  { name: "Indo Tausch Trading", monthly: [0, 0, 0, 140.00, 0, 375.00, 0, 0, 0, 185.00, 0, 490.00], total: 1190.00, invoices: 4 },
  { name: "Gulftainer Iraq Branch", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 1075.00, 0, 0, 0], total: 1075.00, invoices: 2 },
  { name: "Buildmate Technical", monthly: [0, 370.00, 0, 0, 0, 0, 0, 0, 0, 592.00, 0, 0], total: 962.00, invoices: 3 },
  { name: "MIRA TECH", monthly: [0, 0, 0, 0, 0, 0, 0, 530.00, 350.00, 0, 0, 0], total: 880.00, invoices: 2 },
  { name: "Gardner Denver FZE", monthly: [100.00, 130.00, 305.00, 0, 0, 0, 0, 0, 310.00, 0, 0, 0], total: 845.00, invoices: 4 },
  { name: "Global Credit Recoveries", monthly: [0, 0, 265.00, 0, 0, 0, 0, 0, 315.00, 0, 265.00, 0], total: 845.00, invoices: 3 },
  { name: "University of Canberra", monthly: [0, 525.00, 280.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 805.00, invoices: 3 },
  { name: "MACS G SOLUTIONS", monthly: [0, 0, 0, 0, 0, 0, 0, 190.00, 340.00, 0, 0, 0], total: 530.00, invoices: 2 },
  { name: "Seaways International", monthly: [200.00, 0, 0, 310.00, 0, 0, 0, 0, 0, 0, 0, 0], total: 510.00, invoices: 2 },
  { name: "Biz Point Documents", monthly: [245.00, 0, 0, 0, 0, 0, 245.00, 0, 0, 0, 0, 0], total: 490.00, invoices: 2 },
  { name: "Mohebi Logistics", monthly: [190.00, 0, 0, 0, 300.00, 0, 0, 0, 0, 0, 0, 0], total: 490.00, invoices: 2 },
];

// One-time clients (1 invoice)
const ONE_TIME_CLIENTS_2023 = [
  { name: "VALIANT PACIFIC", monthIndex: 8, revenue: 21040.00 },
  { name: "GMR Holding", monthIndex: 1, revenue: 21000.00 },
  { name: "Mohammed Bin Rashid University", monthIndex: 0, revenue: 20700.00 },
  { name: "Cander Group DMCC", monthIndex: 2, revenue: 20450.00 },
  { name: "HEALY CONSULTANTS", monthIndex: 11, revenue: 12825.00 },
  { name: "IDP Education Services Nigeria", monthIndex: 7, revenue: 11400.00 },
  { name: "Evolution Live Event", monthIndex: 10, revenue: 10600.00 },
  { name: "CJ ICM FZCO", monthIndex: 11, revenue: 9500.00 },
  { name: "AL WASEEF INDUSTRIES", monthIndex: 10, revenue: 7896.00 },
  { name: "GREENFIELD INTERNATIONAL", monthIndex: 10, revenue: 7632.00 },
  { name: "Lloyds Energy DMCC", monthIndex: 11, revenue: 6800.00 },
  { name: "OILMAR SHIPPING", monthIndex: 4, revenue: 6515.75 },
  { name: "Depa Interiors LLC", monthIndex: 2, revenue: 6300.00 },
  { name: "Tristar Energy DMCEST", monthIndex: 10, revenue: 6000.00 },
  { name: "POWER LEASE VEHICLE", monthIndex: 10, revenue: 5625.00 },
  { name: "Khaleej Links General", monthIndex: 11, revenue: 5500.00 },
  { name: "Krishna International", monthIndex: 10, revenue: 5150.00 },
  { name: "VIA TONIC LLC", monthIndex: 6, revenue: 4960.00 },
  { name: "MIGHTHOUSE REALTY", monthIndex: 11, revenue: 4306.00 },
  { name: "E V OFFSHORE", monthIndex: 7, revenue: 3960.00 },
  { name: "Nexus Pharmaceuticals", monthIndex: 11, revenue: 3950.00 },
  { name: "Thermo Fisher Scientific", monthIndex: 7, revenue: 3375.00 },
  { name: "Union Church", monthIndex: 11, revenue: 2930.00 },
  { name: "J C S ARTIFICIAL FLOWERS", monthIndex: 10, revenue: 2852.00 },
  { name: "BELLAVITA BUILDING", monthIndex: 4, revenue: 2315.00 },
  { name: "AL TABREED INDUSTRIES", monthIndex: 1, revenue: 2250.00 },
  { name: "Beyond Infinity Group", monthIndex: 1, revenue: 2070.00 },
  { name: "Beyond Infinity Marketing", monthIndex: 1, revenue: 2070.00 },
  { name: "Aplus Global FZE", monthIndex: 11, revenue: 1975.00 },
  { name: "PETRO GULF INTERNATIONAL", monthIndex: 9, revenue: 1900.00 },
  { name: "Aurantius Real Estate Broker", monthIndex: 11, revenue: 1775.00 },
  { name: "FLAVORIQ DMCC", monthIndex: 7, revenue: 1675.00 },
  { name: "M Y WORLD TRADING", monthIndex: 1, revenue: 1660.00 },
  { name: "Nanjing International", monthIndex: 11, revenue: 1650.00 },
  { name: "PETALS LANDSCAPE", monthIndex: 6, revenue: 1500.00 },
  { name: "HADERO COFFEE SHOP", monthIndex: 10, revenue: 1490.00 },
  { name: "FANATECH ENGINEERING", monthIndex: 3, revenue: 1296.00 },
  { name: "ALFATONIC GENERAL", monthIndex: 2, revenue: 1150.00 },
  { name: "AL YOUSUF MOTORS", monthIndex: 1, revenue: 1142.86 },
  { name: "Avalon General Land Transport", monthIndex: 3, revenue: 1050.00 },
  { name: "Mayank Kejriwal", monthIndex: 10, revenue: 1050.00 },
  { name: "T S S ADVERTISING", monthIndex: 7, revenue: 1050.00 },
  { name: "Gamayun Consultancy", monthIndex: 7, revenue: 930.00 },
  { name: "Miss Elain", monthIndex: 5, revenue: 900.00 },
  { name: "The Federal Bank", monthIndex: 1, revenue: 900.00 },
  { name: "Medical Regulations Gate", monthIndex: 7, revenue: 790.00 },
  { name: "Tristar Transport LLC", monthIndex: 11, revenue: 780.00 },
  { name: "Besins Healthcare", monthIndex: 7, revenue: 750.00 },
  { name: "Desert Adventures Tourism", monthIndex: 3, revenue: 750.00 },
  { name: "V Craft Events", monthIndex: 11, revenue: 740.00 },
  { name: "Catherine Lagahino", monthIndex: 5, revenue: 712.50 },
  { name: "Artology Creative DMCC", monthIndex: 0, revenue: 705.00 },
  { name: "Counselling Point", monthIndex: 4, revenue: 700.00 },
  { name: "Quest Cove Properties", monthIndex: 2, revenue: 700.00 },
  { name: "North Telecom", monthIndex: 2, revenue: 650.00 },
  { name: "CHILTERN TMC CONSULTANT", monthIndex: 9, revenue: 500.00 },
  { name: "Gold Camellia", monthIndex: 7, revenue: 500.00 },
  { name: "R Two Marine Services", monthIndex: 1, revenue: 450.00 },
  { name: "SEBANG Global Battery", monthIndex: 3, revenue: 450.00 },
  { name: "Theatre of Digital Art Laser", monthIndex: 2, revenue: 450.00 },
  { name: "Blue Valley Middle East", monthIndex: 0, revenue: 375.00 },
  { name: "Crossco Solutions DMCC", monthIndex: 0, revenue: 375.00 },
  { name: "M I R A GENERAL TRADING", monthIndex: 3, revenue: 375.00 },
  { name: "Mr. Hashim Kapadia", monthIndex: 6, revenue: 370.00 },
  { name: "QZ Asset Management", monthIndex: 0, revenue: 350.00 },
  { name: "St. Mary's Catholic Church", monthIndex: 2, revenue: 350.00 },
  { name: "KCA Deutag Drilling", monthIndex: 9, revenue: 340.00 },
  { name: "Al Nahi Logistics LLC", monthIndex: 2, revenue: 325.00 },
  { name: "Ms. Gulnara Vafina", monthIndex: 7, revenue: 300.00 },
  { name: "AL SHEMAIL GAR.", monthIndex: 2, revenue: 290.00 },
  { name: "ENSO GLOBAL TRADING", monthIndex: 3, revenue: 285.00 },
  { name: "Beyond Infinity Technical", monthIndex: 11, revenue: 275.00 },
  { name: "SWISS BUSINESS COUNCIL", monthIndex: 10, revenue: 275.00 },
  { name: "Ms. Marecel Tan", monthIndex: 11, revenue: 260.00 },
  { name: "Maximus Business Solutions", monthIndex: 2, revenue: 250.00 },
  { name: "RSP REALTY LLC", monthIndex: 9, revenue: 250.00 },
  { name: "EV OFFSHORE LIMITED", monthIndex: 1, revenue: 245.00 },
  { name: "GRAND MATIC", monthIndex: 1, revenue: 245.00 },
  { name: "HARBOUR MIDDLE EAST", monthIndex: 2, revenue: 225.00 },
  { name: "Beyond Infinity Holiday", monthIndex: 3, revenue: 210.00 },
  { name: "Qudra Fitness", monthIndex: 0, revenue: 190.48 },
  { name: "Griffith University", monthIndex: 2, revenue: 175.00 },
  { name: "THE RED CARPET L L C", monthIndex: 4, revenue: 175.00 },
  { name: "University of New South Wales", monthIndex: 2, revenue: 175.00 },
  { name: "University of Tasmania", monthIndex: 2, revenue: 175.00 },
  { name: "Ms. Ma Theresa Aguilar", monthIndex: 4, revenue: 150.00 },
  { name: "California Chiropractic", monthIndex: 0, revenue: 120.00 },
  { name: "ME DO RE PROPERTIES", monthIndex: 11, revenue: 100.00 },
  { name: "At Your Service Productions", monthIndex: 8, revenue: 50.00 },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Verified monthly totals from masterlist (WITHOUT VAT)
const VERIFIED_MONTHLY_TOTALS = [
  143472.48,  // Jan
  235205.35,  // Feb
  276226.50,  // Mar
  106877.50,  // Apr
  141545.25,  // May
  85840.12,   // Jun
  159354.55,  // Jul
  250614.25,  // Aug
  406379.94,  // Sep
  292469.27,  // Oct
  154283.00,  // Nov
  164598.55,  // Dec
];

// Generate topClients for each month (all clients with revenue > 0)
function getTopClientsForMonth(monthIndex: number) {
  const premiumClients = PREMIUM_CLIENTS_MONTHLY
    .filter(c => c.monthly[monthIndex] > 0)
    .map(c => ({
      name: c.name,
      revenue: c.monthly[monthIndex],
      invoices: Math.max(1, Math.round(c.monthly[monthIndex] / 2500)),
      category: "premium" as const,
    }));

  const normalClients = NORMAL_CLIENTS_MONTHLY
    .filter(c => c.monthly[monthIndex] > 0)
    .map(c => ({
      name: c.name,
      revenue: c.monthly[monthIndex],
      invoices: Math.max(1, Math.round(c.monthly[monthIndex] / 2500)),
      category: "normal" as const,
    }));

  const oneTimeClients = ONE_TIME_CLIENTS_2023
    .filter(c => c.monthIndex === monthIndex)
    .map(c => ({
      name: c.name,
      revenue: c.revenue,
      invoices: 1,
      category: "one-time" as const,
    }));

  return [...premiumClients, ...normalClients, ...oneTimeClients].sort((a, b) => b.revenue - a.revenue);
}

// Calculate monthly data using verified totals
function calculateMonthlyData(): MonthlyData[] {
  return MONTHS.map((month, monthIndex) => {
    const premiumRevenue = PREMIUM_CLIENTS_MONTHLY.reduce((sum, c) => sum + c.monthly[monthIndex], 0);
    const normalRevenue = NORMAL_CLIENTS_MONTHLY.reduce((sum, c) => sum + c.monthly[monthIndex], 0);
    const oneTimeRevenue = ONE_TIME_CLIENTS_2023
      .filter(c => c.monthIndex === monthIndex)
      .reduce((sum, c) => sum + c.revenue, 0);

    const premiumClients = PREMIUM_CLIENTS_MONTHLY.filter(c => c.monthly[monthIndex] > 0).length;
    const normalClientsCount = NORMAL_CLIENTS_MONTHLY.filter(c => c.monthly[monthIndex] > 0).length;
    const oneTimeClientsCount = ONE_TIME_CLIENTS_2023.filter(c => c.monthIndex === monthIndex).length;

    const premiumInvoices = PREMIUM_CLIENTS_MONTHLY
      .filter(c => c.monthly[monthIndex] > 0)
      .reduce((sum, c) => sum + Math.max(1, Math.round(c.monthly[monthIndex] / 2500)), 0);
    const normalInvoices = NORMAL_CLIENTS_MONTHLY
      .filter(c => c.monthly[monthIndex] > 0)
      .reduce((sum, c) => sum + Math.max(1, Math.round(c.monthly[monthIndex] / 2500)), 0);
    const oneTimeInvoices = oneTimeClientsCount;

    // Use verified monthly totals from masterlist
    const revenue = VERIFIED_MONTHLY_TOTALS[monthIndex];
    const invoices = premiumInvoices + normalInvoices + oneTimeInvoices;
    const clients = premiumClients + normalClientsCount + oneTimeClientsCount;

    return {
      month,
      monthNum: monthIndex + 1,
      revenue,
      invoices,
      clients,
      premiumRevenue,
      normalRevenue,
      oneTimeRevenue,
      premiumInvoices,
      normalInvoices,
      oneTimeInvoices,
      premiumClients,
      normalClients: normalClientsCount,
      oneTimeClients: oneTimeClientsCount,
      avgInvoiceValue: invoices > 0 ? revenue / invoices : 0,
      topClients: getTopClientsForMonth(monthIndex),
    };
  });
}

let cachedAggregates: MasterlistAggregates2023 | null = null;

export async function loadMasterlistAggregates2023(): Promise<MasterlistAggregates2023> {
  if (cachedAggregates) return cachedAggregates;

  const monthlyData = calculateMonthlyData();

  // Use verified totals from masterlist (WITHOUT VAT) - 2023 Full Year
  const totalRevenue = 2416866.76;
  const totalInvoices = 869;
  const totalClients = 201;
  
  // Verified segment totals from masterlist
  const premiumTotal = 1227867.30; // Premium clients (6+ invoices)
  const normalTotal = 658339.12;   // Normal clients (2-5 invoices)
  const oneTimeTotal = 530660.34;  // One-time clients (1 invoice)

  cachedAggregates = {
    monthlyData,
    totals: {
      totalRevenue,
      totalInvoices,
      totalClients,
      avgInvoiceValue: totalRevenue / totalInvoices,
      premiumTotal,
      normalTotal,
      oneTimeTotal,
    },
  };

  return cachedAggregates;
}
