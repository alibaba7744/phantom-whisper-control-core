
import React from 'react';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
  suffix?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon,
  variant = 'default',
  className,
  suffix
}) => {
  const variantStyles = {
    default: "bg-card hover:bg-card/90",
    success: "bg-green-950/50 border-green-700/50 hover:bg-green-950/70",
    warning: "bg-amber-950/50 border-amber-700/50 hover:bg-amber-950/70",
    danger: "bg-red-950/50 border-red-700/50 hover:bg-red-950/70"
  };

  return (
    <div className={cn(
      "flex items-center p-4 rounded-lg border border-border shadow-md transition-all",
      variantStyles[variant],
      className
    )}>
      {icon && (
        <div className="mr-4 text-muted-foreground">
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold mt-1">
          {value}{suffix && <span className="ml-1 text-sm text-muted-foreground">{suffix}</span>}
        </p>
      </div>
    </div>
  );
};

export default StatusCard;
