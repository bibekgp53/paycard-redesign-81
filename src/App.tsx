
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/apollo-client';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import LinkCardsForm from "./pages/cards/LinkCardsForm";
import LinkCardsConfirm from "./pages/cards/LinkCardsConfirm";
import AllocateCards from "./pages/cards/AllocateCards";
import AllocateCardsDetails from "./pages/cards/AllocateCardsDetails";
import { MainLayout } from "./components/layout/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <ApolloProvider client={apolloClient}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
            
            {/* Card Management */}
            <Route path="/cards/link" element={<MainLayout><LinkCardsForm /></MainLayout>} />
            <Route path="/cards/link/confirm" element={<MainLayout><LinkCardsConfirm /></MainLayout>} />
            <Route path="/cards/allocate" element={<MainLayout><AllocateCards /></MainLayout>} />
            <Route path="/cards/allocate/details" element={<MainLayout><AllocateCardsDetails /></MainLayout>} />
            
            {/* Default page for unimplemented sections */}
            <Route path="/cards" element={<MainLayout><Dashboard /></MainLayout>} />
            <Route path="/profiles" element={<MainLayout><Dashboard /></MainLayout>} />
            <Route path="/reports" element={<MainLayout><Dashboard /></MainLayout>} />
            <Route path="/settings" element={<MainLayout><Dashboard /></MainLayout>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ApolloProvider>
);

export default App;
