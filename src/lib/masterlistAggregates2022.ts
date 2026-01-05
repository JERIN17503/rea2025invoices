import type { MonthlyData } from "@/data/clientData";

export interface MasterlistAggregates2022 {
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

// ========== EXACT 2022 MONTHLY DATA (from user-provided masterlist) ==========
// All values are pre-VAT (WITHOUT VAT) as per the masterlist
// Total Revenue: 1,665,446.01 | Total Invoices: 897 | Total Clients: 223

// Premium clients (6+ invoices) - monthly revenue breakdown
const PREMIUM_CLIENTS_MONTHLY = [
  { name: "IDP Education Ltd.", monthly: [31373.00, 7601.00, 22816.50, 688.00, 43969.00, 1670.00, 1518.00, 8709.00, 104871.35, 37813.00, 5275.50, 25740.00], total: 292044.35, invoices: 79 },
  { name: "Stellar Advertising LLC", monthly: [10026.00, 6940.95, 12756.75, 2370.00, 8310.00, 28115.10, 16724.00, 17610.00, 9829.25, 20645.00, 26332.75, 8114.00], total: 167773.80, invoices: 139 },
  { name: "United Arab Bank", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 35895.00, 51000.00, 0, 0], total: 86895.00, invoices: 4 },
  { name: "The Woolwich Institute", monthly: [0, 52080.00, 937.50, 0, 525.00, 0, 330.00, 0, 1152.50, 1675.00, 976.00, 540.00], total: 58216.00, invoices: 15 },
  { name: "JUBAILI BROS. SAL.", monthly: [315.00, 22200.00, 4950.00, 0, 0, 12759.20, 0, 0, 0, 11004.00, 975.00, 0], total: 52203.20, invoices: 10 },
  { name: "Theatre of Digital Art Laser Shows", monthly: [5725.00, 1755.00, 16090.00, 4700.00, 18820.00, 0, 0, 0, 0, 0, 0, 0], total: 47090.00, invoices: 18 },
  { name: "RIF TRUST INVESTMENTS LLC", monthly: [1443.75, 6702.00, 12050.00, 2055.00, 4465.00, 3225.00, 0, 2700.00, 0, 7250.00, 0, 5185.00], total: 45075.75, invoices: 21 },
  { name: "Art Indulgence", monthly: [0, 0, 0, 14100.00, 0, 0, 0, 0, 0, 27755.00, 0, 0], total: 41855.00, invoices: 2 },
  { name: "Continental Middle East DMCC", monthly: [0, 265.00, 0, 0, 0, 0, 0, 0, 0, 320.00, 38969.75, 475.00], total: 40029.75, invoices: 9 },
  { name: "Trane BVBA (merged)", monthly: [80.00, 7435.00, 6990.00, 7736.50, 1290.00, 470.00, 405.00, 2720.00, 2560.50, 470.00, 3405.00, 1485.00], total: 35047.00, invoices: 36 },
  { name: "Mohammed Bin Rashid University", monthly: [0, 840.00, 0, 0, 0, 23400.00, 0, 0, 5887.50, 0, 0, 0], total: 30127.50, invoices: 5 },
  { name: "KCA Deutag Drilling GmbH", monthly: [0, 0, 0, 0, 0, 235.00, 0, 0, 1350.00, 6175.00, 19137.50, 0], total: 26897.50, invoices: 4 },
  { name: "Ingersoll-Rand", monthly: [0, 365.00, 0, 0, 0, 0, 22520.00, 0, 144.29, 260.00, 1660.00, 130.00], total: 25079.29, invoices: 9 },
  { name: "Simi Contracting L.L.C.", monthly: [20360.00, 0, 0, 0, 385.00, 0, 0, 0, 0, 0, 0, 0], total: 20745.00, invoices: 5 },
  { name: "Brogan Middle East Scaffolding", monthly: [1415.00, 110.00, 295.00, 185.00, 777.50, 2750.00, 345.00, 3255.00, 3570.00, 110.00, 5780.00, 0], total: 18592.50, invoices: 25 },
  { name: "ANB Automobiles LLC", monthly: [0, 8500.00, 1100.00, 455.00, 540.00, 1400.00, 180.00, 360.00, 3412.50, 2434.00, 0, 300.00], total: 18681.50, invoices: 16 },
  { name: "Huxley Associates Global Limited", monthly: [0, 0, 0, 0, 5300.00, 0, 4780.00, 3407.50, 600.00, 1227.50, 3205.00, 0], total: 18520.00, invoices: 14 },
  { name: "Radiometer Medical ApS", monthly: [975.00, 0, 4681.00, 0, 0, 0, 0, 744.00, 288.00, 3700.00, 6345.00, 0], total: 16733.00, invoices: 10 },
  { name: "Marc Ellis", monthly: [0, 0, 0, 0, 6225.00, 8571.43, 660.00, 550.00, 0, 0, 0, 0], total: 16006.43, invoices: 6 },
  { name: "Beyond Infinity Real Estate Broker LLC", monthly: [6430.00, 0, 590.00, 0, 0, 0, 1045.00, 1050.00, 290.00, 375.00, 1814.00, 4240.00], total: 15834.00, invoices: 18 },
  { name: "PMG Agency FZ-LLC", monthly: [0, 0, 0, 0, 0, 6975.00, 500.00, 1850.00, 1825.00, 4680.00, 0, 0], total: 15830.00, invoices: 7 },
  { name: "Seaways International DMCC", monthly: [0, 0, 0, 0, 0, 0, 0, 8225.00, 1410.00, 0, 2522.70, 3415.00], total: 15572.70, invoices: 10 },
  { name: "Connect Resources", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 4895.00, 9600.00, 300.00, 0], total: 14795.00, invoices: 5 },
  { name: "VIA TONIC LLC", monthly: [610.00, 5270.00, 0, 0, 0, 4960.00, 3540.00, 0, 0, 0, 0, 0], total: 14380.00, invoices: 4 },
  { name: "Emirates for Universal Tyres LLC", monthly: [330.00, 600.50, 0, 165.00, 0, 0, 0, 1740.00, 190.00, 0, 210.00, 980.00], total: 4215.50, invoices: 14 },
  { name: "TRANSGUARD GROUP L.L.C", monthly: [0, 150.00, 8950.00, 2891.39, 0, 440.00, 0, 0, 0, 0, 0, 0], total: 12431.39, invoices: 6 },
  { name: "MIRA REAL ESTATE BROKERS L.L.C", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 6302.50, 6260.00, 0], total: 12562.50, invoices: 5 },
  { name: "Ibn Al Haj Chemicals LLC", monthly: [11300.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 11300.00, invoices: 1 },
  { name: "University of Central Lancashire", monthly: [0, 5915.00, 0, 0, 5000.00, 0, 0, 0, 0, 0, 0, 0], total: 10915.00, invoices: 5 },
  { name: "Unique World Business Centre LLC", monthly: [1741.00, 1206.00, 577.00, 951.00, 580.00, 413.00, 1784.00, 460.00, 960.00, 740.00, 840.00, 345.00], total: 10597.00, invoices: 18 },
  { name: "AL RASHED UNITED DMCC", monthly: [4160.00, 0, 0, 2845.00, 0, 0, 0, 142.86, 2625.00, 790.00, 0, 0], total: 10562.86, invoices: 8 },
  { name: "Logic Utilities", monthly: [0, 0, 80.00, 0, 120.00, 5730.00, 0, 0, 0, 0, 3675.00, 750.00], total: 10355.00, invoices: 6 },
  { name: "Drs. Nicolas and Asp Clinic", monthly: [0, 6230.00, 0, 0, 0, 721.00, 630.00, 0, 400.00, 0, 0, 0], total: 7981.00, invoices: 10 },
  { name: "R Two Marine Services FZE", monthly: [0, 0, 0, 0, 0, 0, 2990.00, 4022.50, 0, 0, 0, 0], total: 7012.50, invoices: 3 },
  { name: "Cander Group DMCC", monthly: [0, 0, 0, 0, 0, 0, 0, 3890.00, 3147.50, 0, 0, 0], total: 7037.50, invoices: 4 },
  { name: "MACS G SOLUTIONS DMCC", monthly: [0, 0, 480.00, 370.00, 365.00, 0, 0, 4235.00, 0, 1415.00, 0, 0], total: 6865.00, invoices: 6 },
  { name: "Backstage Event Management", monthly: [0, 0, 0, 0, 2200.00, 0, 1650.00, 0, 0, 0, 2750.00, 0], total: 6600.00, invoices: 3 },
  { name: "Stop & Go Auto Accessories Trading", monthly: [0, 0, 3050.00, 0, 3120.00, 0, 0, 0, 0, 0, 0, 0], total: 6170.00, invoices: 3 },
  { name: "Ray International Electrical", monthly: [0, 0, 0, 0, 1600.00, 4527.00, 0, 0, 0, 0, 0, 0], total: 6127.00, invoices: 3 },
  { name: "Velosi Certification Services", monthly: [0, 3305.00, 0, 0, 0, 0, 0, 0, 0, 2635.00, 0, 0], total: 5940.00, invoices: 6 },
  { name: "Valiant Healthcare L.L.C", monthly: [0, 0, 0, 2800.00, 3000.00, 0, 0, 0, 0, 0, 0, 0], total: 5800.00, invoices: 2 },
  { name: "Dubai Dental Hospital FZ LLC", monthly: [0, 0, 0, 0, 0, 2325.00, 1550.00, 0, 0, 0, 0, 1940.00], total: 5815.00, invoices: 4 },
  { name: "Krishna International FZCO", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 630.00, 5200.00, 0, 0], total: 5830.00, invoices: 2 },
  { name: "Beyond Infinity Technical Services", monthly: [1690.00, 0, 840.00, 0, 0, 0, 3205.00, 0, 0, 0, 0, 0], total: 5735.00, invoices: 5 },
  { name: "MEAD Medical Supplies", monthly: [0, 3475.00, 0, 0, 0, 0, 870.00, 0, 450.00, 0, 700.00, 225.00], total: 5720.00, invoices: 5 },
  { name: "KHF AUTOMOTIVE TRADING LLC", monthly: [425.00, 180.00, 1135.00, 950.00, 950.00, 275.00, 0, 280.00, 865.00, 0, 0, 450.00], total: 5510.00, invoices: 11 },
  { name: "Merit Freight Systems Co. LLC", monthly: [0, 0, 790.00, 0, 0, 300.00, 2525.00, 0, 365.00, 0, 0, 1375.00], total: 5355.00, invoices: 5 },
  { name: "CEG INVESTMENTS L.L.C.", monthly: [0, 0, 1415.00, 0, 1415.00, 2315.00, 0, 0, 0, 0, 0, 0], total: 5145.00, invoices: 3 },
  { name: "ELEGANT LAUNDRY & DRY CLEANERS", monthly: [0, 0, 4500.00, 300.00, 0, 0, 0, 0, 0, 0, 0, 0], total: 4800.00, invoices: 2 },
  { name: "Gulftainer", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4718.00, 0, 0], total: 4718.00, invoices: 1 },
  { name: "GRANDDUBAI GLASS & ALUMINUM", monthly: [0, 0, 0, 0, 0, 0, 2820.00, 1548.00, 0, 150.00, 0, 0], total: 4518.00, invoices: 4 },
  { name: "ILLUMINATIONS TRAINING CENTRE", monthly: [0, 0, 0, 1910.00, 1085.00, 0, 400.00, 390.00, 0, 0, 600.00, 0], total: 4385.00, invoices: 6 },
  { name: "Secured Medical Direction MEA FZE", monthly: [3580.00, 0, 0, 0, 0, 0, 0, 236.84, 0, 0, 490.00, 0], total: 4306.84, invoices: 3 },
  { name: "Saint Vincent Group GT LLC", monthly: [0, 0, 0, 4200.00, 0, 0, 0, 0, 0, 0, 0, 0], total: 4200.00, invoices: 1 },
  { name: "NARJIS Printing and Publishing", monthly: [0, 0, 380.00, 0, 905.00, 0, 380.00, 0, 380.00, 845.00, 0, 600.00], total: 3490.00, invoices: 8 },
  { name: "Bianca and Bianco Trading LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 1060.00, 300.00, 1200.00, 840.00, 0], total: 3400.00, invoices: 5 },
  { name: "California Chiropractic Center", monthly: [0, 235.00, 0, 0, 0, 765.00, 0, 0, 320.00, 0, 0, 0], total: 1320.00, invoices: 4 },
  { name: "Thomas Bennett Aluminium LLC", monthly: [730.00, 490.00, 1872.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 3092.00, invoices: 4 },
  { name: "Bin Ladin Contracting Group", monthly: [0, 0, 0, 0, 0, 1500.00, 0, 0, 675.00, 0, 960.00, 0], total: 3135.00, invoices: 4 },
  { name: "Trinity Mechanical Services LLC", monthly: [1446.00, 0, 0, 0, 1500.00, 0, 0, 0, 0, 0, 0, 0], total: 2946.00, invoices: 3 },
  { name: "EV OFFSHORE LIMITED", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 2980.00, 0, 0], total: 2980.00, invoices: 2 },
  { name: "RV Gulf", monthly: [0, 0, 150.00, 0, 690.00, 0, 0, 921.43, 450.00, 0, 375.00, 0], total: 2586.43, invoices: 6 },
  { name: "SEL Car Rental L.L.C.", monthly: [0, 0, 0, 0, 0, 525.00, 0, 0, 0, 0, 0, 2050.00], total: 2575.00, invoices: 2 },
  { name: "Carea Air Conditioning Services", monthly: [0, 0, 1110.00, 0, 900.00, 0, 0, 0, 0, 0, 0, 0], total: 2010.00, invoices: 5 },
  { name: "Grok Education Services", monthly: [0, 0, 0, 0, 175.00, 0, 0, 0, 405.00, 465.00, 875.00, 0], total: 1920.00, invoices: 5 },
  { name: "Unique World Robotics", monthly: [0, 0, 0, 600.00, 1365.00, 0, 0, 0, 0, 0, 0, 0], total: 1965.00, invoices: 2 },
  { name: "AL SHEMAIL GAR. & PERFUMES", monthly: [0, 0, 300.00, 0, 1645.00, 0, 0, 0, 0, 0, 0, 0], total: 1945.00, invoices: 4 },
  { name: "Stanton Chase International FZ LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1075.00, 750.00, 0], total: 1825.00, invoices: 3 },
  { name: "Mirdif American School", monthly: [462.00, 0, 120.00, 0, 0, 140.00, 0, 592.50, 0, 0, 0, 0], total: 1314.50, invoices: 6 },
  { name: "Arabian Equipment Rental LLC", monthly: [0, 550.00, 0, 0, 0, 0, 0, 0, 0, 0, 285.00, 500.00], total: 1335.00, invoices: 4 },
];

// Normal clients (2-5 invoices)
const NORMAL_CLIENTS_MONTHLY = [
  { name: "CCJF", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16055.00], total: 16055.00, invoices: 2 },
  { name: "Continental ME DMCC", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13065.00], total: 13065.00, invoices: 1 },
  { name: "Sesderma ME", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10500.00], total: 10500.00, invoices: 1 },
  { name: "Times Management Consultancy", monthly: [0, 0, 4100.00, 5450.00, 0, 0, 0, 0, 0, 0, 0, 0], total: 9550.00, invoices: 2 },
  { name: "Equirus Wealth", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9596.19], total: 9596.19, invoices: 1 },
  { name: "Karcher FZE", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 9250.00, 0, 0, 0], total: 9250.00, invoices: 1 },
  { name: "Al Samadi Sweets LLC", monthly: [0, 0, 0, 0, 0, 9000.00, 0, 0, 0, 0, 0, 0], total: 9000.00, invoices: 1 },
  { name: "GLOBAL HARDWARE & TOOLS LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8500.00, 0], total: 8500.00, invoices: 1 },
  { name: "La Rosh Design & Fit-out LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 8060.00, 0, 0, 0, 0], total: 8060.00, invoices: 1 },
  { name: "KHK Scaffolding & Form Work LTD", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5815.00], total: 5815.00, invoices: 1 },
  { name: "Tristar Energy DMCEST", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5820.00], total: 5820.00, invoices: 1 },
  { name: "HOLO MORTGAGE CONSULTANT", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5587.50], total: 5587.50, invoices: 1 },
  { name: "CANTER FLUID POWER", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 5241.00, 0, 0], total: 5241.00, invoices: 1 },
  { name: "POWER LEASE VEHICLE RENTAL", monthly: [0, 0, 0, 1425.00, 0, 0, 0, 0, 0, 450.00, 0, 0], total: 1875.00, invoices: 2 },
  { name: "Kingsmen Force Technical Services", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4010.00, 0, 0], total: 4010.00, invoices: 1 },
  { name: "ROYAL MANOR VACATION HOMES", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3790.00], total: 3790.00, invoices: 2 },
  { name: "Crossroads MOE Restaurant LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 3700.00, 0, 0, 0, 0], total: 3700.00, invoices: 1 },
  { name: "Specialized Sports Equipment LLC", monthly: [3040.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 610.00, 0], total: 3650.00, invoices: 3 },
  { name: "Medical Regulations Gate", monthly: [3525.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 3525.00, invoices: 1 },
  { name: "XAD SOCIAL MEDIA APPLICATIONS", monthly: [0, 0, 0, 3516.00, 0, 0, 0, 0, 0, 0, 0, 0], total: 3516.00, invoices: 1 },
  { name: "AMOUR PROPRE FZ-LLC", monthly: [0, 0, 0, 0, 0, 0, 3450.00, 0, 0, 0, 0, 0], total: 3450.00, invoices: 1 },
  { name: "Nexus Pharmaceuticals LLC", monthly: [0, 0, 3375.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 3375.00, invoices: 1 },
  { name: "Continental Food Est.", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 3188.00, 0, 0], total: 3188.00, invoices: 2 },
  { name: "Khayber Medical Center", monthly: [0, 0, 2275.00, 0, 0, 0, 850.00, 0, 0, 0, 0, 0], total: 3125.00, invoices: 2 },
  { name: "Zoom ME Global", monthly: [0, 200.00, 0, 0, 0, 0, 0, 0, 0, 2800.00, 0, 0], total: 3000.00, invoices: 2 },
  { name: "IDM International University", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 2950.00, 0, 0], total: 2950.00, invoices: 1 },
  { name: "Foodings Restaurant FZCO", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 2926.00, 0, 0, 0], total: 2926.00, invoices: 1 },
  { name: "St. Mary's Catholic Church", monthly: [0, 0, 0, 0, 0, 0, 0, 2165.00, 0, 675.00, 0, 0], total: 2840.00, invoices: 2 },
  { name: "INFINITY INVESTMENTS LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2760.00], total: 2760.00, invoices: 1 },
  { name: "The Meisters Club", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2742.86, 0], total: 2742.86, invoices: 1 },
  { name: "DHR MENA FZ-LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2520.00, 0], total: 2520.00, invoices: 1 },
  { name: "Snap Ark Global", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 2500.00, 0, 0], total: 2500.00, invoices: 1 },
  { name: "Carat Craft Jewellery Trading", monthly: [0, 0, 0, 0, 0, 2400.00, 0, 0, 0, 0, 0, 0], total: 2400.00, invoices: 1 },
  { name: "Boxable", monthly: [2250.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 2250.00, invoices: 1 },
  { name: "LATICRETE MIDDLE EAST LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2230.00], total: 2230.00, invoices: 1 },
  { name: "ENSO HEALTHCARE DMCC", monthly: [0, 0, 2000.00, 0, 95.00, 0, 0, 95.00, 0, 0, 0, 0], total: 2190.00, invoices: 3 },
  { name: "Enso Life Sciences", monthly: [0, 0, 2000.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 2000.00, invoices: 1 },
  { name: "Times College", monthly: [0, 1700.00, 405.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 2105.00, invoices: 2 },
  { name: "Paragon Properties", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1960.00], total: 1960.00, invoices: 1 },
  { name: "MEINHARDT (SINGAPORE) PTE LTD", monthly: [0, 0, 0, 0, 510.00, 0, 0, 0, 1350.00, 0, 0, 0], total: 1860.00, invoices: 2 },
  { name: "Realty Force Real Estate Brokers", monthly: [0, 0, 0, 1800.00, 0, 0, 0, 0, 0, 0, 0, 0], total: 1800.00, invoices: 1 },
  { name: "BUDGET RENT A CAR LLC", monthly: [0, 0, 0, 0, 0, 1800.00, 0, 0, 0, 0, 0, 0], total: 1800.00, invoices: 1 },
  { name: "Petit Forestier Transportation", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1775.00, 0], total: 1775.00, invoices: 1 },
  { name: "Nanjing International Stationary", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1650.00], total: 1650.00, invoices: 1 },
  { name: "BMC SOFTWARE LIMITED", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 1400.00, 225.00, 0, 0], total: 1625.00, invoices: 2 },
  { name: "Mashreq Bank", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1584.00], total: 1584.00, invoices: 1 },
  { name: "Snaxsouk Foodstuff Trading", monthly: [0, 1525.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 1525.00, invoices: 2 },
  { name: "Ms. Gulnara Vafina", monthly: [0, 0, 0, 0, 0, 0, 0, 1450.00, 0, 0, 0, 0], total: 1450.00, invoices: 2 },
  { name: "KDU World", monthly: [0, 1395.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 1395.00, invoices: 1 },
  { name: "Qudra Fitness", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1350.00], total: 1350.00, invoices: 1 },
  { name: "Cedar Tree Hospitality", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1238.10, 0], total: 1238.10, invoices: 2 },
  { name: "MAWARID FINANCE (P J S C)", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 475.00, 714.29, 0, 0], total: 1189.29, invoices: 2 },
  { name: "FAD Institute of Luxury Fashion", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1125.00], total: 1125.00, invoices: 1 },
  { name: "Gulf Root - Dubai", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1050.00, 0, 0], total: 1050.00, invoices: 1 },
  { name: "Gulftainer Company Limited Iraq", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1050.00, 0, 0], total: 1050.00, invoices: 1 },
  { name: "MAV Access LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 1025.00, 0, 0, 0], total: 1025.00, invoices: 2 },
  { name: "Magic Colour Interior Decoration", monthly: [0, 0, 0, 0, 1005.00, 0, 0, 0, 0, 0, 0, 0], total: 1005.00, invoices: 1 },
  { name: "4C Integrated Communicators", monthly: [0, 0, 0, 0, 0, 0, 0, 750.00, 0, 250.00, 0, 0], total: 1000.00, invoices: 2 },
  { name: "Sea Magic Recreational Services", monthly: [0, 0, 1000.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 1000.00, invoices: 1 },
  { name: "SANSKARA LIFESTYLE COACHING", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1000.00, 0, 0], total: 1000.00, invoices: 1 },
  { name: "TRAVEL STORY FOR TRAVEL", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 990.00, 0, 0, 0], total: 990.00, invoices: 1 },
  { name: "Momentum Logistics", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 980.00, 0, 0], total: 980.00, invoices: 1 },
  { name: "Elevations Exhibition & Design", monthly: [0, 0, 0, 915.00, 0, 0, 0, 0, 0, 0, 0, 0], total: 915.00, invoices: 1 },
  { name: "LEAN Industries LLC", monthly: [0, 915.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 915.00, invoices: 1 },
  { name: "Keystone Tax Consultancy LLC", monthly: [0, 0, 790.00, 0, 100.00, 0, 0, 0, 0, 0, 0, 0], total: 890.00, invoices: 3 },
  { name: "Rio Travels LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 880.00, 0, 0, 0], total: 880.00, invoices: 1 },
  { name: "VITEC", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 840.00, 0, 0, 0], total: 840.00, invoices: 2 },
  { name: "Al Wehda Properties", monthly: [0, 800.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 800.00, invoices: 1 },
  { name: "Four Corners Printing Press", monthly: [0, 0, 0, 0, 0, 0, 0, 800.00, 0, 0, 0, 0], total: 800.00, invoices: 1 },
  { name: "Baklawa Made Better Sugar", monthly: [0, 0, 0, 0, 0, 405.00, 0, 0, 0, 0, 375.00, 0], total: 780.00, invoices: 2 },
  { name: "BINAYAH PROPERTIES L.L.C", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 780.00, 0, 0], total: 780.00, invoices: 1 },
  { name: "Vision Business Consulting", monthly: [0, 175.00, 0, 320.00, 0, 275.00, 0, 0, 0, 0, 0, 0], total: 770.00, invoices: 3 },
  { name: "Lynceus Management Consulting", monthly: [0, 0, 0, 0, 0, 0, 0, 590.00, 0, 135.00, 0, 0], total: 725.00, invoices: 2 },
  { name: "SEA Trans Shipping", monthly: [0, 0, 450.00, 175.00, 0, 545.00, 0, 0, 0, 0, 0, 0], total: 1170.00, invoices: 3 },
  { name: "Greystone Real Estate", monthly: [0, 0, 0, 0, 0, 0, 0, 700.00, 0, 0, 0, 0], total: 700.00, invoices: 1 },
  { name: "MAF General Trading LLC", monthly: [0, 0, 0, 0, 0, 0, 700.00, 0, 0, 0, 0, 0], total: 700.00, invoices: 1 },
  { name: "Yield4Management FZC", monthly: [0, 0, 696.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 696.00, invoices: 1 },
  { name: "IBP Cargo Services LLC", monthly: [0, 0, 690.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 690.00, invoices: 1 },
  { name: "Ms. Lisa Brown", monthly: [0, 0, 400.00, 0, 0, 0, 0, 0, 0, 0, 290.00, 0], total: 690.00, invoices: 2 },
  { name: "Damco (UAE) FZE", monthly: [0, 0, 0, 0, 0, 307.50, 0, 0, 0, 0, 375.00, 0], total: 682.50, invoices: 2 },
  { name: "Aditi Kejriwal", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 675.00, 0], total: 675.00, invoices: 2 },
  { name: "Trinity College Dublin", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 680.00, 0, 0], total: 680.00, invoices: 1 },
  { name: "Damco Logistics LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 615.00, 0, 0], total: 615.00, invoices: 1 },
  { name: "CANDY MAIDS CLEANING SERVICES", monthly: [0, 0, 0, 0, 0, 0, 0, 590.00, 0, 0, 0, 0], total: 590.00, invoices: 1 },
  { name: "At Your Service Productions", monthly: [0, 0, 0, 0, 0, 570.00, 0, 0, 0, 0, 0, 0], total: 570.00, invoices: 1 },
  { name: "Tristar Transport LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 550.00, 0, 0, 0], total: 550.00, invoices: 1 },
  { name: "FIRST AND TEN PRODUCTIONS", monthly: [0, 0, 0, 0, 170.00, 375.00, 0, 0, 0, 0, 0, 0], total: 545.00, invoices: 2 },
  { name: "Global Credit Recoveries", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 265.00, 0, 265.00, 0], total: 530.00, invoices: 2 },
  { name: "Diesel Marine & Power Intl", monthly: [0, 1050.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 1050.00, invoices: 2 },
  { name: "Confident Building Materials", monthly: [0, 0, 0, 0, 350.00, 0, 0, 0, 0, 175.00, 0, 0], total: 525.00, invoices: 2 },
  { name: "Datagram Network Technologies", monthly: [525.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 525.00, invoices: 1 },
  { name: "Italfood FZ - LLC", monthly: [0, 0, 0, 0, 0, 495.00, 0, 0, 0, 0, 0, 0], total: 495.00, invoices: 2 },
  { name: "Indo Tausch Trading DMCC", monthly: [0, 0, 220.00, 0, 0, 0, 0, 290.00, 290.00, 0, 0, 0], total: 800.00, invoices: 4 },
  { name: "Wadi Al Amal Technical Services", monthly: [0, 0, 0, 250.00, 0, 0, 0, 250.00, 0, 0, 0, 0], total: 500.00, invoices: 2 },
  { name: "Red Melon Marketing Management", monthly: [0, 500.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 500.00, invoices: 1 },
  { name: "Sharp Middle East FZE", monthly: [0, 0, 0, 0, 0, 475.00, 0, 0, 0, 0, 0, 0], total: 475.00, invoices: 1 },
  { name: "KNIGHTSBRIDGE WINDOW CLEANING", monthly: [0, 0, 0, 0, 475.00, 0, 0, 0, 0, 0, 0, 0], total: 475.00, invoices: 1 },
  { name: "ENSO GLOBAL TRADING LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 460.00, 0, 0, 0, 0], total: 460.00, invoices: 1 },
  { name: "Capital Club Limited", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 450.00, 0], total: 450.00, invoices: 1 },
  { name: "Easy Shop General Trading", monthly: [0, 0, 0, 0, 0, 450.00, 0, 0, 0, 0, 0, 0], total: 450.00, invoices: 1 },
  { name: "Infinity Group", monthly: [0, 0, 0, 0, 0, 0, 450.00, 0, 0, 0, 0, 0], total: 450.00, invoices: 1 },
  { name: "AL YOUSUF MOTORS (L.L.C)", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 450.00], total: 450.00, invoices: 1 },
  { name: "Mr. Arvind Revankar", monthly: [0, 0, 437.25, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 437.25, invoices: 1 },
  { name: "Styli FZE", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 430.00, 0], total: 430.00, invoices: 1 },
  { name: "Al Shamsi Holdings", monthly: [0, 418.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 418.00, invoices: 1 },
  { name: "IBM Global Middle East FZE", monthly: [80.00, 0, 0, 80.00, 0, 0, 80.00, 0, 0, 80.00, 80.00, 0], total: 400.00, invoices: 5 },
  { name: "Tratou Corp", monthly: [0, 0, 0, 0, 0, 0, 400.00, 0, 0, 0, 0, 0], total: 400.00, invoices: 1 },
  { name: "Qsat Communications L.L.C.", monthly: [0, 0, 0, 0, 0, 375.00, 0, 0, 0, 0, 0, 0], total: 375.00, invoices: 1 },
  { name: "XAD Future", monthly: [0, 0, 376.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 376.00, invoices: 1 },
  { name: "Customer Experience Group", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 375.00, 0], total: 375.00, invoices: 1 },
  { name: "Sparrow Travel and Tourism", monthly: [350.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 350.00, invoices: 1 },
  { name: "Global Connect Advisory", monthly: [0, 0, 115.00, 150.00, 80.00, 0, 0, 0, 0, 0, 0, 0], total: 345.00, invoices: 3 },
  { name: "Mr. Sujeet Varma", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 339.00, 0, 0, 0], total: 339.00, invoices: 1 },
  { name: "Mr. Andrew Rodrigues", monthly: [333.33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 333.33, invoices: 1 },
  { name: "White Mist and Cloud Trading", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 300.00, 0, 0], total: 300.00, invoices: 1 },
  { name: "Ms. Lakshika Fernando", monthly: [0, 295.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 295.00, invoices: 2 },
  { name: "Mr. Ali Hassan", monthly: [0, 0, 0, 0, 0, 0, 293.75, 0, 0, 0, 0, 0], total: 293.75, invoices: 2 },
  { name: "HARBOUR MIDDLE EAST", monthly: [0, 0, 290.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 290.00, invoices: 1 },
  { name: "Blanco Specialty Coffee", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 290.00, 0, 0, 0], total: 290.00, invoices: 1 },
  { name: "Bhaveshkumar J Nagda", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 285.71, 0], total: 285.71, invoices: 1 },
  { name: "Somerset Clinic FZ LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 285.00, 0], total: 285.00, invoices: 2 },
  { name: "Kristine Dela Cruz", monthly: [100.00, 0, 0, 0, 0, 175.00, 0, 0, 0, 0, 0, 0], total: 275.00, invoices: 2 },
  { name: "Buildmate Technical Services", monthly: [0, 0, 0, 0, 68.00, 0, 0, 204.00, 0, 0, 0, 0], total: 272.00, invoices: 2 },
  { name: "Gardner Denver FZE", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 260.00], total: 260.00, invoices: 2 },
  { name: "ABDULHAMID YOUSUF ADVOCATES", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 250.00, 0], total: 250.00, invoices: 1 },
  { name: "Ms. Dana Ghandour", monthly: [0, 0, 0, 0, 238.10, 0, 0, 0, 0, 0, 0, 0], total: 238.10, invoices: 1 },
  { name: "H.H. Sheikh Hamad Bin Khalifa", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 210.00, 0], total: 210.00, invoices: 1 },
  { name: "Mr. Hussain", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 210.00, 0, 0, 0], total: 210.00, invoices: 1 },
  { name: "Eataly Restaurant", monthly: [0, 0, 0, 0, 0, 0, 200.00, 0, 0, 0, 0, 0], total: 200.00, invoices: 1 },
  { name: "Xpert Learning FZ-LLC", monthly: [0, 0, 180.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 180.00, invoices: 1 },
  { name: "Whirlpool MEEA DMCC", monthly: [175.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 175.00, invoices: 1 },
  { name: "TECHBAYT", monthly: [0, 0, 175.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 175.00, invoices: 1 },
  { name: "AL JABER TRADING ENTERPRISE", monthly: [0, 0, 0, 0, 0, 0, 175.00, 0, 0, 0, 0, 0], total: 175.00, invoices: 1 },
  { name: "Ms. Rizza", monthly: [0, 0, 0, 170.00, 0, 0, 0, 0, 0, 0, 0, 0], total: 170.00, invoices: 1 },
  { name: "Webnotech Global", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 150.00, 0, 0, 0], total: 150.00, invoices: 1 },
  { name: "SPH Global Holdings LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 142.86, 0, 0, 0], total: 142.86, invoices: 1 },
  { name: "Perfect Battery Solutions", monthly: [0, 0, 0, 0, 125.00, 0, 0, 0, 0, 0, 0, 0], total: 125.00, invoices: 1 },
  { name: "ALFATONIC GENERAL TRADING", monthly: [0, 0, 0, 0, 0, 120.00, 0, 0, 0, 0, 0, 0], total: 120.00, invoices: 1 },
  { name: "The Pride Traders LLC", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 120.00, 0], total: 120.00, invoices: 1 },
  { name: "WEATHER TECH ELECTRO-MECHANICAL", monthly: [0, 0, 0, 115.00, 0, 0, 0, 0, 0, 0, 0, 0], total: 115.00, invoices: 1 },
  { name: "Kreative Inception", monthly: [0, 110.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 110.00, invoices: 1 },
  { name: "Smart Biz Auditing", monthly: [0, 0, 105.00, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 105.00, invoices: 1 },
  { name: "Mr. Andrew", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 90.00, 0], total: 90.00, invoices: 1 },
  { name: "Drive Rent a Car", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 75.00, 0, 0, 0], total: 75.00, invoices: 1 },
  { name: "Mr. Abdallah", monthly: [45.23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 45.23, invoices: 1 },
  { name: "Ms. April Villar", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 619.05, 0, 0, 0], total: 619.05, invoices: 1 },
  { name: "Mr. Saji", monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 480.00, 0, 0], total: 480.00, invoices: 1 },
];

// Month names for reference
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Calculate monthly aggregates from the detailed data
function calculateMonthlyAggregates(): MonthlyData[] {
  const monthlyData: MonthlyData[] = [];
  
  for (let i = 0; i < 12; i++) {
    let premiumRevenue = 0;
    let normalRevenue = 0;
    let oneTimeRevenue = 0;
    let premiumInvoices = 0;
    let normalInvoices = 0;
    let oneTimeInvoices = 0;
    const premiumClientsSet = new Set<string>();
    const normalClientsSet = new Set<string>();
    const oneTimeClientsSet = new Set<string>();

    // Premium clients
    for (const client of PREMIUM_CLIENTS_MONTHLY) {
      const monthlyAmount = client.monthly[i];
      if (monthlyAmount > 0) {
        premiumRevenue += monthlyAmount;
        premiumClientsSet.add(client.name);
        // Estimate invoices based on proportion of monthly amount to total
        const proportion = monthlyAmount / client.total;
        premiumInvoices += Math.max(1, Math.round(client.invoices * proportion));
      }
    }

    // Normal clients
    for (const client of NORMAL_CLIENTS_MONTHLY) {
      const monthlyAmount = client.monthly[i];
      if (monthlyAmount > 0) {
        normalRevenue += monthlyAmount;
        normalClientsSet.add(client.name);
        const proportion = monthlyAmount / client.total;
        normalInvoices += Math.max(1, Math.round(client.invoices * proportion));
      }
    }

    monthlyData.push({
      month: MONTHS[i],
      monthNum: i + 1,
      revenue: premiumRevenue + normalRevenue + oneTimeRevenue,
      invoices: premiumInvoices + normalInvoices + oneTimeInvoices,
      clients: premiumClientsSet.size + normalClientsSet.size + oneTimeClientsSet.size,
      premiumRevenue,
      normalRevenue,
      oneTimeRevenue,
      premiumInvoices,
      normalInvoices,
      oneTimeInvoices,
      premiumClients: premiumClientsSet.size,
      normalClients: normalClientsSet.size,
      oneTimeClients: oneTimeClientsSet.size,
      avgInvoiceValue: (premiumRevenue + normalRevenue + oneTimeRevenue) / Math.max(1, premiumInvoices + normalInvoices + oneTimeInvoices),
      topClients: [],
    });
  }

  return monthlyData;
}

// Hardcoded monthly data from the masterlist (Grand Total row)
const MONTHLY_TOTALS = [
  { month: "Jan", revenue: 115040.31, invoices: 67 },
  { month: "Feb", revenue: 151483.45, invoices: 74 },
  { month: "Mar", revenue: 130335.00, invoices: 78 },
  { month: "Apr", revenue: 64637.89, invoices: 50 },
  { month: "May", revenue: 120437.60, invoices: 67 },
  { month: "Jun", revenue: 132274.23, invoices: 65 },
  { month: "Jul", revenue: 77949.75, invoices: 53 },
  { month: "Aug", revenue: 90059.63, invoices: 64 },
  { month: "Sep", revenue: 213916.30, invoices: 98 },
  { month: "Oct", revenue: 241925.29, invoices: 100 },
  { month: "Nov", revenue: 155604.87, invoices: 93 },
  { month: "Dec", revenue: 171781.69, invoices: 88 },
];

// Build precise monthly data using the masterlist totals
function buildMonthlyData(): MonthlyData[] {
  const calculated = calculateMonthlyAggregates();
  
  return MONTHLY_TOTALS.map((mt, i) => {
    const calc = calculated[i];
    const totalCalc = calc.premiumRevenue + calc.normalRevenue + calc.oneTimeRevenue;
    const scale = totalCalc > 0 ? mt.revenue / totalCalc : 1;
    const premRev = Math.round(calc.premiumRevenue * scale * 100) / 100;
    const normRev = Math.round(calc.normalRevenue * scale * 100) / 100;
    const oneRev = Math.round((mt.revenue - premRev - normRev) * 100) / 100;
    
    return {
      month: mt.month,
      monthNum: i + 1,
      revenue: mt.revenue,
      invoices: mt.invoices,
      clients: calc.clients,
      premiumRevenue: premRev,
      normalRevenue: normRev,
      oneTimeRevenue: oneRev,
      premiumInvoices: calc.premiumInvoices,
      normalInvoices: calc.normalInvoices,
      oneTimeInvoices: calc.oneTimeInvoices,
      premiumClients: calc.premiumClients,
      normalClients: calc.normalClients,
      oneTimeClients: calc.oneTimeClients,
      avgInvoiceValue: mt.revenue / mt.invoices,
      topClients: [],
    };
  });
}

// Calculate totals
const premiumTotal = PREMIUM_CLIENTS_MONTHLY.reduce((sum, c) => sum + c.total, 0);
const normalTotal = NORMAL_CLIENTS_MONTHLY.reduce((sum, c) => sum + c.total, 0);
const totalRevenue = 1665446.01; // From masterlist Grand Total
const oneTimeTotal = totalRevenue - premiumTotal - normalTotal;

let cachedAggregates: MasterlistAggregates2022 | null = null;

export function loadMasterlistAggregates2022(): MasterlistAggregates2022 {
  if (cachedAggregates) return cachedAggregates;

  const monthlyData = buildMonthlyData();
  
  const totalInvoices = 897; // From masterlist
  const totalClients = 223; // From masterlist (unique client rows)

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
