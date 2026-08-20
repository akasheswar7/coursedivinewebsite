import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Building2,
  TrendingUp,
  Code,
  Brain,
  Cloud,
  Shield,
  Terminal,
  Layout,
  PhoneCall,
  Send,
  MessageCircle,
  ArrowUp,
  X,
  Bot,
  Laptop,
  Banknote,
  BookOpen,
  BadgePercent,
  Star,
  Clock
} from 'lucide-react';
import api, { fallbackStore } from '../services/api';
import { useNotification } from '../context/NotificationContext';

const AnimatedCounter = ({ target, duration = 2200, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = parseFloat(target);
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentVal = easeProgress * end;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [target, duration]);

  const formatted = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString('en-IN');

  return <span>{formatted}{suffix}</span>;
};

const Home = () => {
  const [courses, setCourses] = useState(fallbackStore.courses);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { showToast } = useNotification();

  // Interactive Chat Widget state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: 'Hi there! 👋 Welcome to Course Divine. Ask us anything 🎉' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    api.get('/courses?limit=6')
      .then((res) => {
        if (res.data?.success && res.data.data.length > 0) {
          setCourses(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { from: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      let botReply = "Thank you for reaching out! You can explore our courses or call our admissions team directly at +91-9100348679.";
      const lower = userMsg.toLowerCase();
      if (lower.includes('internship')) {
        botReply = "We offer 1 to 6 month remote industry internship tracks with live client projects and stipends. Apply through the Internship tab!";
      } else if (lower.includes('course') || lower.includes('fee')) {
        botReply = "Our masterclasses start at ₹2,199 with 100% money-back guarantee, certificates, and placement prep. Check the Learning Lounge!";
      }
      setChatMessages((prev) => [...prev, { from: 'bot', text: botReply }]);
    }, 600);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast('🎉 Thank you for subscribing to Course Divine Tech Updates!', 'success');
    setNewsletterEmail('');
  };

  return (
    <div className="space-y-16 pb-20 relative bg-white">
      
      {/* 1. HERO SECTION WITH CLIENT BACKDROP & CALL BUTTON */}
      <section className="relative overflow-hidden min-h-[560px] lg:min-h-[620px] flex items-center bg-slate-100 border-b border-slate-200">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale-[25%] opacity-90 scale-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent lg:w-3/5 pointer-events-none" />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[0.5px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16">
          <div className="max-w-2xl space-y-6">
            
            <div className="tracking-[0.25em] font-extrabold text-xs sm:text-sm text-slate-800 uppercase">
              IT'S YOUR TIME
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F62FE] leading-none">
                ADVANCE YOUR SKILLS
              </h1>
              <div className="w-48 h-1 bg-slate-700 rounded-full" />
            </div>

            <p className="text-sm sm:text-base lg:text-lg font-medium text-slate-800 leading-relaxed max-w-xl">
              Unlock Your Future: Explore Expert-Led Online Training & Internships in IT, Design, and Beyond - Start Your Journey Today!
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="tel:+919100348679"
                className="group px-7 py-4 rounded-2xl bg-[#2D9CDB] hover:bg-[#2284bc] text-white shadow-xl shadow-[#2D9CDB]/30 transition-all duration-200 flex items-center gap-3.5 transform hover:-translate-y-0.5"
              >
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-extrabold tracking-widest uppercase text-white/90">
                    CALL US TODAY
                  </div>
                  <div className="text-lg font-black tracking-tight text-white font-mono">
                    +91-9100348679
                  </div>
                </div>
              </a>

              <Link
                to="/courses"
                className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-brand-700 font-bold text-sm border-2 border-brand-200 shadow-sm transition flex items-center gap-2"
              >
                Explore Courses <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. JOIN US BANNER WITH 6 CORAL/RED STAT CARDS (From Screenshot 1) */}
      <section className="relative overflow-hidden">
        {/* Background Image of Students */}
        <div 
          className="relative min-h-[360px] sm:min-h-[420px] bg-cover bg-center flex flex-col justify-between"
          style={{
            backgroundImage: `linear-gradient(rgba(120, 40, 80, 0.45), rgba(120, 40, 80, 0.55)), url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80')`
          }}
        >
          {/* Centered Join Us Header */}
          <div className="pt-12 text-center text-white space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Join Us</h2>
            <div className="w-72 sm:w-96 h-0.5 bg-white/80 mx-auto" />
          </div>

          {/* Bottom 6 Coral Red Stat Cards Bar with Running Numbers */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
            <div className="bg-[#FF4D4D] text-white p-5 text-center flex flex-col justify-center items-center border-r border-b lg:border-b-0 border-white/20">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">
                <AnimatedCounter target={10000} suffix="+" duration={2400} />
              </div>
              <div className="text-xs font-semibold mt-1">Live Sessions</div>
            </div>

            <div className="bg-[#FF4D4D] text-white p-5 text-center flex flex-col justify-center items-center border-r border-b lg:border-b-0 border-white/20">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">
                <AnimatedCounter target={1000} suffix="+" duration={2000} />
              </div>
              <div className="text-xs font-semibold mt-1">Students Trained</div>
            </div>

            <div className="bg-[#FF4D4D] text-white p-5 text-center flex flex-col justify-center items-center border-r border-b lg:border-b-0 border-white/20">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">
                <AnimatedCounter target={300} suffix="+" duration={1800} />
              </div>
              <div className="text-xs font-semibold mt-1">Experienced Tutors</div>
            </div>

            <div className="bg-[#FF4D4D] text-white p-5 text-center flex flex-col justify-center items-center border-r border-b lg:border-b-0 border-white/20">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">
                <AnimatedCounter target={80} suffix="%" duration={1600} />
              </div>
              <div className="text-xs font-semibold mt-1">Career benefit</div>
            </div>

            <div className="bg-[#FF4D4D] text-white p-5 text-center flex flex-col justify-center items-center border-r border-b lg:border-b-0 border-white/20">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">
                <AnimatedCounter target={100} suffix="%" duration={1800} />
              </div>
              <div className="text-[11px] font-semibold mt-1 leading-tight">Credit based Certification</div>
            </div>

            <div className="bg-[#FF4D4D] text-white p-5 text-center flex flex-col justify-center items-center">
              <div className="text-sm font-bold uppercase tracking-wider">Review Rating</div>
              <div className="text-2xl font-extrabold mt-0.5 flex items-center gap-1 font-mono tracking-tight">
                <AnimatedCounter target={4.9} decimals={1} duration={2000} />
                <Star className="w-4 h-4 fill-white text-white inline" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INVEST IN YOUR CAREER WITH COURSE DIVINE (From Screenshot 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
            Invest in your career with Course Divine
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto">
            Get access to videos in over 90% of course, Specializations, Online Internship and Professional Certificates taught by top instructors from leading Universities and companies.
          </p>
        </div>

        {/* 4 Turquoise Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          
          {/* Pillar 1 */}
          <div className="space-y-3 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#E0F7FA] text-[#00A896] flex items-center justify-center">
              <Laptop className="w-9 h-9 stroke-[1.75]" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Online Learning</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
              Learn course of your choice online from anywhere along with remote internship for every course.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="space-y-3 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#E0F7FA] text-[#00A896] flex items-center justify-center">
              <Banknote className="w-9 h-9 stroke-[1.75]" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Save Money</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
              Spend less money on your learning if you plan to take multiple courses this year.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="space-y-3 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#E0F7FA] text-[#00A896] flex items-center justify-center">
              <BookOpen className="w-9 h-9 stroke-[1.75]" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Flexible Learning</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
              Learn at your own pace, move between multiple courses, or switch to a different course.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="space-y-3 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#E0F7FA] text-[#00A896] flex items-center justify-center">
              <BadgePercent className="w-9 h-9 stroke-[1.75]" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Unlimited Certificates</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
              Earn a certificate for every learning program that you complete after your trial ends at no additional cost.
            </p>
          </div>
        </div>
      </section>

      {/* 4. TOP COURSES PICKED FOR YOU (Blue Ribbon Banner & Clean Course Cards) */}
      <section className="space-y-8">
        {/* Blue Ribbon Header */}
        <div className="bg-[#0052CC] text-white py-4 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide">
            Top Courses Picked For You
          </h2>
        </div>

        {/* Clean Course Cards (Without review / add-to-cart clutter) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 6).map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden group"
              >
                <Link to={`/courses/${course.slug}`} className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 text-[#0052CC] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                    {course.category}
                  </div>
                </Link>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <Clock className="w-3.5 h-3.5 text-[#0052CC]" />
                      <span>{course.duration}</span>
                      <span>•</span>
                      <span>{course.level || 'All Levels'}</span>
                    </div>

                    <Link to={`/courses/${course.slug}`}>
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-[#0052CC] transition line-clamp-2">
                        {course.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {course.subtitle || course.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-slate-900">
                        ${(course.discountPrice || course.price).toLocaleString('en-US')}.00
                      </span>
                      {course.discountPrice && course.price > course.discountPrice && (
                        <span className="text-xs text-slate-400 line-through ml-2">
                          ${course.price.toLocaleString('en-US')}.00
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/courses/${course.slug}`}
                      className="px-4 py-2 rounded-xl bg-[#0052CC] hover:bg-blue-700 text-white font-bold text-xs transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition"
            >
              Explore All Courses in Learning Lounge <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. OUR TRUSTED BRANDS (From Screenshot 3) */}
      <section className="space-y-8">
        <div className="bg-[#0052CC] text-white py-3.5 text-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
            Our Trusted Brands
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-items-center py-6">
            {/* Trustpilot Brand */}
            <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition duration-300">
              <div className="w-10 h-10 bg-[#00B67A] rounded-lg flex items-center justify-center text-white">
                <Star className="w-6 h-6 fill-white text-white" />
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tight">Trustpilot</span>
            </div>

            {/* Google Brand */}
            <div className="grayscale hover:grayscale-0 transition duration-300">
              <span className="text-4xl font-bold tracking-tight font-sans">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </span>
            </div>

            {/* Glassdoor Brand */}
            <div className="flex items-center gap-2.5 grayscale hover:grayscale-0 transition duration-300">
              <div className="w-8 h-8 rounded-lg bg-[#0CAA41] flex items-center justify-center text-white font-black text-lg">
                [ ]
              </div>
              <span className="text-2xl font-bold text-slate-900">glassdoor</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AFFILIATIONS (From Screenshot 3) */}
      <section className="space-y-8">
        <div className="bg-[#0052CC] text-white py-3.5 text-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
            Affiliations
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-items-center py-6">
            
            {/* 1. Andhra Pradesh State Council of Higher Education (APSCHE) */}
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 shadow-sm bg-white">
              <div className="w-14 h-14 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-800 font-bold text-xs p-1 text-center shrink-0">
                🏛️ APSCHE
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-slate-900">Andhra Pradesh State Council</div>
                <div className="text-slate-500 text-[10px]">Of Higher Education (APSCHE)</div>
              </div>
            </div>

            {/* 2. IAF Accreditation */}
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 shadow-sm bg-white">
              <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800 font-bold text-xs p-1 text-center shrink-0">
                🌐 IAF
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-slate-900">International Accreditation</div>
                <div className="text-slate-500 text-[10px]">Forum (IAF Recognized)</div>
              </div>
            </div>

            {/* 3. ISO 9001:2015 */}
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 shadow-sm bg-white">
              <div className="w-14 h-14 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs p-1 text-center shrink-0">
                ISO
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-slate-900">CERTIFIED ISO 9001:2015</div>
                <div className="text-slate-500 text-[10px]">Quality Management Company</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. SUBSCRIBE TO OUR NEWSLETTER (From Screenshot 4) */}
      <section className="space-y-0">
        <div className="bg-[#0052CC] text-white py-4 text-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
            Subscribe To Our News Letter
          </h2>
        </div>

        {/* Vintage Stacked Paper/Book Background with Olive Container */}
        <div 
          className="relative min-h-[300px] bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=2000&q=80')`
          }}
        >
          <div className="max-w-4xl w-full bg-[#5D7A5D]/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 text-white shadow-2xl space-y-6">
            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              Our newsletter keeps you up to date with the latest news, updates, and exclusive offers delivered straight to your inbox. By signing up, you'll get early access to special promotions, insider tips, and stay informed about everything that's happening in our world. It's the best way to stay connected and never miss out on exciting news! Simply enter your email, and you're all set. Plus, you can unsubscribe at any time if you change your mind.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-5 py-3.5 rounded-xl bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-[#0052CC] hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 shrink-0"
              >
                <Send className="w-4 h-4" /> Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FLOATING ACTION 1: GREEN WHATSAPP BUTTON (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <a
          href="https://wa.me/919100348679?text=Hello%20Course%20Divine,%20I%20am%20interested%20in%20courses%20and%20internships!"
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 relative group"
          title="Chat with us on WhatsApp"
          aria-label="WhatsApp Chat"
        >
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-200 rounded-full animate-ping" />
          <MessageCircle className="w-7 h-7 fill-white" />
        </a>
      </div>

      {/* FLOATING ACTION 2: LIVE CHAT ASSISTANT WIDGET (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {chatOpen && (
          <div className="bg-white w-80 sm:w-96 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="bg-[#2B39D6] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm flex items-center gap-1">
                    Hi there <span className="animate-wiggle">👋</span>
                  </h4>
                  <p className="text-[11px] text-white/80">Welcome to our website. Ask us anything 🎉</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 h-64 overflow-y-auto space-y-3 bg-slate-50 text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.from === 'user'
                        ? 'bg-[#2B39D6] text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-2 bg-brand-50 border-t border-brand-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-600 font-semibold">Immediate Support:</span>
              <a href="tel:+919100348679" className="text-brand-700 font-bold hover:underline">
                +91-9100348679
              </a>
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-[#2B39D6] hover:bg-blue-700 text-white transition flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        <div className="flex items-center gap-2">
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="w-11 h-11 rounded-xl bg-[#FF4D4D] hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition"
              title="Scroll to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="w-14 h-14 rounded-full bg-[#2B39D6] hover:bg-blue-700 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-200"
            aria-label="Toggle Live Chat"
          >
            {chatOpen ? <X className="w-6 h-6" /> : <Bot className="w-7 h-7" />}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Home;
