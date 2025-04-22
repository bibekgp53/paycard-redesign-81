
import { Home, CreditCard, Users, FileText, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { 
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarItem
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const location = useLocation();

  // Highlight logic simplified to use active & hover states visually identical for menu/submenu
  const isSubmenuActive = (submenuItems = []) => {
    return submenuItems.some((subItem) =>
      location.pathname === subItem.path ||
      (subItem.path === "/load-funds-from" && location.pathname.startsWith("/load-funds-from"))
    );
  };

  // Accept submenuItems parameter, default to []
  const isActive = (path: string, submenuItems: { path: string }[] = []) => {
    if (submenuItems.length > 0 && isSubmenuActive(submenuItems)) {
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

  // Logo
  const Logo = () => (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-paycard-salmon rounded-[4px] flex items-center justify-center">
        <Home className="text-white" size={22} />
      </div>
      <div>
        <div className="font-black text-white text-xl leading-none">Control</div>
        <div className="text-paycard-salmon font-semibold text-xs leading-none">sandbox</div>
      </div>
    </div>
  );

  // Menu items based on Figma structure
  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: CreditCard, label: "Transactions", path: "/cards" },
    { icon: Users, label: "Settlements", path: "/profiles" },
    { icon: FileText, label: "Client Control", path: "/reports" },
    { icon: Settings, label: "System", path: "/settings" },
  ];

  return (
    <UISidebar
      variant="full"
      collapsible="none"
      logoText="Control"
      logoTagline="sandbox"
      className="bg-paycard-navy w-[260px] min-h-screen text-white shadow-xl"
    >
      <div className="p-6 pb-2 border-b border-paycard-navy-700 flex items-center">
        <Logo />
      </div>
      <SidebarContent>
        <nav className="flex flex-col py-2 gap-0">
          {menuItems.map((item) => {
            // Fix: always pass an array for submenuItems (currently none, but future-safe)
            const active = isActive(item.path, []);
            return (
              <Link to={item.path} key={item.path} className="block">
                <SidebarItem
                  label={item.label}
                  icon={
                    <item.icon
                      size={20}
                      strokeWidth={2}
                      className={cn(active ? "text-white" : "text-white/80")}
                    />
                  }
                  active={active}
                  // Design: Match Figma active and hover colors (bg-paycard-salmon, white text, subtly rounded)
                  className={cn(
                    "flex items-center rounded-[6px] px-6 py-3 font-medium text-base cursor-pointer transition-all duration-150",
                    // Highlight both active and hover with the same color (Figma: salmon)
                    "hover:bg-paycard-salmon hover:text-white focus:bg-paycard-salmon focus:text-white",
                    active
                      ? "bg-paycard-salmon text-white"
                      : "bg-transparent text-white/80"
                  )}
                />
              </Link>
            );
          })}
        </nav>
      </SidebarContent>
      <div className="mt-auto w-full border-t border-paycard-navy-700 px-4 py-2">
        <div className="flex items-center px-2">
          <span className="text-white/80 font-medium text-sm flex-1">Antonin Pospisil</span>
          <button
            className="ml-2 p-1 rounded-full hover:bg-paycard-salmon/20 transition-colors"
            tabIndex={0}
            aria-label="Expand"
          >
            <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </UISidebar>
  );
}
