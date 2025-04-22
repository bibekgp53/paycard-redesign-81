
import React from 'react';
import { Card } from "@/components/ui/card";

interface ColorCardProps {
  color: string;
  name: string;
  hexCode: string;
  textColor?: string;
}

function ColorCard({ color, name, hexCode, textColor = "text-white" }: ColorCardProps) {
  return (
    <div className={`pcard-color-card ${color}`}>
      <div className="pcard-color-card-body">
        <span className={`font-bold text-lg ${textColor}`}>{name}</span>
        <span className={`text-sm font-semibold ${textColor}`}>{hexCode}</span>
      </div>
    </div>
  );
}

function ColorSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-pcard-dark-blue mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {children}
      </div>
    </div>
  );
}

export function ColorPalette() {
  return (
    <div className="paycard-container py-12">
      <h1 className="text-4xl font-bold text-pcard-dark-blue mb-12">Design System - Color Palette</h1>
      
      <ColorSection title="Blues (Navy)">
        <ColorCard color="bg-pcard-dark-blue" name="Navy" hexCode="#0F1F38" />
        <ColorCard color="bg-pcard-blue-900" name="Navy 900" hexCode="#183358" />
        <ColorCard color="bg-pcard-blue-800" name="Navy 800" hexCode="#224780" />
        <ColorCard color="bg-pcard-blue-700" name="Navy 700" hexCode="#2C58A5" />
        <ColorCard color="bg-pcard-blue-600" name="Navy 600" hexCode="#366FC9" />
        <ColorCard color="bg-pcard-blue-500" name="Navy 500" hexCode="#5A88D3" />
        <ColorCard color="bg-pcard-blue-400" name="Navy 400" hexCode="#7FA4DD" />
        <ColorCard color="bg-pcard-blue-300" name="Navy 300" hexCode="#A4A8E7" textColor="text-pcard-dark-blue" />
        <ColorCard color="bg-pcard-blue-200" name="Navy 200" hexCode="#C8DBF0" textColor="text-pcard-dark-blue" />
        <ColorCard color="bg-pcard-blue-100" name="Navy 100" hexCode="#EDF2FA" textColor="text-pcard-dark-blue" />
        <ColorCard color="bg-pcard-blue-50" name="Navy 50" hexCode="#F6F9FD" textColor="text-pcard-dark-blue" />
      </ColorSection>
      
      <ColorSection title="Status Colors">
        <ColorCard color="bg-pcard-status-blue" name="Status Blue" hexCode="#6C87BC" />
        <ColorCard color="bg-pcard-status-blue-dark" name="Status Blue Dark" hexCode="#3C5382" />
        <ColorCard color="bg-pcard-status-blue-light" name="Status Blue Light" hexCode="#E7ECF4" textColor="text-pcard-dark-blue" />
        
        <ColorCard color="bg-pcard-status-green" name="Status Green" hexCode="#6CBC85" />
        <ColorCard color="bg-pcard-status-green-dark" name="Status Green Dark" hexCode="#357449" />
        <ColorCard color="bg-pcard-status-green-light" name="Status Green Light" hexCode="#E7F4EB" textColor="text-pcard-dark-blue" />
        
        <ColorCard color="bg-pcard-status-orange" name="Status Orange" hexCode="#FBE053" textColor="text-pcard-dark-blue" />
        <ColorCard color="bg-pcard-status-orange-dark" name="Status Orange Dark" hexCode="#B97705" />
        <ColorCard color="bg-pcard-status-orange-light" name="Status Orange Light" hexCode="#FEF5E3" textColor="text-pcard-dark-blue" />
        
        <ColorCard color="bg-pcard-status-red" name="Status Red" hexCode="#F17173" />
        <ColorCard color="bg-pcard-status-red-dark" name="Status Red Dark" hexCode="#B71215" />
        <ColorCard color="bg-pcard-status-red-light" name="Status Red Light" hexCode="#FDE8E9" textColor="text-pcard-dark-blue" />
      </ColorSection>
      
      <ColorSection title="Brand Salmon">
        <ColorCard color="bg-pcard-salmon" name="Salmon" hexCode="#F47A71" />
        <ColorCard color="bg-pcard-salmon-dark" name="Salmon Dark" hexCode="#923E38" />
        <ColorCard color="bg-pcard-salmon-medium" name="Salmon Medium" hexCode="#EE6D64" />
        <ColorCard color="bg-pcard-salmon-light" name="Salmon Light" hexCode="#FDE2E1" textColor="text-pcard-dark-blue" />
      </ColorSection>
    </div>
  );
}
