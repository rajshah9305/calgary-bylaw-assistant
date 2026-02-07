import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, FileJson, FileText, FileSpreadsheet, Printer } from 'lucide-react';
import { exportToJSON, exportToCSV, exportToMarkdown, exportToPDF, type ExportData } from '@/lib/export-enhanced';

interface ExportMenuProps {
  data: ExportData;
}

export function ExportMenu({ data }: ExportMenuProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'json' | 'csv' | 'markdown' | 'pdf') => {
    setIsExporting(true);
    try {
      switch (format) {
        case 'json':
          exportToJSON(data);
          break;
        case 'csv':
          exportToCSV(data);
          break;
        case 'markdown':
          exportToMarkdown(data);
          break;
        case 'pdf':
          exportToPDF(data);
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting}>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Export Format</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleExport('pdf')}>
          <Printer className="w-4 h-4 mr-2" />
          PDF (Print)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('markdown')}>
          <FileText className="w-4 h-4 mr-2" />
          Markdown
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('json')}>
          <FileJson className="w-4 h-4 mr-2" />
          JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
