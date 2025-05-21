# PayCard Microfrontend

This application has been configured as a microfrontend using Vite's Module Federation. This allows certain components of the application to be consumed by a shell application.

## Exposed Components

The following components are exposed for use in a shell application:

- `./SharedUIDemo` - The Shared UI demonstration component
- `./Sidebar` - The application sidebar component
- `./MainLayout` - The main layout component
- `./SharedUI` - All shared UI components

## How to Consume This Microfrontend

In your shell application (also using Vite + Module Federation), you can configure it like this:

```js
// vite.config.js of the shell application
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    // ... other plugins
    federation({
      name: 'host-app',
      remotes: {
        paycard: 'http://your-paycard-app-url/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ],
  // ... other configuration
});
```

Then you can import and use the components in your shell application:

```jsx
import { SharedUIDemo } from 'paycard/SharedUIDemo';
import { SharedUI } from 'paycard/SharedUI';

function App() {
  return (
    <div>
      <h1>Shell Application</h1>
      <SharedUIDemo />
    </div>
  );
}
```

## Development

When developing the microfrontend:

1. Run `npm run dev` to start the application in standalone mode
2. Run `npm run build` to create the production build with the federated modules

## Requirements

The shell application should use compatible versions of:
- React 18+
- React Router DOM 6+
- @tanstack/react-query (if using the components that depend on it)
