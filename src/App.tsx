
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
import SharedUIDemo from "./pages/SharedUIDemo";
import LinkCardsForm from "./pages/cards/LinkCardsForm";
import LinkCardsConfirm from "./pages/cards/LinkCardsConfirm";
import AllocateCards from "./pages/cards/AllocateCards";
import AllocateCardsDetails from "./pages/cards/AllocateCardsDetails";
import AllocateCardsConfirm from "./pages/cards/AllocateCardsConfirm";
import { MainLayout } from "./components/layout/MainLayout";
import AllocateCardsComplete from "./pages/cards/AllocateCardsComplete";
import LoadFundsFrom from "./pages/funds/LoadFundsFrom";
import LoadFundsTo from "./pages/funds/LoadFundsTo";
import CardLoads from "./pages/funds/CardLoads";
import ConfirmLoad from "./pages/funds/ConfirmLoad";
import DesignSystem from "./pages/DesignSystem";
import RequestCards from "./pages/cards/RequestCards";
import RequestCardsConfirm from "./pages/cards/RequestCardsConfirm";
import AllocateCardsSearch from "./pages/cards/AllocateCardsSearch";
import SearchLoadTo from "./pages/funds/SearchLoadTo";
import CancelPendingLoad from "./pages/funds/CancelPendingLoad";

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
            <Route path="/shared-ui" element={<MainLayout><SharedUIDemo /></MainLayout>} />
            
            {/* Card Management */}
            <Route path="/cards/link" element={<MainLayout><LinkCardsForm /></MainLayout>} />
            <Route path="/cards/link/confirm" element={<MainLayout><LinkCardsConfirm /></MainLayout>} />
            <Route path="/cards/allocate" element={<MainLayout><AllocateCards /></MainLayout>} />
            <Route path="/cards/allocate/search" element={<MainLayout><AllocateCardsSearch /></MainLayout>} />
            <Route path="/cards/allocate/details" element={<MainLayout><AllocateCardsDetails /></MainLayout>} />
            <Route path="/cards/allocate/confirm" element={<MainLayout><AllocateCardsConfirm /></MainLayout>} />
            <Route path="/cards/allocate/complete" element={<MainLayout><AllocateCardsComplete /></MainLayout>} />
            <Route path="/cards/request" element={<MainLayout><RequestCards /></MainLayout>} />
            <Route path="/cards/request/confirm" element={<MainLayout><RequestCardsConfirm /></MainLayout>} />
            
            {/* Funds Management */}
            <Route path="/load-funds-from" element={<MainLayout><LoadFundsFrom /></MainLayout>} />
            <Route path="/load-funds-from/to" element={<MainLayout><LoadFundsTo /></MainLayout>} />
            <Route path="/load-funds-from/to/search-card" element={<MainLayout><SearchLoadTo /></MainLayout>} />
            <Route path="/load-funds-from/card-loads" element={<MainLayout><CardLoads /></MainLayout>} />
            <Route path="/load-funds-from/card-loads/confirm-load" element={<MainLayout><ConfirmLoad /></MainLayout>} />
            <Route path="/cancel-pending-load" element={<MainLayout><CancelPendingLoad /></MainLayout>} />
            
            {/* Design System */}
            <Route path="/design-system" element={<DesignSystem />} />
            
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
