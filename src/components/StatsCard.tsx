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
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-0.5 sm:mb-1 truncate">{title}</p>
          <p className="text-lg sm:text-2xl font-bold text-card-foreground truncate">{value}</p>
          {subtitle && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 truncate">{subtitle}</p>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-lg bg-primary/10 ${iconColor} shrink-0 ml-2`}>
          <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
        </div>
      </div>
    </div>
  );
}
