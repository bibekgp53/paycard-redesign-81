
import { CreditCard, Link, Wallet, Users, FileText, Settings, LogOut, Bell } from "lucide-react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { 
  Sidebar as UISidebar,
  SidebarContent,
  SidebarItem
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const location = useLocation();

  // Helper for active path
  const isActive = (path: string) => {
    if (path === "/cards") {
      return location.pathname === "/cards";
    }
    if (path === "/link-cards") {
      return location.pathname === "/link-cards";
    }
    if (path === "/allocate-cards") {
      return location.pathname === "/allocate-cards";
    }
    if (path === "/funds") {
      // highlight for parent only, exclude /funds/children
      return location.pathname === "/funds";
    }
    if (path === "/load-funds-to-cards") {
      return location.pathname === "/load-funds-to-cards";
    }
    if (path === "/profiles") {
      return location.pathname === "/profiles";
    }
    if (path === "/reports") {
      return location.pathname === "/reports";
    }
    if (path === "/settings") {
      return location.pathname === "/settings";
    }
    return location.pathname === path;
  };

  // Figma: dark navy background. Use official brand or fallback to closest in Tailwind config.
  return (
    <div className="flex flex-col min-h-screen w-[265px] bg-[#0F1F38] text-white shadow-xl">
      {/* Logo and Bank Section */}
      <div className="px-7 pt-7 pb-3">
        <div className="font-black text-xl leading-snug" style={{fontFamily: 'Gilroy, sans-serif'}}>
          <span>Standard Bank<br />PayCard</span>
        </div>
        <div className="mt-5 text-sm text-white/85 font-normal">
          Your Balance: <span className="font-bold">R 5000.00</span>
        </div>
      </div>

      {/* Menu Section */}
      <SidebarContent>
        <nav className="flex flex-col gap-1 mt-7">
          {/* Cards */}
          <RouterLink to="/cards" className="block">
            <SidebarItem
              icon={
                <CreditCard size={20} className={cn(isActive("/cards") ? "text-white" : "text-white/80")} />
              }
              label="Cards"
              active={isActive("/cards")}
              className={cn(
                "flex items-center gap-4 rounded-md px-7 py-2 text-base font-medium cursor-pointer transition",
                "hover:bg-paycard-salmon/80 hover:text-white",
                isActive("/cards")
                  ? "bg-paycard-salmon text-white"
                  : "bg-transparent text-white/90"
              )}
            />
          </RouterLink>
          {/* Link Cards */}
          <RouterLink to="/link-cards" className="block">
            <SidebarItem
              icon={
                <Link size={20} className={cn(isActive("/link-cards") ? "text-white" : "text-white/80")} />
              }
              label="Link Cards"
              active={isActive("/link-cards")}
              className={cn(
                "flex items-center gap-4 rounded-md px-7 py-2 text-base font-medium cursor-pointer transition",
                "hover:bg-paycard-salmon/80 hover:text-white",
                isActive("/link-cards")
                  ? "bg-paycard-salmon text-white"
                  : "bg-transparent text-white/90"
              )}
            />
          </RouterLink>
          {/* Allocate Cards */}
          <RouterLink to="/allocate-cards" className="block">
            <SidebarItem
              icon={
                <CreditCard size={20} className={cn(isActive("/allocate-cards") ? "text-white" : "text-white/80")} />
              }
              label="Allocate Cards"
              active={isActive("/allocate-cards")}
              className={cn(
                "flex items-center gap-4 rounded-md px-7 py-2 text-base font-medium cursor-pointer transition",
                "hover:bg-paycard-salmon/80 hover:text-white",
                isActive("/allocate-cards")
                  ? "bg-paycard-salmon text-white"
                  : "bg-transparent text-white/90"
              )}
            />
          </RouterLink>
          {/* Funds */}
          <RouterLink to="/funds" className="block">
            <SidebarItem
              icon={
                <Wallet size={20} className={cn(isActive("/funds") ? "text-white" : "text-white/80")} />
              }
              label="Funds"
              active={isActive("/funds")}
              className={cn(
                "flex items-center gap-4 rounded-md px-7 py-2 text-base font-medium cursor-pointer transition",
                "hover:bg-paycard-salmon/80 hover:text-white",
                isActive("/funds")
                  ? "bg-paycard-salmon text-white"
                  : "bg-transparent text-white/90"
              )}
            />
          </RouterLink>
          {/* Load Funds to Cards (as submenu visually) */}
          <RouterLink to="/load-funds-to-cards" className="block">
            <SidebarItem
              icon={
                <Wallet size={20} className={cn(isActive("/load-funds-to-cards") ? "text-white" : "text-white/80")} />
              }
              label={
                <span className="ml-5">Load Funds to Cards</span>
              }
              active={isActive("/load-funds-to-cards")}
              className={cn(
                "flex items-center gap-4 rounded-md px-7 py-2 text-base font-medium cursor-pointer transition",
                "hover:bg-paycard-salmon/80 hover:text-white",
                isActive("/load-funds-to-cards")
                  ? "bg-paycard-salmon text-white"
                  : "bg-transparent text-white/90"
              )}
            />
          </RouterLink>
          {/* Profiles */}
          <RouterLink to="/profiles" className="block">
            <SidebarItem
              icon={
                <Users size={20} className={cn(isActive("/profiles") ? "text-white" : "text-white/80")} />
              }
              label="Profiles"
              active={isActive("/profiles")}
              className={cn(
                "flex items-center gap-4 rounded-md px-7 py-2 text-base font-medium cursor-pointer transition",
                "hover:bg-paycard-salmon/80 hover:text-white",
                isActive("/profiles")
                  ? "bg-paycard-salmon text-white"
                  : "bg-transparent text-white/90"
              )}
            />
          </RouterLink>
          {/* Reports */}
          <RouterLink to="/reports" className="block">
            <SidebarItem
              icon={
                <FileText size={20} className={cn(isActive("/reports") ? "text-white" : "text-white/80")} />
              }
              label="Reports"
              active={isActive("/reports")}
              className={cn(
                "flex items-center gap-4 rounded-md px-7 py-2 text-base font-medium cursor-pointer transition",
                "hover:bg-paycard-salmon/80 hover:text-white",
                isActive("/reports")
                  ? "bg-paycard-salmon text-white"
                  : "bg-transparent text-white/90"
              )}
            />
          </RouterLink>
          {/* Settings */}
          <RouterLink to="/settings" className="block">
            <SidebarItem
              icon={
                <Settings size={20} className={cn(isActive("/settings") ? "text-white" : "text-white/80")} />
              }
              label="Settings"
              active={isActive("/settings")}
              className={cn(
                "flex items-center gap-4 rounded-md px-7 py-2 text-base font-medium cursor-pointer transition",
                "hover:bg-paycard-salmon/80 hover:text-white",
                isActive("/settings")
                  ? "bg-paycard-salmon text-white"
                  : "bg-transparent text-white/90"
              )}
            />
          </RouterLink>
        </nav>
      </SidebarContent>
      {/* Footer: Notification, user, logout */}
      <div className="flex items-center justify-between mt-auto gap-2 bg-[#0F1F38] border-t border-white/10 px-7 py-3">
        <button className="p-2 rounded-full hover:bg-paycard-salmon/20 transition-colors">
          <Bell size={20} className="text-white/70" />
          <span className="sr-only">Notifications</span>
        </button>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-paycard-salmon/20 transition-colors">
          <Users size={20} className="text-white/70" />
          <span className="font-medium text-base text-white/90">Test User</span>
        </div>
        <button className="p-2 rounded-full hover:bg-paycard-salmon/20 transition-colors">
          <LogOut size={20} className="text-white/70" />
          <span className="sr-only">Logout</span>
        </button>
      </div>
    </div>
  );
}
