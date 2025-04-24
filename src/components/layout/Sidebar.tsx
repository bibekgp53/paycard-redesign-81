
import { CreditCard, WalletCards, Bell, LogOut, Package, Link as LinkIcon } from "lucide-react";
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

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    if (path === "/load-funds-from") {
      return location.pathname === "/load-funds-from" || location.pathname.startsWith("/load-funds-from");
    }
    return location.pathname === path;
  };

  const menuItems = [
    { icon: CreditCard, label: "Link Cards", path: "/cards/link" },
    { icon: LinkIcon, label: "Allocate Cards", path: "/cards/allocate" }, // Changed icon to LinkIcon
    { icon: WalletCards, label: "Load Funds to Cards", path: "/load-funds-from" },
    { icon: Package, label: "Request Cards", path: "/cards/request" },
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
          <div className="pt-0 p-0 -mt-1"> {/* Reduced top margin */}
            <div className="text-sm text-gray-300 pb-2 pl-4">
              Your Balance: <span className="font-bold">R {userHeader?.balanceAccount?.toFixed(2) ?? '0.00'}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 flex-1 min-h-0"> {/* Increased gap between menu items */}
            {menuItems.map((item) => (
              <div key={item.path} className="mb-0">
                <Link to={item.path}>
                  <SidebarItem
                    label={item.label}
                    icon={<item.icon size={18} />}
                    active={isActive(item.path)}
                    className={cn(
                      "hover:bg-paycard-salmon/40 hover:text-white transition-colors",
                      isActive(item.path)
                        ? "bg-paycard-salmon/40 text-white border-l-4 border-l-paycard-salmon pl-3"
                        : "text-gray-300"
                    )}
                    style={{ minHeight: 32, paddingTop: 4, paddingBottom: 4 }}
                  />
                </Link>
              </div>
            ))}
          </div>
        </SidebarContent>

        {/* Footer section */}
        <div className="mt-auto border-t border-paycard-navy-800">
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
