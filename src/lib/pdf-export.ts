// PDF Export functionality
import type { ZoningData, FeasibilityResult } from '@/types/zoning';
import { getZoneLabel } from './zoning-analysis';

export function generatePDFReport(
  zoningData: ZoningData,
  result: FeasibilityResult
): void {
  // Create a printable HTML document
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Please allow popups to generate PDF reports');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Zoning Feasibility Report - ${zoningData.address || zoningData.community}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #1e293b;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          border-bottom: 3px solid #2563eb;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        h1 {
          font-size: 28px;
          color: #0f172a;
          margin-bottom: 10px;
        }
        .subtitle {
          color: #64748b;
          font-size: 14px;
        }
        .section {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e2e8f0;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }
        .info-item {
          padding: 15px;
          background: #f8fafc;
          border-radius: 8px;
          border-left: 3px solid #2563eb;
        }
        .info-label {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .info-value {
          font-size: 16px;
          font-weight: 600;
          color: #0f172a;
        }
        .feature-item {
          padding: 15px;
          margin-bottom: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: white;
        }
        .feature-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .feature-name {
          font-weight: 600;
          font-size: 15px;
        }
        .status-badge {
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .status-permitted {
          background: #dcfce7;
          color: #166534;
        }
        .status-likely {
          background: #dbeafe;
          color: #1e40af;
        }
        .status-prohibited {
          background: #fee2e2;
          color: #991b1b;
        }
        .status-manual-review {
          background: #fef3c7;
          color: #92400e;
        }
        .feature-description {
          color: #64748b;
          font-size: 14px;
        }
        .notes {
          background: #fffbeb;
          border-left: 4px solid #f59e0b;
          padding: 15px;
          border-radius: 6px;
        }
        .notes ul {
          list-style: none;
          padding-left: 0;
        }
        .notes li {
          padding: 6px 0;
          padding-left: 20px;
          position: relative;
        }
        .notes li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: #f59e0b;
          font-weight: bold;
        }
        .warning {
          background: #fef3c7;
          border: 2px solid #f59e0b;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .warning-title {
          font-weight: 600;
          color: #92400e;
          margin-bottom: 8px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e2e8f0;
          font-size: 12px;
          color: #64748b;
          text-align: center;
        }
        @media print {
          body { padding: 20px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Calgary Zoning Feasibility Report</h1>
        <p class="subtitle">Generated on ${new Date().toLocaleDateString('en-CA', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
      </div>

      <div class="section">
        <h2 class="section-title">Property Information</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Address/Location</div>
            <div class="info-value">${zoningData.address || 'Map Selection'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Community</div>
            <div class="info-value">${zoningData.community}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Zoning Code</div>
            <div class="info-value">${zoningData.luCode}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Zoning Description</div>
            <div class="info-value" style="font-size: 13px;">${getZoneLabel(zoningData.luCode)}</div>
          </div>
        </div>
      </div>

      ${result.isDirectControl ? `
        <div class="warning">
          <div class="warning-title">⚠️ Direct Control District</div>
          <p>This property is in a Direct Control district with unique, site-specific bylaws. 
          All development requires individual assessment by the City of Calgary Planning Department.</p>
        </div>
      ` : ''}

      <div class="section">
        <h2 class="section-title">Development Feasibility</h2>
        
        <div class="feature-item">
          <div class="feature-header">
            <span class="feature-name">🏠 Backyard Suite</span>
            <span class="status-badge status-${result.backyardSuite.status}">
              ${result.backyardSuite.status.replace('-', ' ')}
            </span>
          </div>
          <p class="feature-description">${result.backyardSuite.description}</p>
        </div>

        <div class="feature-item">
          <div class="feature-header">
            <span class="feature-name">🏘️ Secondary Suite</span>
            <span class="status-badge status-${result.secondarySuite.status}">
              ${result.secondarySuite.status.replace('-', ' ')}
            </span>
          </div>
          <p class="feature-description">${result.secondarySuite.description}</p>
        </div>

        <div class="feature-item">
          <div class="feature-header">
            <span class="feature-name">🏢 Rowhouse Development</span>
            <span class="status-badge status-${result.rowhouse.status}">
              ${result.rowhouse.status.replace('-', ' ')}
            </span>
          </div>
          <p class="feature-description">${result.rowhouse.description}</p>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">Building Specifications</h2>
        <div class="info-item">
          <div class="info-label">Maximum Building Height</div>
          <div class="info-value">${result.maxHeight}</div>
        </div>
      </div>

      ${result.notes.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Important Notes</h2>
          <div class="notes">
            <ul>
              ${result.notes.map(note => `<li>${note}</li>`).join('')}
            </ul>
          </div>
        </div>
      ` : ''}

      <div class="footer">
        <p><strong>Disclaimer:</strong> This report is for informational purposes only and should not be considered 
        as professional advice. Always verify zoning requirements and development permissions with the 
        City of Calgary Planning Department before proceeding with any construction or development.</p>
        <p style="margin-top: 10px;">Generated by The Bylaw Bot - Calgary Zoning Feasibility Tool</p>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 500);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
