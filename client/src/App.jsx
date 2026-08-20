import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Internships from './pages/Internships';
import Placements from './pages/Placements';
import GetCertified from './pages/GetCertified';
import VerifyCertificate from './pages/VerifyCertificate';
import ReferAndEarn from './pages/ReferAndEarn';
import OurProgramme from './pages/OurProgramme';
import OurTeam from './pages/OurTeam';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminCourses from './pages/AdminCourses';
import AdminUsers from './pages/AdminUsers';
import AdminInternships from './pages/AdminInternships';
import AdminEnquiries from './pages/AdminEnquiries';
import AdminBlogs from './pages/AdminBlogs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Public Pages */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:slug" element={<CourseDetails />} />
                  <Route path="/internships" element={<Internships />} />
                  <Route path="/placements" element={<Placements />} />
                  <Route path="/get-certified" element={<GetCertified />} />
                  <Route path="/verify-certificate" element={<VerifyCertificate />} />
                  <Route path="/refer-and-earn" element={<ReferAndEarn />} />
                  <Route path="/our-programme" element={<OurProgramme />} />
                  <Route path="/our-team" element={<OurTeam />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-and-conditions" element={<TermsConditions />} />

                  {/* Student Dashboard */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/*" element={<Dashboard />} />

                  {/* Admin Portal */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/courses" element={<AdminCourses />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/internships" element={<AdminInternships />} />
                  <Route path="/admin/enquiries" element={<AdminEnquiries />} />
                  <Route path="/admin/blogs" element={<AdminBlogs />} />

                  {/* 404 Not Found */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
