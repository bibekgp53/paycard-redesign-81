
import { CreditCard, Users, FileText } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-paycard-navy">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Cards"
          icon={<CreditCard className="h-8 w-8 text-paycard-navy" />}
          value="24,156"
          linkUrl="/cards"
        />
        <DashboardCard
          title="Profiles"
          icon={<Users className="h-8 w-8 text-paycard-navy" />}
          value="5,823"
          linkUrl="/profiles"
        />
        <DashboardCard
          title="Reports"
          icon={<FileText className="h-8 w-8 text-paycard-navy" />}
          value="312"
          linkUrl="/reports"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-paycard-navy">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickLinkButton
            label="Link Cards"
            icon={<CreditCard className="h-5 w-5" />}
            href="/cards/link"
          />
        </div>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  value: string;
  linkUrl: string;
}

const DashboardCard = ({ title, icon, value, linkUrl }: DashboardCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-500">{title}</h3>
          <p className="text-3xl font-bold text-paycard-navy mt-2">{value}</p>
        </div>
        <div>{icon}</div>
      </div>
      <a
        href={linkUrl}
        className="block mt-4 text-paycard-navy font-medium hover:text-paycard-salmon transition-colors"
      >
        View All &rarr;
      </a>
    </div>
  );
};

interface QuickLinkButtonProps {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const QuickLinkButton = ({ label, icon, href }: QuickLinkButtonProps) => {
  return (
    <a
      href={href}
      className="flex items-center p-3 bg-paycard-navy-100 hover:bg-paycard-navy-150 rounded-md transition-colors"
    >
      <span className="bg-paycard-salmon text-white p-2 rounded-full mr-3">
        {icon}
      </span>
      <span className="font-medium text-paycard-navy">{label}</span>
    </a>
  );
};

export default Dashboard;
