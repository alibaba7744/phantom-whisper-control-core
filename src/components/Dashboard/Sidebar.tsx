
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Globe, 
  Terminal, 
  Server, 
  Users, 
  Shield, 
  Database, 
  FileText, 
  Settings,
  LayoutDashboard,
  Zap,
  Target
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  alert?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, alert, onClick }) => {
  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-all",
        active 
          ? "bg-primary/20 text-primary border-l-2 border-primary" 
          : "text-muted-foreground hover:bg-card hover:text-foreground"
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <span className="flex-grow text-sm">{label}</span>
      {alert && (
        <span className="h-2 w-2 rounded-full bg-primary"></span>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
    console.log(`Navigating to: ${itemName}`);
  };

  return (
    <div className="w-56 h-full bg-background border-r border-border pt-4 flex flex-col">
      <div className="space-y-0.5 px-2 mb-6">
        <SidebarItem 
          icon={<LayoutDashboard size={18} />} 
          label="Dashboard" 
          active={activeItem === 'Dashboard'}
          onClick={() => handleItemClick('Dashboard')}
        />
        <SidebarItem 
          icon={<Users size={18} />} 
          label="Agents" 
          alert 
          active={activeItem === 'Agents'}
          onClick={() => handleItemClick('Agents')}
        />
        <SidebarItem 
          icon={<Terminal size={18} />} 
          label="Console" 
          active={activeItem === 'Console'}
          onClick={() => handleItemClick('Console')}
        />
        <SidebarItem 
          icon={<Globe size={18} />} 
          label="Network" 
          active={activeItem === 'Network'}
          onClick={() => handleItemClick('Network')}
        />
        <SidebarItem 
          icon={<Zap size={18} />} 
          label="Operations" 
          active={activeItem === 'Operations'}
          onClick={() => handleItemClick('Operations')}
        />
        <SidebarItem 
          icon={<FileText size={18} />} 
          label="Reports" 
          active={activeItem === 'Reports'}
          onClick={() => handleItemClick('Reports')}
        />
        <SidebarItem 
          icon={<Target size={18} />} 
          label="Targets" 
          active={activeItem === 'Targets'}
          onClick={() => handleItemClick('Targets')}
        />
      </div>
      
      <div className="px-2 py-2">
        <p className="text-xs font-medium px-3 mb-1 text-muted-foreground">SYSTEM</p>
        <div className="space-y-0.5">
          <SidebarItem 
            icon={<Server size={18} />} 
            label="Server Status" 
            active={activeItem === 'Server Status'}
            onClick={() => handleItemClick('Server Status')}
          />
          <SidebarItem 
            icon={<Database size={18} />} 
            label="Data Management" 
            active={activeItem === 'Data Management'}
            onClick={() => handleItemClick('Data Management')}
          />
          <SidebarItem 
            icon={<Shield size={18} />} 
            label="Security" 
            active={activeItem === 'Security'}
            onClick={() => handleItemClick('Security')}
          />
          <SidebarItem 
            icon={<Settings size={18} />} 
            label="Settings" 
            active={activeItem === 'Settings'}
            onClick={() => handleItemClick('Settings')}
          />
        </div>
      </div>
      
      <div className="mt-auto mb-4 px-3 py-2">
        <div className="p-3 bg-card rounded-md">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium">SERVER STATUS</h4>
            <span className="h-2 w-2 rounded-full bg-primary"></span>
          </div>
          <p className="text-xs text-muted-foreground">Running for 7d 12h</p>
          <div className="mt-2 h-1 w-full bg-muted rounded">
            <div className="h-1 bg-primary rounded" style={{ width: '86%' }}></div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">86% uptime</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
