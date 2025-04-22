
import React from 'react';
import { Card } from '@/components/ui/card';

export function ScrollableComponent() {
  return (
    <Card className="p-8 mb-12">
      <h2 className="text-3xl font-bold mb-6">Scrollable Components</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Vertical Scrollbar</h3>
          <div className="w-full h-64 border rounded-md overflow-hidden">
            <div className="flex">
              <div className="flex-1 overflow-y-auto p-4 h-64">
                <div className="space-y-2">
                  {[...Array(15)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`p-3 rounded-md ${i === 1 ? 'bg-pcard-blue-100' : 'bg-gray-100'}`}
                    >
                      List item {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-1.5 bg-gray-100 h-64 relative">
                <div className="absolute w-1.5 bg-pcard-dark-blue rounded-full h-16 top-0"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">Horizontal Scrollbar</h3>
          <div className="h-64 border rounded-md overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-x-auto p-4">
                <div className="flex space-x-4 min-w-[800px]">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-shrink-0 w-48 h-48 rounded-md flex items-center justify-center bg-gray-100"
                    >
                      Item {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-1.5 bg-gray-100 w-full relative">
                <div className="absolute h-1.5 bg-pcard-dark-blue rounded-full w-32 left-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
