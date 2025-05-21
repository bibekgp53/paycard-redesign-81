
import React from 'react';
import { Home, User, Settings, FileText, BarChart } from 'lucide-react';
import { 
  Sidebar, 
  SidebarItem, 
  SidebarGroup,
  SidebarContent,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

export function SidebarExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="h-[500px] bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-4">Full Sidebar</h3>
        <div className="h-[440px] overflow-hidden rounded-lg">
          <Sidebar>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarItem 
                    label="Dashboard" 
                    icon={<Home className="h-5 w-5" />} 
                    active 
                  />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarItem 
                    label="Users" 
                    icon={<User className="h-5 w-5" />} 
                  />
                </SidebarMenuItem>
              </SidebarMenu>
              <SidebarGroup title="Reports" collapsible>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      Daily
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      Weekly
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      Monthly
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarItem 
                    label="Analytics" 
                    icon={<BarChart className="h-5 w-5" />} 
                  />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarItem 
                    label="Documents" 
                    icon={<FileText className="h-5 w-5" />} 
                  />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarItem 
                    label="Settings" 
                    icon={<Settings className="h-5 w-5" />} 
                  />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        </div>
      </div>

      <div className="h-[500px] bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-4">Sidebar with Group</h3>
        <div className="h-[440px] overflow-hidden rounded-lg">
          <Sidebar>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarItem 
                    label="Dashboard" 
                    icon={<Home className="h-5 w-5" />} 
                  />
                </SidebarMenuItem>
              </SidebarMenu>
              <SidebarGroup 
                title="Menu" 
                collapsible 
                defaultCollapsed={false}
              >
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Item 01</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Item 02</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarItem label="Item 03" active />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarItem 
                    label="Settings" 
                    icon={<Settings className="h-5 w-5" />} 
                  />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        </div>
      </div>

      <div className="h-[500px] bg-white rounded-lg shadow p-4">
        <h3 className="text-xl font-semibold mb-4">Collapsed Sidebar</h3>
        <div className="h-[440px] overflow-hidden rounded-lg flex justify-center">
          <Sidebar collapsed={true}>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarItem 
                    icon={<Home className="h-5 w-5" />} 
                  />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarItem 
                    icon={<User className="h-5 w-5" />}
                  />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarItem 
                    icon={<BarChart className="h-5 w-5" />}
                    active
                  />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarItem 
                    icon={<Settings className="h-5 w-5" />}
                  />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        </div>
      </div>
    </div>
  );
}
