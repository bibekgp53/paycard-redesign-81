
import React from 'react';
import { Home, User, Settings, FileText, BarChart } from 'lucide-react';
import { CustomSidebar, CustomSidebarItem, CustomSidebarGroup } from '@/components/ui/sidebar';

export function SidebarExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="h-[500px] bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-4">Full Sidebar</h3>
        <div className="h-[440px] overflow-hidden rounded-lg">
          <CustomSidebar username="Antonin Pospisil">
            <CustomSidebarItem 
              label="Dashboard" 
              icon={<Home className="h-5 w-5" />} 
              active 
            />
            <CustomSidebarItem 
              label="Users" 
              icon={<User className="h-5 w-5" />} 
            />
            <CustomSidebarGroup title="Reports" collapsible>
              <CustomSidebarItem label="Daily" />
              <CustomSidebarItem label="Weekly" />
              <CustomSidebarItem label="Monthly" />
            </CustomSidebarGroup>
            <CustomSidebarItem 
              label="Analytics" 
              icon={<BarChart className="h-5 w-5" />} 
            />
            <CustomSidebarItem 
              label="Documents" 
              icon={<FileText className="h-5 w-5" />} 
            />
            <CustomSidebarItem 
              label="Settings" 
              icon={<Settings className="h-5 w-5" />} 
            />
          </CustomSidebar>
        </div>
      </div>

      <div className="h-[500px] bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-4">Sidebar with Group</h3>
        <div className="h-[440px] overflow-hidden rounded-lg">
          <CustomSidebar username="Antonin Pospisil">
            <CustomSidebarItem 
              label="Dashboard" 
              icon={<Home className="h-5 w-5" />} 
            />
            <CustomSidebarGroup title="Menu" collapsible defaultCollapsed={false}>
              <CustomSidebarItem label="Item 01" />
              <CustomSidebarItem label="Item 02" />
              <CustomSidebarItem label="Item 03" active />
            </CustomSidebarGroup>
            <CustomSidebarItem 
              label="Settings" 
              icon={<Settings className="h-5 w-5" />} 
            />
          </CustomSidebar>
        </div>
      </div>

      <div className="h-[500px] bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-4">Collapsed Sidebar</h3>
        <div className="h-[440px] overflow-hidden rounded-lg flex justify-center">
          <CustomSidebar 
            variant="collapsed" 
            username="Antonin Pospisil"
          >
            <CustomSidebarItem 
              icon={<Home className="h-5 w-5" />} 
              label=""
            />
            <CustomSidebarItem 
              icon={<User className="h-5 w-5" />} 
              label=""
            />
            <CustomSidebarItem 
              icon={<BarChart className="h-5 w-5" />} 
              label=""
              active
            />
            <CustomSidebarItem 
              icon={<Settings className="h-5 w-5" />} 
              label=""
            />
          </CustomSidebar>
        </div>
      </div>
    </div>
  );
}
