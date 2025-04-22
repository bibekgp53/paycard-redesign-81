
import { CreditCard, Users, FileText, Settings, Wallet, UserCircle, Bell, LogOut, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUserHeaderQuery } from "@/hooks/useUserHeaderQuery";
import { 
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarItem
} from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
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
    <SidebarProvider>
      <UISidebar 
        variant="full" 
        collapsible="none"
        username={userHeader?.fullName || 'Admin User'}
        logoText="Standard Bank PayCard"
        logoTagline="sandbox"
      >
        <SidebarContent>
          <div className="p-4">
            <div className="text-sm text-gray-300 p-3">
              Your Balance: <span className="font-bold">R {userHeader?.balanceAccount?.toFixed(2) ?? '0.00'}</span>
            </div>
          </div>
          
          {menuItems.map((item) => (
            <div key={item.path}>
              <Link to={item.path}>
                <SidebarItem
                  label={item.label}
                  icon={<item.icon size={18} />}
                  active={isActive(item.path, item.submenuItems)}
                  className={cn(
                    "hover:bg-paycard-navy-600 transition-colors", 
                    isActive(item.path, item.submenuItems) && "bg-paycard-navy-600 border-l-4 border-l-paycard-salmon pl-3"
                  )}
                />
              </Link>
              
              {item.submenuItems && (
                <SidebarGroup title="" className="ml-7 mt-2 space-y-1">
                  {item.submenuItems.map((subItem) => (
                    <Link key={subItem.path} to={subItem.path}>
                      <SidebarItem
                        label={subItem.label}
                        active={location.pathname === subItem.path || 
                              (subItem.path === "/load-funds-from" && 
                              location.pathname.startsWith("/load-funds-from"))}
                        className={cn(
                          "text-sm py-1.5 hover:bg-paycard-navy-600 transition-colors",
                          (location.pathname === subItem.path || 
                          (subItem.path === "/load-funds-from" && 
                          location.pathname.startsWith("/load-funds-from"))) && 
                          "bg-paycard-navy-600 border-l-4 border-l-paycard-salmon pl-3"
                        )}
                      />
                    </Link>
                  ))}
                </SidebarGroup>
              )}
            </div>
          ))}
        </SidebarContent>
        
        <div className="border-t border-paycard-navy-800 mt-auto">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCircle size={24} className="text-gray-300" />
                <span className="text-sm text-gray-300">{userHeader?.fullName || 'Admin User'}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-300 hover:text-paycard-salmon p-1 rounded-md transition-colors">
                  <Bell size={18} />
                </button>
                <button className="text-gray-300 hover:text-paycard-salmon p-1 rounded-md transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </UISidebar>
    </SidebarProvider>
  );
}
