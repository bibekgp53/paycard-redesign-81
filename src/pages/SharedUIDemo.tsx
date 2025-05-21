
import React from 'react';
import { 
  Alert, 
  Badge, 
  Button, 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  Input, 
  Heading, 
  Text, 
  ThemeToggle 
} from "@/libs/shared-ui/components/shared";

const SharedUIDemo = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <Heading level={1}>Shared UI Components</Heading>
        <ThemeToggle />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section>
            <Heading level={2} className="mb-4">Buttons</Heading>
            <div className="flex flex-wrap gap-4">
              <Button>Default Button</Button>
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="destructive">Destructive Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="link">Link Button</Button>
              <Button isLoading>Loading Button</Button>
            </div>
          </section>
          
          <section>
            <Heading level={2} className="mb-4">Badges</Heading>
            <div className="flex flex-wrap gap-4">
              <Badge>Default Badge</Badge>
              <Badge variant="primary">Primary Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="success">Success Badge</Badge>
              <Badge variant="warning">Warning Badge</Badge>
              <Badge variant="danger">Danger Badge</Badge>
              <Badge variant="info">Info Badge</Badge>
              <Badge size="sm">Small Badge</Badge>
            </div>
          </section>

          <section>
            <Heading level={2} className="mb-4">Typography</Heading>
            <div className="space-y-3">
              <Heading level={1}>Heading 1</Heading>
              <Heading level={2}>Heading 2</Heading>
              <Heading level={3}>Heading 3</Heading>
              <Heading level={4}>Heading 4</Heading>
              <Heading level={5}>Heading 5</Heading>
              <Heading level={6}>Heading 6</Heading>
              <Text>Default Text</Text>
              <Text variant="lead">Lead Text</Text>
              <Text variant="small">Small Text</Text>
              <Text variant="muted">Muted Text</Text>
            </div>
          </section>
        </div>
        
        <div className="space-y-6">
          <section>
            <Heading level={2} className="mb-4">Alerts</Heading>
            <div className="space-y-4">
              <Alert>This is a default alert</Alert>
              <Alert variant="success" title="Success">This is a success alert with title</Alert>
              <Alert variant="warning" title="Warning">This is a warning alert with title</Alert>
              <Alert variant="danger" title="Error">This is an error alert with title</Alert>
              <Alert variant="info" title="Information" onClose={() => console.log('Alert closed')}>
                This is an info alert with close button
              </Alert>
            </div>
          </section>
          
          <section>
            <Heading level={2} className="mb-4">Cards</Heading>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>This is a basic card component from the shared UI library.</p>
                </CardContent>
              </Card>
              
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Bordered Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>This card has a border styling applied to it.</p>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-end w-full">
                    <Button size="sm">Action</Button>
                  </div>
                </CardFooter>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Elevated Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>This card has elevated styling with shadow effects.</p>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    <Button variant="outline" size="sm">Cancel</Button>
                    <Button variant="primary" size="sm">Submit</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </section>
          
          <section>
            <Heading level={2} className="mb-4">Form Controls</Heading>
            <div className="space-y-4">
              <Input label="Text Input" placeholder="Enter some text" />
              <Input 
                label="Email Input" 
                type="email" 
                placeholder="Enter your email" 
                leftElement={<span>@</span>}
              />
              <Input 
                label="Password Input" 
                type="password" 
                placeholder="Enter your password" 
                rightElement={<button type="button">Show</button>}
              />
              <Input 
                label="Input with Error" 
                placeholder="Invalid input" 
                error="This field is required" 
              />
              <Input 
                label="Input with Hint" 
                placeholder="Enter correctly" 
                hint="Must be at least 8 characters" 
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SharedUIDemo;
