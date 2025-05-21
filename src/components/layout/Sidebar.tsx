
import { CreditCard, WalletCards, Bell, LogOut, Package, Link as LinkIcon, CalendarX, Layers, ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUserHeaderQuery } from "@/hooks/useUserHeaderQuery";
import { 
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarItem,
  SidebarContext
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useContext } from "react";

export function Sidebar() {
  const location = useLocation();
  const { data: userHeader } = useUserHeaderQuery();
  const { collapsed, setCollapsed } = useContext(SidebarContext);

  // Check if a submenu path is active
  const isSubmenuActive = (submenuItems = []) => {
    return submenuItems.some((subItem) =>
      location.pathname === subItem.path ||
      (subItem.path === "/load-funds-from" && location.pathname.startsWith("/load-funds-from"))
    );
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    if (path === "/load-funds-from") {
      return location.pathname === "/load-funds-from" || location.pathname.startsWith("/load-funds-from");
    }
    return location.pathname === path;
  };

  // Define menu structure
  const cardMenuItems = [
    { icon: CreditCard, label: "Link Cards", path: "/cards/link" },
    { icon: LinkIcon, label: "Allocate Cards", path: "/cards/allocate" },
    { icon: Package, label: "Request Cards", path: "/cards/request" },
  ];

  const fundMenuItems = [
    { icon: WalletCards, label: "Load Funds to Cards", path: "/load-funds-from" },
    { icon: CalendarX, label: "Cancel Pending Load", path: "/cancel-pending-load" },
  ];

  // Add the development/demo items
  const demoMenuItems = [
    { icon: Layers, label: "Shared UI Demo", path: "/shared-ui" },
  ];

  // Toggle sidebar collapsed state
  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <UISidebar className="bg-[#0F1F38] border-none relative">
      <div className="flex flex-col h-full min-h-0">
        {/* Header section */}
        <div className="p-4 flex items-center gap-2">
          <div className="h-8 w-8 bg-paycard-salmon rounded"></div>
          <span className="text-white font-semibold text-xl">PayCard</span>
        </div>

        {/* Collapse button - positioned on the right side of the sidebar */}
        <button 
          onClick={handleToggleCollapse}
          className="absolute top-4 right-2 p-1 rounded-md transition-colors"
        >
          <ChevronLeft 
            size={18} 
            className={cn(
              "transition-transform",
              collapsed 
                ? "text-paycard-salmon transform rotate-180" 
                : "text-gray-400"
            )} 
          />
        </button>

        <SidebarContent>
          <div className="pt-4 p-4">
            <div className="text-sm text-white/90 pb-4">
              Your Balance: <span className="font-bold">R {userHeader?.balanceAccount?.toFixed(2) ?? '5000.00'}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-0 flex-1 min-h-0">
            {/* Cards Group */}
            <SidebarGroup 
              title="CARDS" 
              collapsible 
              defaultCollapsed={false}
              className="text-white/70 py-1"
            >
              {cardMenuItems.map((item) => (
                <div key={item.path} className="mb-0">
                  <Link to={item.path}>
                    <SidebarItem
                      label={item.label}
                      icon={<item.icon size={18} className="text-white/90" />}
                      active={isActive(item.path)}
                      className={cn(
                        "hover:bg-paycard-salmon/20 text-white/90 transition-colors pl-8 py-3",
                        isActive(item.path)
                          ? "bg-paycard-salmon text-white border-l-0"
                          : "text-white/90"
                      )}
                    />
                  </Link>
                </div>
              ))}
            </SidebarGroup>

            {/* Funds Group */}
            <SidebarGroup 
              title="FUNDS" 
              collapsible 
              defaultCollapsed={false}
              className="text-white/70 py-1"
            >
              {fundMenuItems.map((item) => (
                <div key={item.path} className="mb-0">
                  <Link to={item.path}>
                    <SidebarItem
                      label={item.label}
                      icon={<item.icon size={18} className="text-white/90" />}
                      active={isActive(item.path)}
                      className={cn(
                        "hover:bg-paycard-salmon/20 text-white/90 transition-colors pl-8 py-3",
                        isActive(item.path)
                          ? "bg-paycard-salmon text-white border-l-0"
                          : "text-white/90"
                      )}
                    />
                  </Link>
                </div>
              ))}
            </SidebarGroup>
            
            {/* Demo Group */}
            <SidebarGroup 
              title="DEMO" 
              collapsible 
              defaultCollapsed={false}
              className="text-white/70 py-1"
            >
              {demoMenuItems.map((item) => (
                <div key={item.path} className="mb-0">
                  <Link to={item.path}>
                    <SidebarItem
                      label={item.label}
                      icon={<item.icon size={18} className="text-white/90" />}
                      active={isActive(item.path)}
                      className={cn(
                        "hover:bg-paycard-salmon/20 text-white/90 transition-colors pl-8 py-3",
                        isActive(item.path)
                          ? "bg-paycard-salmon text-white border-l-0"
                          : "text-white/90"
                      )}
                    />
                  </Link>
                </div>
              ))}
            </SidebarGroup>
          </div>
        </SidebarContent>

        {/* Footer section */}
        <div className="mt-auto border-t border-white/10">
          <div className="p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-white/90 text-sm">Test User</span>
              <div className="flex items-center gap-2">
                <button className="text-white/70 hover:text-white p-1 rounded-md transition-colors">
                  <Bell size={18} />
                </button>
                <button className="text-white/70 hover:text-white p-1 rounded-md transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UISidebar>
  );
}
