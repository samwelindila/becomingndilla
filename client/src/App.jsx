
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Ventures from "./pages/Ventures";
import Journey from "./pages/Journey";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Marketplace from "./pages/Marketplace";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AdminResource from "./pages/admin/AdminResource";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/ventures" element={<Ventures />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />

        {/* Fallback Route */}
        <Route path="*" element={<Home />} />
      </Route>

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Dashboard */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path=":key" element={<AdminResource />} />
      </Route>
    </Routes>
  );
}
