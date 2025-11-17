import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Codebase from "./pages/Codebase";
import Community from "./pages/Community";
import Dotfiles from "./pages/Dotfiles";
import PGP from "./pages/PGP";
import NotFound from "./pages/NotFound";

import Journal from "./pages/Journal";
import JournalDropout from "./pages/posts/dropout";
import JournalMotivation from "./pages/posts/motivation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/codebase" element={<Codebase />} />
          <Route path="/community" element={<Community />} />

          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/dropout" element={<JournalDropout />} />
          <Route path="/journal/motivation" element={<JournalMotivation />} />

          <Route path="/dotfiles" element={<Dotfiles />} />
          <Route path="/pgp" element={<PGP />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
