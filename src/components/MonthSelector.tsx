import { MONTHS, FULL_MONTHS } from "@/data/clientData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface MonthSelectorProps {
  selectedMonth: number | null; // null means "All Months"
  onMonthChange: (month: number | null) => void;
  showAllOption?: boolean;
}

export function MonthSelector({ selectedMonth, onMonthChange, showAllOption = true }: MonthSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <Select 
        value={selectedMonth === null ? "all" : selectedMonth.toString()} 
        onValueChange={(value) => onMonthChange(value === "all" ? null : parseInt(value))}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {showAllOption && (
            <SelectItem value="all">All Months</SelectItem>
          )}
          {FULL_MONTHS.map((month, index) => (
            <SelectItem key={index} value={(index + 1).toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface MonthTabsProps {
  selectedMonth: number | null;
  onMonthChange: (month: number | null) => void;
}

export function MonthTabs({ selectedMonth, onMonthChange }: MonthTabsProps) {
  return (
    <div className="flex flex-wrap gap-1 p-1 bg-muted rounded-lg">
      <Button
        variant={selectedMonth === null ? "default" : "ghost"}
        size="sm"
        onClick={() => onMonthChange(null)}
        className="text-xs px-2 py-1 h-7"
      >
        All
      </Button>
      {MONTHS.map((month, index) => (
        <Button
          key={index}
          variant={selectedMonth === index + 1 ? "default" : "ghost"}
          size="sm"
          onClick={() => onMonthChange(index + 1)}
          className="text-xs px-2 py-1 h-7"
        >
          {month}
        </Button>
      ))}
    </div>
  );
}
