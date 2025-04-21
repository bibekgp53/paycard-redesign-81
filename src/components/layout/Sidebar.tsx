
import { CreditCard, Users, FileText, Settings, Wallet, UserCircle, Bell, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUserHeaderQuery } from "@/hooks/useUserHeaderQuery";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <aside className="bg-paycard-navy text-white w-64 h-screen hidden md:flex md:flex-col">
      {/* Logo and Balance Section */}
      <div className="p-4">
        <Link to="/" className="mb-4 block">
          <span className="text-xl font-bold">Standard Bank PayCard</span>
        </Link>
        <div className="text-sm text-gray-300 p-3">
          Your Balance: <span className="font-bold">R {userHeader?.balanceAccount?.toFixed(2) ?? '0.00'}</span>
        </div>
      </div>

      {/* Scrollable Navigation Menu */}
      <ScrollArea className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  isActive(item.path, item.submenuItems)
                    ? "bg-paycard-salmon text-white"
                    : "hover:bg-paycard-navy-800"
                }`}
              >
                <item.icon size={18} className="mr-3" />
                {item.label}
              </Link>
              {item.submenuItems && (
                <ul className="ml-7 mt-2 space-y-2">
                  {item.submenuItems.map((subItem) => (
                    <li key={subItem.path}>
                      <Link
                        to={subItem.path}
                        className={`flex items-center p-2 rounded-md transition-colors ${
                          (location.pathname === subItem.path ||
                            (subItem.path === "/load-funds-from" &&
                              location.pathname.startsWith("/load-funds-from")))
                            ? "bg-paycard-salmon text-white"
                            : "hover:bg-paycard-navy-800"
                        }`}
                      >
                        <item.icon size={16} className="mr-3" />
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </ScrollArea>

      {/* User Section at Bottom */}
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
    </aside>
  );
}

