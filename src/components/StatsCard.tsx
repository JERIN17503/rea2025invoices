import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: {
    value: number;
    label: string;
  };
}

export function StatsCard({ title, value, subtitle, icon: Icon, iconColor = "text-primary" }: StatsCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-2.5 sm:p-5 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
        <div className={`p-1.5 sm:p-2 rounded-lg bg-primary/10 ${iconColor} shrink-0`}>
          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
        <p className="text-[11px] sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
      </div>
      <p className="text-base sm:text-xl lg:text-2xl font-bold text-card-foreground truncate leading-tight">{value}</p>
      {subtitle && (
        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 truncate">{subtitle}</p>
      )}
    </div>
  );
}
