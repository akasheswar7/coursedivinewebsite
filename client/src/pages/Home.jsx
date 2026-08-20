import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Laptop,
  Briefcase,
  Award,
  Rocket,
  CheckCircle2,
  Star,
  ArrowRight,
  ArrowUp,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Send,
  ShieldCheck,
  Compass,
  Terminal,
  Cpu,
  Target,
  UserCheck,
  Layers,
  PlayCircle,
  Play,
  BarChart3,
  Code2,
  Users,
  Bot,
  MessageCircle,
  X,
  Check,
  HelpCircle,
  Calendar,
  Clock,
  Zap,
  TrendingUp,
  Building2,
  CreditCard,
  Lock,
  ExternalLink,
  Quote
} from 'lucide-react';
import api, { fallbackStore } from '../services/api';
import { useNotification } from '../context/NotificationContext';
import EnrollmentModal from '../components/EnrollmentModal';
import VideoModal from '../components/VideoModal';

const AnimatedCounter = ({ target, duration = 2200, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = parseFloat(target);
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
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
  const { showToast } = useNotification();

  const [enrollingCourse, setEnrollingCourse] = useState(null);
  const [selectedVideoTestimonial, setSelectedVideoTestimonial] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: 'Hi there! 👋 Welcome to Course Divine. Ask us anything 🎉' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const [finderOpen, setFinderOpen] = useState(false);
  const [finderStep, setFinderStep] = useState(1);
  const [finderAnswers, setFinderAnswers] = useState({
    background: 'Student',
    domain: 'Data Science & AI',
    goal: 'Get a Job'
  });

  const [selectedCourseTab, setSelectedCourseTab] = useState('All');
  const [pathRole, setPathRole] = useState('Student');
  const [pathGoal, setPathGoal] = useState('Get a Job');
  const [activeCareerTrack, setActiveCareerTrack] = useState('data-ai');
  const [projectCategory, setProjectCategory] = useState('All');
  const [lmsTab, setLmsTab] = useState('dashboard');
  const [testimonialTab, setTestimonialTab] = useState('all');
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
    api.get('/courses?limit=12')
      .then((res) => {
        if (res.data?.success && res.data.data.length > 0) {
          setCourses(res.data.data);
        }
      })
      .catch(() => {
        setCourses(fallbackStore.courses);
      });
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { from: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      let reply = "Thanks for contacting Course Divine! Our career counselors will assist you immediately. You can also call us directly at +91-9100348679.";
      const lower = userMsg.toLowerCase();
      if (lower.includes('course') || lower.includes('fee') || lower.includes('price')) {
        reply = "We offer certified courses in Data Science, SolidWorks, ANSYS, Python, Digital Marketing & UI/UX with guaranteed internship opportunities. Check out our Learning Lounge!";
      } else if (lower.includes('internship')) {
        reply = "Every course includes an assured, verified corporate internship with live capstone projects and mentor feedback!";
      }
      setChatMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    }, 700);
  };

  const topCourseCategories = [
    { label: 'All Top Courses', value: 'All' },
    { label: 'Data Science', value: 'Data Science & AI' },
    { label: 'Digital Marketing', value: 'Digital Marketing' },
    { label: 'SolidWorks', value: 'SolidWorks' },
    { label: 'ANSYS', value: 'ANSYS' },
    { label: 'Python', value: 'Python' },
    { label: 'UI/UX Design', value: 'UI/UX' }
  ];

  const filteredTopCourses = courses.filter((c) => {
    if (selectedCourseTab === 'All') return true;
    if (selectedCourseTab === 'SolidWorks') return c.title.toLowerCase().includes('solidworks');
    if (selectedCourseTab === 'ANSYS') return c.title.toLowerCase().includes('ansys');
    if (selectedCourseTab === 'Python') return c.title.toLowerCase().includes('python');
    if (selectedCourseTab === 'Digital Marketing') return c.title.toLowerCase().includes('marketing');
    if (selectedCourseTab === 'UI/UX') return c.title.toLowerCase().includes('ui/ux') || c.title.toLowerCase().includes('design');
    if (selectedCourseTab === 'Data Science & AI') return c.category.includes('Data Science') || c.title.toLowerCase().includes('data science') || c.title.toLowerCase().includes('machine learning');
    return c.category.includes(selectedCourseTab);
  });

  const pathProfiles = {
    'Student_Get a Job': {
      track: 'Accelerated Placement Pathway',
      coreCourse: 'Full Stack Python & AI or Data Science Masterclass',
      projects: '2 Production-grade Web/AI Capstones with CI/CD',
      internship: '3-Month Guaranteed Industry Internship with Live Mentor Review',
      career: 'Junior Software Engineer / Data Analyst ($75,000 / ₹6-10 LPA)',
      tag: '🔥 Highest Placement Demand'
    },
    'Student_Build Skills': {
      track: 'Hands-on Technology Foundation',
      coreCourse: 'Core Python, SolidWorks 3D CAD & Modern UI/UX',
      projects: 'Interactive Portfolio Projects & GitHub Lab Repositories',
      internship: 'Remote Research & Development Lab Apprenticeship',
      career: 'College Project Excellence & High-Stakes Hackathon Finalist',
      tag: '⚡ Fast-Track Skill Booster'
    },
    'Student_Internship': {
      track: 'Industry Internship Accelerator',
      coreCourse: 'Hands-on Domain Mastery (ANSYS / Python / Digital Marketing)',
      projects: 'Real Client Briefs & Structured Code Submissions',
      internship: 'Guaranteed 4 to 8-Week Verified Corporate Internship',
      career: 'Verified Experience Letter, APSCHE Credits & Recommendation',
      tag: '💼 100% Internship Guarantee'
    },
    'Student_Career Change': {
      track: 'Zero-to-Hero Tech Immersion',
      coreCourse: 'Data Science & AI or Cloud DevOps Certification',
      projects: 'End-to-End Enterprise Architecture Deployments',
      internship: 'Corporate Project Shadowing with Senior Engineers',
      career: 'Smooth Transition into In-Demand Tech Roles',
      tag: '🚀 Complete Career Pivot'
    },
    'Student_Build Portfolio': {
      track: 'Showcase-First Creator Track',
      coreCourse: 'UI/UX Design Masterclass & Product Strategy',
      projects: '3 Case Studies (Mobile App, SaaS Dashboard, Design System)',
      internship: 'Design Studio Live Project with Real User Testing',
      career: 'Stunning Behance/Dribbble Portfolio Ready for Interviews',
      tag: '🎨 Portfolio Ready'
    },
    default: {
      track: 'Custom Professional Career Track',
      coreCourse: 'Industry-Standard Masterclass in Selected Domain',
      projects: 'Production-ready Capstones with Real-time Data',
      internship: 'Corporate Internship with Verified Experience Credential',
      career: 'Senior Specialist / Fast-track Career Growth',
      tag: '⭐ Recommended Pathway'
    }
  };

  const currentPath = pathProfiles[`${pathRole}_${pathGoal}`] || pathProfiles.default;

  const careerTracks = [
    {
      id: 'data-ai',
      name: 'Data & AI',
      badge: 'Highest Starting Salary',
      headline: 'Master the full modern data stack from exploratory analytics to generative AI.',
      steps: [
        { label: '01. Fundamentals', desc: 'Python & Advanced SQL' },
        { label: '02. BI & Analytics', desc: 'Power BI & Tableau' },
        { label: '03. Advanced Modeling', desc: 'Machine Learning & NLP' },
        { label: '04. Real Capstone', desc: 'Predictive Churn & LLM Apps' },
        { label: '05. Internship', desc: 'Corporate Data Science Internship' }
      ],
      targetRole: 'Data Scientist / AI Engineer',
      salary: '₹8 - 18 LPA',
      skills: ['Python', 'SQL', 'Pandas', 'Power BI', 'Scikit-Learn', 'PyTorch', 'Prompt Engineering']
    },
    {
      id: 'eng-design',
      name: 'Engineering & Design',
      badge: 'Core Engineering',
      headline: 'Transform mechanical concepts into industrial-grade parametric models and simulations.',
      steps: [
        { label: '01. 2D Drafting', desc: 'AutoCAD Drafting & GD&T' },
        { label: '02. 3D Modeling', desc: 'SolidWorks Part & Sheet Metal' },
        { label: '03. Simulation', desc: 'ANSYS FEA & CFD Fluent' },
        { label: '04. Prototyping', desc: 'Industrial Drone & Chassis' },
        { label: '05. Internship', desc: 'Automotive/Aerospace Internship' }
      ],
      targetRole: 'CAD Engineer / CAE Analyst',
      salary: '₹6 - 14 LPA',
      skills: ['SolidWorks', 'ANSYS Workbench', 'AutoCAD', 'FEA', 'CFD', 'CSWA/CSWP', 'Sheet Metal']
    },
    {
      id: 'digital-marketing',
      name: 'Digital Marketing',
      badge: 'Fastest Career Entry',
      headline: 'Drive profitable customer acquisition and scaling across all digital channels.',
      steps: [
        { label: '01. Discovery', desc: 'SEO Mastery & Keyword Strategy' },
        { label: '02. Paid Ads', desc: 'Google Ads & Search Marketing' },
        { label: '03. Social Ads', desc: 'Meta & Instagram Paid Funnels' },
        { label: '04. Analytics', desc: 'GA4, Looker & Conversion Rate' },
        { label: '05. Live Portfolio', desc: 'Manage Real $ Ad Budgets' }
      ],
      targetRole: 'Growth Marketing Lead',
      salary: '₹5 - 12 LPA',
      skills: ['SEO', 'Google Ads', 'Meta Ads', 'GA4 Analytics', 'Copywriting', 'Conversion Optimization']
    },
    {
      id: 'fullstack-cloud',
      name: 'Full Stack & Cloud',
      badge: 'Maximum Remote Jobs',
      headline: 'Build robust, cloud-native web applications with scalable microservices.',
      steps: [
        { label: '01. Frontend', desc: 'Modern React, TypeScript & Tailwind' },
        { label: '02. Backend', desc: 'Node.js, Express & PostgreSQL' },
        { label: '03. Cloud & DevOps', desc: 'AWS, Docker & CI/CD Pipelines' },
        { label: '04. Enterprise App', desc: 'Full Stack SaaS with Auth & Stripe' },
        { label: '05. Internship', desc: 'Software Engineering Internship' }
      ],
      targetRole: 'Full Stack Software Engineer',
      salary: '₹7 - 16 LPA',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'REST APIs', 'Git/GitHub']
    }
  ];

  const activeTrackData = careerTracks.find((t) => t.id === activeCareerTrack) || careerTracks[0];

  const showcaseProjects = [
    {
      id: 'p1',
      title: '3D Autonomous Drone Frame & Aerodynamic Chassis',
      domain: 'Engineering & Design',
      category: 'SolidWorks',
      image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
      description: 'Parametric CAD modeling and assembly of a high-speed surveillance drone with optimized strength-to-weight ratio and generative weight reduction.',
      tools: ['SolidWorks', 'CSWA CAD', 'Sheet Metal', 'Photoview 360', 'Generative Design'],
      courseLink: '/courses/solidworks-3d-cad-mechanical-design-certified-course',
      courseName: 'SolidWorks 3D CAD Certified Course',
      metrics: '35% Weight Reduction, CSWA Certified Project'
    },
    {
      id: 'p2',
      title: 'Commercial Aircraft Wing Structural & Aerodynamic Stress Simulation',
      domain: 'Engineering & Design',
      category: 'ANSYS',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      description: 'Finite Element Analysis (FEA) and CFD Fluent boundary simulation assessing von Mises stresses, deformation, and turbulence across varying altitudes.',
      tools: ['ANSYS Workbench', 'Static Structural', 'Fluent CFD', 'Mesh Quality Analyzer'],
      courseLink: '/courses/ansys-fea-cfd-simulation-engineering-certified-course',
      courseName: 'ANSYS FEA & CFD Certified Course',
      metrics: 'Validated Safety Factor 2.4, 0.02mm Deflection Limit'
    },
    {
      id: 'p3',
      title: 'Real-Time Enterprise Churn Intelligence & Dashboard',
      domain: 'Data & AI',
      category: 'Data Science',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      description: 'End-to-end predictive machine learning pipeline identifying at-risk subscribers and visualizing retention levers in an interactive dashboard.',
      tools: ['Python', 'Pandas', 'Scikit-Learn', 'Power BI', 'Streamlit', 'SQL'],
      courseLink: '/courses/data-science-ai-masterclass-certified-course',
      courseName: 'Data Science & AI Masterclass',
      metrics: '94.2% ROC-AUC Accuracy, Real-time API Integration'
    },
    {
      id: 'p4',
      title: '12x ROAS Omnichannel Growth & Conversion Funnel',
      domain: 'Digital Marketing',
      category: 'Digital Marketing',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      description: 'Complete performance marketing campaign with high-converting landing page copywriting, Google Search intent ads, and retargeting workflows.',
      tools: ['Google Ads', 'Meta Ads Manager', 'GA4 Analytics', 'Looker Studio', 'SEMrush'],
      courseLink: '/courses/digital-marketing-growth-mastery-certified-course',
      courseName: 'Digital Marketing & Growth Mastery',
      metrics: '12.4x Return On Ad Spend (ROAS), 18k Leads Captured'
    },
    {
      id: 'p5',
      title: 'AI Resume Scanner & ATS Score Optimizer Platform',
      domain: 'Software & Web',
      category: 'Python',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      description: 'Full-stack AI web application parsing resumes, matching skills against job descriptions, and providing automated bullet point suggestions.',
      tools: ['Python', 'FastAPI', 'React', 'OpenAI API', 'Tailwind CSS', 'PostgreSQL'],
      courseLink: '/courses/python-programming-data-analytics-certified-course',
      courseName: 'Python Programming & Data Analytics',
      metrics: '10,000+ Resumes Processed, Sub-200ms Latency'
    },
    {
      id: 'p6',
      title: 'FinTech Banking SuperApp & Design System',
      domain: 'Design & UI/UX',
      category: 'UI/UX',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
      description: 'Comprehensive 80+ screen mobile banking application design system with auto-layout components, WCAG AAA accessibility, and interactive prototypes.',
      tools: ['Figma', 'Design Systems', 'Micro-Interactions', 'User Testing', 'FigJam'],
      courseLink: '/courses/ui-ux-design-course-certified-course',
      courseName: 'UI/UX Design Masterclass',
      metrics: '100% Component Tokenized, 4.8/5 Usability Score'
    }
  ];

  const filteredProjects = showcaseProjects.filter((p) => {
    if (projectCategory === 'All') return true;
    return p.category === projectCategory || p.domain.includes(projectCategory);
  });

  const trainers = [
    {
      name: 'Dr. Rajesh Varma',
      title: 'Principal AI & Data Architect',
      experience: '14+ Years Experience',
      company: 'Ex-Amazon & Microsoft AI',
      expertise: ['Deep Learning', 'NLP & LLMs', 'Python', 'MLOps'],
      rating: 4.96,
      students: '4,800+',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Sneha Kulkarni',
      title: 'Senior CAD/CAE Simulation Lead',
      experience: '11+ Years Experience',
      company: 'Ex-Tata Motors & Siemens CAE',
      expertise: ['SolidWorks CSWP', 'ANSYS FEA', 'CFD Fluent', 'Product Design'],
      rating: 4.94,
      students: '3,200+',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Arjun Mehta',
      title: 'Head of Growth & Performance Marketing',
      experience: '9+ Years Experience',
      company: 'Ex-Ogilvy & Flipkart Growth',
      expertise: ['Google Ads', 'Meta Ad Funnels', 'Technical SEO', 'GA4 Analytics'],
      rating: 4.92,
      students: '3,900+',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Priya Sundaram',
      title: 'Lead Cloud & Full Stack Architect',
      experience: '10+ Years Experience',
      company: 'Ex-Oracle & AWS Certified Lead',
      expertise: ['React & Next.js', 'Node.js', 'AWS Infrastructure', 'Docker'],
      rating: 4.95,
      students: '4,100+',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const studentTestimonials = [
    {
      id: 't1',
      name: 'Aditya Nair',
      role: 'Senior CAE Simulation Engineer',
      company: 'Bosch Mobility',
      hike: '+140% Salary Hike',
      course: 'ANSYS FEA & CFD Simulation',
      batch: '2025 Placement Batch',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      videoUrl: '',
      isVideo: true,
      rating: 5,
      message: 'The live ANSYS boundary problem sessions and guaranteed internship at Course Divine bridged the exact gap between college theory and enterprise CAE design. Landed a core mechanical role at Bosch with a 140% package jump!'
    },
    {
      id: 't2',
      name: 'Ananya Roy',
      role: 'Data Scientist',
      company: 'Amazon Web Services',
      hike: '+180% Salary Hike',
      course: 'Data Science & AI Masterclass',
      batch: '2025 AI Track',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      videoUrl: '',
      isVideo: true,
      rating: 5,
      message: 'From writing basic pandas code to building production LLMs and predictive pipelines, Course Divine mentors gave 1-on-1 code reviews that helped me clear 5 technical interview rounds at Amazon!'
    },
    {
      id: 't3',
      name: 'Vikramaditya Rao',
      role: 'Full Stack Engineer',
      company: 'TCS Digital',
      hike: '+125% Salary Hike',
      course: 'Full Stack Python & Web Development',
      batch: '2025 Full Stack Batch',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      videoUrl: '',
      isVideo: true,
      rating: 5,
      message: 'The capstone projects weren’t simple to-do apps—we built full enterprise microservices with payment gateways and authentication. It made my resume stand out immediately.'
    },
    {
      id: 't4',
      name: 'Sneha Patil',
      role: 'Performance Marketing Lead',
      company: 'Flipkart Growth',
      hike: '+110% Salary Hike',
      course: 'Digital Marketing & Growth Mastery',
      batch: '2025 Growth Track',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      isVideo: false,
      rating: 5,
      message: 'Managing real live ad spend budgets during the Course Divine internship gave me hands-on confidence with GA4 and ROAS optimization that theoretical courses never offer.'
    },
    {
      id: 't5',
      name: 'Karan Malhotra',
      role: 'CAD Design Engineer',
      company: 'Tata Motors',
      hike: 'Direct Campus Placement',
      course: 'SolidWorks 3D CAD Certified Course',
      batch: '2026 Core Engineering Batch',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      isVideo: false,
      rating: 5,
      message: 'Cleared both my CSWA and CSWP certifications in the first attempt. The sheet metal and parametric modeling modules were world-class!'
    },
    {
      id: 't6',
      name: 'Pooja Verma',
      role: 'Senior UI/UX Designer',
      company: 'Capgemini FinTech',
      hike: '+135% Salary Hike',
      course: 'UI/UX Design Masterclass',
      batch: '2025 Product Design Track',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      isVideo: false,
      rating: 5,
      message: 'The design systems and user research case studies we built in Figma became the centerpiece of my portfolio. Recruiter feedback was phenomenal.'
    }
  ];

  const filteredTestimonials = studentTestimonials.filter((t) => {
    if (testimonialTab === 'videos') return t.isVideo;
    if (testimonialTab === 'reviews') return !t.isVideo;
    return true;
  });

  return (
    <div className="space-y-24 pb-16 font-sans bg-[#F8FAFD] text-slate-800 selection:bg-brand-500 selection:text-white">
      
      {/* 1. HERO SECTION: Bright Classroom Hero with High-Contrast Text (Exact User Design) */}
      <section className="relative min-h-[560px] lg:min-h-[640px] flex items-center overflow-hidden bg-white border-b border-slate-200">
        
        {/* Bright Grayscale Classroom Photo with Student on Right */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat bg-[center_right] sm:bg-right opacity-90 scale-100 transition-transform duration-700 grayscale contrast-105 brightness-110"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2560&q=95')`
          }}
        />
        
        {/* Left-to-Right Soft Fade: Solid White on Left for Crystal Clear Text, Transparent on Right for Student */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:w-3/5 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-full sm:w-1/2 bg-white/40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 sm:py-16">
          <div className="max-w-2xl space-y-6">
            
            {/* Top Sub-tag */}
            <div className="text-xs sm:text-sm font-black tracking-widest text-slate-700 uppercase flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#0F62FE]" />
              IT'S YOUR TIME
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[62px] font-black tracking-tight text-[#0F62FE] leading-[1.08]">
                ADVANCE YOUR SKILLS
              </h1>
              <div className="w-28 h-1 bg-slate-800 rounded-full" />
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed max-w-xl">
              Unlock Your Future: Explore Expert-Led Online Training & Internships in IT, Design, and Beyond — Start Your Journey Today!
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                to="/courses"
                className="px-7 py-3.5 rounded-xl bg-[#0F62FE] hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <BookOpen className="w-4 h-4" />
                Explore Courses
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/internships"
                className="px-7 py-3.5 rounded-xl bg-[#071F3F] hover:bg-slate-800 text-white font-extrabold text-sm shadow-lg transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <Briefcase className="w-4 h-4 text-emerald-400" />
                Explore Internships
              </Link>
            </div>

            {/* Call Us Today Pill Badge */}
            <div className="pt-2">
              <a
                href="tel:+919100348679"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0F62FE] to-[#0052CC] hover:from-blue-600 hover:to-blue-800 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-500/30 transition-transform duration-200 hover:scale-105"
              >
                <span className="text-lg">📞</span>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-sky-200 font-bold">Call Us Today</div>
                  <div className="font-extrabold text-sm tracking-wide">+91-9100348679</div>
                </div>
              </a>
            </div>

            {/* Visual Progression Continuum */}
            <div className="pt-4 border-t border-slate-300/80">
              <div className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-2 flex items-center gap-1.5">
                <Target className="w-3 h-3 text-[#0F62FE]" /> Complete Career Progression Framework
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 rounded-xl bg-slate-100/90 border border-slate-200 text-center">
                  <div className="text-xs font-black text-slate-800 flex items-center justify-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#0F62FE]" /> 01. Course
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Masterclass</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100/90 border border-slate-200 text-center">
                  <div className="text-xs font-black text-slate-800 flex items-center justify-center gap-1">
                    <Code2 className="w-3.5 h-3.5 text-emerald-600" /> 02. Project
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Production</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100/90 border border-slate-200 text-center">
                  <div className="text-xs font-black text-slate-800 flex items-center justify-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-amber-600" /> 03. Internship
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Corporate</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100/90 border border-slate-200 text-center">
                  <div className="text-xs font-black text-slate-800 flex items-center justify-center gap-1">
                    <Rocket className="w-3.5 h-3.5 text-purple-600" /> 04. Career
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Placement</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Premium Navy & Electric Blue Performance Strip */}
      <section className="bg-gradient-to-r from-[#061833] via-[#0C2A52] to-[#061833] text-white py-12 border-y border-[#0E3466] shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#0F62FE_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="space-y-1 p-3">
              <div className="text-3xl sm:text-4xl font-black text-white flex items-center justify-center gap-1">
                <AnimatedCounter target={12500} suffix="+" />
              </div>
              <p className="text-xs font-bold text-sky-300 uppercase tracking-wider">Active Students Trained</p>
              <p className="text-[11px] text-slate-300">Across 45+ universities & corporate batches</p>
            </div>

            <div className="space-y-1 p-3 pt-6 sm:pt-3">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 flex items-center justify-center gap-1">
                <AnimatedCounter target={94.8} decimals={1} suffix="%" />
              </div>
              <p className="text-xs font-bold text-sky-300 uppercase tracking-wider">Placement Success Rate</p>
              <p className="text-[11px] text-slate-300">In MNCs, product firms & unicorns</p>
            </div>

            <div className="space-y-1 p-3 pt-6 sm:pt-3">
              <div className="text-3xl sm:text-4xl font-black text-amber-300 flex items-center justify-center gap-1">
                <AnimatedCounter target={180} suffix="+" />
              </div>
              <p className="text-xs font-bold text-sky-300 uppercase tracking-wider">Corporate Hiring Partners</p>
              <p className="text-[11px] text-slate-300">Direct hiring drives & internships</p>
            </div>

            <div className="space-y-1 p-3 pt-6 sm:pt-3">
              <div className="text-3xl sm:text-4xl font-black text-[#3395FF] flex items-center justify-center gap-1">
                <Star className="w-7 h-7 fill-amber-400 text-amber-400 inline -mt-1" />
                <AnimatedCounter target={4.95} decimals={2} suffix="/5.0" />
              </div>
              <p className="text-xs font-bold text-sky-300 uppercase tracking-wider">Student Satisfaction</p>
              <p className="text-[11px] text-slate-300">Based on 3,400+ verified reviews</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pick-your-course" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-[#0F62FE] uppercase">
              ⚡ Instant Skill Discovery
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Pick Your Course
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
              Explore expert-led courses designed around real-world skills.
            </p>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition self-start md:self-auto shrink-0"
          >
            View All Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {topCourseCategories.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedCourseTab(tab.value)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                selectedCourseTab === tab.value
                  ? 'bg-[#0F62FE] text-white shadow-md shadow-blue-500/25'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTopCourses.slice(0, 6).map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
            >
              <Link to={`/courses/${course.slug}`} className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 bg-[#071F3F] text-white text-[11px] font-black px-3 py-1 rounded-lg shadow-sm border border-slate-700">
                  {course.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {course.rating || 4.9}
                </div>
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#0F62FE]" />
                    <span>{course.duration}</span>
                    <span>•</span>
                    <span>{course.level || 'All Levels'}</span>
                  </div>

                  <Link to={`/courses/${course.slug}`}>
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-[#0F62FE] transition line-clamp-2">
                      {course.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {course.subtitle || course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-xl font-black text-slate-900">
                      ${(course.discountPrice || course.price).toLocaleString('en-US')}.00
                    </span>
                    {course.discountPrice && course.price > course.discountPrice && (
                      <span className="text-xs text-slate-400 line-through ml-2">
                        ${course.price.toLocaleString('en-US')}.00
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/courses/${course.slug}`}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition"
                    >
                      Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => setEnrollingCourse(course)}
                      className="px-4 py-2.5 rounded-xl bg-[#0F62FE] hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition flex items-center gap-1.5"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#071F3F] text-white rounded-3xl p-6 sm:p-12 border border-[#0D2F5D] shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#0F62FE]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-black text-brand-300 uppercase tracking-widest">
                🧭 Guided Curriculum Engine
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Not Sure What to Learn? We’ll Help You Find Your Path.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-medium">
                Select your profile and primary ambition to reveal your personalized roadmap.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-300 uppercase tracking-wider">
                  1. I am a:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {['Student', 'Graduate', 'Working Professional', 'Career Switcher'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setPathRole(item)}
                      className={`p-3.5 rounded-xl text-xs font-bold text-left transition border ${
                        pathRole === item
                          ? 'bg-[#0F62FE] text-white border-blue-400 shadow-md'
                          : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {item === 'Student' && '🎓 '}
                      {item === 'Graduate' && '📜 '}
                      {item === 'Working Professional' && '💼 '}
                      {item === 'Career Switcher' && '🔄 '}
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-300 uppercase tracking-wider">
                  2. My goal is:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {['Get a Job', 'Build Skills', 'Internship', 'Career Change', 'Build Portfolio'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setPathGoal(item)}
                      className={`p-3.5 rounded-xl text-xs font-bold text-left transition border ${
                        pathGoal === item
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                          : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {item === 'Get a Job' && '🎯 '}
                      {item === 'Build Skills' && '⚡ '}
                      {item === 'Internship' && '💼 '}
                      {item === 'Career Change' && '🚀 '}
                      {item === 'Build Portfolio' && '📁 '}
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-brand-500/30 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                    {currentPath.tag}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Tailored for <strong className="text-white">{pathRole}</strong> aiming to <strong className="text-white">{pathGoal}</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-black text-[#0F62FE] uppercase">Step 1 • Master Course</div>
                  <div className="font-bold text-white text-sm">{currentPath.coreCourse}</div>
                  <div className="text-[11px] text-slate-400">Live instruction & code reviews</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-black text-emerald-400 uppercase">Step 2 • Build Projects</div>
                  <div className="font-bold text-white text-sm">{currentPath.projects}</div>
                  <div className="text-[11px] text-slate-400">Real production portfolio</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-black text-amber-400 uppercase">Step 3 • Internship</div>
                  <div className="font-bold text-white text-sm">{currentPath.internship}</div>
                  <div className="text-[11px] text-slate-400">Verified corporate experience</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-black text-purple-400 uppercase">Step 4 • Placement</div>
                  <div className="font-bold text-white text-sm">{currentPath.career}</div>
                  <div className="text-[11px] text-slate-400">Direct referral assistance</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-xs text-slate-300">
                  Ready to enroll in this career pathway? Receive a 1-on-1 counselor audit for free.
                </div>
                <Link
                  to="/courses"
                  className="px-6 py-3 rounded-xl bg-[#0F62FE] hover:bg-blue-700 text-white font-extrabold text-xs transition shadow-lg shrink-0 flex items-center gap-2"
                >
                  Start This Path Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold tracking-widest text-[#0F62FE] uppercase">
            🚀 End-to-End Skill Journeys
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Where Do You Want Your Skills to Take You?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            We provide a complete career journey—not just isolated courses.
          </p>
        </div>

        <div className="flex justify-center gap-2 sm:gap-4 overflow-x-auto pb-2">
          {careerTracks.map((track) => (
            <button
              key={track.id}
              onClick={() => setActiveCareerTrack(track.id)}
              className={`px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                activeCareerTrack === track.id
                  ? 'bg-[#071F3F] text-white shadow-xl shadow-slate-900/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {track.name}
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#071F3F] via-[#09274E] to-[#071F3F] text-white rounded-3xl p-6 sm:p-10 border border-[#0D366D] shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F62FE]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
            <div>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 font-black text-xs">
                {activeTrackData.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                {activeTrackData.name} Career Roadmap
              </h3>
              <p className="text-sm text-slate-300 mt-1">{activeTrackData.headline}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-left sm:text-right shrink-0">
              <div className="text-[11px] font-bold text-sky-300 uppercase">Target Role & Package</div>
              <div className="text-base font-black text-white">{activeTrackData.targetRole}</div>
              <div className="text-xs font-bold text-emerald-400">{activeTrackData.salary} Average Salary</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
            {activeTrackData.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-[#0F62FE] transition space-y-2 relative group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#0F62FE] text-white font-black text-xs flex items-center justify-center shadow-md">
                  0{idx + 1}
                </div>
                <div className="font-extrabold text-white text-xs">{step.label}</div>
                <div className="text-xs text-slate-300 font-medium">{step.desc}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 border-t border-white/10">
            <p className="text-xs text-slate-300">
              Includes comprehensive industry modules, real-world portfolio projects, and corporate internship placement.
            </p>
            <Link
              to="/courses"
              className="px-6 py-3 rounded-xl bg-[#0F62FE] hover:bg-blue-600 text-white font-black text-xs shadow-lg transition flex items-center gap-2 shrink-0"
            >
              Explore {activeTrackData.name} Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-4 border-t border-white/10 relative z-10">
            <div className="space-y-2">
              <div className="text-xs font-bold text-sky-300 uppercase tracking-wider">
                Industry Tools & Competencies Mastered
              </div>
              <div className="flex flex-wrap gap-2">
                {activeTrackData.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-slate-900/90 text-slate-200 text-xs font-bold border border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <Link
              to="/courses"
              className="px-6 py-3.5 rounded-2xl bg-[#0F62FE] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-xl transition flex items-center justify-center gap-2 shrink-0"
            >
              Enroll in {activeTrackData.name} Track <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-[#0F62FE] uppercase">
              💻 Practical Portfolio Power
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Don’t Just Learn It. Build It.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
              Real student and capstone projects that turn job interviews into confident technical demos.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['All', 'SolidWorks', 'ANSYS', 'Data Science', 'Digital Marketing', 'Python', 'UI/UX'].map((cat) => (
              <button
                key={cat}
                onClick={() => setProjectCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  projectCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />

                <div className="absolute top-3 left-3 bg-[#071F3F]/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-md border border-slate-700">
                  {project.domain}
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-sm p-2.5 rounded-xl text-white text-[11px] font-semibold border border-slate-800 flex items-center justify-between">
                  <span>📊 {project.metrics}</span>
                  <span className="text-brand-400 font-bold">Details →</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#0F62FE] transition">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.slice(0, 3).map((tool, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0F62FE] text-[10px] font-bold">
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                        +{project.tools.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-400">Associated Course:</span>
                    <span className="font-bold text-[#0F62FE] group-hover:underline">
                      {project.courseName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-[#0F62FE] uppercase tracking-wider">
                    {selectedProject.domain} • {selectedProject.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">
                  🏆 Verified Project Benchmark: {selectedProject.metrics}
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-500 uppercase">Technologies & Tools Applied:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map((tool, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                  >
                    Close Preview
                  </button>
                  <Link
                    to={selectedProject.courseLink}
                    className="px-6 py-2.5 rounded-xl bg-[#0F62FE] hover:bg-blue-700 text-white text-xs font-bold shadow-md transition"
                  >
                    Learn to Build This in {selectedProject.courseName} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold tracking-widest text-[#0F62FE] uppercase">
            👨‍🏫 Industry Mentors
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Learn From People Who Do the Work.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Real engineering leads and practitioners bringing production experience straight to your screen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 text-center group hover:-translate-y-1"
            >
              <div className="space-y-4 flex flex-col items-center">
                <div className="relative">
                  <img
                    src={trainer.avatar}
                    alt={trainer.name}
                    className="w-20 h-20 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full border-2 border-white">
                    VERIFIED
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{trainer.name}</h3>
                  <p className="text-xs text-[#0F62FE] font-bold mt-0.5">{trainer.title}</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">{trainer.company}</p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 text-left">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">{trainer.experience}</span>
                  <span className="font-black text-amber-500 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {trainer.rating}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {trainer.expertise.map((exp, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#071F3F] rounded-3xl p-6 sm:p-12 text-white border border-[#0D2F5D] shadow-2xl space-y-8">
          
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-black text-brand-300 uppercase tracking-widest">
              🖥️ Technology-Enabled LMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              A Modern, Technology-Enabled Learning Experience
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              From live interactive classrooms to automated code evaluation and progress tracking.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-950/95 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-400 font-mono text-[11px] ml-2">portal.coursedivine.com/learn</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-brand-400" /> Batch: 2026 Live Track</span>
                <span className="flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Student</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-brand-500/30 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                    TODAY 7:00 PM
                  </span>
                  <PlayCircle className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-bold uppercase">Upcoming Live Session</div>
                  <div className="text-sm font-extrabold text-white mt-1">Deep Neural Networks & PyTorch</div>
                </div>
                <div className="text-[10px] text-slate-400">Instructor: Dr. Rajesh Varma</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase">Your Progress</span>
                  <span className="text-base font-black text-brand-400">80%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-brand-500 to-emerald-400 h-full w-4/5 rounded-full" />
                </div>
                <div className="text-[10px] text-slate-400">16 of 20 Modules Mastered</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase">Projects Completed</span>
                  <span className="text-base font-black text-emerald-400">3 / 4</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-full h-2 rounded-full bg-emerald-500" />
                  <span className="w-full h-2 rounded-full bg-emerald-500" />
                  <span className="w-full h-2 rounded-full bg-emerald-500" />
                  <span className="w-full h-2 rounded-full bg-slate-800" />
                </div>
                <div className="text-[10px] text-slate-400">Final Capstone Pending Review</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase">Certificate Progress</span>
                  <span className="text-base font-black text-amber-400">85%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full w-[85%] rounded-full" />
                </div>
                <div className="text-[10px] text-slate-400">APSCHE & IAF Verified Badge</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Next Milestone: Submit Final Capstone to Unlock Guaranteed Corporate Internship.</span>
              </div>
              <Link
                to="/dashboard"
                className="px-5 py-2.5 rounded-xl bg-[#0F62FE] hover:bg-blue-700 text-white font-extrabold transition shrink-0"
              >
                Open Student LMS Demo →
              </Link>
            </div>

          </div>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold tracking-widest text-[#0F62FE] uppercase">
            🏆 The Complete Progression
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Your Course Isn’t the End. It’s the Beginning.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            01 Learn → 02 Practice → 03 Build → 04 Intern → 05 Showcase → 06 Grow
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            { num: '01', title: 'Learn', icon: BookOpen, desc: 'Live sessions with industry lead mentors and structured theory.' },
            { num: '02', title: 'Practice', icon: Code2, desc: 'Hands-on guided labs, problem sets, and cloud development sandboxes.' },
            { num: '03', title: 'Build', icon: Laptop, desc: 'Production-ready capstones simulating real-world company challenges.' },
            { num: '04', title: 'Intern', icon: Briefcase, desc: 'Guaranteed corporate internships with real project deliverables.' },
            { num: '05', title: 'Showcase', icon: Award, desc: 'Verified ISO/IAF certificates & GitHub portfolios for recruiters.' },
            { num: '06', title: 'Grow', icon: Rocket, desc: 'Placement support, mock technical rounds, and career acceleration.' }
          ].map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-200 group-hover:text-[#0F62FE] transition">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0F62FE] flex items-center justify-center group-hover:bg-[#0F62FE] group-hover:text-white transition">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{step.title}</h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-gradient-to-r from-[#061833] via-[#0A274E] to-[#061833] text-white rounded-3xl p-8 sm:p-12 border border-[#0D366D] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0F62FE]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10 relative z-10">
            <div className="p-4 space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-sky-400 font-mono">
                <AnimatedCounter target={98.4} decimals={1} suffix="%" duration={2000} />
              </div>
              <div className="text-xs font-bold text-slate-200">Verified Placement Rate</div>
              <div className="text-[10px] text-slate-400">Across 2025-2026 batches</div>
            </div>

            <div className="p-4 space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-emerald-400 font-mono">
                <AnimatedCounter target={140} suffix="%" duration={2200} />
              </div>
              <div className="text-xs font-bold text-slate-200">Average Salary Hike</div>
              <div className="text-[10px] text-slate-400">For career transformers</div>
            </div>

            <div className="p-4 space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-amber-300 font-mono">
                <AnimatedCounter target={180} suffix="+" duration={2400} />
              </div>
              <div className="text-xs font-bold text-slate-200">Corporate Hiring Partners</div>
              <div className="text-[10px] text-slate-400">Direct university & corporate drives</div>
            </div>

            <div className="p-4 space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-purple-300 font-mono">
                <AnimatedCounter target={25000} suffix="+" duration={2000} />
              </div>
              <div className="text-xs font-bold text-slate-200">Community Learners</div>
              <div className="text-[10px] text-slate-400">Across India & global cohorts</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-gradient-to-b from-[#F0F6FF] via-[#E8F1FC] to-[#F8FAFD] p-6 sm:p-12 rounded-3xl border border-blue-100/80 shadow-sm">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-[#0F62FE] uppercase">
              🌟 Real Student Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Hear Directly From Course Divine Alumni
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
              Watch video interviews and read verified placement reviews from our graduates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTestimonialTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                testimonialTab === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setTestimonialTab('videos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                testimonialTab === 'videos'
                  ? 'bg-[#0F62FE] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Video Stories
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              {item.isVideo && (
                <div
                  onClick={() => setSelectedVideoTestimonial(item)}
                  className="relative aspect-video bg-slate-900 cursor-pointer overflow-hidden group/vid"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover/vid:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#0F62FE] text-white flex items-center justify-center shadow-2xl group-hover/vid:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-white font-bold">
                    <span>🎬 Watch Video Story</span>
                    <span className="bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px]">{item.hike}</span>
                  </div>
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      {item.hike}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    "{item.message}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shadow-sm"
                  />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1">
                      {item.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </h4>
                    <p className="text-xs text-[#0F62FE] font-bold">{item.role}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{item.company} • {item.course}</p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#071F3F] via-[#0F62FE] to-[#071F3F] rounded-3xl p-8 sm:p-14 text-white text-center shadow-2xl space-y-6 relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Admissions Open For 2026 Batches
            </span>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to Turn Your Skills into Your Next High-Growth Opportunity?
            </h2>

            <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-medium max-w-2xl mx-auto">
              Join over 25,000+ ambitious developers and engineers. Master in-demand tools, build verified portfolios, and land guaranteed corporate internships.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/courses"
                className="px-8 py-4 rounded-2xl bg-white text-[#071F3F] hover:bg-slate-100 font-black text-sm sm:text-base shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                Browse All 50+ Courses <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setFinderOpen(true)}
                className="px-8 py-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 text-white font-extrabold text-sm sm:text-base border border-white/30 backdrop-blur-md shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-emerald-400" /> 🎯 Find My Course
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="bg-[#071F3F] text-white py-3 text-center border-y border-[#0D2F5D]">
          <h2 className="text-sm sm:text-base font-black tracking-widest uppercase text-brand-300">
            Govt Recognized & Globally Accredited Platform
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-items-center py-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 shadow-sm bg-white w-full max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-800 font-bold text-xs p-1 text-center shrink-0">
                🏛️ APSCHE
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-slate-900">Andhra Pradesh State Council</div>
                <div className="text-slate-500 text-[10px]">Of Higher Education (APSCHE)</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 shadow-sm bg-white w-full max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800 font-bold text-xs p-1 text-center shrink-0">
                🌐 IAF
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-slate-900">International Accreditation</div>
                <div className="text-slate-500 text-[10px]">Forum (IAF Recognized)</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 shadow-sm bg-white w-full max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs p-1 text-center shrink-0">
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

      <EnrollmentModal
        isOpen={!!enrollingCourse}
        onClose={() => setEnrollingCourse(null)}
        course={enrollingCourse}
        onEnrollmentSuccess={() => {}}
      />

      <VideoModal
        isOpen={!!selectedVideoTestimonial}
        onClose={() => setSelectedVideoTestimonial(null)}
        testimonial={selectedVideoTestimonial}
      />

      {finderOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-extrabold text-[#0F62FE] uppercase tracking-wider">
                  Course Divine AI Matcher • Step {finderStep} of 3
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {finderStep === 1 && "What's your current profile?"}
                  {finderStep === 2 && "Which domain interests you?"}
                  {finderStep === 3 && "What is your primary goal?"}
                </h3>
              </div>
              <button
                onClick={() => setFinderOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {finderStep === 1 && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">Select the option that best describes you today:</p>
                <div className="grid grid-cols-1 gap-2.5">
                  {['College Student (1st-4th Year)', 'Recent Graduate', 'Working Professional (Tech/Non-Tech)', 'Career Switcher / Career Break'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setFinderAnswers({ ...finderAnswers, background: opt });
                        setFinderStep(2);
                      }}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs hover:bg-blue-50 hover:border-blue-300 hover:text-[#0F62FE] transition text-left flex items-center justify-between"
                    >
                      <span>{opt}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {finderStep === 2 && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">Which career track or field excites you most?</p>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    'Data Science & Generative AI',
                    'Mechanical & Engineering CAD/CAE (SolidWorks/ANSYS)',
                    'Digital Marketing & Growth',
                    'Full Stack Python & Software Engineering',
                    'UI/UX Design & Product Strategy'
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setFinderAnswers({ ...finderAnswers, domain: opt });
                        setFinderStep(3);
                      }}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs hover:bg-blue-50 hover:border-blue-300 hover:text-[#0F62FE] transition text-left flex items-center justify-between"
                    >
                      <span>{opt}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {finderStep === 3 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500">What is your immediate milestone?</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Land a High-Paying Job', 'Get a Guaranteed Internship', 'Build Industry Portfolio', 'Upskill with Certification'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFinderAnswers({ ...finderAnswers, goal: opt })}
                      className={`p-3 rounded-xl text-xs font-bold text-left transition border ${
                        finderAnswers.goal === opt
                          ? 'bg-[#0F62FE] text-white border-blue-400'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="text-[11px] font-black text-emerald-800 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 98% Match Recommended Track
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    {finderAnswers.domain}
                  </div>
                  <div className="text-xs text-slate-600">
                    Includes live instruction, 2 production capstones, guaranteed internship, and placement prep.
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setFinderStep(1)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold"
                  >
                    Back
                  </button>
                  <Link
                    to="/courses"
                    onClick={() => setFinderOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-[#0F62FE] hover:bg-blue-700 text-white font-bold text-xs text-center transition shadow-md"
                  >
                    View Recommended Courses →
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* FLOATING ACTION: COURSE FINDER TRIGGER BUTTON */}
      <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40">
        <button
          onClick={() => {
            setFinderStep(1);
            setFinderOpen(true);
          }}
          className="px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#0F62FE] to-emerald-500 text-white font-black text-xs sm:text-sm shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 border-2 border-white/40 animate-bounce"
          title="Find the right course for your career"
        >
          <Compass className="w-4 h-4" />
          <span>🎯 Find My Course</span>
        </button>
      </div>

      {/* FLOATING ACTION: GREEN WHATSAPP BUTTON (Bottom Left) */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
        <a
          href="https://wa.me/919100348679?text=Hello%20Course%20Divine,%20I%20am%20interested%20in%20courses%20and%20internships!"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 relative group"
          title="Chat with us on WhatsApp"
          aria-label="WhatsApp Chat"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-200 rounded-full animate-ping" />
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
        </a>
      </div>

      {/* FLOATING ACTION: LIVE CHAT ASSISTANT WIDGET (Bottom Right) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
        {chatOpen && (
          <div className="bg-white w-[calc(100vw-2rem)] sm:w-96 max-w-sm rounded-3xl shadow-2xl border border-slate-200 overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="bg-[#071F3F] text-white p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm flex items-center gap-1">
                    Hi there <span className="animate-wiggle">👋</span>
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-white/80">Welcome to Course Divine. Ask us anything 🎉</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white/80 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 h-60 sm:h-64 overflow-y-auto space-y-3 bg-slate-50 text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.from === 'user'
                        ? 'bg-[#0F62FE] text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
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
                className="px-3.5 py-2 rounded-xl bg-[#0F62FE] hover:bg-blue-700 text-white transition flex items-center justify-center"
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
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#071F3F] hover:bg-slate-800 text-white flex items-center justify-center shadow-lg transition"
              title="Scroll to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}

          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0F62FE] hover:bg-blue-700 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-200"
            aria-label="Toggle Live Chat"
          >
            {chatOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Bot className="w-6 h-6 sm:w-7 sm:h-7" />}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Home;
