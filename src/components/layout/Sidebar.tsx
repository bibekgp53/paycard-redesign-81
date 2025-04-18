
import { CreditCard, Users, FileText, Settings, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: CreditCard, label: "Cards", path: "/cards", submenuItems: [
      { label: "Link Cards", path: "/cards/link" },
      { label: "Allocate Cards", path: "/cards/allocate" }
    ]},
    { icon: Users, label: "Profiles", path: "/profiles" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="bg-paycard-navy text-white w-64 min-h-screen p-4 hidden md:block">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6">Navigation</h2>
        <ul className="space-y-2">
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
                          isActive(subItem.path)
                            ? "bg-paycard-salmon text-white"
                            : "hover:bg-paycard-navy-800"
                        }`}
                      >
                        <CreditCard size={16} className="mr-3" />
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
      
      <div>
        <h2 className="text-xl font-bold mb-6">Card Management</h2>
        <ul className="space-y-2">
          <li>
            <Link
              to="/cards/link"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive("/cards/link")
                  ? "bg-paycard-salmon text-white"
                  : "hover:bg-paycard-navy-800"
              }`}
            >
              <CreditCard size={18} className="mr-3" />
              Link Cards
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
