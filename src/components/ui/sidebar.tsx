
import * as React from "react"
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Settings,
  Compass,
  ChevronDown,
  ListChecks,
  type LucideIcon,
} from "lucide-react"
import { useLocation, useNavigate } from 'react-router-dom';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"

// Create context for sidebar state
const SidebarContext = React.createContext<{
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
} | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  routes?: Route[];
  variant?: 'full' | 'collapsed';
  collapsible?: 'left' | 'right' | 'none';
  username?: string;
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  label?: string;
  active?: boolean;
}

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

interface Route {
  icon: LucideIcon;
  label: string;
  path: string;
}

const sidebarVariants =
  "fixed flex flex-col p-3 border-r border-r-separator bg-secondary h-screen w-[var(--sidebar-width)] z-50";

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, routes, variant = 'full', username, children, collapsible = 'none', ...props }, ref) => {
    const { collapsed } = useSidebar();
    const actualVariant = collapsible !== 'none' ? (collapsed ? 'collapsed' : 'full') : variant;
    
    return (
      <aside
        ref={ref}
        data-sidebar
        data-variant={actualVariant}
        className={cn(
          sidebarVariants, 
          actualVariant === 'collapsed' && "w-[60px]",
          className
        )}
        {...props}
      >
        {children ? children : (
          <div className="py-4 flex flex-col h-full">
            <div className="space-y-2">
              <h2 className="px-3 font-medium tracking-tight">
                {actualVariant === 'full' ? 'Acme Corp' : 'A'}
              </h2>
              {routes && (
                <ul className="space-y-1">
                  {routes.map((route) => (
                    <SidebarItem 
                      key={route.path}
                      icon={<route.icon className="h-4 w-4" />}
                      label={route.label}
                      active={location.pathname === route.path}
                      onClick={() => navigate(route.path)}
                    />
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-auto">
              <div className="h-px bg-border my-2" />
              <Button variant="ghost" className="mt-4 w-full justify-start px-3">
                <Settings className="mr-2 h-4 w-4" />
                {actualVariant === 'full' && <span>Settings</span>}
              </Button>
            </div>
          </div>
        )}
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";

export const SidebarContent: React.FC<SidebarContentProps> = ({ 
  children, 
  className,
  ...props 
}) => {
  return (
    <div className={cn("flex-1 overflow-auto py-2", className)} {...props}>
      {children}
    </div>
  );
};

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("px-3 py-2", className)} {...props}>
      {children}
    </div>
  );
};

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("mt-auto px-3 py-2", className)} {...props}>
      {children}
    </div>
  );
};

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active = false,
  className,
  onClick,
  ...props
}) => {
  const { collapsed } = useSidebar();

  return (
    <li {...props}>
      <Button
        variant="ghost"
        className={cn(
          "justify-start px-3 hover:bg-secondary w-full",
          active ? "bg-secondary" : "transparent",
          className
        )}
        onClick={onClick}
      >
        {icon}
        {(!collapsed || label === '') && <span className="ml-2">{label}</span>}
      </Button>
    </li>
  );
};

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  title,
  collapsible = false,
  defaultCollapsed = false,
  children,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(!defaultCollapsed);
  const { collapsed } = useSidebar();
  
  if (collapsible) {
    return (
      <div className={cn("mb-4", className)} {...props}>
        {title && !collapsed && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex items-center px-3 py-1">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isOpen ? "" : "-rotate-90"
                    )}
                  />
                </Button>
              </CollapsibleTrigger>
              <h3 className="text-xs font-medium ml-1">{title}</h3>
            </div>
            <CollapsibleContent>
              <div className="pl-3 mt-1">{children}</div>
            </CollapsibleContent>
          </Collapsible>
        )}
        {(collapsed || !title) && children}
      </div>
    );
  }

  return (
    <div className={cn("mb-4", className)} {...props}>
      {title && !collapsed && (
        <div className="px-3 py-1">
          <h3 className="text-xs font-medium">{title}</h3>
        </div>
      )}
      <div className={title && !collapsed ? "pl-3 mt-1" : ""}>{children}</div>
    </div>
  );
};

interface SidebarToggleProps extends React.HTMLAttributes<HTMLButtonElement> {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

export const SidebarToggle = ({
  isCollapsed,
  setIsCollapsed,
  ...props
}: SidebarToggleProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-8 w-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      onClick={() => setIsCollapsed(!isCollapsed)}
      {...props}
    >
      {isCollapsed ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

interface SidebarMobileProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right";
  children?: React.ReactNode;
}

export const SidebarMobile = React.forwardRef<
  HTMLDivElement,
  SidebarMobileProps
>(({ children, className, side = "left", ...props }, ref) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="h-8 w-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        >
          <LayoutDashboard className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className="p-0 flex flex-col">
        <div 
          ref={ref}
          data-sidebar
          data-mobile
          className={cn("flex flex-col h-full", className)}
          style={{ width: "100%" }}
          {...props}
        >
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
});

SidebarMobile.displayName = "SidebarMobile";
