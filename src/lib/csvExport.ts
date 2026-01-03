type ExportableData = Record<string, string | number | boolean | null | undefined>;

export const exportToCSV = (data: ExportableData[], filename: string) => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        // Handle values that might contain commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value ?? '';
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const formatClientForExport = (client: {
  name: string;
  invoiceCount: number;
  totalAmount: number;
  salesPersons: string[];
}, category: string) => ({
  'Client Name': client.name,
  'Category': category,
  'Invoice Count': client.invoiceCount,
  'Total Amount (AED)': client.totalAmount,
  'Sales Person': client.salesPersons.join(', ')
});
