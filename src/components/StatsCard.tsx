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
    <div className="bg-card rounded-xl border border-border p-3 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-1">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-0.5 sm:mb-1">{title}</p>
          <p className="text-sm sm:text-xl lg:text-2xl font-bold text-card-foreground whitespace-nowrap">{value}</p>
          {subtitle && (
            <p className="text-[10px] sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-1.5 sm:p-2 rounded-lg bg-primary/10 ${iconColor} shrink-0`}>
          <Icon className="h-3 w-3 sm:h-5 sm:w-5" />
        </div>
      </div>
    </div>
  );
}
