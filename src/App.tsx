import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import AudioPlayer from "./components/AudioPlayer";
import AssetPreloader from "./components/AssetPreloader";
import backgroundMusic from "./assets/audio/background-music.mp3";

const Index = lazy(() => import("./pages/Index"));
const Background = lazy(() => import("./pages/Background"));
const Codebase = lazy(() => import("./pages/Codebase"));
const Community = lazy(() => import("./pages/Community"));
const Opennetics = lazy(() => import("./pages/Opennetics"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Journal = lazy(() => import("./pages/Journal"));
const JournalEntry1 = lazy(() => import("./pages/JournalEntry1"));
const JournalEntry2 = lazy(() => import("./pages/JournalEntry2"));
const Dotfiles = lazy(() => import("./pages/Dotfiles"));
const PGP = lazy(() => import("./pages/PGP"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <AudioPlayer src={backgroundMusic} />
    <AssetPreloader />
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/background" element={<Background />} />
          <Route path="/codebase" element={<Codebase />} />
          <Route path="/community" element={<Community />} />
          <Route path="/opennetics" element={<Opennetics />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/journal" element={<Journal />} />
          <Route
            path="/writing/withdrawing-from-grad-school"
            element={<JournalEntry1 />}
          />
          <Route
            path="/writing/automation-and-purpose"
            element={<JournalEntry2 />}
          />
          <Route path="/dotfiles" element={<Dotfiles />} />
          <Route path="/pgp" element={<PGP />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
