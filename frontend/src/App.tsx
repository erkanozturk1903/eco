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
import ArticleDetail from "./pages/articles/ArticleDetail";
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
import Content from "./pages/admin/Content";
import AboutAdmin from "./pages/admin/About";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/hizmetler" element={<Services />} />
          <Route path="/hakkimizda" element={<About />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/kaynaklar" element={<Resources />} />
          <Route path="/kaynaklar/:slug" element={<ArticleDetail />} />

          {/* Auth Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />

          {/* Protected Admin Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/forms" element={<ProtectedRoute><Forms /></ProtectedRoute>} />
          <Route path="/admin/companies" element={<ProtectedRoute><Companies /></ProtectedRoute>} />
          <Route path="/admin/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute><ServicesManagement /></ProtectedRoute>} />
          <Route path="/admin/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
          <Route path="/admin/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
          <Route path="/admin/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="/admin/content" element={<ProtectedRoute><Content /></ProtectedRoute>} />
          <Route path="/admin/about" element={<ProtectedRoute><AboutAdmin /></ProtectedRoute>} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
