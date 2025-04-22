import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { RadioGroup as RadioGroupBase, RadioGroupItem } from '@/components/ui/radio-group';

export function FormElements() {
  return (
    <Card className="p-8 mb-12">
      <h2 className="text-3xl font-bold mb-6">Form Elements</h2>
      
      {/* Input Fields */}
      <h3 className="text-2xl font-bold mb-4">Input Fields</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <Label htmlFor="default">Default Input</Label>
          <Input id="default" placeholder="Enter text..." />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="disabled">Disabled Input</Label>
          <Input id="disabled" placeholder="Disabled input" disabled />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="with-error">Input with Error</Label>
          <Input id="with-error" placeholder="Error input" className="border-pcard-status-red ring-1 ring-pcard-status-red" />
          <p className="text-sm text-pcard-status-red">Error message goes here</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="with-helper">Input with Helper Text</Label>
          <Input id="with-helper" placeholder="Helper text input" />
          <p className="text-sm text-gray-500">Helper text provides additional guidance</p>
        </div>
      </div>
      
      <Separator className="my-8" />
      
      {/* Input with Prepend/Append */}
      <h3 className="text-2xl font-bold mb-4">Input with Prepend/Append</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <Label htmlFor="prepend">Input with Prepend</Label>
          <div className="flex">
            <div className="flex items-center justify-center px-3 bg-pcard-blue-100 border border-r-0 border-input rounded-l-md">
              $
            </div>
            <Input id="prepend" className="rounded-l-none" placeholder="Amount" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="append">Input with Append</Label>
          <div className="flex">
            <Input id="append" className="rounded-r-none" placeholder="Timeframe" />
            <div className="flex items-center justify-center px-3 min-w-[80px] bg-pcard-blue-100 border border-l-0 border-input rounded-r-md">
              Days
            </div>
          </div>
        </div>
      </div>
      
      <Separator className="my-8" />
      
      {/* Checkbox & Radio */}
      <h3 className="text-2xl font-bold mb-4">Checkbox & Radio Controls</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <h4 className="font-bold">Checkboxes</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="newsletter" defaultChecked />
              <label
                htmlFor="newsletter"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Subscribe to newsletter
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled" disabled />
              <label
                htmlFor="disabled"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Disabled option
              </label>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-bold">Radio Buttons</h4>
          <RadioGroupBase defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Option Two</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-three" id="option-three" disabled />
              <Label htmlFor="option-three" className="opacity-50">Disabled Option</Label>
            </div>
          </RadioGroupBase>
        </div>
      </div>
      
      <Separator className="my-8" />
      
      {/* Toggle & Switch */}
      <h3 className="text-2xl font-bold mb-4">Toggles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative inline-flex h-6 w-11 items-center rounded-full border-2 border-transparent bg-pcard-blue-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=checked]:bg-pcard-dark-blue">
              <span className="inline-block h-5 w-5 translate-x-0 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-5"></span>
            </div>
            <Label>Default Toggle</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative inline-flex h-6 w-11 items-center rounded-full border-2 border-transparent bg-pcard-blue-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              <span className="inline-block h-5 w-5 translate-x-5 rounded-full bg-pcard-dark-blue shadow-lg transition-transform"></span>
            </div>
            <Label>Active Toggle</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative inline-flex h-6 w-11 items-center rounded-full border-2 border-transparent bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background opacity-50">
              <span className="inline-block h-5 w-5 translate-x-0 rounded-full bg-white shadow-lg transition-transform"></span>
            </div>
            <Label className="opacity-50">Disabled Toggle</Label>
          </div>
        </div>
      </div>
      
      <Separator className="my-8" />
      
      {/* Chips */}
      <h3 className="text-2xl font-bold mb-4">Chips</h3>
      <div className="flex flex-wrap gap-2 mb-8">
        <div className="inline-flex items-center rounded-full bg-pcard-blue-100 px-2.5 py-0.5 text-xs font-semibold text-pcard-dark-blue">
          Default
        </div>
        <div className="inline-flex items-center rounded-full bg-pcard-blue-100 px-2.5 py-0.5 text-xs font-semibold text-pcard-dark-blue">
          <span className="mr-1 text-pcard-dark-blue">×</span>
          Removable
        </div>
        <div className="inline-flex items-center rounded-full bg-pcard-status-green-light px-2.5 py-0.5 text-xs font-semibold text-pcard-status-green-dark">
          Success
        </div>
        <div className="inline-flex items-center rounded-full bg-pcard-status-red-light px-2.5 py-0.5 text-xs font-semibold text-pcard-status-red-dark">
          Error
        </div>
        <div className="inline-flex items-center rounded-full bg-pcard-status-orange-light px-2.5 py-0.5 text-xs font-semibold text-pcard-status-orange-dark">
          Warning
        </div>
      </div>
      
      <Separator className="my-8" />
      
      {/* Filters */}
      <h3 className="text-2xl font-bold mb-4">Filters</h3>
      <div className="flex flex-wrap gap-2 mb-8">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <span>Filter</span>
          <span className="ml-1">↓</span>
        </Button>
        
        <Button variant="outline" size="sm" className="bg-pcard-blue-100 border-pcard-blue-200">
          Active Filter
          <span className="ml-1 text-xs">×</span>
        </Button>
        
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <span>Date Range</span>
          <span className="ml-1">↓</span>
        </Button>
        
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <span>Status</span>
          <span className="ml-1">↓</span>
        </Button>
      </div>
      
      <Separator className="my-8" />
      
      {/* Flash Messages */}
      <h3 className="text-2xl font-bold mb-4">Flash Messages</h3>
      <div className="space-y-4 mb-8">
        <div className="flex items-start bg-pcard-status-blue-light border-l-4 border-pcard-status-blue p-4 rounded">
          <div className="mr-3 text-pcard-status-blue flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-pcard-status-blue-dark">Information</h4>
            <p className="text-sm text-pcard-dark-blue">This is an informational message.</p>
          </div>
        </div>
        
        <div className="flex items-start bg-pcard-status-green-light border-l-4 border-pcard-status-green p-4 rounded">
          <div className="mr-3 text-pcard-status-green flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-pcard-status-green-dark">Success</h4>
            <p className="text-sm text-pcard-dark-blue">Operation completed successfully.</p>
          </div>
        </div>
        
        <div className="flex items-start bg-pcard-status-orange-light border-l-4 border-pcard-status-orange p-4 rounded">
          <div className="mr-3 text-pcard-status-orange flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81442 19.9905C1.98733 20.2939 2.23586 20.5467 2.53638 20.7239C2.83689 20.9012 3.17778 20.9962 3.527 21H20.47C20.8192 20.9962 21.1601 20.9012 21.4606 20.7239C21.7612 20.5467 22.0097 20.2939 22.1826 19.9905C22.3555 19.6871 22.446 19.3437 22.445 18.9945C22.444 18.6453 22.3516 18.3024 22.177 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-pcard-status-orange-dark">Warning</h4>
            <p className="text-sm text-pcard-dark-blue">Please check your information before proceeding.</p>
          </div>
        </div>
        
        <div className="flex items-start bg-pcard-status-red-light border-l-4 border-pcard-status-red p-4 rounded">
          <div className="mr-3 text-pcard-status-red flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-pcard-status-red-dark">Error</h4>
            <p className="text-sm text-pcard-dark-blue">An error occurred while processing your request.</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
