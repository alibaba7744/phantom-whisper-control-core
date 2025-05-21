
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { NetworkNode, NetworkLink } from '@/utils/dummyData';

interface NetworkMapProps {
  nodes: NetworkNode[];
  links: NetworkLink[];
  className?: string;
}

const NetworkMap: React.FC<NetworkMapProps> = ({ nodes, links, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Simple force-directed graph layout
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    // Node positions
    const nodePositions: Record<string, { x: number, y: number, vx: number, vy: number }> = {};
    
    // Initialize positions
    nodes.forEach((node, i) => {
      const angle = (i / nodes.length) * 2 * Math.PI;
      const radius = node.id === 'center' ? 0 : canvas.height * 0.3;
      
      nodePositions[node.id] = {
        x: canvas.width / 2 + Math.cos(angle) * radius,
        y: canvas.height / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0
      };
    });
    
    // Animation loop
    let animationId: number;
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw links
      links.forEach(link => {
        const source = nodePositions[link.source];
        const target = nodePositions[link.target];
        
        if (source && target) {
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          
          const sourceNode = nodes.find(n => n.id === link.source);
          const targetNode = nodes.find(n => n.id === link.target);
          
          if (sourceNode?.status === 'offline' || targetNode?.status === 'offline') {
            ctx.strokeStyle = 'rgba(80, 80, 80, 0.3)';
          } else if (sourceNode?.status === 'compromised' || targetNode?.status === 'compromised') {
            ctx.strokeStyle = 'rgba(220, 50, 50, 0.5)';
          } else {
            ctx.strokeStyle = 'rgba(0, 220, 170, 0.3)';
          }
          
          ctx.lineWidth = link.strength;
          ctx.stroke();
        }
      });
      
      // Draw nodes
      nodes.forEach(node => {
        const pos = nodePositions[node.id];
        if (!pos) return;
        
        ctx.beginPath();
        const radius = node.id === 'center' ? 15 : 
                      node.type === 'router' ? 8 : 
                      node.type === 'agent' ? 10 : 7;
                      
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        
        if (node.status === 'offline') {
          ctx.fillStyle = '#555555';
        } else if (node.status === 'compromised') {
          ctx.fillStyle = '#e74c3c';
          ctx.shadowColor = 'rgba(231, 76, 60, 0.7)';
          ctx.shadowBlur = 10;
        } else {
          if (node.id === 'center') {
            ctx.fillStyle = '#00dca6';
            ctx.shadowColor = 'rgba(0, 220, 166, 0.7)';
            ctx.shadowBlur = 15;
          } else if (node.type === 'agent') {
            ctx.fillStyle = '#3498db';
            ctx.shadowColor = 'rgba(52, 152, 219, 0.5)';
            ctx.shadowBlur = 8;
          } else if (node.type === 'router') {
            ctx.fillStyle = '#9b59b6';
            ctx.shadowColor = 'rgba(155, 89, 182, 0.5)';
            ctx.shadowBlur = 5;
          } else {
            ctx.fillStyle = '#f1c40f';
            ctx.shadowColor = 'rgba(241, 196, 15, 0.5)';
            ctx.shadowBlur = 5;
          }
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Draw node label
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, pos.x, pos.y + radius + 12);
      });
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [nodes, links]);

  return (
    <div className={cn("bg-card rounded-lg border border-border overflow-hidden", className)}>
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold">Topologie Réseau</h2>
      </div>
      
      <div className="h-[300px] w-full">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
    </div>
  );
};

export default NetworkMap;
