
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface SidebarProps {
  className?: string;
  children?: ReactNode;
  variant?: 'full' | 'collapsed' | 'mobile';
  logoText?: string;
  logoTagline?: string;
  username?: string;
}

interface SidebarItemProps {
  label: string;
  active?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}

interface SidebarGroupProps {
  title?: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  active = false,
  icon,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "flex items-center px-4 py-2 cursor-pointer text-sidebar-foreground hover:bg-sidebar-accent",
        active && "bg-sidebar-accent text-sidebar-primary",
      )}
      onClick={onClick}
    >
      {icon && <span className="mr-3">{icon}</span>}
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
};

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  title,
  children,
  collapsible = false,
  defaultCollapsed = false,
}) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  const toggleCollapsed = () => {
    if (collapsible) {
      setCollapsed(!collapsed);
    }
  };

  return (
    <div className="mb-4">
      {title && (
        <div 
          className={cn(
            "flex items-center px-4 py-2 text-xs font-semibold uppercase text-sidebar-foreground/70",
            collapsible && "cursor-pointer hover:text-sidebar-foreground"
          )}
          onClick={toggleCollapsed}
        >
          {title}
          {collapsible && (
            <ChevronRight 
              className={cn(
                "ml-auto h-4 w-4 transition-transform",
                !collapsed && "transform rotate-90"
              )} 
            />
          )}
        </div>
      )}
      <div className={cn(collapsed ? "hidden" : "block")}>
        {children}
      </div>
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  className,
  children,
  variant = 'full',
  logoText = 'PayCard',
  logoTagline = 'sandbox',
  username = 'John Doe',
}) => {
  const width = variant === 'collapsed' ? 'w-[86px]' : variant === 'mobile' ? 'w-full' : 'w-[244px]';
  
  return (
    <div className={cn(
      `${width} h-full bg-sidebar flex flex-col`,
      className
    )}>
      {/* Logo Section */}
      <div className="p-6 flex items-center">
        <div className="bg-pcard-salmon h-8 w-8 rounded"></div>
        {variant !== 'collapsed' && (
          <div className="ml-2">
            <h1 className="text-sidebar-foreground font-black text-xl">{logoText}</h1>
            <p className="text-pcard-salmon text-xs font-semibold">{logoTagline}</p>
          </div>
        )}
      </div>
      
      {/* Navigation Section */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
      
      {/* Footer Section */}
      <div className="border-t border-sidebar-border py-4 px-4">
        {variant !== 'collapsed' ? (
          <div className="text-sidebar-foreground/80 text-sm">{username}</div>
        ) : (
          <div className="text-sidebar-foreground/80 text-sm text-center">{username.split(' ').map(name => name[0]).join('')}</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
