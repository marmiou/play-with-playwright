
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw, Settings, Filter } from 'lucide-react';

interface TestHeaderProps {
  selectedSpec: string | null;
}

export const TestHeader = ({ selectedSpec }: TestHeaderProps) => {
  const getSpecName = () => {
    if (!selectedSpec) return 'All Tests';
    
    const specMap: Record<string, string> = {
      'login': 'Login Tests',
      'checkboxes': 'Checkbox Tests',
      'dropdown': 'Dropdown Tests',
      'inputs': 'Input Tests',
    };
    
    return specMap[selectedSpec] || selectedSpec;
  };

  return (
    <div className="bg-white border-b p-4 h-16 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold mr-4">{getSpecName()}</h1>
        {selectedSpec && (
          <span className="text-sm text-muted-foreground">
            https://the-internet.herokuapp.com/{selectedSpec}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        <Button size="sm" className="ml-2">
          <Play className="h-4 w-4 mr-2" />
          Run Tests
        </Button>
      </div>
    </div>
  );
};
