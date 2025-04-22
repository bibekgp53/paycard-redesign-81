
import { CreditCard, Users, FileText, Settings, Wallet, UserCircle, Bell, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUserHeaderQuery } from "@/hooks/useUserHeaderQuery";
import { 
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarItem
} from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

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
      return location.pathname === "/load-funds-from";
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
        logoTagline=""
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
                />
              </Link>
              
              {item.submenuItems && (
                <SidebarGroup title="" className="ml-7 mt-2 space-y-2">
                  {item.submenuItems.map((subItem) => (
                    <Link key={subItem.path} to={subItem.path}>
                      <SidebarItem
                        label={subItem.label}
                        icon={<item.icon size={16} />}
                        active={location.pathname === subItem.path || 
                              (subItem.path === "/load-funds-from" && 
                              location.pathname.startsWith("/load-funds-from"))}
                      />
                    </Link>
                  ))}
                </SidebarGroup>
              )}
            </div>
          ))}
        </SidebarContent>
        
        <div className="border-t border-paycard-navy-800 p-4">
          <div className="flex items-center justify-between">
            <button className="hover:text-paycard-salmon p-2 rounded-md transition-colors">
              <Bell size={20} />
            </button>
            <div className="flex items-center">
              <UserCircle size={24} className="mr-2" />
              <span className="text-sm">{userHeader?.fullName || 'Admin User'}</span>
            </div>
            <button className="hover:text-paycard-salmon p-2 rounded-md transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </UISidebar>
    </SidebarProvider>
  );
}
