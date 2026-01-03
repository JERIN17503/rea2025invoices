// Complete client invoice data extracted from the masterlist (2025 Insights)

export interface ClientSummary {
  name: string;
  invoiceCount: number;
  totalAmount: number;
  category: 'premium' | 'one-time' | 'normal';
  salesPersons: string[];
  description?: string;
}

// Premium Clients (4+ invoices)
export const premiumClients: ClientSummary[] = [
  { name: "IDP Education (Merged)", invoiceCount: 47, totalAmount: 382278, category: 'premium', salesPersons: ["REENA"] },
  { name: "Navitas / Murdoch University", invoiceCount: 65, totalAmount: 303558, category: 'premium', salesPersons: ["REENA"] },
  { name: "Gulftainer Company Limited", invoiceCount: 51, totalAmount: 112862, category: 'premium', salesPersons: ["REENA"] },
  { name: "GrokGlobal Services", invoiceCount: 15, totalAmount: 83052, category: 'premium', salesPersons: ["REENA"] },
  { name: "Deakin University (Merged)", invoiceCount: 7, totalAmount: 78750, category: 'premium', salesPersons: ["REENA"] },
  { name: "Hult Investments (Merged)", invoiceCount: 13, totalAmount: 60144, category: 'premium', salesPersons: ["REENA"] },
  { name: "Trane BVBA (Merged)", invoiceCount: 44, totalAmount: 43184, category: 'premium', salesPersons: ["REENA"] },
  { name: "Continental Middle East DMCC", invoiceCount: 7, totalAmount: 39493, category: 'premium', salesPersons: ["REENA"] },
  { name: "Logic Utilities District Cooling", invoiceCount: 18, totalAmount: 37745, category: 'premium', salesPersons: ["REENA"] },
  { name: "Aurantius Real Estate Broker", invoiceCount: 23, totalAmount: 30457, category: 'premium', salesPersons: ["REENA"] },
  { name: "Tappy Toes Nursery DWC-LLC", invoiceCount: 10, totalAmount: 29722, category: 'premium', salesPersons: ["REENA"] },
  { name: "BNI Polaris", invoiceCount: 47, totalAmount: 23453, category: 'premium', salesPersons: ["BNI"] },
  { name: "ANB Automobiles L.L.C", invoiceCount: 6, totalAmount: 18233, category: 'premium', salesPersons: ["REENA"] },
  { name: "Styfect Furnitures", invoiceCount: 6, totalAmount: 15630, category: 'premium', salesPersons: ["BNI"] },
  { name: "Sea Centre Shipping Services", invoiceCount: 8, totalAmount: 14664, category: 'premium', salesPersons: ["BNI"] },
  { name: "Five Building Materials Trading", invoiceCount: 6, totalAmount: 10962, category: 'premium', salesPersons: ["BNI"] },
  { name: "Huxley Associates Global", invoiceCount: 9, totalAmount: 9675, category: 'premium', salesPersons: ["REENA"] },
  { name: "Al Suhail Ship Maintenance", invoiceCount: 6, totalAmount: 8523, category: 'premium', salesPersons: ["REENA"] },
  { name: "Al Afnan Steel Ind. Co. LLC", invoiceCount: 7, totalAmount: 8343, category: 'premium', salesPersons: ["BNI"] },
  { name: "Indo Tausch Trading (Merged)", invoiceCount: 6, totalAmount: 6066, category: 'premium', salesPersons: ["REENA"] },
  { name: "M E A D Medical Supplies", invoiceCount: 7, totalAmount: 4303, category: 'premium', salesPersons: ["REENA"] },
  { name: "Unique World Business Centre", invoiceCount: 24, totalAmount: 2945, category: 'premium', salesPersons: ["REENA"] },
  { name: "Momentum Logistics LLC", invoiceCount: 10, totalAmount: 1947, category: 'premium', salesPersons: ["REENA"] },
  { name: "Supercad Trading L.L.C", invoiceCount: 6, totalAmount: 1375, category: 'premium', salesPersons: ["BNI"] },
];

// Normal/Regular Clients (2-3 invoices)
export const normalClients: ClientSummary[] = [
  { name: "CACOGES", invoiceCount: 3, totalAmount: 42729, category: 'normal', salesPersons: ["REENA"] },
  { name: "Stellar Advertising LLC", invoiceCount: 5, totalAmount: 30253, category: 'normal', salesPersons: ["REENA"] },
  { name: "Alef Education Consultancy", invoiceCount: 4, totalAmount: 19563, category: 'normal', salesPersons: ["REENA"] },
  { name: "Olympus MEA FZ-LLC", invoiceCount: 3, totalAmount: 19661, category: 'normal', salesPersons: ["SREERAJ"] },
  { name: "DHR MENA FZ-LLC", invoiceCount: 3, totalAmount: 15165, category: 'normal', salesPersons: ["SREERAJ"] },
  { name: "Thermo Fisher Scientific", invoiceCount: 4, totalAmount: 14532, category: 'normal', salesPersons: ["REENA"] },
  { name: "Radiometer Medical ApS", invoiceCount: 4, totalAmount: 14351, category: 'normal', salesPersons: ["REENA"] },
  { name: "North Telecom LLC", invoiceCount: 3, totalAmount: 12985, category: 'normal', salesPersons: ["REENA"] },
  { name: "Emirates for Universal Tyres", invoiceCount: 4, totalAmount: 12848, category: 'normal', salesPersons: ["REENA"] },
  { name: "Paragon Properties", invoiceCount: 3, totalAmount: 11655, category: 'normal', salesPersons: ["MELVIN"] },
  { name: "Bianca and Bianco Trading", invoiceCount: 4, totalAmount: 9208, category: 'normal', salesPersons: ["REENA"] },
  { name: "Stanford Marine Group", invoiceCount: 2, totalAmount: 7549, category: 'normal', salesPersons: ["REENA"] },
  { name: "SECA GMBH & CO. KG", invoiceCount: 2, totalAmount: 7259, category: 'normal', salesPersons: ["ANAND"] },
  { name: "Marafek Electromechanical", invoiceCount: 3, totalAmount: 7250, category: 'normal', salesPersons: ["BNI"] },
  { name: "Ms. Karine Leonian", invoiceCount: 2, totalAmount: 7100, category: 'normal', salesPersons: ["ANAND"] },
  { name: "Dahya Yachts Repairing", invoiceCount: 2, totalAmount: 6764, category: 'normal', salesPersons: ["MELVIN"] },
  { name: "Al Tayer Insignia LLC", invoiceCount: 3, totalAmount: 6535, category: 'normal', salesPersons: ["REENA"] },
  { name: "ARK Creators", invoiceCount: 4, totalAmount: 6357, category: 'normal', salesPersons: ["BNI"] },
  { name: "J C S Artificial Flowers", invoiceCount: 5, totalAmount: 6329, category: 'normal', salesPersons: ["REENA"] },
  { name: "Dubai Academic Health", invoiceCount: 2, totalAmount: 6325, category: 'normal', salesPersons: ["REENA"] },
  { name: "Mega Com Media LLC", invoiceCount: 2, totalAmount: 6137, category: 'normal', salesPersons: ["BNI"] },
  { name: "Investmenter Real Estate", invoiceCount: 3, totalAmount: 5881, category: 'normal', salesPersons: ["REENA"] },
  { name: "Avant FZ LLC", invoiceCount: 3, totalAmount: 5559, category: 'normal', salesPersons: ["BNI"] },
  { name: "Swiss Business Council", invoiceCount: 2, totalAmount: 5407, category: 'normal', salesPersons: ["REENA"] },
  { name: "Expert United Marine", invoiceCount: 2, totalAmount: 5064, category: 'normal', salesPersons: ["REENA"] },
  { name: "World Data Feasibility", invoiceCount: 3, totalAmount: 4509, category: 'normal', salesPersons: ["REENA"] },
  { name: "Al Rashed United DMCC", invoiceCount: 3, totalAmount: 4278, category: 'normal', salesPersons: ["REENA"] },
  { name: "Contitech Fluids Oil", invoiceCount: 3, totalAmount: 4141, category: 'normal', salesPersons: ["REENA"] },
  { name: "Emboss - FZCO", invoiceCount: 3, totalAmount: 4116, category: 'normal', salesPersons: ["REENA"] },
  { name: "LIV Global Travel LLC", invoiceCount: 2, totalAmount: 4105, category: 'normal', salesPersons: ["REENA"] },
  { name: "Arametal Oil Field Equipment", invoiceCount: 3, totalAmount: 3722, category: 'normal', salesPersons: ["REENA"] },
  { name: "Locke Lifestyle Properties", invoiceCount: 3, totalAmount: 3521, category: 'normal', salesPersons: ["REENA"] },
  { name: "Onestep Global Ingress", invoiceCount: 2, totalAmount: 3433, category: 'normal', salesPersons: ["REENA"] },
  { name: "Taz Rajabali", invoiceCount: 3, totalAmount: 3211, category: 'normal', salesPersons: ["REENA"] },
  { name: "Bloomsbury Lane", invoiceCount: 3, totalAmount: 3207, category: 'normal', salesPersons: ["BNI"] },
  { name: "Al Jalila Foundation", invoiceCount: 3, totalAmount: 3152, category: 'normal', salesPersons: ["REENA"] },
  { name: "Royex Technologies L.L.C", invoiceCount: 2, totalAmount: 3134, category: 'normal', salesPersons: ["BNI"] },
  { name: "Onboard Sky Freight Services", invoiceCount: 3, totalAmount: 3087, category: 'normal', salesPersons: ["REENA"] },
  { name: "ENH Marketing L.L.C", invoiceCount: 2, totalAmount: 2677, category: 'normal', salesPersons: ["BNI"] },
  { name: "BLS LAD Chartered Accountants", invoiceCount: 4, totalAmount: 2436, category: 'normal', salesPersons: ["BNI"] },
  { name: "Finhub Middle East", invoiceCount: 3, totalAmount: 2362, category: 'normal', salesPersons: ["REENA"] },
  { name: "Dhyana Digital Marketing", invoiceCount: 4, totalAmount: 2244, category: 'normal', salesPersons: ["REENA"] },
  { name: "Voxtel Communications", invoiceCount: 2, totalAmount: 2110, category: 'normal', salesPersons: ["REENA"] },
  { name: "EDGE Technical Solution", invoiceCount: 3, totalAmount: 2048, category: 'normal', salesPersons: ["BNI"] },
  { name: "Axis Workshop", invoiceCount: 3, totalAmount: 2022, category: 'normal', salesPersons: ["BNI"] },
  { name: "Lloyds Energy DMCC", invoiceCount: 5, totalAmount: 1989, category: 'normal', salesPersons: ["REENA"] },
  { name: "Perfect Tools Moulds Factory", invoiceCount: 2, totalAmount: 1942, category: 'normal', salesPersons: ["REENA"] },
  { name: "Black Swan Business Setup", invoiceCount: 2, totalAmount: 1805, category: 'normal', salesPersons: ["REENA"] },
  { name: "Excelsior Escapes and Events", invoiceCount: 4, totalAmount: 1560, category: 'normal', salesPersons: ["REENA"] },
  { name: "Oculus Middle East Contracting", invoiceCount: 2, totalAmount: 1548, category: 'normal', salesPersons: ["BNI"] },
  { name: "Narjis Printing and Publishing", invoiceCount: 2, totalAmount: 1475, category: 'normal', salesPersons: ["REENA"] },
  { name: "Melius Consulting", invoiceCount: 2, totalAmount: 1446, category: 'normal', salesPersons: ["REENA"] },
  { name: "Ingersoll-Rand", invoiceCount: 4, totalAmount: 1365, category: 'normal', salesPersons: ["REENA"] },
  { name: "Union Church", invoiceCount: 2, totalAmount: 1302, category: 'normal', salesPersons: ["REENA"] },
  { name: "Madhuri Narkar", invoiceCount: 2, totalAmount: 1193, category: 'normal', salesPersons: ["BNI"] },
  { name: "Counselling Point Training", invoiceCount: 2, totalAmount: 1060, category: 'normal', salesPersons: ["ANAND"] },
  { name: "Gardner Denver FZE", invoiceCount: 2, totalAmount: 987, category: 'normal', salesPersons: ["REENA"] },
  { name: "Kotug Middle East DMCC", invoiceCount: 2, totalAmount: 933, category: 'normal', salesPersons: ["REENA"] },
  { name: "SPH Global Holdings LLC", invoiceCount: 2, totalAmount: 881, category: 'normal', salesPersons: ["REENA"] },
  { name: "JNT Car Rental L.L.C", invoiceCount: 2, totalAmount: 719, category: 'normal', salesPersons: ["BNI"] },
  { name: "Cambridge Education Group", invoiceCount: 2, totalAmount: 615, category: 'normal', salesPersons: ["REENA"] },
  { name: "Ms. Baiba Butler", invoiceCount: 2, totalAmount: 525, category: 'normal', salesPersons: ["BNI"] },
  { name: "Muhammad Umer Tariq", invoiceCount: 2, totalAmount: 427, category: 'normal', salesPersons: ["BNI"] },
  { name: "Netision Global Technologies", invoiceCount: 3, totalAmount: 393, category: 'normal', salesPersons: ["REENA"] },
  { name: "RIMO Pharmaceuticals DMCC", invoiceCount: 2, totalAmount: 388, category: 'normal', salesPersons: ["REENA"] },
  { name: "Visionary Furniture Trading", invoiceCount: 2, totalAmount: 383, category: 'normal', salesPersons: ["REENA"] },
  { name: "Career Tree", invoiceCount: 3, totalAmount: 194, category: 'normal', salesPersons: ["BNI"] },
];

// One-Time Clients (1 invoice)
export const oneTimeClients: ClientSummary[] = [
  { name: "Four Corners Printing Press", invoiceCount: 1, totalAmount: 19687, category: 'one-time', salesPersons: ["REENA"], description: "Ribbon with printing" },
  { name: "Alfa Tonic LLC", invoiceCount: 1, totalAmount: 13807, category: 'one-time', salesPersons: ["ANAND"], description: "Box (2 Models)" },
  { name: "Chint Middle East", invoiceCount: 1, totalAmount: 10447, category: 'one-time', salesPersons: ["REENA"], description: "Tshirt (round neck)" },
  { name: "Adirondack Architectural", invoiceCount: 1, totalAmount: 10158, category: 'one-time', salesPersons: ["REENA"], description: "Vehicle branding" },
  { name: "Mr. Mohamed Sinaj Sali", invoiceCount: 1, totalAmount: 9591, category: 'one-time', salesPersons: ["BNI"], description: "Notebook, PVC card, Plaques" },
  { name: "GNX", invoiceCount: 1, totalAmount: 7481, category: 'one-time', salesPersons: ["SREERAJ"], description: "Bio Fresh Roundneck T shirt" },
  { name: "Warm Glow Goods", invoiceCount: 1, totalAmount: 6465, category: 'one-time', salesPersons: ["REENA"], description: "Vehicle Branding" },
  { name: "One World One Network", invoiceCount: 1, totalAmount: 6204, category: 'one-time', salesPersons: ["BNI"], description: "Teddy Bear Plush Toy" },
  { name: "BC Academy International", invoiceCount: 1, totalAmount: 5460, category: 'one-time', salesPersons: ["REENA"], description: "Paper cups" },
  { name: "Radiant Car Workshop", invoiceCount: 1, totalAmount: 5210, category: 'one-time', salesPersons: ["MELVIN"], description: "Polo shirt, Cargo pant" },
  { name: "Maersk Logistics", invoiceCount: 1, totalAmount: 5040, category: 'one-time', salesPersons: ["SREERAJ"], description: "Polo shirt (Uniform)" },
  { name: "Secured Medical Direction", invoiceCount: 1, totalAmount: 5002, category: 'one-time', salesPersons: ["REENA"], description: "Poster, Flyers" },
  { name: "DAPTAVE", invoiceCount: 1, totalAmount: 4987, category: 'one-time', salesPersons: ["ANAND"], description: "Indoor Signage" },
  { name: "ASK-CA Auditing of Accounts", invoiceCount: 1, totalAmount: 4725, category: 'one-time', salesPersons: ["REENA"], description: "Brochure, Rubber stamp" },
  { name: "Sharaf Travel Services", invoiceCount: 1, totalAmount: 4281, category: 'one-time', salesPersons: ["REENA"], description: "T shirt, Acrylic Paint Set" },
  { name: "Munich Motor Works", invoiceCount: 1, totalAmount: 4200, category: 'one-time', salesPersons: ["SREERAJ"], description: "Glass branding" },
  { name: "Prazi Medical Devices", invoiceCount: 1, totalAmount: 4016, category: 'one-time', salesPersons: ["BNI"], description: "Booth branding" },
  { name: "Take Me Live", invoiceCount: 1, totalAmount: 4016, category: 'one-time', salesPersons: ["REENA"], description: "Safety Vest" },
  { name: "Church of South India", invoiceCount: 1, totalAmount: 4000, category: 'one-time', salesPersons: ["ANAND"], description: "Consultation Charges" },
  { name: "Ms. Ling", invoiceCount: 1, totalAmount: 3937, category: 'one-time', salesPersons: ["REENA"], description: "Envelopes and Card" },
  { name: "Applus RTD Gulf DMCC", invoiceCount: 1, totalAmount: 3858, category: 'one-time', salesPersons: ["REENA"], description: "Sunshade" },
  { name: "Regent Institute Middle East", invoiceCount: 1, totalAmount: 3730, category: 'one-time', salesPersons: ["REENA"], description: "Bag, Bottle, Pen" },
  { name: "Beautiful Horizons ELC", invoiceCount: 1, totalAmount: 3465, category: 'one-time', salesPersons: ["REENA"], description: "Workbook - A, B and C" },
  { name: "Aishwarya Searing", invoiceCount: 1, totalAmount: 3412, category: 'one-time', salesPersons: ["REENA"], description: "Backdrop and Invitation Card" },
  { name: "Jubaili Bros S.A.L.", invoiceCount: 1, totalAmount: 3346, category: 'one-time', salesPersons: ["REENA"], description: "GRS-Certified Backpack" },
  { name: "SR Resources FZC", invoiceCount: 1, totalAmount: 2635, category: 'one-time', salesPersons: ["REENA"], description: "Brochure" },
  { name: "Lane Community College", invoiceCount: 1, totalAmount: 2598, category: 'one-time', salesPersons: ["REENA"], description: "Postcards, Flyers, Banner" },
  { name: "Vela Arc Real Estate", invoiceCount: 1, totalAmount: 2493, category: 'one-time', salesPersons: ["SREERAJ"], description: "Voucher Book" },
  { name: "George Brown College", invoiceCount: 1, totalAmount: 2478, category: 'one-time', salesPersons: ["REENA"], description: "Brochure and Flyer" },
  { name: "Jerin Jersey", invoiceCount: 1, totalAmount: 2310, category: 'one-time', salesPersons: ["REENA"], description: "Tshirt sets" },
  { name: "Royal Page Co FZE", invoiceCount: 1, totalAmount: 2268, category: 'one-time', salesPersons: ["REENA"], description: "Crystal Awards" },
  { name: "Linea Strong", invoiceCount: 1, totalAmount: 2168, category: 'one-time', salesPersons: ["REENA"], description: "Brochure - Huron University" },
  { name: "Quattro Capital Investment", invoiceCount: 1, totalAmount: 1998, category: 'one-time', salesPersons: ["SREERAJ"], description: "Table Flags and Notebook" },
  { name: "Orience Documents Clearance", invoiceCount: 1, totalAmount: 1867, category: 'one-time', salesPersons: ["SREERAJ"], description: "Table Flags and Big flag" },
  { name: "Huron University at Western", invoiceCount: 1, totalAmount: 1863, category: 'one-time', salesPersons: ["REENA"], description: "Brochure and Transportation" },
  { name: "Ms. Karishma Joshi", invoiceCount: 1, totalAmount: 1764, category: 'one-time', salesPersons: ["REENA"], description: "Tote Bag and A4 Book" },
  { name: "IBM Global Middle East", invoiceCount: 1, totalAmount: 1722, category: 'one-time', salesPersons: ["REENA"], description: "Notepad and World Map" },
  { name: "TAM Trading FZ-LLC", invoiceCount: 1, totalAmount: 1653, category: 'one-time', salesPersons: ["REENA"], description: "Brochure" },
  { name: "BNI Terra", invoiceCount: 1, totalAmount: 1538, category: 'one-time', salesPersons: ["BNI"], description: "Handy Powerbank" },
  { name: "Beckman Coulter", invoiceCount: 1, totalAmount: 1454, category: 'one-time', salesPersons: ["REENA"], description: "Customized Lanyard" },
  { name: "Dandidor", invoiceCount: 1, totalAmount: 1443, category: 'one-time', salesPersons: ["REENA"], description: "Stress ball" },
  { name: "Duplast Building Materials", invoiceCount: 1, totalAmount: 1375, category: 'one-time', salesPersons: ["BNI"], description: "PU NoteBook" },
  { name: "At Your Service Productions", invoiceCount: 1, totalAmount: 1370, category: 'one-time', salesPersons: ["REENA"], description: "Polo Shirt" },
  { name: "Mawarid Finance", invoiceCount: 1, totalAmount: 1338, category: 'one-time', salesPersons: ["REENA"], description: "Glass branding" },
  { name: "Datagram Network", invoiceCount: 1, totalAmount: 1260, category: 'one-time', salesPersons: ["REENA"], description: "Business Card" },
  { name: "Guardian International", invoiceCount: 1, totalAmount: 1050, category: 'one-time', salesPersons: ["ANAND"], description: "Designing Charges" },
  { name: "Advantage Printing Services", invoiceCount: 1, totalAmount: 1008, category: 'one-time', salesPersons: ["REENA"], description: "Polo shirts" },
  { name: "Power Lease Vehicle Rental", invoiceCount: 1, totalAmount: 1000, category: 'one-time', salesPersons: ["REENA"], description: "Backdrop Banner" },
  { name: "Mobile Business Company", invoiceCount: 1, totalAmount: 937, category: 'one-time', salesPersons: ["REENA"], description: "Embroidery On Polo shirts" },
  { name: "Ms. Latika Vieira", invoiceCount: 1, totalAmount: 918, category: 'one-time', salesPersons: ["BNI"], description: "Customised 2 tier Cake" },
  { name: "Umesh C K", invoiceCount: 1, totalAmount: 907, category: 'one-time', salesPersons: ["BNI"], description: "Wooden Plaque" },
  { name: "Ms. Sally Souleman", invoiceCount: 1, totalAmount: 856, category: 'one-time', salesPersons: ["REENA"], description: "Hoodies" },
  { name: "ORIGA General Contracting", invoiceCount: 1, totalAmount: 787, category: 'one-time', salesPersons: ["BNI"], description: "Business Card" },
  { name: "AARK Marketing Services", invoiceCount: 1, totalAmount: 771, category: 'one-time', salesPersons: ["BNI"], description: "Polo shirt" },
  { name: "Event Lab FZ LLC", invoiceCount: 1, totalAmount: 729, category: 'one-time', salesPersons: ["REENA"], description: "Pin badge" },
  { name: "Ramfoam Containers Mfg", invoiceCount: 1, totalAmount: 722, category: 'one-time', salesPersons: ["SREERAJ"], description: "Safety Vest" },
  { name: "Saurabh General Trading", invoiceCount: 1, totalAmount: 672, category: 'one-time', salesPersons: ["BNI"], description: "Signage" },
  { name: "Atelie Ice Cream Mfg", invoiceCount: 1, totalAmount: 611, category: 'one-time', salesPersons: ["REENA"], description: "Embroidery on Polo shirts" },
  { name: "Ario Arteh Design Services", invoiceCount: 1, totalAmount: 588, category: 'one-time', salesPersons: ["BNI"], description: "3 fold flyer" },
  { name: "Buildmate Technical Services", invoiceCount: 1, totalAmount: 588, category: 'one-time', salesPersons: ["REENA"], description: "Polo Shirt" },
  { name: "Divi Digital Co LLC", invoiceCount: 1, totalAmount: 563, category: 'one-time', salesPersons: ["BNI"], description: "Polo Shirt" },
  { name: "Lamsah Glass", invoiceCount: 1, totalAmount: 535, category: 'one-time', salesPersons: ["BNI"], description: "Business Card" },
  { name: "Ms. Yasmine Nasr", invoiceCount: 1, totalAmount: 525, category: 'one-time', salesPersons: ["BNI"], description: "Birthday Balloon Prop" },
  { name: "Ms. Sarah Btaddini", invoiceCount: 1, totalAmount: 525, category: 'one-time', salesPersons: ["BNI"], description: "Birthday Balloon Prop" },
  { name: "V7 Electro World FZCO", invoiceCount: 1, totalAmount: 456, category: 'one-time', salesPersons: ["REENA"], description: "Business card" },
  { name: "University of Manchester", invoiceCount: 1, totalAmount: 404, category: 'one-time', salesPersons: ["SREERAJ"], description: "Tyvek Wrist band" },
  { name: "ARKA Ventures", invoiceCount: 1, totalAmount: 393, category: 'one-time', salesPersons: ["BNI"], description: "Business card" },
  { name: "Trica Technical Works", invoiceCount: 1, totalAmount: 367, category: 'one-time', salesPersons: ["REENA"], description: "Designing Charges" },
  { name: "Belen Electronics Trading", invoiceCount: 1, totalAmount: 350, category: 'one-time', salesPersons: ["DARSHAN"], description: "Flyer, stamp" },
  { name: "St Mary's Konkani Community", invoiceCount: 1, totalAmount: 350, category: 'one-time', salesPersons: ["ANAND"], description: "Roll Up Banner" },
  { name: "Accentia Consulting", invoiceCount: 1, totalAmount: 346, category: 'one-time', salesPersons: ["BNI"], description: "Business cards" },
  { name: "Unique Pathfinders Trading", invoiceCount: 1, totalAmount: 329, category: 'one-time', salesPersons: ["REENA"], description: "Draw String Bag" },
  { name: "Mini Royal Creative Metal", invoiceCount: 1, totalAmount: 325, category: 'one-time', salesPersons: ["REENA"], description: "Delivery Note" },
  { name: "Adverve Marketing Management", invoiceCount: 1, totalAmount: 315, category: 'one-time', salesPersons: ["BNI"], description: "Sample Cost" },
  { name: "Waisl Digital", invoiceCount: 1, totalAmount: 309, category: 'one-time', salesPersons: ["REENA"], description: "Business card" },
  { name: "Ms. Lisa Brown", invoiceCount: 1, totalAmount: 304, category: 'one-time', salesPersons: ["REENA"], description: "Business Cards" },
  { name: "Daniel Ferdinandusz", invoiceCount: 1, totalAmount: 299, category: 'one-time', salesPersons: ["REENA"], description: "Tote bag" },
  { name: "Enara Properties", invoiceCount: 1, totalAmount: 294, category: 'one-time', salesPersons: ["REENA"], description: "Business card, Poster" },
  { name: "Mr. Ajesh Mohan", invoiceCount: 1, totalAmount: 289, category: 'one-time', salesPersons: ["BNI"], description: "Business cards" },
  { name: "Ms Krishma Gehani", invoiceCount: 1, totalAmount: 284, category: 'one-time', salesPersons: ["BNI"], description: "Ceramic mugs" },
  { name: "Mr. Edwin", invoiceCount: 1, totalAmount: 245, category: 'one-time', salesPersons: ["SREERAJ"], description: "Polo shirts" },
  { name: "Sarah for Food and Beverages", invoiceCount: 1, totalAmount: 237, category: 'one-time', salesPersons: ["SREERAJ"], description: "Polo shirt and Cap" },
  { name: "Gamayun Consultancy", invoiceCount: 1, totalAmount: 236, category: 'one-time', salesPersons: ["REENA"], description: "Business card" },
  { name: "Kaizen Business Consultants", invoiceCount: 1, totalAmount: 236, category: 'one-time', salesPersons: ["REENA"], description: "Business Card" },
  { name: "Woolwich Institute FZ-LLC", invoiceCount: 1, totalAmount: 220, category: 'one-time', salesPersons: ["REENA"], description: "Receipt Voucher Book" },
  { name: "Mr. Graham", invoiceCount: 1, totalAmount: 220, category: 'one-time', salesPersons: ["REENA"], description: "Printing of Birthday banner" },
  { name: "BNI Visit Host team", invoiceCount: 1, totalAmount: 220, category: 'one-time', salesPersons: ["BNI"], description: "Sash" },
  { name: "Medrich Care Dental", invoiceCount: 1, totalAmount: 219, category: 'one-time', salesPersons: ["BNI"], description: "Digital Business NFC Card" },
  { name: "Mohamed Farouk Osman", invoiceCount: 1, totalAmount: 200, category: 'one-time', salesPersons: ["REENA"], description: "Poster" },
  { name: "FMCG FZCO", invoiceCount: 1, totalAmount: 199, category: 'one-time', salesPersons: ["BNI"], description: "Rollup banner" },
  { name: "Fusion Bites", invoiceCount: 1, totalAmount: 194, category: 'one-time', salesPersons: ["REENA"], description: "Discount Voucher" },
  { name: "Mr. Raad Almobark", invoiceCount: 1, totalAmount: 194, category: 'one-time', salesPersons: ["REENA"], description: "Business card" },
  { name: "Ecofuture General Trading", invoiceCount: 1, totalAmount: 183, category: 'one-time', salesPersons: ["BNI"], description: "Rollup Banner" },
  { name: "Lynceus Management Consulting", invoiceCount: 1, totalAmount: 157, category: 'one-time', salesPersons: ["PROFORMA"], description: "Designing charges" },
  { name: "ROI Management Consultancy", invoiceCount: 1, totalAmount: 157, category: 'one-time', salesPersons: ["REENA"], description: "Rollup Banner" },
  { name: "Gloace Fintax Consultants", invoiceCount: 1, totalAmount: 152, category: 'one-time', salesPersons: ["REENA"], description: "Rollup Banner" },
  { name: "Green Pasture Technical", invoiceCount: 1, totalAmount: 150, category: 'one-time', salesPersons: ["REENA"], description: "Polo Shirts" },
  { name: "4C Integrated Communicators", invoiceCount: 1, totalAmount: 141, category: 'one-time', salesPersons: ["REENA"], description: "Polo shirt" },
  { name: "VAM International FZE", invoiceCount: 1, totalAmount: 131, category: 'one-time', salesPersons: ["BNI"], description: "Flyers" },
  { name: "Keystone Consulting FZE", invoiceCount: 1, totalAmount: 126, category: 'one-time', salesPersons: ["BNI"], description: "Rubber Stamp" },
  { name: "Legal Square", invoiceCount: 1, totalAmount: 105, category: 'one-time', salesPersons: ["REENA"], description: "Sample cost" },
  { name: "Mr. Sahendra Jaiswar", invoiceCount: 1, totalAmount: 99, category: 'one-time', salesPersons: ["BNI"], description: "Photo Frame" },
  { name: "Mr. P V B P Sarma", invoiceCount: 1, totalAmount: 75, category: 'one-time', salesPersons: ["BNI"], description: "SKROSS Coffee Maker" },
];

// Get all clients combined
export function getAllClients(): ClientSummary[] {
  return [...premiumClients, ...normalClients, ...oneTimeClients].sort((a, b) => b.totalAmount - a.totalAmount);
}

// Get category stats
export function getCategoryStats() {
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
    totalAmount: premium.totalAmount + oneTime.totalAmount + normal.totalAmount,
    totalInvoices: premium.totalInvoices + oneTime.totalInvoices + normal.totalInvoices,
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
