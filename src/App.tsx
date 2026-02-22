import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimalsProvider } from "@/context/AnimalsContext";
import AppLayout from "@/components/AppLayout";
import DashboardPage from "@/pages/DashboardPage";
import AnimalPage from "@/pages/AnimalPage";
import AddTagPage from "@/pages/AddTagPage";
import SettingsPage from "@/pages/SettingsPage";
import AiAssistantPage from "@/pages/AiAssistantPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <AnimalsProvider>
          <AppLayout>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/animal/:id" element={<AnimalPage />} />
              <Route path="/add-tag" element={<AddTagPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/ai-assistant" element={<AiAssistantPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </AnimalsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
