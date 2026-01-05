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

// Premium clients monthly revenue breakdown (from user spreadsheet)
const PREMIUM_CLIENTS_MONTHLY = [
  { name: "IDP Education", monthly: [8948, 45761, 31699, 874, 8532, 360, 50463, 27386, 158884, 20321, 2769, 30560], total: 386559 },
  { name: "Stellar Advertising", monthly: [35742, 42350, 17294, 50672, 26158, 57980, 18755, 21762, 13098, 41175, 14166, 4565], total: 343717 },
  { name: "NAVITAS / MURDOCH", monthly: [0, 0, 0, 0, 9851, 1090, 28382, 19775, 26932, 5844, 7172, 600], total: 99646 },
  { name: "DUNECREST SCHOOL", monthly: [0, 0, 0, 0, 2975, 0, 0, 49418, 18137, 0, 0, 0], total: 70530 },
  { name: "TRANE BVBA", monthly: [810, 8594, 2070, 2800, 3995, 405, 3360, 3995, 6570, 11555, 3760, 750], total: 48664 },
  { name: "Connect Resources", monthly: [0, 450, 19300, 5800, 0, 0, 0, 0, 22655, 0, 0, 0], total: 48205 },
  { name: "Huxley Associates", monthly: [0, 2720, 19415, 5645, 760, 0, 0, 1575, 0, 0, 11538, 3400], total: 45052 },
  { name: "Continental ME", monthly: [1694, 5680, 31831, 1750, 0, 0, 0, 0, 0, 0, 0, 0], total: 40955 },
  { name: "JUBAILI BROS", monthly: [14250, 750, 19175, 0, 0, 0, 3450, 0, 0, 0, 0, 3000], total: 40625 },
  { name: "GrokGlobal Services", monthly: [4815, 0, 0, 0, 0, 0, 0, 0, 740, 28510, 0, 0], total: 34065 },
  { name: "Gulftainer", monthly: [0, 1400, 10038, 8225, 0, 0, 0, 0, 5859, 0, 0, 0], total: 25521 },
  { name: "RIF TRUST", monthly: [0, 0, 2200, 960, 2255, 4690, 1690, 1045, 1014, 0, 6482, 0], total: 20336 },
  { name: "MEINHARDT", monthly: [0, 7300, 0, 0, 9570, 500, 0, 0, 2113, 768, 0, 0], total: 20251 },
  { name: "ANB AUTOMOBILES", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 860, 14785, 4546, 0], total: 20191 },
  { name: "Beyond Infinity RE", monthly: [4545, 2980, 310, 0, 804, 0, 0, 11275, 0, 0, 0, 0], total: 19914 },
  { name: "Ingersoll-Rand", monthly: [130, 0, 7360, 0, 641, 180, 0, 0, 560, 8960, 180, 285], total: 18296 },
  { name: "CLARION SCHOOL", monthly: [0, 0, 0, 0, 0, 0, 7550, 5860, 970, 1882, 725, 0], total: 16988 },
  { name: "MIRA REAL ESTATE", monthly: [2125, 0, 2345, 3650, 7380, 0, 780, 0, 0, 0, 0, 0], total: 16280 },
  { name: "WAQAR HUMAN RESOURCES", monthly: [0, 0, 0, 0, 0, 0, 0, 3269, 0, 3878, 1165, 6000], total: 14312 },
  { name: "SPECIALISED SPORTS", monthly: [0, 0, 0, 0, 0, 0, 900, 0, 1695, 3990, 4610, 750], total: 11945 },
  { name: "The Woolwich Institute", monthly: [8150, 848, 0, 0, 1050, 0, 0, 0, 1350, 0, 0, 0], total: 11398 },
  { name: "Ausnutria Nutrition", monthly: [0, 1360, 3260, 0, 0, 0, 590, 0, 0, 1180, 3750, 0], total: 10140 },
  { name: "SPH Global", monthly: [0, 0, 960, 1435, 0, 0, 2775, 0, 0, 0, 0, 3694], total: 8864 },
  { name: "ANB Automobiles (Small)", monthly: [875, 150, 0, 3800, 3685, 0, 0, 0, 0, 0, 0, 0], total: 8510 },
  { name: "Aurantius Real Estate", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1250, 1390, 4555], total: 7195 },
  { name: "AL RASHED UNITED", monthly: [1275, 1725, 300, 275, 0, 0, 0, 0, 700, 1567, 1065, 0], total: 6907 },
  { name: "FAD Institute", monthly: [1125, 2620, 0, 0, 2190, 130, 72, 50, 600, 0, 0, 0], total: 6786 },
  { name: "Bianca and Bianco", monthly: [0, 550, 375, 0, 310, 0, 690, 0, 0, 2725, 825, 850], total: 6325 },
  { name: "Merit Freight", monthly: [0, 395, 0, 0, 0, 1800, 800, 1480, 0, 0, 0, 1810], total: 6285 },
  { name: "EMIRATES FOR UNIVERSAL TYRES", monthly: [495, 0, 0, 0, 0, 0, 550, 275, 3078, 525, 0, 950], total: 5872 },
  { name: "Global Connect", monthly: [0, 0, 0, 90, 330, 0, 0, 800, 380, 3950, 265, 0], total: 5815 },
  { name: "HOLO MORTGAGE", monthly: [0, 200, 1790, 0, 0, 750, 0, 1570, 580, 0, 530, 0], total: 5420 },
  { name: "Arabian Equipment", monthly: [590, 0, 0, 1540, 0, 1380, 0, 0, 0, 325, 812, 0], total: 4648 },
  { name: "BMC SOFTWARE", monthly: [0, 0, 0, 0, 1475, 240, 2268, 0, 0, 240, 300, 0], total: 4523 },
  { name: "UNIQUE WORLD BUSINESS", monthly: [0, 870, 405, 510, 240, 270, 345, 0, 405, 180, 420, 90], total: 3735 },
];

// Normal clients monthly revenue breakdown (from user spreadsheet)
const NORMAL_CLIENTS_MONTHLY = [
  { name: "United Arab Bank", monthly: [0, 0, 0, 0, 0, 0, 0, 27748, 27050, 33276, 0, 0], total: 88074 },
  { name: "VL MEA Marketing", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 25575, 875, 29388], total: 55838 },
  { name: "PLUS971 CYBER", monthly: [0, 0, 32350, 0, 0, 3375, 0, 0, 0, 0, 0, 0], total: 35725 },
  { name: "Azalee Flower", monthly: [4800, 5750, 0, 0, 12300, 0, 0, 0, 0, 0, 12670, 0], total: 35520 },
  { name: "Art Indulgence", monthly: [0, 0, 8800, 0, 22560, 0, 0, 0, 0, 0, 0, 0], total: 31360 },
  { name: "Continental Middle East", monthly: [0, 0, 0, 0, 0, 0, 1450, 3900, 0, 24200, 0, 0], total: 29550 },
  { name: "CACOGES", monthly: [0, 5500, 0, 0, 0, 0, 0, 0, 8000, 0, 0, 13875], total: 27375 },
  { name: "Master Builders", monthly: [0, 25556, 1205, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 26761 },
  { name: "Mayer Brown LLP", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 25614, 0, 0], total: 25614 },
  { name: "Saint Vincent Group", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 24552, 0, 180, 0], total: 24732 },
  { name: "Tappy Toes Nursery", monthly: [0, 0, 0, 0, 0, 0, 20500, 0, 0, 4010, 0, 0], total: 24510 },
  { name: "Binghatti Developers", monthly: [0, 0, 0, 0, 0, 0, 0, 23000, 1150, 0, 0, 0], total: 24150 },
  { name: "PARAGON PROPERTIES", monthly: [1300, 10550, 0, 0, 0, 0, 0, 0, 9000, 0, 0, 0], total: 20850 },
  { name: "ALI ASGER & BROTHERS", monthly: [11275, 1530, 0, 0, 4600, 0, 0, 0, 0, 0, 0, 0], total: 17405 },
  { name: "Sesderma ME", monthly: [0, 12910, 4155, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 17065 },
  { name: "Tulipa Landscaping", monthly: [0, 0, 525, 0, 0, 0, 0, 0, 14000, 0, 0, 0], total: 14525 },
  { name: "LOGIC UTILITIES", monthly: [0, 6925, 6305, 1060, 0, 0, 0, 0, 0, 0, 0, 0], total: 14290 },
  { name: "VL MEA Marketing (HACH)", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 12050, 0, 0, 0], total: 12050 },
  { name: "DYNAMIC EMPLOYMENT", monthly: [0, 0, 0, 1388, 1085, 0, 0, 4400, 0, 0, 4400, 0], total: 11272 },
  { name: "IBM Global", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 9575, 0, 0], total: 9575 },
  { name: "MAXHEALTH MONDIAL", monthly: [0, 0, 0, 0, 0, 0, 0, 2650, 6155, 0, 0, 0], total: 8805 },
  { name: "Momentum Logistics", monthly: [0, 0, 7838, 0, 0, 0, 0, 0, 699, 0, 0, 0], total: 8536 },
  { name: "Secured Medical Direction", monthly: [2020, 1260, 0, 0, 775, 0, 0, 0, 0, 0, 4453, 0], total: 8508 },
  { name: "Radiometer Medical", monthly: [0, 2000, 0, 0, 0, 0, 0, 0, 0, 0, 3490, 2500], total: 7990 },
  { name: "MAERSK LOGISTICS", monthly: [0, 0, 2015, 825, 0, 1350, 0, 2525, 0, 0, 0, 0], total: 6715 },
  { name: "Logic Utilities (DC)", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6550, 0], total: 6550 },
  { name: "GRANDDUBAI GLASS", monthly: [0, 0, 0, 1668, 0, 0, 3200, 925, 0, 0, 0, 0], total: 5793 },
  { name: "M E A D Medical", monthly: [0, 0, 1600, 0, 0, 2750, 0, 0, 0, 0, 1410, 0], total: 5760 },
  { name: "MRG", monthly: [4975, 310, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 5285 },
  { name: "Yantee", monthly: [0, 0, 0, 2585, 2650, 0, 0, 0, 0, 0, 0, 0], total: 5235 },
  { name: "PMG Agency", monthly: [4525, 400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 4925 },
  { name: "AMK International", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4645, 0, 0], total: 4645 },
  { name: "SEL Car Rental", monthly: [0, 585, 0, 0, 0, 1585, 0, 125, 0, 238, 0, 2050], total: 4583 },
  { name: "Argus Media", monthly: [0, 0, 0, 0, 0, 0, 0, 3960, 475, 0, 0, 0], total: 4435 },
  { name: "RV Gulf", monthly: [0, 0, 810, 0, 3286, 0, 0, 0, 0, 0, 0, 0], total: 4096 },
  { name: "Qashio", monthly: [0, 0, 990, 0, 0, 0, 0, 3060, 0, 0, 0, 0], total: 4050 },
  { name: "KHF AUTOMOTIVE SERVICE", monthly: [0, 495, 3432, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 3928 },
  { name: "Dubai Academic Health", monthly: [0, 0, 0, 2325, 0, 1420, 0, 0, 0, 0, 0, 0], total: 3745 },
  { name: "DHR MENA FZ-LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 2719, 0, 1003, 0, 0], total: 3722 },
  { name: "Munich Motor Works", monthly: [0, 0, 0, 0, 0, 690, 2950, 0, 0, 0, 0, 0], total: 3640 },
  { name: "AUSTRAL INTERNATIONAL", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3625, 0], total: 3625 },
  { name: "Datagram Network", monthly: [0, 0, 0, 2500, 0, 0, 0, 0, 0, 950, 0, 0], total: 3450 },
  { name: "ROYAL MANOR", monthly: [0, 700, 250, 1210, 1248, 0, 0, 0, 0, 0, 0, 0], total: 3408 },
  { name: "KOTUG MIDDLE EAST", monthly: [0, 0, 0, 0, 160, 770, 330, 0, 0, 1776, 0, 0], total: 3036 },
  { name: "TAM TRADING", monthly: [0, 0, 0, 0, 0, 1538, 0, 0, 1490, 0, 0, 0], total: 3028 },
  { name: "Enara Properties", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 700, 1620, 0, 260], total: 2580 },
  { name: "KHF AUTOMOTIVE TRADING", monthly: [2370, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 2370 },
  { name: "NARJIS Printing", monthly: [525, 0, 0, 0, 0, 600, 430, 0, 0, 0, 0, 810], total: 2365 },
  { name: "GOOD VIBES TRANSPORT", monthly: [0, 0, 1900, 425, 0, 0, 0, 0, 0, 0, 0, 0], total: 2325 },
  { name: "Intl Shipping & Logistics", monthly: [362, 0, 0, 0, 0, 0, 0, 0, 0, 700, 875, 0], total: 1938 },
  { name: "Grok Education Services", monthly: [1050, 0, 875, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 1925 },
  { name: "Confident Building Materials", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 1650, 0, 0, 0], total: 1650 },
  { name: "Mirdif American School", monthly: [0, 864, 0, 0, 0, 0, 0, 770, 0, 0, 0, 0], total: 1634 },
  { name: "Logic Utilities", monthly: [0, 0, 0, 0, 0, 0, 0, 420, 0, 660, 450, 0], total: 1530 },
  { name: "Brogan Middle East", monthly: [1150, 110, 160, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 1420 },
  { name: "Shory Technology", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 150, 1250, 0, 0], total: 1400 },
  { name: "AQARCO REAL ESTATE", monthly: [0, 0, 0, 0, 0, 0, 0, 1287, 0, 0, 0, 0], total: 1287 },
  { name: "Ms. Lisa Brown", monthly: [0, 0, 375, 0, 525, 0, 0, 315, 0, 0, 0, 0], total: 1215 },
  { name: "INDO TAUSCH", monthly: [0, 0, 0, 140, 0, 375, 0, 0, 0, 185, 0, 490], total: 1190 },
  { name: "Gulftainer (Iraq)", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 1075, 0, 0, 0], total: 1075 },
  { name: "Buildmate Technical", monthly: [0, 370, 0, 0, 0, 0, 0, 0, 0, 592, 0, 0], total: 962 },
  { name: "MIRA TECH", monthly: [0, 0, 0, 0, 0, 0, 0, 530, 350, 0, 0, 0], total: 880 },
  { name: "Gardner Denver", monthly: [100, 130, 305, 0, 0, 0, 0, 0, 310, 0, 0, 0], total: 845 },
  { name: "Global Credit Recoveries", monthly: [0, 0, 265, 0, 0, 0, 0, 0, 315, 0, 265, 0], total: 845 },
  { name: "University of Canberra", monthly: [0, 525, 280, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 805 },
  { name: "MACS G SOLUTIONS", monthly: [0, 0, 0, 0, 0, 0, 0, 190, 340, 0, 0, 0], total: 530 },
  { name: "Seaways International", monthly: [200, 0, 0, 310, 0, 0, 0, 0, 0, 0, 0, 0], total: 510 },
  { name: "Biz Point Documents", monthly: [245, 0, 0, 0, 0, 0, 245, 0, 0, 0, 0, 0], total: 490 },
  { name: "Mohebi Logistics", monthly: [190, 0, 0, 0, 300, 0, 0, 0, 0, 0, 0, 0], total: 490 },
];

// One-time clients (from user spreadsheet)
const ONE_TIME_CLIENTS_2023 = [
  { name: "VALIANT PACIFIC", monthIndex: 8, revenue: 21040 },
  { name: "GMR Holding", monthIndex: 1, revenue: 21000 },
  { name: "Mohammed Bin Rashid University", monthIndex: 0, revenue: 20700 },
  { name: "Cander Group DMCC", monthIndex: 2, revenue: 20450 },
  { name: "HEALY CONSULTANTS", monthIndex: 11, revenue: 12825 },
  { name: "Evolution Live Event", monthIndex: 10, revenue: 10600 },
  { name: "CJ ICM FZCO", monthIndex: 11, revenue: 9500 },
  { name: "Theatre of Digital Art", monthIndex: 7, revenue: 9225 },
  { name: "DEAKIN UNIVERSITY", monthIndex: 8, revenue: 8600 },
  { name: "AL WASEEF INDUSTRIES", monthIndex: 10, revenue: 7896 },
  { name: "GREENFIELD INTERNATIONAL", monthIndex: 10, revenue: 7632 },
  { name: "Lloyds Energy DMCC", monthIndex: 11, revenue: 6800 },
  { name: "OILMAR SHIPPING", monthIndex: 4, revenue: 6516 },
  { name: "Depa Interiors LLC", monthIndex: 2, revenue: 6300 },
  { name: "Tristar Energy DMCEST", monthIndex: 10, revenue: 6000 },
  { name: "POWER LEASE VEHICLE", monthIndex: 10, revenue: 5625 },
  { name: "Khaleej Links General", monthIndex: 11, revenue: 5500 },
  { name: "Krishna International", monthIndex: 10, revenue: 5150 },
  { name: "VIA TONIC LLC", monthIndex: 6, revenue: 4960 },
  { name: "MIGHTHOUSE REALTY", monthIndex: 11, revenue: 4306 },
  { name: "E V OFFSHORE", monthIndex: 7, revenue: 3960 },
  { name: "Nexus Pharmaceuticals", monthIndex: 11, revenue: 3950 },
  { name: "Thermo Fisher Middle East", monthIndex: 7, revenue: 3375 },
  { name: "Union Church", monthIndex: 11, revenue: 2930 },
  { name: "J C S ARTIFICIAL", monthIndex: 10, revenue: 2852 },
  { name: "BELLAVITA BUILDING", monthIndex: 4, revenue: 2315 },
  { name: "AL TABREED INDUSTRIES", monthIndex: 1, revenue: 2250 },
  { name: "Beyond Infinity Group", monthIndex: 1, revenue: 2070 },
  { name: "Beyond Infinity Marketing", monthIndex: 1, revenue: 2070 },
  { name: "Aplus Global", monthIndex: 11, revenue: 1975 },
  { name: "PETRO GULF INTERNATIONAL", monthIndex: 9, revenue: 1900 },
  { name: "Aurantius Real Estate (OT)", monthIndex: 11, revenue: 1775 },
  { name: "FLAVORIQ DMCC", monthIndex: 7, revenue: 1675 },
  { name: "M Y WORLD TRADING", monthIndex: 1, revenue: 1660 },
  { name: "Nanjing International", monthIndex: 11, revenue: 1650 },
  { name: "PETALS LANDSCAPE", monthIndex: 6, revenue: 1500 },
  { name: "HADERO COFFEE SHOP", monthIndex: 10, revenue: 1490 },
  { name: "FANATECH ENGINEERING", monthIndex: 3, revenue: 1296 },
  { name: "ALFATONIC GENERAL", monthIndex: 2, revenue: 1150 },
  { name: "AL YOUSUF MOTORS", monthIndex: 1, revenue: 1143 },
  { name: "Avalon General Land Transport", monthIndex: 3, revenue: 1050 },
  { name: "Mayank Kejriwal", monthIndex: 10, revenue: 1050 },
  { name: "T S S ADVERTISING", monthIndex: 7, revenue: 1050 },
  { name: "Gamayun Consultancy", monthIndex: 7, revenue: 930 },
  { name: "Miss Elain", monthIndex: 5, revenue: 900 },
  { name: "The Federal Bank Limited", monthIndex: 1, revenue: 900 },
  { name: "Medical Regulations Gate", monthIndex: 7, revenue: 790 },
  { name: "Tristar Transport LLC", monthIndex: 11, revenue: 780 },
  { name: "Besins Healthcare", monthIndex: 7, revenue: 750 },
  { name: "Desert Adventures Tourism", monthIndex: 3, revenue: 750 },
  { name: "V Craft Events", monthIndex: 11, revenue: 740 },
  { name: "Catherine Lagahino", monthIndex: 5, revenue: 712 },
  { name: "Artology Creative DMCC", monthIndex: 0, revenue: 705 },
  { name: "Counselling Point", monthIndex: 4, revenue: 700 },
  { name: "Quest Cove Properties", monthIndex: 2, revenue: 700 },
  { name: "North Telecom", monthIndex: 2, revenue: 650 },
  { name: "CHILTERN TMC CONSULTANT", monthIndex: 9, revenue: 500 },
  { name: "Gold Camellia", monthIndex: 7, revenue: 500 },
  { name: "R Two Marine Services FZE", monthIndex: 1, revenue: 450 },
  { name: "SEBANG Global Battery", monthIndex: 3, revenue: 450 },
  { name: "Theatre of Digital Art (OT)", monthIndex: 2, revenue: 450 },
  { name: "Blue Valley Middle East", monthIndex: 0, revenue: 375 },
  { name: "Crossco Solutions DMCC", monthIndex: 0, revenue: 375 },
  { name: "M I R A GENERAL TRADING", monthIndex: 3, revenue: 375 },
  { name: "Mr. Hashim Kapadia", monthIndex: 6, revenue: 370 },
  { name: "QZ Asset Management", monthIndex: 0, revenue: 350 },
  { name: "St. Mary's Catholic Church", monthIndex: 2, revenue: 350 },
  { name: "KCA Deutag Drilling", monthIndex: 9, revenue: 340 },
  { name: "Al Nahi Logistics LLC", monthIndex: 2, revenue: 325 },
  { name: "Ms. Gulnara Vafina", monthIndex: 7, revenue: 300 },
  { name: "AL SHEMAIL GAR.", monthIndex: 2, revenue: 290 },
  { name: "ENSO GLOBAL TRADING", monthIndex: 3, revenue: 285 },
  { name: "Beyond Infinity Technical", monthIndex: 11, revenue: 275 },
  { name: "SWISS BUSINESS COUNCIL", monthIndex: 10, revenue: 275 },
  { name: "Ms. Marecel Tan", monthIndex: 11, revenue: 260 },
  { name: "Maximus Business Solutions", monthIndex: 2, revenue: 250 },
  { name: "RSP REALTY LLC", monthIndex: 9, revenue: 250 },
  { name: "EV OFFSHORE LIMITED", monthIndex: 1, revenue: 245 },
  { name: "GRAND MATIC", monthIndex: 1, revenue: 245 },
  { name: "HARBOUR MIDDLE EAST", monthIndex: 2, revenue: 225 },
  { name: "Beyond Infinity Holiday", monthIndex: 3, revenue: 210 },
  { name: "Qudra Fitness", monthIndex: 0, revenue: 190 },
  { name: "Griffith University", monthIndex: 2, revenue: 175 },
  { name: "THE RED CARPET L L C", monthIndex: 4, revenue: 175 },
  { name: "University of New South Wales", monthIndex: 2, revenue: 175 },
  { name: "University of Tasmania", monthIndex: 2, revenue: 175 },
  { name: "Ms. Ma Theresa Aguilar", monthIndex: 4, revenue: 150 },
  { name: "California Chiropractic", monthIndex: 0, revenue: 120 },
  { name: "ME DO RE PROPERTIES", monthIndex: 11, revenue: 100 },
  { name: "At Your Service Productions", monthIndex: 8, revenue: 50 },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

// Calculate monthly totals from client data
function calculateMonthlyData(): MonthlyData[] {
  return MONTHS.map((month, monthIndex) => {
    const premiumRevenue = PREMIUM_CLIENTS_MONTHLY.reduce((sum, c) => sum + c.monthly[monthIndex], 0);
    const normalRevenue = NORMAL_CLIENTS_MONTHLY.reduce((sum, c) => sum + c.monthly[monthIndex], 0);
    const oneTimeRevenue = ONE_TIME_CLIENTS_2023
      .filter(c => c.monthIndex === monthIndex)
      .reduce((sum, c) => sum + c.revenue, 0);

    const premiumClients = PREMIUM_CLIENTS_MONTHLY.filter(c => c.monthly[monthIndex] > 0).length;
    const normalClients = NORMAL_CLIENTS_MONTHLY.filter(c => c.monthly[monthIndex] > 0).length;
    const oneTimeClientsCount = ONE_TIME_CLIENTS_2023.filter(c => c.monthIndex === monthIndex).length;

    const premiumInvoices = PREMIUM_CLIENTS_MONTHLY
      .filter(c => c.monthly[monthIndex] > 0)
      .reduce((sum, c) => sum + Math.max(1, Math.round(c.monthly[monthIndex] / 2500)), 0);
    const normalInvoices = NORMAL_CLIENTS_MONTHLY
      .filter(c => c.monthly[monthIndex] > 0)
      .reduce((sum, c) => sum + Math.max(1, Math.round(c.monthly[monthIndex] / 2500)), 0);
    const oneTimeInvoices = oneTimeClientsCount;

    const revenue = premiumRevenue + normalRevenue + oneTimeRevenue;
    const invoices = premiumInvoices + normalInvoices + oneTimeInvoices;
    const clients = premiumClients + normalClients + oneTimeClientsCount;

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
      normalClients,
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

  const premiumTotal = PREMIUM_CLIENTS_MONTHLY.reduce((sum, c) => sum + c.total, 0);
  const normalTotal = NORMAL_CLIENTS_MONTHLY.reduce((sum, c) => sum + c.total, 0);
  const oneTimeTotal = ONE_TIME_CLIENTS_2023.reduce((sum, c) => sum + c.revenue, 0);
  const totalRevenue = premiumTotal + normalTotal + oneTimeTotal;

  const totalInvoices = monthlyData.reduce((sum, m) => sum + m.invoices, 0);
  const totalClients = PREMIUM_CLIENTS_MONTHLY.length + NORMAL_CLIENTS_MONTHLY.length + ONE_TIME_CLIENTS_2023.length;

  cachedAggregates = {
    monthlyData,
    totals: {
      totalRevenue,
      totalInvoices,
      totalClients,
      avgInvoiceValue: totalInvoices > 0 ? totalRevenue / totalInvoices : 0,
      premiumTotal,
      normalTotal,
      oneTimeTotal,
    },
  };

  return cachedAggregates;
}
