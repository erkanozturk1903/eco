import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/admin/Login";
import AdminSignup from "./pages/admin/Signup";
import Forms from "./pages/admin/Forms";
import Companies from "./pages/admin/Companies";
import Projects from "./pages/admin/Projects";
import ServicesManagement from "./pages/admin/ServicesManagement";
import Stats from "./pages/admin/Stats";
import Team from "./pages/admin/Team";
import Blog from "./pages/admin/Blog";
import Settings from "./pages/admin/Settings";
import Users from "./pages/admin/Users";
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
          <Route path="/hizmetler" element={<Services />} />
          <Route path="/hakkimizda" element={<About />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/kaynaklar" element={<Resources />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/forms" element={<Forms />} />
          <Route path="/admin/companies" element={<Companies />} />
          <Route path="/admin/projects" element={<Projects />} />
          <Route path="/admin/services" element={<ServicesManagement />} />
          <Route path="/admin/stats" element={<Stats />} />
          <Route path="/admin/team" element={<Team />} />
          <Route path="/admin/blog" element={<Blog />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/users" element={<Users />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
