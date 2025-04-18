
import { CreditCard, Users, FileText, Settings, Wallet, UserCircle, Bell, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    if (path === "/cards") {
      return location.pathname.startsWith("/cards");
    }
    if (path === "/load-funds-from") {
      return location.pathname.startsWith("/load-funds-from");
    }
    return location.pathname === path;
  };
  
  const menuItems = [
    { icon: Wallet, label: "PayCard", path: "/" },
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
    <aside className="bg-paycard-navy text-white w-64 min-h-screen p-4 hidden md:block flex flex-col">
      <div className="mb-8">
        {/* Logo and Balance Section */}
        <div className="flex flex-col items-center mb-6">
          <Link to="/" className="flex items-center justify-center mb-4">
            <img src="/paycard-logo.svg" alt="PayCard Logo" className="h-8" />
            <span className="ml-2 text-xl font-bold">PayCard</span>
          </Link>
          <div className="text-center">
            <p className="text-sm text-gray-300">Your Balance</p>
            <p className="text-xl font-bold">R 0.00</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <ul className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  isActive(item.path)
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
                          location.pathname === subItem.path || 
                          (subItem.path === "/load-funds-from" && location.pathname.startsWith("/load-funds-from"))
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
      </div>

      {/* User Section at Bottom */}
      <div className="mt-auto border-t border-paycard-navy-800 pt-4">
        <div className="flex items-center justify-between mb-4">
          <button className="hover:text-paycard-salmon p-2 rounded-md transition-colors">
            <Bell size={20} />
          </button>
          <div className="flex items-center">
            <UserCircle size={24} className="mr-2" />
            <span className="text-sm">Admin User</span>
          </div>
          <button className="hover:text-paycard-salmon p-2 rounded-md transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
}
