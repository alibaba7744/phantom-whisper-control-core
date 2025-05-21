
import React from 'react';
import Header from '@/components/Dashboard/Header';
import Sidebar from '@/components/Dashboard/Sidebar';
import StatusCard from '@/components/Dashboard/StatusCard';
import AgentsList from '@/components/Dashboard/AgentsList';
import CommandConsole from '@/components/Dashboard/CommandConsole';
import ActivityLog from '@/components/Dashboard/ActivityLog';
import NetworkMap from '@/components/Dashboard/NetworkMap';
import { agents, logs, networkData, systemStats } from '@/utils/dummyData';
import { Cpu, Server, HardDrive, Activity, Users, Target, AlertCircle } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background hex-pattern">
      {/* Sidebar */}
      <aside className="hidden md:block">
        <Sidebar />
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatusCard 
                title="CPU Usage" 
                value={systemStats.cpuUsage} 
                suffix="%" 
                icon={<Cpu size={20} />}
                variant={systemStats.cpuUsage > 80 ? 'danger' : 'default'}
              />
              <StatusCard 
                title="Memory Usage" 
                value={systemStats.memoryUsage} 
                suffix="%" 
                icon={<Server size={20} />}
                variant={systemStats.memoryUsage > 80 ? 'warning' : 'default'}
              />
              <StatusCard 
                title="Disk Usage" 
                value={systemStats.diskUsage} 
                suffix="%" 
                icon={<HardDrive size={20} />}
              />
              <StatusCard 
                title="Network Activity" 
                value={systemStats.networkUsage} 
                suffix="Mbps" 
                icon={<Activity size={20} />}
              />
            </div>
            
            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatusCard 
                title="Agents Online" 
                value={`${systemStats.agentsOnline}/${systemStats.agentsTotal}`} 
                icon={<Users size={20} />}
                variant="success"
                className="md:col-span-1"
              />
              <StatusCard 
                title="Active Operations" 
                value={systemStats.activeOperations} 
                icon={<Target size={20} />}
                variant="warning"
                className="md:col-span-1"
              />
              <StatusCard 
                title="Security Alerts" 
                value={systemStats.alerts} 
                icon={<AlertCircle size={20} />}
                variant="danger"
                className="md:col-span-1"
              />
            </div>
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-1 space-y-6">
                <AgentsList agents={agents} />
                <ActivityLog logs={logs} />
              </div>
              
              {/* Middle and Right Columns */}
              <div className="lg:col-span-2 space-y-6">
                <CommandConsole className="h-[400px]" />
                <NetworkMap 
                  nodes={networkData.nodes} 
                  links={networkData.links} 
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
