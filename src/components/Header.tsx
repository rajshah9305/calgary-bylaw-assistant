import { Building2, BadgeCheck } from 'lucide-react';

export function Header() {
  return (
    <header className="px-6 py-4 border-b border-divider bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">The Bylaw Bot</h1>
            <p className="text-sm text-muted-foreground">Calgary Zoning Feasibility</p>
          </div>
        </div>
        
        <div className="badge-amnesty">
          <BadgeCheck className="w-3.5 h-3.5" />
          <span>Suite Amnesty Active (Fees Waived until 2026)</span>
        </div>
      </div>
    </header>
  );
}
