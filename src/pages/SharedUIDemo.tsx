
import React from 'react';
import { Alert } from "@shared-ui/components/shared/Alert";
import { Badge } from "@shared-ui/components/shared/Badge";
import { Button } from "@shared-ui/components/shared/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@shared-ui/components/shared/Card";
import { Input } from "@shared-ui/components/shared/Input";

const SharedUIDemo = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Shared UI Components</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button>Default Button</Button>
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Badges</h2>
            <div className="flex flex-wrap gap-4">
              <Badge>Default Badge</Badge>
              <Badge variant="primary">Primary Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
            </div>
          </section>
        </div>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Alerts</h2>
            <div className="space-y-4">
              <Alert>This is a default alert</Alert>
              <Alert variant="success">This is a success alert</Alert>
              <Alert variant="warning">This is a warning alert</Alert>
              <Alert variant="danger">This is an error alert</Alert>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Cards</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>This is a basic card component from the shared UI library.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Card with Footer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>This card includes a custom footer component.</p>
                </CardContent>
                <CardFooter>
                  <div className="text-right w-full">Footer Content</div>
                </CardFooter>
              </Card>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Form Controls</h2>
            <div className="space-y-4">
              <Input label="Text Input" placeholder="Enter some text" />
              <Input label="Email Input" type="email" placeholder="Enter your email" />
              <Input label="Password Input" type="password" placeholder="Enter your password" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SharedUIDemo;
