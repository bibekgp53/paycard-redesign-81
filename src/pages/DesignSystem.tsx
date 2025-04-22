
import { ColorPalette } from '@/components/design-system/ColorPalette';
import { StatusCardGrid } from '@/components/design-system/StatusCard';
import { ColorGradient } from '@/components/design-system/ColorGradient';
import { Typography } from '@/components/design-system/Typography';
import { FormElements } from '@/components/design-system/FormElements';
import { SidebarExample } from '@/components/design-system/SidebarExample';
import { SliderExample } from '@/components/design-system/SliderExample';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-pcard-dark-blue py-12 mb-12">
        <div className="paycard-container">
          <h1 className="text-white font-bold text-5xl">Design System</h1>
          <p className="text-white/80 mt-4">A comprehensive design system for PayCard</p>
        </div>
      </header>

      <div className="paycard-container">
        <Typography />
        
        <Card className="p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">Components</h2>
          
          <h3 className="text-2xl font-bold mb-4">Badges</h3>
          <div className="flex flex-wrap gap-4 mb-8">
            <Badge variant="default" className="bg-pcard-status-blue">Blue Badge</Badge>
            <Badge variant="default" className="bg-pcard-status-green">Green Badge</Badge>
            <Badge variant="default" className="bg-pcard-status-orange text-pcard-dark-blue">Orange Badge</Badge>
            <Badge variant="default" className="bg-pcard-status-red">Red Badge</Badge>
            <Badge variant="outline" className="border-pcard-dark-blue text-pcard-dark-blue">Outline Badge</Badge>
          </div>
          
          <Separator className="my-8" />
          
          <h3 className="text-2xl font-bold mb-4">Buttons</h3>
          <div className="flex flex-wrap gap-4 mb-8">
            <Button className="bg-pcard-dark-blue hover:bg-pcard-blue-800">Primary</Button>
            <Button variant="outline" className="border-pcard-dark-blue text-pcard-dark-blue">Secondary</Button>
            <Button className="bg-pcard-salmon hover:bg-pcard-salmon-medium">Accent</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          
          <Separator className="my-8" />
          
          <h3 className="text-2xl font-bold mb-4">Form Elements</h3>
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <h3 className="text-2xl font-bold mb-4">Alerts</h3>
          <div className="space-y-4 mb-8">
            <Alert className="border-pcard-status-blue">
              <Info className="h-4 w-4 text-pcard-status-blue" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an information message.
              </AlertDescription>
            </Alert>
            
            <Alert className="border-pcard-status-green">
              <CheckCircle className="h-4 w-4 text-pcard-status-green" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your action completed successfully.
              </AlertDescription>
            </Alert>
            
            <Alert className="border-pcard-status-orange">
              <AlertTriangle className="h-4 w-4 text-pcard-status-orange" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                This action requires your attention.
              </AlertDescription>
            </Alert>
            
            <Alert className="border-pcard-status-red">
              <XCircle className="h-4 w-4 text-pcard-status-red" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was a problem with your request.
              </AlertDescription>
            </Alert>
          </div>
        </Card>

        <FormElements />
        
        <h2 className="text-3xl font-bold mb-6">Navigation</h2>
        <SidebarExample />
        
        <SliderExample />
        
        <ColorPalette />
        <StatusCardGrid />
        <ColorGradient />
      </div>
    </div>
  );
}
