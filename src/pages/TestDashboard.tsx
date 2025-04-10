
import React, { useState } from 'react';
import { TestSidebar } from '@/components/TestSidebar';
import { TestHeader } from '@/components/TestHeader';
import TestRunnerPanel from '@/components/TestRunnerPanel';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

const TestDashboard = () => {
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'runs' | 'specs'>('specs');

  return (
    <div className="h-screen bg-gray-50">
      <SidebarProvider>
        <div className="flex h-full w-full">
          <TestSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            onSelectSpec={setSelectedSpec}
          />
          <SidebarInset className="p-0 h-screen">
            <TestHeader selectedSpec={selectedSpec} />
            <TestRunnerPanel selectedSpec={selectedSpec} />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default TestDashboard;
