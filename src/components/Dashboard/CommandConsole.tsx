
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Command, commands as initialCommands } from '@/utils/dummyData';
import { Terminal as TerminalIcon, Play, X, Maximize2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CommandConsoleProps {
  className?: string;
}

const CommandConsole: React.FC<CommandConsoleProps> = ({ className }) => {
  const [commands, setCommands] = useState<Command[]>(initialCommands);
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newCommand: Command = {
      id: `c${Math.floor(Math.random() * 1000)}`,
      command: inputValue,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      sender: 'operator',
      status: 'executing',
    };
    
    setCommands([newCommand, ...commands]);
    setInputValue('');
    
    // Simulate command completion after delay
    setTimeout(() => {
      setCommands(prev => prev.map(cmd => 
        cmd.id === newCommand.id 
          ? {
              ...cmd,
              status: 'completed', 
              output: `Command "${inputValue}" executed successfully.`
            }
          : cmd
      ));
    }, 1500);
  };

  return (
    <div className={cn("bg-card rounded-lg border border-border flex flex-col h-full", className)}>
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} className="text-primary" />
          <h2 className="font-medium text-sm">Command Console</h2>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ChevronDown size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Maximize2 size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive">
            <X size={14} />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-3 overflow-y-auto bg-black/50 font-mono text-sm">
        {commands.map((cmd) => (
          <div key={cmd.id} className="mb-4">
            <div className="flex items-center gap-2 text-xs mb-1">
              <span className="text-muted-foreground">[{cmd.timestamp}]</span>
              <span className="text-secondary">@{cmd.sender}:</span>
              <span className="text-primary font-bold">{cmd.command}</span>
              <span className={cn(
                "ml-auto text-xs px-1.5 py-0.5 rounded",
                cmd.status === 'completed' && "bg-green-950/50 text-green-500",
                cmd.status === 'executing' && "bg-blue-950/50 text-blue-500 animate-pulse",
                cmd.status === 'failed' && "bg-red-950/50 text-red-500"
              )}>
                {cmd.status}
              </span>
            </div>
            {cmd.output && (
              <pre className="mt-1 p-2 bg-muted/20 rounded text-xs text-muted-foreground overflow-x-auto">
                {cmd.output}
              </pre>
            )}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-border flex gap-2">
        <Input
          className="bg-black/30 border-muted terminal-text"
          placeholder="Enter command..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
          <Play size={16} />
        </Button>
      </form>
    </div>
  );
};

export default CommandConsole;
