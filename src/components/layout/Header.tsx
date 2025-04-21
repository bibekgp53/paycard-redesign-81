
import { UserCircle, Bell, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserHeaderQuery } from "@/hooks/useUserHeaderQuery";

export function Header() {
  const { data: userHeader } = useUserHeaderQuery();

  return (
    <header className="bg-paycard-navy text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="flex items-center mr-10">
          <img src="/paycard-logo.svg" alt="PayCard Logo" className="h-8" />
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="hover:text-paycard-salmon">Dashboard</Link>
          <Link to="/cards" className="hover:text-paycard-salmon">Cards</Link>
          <Link to="/reports" className="hover:text-paycard-salmon">Reports</Link>
          <Link to="/settings" className="hover:text-paycard-salmon">Settings</Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <button className="hover:text-paycard-salmon">
          <Bell size={20} />
        </button>
        <div className="flex items-center">
          <UserCircle size={24} className="mr-2" />
          <span className="hidden md:inline">{userHeader?.fullName ?? "Admin User"}</span>
        </div>
        <button className="hover:text-paycard-salmon">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
