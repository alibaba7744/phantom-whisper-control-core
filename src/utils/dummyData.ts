export type Agent = {
  id: string;
  name: string;
  ip: string;
  status: "online" | "offline" | "idle";
  os: string;
  lastSeen: string;
  privileges: "admin" | "user" | "system";
  location: string;
};

export type Command = {
  id: string;
  command: string;
  timestamp: string;
  sender: string;
  status: "completed" | "executing" | "failed";
  output?: string;
};

export type LogEntry = {
  id: string;
  timestamp: string;
  level: "info" | "warning" | "error" | "success";
  message: string;
  source: string;
};

export type NetworkNode = {
  id: string;
  name: string;
  type: "server" | "client" | "router" | "agent";
  status: "online" | "offline" | "compromised";
};

export type NetworkLink = {
  source: string;
  target: string;
  strength: number;
};

export const agents: Agent[] = [
  {
    id: "a1",
    name: "SENTINEL-01",
    ip: "192.168.1.101",
    status: "online",
    os: "Windows 10",
    lastSeen: "Just now",
    privileges: "admin",
    location: "New York, US"
  },
  {
    id: "a2",
    name: "SHADOW-02",
    ip: "192.168.1.102",
    status: "online",
    os: "Ubuntu 22.04",
    lastSeen: "2 min ago",
    privileges: "user",
    location: "London, UK"
  },
  {
    id: "a3",
    name: "PHANTOM-03",
    ip: "192.168.1.103",
    status: "idle",
    os: "macOS 13.1",
    lastSeen: "15 min ago",
    privileges: "system",
    location: "Tokyo, JP"
  },
  {
    id: "a4",
    name: "WRAITH-04",
    ip: "192.168.1.104",
    status: "offline",
    os: "CentOS 8",
    lastSeen: "3 hours ago",
    privileges: "admin",
    location: "Berlin, DE"
  },
  {
    id: "a5",
    name: "GHOST-05",
    ip: "192.168.1.105",
    status: "online",
    os: "Windows Server 2019",
    lastSeen: "Just now",
    privileges: "system",
    location: "Sydney, AU"
  }
];

export const commands: Command[] = [
  {
    id: "c1",
    command: "get system_info",
    timestamp: "2023-05-21 14:30:22",
    sender: "operator",
    status: "completed",
    output: "System: Windows 10 Pro\nCPU: Intel Core i7-9700K\nRAM: 16GB\nDisk: 512GB SSD"
  },
  {
    id: "c2",
    command: "scan_network",
    timestamp: "2023-05-21 14:29:10",
    sender: "operator",
    status: "executing"
  },
  {
    id: "c3",
    command: "download file.txt",
    timestamp: "2023-05-21 14:25:45",
    sender: "system",
    status: "completed",
    output: "Downloaded 2.3MB in 0.8s"
  },
  {
    id: "c4",
    command: "execute script.py",
    timestamp: "2023-05-21 14:20:12",
    sender: "operator",
    status: "failed",
    output: "Error: Python interpreter not found"
  }
];

export const logs: LogEntry[] = [
  {
    id: "l1",
    timestamp: "14:35:22",
    level: "info",
    message: "Agent SENTINEL-01 connected",
    source: "System"
  },
  {
    id: "l2",
    timestamp: "14:32:45",
    level: "warning",
    message: "Failed login attempt from 203.0.113.42",
    source: "Security"
  },
  {
    id: "l3",
    timestamp: "14:30:11",
    level: "error",
    message: "Connection to WRAITH-04 lost",
    source: "Network"
  },
  {
    id: "l4",
    timestamp: "14:28:30",
    level: "success",
    message: "Data exfiltration complete",
    source: "Operation"
  },
  {
    id: "l5",
    timestamp: "14:26:07",
    level: "info",
    message: "New target identified: 192.168.3.24",
    source: "Reconnaissance"
  },
  {
    id: "l6",
    timestamp: "14:25:55",
    level: "warning",
    message: "High CPU usage detected on SHADOW-02",
    source: "Monitoring"
  },
  {
    id: "l7",
    timestamp: "14:23:12",
    level: "info",
    message: "Scanning subnet 192.168.2.0/24",
    source: "Network"
  },
  {
    id: "l8",
    timestamp: "14:20:45",
    level: "success",
    message: "Privilege escalation successful on PHANTOM-03",
    source: "Exploitation"
  }
];

export const networkData = {
  nodes: [
    { id: "center", name: "C2 Server", type: "server" as const, status: "online" as const },
    { id: "a1", name: "SENTINEL-01", type: "agent" as const, status: "online" as const },
    { id: "a2", name: "SHADOW-02", type: "agent" as const, status: "online" as const },
    { id: "a3", name: "PHANTOM-03", type: "agent" as const, status: "online" as const },
    { id: "a4", name: "WRAITH-04", type: "agent" as const, status: "offline" as const },
    { id: "a5", name: "GHOST-05", type: "agent" as const, status: "online" as const },
    { id: "r1", name: "Router-01", type: "router" as const, status: "online" as const },
    { id: "r2", name: "Router-02", type: "router" as const, status: "online" as const },
    { id: "c1", name: "Client-01", type: "client" as const, status: "compromised" as const },
    { id: "c2", name: "Client-02", type: "client" as const, status: "online" as const }
  ],
  links: [
    { source: "center", target: "r1", strength: 3 },
    { source: "center", target: "r2", strength: 3 },
    { source: "r1", target: "a1", strength: 2 },
    { source: "r1", target: "a2", strength: 2 },
    { source: "r1", target: "a3", strength: 2 },
    { source: "r2", target: "a4", strength: 1 },
    { source: "r2", target: "a5", strength: 2 },
    { source: "a1", target: "c1", strength: 2 },
    { source: "a3", target: "c2", strength: 2 }
  ]
};

export const systemStats = {
  cpuUsage: 42,
  memoryUsage: 63,
  diskUsage: 37,
  networkUsage: 28,
  agentsOnline: 4,
  agentsTotal: 5,
  activeOperations: 3,
  alerts: 2
};
