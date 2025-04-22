
import React from 'react';
import { Card } from '@/components/ui/card';
import { Icon, IconName } from '@/components/ui/custom/Icon';

// Group icons by categories for better organization
const iconGroups: { title: string; icons: IconName[] }[] = [
  {
    title: 'Navigation',
    icons: ['home', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down']
  },
  {
    title: 'Actions',
    icons: ['plus', 'minus', 'check', 'x', 'edit', 'trash', 'upload', 'download']
  },
  {
    title: 'Objects',
    icons: ['card', 'file', 'mail', 'calendar', 'clock', 'bell', 'link']
  },
  {
    title: 'User Interface',
    icons: ['user', 'settings', 'search', 'filter', 'share', 'chart']
  },
  {
    title: 'Feedback',
    icons: ['heart', 'star']
  }
];

export function IconsExample() {
  return (
    <Card className="p-8 mb-12">
      <h2 className="text-3xl font-bold mb-6">Icons</h2>
      <p className="text-gray-600 mb-8">
        PayCard uses the Lucide icon library for consistent, high-quality icons throughout the interface. 
        Icons can be easily used by importing the Icon component and specifying the icon name.
      </p>

      <div className="space-y-8">
        {iconGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <h3 className="text-xl font-semibold text-pcard-dark-blue">{group.title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {group.icons.map((iconName) => (
                <div 
                  key={iconName} 
                  className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="h-10 flex items-center justify-center mb-2">
                    <Icon name={iconName} size={24} className="text-pcard-dark-blue" />
                  </div>
                  <span className="text-xs text-gray-600">{iconName}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Usage Example</h3>
        <div className="bg-white p-4 rounded border border-gray-300 mb-4">
          <pre className="text-sm overflow-x-auto">
            {`import { Icon } from '@/components/ui/custom/Icon';

// Basic usage
<Icon name="home" />

// With custom size and color
<Icon name="settings" size={32} color="#0F1F38" />

// With additional classes
<Icon name="user" className="mr-2" />`}
          </pre>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col items-center">
            <div className="mb-2 p-3 bg-white rounded-md shadow-sm">
              <Icon name="home" size={24} className="text-pcard-dark-blue" />
            </div>
            <span className="text-xs">Basic</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 p-3 bg-white rounded-md shadow-sm">
              <Icon name="settings" size={32} color="#F47A71" />
            </div>
            <span className="text-xs">Size & Color</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 p-3 bg-white rounded-md shadow-sm flex items-center">
              <Icon name="user" className="mr-2 text-pcard-dark-blue" />
              <span className="text-sm">Profile</span>
            </div>
            <span className="text-xs">With Text</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 p-3 bg-pcard-dark-blue rounded-md shadow-sm">
              <Icon name="bell" className="text-white" />
            </div>
            <span className="text-xs">Dark Background</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default IconsExample;
