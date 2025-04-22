
import React from 'react';

interface GradientCardProps {
  colorStart: string;
  colorEnd: string;
  label: string;
  textColor?: string;
}

export function GradientCard({ colorStart, colorEnd, label, textColor = "text-white" }: GradientCardProps) {
  return (
    <div 
      className="h-32 rounded-card flex items-center justify-center"
      style={{ 
        background: `linear-gradient(90deg, ${colorStart} 0%, ${colorEnd} 100%)` 
      }}
    >
      <span className={`font-bold ${textColor}`}>{label}</span>
    </div>
  );
}

export function ColorGradient() {
  return (
    <div className="paycard-container py-12">
      <h2 className="text-3xl font-bold text-pcard-dark-blue mb-6">Color Gradients</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <GradientCard 
          colorStart="#0F1F38" 
          colorEnd="#366FC9" 
          label="Navy Gradient" 
        />
        <GradientCard 
          colorStart="#F47A71" 
          colorEnd="#FDE2E1" 
          label="Salmon Gradient" 
        />
        <GradientCard 
          colorStart="#6C87BC" 
          colorEnd="#E7ECF4" 
          label="Blue Status Gradient" 
          textColor="text-pcard-dark-blue"
        />
        <GradientCard 
          colorStart="#6CBC85" 
          colorEnd="#E7F4EB" 
          label="Green Status Gradient" 
          textColor="text-pcard-dark-blue"
        />
        <GradientCard 
          colorStart="#FBE053" 
          colorEnd="#FEF5E3" 
          label="Orange Status Gradient" 
          textColor="text-pcard-dark-blue"
        />
        <GradientCard 
          colorStart="#F17173" 
          colorEnd="#FDE8E9" 
          label="Red Status Gradient" 
          textColor="text-pcard-dark-blue"
        />
      </div>
    </div>
  );
}
