import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import Navigation from './src/navigation';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Navigation />
  </QueryClientProvider>
);

export default App;
