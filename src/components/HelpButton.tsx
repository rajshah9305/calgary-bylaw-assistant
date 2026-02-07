import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="gap-2"
      >
        <HelpCircle className="w-4 h-4" />
        Help
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <HelpCircle className="w-6 h-6 text-primary" />
              How to Use Calgary Bylaw Assistant
            </DialogTitle>
            <DialogDescription>
              A quick guide to help you analyze properties
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Getting Started */}
            <section>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                🚀 Getting Started
              </h3>
              <ol className="space-y-2 list-decimal list-inside text-sm">
                <li>
                  <strong>Search by Address:</strong> Type any Calgary address in the search bar
                </li>
                <li>
                  <strong>Click on Map:</strong> Click any colored area on the map to see its zoning
                </li>
                <li>
                  <strong>View Results:</strong> Instantly see what you can build on that property
                </li>
              </ol>
            </section>

            {/* Understanding Results */}
            <section>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                📊 Understanding Your Results
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-2xl">✅</span>
                  <div>
                    <strong className="text-green-700">Permitted</strong>
                    <p className="text-green-600">You can build this! Just need to apply for permits.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-2xl">❓</span>
                  <div>
                    <strong className="text-blue-700">Likely (Discretionary)</strong>
                    <p className="text-blue-600">Probably allowed, but needs City approval.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <span className="text-2xl">❌</span>
                  <div>
                    <strong className="text-red-700">Prohibited</strong>
                    <p className="text-red-600">Not allowed. Would need to rezone the property first.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <strong className="text-amber-700">Manual Review</strong>
                    <p className="text-amber-600">Complex case. Contact City Planning for details.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Development Types */}
            <section>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                🏠 What Can You Build?
              </h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 border rounded-lg">
                  <strong>Backyard Suite</strong>
                  <p className="text-muted-foreground">A separate small house in your backyard. Great for rental income!</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <strong>Secondary Suite</strong>
                  <p className="text-muted-foreground">An apartment inside your main house (like a basement suite).</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <strong>Rowhouse</strong>
                  <p className="text-muted-foreground">Multiple attached homes (2-4 units) sharing walls.</p>
                </div>
              </div>
            </section>

            {/* Zoning Codes */}
            <section>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                🏘️ Common Zoning Codes
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 border-b">
                  <strong>R-C1</strong>
                  <span className="text-muted-foreground">Single family home</span>
                </div>
                <div className="flex justify-between items-center p-2 border-b">
                  <strong>R-C2</strong>
                  <span className="text-muted-foreground">Duplex allowed</span>
                </div>
                <div className="flex justify-between items-center p-2 border-b">
                  <strong className="text-green-600">R-CG</strong>
                  <span className="text-muted-foreground">Most flexible! Up to 4 units</span>
                </div>
                <div className="flex justify-between items-center p-2 border-b">
                  <strong>M-C</strong>
                  <span className="text-muted-foreground">Apartments/condos</span>
                </div>
              </div>
            </section>

            {/* Features */}
            <section>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                ✨ Helpful Features
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span>📥</span>
                  <span><strong>Export:</strong> Download your report as PDF, CSV, or other formats</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🔔</span>
                  <span><strong>Notifications:</strong> Get alerts about zoning changes in your area</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>📊</span>
                  <span><strong>Detailed Analysis:</strong> Click to see costs, timelines, and requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🔖</span>
                  <span><strong>Bookmarks:</strong> Save properties you're interested in</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🔄</span>
                  <span><strong>History:</strong> Quickly access your recent searches</span>
                </li>
              </ul>
            </section>

            {/* Important Note */}
            <section className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                ⚠️ Important
              </h3>
              <p className="text-sm text-amber-800">
                This tool provides helpful guidance, but <strong>always verify with the City of Calgary</strong> before making any decisions or starting construction. Call 311 or visit calgary.ca/planning
              </p>
            </section>

            {/* Contact */}
            <section className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Need more help? Contact City of Calgary Planning at <strong>311</strong>
              </p>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
