import * as React from "react"
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Settings,
   compass,
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

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  routes: Route[];
}

interface Route {
  icon: LucideIcon;
  label: string;
  path: string;
}

const sidebarVariants =
  "fixed flex flex-col p-3 border-r border-r-separator bg-secondary h-screen w-[var(--sidebar-width)] z-50";

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, routes, ...props }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
      <aside
        ref={ref}
        data-sidebar
        className={cn(sidebarVariants, className)}
        {...props}
      >
        <div className="py-4 flex flex-col h-full">
          <div className="space-y-2">
            <h2 className="px-3 font-medium tracking-tight">
              Acme Corp
            </h2>
            <ul className="space-y-1">
              {routes.map((route) => (
                <li key={route.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "justify-start px-3 hover:bg-secondary w-full",
                      location.pathname === route.path ? "bg-secondary" : "transparent"
                    )}
                    onClick={() => navigate(route.path)}
                  >
                    <route.icon className="mr-2 h-4 w-4" />
                    <span>{route.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto">
            <Separator />
            <Button variant="ghost" className="mt-4 w-full justify-start px-3">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";

const Separator = () => <div className="h-px bg-border my-2" />;

interface SidebarToggleProps extends React.HTMLAttributes<HTMLButtonElement> {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const SidebarToggle = ({
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

const SidebarMobile = React.forwardRef<
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

export { Sidebar, SidebarToggle, SidebarMobile };
