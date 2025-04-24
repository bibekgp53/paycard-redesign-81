
import React from 'react';

interface StatusCardProps {
  color: 'blue' | 'green' | 'orange' | 'red';
  title: string;
  subtitle: string;
  value: string | number;
  progress?: number;
}

export function StatusCard({ color, title, subtitle, value, progress = 50 }: StatusCardProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-pcard-status-blue',
      footer: 'bg-pcard-status-blue-dark',
      progressBg: 'bg-pcard-status-blue-light',
    },
    green: {
      bg: 'bg-pcard-status-green',
      footer: 'bg-pcard-status-green-dark',
      progressBg: 'bg-pcard-status-green-light',
    },
    orange: {
      bg: 'bg-pcard-status-orange',
      footer: 'bg-pcard-status-orange-dark',
      progressBg: 'bg-pcard-status-orange-light',
    },
    red: {
      bg: 'bg-pcard-status-red',
      footer: 'bg-pcard-status-red-dark',
      progressBg: 'bg-pcard-status-red-light',
    },
  };

  const progressWidth = `${progress}%`;
  const textColor = color === 'orange' ? 'text-pcard-dark-blue' : 'text-white';

  return (
    <div className="w-full h-44 rounded-card overflow-hidden">
      <div className={`h-[126px] ${colorClasses[color].bg} p-5 flex flex-col justify-between`}>
        <span className={`font-bold text-lg ${textColor}`}>{title}</span>
        <span className={`font-semibold text-sm ${textColor}`}>{subtitle}</span>
      </div>
      <div className={`h-[50px] ${colorClasses[color].footer} relative overflow-hidden`}>
        <div 
          className={`h-full ${colorClasses[color].progressBg} absolute left-0 bottom-0 rounded-bl-card`} 
          style={{ width: progressWidth }}
        ></div>
      </div>
    </div>
  );
}

export function StatusCardGrid() {
  return (
    <div className="paycard-container py-12">
      <h2 className="text-3xl font-bold text-pcard-dark-blue mb-6">Status Cards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard 
          color="blue" 
          title="Blue" 
          subtitle="Status" 
          value={42} 
          progress={50}
        />
        <StatusCard 
          color="green" 
          title="Green" 
          subtitle="Success" 
          value={98} 
          progress={50}
        />
        <StatusCard 
          color="orange" 
          title="Orange" 
          subtitle="Warning" 
          value={65} 
          progress={50}
        />
        <StatusCard 
          color="red" 
          title="Red" 
          subtitle="Error" 
          value={23} 
          progress={50}
        />
      </div>
    </div>
  );
}
