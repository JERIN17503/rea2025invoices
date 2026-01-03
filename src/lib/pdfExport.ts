import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ClientData {
  name: string;
  invoiceCount: number;
  totalAmount: number;
  salesPersons: string[];
}

interface CategoryStats {
  count: number;
  totalInvoices: number;
  totalAmount: number;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const exportClientsPDF = async (
  clients: ClientData[],
  title: string,
  stats: CategoryStats,
  chartElementId?: string
) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = 20;

  // Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(title, margin, yPosition);
  yPosition += 10;

  // Date
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(100);
  pdf.text(`Generated on: ${new Date().toLocaleDateString('en-GB')}`, margin, yPosition);
  yPosition += 15;

  // Summary Stats
  pdf.setTextColor(0);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Summary', margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Total Clients: ${stats.count}`, margin, yPosition);
  yPosition += 6;
  pdf.text(`Total Invoices: ${stats.totalInvoices}`, margin, yPosition);
  yPosition += 6;
  pdf.text(`Total Revenue: ${formatCurrency(stats.totalAmount)}`, margin, yPosition);
  yPosition += 6;
  pdf.text(`Average Value per Client: ${formatCurrency(stats.totalAmount / stats.count)}`, margin, yPosition);
  yPosition += 15;

  // Capture chart if element exists
  if (chartElementId) {
    const chartElement = document.getElementById(chartElementId);
    if (chartElement) {
      try {
        const canvas = await html2canvas(chartElement, {
          scale: 2,
          backgroundColor: '#ffffff',
          logging: false,
        });
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Check if we need a new page
        if (yPosition + imgHeight > pdf.internal.pageSize.getHeight() - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        
        pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, Math.min(imgHeight, 100));
        yPosition += Math.min(imgHeight, 100) + 10;
      } catch (error) {
        console.error('Error capturing chart:', error);
      }
    }
  }

  // Client List Header
  if (yPosition > pdf.internal.pageSize.getHeight() - 60) {
    pdf.addPage();
    yPosition = margin;
  }

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Client List', margin, yPosition);
  yPosition += 10;

  // Table Header
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setFillColor(240, 240, 240);
  pdf.rect(margin, yPosition - 5, pageWidth - (margin * 2), 8, 'F');
  pdf.text('#', margin + 2, yPosition);
  pdf.text('Client Name', margin + 12, yPosition);
  pdf.text('Invoices', margin + 90, yPosition);
  pdf.text('Total Amount', margin + 115, yPosition);
  pdf.text('Sales Person(s)', margin + 145, yPosition);
  yPosition += 8;

  // Table Rows
  pdf.setFont('helvetica', 'normal');
  clients.forEach((client, index) => {
    if (yPosition > pdf.internal.pageSize.getHeight() - 20) {
      pdf.addPage();
      yPosition = margin;
      
      // Repeat header on new page
      pdf.setFont('helvetica', 'bold');
      pdf.setFillColor(240, 240, 240);
      pdf.rect(margin, yPosition - 5, pageWidth - (margin * 2), 8, 'F');
      pdf.text('#', margin + 2, yPosition);
      pdf.text('Client Name', margin + 12, yPosition);
      pdf.text('Invoices', margin + 90, yPosition);
      pdf.text('Total Amount', margin + 115, yPosition);
      pdf.text('Sales Person(s)', margin + 145, yPosition);
      yPosition += 8;
      pdf.setFont('helvetica', 'normal');
    }

    // Alternate row background
    if (index % 2 === 0) {
      pdf.setFillColor(250, 250, 250);
      pdf.rect(margin, yPosition - 4, pageWidth - (margin * 2), 7, 'F');
    }

    pdf.text(`${index + 1}`, margin + 2, yPosition);
    
    // Truncate long names
    const clientName = client.name.length > 40 ? client.name.substring(0, 37) + '...' : client.name;
    pdf.text(clientName, margin + 12, yPosition);
    
    pdf.text(`${client.invoiceCount}`, margin + 90, yPosition);
    pdf.text(formatCurrency(client.totalAmount), margin + 115, yPosition);
    
    const salesPersons = client.salesPersons.join(', ');
    const truncatedSalesPersons = salesPersons.length > 20 ? salesPersons.substring(0, 17) + '...' : salesPersons;
    pdf.text(truncatedSalesPersons, margin + 145, yPosition);
    
    yPosition += 7;
  });

  // Footer
  const pageCount = pdf.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(150);
    pdf.text(
      `Page ${i} of ${pageCount} | REA Advertising Client Report`,
      pageWidth / 2,
      pdf.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Save
  const fileName = `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};

export const exportAllClientsPDF = async (
  premiumClients: ClientData[],
  normalClients: ClientData[],
  oneTimeClients: ClientData[],
  premiumStats: CategoryStats,
  normalStats: CategoryStats,
  oneTimeStats: CategoryStats
) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = 20;

  // Title Page
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Client Remarketing Report', margin, yPosition);
  yPosition += 12;

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(100);
  pdf.text('REA Advertising - Invoice Masterlist 2025 Analysis', margin, yPosition);
  yPosition += 8;
  pdf.text(`Generated on: ${new Date().toLocaleDateString('en-GB')}`, margin, yPosition);
  yPosition += 20;

  // Overall Summary
  pdf.setTextColor(0);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Executive Summary', margin, yPosition);
  yPosition += 12;

  const totalClients = premiumStats.count + normalStats.count + oneTimeStats.count;
  const totalRevenue = premiumStats.totalAmount + normalStats.totalAmount + oneTimeStats.totalAmount;
  const totalInvoices = premiumStats.totalInvoices + normalStats.totalInvoices + oneTimeStats.totalInvoices;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  const summaryData = [
    ['Total Clients:', totalClients.toString()],
    ['Total Revenue:', formatCurrency(totalRevenue)],
    ['Total Invoices:', totalInvoices.toString()],
    ['', ''],
    ['Premium Clients:', `${premiumStats.count} (${formatCurrency(premiumStats.totalAmount)})`],
    ['Normal Clients:', `${normalStats.count} (${formatCurrency(normalStats.totalAmount)})`],
    ['One-Time Clients:', `${oneTimeStats.count} (${formatCurrency(oneTimeStats.totalAmount)})`],
  ];

  summaryData.forEach(([label, value]) => {
    if (label) {
      pdf.setFont('helvetica', 'bold');
      pdf.text(label, margin, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.text(value, margin + 45, yPosition);
    }
    yPosition += 7;
  });

  // Add each category
  const addCategorySection = (
    clients: ClientData[],
    title: string,
    stats: CategoryStats,
    colorR: number,
    colorG: number,
    colorB: number
  ) => {
    pdf.addPage();
    yPosition = margin;

    // Section Header
    pdf.setFillColor(colorR, colorG, colorB);
    pdf.rect(margin, yPosition - 5, pageWidth - (margin * 2), 12, 'F');
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255);
    pdf.text(title, margin + 5, yPosition + 3);
    yPosition += 15;

    // Stats
    pdf.setTextColor(0);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Clients: ${stats.count} | Invoices: ${stats.totalInvoices} | Revenue: ${formatCurrency(stats.totalAmount)} | Avg: ${formatCurrency(stats.totalAmount / stats.count)}`, margin, yPosition);
    yPosition += 12;

    // Table Header
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.setFillColor(240, 240, 240);
    pdf.rect(margin, yPosition - 4, pageWidth - (margin * 2), 7, 'F');
    pdf.text('#', margin + 2, yPosition);
    pdf.text('Client Name', margin + 10, yPosition);
    pdf.text('Invoices', margin + 85, yPosition);
    pdf.text('Total Amount', margin + 105, yPosition);
    pdf.text('Sales Person(s)', margin + 135, yPosition);
    yPosition += 7;

    // Rows
    pdf.setFont('helvetica', 'normal');
    clients.forEach((client, index) => {
      if (yPosition > pdf.internal.pageSize.getHeight() - 20) {
        pdf.addPage();
        yPosition = margin;
        
        pdf.setFont('helvetica', 'bold');
        pdf.setFillColor(240, 240, 240);
        pdf.rect(margin, yPosition - 4, pageWidth - (margin * 2), 7, 'F');
        pdf.text('#', margin + 2, yPosition);
        pdf.text('Client Name', margin + 10, yPosition);
        pdf.text('Invoices', margin + 85, yPosition);
        pdf.text('Total Amount', margin + 105, yPosition);
        pdf.text('Sales Person(s)', margin + 135, yPosition);
        yPosition += 7;
        pdf.setFont('helvetica', 'normal');
      }

      if (index % 2 === 0) {
        pdf.setFillColor(250, 250, 250);
        pdf.rect(margin, yPosition - 3, pageWidth - (margin * 2), 6, 'F');
      }

      pdf.text(`${index + 1}`, margin + 2, yPosition);
      const clientName = client.name.length > 35 ? client.name.substring(0, 32) + '...' : client.name;
      pdf.text(clientName, margin + 10, yPosition);
      pdf.text(`${client.invoiceCount}`, margin + 85, yPosition);
      pdf.text(formatCurrency(client.totalAmount), margin + 105, yPosition);
      const sp = client.salesPersons.join(', ');
      pdf.text(sp.length > 20 ? sp.substring(0, 17) + '...' : sp, margin + 135, yPosition);
      yPosition += 6;
    });
  };

  addCategorySection(premiumClients, 'Premium Clients (4+ invoices)', premiumStats, 245, 158, 11);
  addCategorySection(normalClients, 'Normal Clients (2-3 invoices)', normalStats, 16, 185, 129);
  addCategorySection(oneTimeClients, 'One-Time Clients (1 invoice)', oneTimeStats, 59, 130, 246);

  // Footer on all pages
  const pageCount = pdf.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(150);
    pdf.text(
      `Page ${i} of ${pageCount} | REA Advertising Client Report`,
      pageWidth / 2,
      pdf.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  pdf.save(`all-clients-report-${new Date().toISOString().split('T')[0]}.pdf`);
};

interface YoYTotals {
  totalRevenue: number;
  totalInvoices: number;
  totalClients: number;
  avgInvoiceValue: number;
  premiumTotal: number;
  normalTotal: number;
  oneTimeTotal: number;
}

interface MonthlyData {
  month: string;
  revenue: number;
  invoices: number;
  premiumRevenue: number;
  normalRevenue: number;
  oneTimeRevenue: number;
}

export const exportYoYComparisonPDF = async (
  totals2024: YoYTotals,
  totals2025: YoYTotals,
  monthlyData2024: MonthlyData[],
  monthlyData2025: MonthlyData[],
  reportElementId?: string
) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 15;
  let yPosition = 20;

  const calcChange = (v2024: number, v2025: number) => {
    if (v2024 === 0) return v2025 > 0 ? 100 : 0;
    return ((v2025 - v2024) / v2024) * 100;
  };

  const formatChange = (change: number) => {
    const sign = change > 0 ? "+" : "";
    return `${sign}${change.toFixed(1)}%`;
  };

  // Title
  pdf.setFontSize(22);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Year-over-Year Comparison Report', margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(100);
  pdf.text('REA Advertising - 2024 vs 2025 Analysis', margin, yPosition);
  yPosition += 6;
  pdf.text(`Generated on: ${new Date().toLocaleDateString('en-GB')}`, margin, yPosition);
  yPosition += 15;

  // Key Metrics Section
  pdf.setTextColor(0);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Key Metrics Comparison', margin, yPosition);
  yPosition += 10;

  // Table Header
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setFillColor(30, 41, 59);
  pdf.rect(margin, yPosition - 5, pageWidth - (margin * 2), 8, 'F');
  pdf.setTextColor(255);
  pdf.text('Metric', margin + 5, yPosition);
  pdf.text('2024', margin + 70, yPosition);
  pdf.text('2025', margin + 110, yPosition);
  pdf.text('Change', margin + 150, yPosition);
  yPosition += 8;

  pdf.setTextColor(0);
  pdf.setFont('helvetica', 'normal');

  const metrics = [
    { 
      name: 'Total Revenue', 
      v2024: formatCurrency(totals2024.totalRevenue), 
      v2025: formatCurrency(totals2025.totalRevenue),
      change: calcChange(totals2024.totalRevenue, totals2025.totalRevenue)
    },
    { 
      name: 'Total Invoices', 
      v2024: totals2024.totalInvoices.toString(), 
      v2025: totals2025.totalInvoices.toString(),
      change: calcChange(totals2024.totalInvoices, totals2025.totalInvoices)
    },
    { 
      name: 'Total Clients', 
      v2024: totals2024.totalClients.toString(), 
      v2025: totals2025.totalClients.toString(),
      change: calcChange(totals2024.totalClients, totals2025.totalClients)
    },
    { 
      name: 'Avg Invoice Value', 
      v2024: formatCurrency(totals2024.avgInvoiceValue), 
      v2025: formatCurrency(totals2025.avgInvoiceValue),
      change: calcChange(totals2024.avgInvoiceValue, totals2025.avgInvoiceValue)
    },
    { 
      name: 'Premium Revenue', 
      v2024: formatCurrency(totals2024.premiumTotal), 
      v2025: formatCurrency(totals2025.premiumTotal),
      change: calcChange(totals2024.premiumTotal, totals2025.premiumTotal)
    },
    { 
      name: 'Normal Revenue', 
      v2024: formatCurrency(totals2024.normalTotal), 
      v2025: formatCurrency(totals2025.normalTotal),
      change: calcChange(totals2024.normalTotal, totals2025.normalTotal)
    },
    { 
      name: 'One-Time Revenue', 
      v2024: formatCurrency(totals2024.oneTimeTotal), 
      v2025: formatCurrency(totals2025.oneTimeTotal),
      change: calcChange(totals2024.oneTimeTotal, totals2025.oneTimeTotal)
    },
  ];

  metrics.forEach((metric, index) => {
    if (index % 2 === 0) {
      pdf.setFillColor(248, 250, 252);
      pdf.rect(margin, yPosition - 4, pageWidth - (margin * 2), 7, 'F');
    }
    
    pdf.setFont('helvetica', 'normal');
    pdf.text(metric.name, margin + 5, yPosition);
    pdf.text(metric.v2024, margin + 70, yPosition);
    pdf.setFont('helvetica', 'bold');
    pdf.text(metric.v2025, margin + 110, yPosition);
    
    // Color the change
    if (metric.change > 0) {
      pdf.setTextColor(34, 197, 94);
    } else if (metric.change < 0) {
      pdf.setTextColor(239, 68, 68);
    } else {
      pdf.setTextColor(100);
    }
    pdf.text(formatChange(metric.change), margin + 150, yPosition);
    pdf.setTextColor(0);
    
    yPosition += 7;
  });

  yPosition += 10;

  // Monthly Comparison Table
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Monthly Revenue Comparison', margin, yPosition);
  yPosition += 10;

  // Monthly Table Header
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.setFillColor(30, 41, 59);
  pdf.rect(margin, yPosition - 5, pageWidth - (margin * 2), 8, 'F');
  pdf.setTextColor(255);
  pdf.text('Month', margin + 5, yPosition);
  pdf.text('2024 Revenue', margin + 35, yPosition);
  pdf.text('2025 Revenue', margin + 70, yPosition);
  pdf.text('Change', margin + 105, yPosition);
  pdf.text('2024 Invoices', margin + 130, yPosition);
  pdf.text('2025 Invoices', margin + 160, yPosition);
  yPosition += 8;

  pdf.setTextColor(0);
  pdf.setFont('helvetica', 'normal');

  monthlyData2024.forEach((m2024, idx) => {
    const m2025 = monthlyData2025[idx] || { revenue: 0, invoices: 0 };
    const change = calcChange(m2024.revenue, m2025.revenue);
    
    if (idx % 2 === 0) {
      pdf.setFillColor(248, 250, 252);
      pdf.rect(margin, yPosition - 4, pageWidth - (margin * 2), 6, 'F');
    }
    
    pdf.text(m2024.month.slice(0, 3), margin + 5, yPosition);
    pdf.text(formatCurrency(m2024.revenue), margin + 35, yPosition);
    pdf.text(formatCurrency(m2025.revenue), margin + 70, yPosition);
    
    if (change > 0) {
      pdf.setTextColor(34, 197, 94);
    } else if (change < 0) {
      pdf.setTextColor(239, 68, 68);
    } else {
      pdf.setTextColor(100);
    }
    pdf.text(formatChange(change), margin + 105, yPosition);
    pdf.setTextColor(0);
    
    pdf.text(m2024.invoices.toString(), margin + 130, yPosition);
    pdf.text(m2025.invoices.toString(), margin + 160, yPosition);
    
    yPosition += 6;
  });

  // Capture charts if element exists
  if (reportElementId) {
    const reportElement = document.getElementById(reportElementId);
    if (reportElement) {
      try {
        pdf.addPage();
        yPosition = margin;
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Visual Charts', margin, yPosition);
        yPosition += 10;

        const canvas = await html2canvas(reportElement, {
          scale: 2,
          backgroundColor: '#ffffff',
          logging: false,
          useCORS: true,
        });
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, Math.min(imgHeight, 250));
      } catch (error) {
        console.error('Error capturing charts:', error);
      }
    }
  }

  // Footer on all pages
  const pageCount = pdf.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(150);
    pdf.text(
      `Page ${i} of ${pageCount} | REA Advertising YoY Comparison Report`,
      pageWidth / 2,
      pdf.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  pdf.save(`yoy-comparison-report-${new Date().toISOString().split('T')[0]}.pdf`);
};
