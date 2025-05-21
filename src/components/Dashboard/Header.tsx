
import React from 'react';
import { AlertCircle, Bell, ChevronDown, Search, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header: React.FC = () => {
  return (
    <header className="w-full px-4 py-3 bg-card/60 backdrop-blur-sm border-b border-border z-10 flex items-center justify-between sticky top-0">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-primary glow-text mr-6">PHANTOM <span className="text-white">C2</span></h1>
        
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search agents, commands..."
            className="pl-8 w-[300px] bg-background/50"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
        </Button>
        
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <AlertCircle className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Settings className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center ml-2 pl-2 border-l border-border">
          <Button variant="ghost" className="flex items-center gap-2 text-sm">
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">Operator</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
