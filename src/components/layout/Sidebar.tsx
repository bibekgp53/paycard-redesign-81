import { CreditCard, WalletCards, Bell, LogOut, Package, Link as LinkIcon, ChevronDown, ChevronRight, CalendarX, Layers } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUserHeaderQuery } from "@/hooks/useUserHeaderQuery";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarItem
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export function Sidebar() {
  const location = useLocation();
  const { data: userHeader } = useUserHeaderQuery();
  const { user, logout } = useAuth0();

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

  const demoItems = [
    { icon: Layers, label: "Shared UI Demo", path: "/shared-ui" },
  ];

  return (
    <UISidebar
      variant="full"
      collapsible="none"
    >
      <div className="flex flex-col h-full min-h-0">
        {/* Header section */}
        <div className="p-2 flex items-center gap-2">
          <span className="text-paycard-navy font-semibold text-xl">PayCard</span>
        </div>

        <SidebarContent>
          <div className="pt-0 p-0 -mt-1">
            <div className="text-sm text-gray-300 pb-2 pl-4">
              Your Balance: <span className="font-bold">R {userHeader?.balanceAccount?.toFixed(2) ?? '0.00'}</span>
            </div>
          </div>

          <div className="flex flex-col gap-0 flex-1 min-h-0">
            {/* Cards Group */}
            <SidebarGroup title="Cards" collapsible defaultCollapsed={false}>
              {cardMenuItems.map((item) => (
                <div key={item.path} className="mb-0">
                  <Link to={item.path}>
                    <SidebarItem
                      label={item.label}
                      icon={<item.icon size={18} />}
                      active={isActive(item.path)}
                      className={cn(
                        "hover:bg-paycard-salmon/40 hover:text-white transition-colors pl-8",
                        isActive(item.path)
                          ? "bg-paycard-salmon/40 text-white border-l-4 border-l-paycard-salmon"
                          : "text-gray-300"
                      )}
                    />
                  </Link>
                </div>
              ))}
            </SidebarGroup>

            {/* Funds Group */}
            <SidebarGroup title="Funds" collapsible defaultCollapsed={false}>
              {fundMenuItems.map((item) => (
                <div key={item.path} className="mb-0">
                  <Link to={item.path}>
                    <SidebarItem
                      label={item.label}
                      icon={<item.icon size={18} />}
                      active={isActive(item.path)}
                      className={cn(
                        "hover:bg-paycard-salmon/40 hover:text-white transition-colors pl-8",
                        isActive(item.path)
                          ? "bg-paycard-salmon/40 text-white border-l-4 border-l-paycard-salmon"
                          : "text-gray-300"
                      )}
                    />
                  </Link>
                </div>
              ))}
            </SidebarGroup>

            {/* Demo Group */}
            <SidebarGroup title="Demo" collapsible defaultCollapsed={false}>
              {demoItems.map((item) => (
                <div key={item.path} className="mb-0">
                  <Link to={item.path}>
                    <SidebarItem
                      label={item.label}
                      icon={<item.icon size={18} />}
                      active={isActive(item.path)}
                      className={cn(
                        "hover:bg-paycard-salmon/40 hover:text-white transition-colors pl-8",
                        isActive(item.path)
                          ? "bg-paycard-salmon/40 text-white border-l-4 border-l-paycard-salmon"
                          : "text-gray-300"
                      )}
                    />
                  </Link>
                </div>
              ))}
            </SidebarGroup>
          </div>
        </SidebarContent>

        {/* Footer section */}
        <div className="mt-auto border-t border-paycard-navy-800">
          <div className="p-0">
            <div className="flex items-center justify-between gap-2 min-h-[40px] pl-4 pr-2">
              <span className="text-gray-300 text-sm leading-none">{user?.name || user?.nickname}</span>
              <div className="flex items-center gap-1">
                <button className="text-gray-300 hover:text-paycard-salmon p-1 rounded-md transition-colors h-7 w-7 flex items-center justify-center">
                  <Bell size={18} />
                </button>
                <button onClick={() => logout()} className="text-gray-300 hover:text-paycard-salmon p-1 rounded-md transition-colors h-7 w-7 flex items-center justify-center">
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