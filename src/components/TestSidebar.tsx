
import React from 'react';
import { 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Play, FileText, BarChart2, Clock, Settings, Github } from 'lucide-react';

interface TestSidebarProps {
  activeTab: 'runs' | 'specs';
  setActiveTab: (tab: 'runs' | 'specs') => void;
  onSelectSpec: (spec: string) => void;
}

export const TestSidebar = ({ activeTab, setActiveTab, onSelectSpec }: TestSidebarProps) => {
  const specs = [
    { id: 'login', name: 'Login Tests', fileCount: 2 },
    { id: 'checkboxes', name: 'Checkbox Tests', fileCount: 1 },
    { id: 'dropdown', name: 'Dropdown Tests', fileCount: 1 },
    { id: 'inputs', name: 'Input Tests', fileCount: 3 },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-4 h-16 border-b">
        <div className="flex items-center gap-2">
          <Play size={20} className="text-primary" />
          <span className="font-semibold text-lg">Playwright Dashboard</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Test Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveTab('runs')}
                  isActive={activeTab === 'runs'}
                >
                  <Clock size={18} />
                  <span>Test Runs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveTab('specs')}
                  isActive={activeTab === 'specs'}
                >
                  <FileText size={18} />
                  <span>Test Specs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BarChart2 size={18} />
                  <span>Reports</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {activeTab === 'specs' && (
          <SidebarGroup>
            <SidebarGroupLabel>Test Specs</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {specs.map((spec) => (
                  <SidebarMenuItem key={spec.id}>
                    <SidebarMenuButton 
                      onClick={() => onSelectSpec(spec.id)}
                    >
                      <FileText size={18} />
                      <span>{spec.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings size={18} />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Github size={18} />
              <span>GitHub</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
