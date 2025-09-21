import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/NotFound";
import Resources from "@/pages/Resources";

// NEW pages
import Insights from "@/pages/Insights";
import Tracking from "@/pages/Tracking";
import Circle from "@/pages/Circle";
import Community from "@/pages/Community";
import Goals from "@/pages/Goals";
import Resets from "@/pages/Resets";
import Quests from "@/pages/Quests";
import Privacy from "@/pages/Privacy";

// ✅ import from the single canonical location
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import "@/App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/circle" element={<Circle />} />
            <Route path="/community" element={<Community />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/resets" element={<Resets />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
