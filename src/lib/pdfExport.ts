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
