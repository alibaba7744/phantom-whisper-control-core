
import React from 'react';
import { LogEntry } from '@/utils/dummyData';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

interface ActivityLogProps {
  logs: LogEntry[];
  className?: string;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ logs, className }) => {
  const getLogIcon = (level: LogEntry['level']) => {
    switch (level) {
      case 'info':
        return <Info size={16} className="text-blue-400" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-400" />;
      case 'error':
        return <AlertCircle size={16} className="text-red-400" />;
      case 'success':
        return <CheckCircle2 size={16} className="text-green-400" />;
      default:
        return <Info size={16} className="text-blue-400" />;
    }
  };

  return (
    <div className={cn("bg-card rounded-lg border border-border", className)}>
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold">Activity Log</h2>
      </div>
      
      <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
        {logs.map((log) => (
          <div 
            key={log.id}
            className="p-3 flex gap-3 items-start hover:bg-muted/20 transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5">
              {getLogIcon(log.level)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">{log.message}</p>
                <span className="text-xs text-muted-foreground">{log.timestamp}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full",
                  log.source === "System" && "bg-blue-950/50 text-blue-400",
                  log.source === "Security" && "bg-amber-950/50 text-amber-400",
                  log.source === "Network" && "bg-purple-950/50 text-purple-400",
                  log.source === "Operation" && "bg-green-950/50 text-green-400",
                  log.source === "Reconnaissance" && "bg-cyan-950/50 text-cyan-400",
                  log.source === "Monitoring" && "bg-pink-950/50 text-pink-400",
                  log.source === "Exploitation" && "bg-red-950/50 text-red-400"
                )}>
                  {log.source}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span>Showing recent events</span>
        <button className="hover:text-primary transition-colors">View all logs</button>
      </div>
    </div>
  );
};

export default ActivityLog;
