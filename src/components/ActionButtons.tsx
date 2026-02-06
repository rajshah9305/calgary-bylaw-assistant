import { Bookmark, Share2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ZoningData } from '@/types/zoning';

interface ActionButtonsProps {
  zoningData: ZoningData;
  isBookmarked: boolean;
  onBookmark: () => void;
  onShare: () => void;
  onExportPDF: () => void;
}

export function ActionButtons({
  zoningData,
  isBookmarked,
  onBookmark,
  onShare,
  onExportPDF,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-2 mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onBookmark}
        className="flex-1"
      >
        <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
        {isBookmarked ? 'Saved' : 'Save'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onShare}
        className="flex-1"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
      <Button
        variant="default"
        size="sm"
        onClick={onExportPDF}
        className="flex-1"
      >
        <FileText className="w-4 h-4 mr-2" />
        PDF
      </Button>
    </div>
  );
}
