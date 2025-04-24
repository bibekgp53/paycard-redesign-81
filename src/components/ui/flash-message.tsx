
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

type MessageType = 'info' | 'success' | 'warning' | 'error';

interface FlashMessageProps {
  type: MessageType;
  title: string;
  message: string;
  className?: string;
  onClose?: () => void;
}

export const FlashMessage: React.FC<FlashMessageProps> = ({
  type,
  title,
  message,
  className,
  onClose,
}) => {
  const typeConfig: Record<MessageType, { 
    bgColor: string, 
    borderColor: string, 
    textColor: string,
    icon: React.ReactNode 
  }> = {
    info: {
      bgColor: 'bg-pcard-status-blue-light',
      borderColor: 'border-pcard-status-blue',
      textColor: 'text-pcard-status-blue',
      icon: <AlertCircle className="h-5 w-5" />
    },
    success: {
      bgColor: 'bg-pcard-status-green-light',
      borderColor: 'border-pcard-status-green',
      textColor: 'text-pcard-status-green',
      icon: <CheckCircle2 className="h-5 w-5" />
    },
    warning: {
      bgColor: 'bg-pcard-status-orange-light',
      borderColor: 'border-pcard-status-orange',
      textColor: 'text-pcard-status-orange',
      icon: <AlertTriangle className="h-5 w-5" />
    },
    error: {
      bgColor: 'bg-pcard-status-red-light',
      borderColor: 'border-pcard-status-red',
      textColor: 'text-pcard-status-red',
      icon: <XCircle className="h-5 w-5" />
    }
  };

  const config = typeConfig[type];

  return (
    <div className={cn(
      'flex items-start border-l-4 p-4 rounded', 
      config.bgColor,
      config.borderColor,
      className
    )}>
      <div className={cn('mr-3 flex-shrink-0', config.textColor)}>
        {config.icon}
      </div>
      <div className="flex-1">
        <h4 className={cn('text-sm font-medium font-poppins', config.textColor)}>{title}</h4>
        <p className="text-sm font-poppins body-text text-pcard-dark-blue">{message}</p>
      </div>
      {onClose && (
        <button 
          onClick={onClose}
          className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          <XCircle className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

