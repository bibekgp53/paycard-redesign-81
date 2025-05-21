# PayCard Microfrontend

This application has been configured as a microfrontend using Vite's Module Federation. This allows the entire application to be consumed by a shell application.

## Exposed Application

The PayCard application is exposed for use in a shell application:

- `./PayCard` - The complete PayCard application

## How to Consume This Microfrontend

In your shell application (also using Vite + Module Federation), you can configure it like this:

```js
// vite.config.js of the shell application
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    federation({
      name: 'host-app',
      remotes: {
        paycard: 'http://your-paycard-app-url/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', '@apollo/client']
    })
  ],
});
```

Then you can import and use the application in your shell application:

```jsx
import { default as PayCard } from 'paycard/PayCard';

function App() {
  return (
    <div>
      <h1>Shell Application</h1>
      <PayCard />
    </div>
  );
}
```

## Development

When developing the microfrontend:

1. Run `npm run dev` to start the application in standalone mode
2. Run `npm run build` to create the production build with the federated module

## Requirements

The shell application should use compatible versions of:
- React 19+
- @apollo/client
