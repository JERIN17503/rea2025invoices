import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard2022 from "./pages/Dashboard2022";
import Dashboard2023 from "./pages/Dashboard2023";
import Dashboard2024 from "./pages/Dashboard2024";
import YoYComparison from "./pages/YoYComparison";
import RemarketingActions from "./pages/RemarketingActions";
import RemarketingActions2024 from "./pages/RemarketingActions2024";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/2022" element={<Dashboard2022 />} />
          <Route path="/2023" element={<Dashboard2023 />} />
          <Route path="/2024" element={<Dashboard2024 />} />
          <Route path="/yoy" element={<YoYComparison />} />
          <Route path="/remarketing" element={<RemarketingActions />} />
          <Route path="/remarketing/2024" element={<RemarketingActions2024 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
