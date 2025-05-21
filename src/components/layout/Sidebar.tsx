
import { CreditCard, WalletCards, Bell, LogOut, Package, Link as LinkIcon, CalendarX, Layers, ChevronDown, ChevronRight } from "lucide-react";
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
import { useContext, useState } from "react";

export function Sidebar() {
  const location = useLocation();
  const { data: userHeader } = useUserHeaderQuery();
  const { collapsed } = useContext(SidebarContext);
  const [cardsCollapsed, setCardsCollapsed] = useState(false);
  const [fundsCollapsed, setFundsCollapsed] = useState(false);
  const [demoCollapsed, setDemoCollapsed] = useState(false);

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

  const toggleGroupCollapse = (group: string) => {
    switch(group) {
      case 'cards':
        setCardsCollapsed(!cardsCollapsed);
        break;
      case 'funds':
        setFundsCollapsed(!fundsCollapsed);
        break;
      case 'demo':
        setDemoCollapsed(!demoCollapsed);
        break;
    }
  };

  return (
    <UISidebar className="bg-[#0F1F38] border-none">
      <div className="flex flex-col h-full min-h-0">
        {/* Header section */}
        <div className="p-4 flex items-center gap-2">
          <div className="h-8 w-8 bg-paycard-salmon rounded"></div>
          <span className="text-white font-semibold text-xl">PayCard</span>
        </div>

        <SidebarContent>
          <div className="pt-4 p-4">
            <div className="text-sm text-white/90 pb-4">
              Your Balance: <span className="font-bold">R {userHeader?.balanceAccount?.toFixed(2) ?? '5000.00'}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-0 flex-1 min-h-0">
            {/* Cards Group */}
            <div className="py-2 text-white/70">
              <div className="flex items-center px-3 py-1.5 justify-between">
                {!collapsed && (
                  <>
                    <span className="text-xs font-medium uppercase px-1.5">CARDS</span>
                    <button 
                      onClick={() => toggleGroupCollapse('cards')}
                      className="text-gray-400 hover:text-white transition-colors p-0.5"
                    >
                      {cardsCollapsed ? (
                        <ChevronRight size={16} className="text-paycard-salmon" />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </>
                )}
              </div>
              {(!collapsed && !cardsCollapsed) && (
                <div>
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
                </div>
              )}
            </div>

            {/* Funds Group */}
            <div className="py-2 text-white/70">
              <div className="flex items-center px-3 py-1.5 justify-between">
                {!collapsed && (
                  <>
                    <span className="text-xs font-medium uppercase px-1.5">FUNDS</span>
                    <button 
                      onClick={() => toggleGroupCollapse('funds')}
                      className="text-gray-400 hover:text-white transition-colors p-0.5"
                    >
                      {fundsCollapsed ? (
                        <ChevronRight size={16} className="text-paycard-salmon" />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </>
                )}
              </div>
              {(!collapsed && !fundsCollapsed) && (
                <div>
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
                </div>
              )}
            </div>
            
            {/* Demo Group */}
            <div className="py-2 text-white/70">
              <div className="flex items-center px-3 py-1.5 justify-between">
                {!collapsed && (
                  <>
                    <span className="text-xs font-medium uppercase px-1.5">DEMO</span>
                    <button 
                      onClick={() => toggleGroupCollapse('demo')}
                      className="text-gray-400 hover:text-white transition-colors p-0.5"
                    >
                      {demoCollapsed ? (
                        <ChevronRight size={16} className="text-paycard-salmon" />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </>
                )}
              </div>
              {(!collapsed && !demoCollapsed) && (
                <div>
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
                </div>
              )}
            </div>
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
