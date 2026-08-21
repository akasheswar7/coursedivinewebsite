import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Shield,
  Award,
  ArrowRight
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import logoImg from '../assets/logo.png';
import SocialLinks from './SocialLinks';


const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useNotification();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    if (typeof window !== 'undefined') {
      const payload = new FormData();
      payload.append('Subscriber Email', email);
      payload.append('Source', 'Footer Tech Updates & Placement Alerts');
      payload.append('_subject', `New Newsletter Subscription: ${email}`);
      payload.append('_captcha', 'false');

      fetch('https://formsubmit.co/ajax/coursedivine@gmail.com', {
        method: 'POST',
        body: payload
      }).catch(() => null);
    }

    setSubscribed(true);
    showToast('🎉 Thank you! Your subscription has been sent to coursedivine@gmail.com.', 'success');
    setEmail('');
  };


  return (
    <footer className="bg-[#071F3F] text-slate-300 pt-16 pb-8 border-t border-brand-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Card */}
        <div className="bg-gradient-to-r from-brand-900 to-brand-800 rounded-3xl p-8 sm:p-10 mb-16 border border-brand-700/50 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <Award className="w-3.5 h-3.5 text-brand-300" /> Stay Ahead in Tech
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Unlock Exclusive Tech Career Insights & Course Discounts
              </h3>
              <p className="text-brand-100/80 text-sm mt-2 max-w-xl">
                Join over 25,000+ ambitious developers receiving curated roadmaps, hiring alerts, and early-bird scholarship access weekly.
              </p>
            </div>
            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="px-4 py-3.5 rounded-xl bg-white/10 text-white placeholder-brand-200/60 border border-brand-400/30 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm w-full backdrop-blur-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-brand-500/30 shrink-0"
                >
                  Subscribe <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-900/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src={logoImg}
                alt="Course Divine Logo"
                className="h-12 sm:h-14 w-auto object-contain rounded-lg shadow-md"
              />
            </Link>

            <p className="text-slate-300/80 text-sm leading-relaxed max-w-sm">
              Course Divine is a premier technology training institute empowering learners and professionals with industry-led masterclasses, live capstone projects, guaranteed internship opportunities, and verified placement pathways.
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold text-sky-400 block mb-2 uppercase tracking-wider">
                Follow Us On Social Media
              </span>
              <SocialLinks size="md" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses" className="hover:text-brand-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-500" /> Learning Lounge
                </Link>
              </li>
              <li>
                <Link to="/internships" className="hover:text-brand-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-500" /> Internship Tracks
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-brand-400 transition flex items-center gap-1.5 font-bold text-amber-300">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" /> Student Testimonials
                </Link>
              </li>
              <li>
                <Link to="/placements" className="hover:text-brand-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-500" /> Placement Records
                </Link>
              </li>

              <li>
                <Link to="/get-certified" className="hover:text-brand-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-500" /> Get Certified
                </Link>
              </li>
              <li>
                <Link to="/verify-certificate" className="hover:text-brand-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-500" /> Verify Certificate
                </Link>
              </li>
              <li>
                <Link to="/refer-and-earn" className="hover:text-brand-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-500" /> Refer & Earn ₹500
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Programmes */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Program Tracks</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses?category=Full+Stack+Development" className="hover:text-brand-400 transition">
                  Full Stack Web Dev
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Data+Science+%26+AI" className="hover:text-brand-400 transition">
                  Data Science & AI
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Cloud+%26+DevOps" className="hover:text-brand-400 transition">
                  Cloud & DevOps (AWS)
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Cyber+Security" className="hover:text-brand-400 transition">
                  Cyber Security Defense
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Programming+Languages" className="hover:text-brand-400 transition">
                  Java 21 Microservices
                </Link>
              </li>
              <li>
                <Link to="/courses?category=UI%2FUX+Design" className="hover:text-brand-400 transition">
                  UI/UX Product Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-1" />
                <span className="text-xs text-slate-300 leading-relaxed">
                  Office No-3/23, Petrol Bunk, Land Mark Railway Station, near HP, near Simhachalam, Nad Junction, Gopalapatnam, Simhachalam, Visakhapatnam, Andhra Pradesh 530027
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:+919100348679" className="hover:text-brand-400 transition text-xs">+91 91003 48679</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="mailto:coursedivine@gmail.com" className="hover:text-brand-400 transition text-xs">coursedivine@gmail.com</a>
              </li>
              <li className="pt-1">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-500/20 text-brand-300 border border-brand-500/30 hover:bg-brand-500 hover:text-white transition"
                >
                  <Mail className="w-3.5 h-3.5" /> Direct Support Desk
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Course Divine. All Rights Reserved. Built with React & Node.js.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-brand-400 transition">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-brand-400 transition">Terms & Conditions</Link>
            <Link to="/verify-certificate" className="hover:text-brand-400 transition">Credential Verification</Link>
            <Link to="/careers" className="hover:text-brand-400 transition">Careers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
