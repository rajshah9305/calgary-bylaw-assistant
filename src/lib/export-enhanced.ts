// Enhanced export functionality with multiple formats

import type { ZoningData, FeasibilityResult } from '@/types/zoning';
import type { DetailedAnalysis } from './advanced-analysis';

export interface ExportData {
  zoningData: ZoningData;
  feasibility: FeasibilityResult;
  detailedAnalysis?: DetailedAnalysis;
  timestamp: string;
  mapSnapshot?: string; // base64 image
}

export function exportToJSON(data: ExportData): void {
  const json = JSON.stringify(data, null, 2);
  downloadFile(json, `zoning-report-${Date.now()}.json`, 'application/json');
}

export function exportToCSV(data: ExportData): void {
  const rows = [
    ['Property Information', ''],
    ['Address', data.zoningData.address || 'N/A'],
    ['Community', data.zoningData.community],
    ['Zoning Code', data.zoningData.luCode],
    ['Report Date', data.timestamp],
    ['', ''],
    ['Feasibility Analysis', ''],
    ['Backyard Suite', data.feasibility.backyardSuite.status],
    ['Secondary Suite', data.feasibility.secondarySuite.status],
    ['Rowhouse', data.feasibility.rowhouse.status],
    ['Max Height', data.feasibility.maxHeight],
    ['', ''],
  ];

  if (data.detailedAnalysis) {
    rows.push(
      ['Lot Requirements', ''],
      ['Min Lot Size (m²)', data.detailedAnalysis.lotRequirements.minLotSize.toString()],
      ['Min Width (m)', data.detailedAnalysis.lotRequirements.minLotWidth.toString()],
      ['Max Site Coverage (%)', data.detailedAnalysis.lotRequirements.maxSiteCoverage.toString()],
      ['Max FAR', data.detailedAnalysis.lotRequirements.maxFloorAreaRatio.toString()],
      ['', ''],
      ['Costs', ''],
      ['Development Permit', `$${data.detailedAnalysis.costs.developmentPermit.min}-$${data.detailedAnalysis.costs.developmentPermit.max}`],
      ['Building Permit', `$${data.detailedAnalysis.costs.buildingPermit.min}-$${data.detailedAnalysis.costs.buildingPermit.max}`],
      ['Timeline', data.detailedAnalysis.costs.estimatedTimeline],
    );
  }

  const csv = rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  downloadFile(csv, `zoning-report-${Date.now()}.csv`, 'text/csv');
}

export function exportToMarkdown(data: ExportData): void {
  let md = `# Zoning Analysis Report\n\n`;
  md += `**Generated:** ${data.timestamp}\n\n`;
  md += `## Property Information\n\n`;
  md += `- **Address:** ${data.zoningData.address || 'N/A'}\n`;
  md += `- **Community:** ${data.zoningData.community}\n`;
  md += `- **Zoning Code:** ${data.zoningData.luCode}\n\n`;
  
  md += `## Feasibility Analysis\n\n`;
  md += `### Backyard Suite\n`;
  md += `- **Status:** ${data.feasibility.backyardSuite.status}\n`;
  md += `- ${data.feasibility.backyardSuite.description}\n\n`;
  
  md += `### Secondary Suite\n`;
  md += `- **Status:** ${data.feasibility.secondarySuite.status}\n`;
  md += `- ${data.feasibility.secondarySuite.description}\n\n`;
  
  md += `### Rowhouse\n`;
  md += `- **Status:** ${data.feasibility.rowhouse.status}\n`;
  md += `- ${data.feasibility.rowhouse.description}\n\n`;
  
  md += `### Building Height\n`;
  md += `- **Maximum:** ${data.feasibility.maxHeight}\n\n`;

  if (data.feasibility.notes.length > 0) {
    md += `## Important Notes\n\n`;
    data.feasibility.notes.forEach(note => {
      md += `- ${note}\n`;
    });
    md += `\n`;
  }

  if (data.detailedAnalysis) {
    md += `## Detailed Requirements\n\n`;
    md += `### Lot Requirements\n`;
    md += `- Minimum Lot Size: ${data.detailedAnalysis.lotRequirements.minLotSize}m²\n`;
    md += `- Minimum Width: ${data.detailedAnalysis.lotRequirements.minLotWidth}m\n`;
    md += `- Maximum Site Coverage: ${data.detailedAnalysis.lotRequirements.maxSiteCoverage}%\n`;
    md += `- Maximum FAR: ${data.detailedAnalysis.lotRequirements.maxFloorAreaRatio}\n\n`;

    md += `### Setbacks\n`;
    md += `- Front: ${data.detailedAnalysis.setbacks.front}m\n`;
    md += `- Rear: ${data.detailedAnalysis.setbacks.rear}m\n`;
    md += `- Side: ${data.detailedAnalysis.setbacks.side}m\n`;
    md += `- Garage: ${data.detailedAnalysis.setbacks.garage}m from lane\n\n`;

    md += `### Estimated Costs\n`;
    md += `- Development Permit: $${data.detailedAnalysis.costs.developmentPermit.min}-$${data.detailedAnalysis.costs.developmentPermit.max}\n`;
    md += `- Building Permit: $${data.detailedAnalysis.costs.buildingPermit.min}-$${data.detailedAnalysis.costs.buildingPermit.max}\n`;
    md += `- Timeline: ${data.detailedAnalysis.costs.estimatedTimeline}\n\n`;

    if (data.detailedAnalysis.opportunities.length > 0) {
      md += `### Opportunities\n`;
      data.detailedAnalysis.opportunities.forEach(opp => {
        md += `- ${opp}\n`;
      });
      md += `\n`;
    }

    if (data.detailedAnalysis.risks.length > 0) {
      md += `### Risks & Considerations\n`;
      data.detailedAnalysis.risks.forEach(risk => {
        md += `- ${risk}\n`;
      });
      md += `\n`;
    }

    if (data.detailedAnalysis.nextSteps.length > 0) {
      md += `### Next Steps\n`;
      data.detailedAnalysis.nextSteps.forEach((step, i) => {
        md += `${i + 1}. ${step}\n`;
      });
      md += `\n`;
    }
  }

  md += `---\n\n`;
  md += `*This report is for informational purposes only. Always verify with the City of Calgary Planning Department.*\n`;

  downloadFile(md, `zoning-report-${Date.now()}.md`, 'text/markdown');
}

export function exportToPDF(data: ExportData): void {
  // For PDF export, we'll create an HTML version and use browser print
  const html = generateHTMLReport(data);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }
}

function generateHTMLReport(data: ExportData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Zoning Analysis Report</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
      color: #333;
    }
    h1 { color: #1a1a1a; border-bottom: 3px solid #0066cc; padding-bottom: 10px; }
    h2 { color: #0066cc; margin-top: 30px; }
    h3 { color: #333; margin-top: 20px; }
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .permitted { background: #d4edda; color: #155724; }
    .likely { background: #fff3cd; color: #856404; }
    .prohibited { background: #f8d7da; color: #721c24; }
    .manual-review { background: #e2e3e5; color: #383d41; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f8f9fa; font-weight: 600; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #ddd; font-size: 12px; color: #666; }
    @media print {
      body { margin: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <h1>Zoning Analysis Report</h1>
  <p><strong>Generated:</strong> ${data.timestamp}</p>
  
  <h2>Property Information</h2>
  <table>
    <tr><th>Address</th><td>${data.zoningData.address || 'N/A'}</td></tr>
    <tr><th>Community</th><td>${data.zoningData.community}</td></tr>
    <tr><th>Zoning Code</th><td>${data.zoningData.luCode}</td></tr>
  </table>

  <h2>Feasibility Analysis</h2>
  <h3>Backyard Suite</h3>
  <p><span class="status-badge ${data.feasibility.backyardSuite.status}">${data.feasibility.backyardSuite.status}</span></p>
  <p>${data.feasibility.backyardSuite.description}</p>

  <h3>Secondary Suite</h3>
  <p><span class="status-badge ${data.feasibility.secondarySuite.status}">${data.feasibility.secondarySuite.status}</span></p>
  <p>${data.feasibility.secondarySuite.description}</p>

  <h3>Rowhouse</h3>
  <p><span class="status-badge ${data.feasibility.rowhouse.status}">${data.feasibility.rowhouse.status}</span></p>
  <p>${data.feasibility.rowhouse.description}</p>

  ${data.detailedAnalysis ? `
  <h2>Detailed Requirements</h2>
  <table>
    <tr><th colspan="2">Lot Requirements</th></tr>
    <tr><td>Minimum Lot Size</td><td>${data.detailedAnalysis.lotRequirements.minLotSize}m²</td></tr>
    <tr><td>Minimum Width</td><td>${data.detailedAnalysis.lotRequirements.minLotWidth}m</td></tr>
    <tr><td>Maximum Site Coverage</td><td>${data.detailedAnalysis.lotRequirements.maxSiteCoverage}%</td></tr>
    <tr><td>Maximum FAR</td><td>${data.detailedAnalysis.lotRequirements.maxFloorAreaRatio}</td></tr>
  </table>

  <table>
    <tr><th colspan="2">Estimated Costs</th></tr>
    <tr><td>Development Permit</td><td>$${data.detailedAnalysis.costs.developmentPermit.min}-$${data.detailedAnalysis.costs.developmentPermit.max}</td></tr>
    <tr><td>Building Permit</td><td>$${data.detailedAnalysis.costs.buildingPermit.min}-$${data.detailedAnalysis.costs.buildingPermit.max}</td></tr>
    <tr><td>Timeline</td><td>${data.detailedAnalysis.costs.estimatedTimeline}</td></tr>
  </table>
  ` : ''}

  <div class="footer">
    <p><strong>Disclaimer:</strong> This report is for informational purposes only. Always verify zoning requirements with the City of Calgary Planning Department before proceeding with any development.</p>
  </div>
</body>
</html>
  `;
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
