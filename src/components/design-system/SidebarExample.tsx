
import React from 'react';
import { Home, User, Settings, FileText, BarChart } from 'lucide-react';
import { 
  Sidebar, 
  SidebarItem, 
  SidebarGroup 
} from '@/components/ui/sidebar';

export function SidebarExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="h-[500px] bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-4">Full Sidebar</h3>
        <div className="h-[440px] overflow-hidden rounded-lg">
          <Sidebar 
            variant="full" 
            username="Antonin Pospisil"
          >
            <SidebarItem 
              label="Dashboard" 
              icon={<Home className="h-5 w-5" />} 
              active 
            />
            <SidebarItem 
              label="Users" 
              icon={<User className="h-5 w-5" />} 
            />
            <SidebarGroup title="Reports" collapsible>
              <SidebarItem label="Daily" />
              <SidebarItem label="Weekly" />
              <SidebarItem label="Monthly" />
            </SidebarGroup>
            <SidebarItem 
              label="Analytics" 
              icon={<BarChart className="h-5 w-5" />} 
            />
            <SidebarItem 
              label="Documents" 
              icon={<FileText className="h-5 w-5" />} 
            />
            <SidebarItem 
              label="Settings" 
              icon={<Settings className="h-5 w-5" />} 
            />
          </Sidebar>
        </div>
      </div>

      <div className="h-[500px] bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-4">Sidebar with Group</h3>
        <div className="h-[440px] overflow-hidden rounded-lg">
          <Sidebar 
            variant="full"
            username="Antonin Pospisil"
          >
            <SidebarItem 
              label="Dashboard" 
              icon={<Home className="h-5 w-5" />} 
            />
            <SidebarGroup 
              title="Menu" 
              collapsible 
              defaultCollapsed={false}
            >
              <SidebarItem label="Item 01" />
              <SidebarItem label="Item 02" />
              <SidebarItem label="Item 03" active />
            </SidebarGroup>
            <SidebarItem 
              label="Settings" 
              icon={<Settings className="h-5 w-5" />} 
            />
          </Sidebar>
        </div>
      </div>

      <div className="h-[500px] bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-4">Collapsed Sidebar</h3>
        <div className="h-[440px] overflow-hidden rounded-lg flex justify-center">
          <Sidebar 
            variant="collapsed" 
            username="Antonin Pospisil"
          >
            <SidebarItem 
              icon={<Home className="h-5 w-5" />} 
              label=""
            />
            <SidebarItem 
              icon={<User className="h-5 w-5" />} 
              label=""
            />
            <SidebarItem 
              icon={<BarChart className="h-5 w-5" />} 
              label=""
              active
            />
            <SidebarItem 
              icon={<Settings className="h-5 w-5" />} 
              label=""
            />
          </Sidebar>
        </div>
      </div>
    </div>
  );
}
