
import { CreditCard, Users, FileText, Settings, Wallet, Bell, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUserHeaderQuery } from "@/hooks/useUserHeaderQuery";
import { 
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarItem
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const location = useLocation();
  const { data: userHeader } = useUserHeaderQuery();

  // Check if a given submenu path is active
  const isSubmenuActive = (submenuItems = []) => {
    return submenuItems.some((subItem) =>
      location.pathname === subItem.path ||
      (subItem.path === "/load-funds-from" && location.pathname.startsWith("/load-funds-from"))
    );
  };

  const isActive = (path: string, submenuItems?: { path: string }[]) => {
    // If there are submenus, parent is only active if *not* on submenu
    if (submenuItems && submenuItems.length > 0 && isSubmenuActive(submenuItems)) {
      return false;
    }
    if (path === "/") {
      return location.pathname === "/";
    }
    if (path === "/cards") {
      return location.pathname === "/cards";
    }
    if (path === "/load-funds-from") {
      return location.pathname === "/load-funds-from" || location.pathname.startsWith("/load-funds-from");
    }
    return location.pathname === path;
  };

  const menuItems = [
    { icon: CreditCard, label: "Cards", path: "/cards", submenuItems: [
      { label: "Link Cards", path: "/cards/link" },
      { label: "Allocate Cards", path: "/cards/allocate" }
    ]},
    { icon: Wallet, label: "Funds", path: "/load-funds-from", submenuItems: [
      { label: "Load Funds to Cards", path: "/load-funds-from" }
    ]},
    { icon: Users, label: "Profiles", path: "/profiles" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <UISidebar 
      variant="full" 
      collapsible="none"
      logoText="Standard Bank PayCard"
      // logoTagline="sandbox" // Removed the tagline
    >
      {/* Make sidebar full height, column flex, push footer (Test User) to bottom */}
      <div className="flex flex-col h-full min-h-0">
        <SidebarContent>
          <div className="pt-0 p-0">
            {/* Revert header color, restore previous if it was in gray-600 or other */}
            <div className="text-sm text-gray-300 pb-0 pl-4">
              Your Balance: <span className="font-bold">R {userHeader?.balanceAccount?.toFixed(2) ?? '0.00'}</span>
            </div>
          </div>
          {/* ... keep existing menu rendering the same ... */}
          <div className="flex flex-col gap-1 flex-1 min-h-0">
            {/* ... keep menu and submenu mapping the same ... */}
            {/* ... */}
            {menuItems.map((item, idx) => (
              <div key={item.path} className="mb-0">
                <Link to={item.path}>
                  <SidebarItem
                    label={item.label}
                    icon={<item.icon size={18} />}
                    active={isActive(item.path, item.submenuItems)}
                    className={cn(
                      "hover:bg-paycard-salmon/40 hover:text-white transition-colors",
                      isActive(item.path, item.submenuItems) 
                        ? "bg-paycard-salmon/40 text-white border-l-4 border-l-paycard-salmon pl-3"
                        : "text-gray-300"
                    )}
                    style={{ minHeight: 32, paddingTop: 4, paddingBottom: 4 }}
                  />
                </Link>
                {/* Only render submenus if they exist */}
                {item.submenuItems && (
                  <SidebarGroup 
                    title=""
                    className={cn(
                      "pl-4",
                      "mt-0 mb-0 space-y-0" // Remove vertical margin so there's no big gap below (fix for your request)
                    )}
                  >
                    {item.submenuItems.map((subItem, sIdx) => {
                      const isActiveSub = location.pathname === subItem.path || 
                        (subItem.path === "/load-funds-from" && location.pathname.startsWith("/load-funds-from"));
                      return (
                        <div key={subItem.path}>
                          <Link to={subItem.path}>
                            <SidebarItem
                              label={subItem.label}
                              active={isActiveSub}
                              className={cn(
                                "hover:bg-paycard-salmon/40 hover:text-white transition-colors",
                                isActiveSub
                                  ? "bg-paycard-salmon/40 text-white border-l-4 border-l-paycard-salmon pl-3"
                                  : "text-gray-300"
                              )}
                              style={{
                                minHeight: 32,
                                paddingTop: 4,
                                paddingBottom: 4,
                                paddingLeft: 16
                              }}
                            />
                          </Link>
                        </div>
                      );
                    })}
                  </SidebarGroup>
                )}
              </div>
            ))}
          </div>
        </SidebarContent>
        {/* Test User footer flush with the bottom, remove extra margin/padding */}
        <div className="mt-auto border-t border-paycard-navy-800">
          {/* ... keep footer rendering the same ... */}
          <div className="p-0">
            <div className="flex items-center justify-between gap-2 min-h-[40px] pl-4 pr-2">
              <span className="text-gray-300 text-sm leading-none">Test User</span>
              <div className="flex items-center gap-1">
                <button className="text-gray-300 hover:text-paycard-salmon p-1 rounded-md transition-colors h-7 w-7 flex items-center justify-center">
                  <Bell size={18} />
                </button>
                <button className="text-gray-300 hover:text-paycard-salmon p-1 rounded-md transition-colors h-7 w-7 flex items-center justify-center">
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
