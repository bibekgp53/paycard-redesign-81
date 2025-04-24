
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

export function SliderExample() {
  const [singleValue, setSingleValue] = useState<number[]>([40]);
  const [rangeValues, setRangeValues] = useState<number[]>([20, 80]);
  
  return (
    <Card className="p-8 mb-12">
      <h2 className="text-3xl font-bold mb-6">Sliders</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Basic Slider</h3>
            <Slider 
              value={singleValue} 
              onValueChange={(values) => setSingleValue(values)} 
              label="Basic Slider"
              showValue
            />
            <p className="text-sm text-gray-500">Current value: {singleValue[0]}</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Slider with Tooltip</h3>
            <Slider 
              value={singleValue} 
              onValueChange={(values) => setSingleValue(values)}
              label="Slider with Tooltip"
              showValue
              showTooltip
            />
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Range Slider</h3>
            <Slider 
              value={rangeValues}
              onValueChange={(values) => setRangeValues(values)}
              label="Range Slider"
              showValue
              showLabels
            />
            <p className="text-sm text-gray-500">Current range: {rangeValues[0]} - {rangeValues[1]}</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Custom Range</h3>
            <Slider 
              min={50} 
              max={250} 
              step={10}
              value={[120]} 
              onValueChange={(values) => console.log(values)}
              label="Custom Range"
              showValue
              showLabels
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
