
import React from 'react';
import { Agent } from '@/utils/dummyData';
import { cn } from '@/lib/utils';
import { Globe, Shield, Terminal, Laptop, Monitor, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AgentsListProps {
  agents: Agent[];
  className?: string;
}

const AgentsList: React.FC<AgentsListProps> = ({ agents, className }) => {
  return (
    <div className={cn("bg-card rounded-lg border border-border", className)}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-semibold">Active Agents</h2>
        <Button variant="ghost" size="sm" className="text-xs h-8 gap-1">
          <RefreshCw size={14} />
          Refresh
        </Button>
      </div>
      
      <div className="divide-y divide-border">
        {agents.map((agent) => (
          <div 
            key={agent.id}
            className={cn(
              "flex items-center gap-3 p-3 hover:bg-muted/20 transition-colors cursor-pointer",
              agent.status === 'offline' && "opacity-60"
            )}
          >
            <div 
              className={cn(
                "w-2 h-2 rounded-full",
                agent.status === 'online' && "bg-primary",
                agent.status === 'idle' && "bg-amber-500",
                agent.status === 'offline' && "bg-gray-500"
              )}
            />
            <div className="p-1.5 bg-muted rounded">
              <Laptop size={18} className="text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm truncate">{agent.name}</p>
                <span className="text-xs text-muted-foreground">{agent.lastSeen}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{agent.ip}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                <span className="text-xs text-muted-foreground">{agent.os}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-border flex justify-center">
        <Button variant="outline" size="sm" className="w-full text-xs">
          View All Agents
        </Button>
      </div>
    </div>
  );
};

export default AgentsList;
