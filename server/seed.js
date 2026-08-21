require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');

try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

const User = require('./models/User');
const Course = require('./models/Course');
const Category = require('./models/Category');
const Placement = require('./models/Placement');
const BlogPost = require('./models/BlogPost');
const Certificate = require('./models/Certificate');
const Testimonial = require('./models/Testimonial');
const Enrollment = require('./models/Enrollment');
const Order = require('./models/Order');
const Internship = require('./models/Internship');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/coursedivine';
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log('🌱 Connected to MongoDB for seeding...');

    // Clear existing collections
    await User.deleteMany({});
    try { await Course.collection.drop(); } catch(e) {}
    await Category.deleteMany({});
    await Placement.deleteMany({});
    await BlogPost.deleteMany({});
    await Certificate.deleteMany({});
    await Testimonial.deleteMany({});
    await Enrollment.deleteMany({});
    await Order.deleteMany({});
    await Internship.deleteMany({});

    console.log('🧹 Cleaned existing database records.');

    // 1. Create Users
    const adminUser = await User.create({
      name: 'Course Divine Admin',
      email: 'admin@coursedivine.com',
      password: 'Admin@123',
      phone: '+91 9876543210',
      role: 'admin',
      referralCode: 'CDADMIN',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    });

    const studentUser = await User.create({
      name: 'Rohan Sharma',
      email: 'student@coursedivine.com',
      password: 'Student@123',
      phone: '+91 9811223344',
      role: 'user',
      referralCode: 'CDROHAN',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    });

    console.log('👤 Created Admin & Student Users.');

    // 2. Categories
    const categoriesData = [
      { name: 'Full Stack Development', slug: 'full-stack-development', description: 'Master front-end, back-end, and database architectures.', icon: 'Code', courseCount: 4 },
      { name: 'Data Science & AI', slug: 'data-science-ai', description: 'Machine Learning, Deep Learning, Generative AI & Data Analytics.', icon: 'Brain', courseCount: 3 },
      { name: 'Cloud & DevOps', slug: 'cloud-devops', description: 'AWS, Azure, Docker, Kubernetes and CI/CD pipelines.', icon: 'Cloud', courseCount: 3 },
      { name: 'Cyber Security', slug: 'cyber-security', description: 'Ethical hacking, network security, and defense protocols.', icon: 'Shield', courseCount: 2 },
      { name: 'Programming Languages', slug: 'programming-languages', description: 'Python, Java, C++, TypeScript, and modern engineering.', icon: 'Terminal', courseCount: 3 },
      { name: 'UI/UX Design', slug: 'ui-ux-design', description: 'Figma, design systems, wireframing, and user psychology.', icon: 'Layout', courseCount: 2 }
    ];
    await Category.insertMany(categoriesData);

    // 3. Courses
    const coursesData = [
      {
        title: 'Full Stack Web Development (MERN Mastery)',
        slug: 'full-stack-web-development-mern-mastery',
        subtitle: 'Build production-ready, scalable web applications from scratch to deployment.',
        description: 'Complete hands-on curriculum covering React 18, Node.js, Express.js, MongoDB, Next.js, Redux Toolkit, RESTful APIs, JWT Auth, and Cloud Deployment on AWS.',
        overview: 'This comprehensive Full Stack Web Development program takes you from fundamental JavaScript to building production-grade SaaS architectures. You will build 6 real-world enterprise projects, learn industry CI/CD workflows, and prepare for high-paying product company roles.',
        category: 'Full Stack Development',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
        previewVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        level: 'Beginner',
        language: 'English & Hindi',
        duration: '120 Hours (16 Weeks)',
        totalLectures: 88,
        price: 8999,
        discountPrice: 3499,
        rating: 4.9,
        numReviews: 240,
        isFeatured: true,
        isPopular: true,
        enrolledCount: 840,
        instructor: {
          name: 'Vikramaditya Sengupta',
          title: 'Staff Software Architect (Ex-Amazon)',
          bio: '12+ years of distributed systems engineering and mentor to 10,000+ developers worldwide.',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        },
        highlights: [
          '6 Real-World Industry Grade Capstone Projects',
          'Live Code Reviews & 1-on-1 Mentor Guidance',
          'Course Divine Verified Professional Certificate',
          'Placement Guarantee Assistance & Mock Interviews'
        ],
        prerequisites: [
          'Basic computer operation skills',
          'Passion to learn coding (No prior programming background required)'
        ],
        learningOutcomes: [
          'Build enterprise-ready full-stack applications with React, Node, Express, and MongoDB',
          'Design secure authentication flows with JWT, OAuth, and bcrypt',
          'Deploy web applications to AWS EC2, S3, and Vercel with automated CI/CD',
          'Master state management with Redux Toolkit and React Query'
        ],
        curriculum: [
          {
            title: 'Module 1: Modern JavaScript & TypeScript Foundations',
            duration: '20 Hours',
            description: 'Deep dive into ES6+, Async/Await, Event Loop, Closures, and TypeScript Typing.',
            topics: [
              { title: 'JavaScript Execution Context & Call Stack', duration: '45 mins', isFreePreview: true },
              { title: 'Promises, Async/Await & Microtasks', duration: '60 mins', isFreePreview: true },
              { title: 'TypeScript Interfaces, Generics & Utility Types', duration: '90 mins', isFreePreview: false }
            ]
          },
          {
            title: 'Module 2: Advanced React 18 & Frontend Architecture',
            duration: '35 Hours',
            description: 'Custom hooks, Context API, Performance optimization, Tailwind CSS and Component design.',
            topics: [
              { title: 'React 18 Concurrent Features & State Batching', duration: '60 mins', isFreePreview: false },
              { title: 'Building Scalable UI with Tailwind & Headless Components', duration: '75 mins', isFreePreview: false },
              { title: 'State Management with Redux Toolkit', duration: '90 mins', isFreePreview: false }
            ]
          },
          {
            title: 'Module 3: Scalable Backend with Node.js, Express & MongoDB',
            duration: '40 Hours',
            description: 'REST API design, Mongoose schemas, JWT Authentication, and Rate Limiting.',
            topics: [
              { title: 'Express Routing & Middleware Pipeline', duration: '50 mins', isFreePreview: false },
              { title: 'MongoDB Indexing & Aggregation Pipelines', duration: '80 mins', isFreePreview: false },
              { title: 'Payment Gateway Integration with Razorpay', duration: '65 mins', isFreePreview: false }
            ]
          },
          {
            title: 'Module 4: DevOps, Cloud Deployment & Capstone Project',
            duration: '25 Hours',
            description: 'Dockerizing the application, GitHub Actions CI/CD, AWS Deployment, and Final Defense.',
            topics: [
              { title: 'Containerization with Docker & Docker Compose', duration: '70 mins', isFreePreview: false },
              { title: 'Deploying to AWS & Monitoring with PM2/Nginx', duration: '90 mins', isFreePreview: false },
              { title: 'Capstone Project Defense & Code Review', duration: '120 mins', isFreePreview: false }
            ]
          }
        ],
        faqs: [
          { question: 'Will I get lifetime access to all lecture materials?', answer: 'Yes! Once enrolled, you receive lifetime access to all recorded sessions, curriculum updates, source code repositories, and community Discord.' },
          { question: 'Do you offer placement assistance?', answer: 'Yes, our dedicated placement cell coordinates mock technical interviews, resume polishing, and direct referrals to over 180+ partner tech companies.' },
          { question: 'Can I pay in installments?', answer: 'Yes, we provide flexible zero-cost EMI payment options during checkout.' }
        ]
      },
      {
        title: 'Data Science & Artificial Intelligence Professional Bootcamp',
        slug: 'data-science-and-ai-bootcamp',
        subtitle: 'From exploratory data analysis to Deep Learning, Large Language Models (LLMs) & LangChain.',
        description: 'Comprehensive data science program covering Python for Data Science, NumPy, Pandas, Scikit-Learn, TensorFlow, PyTorch, Generative AI, and RAG pipelines.',
        overview: 'Transform data into intelligent decisions. This bootcamp equips you with real mathematical intuition and industrial machine learning capabilities used by tech giants.',
        category: 'Data Science & AI',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        level: 'Intermediate',
        language: 'English & Hindi',
        duration: '100 Hours (14 Weeks)',
        totalLectures: 75,
        price: 9999,
        discountPrice: 4299,
        rating: 4.85,
        numReviews: 190,
        isFeatured: true,
        isPopular: true,
        enrolledCount: 620,
        instructor: {
          name: 'Dr. Ananya Mukherjee',
          title: 'Chief AI Research Scientist',
          bio: 'Ph.D. in Computer Science with 8+ years leading NLP and predictive analytics labs.',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
        },
        highlights: [
          'Master Python, Pandas, Machine Learning & Deep Learning',
          'Deploy LLM & Retrieval-Augmented Generation (RAG) Apps',
          'Industry Projects on Financial Fraud Detection & Image Recognition',
          'Global Certification by Course Divine'
        ],
        prerequisites: [
          'Basic high school mathematics',
          'Familiarity with any programming language is beneficial but not strictly mandatory'
        ],
        learningOutcomes: [
          'Perform end-to-end data cleaning, EDA, and statistical hypothesis testing',
          'Build predictive regression, classification, and clustering ML models',
          'Train neural networks with TensorFlow and PyTorch',
          'Integrate LangChain and OpenAI/Claude APIs into production apps'
        ],
        curriculum: [
          {
            title: 'Module 1: Python for Data Analysis & Visualization',
            duration: '25 Hours',
            description: 'NumPy arrays, Pandas DataFrames, Matplotlib, Seaborn, and statistical tests.',
            topics: [
              { title: 'NumPy Vectorized Computations & Broadcasting', duration: '60 mins', isFreePreview: true },
              { title: 'Data Cleaning & Transformation in Pandas', duration: '90 mins', isFreePreview: true },
              { title: 'Exploratory Data Analysis Case Study', duration: '90 mins', isFreePreview: false }
            ]
          },
          {
            title: 'Module 2: Supervised & Unsupervised Machine Learning',
            duration: '35 Hours',
            description: 'Linear Regression, Decision Trees, Random Forests, XGBoost, PCA, and K-Means.',
            topics: [
              { title: 'Feature Engineering & Model Evaluation Metrics', duration: '75 mins', isFreePreview: false },
              { title: 'Ensemble Learning with Random Forests & XGBoost', duration: '90 mins', isFreePreview: false }
            ]
          },
          {
            title: 'Module 3: Deep Learning, PyTorch & Generative AI',
            duration: '40 Hours',
            description: 'Convolutional Neural Networks, Transformers, Prompt Engineering, and RAG Architecture.',
            topics: [
              { title: 'Neural Network Architectures & Backpropagation', duration: '90 mins', isFreePreview: false },
              { title: 'Building LLM Apps with LangChain & Vector Databases', duration: '120 mins', isFreePreview: false }
            ]
          }
        ],
        faqs: [
          { question: 'Do I need a powerful GPU laptop for this course?', answer: 'No, we utilize Google Colab Pro and cloud GPU notebooks provided as part of the course.' }
        ]
      },
      {
        title: 'Cloud Computing & DevOps Engineer Specialization (AWS & Kubernetes)',
        slug: 'cloud-computing-and-devops-engineer',
        subtitle: 'Automate deployments, scale cloud infrastructures, and master Kubernetes & CI/CD.',
        description: 'Comprehensive hands-on training on AWS Architecture, Terraform Infrastructure as Code, Docker Containers, Kubernetes Cluster Management, Jenkins, and GitHub Actions.',
        overview: 'DevOps engineers bridge code and operations to achieve continuous delivery. This specialization prepares you for AWS Certified Solutions Architect and Certified Kubernetes Administrator (CKA) credentials.',
        category: 'Cloud & DevOps',
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        banner: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
        level: 'Intermediate',
        language: 'English',
        duration: '90 Hours (12 Weeks)',
        totalLectures: 64,
        price: 8499,
        discountPrice: 3799,
        rating: 4.9,
        numReviews: 165,
        isFeatured: true,
        isPopular: false,
        enrolledCount: 480,
        instructor: {
          name: 'Aditya Verma',
          title: 'Principal Cloud Architect',
          bio: 'AWS Ambassador with 10+ cloud certifications and enterprise migration experience.',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
        },
        highlights: [
          'AWS Solutions Architect & CKA syllabus alignment',
          'Terraform IaC and GitOps production pipelines',
          'Live Kubernetes Multi-Cluster Labs',
          'Enterprise Monitoring with Prometheus & Grafana'
        ],
        prerequisites: ['Basic understanding of Linux commands and networking fundamentals'],
        learningOutcomes: [
          'Design resilient, highly available AWS architectures',
          'Automate multi-cloud infrastructure with Terraform',
          'Orchestrate microservices on Kubernetes clusters',
          'Build end-to-end continuous delivery pipelines with GitHub Actions'
        ],
        curriculum: [
          {
            title: 'Module 1: Linux Administration & Shell Scripting',
            duration: '20 Hours',
            description: 'Linux file permissions, process management, SSH keys, and bash automation.',
            topics: [{ title: 'Linux Fundamentals for DevOps', duration: '60 mins', isFreePreview: true }]
          },
          {
            title: 'Module 2: Amazon Web Services (AWS) Core Services',
            duration: '30 Hours',
            description: 'VPC, EC2, S3, RDS, IAM, Lambda, and Route 53.',
            topics: [{ title: 'Configuring Custom VPC & Security Groups', duration: '75 mins', isFreePreview: false }]
          },
          {
            title: 'Module 3: Docker & Kubernetes Orchestration',
            duration: '40 Hours',
            description: 'Docker multi-stage builds, K8s Pods, Deployments, Services, and Ingress.',
            topics: [{ title: 'Production Kubernetes Cluster Management', duration: '90 mins', isFreePreview: false }]
          }
        ],
        faqs: [
          { question: 'Will I get free cloud credits for AWS labs?', answer: 'We guide you through setting up AWS Free Tier and provide isolated practice sandbox environments.' }
        ]
      },
      {
        title: 'Cyber Security & Ethical Hacking Masterclass',
        slug: 'cyber-security-and-ethical-hacking-masterclass',
        subtitle: 'Learn ethical penetration testing, network defense, web app security, and cryptography.',
        description: 'Practical offensive and defensive cybersecurity training with Kali Linux, Metasploit, Wireshark, Burp Suite, and OWASP Top 10 vulnerability remediation.',
        overview: 'Protect modern systems from sophisticated cyber threats. Learn the tools and techniques used by certified security analysts and white-hat hackers.',
        category: 'Cyber Security',
        thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
        level: 'All Levels',
        language: 'English & Hindi',
        duration: '80 Hours (10 Weeks)',
        totalLectures: 55,
        price: 7999,
        discountPrice: 2999,
        rating: 4.8,
        numReviews: 140,
        isFeatured: false,
        isPopular: true,
        enrolledCount: 510,
        instructor: {
          name: 'Rajesh K. Pillai',
          title: 'Lead Information Security Auditor',
          bio: 'CEH, CISSP certified cybersecurity consultant with 9+ years defending financial institutions.',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
        },
        highlights: [
          'Hands-on Penetration Testing Labs in Kali Linux',
          'OWASP Top 10 Web Application Vulnerabilities',
          'Network Packet Analysis with Wireshark',
          'Course Divine Certified Cyber Defender Credential'
        ],
        prerequisites: ['Basic understanding of computer networks (IP, DNS, TCP/UDP)'],
        learningOutcomes: [
          'Identify and exploit vulnerabilities ethically in virtual labs',
          'Conduct comprehensive web application security audits with Burp Suite',
          'Configure firewalls, IDS/IPS, and security policies',
          'Prepare for CEH and CompTIA Security+ certifications'
        ],
        curriculum: [
          {
            title: 'Module 1: Information Gathering & Reconnaissance',
            duration: '20 Hours',
            description: 'OSINT, Nmap network scanning, DNS enumeration, and banner grabbing.',
            topics: [{ title: 'Nmap Scanning Techniques & Port Scanning', duration: '60 mins', isFreePreview: true }]
          },
          {
            title: 'Module 2: Web Application Security & OWASP Top 10',
            duration: '35 Hours',
            description: 'SQL Injection, XSS, CSRF, IDOR, and Broken Authentication.',
            topics: [{ title: 'Exploiting & Patching SQL Injections', duration: '80 mins', isFreePreview: false }]
          }
        ],
        faqs: [
          { question: 'Is this training legal and safe?', answer: 'Yes, all offensive security labs take place within strictly isolated, simulated virtual machines.' }
        ]
      },
      {
        title: 'Mastering Java & Spring Boot Enterprise Microservices',
        slug: 'mastering-java-and-spring-boot-microservices',
        subtitle: 'Enterprise backend development with Java 21, Spring Boot 3, Hibernate & Kafka.',
        description: 'Comprehensive industry course on Java OOP, Collections, Multi-threading, Spring Boot REST APIs, Spring Security, Microservices architecture, Docker, and Kafka messaging.',
        overview: 'Build robust, transactional enterprise banking and e-commerce backends trusted by Fortune 500 tech teams.',
        category: 'Programming Languages',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        banner: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        level: 'Intermediate',
        language: 'English',
        duration: '95 Hours (12 Weeks)',
        totalLectures: 70,
        price: 7499,
        discountPrice: 3299,
        rating: 4.88,
        numReviews: 175,
        isFeatured: false,
        isPopular: true,
        enrolledCount: 590,
        instructor: {
          name: 'Suresh Nambiar',
          title: 'Senior Java Architect',
          bio: '14+ years in FinTech enterprise backend development.',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        },
        highlights: [
          'Java 21 Modern Features & Virtual Threads',
          'Spring Boot 3, Spring Data JPA & PostgreSQL',
          'Distributed Microservices with Kafka & Eureka',
          'JWT Authentication & Spring Security 6'
        ],
        prerequisites: ['Basic understanding of programming fundamentals'],
        learningOutcomes: [
          'Design resilient microservices with Spring Cloud and Eureka',
          'Implement asynchronous event-driven messaging with Apache Kafka',
          'Write clean, unit-tested code with JUnit 5 and Mockito'
        ],
        curriculum: [
          {
            title: 'Module 1: Core Java 21 & Concurrency',
            duration: '25 Hours',
            description: 'OOP, Collections framework, Lambdas, Streams, and Virtual Threads.',
            topics: [{ title: 'Java 21 Stream API & Performance Tuning', duration: '60 mins', isFreePreview: true }]
          }
        ],
        faqs: [
          { question: 'Is Spring Boot 3 covered?', answer: 'Yes, this course is fully updated for Java 21 and Spring Boot 3.x.' }
        ]
      },
      {
        title: 'UI/UX Design Masterclass & Product Figma Design System',
        slug: 'ui-ux-design-masterclass-figma',
        subtitle: 'Create modern, pixel-perfect interfaces, mobile apps, and interactive prototypes.',
        description: 'Complete UI/UX design workflow covering Figma auto-layout, design tokens, typography, UX research, wireframing, usability testing, and client presentation.',
        overview: 'Learn how to craft digital experiences that users love. Build a standout Dribbble/Behance portfolio ready to land high-paying product designer roles.',
        category: 'UI/UX Design',
        thumbnail: 'https://images.unsplash.com/photo-1581291518655-9523c932deda?auto=format&fit=crop&w=800&q=80',
        banner: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
        level: 'Beginner',
        language: 'English & Hindi',
        duration: '60 Hours (8 Weeks)',
        totalLectures: 48,
        price: 5999,
        discountPrice: 2199,
        rating: 4.92,
        numReviews: 130,
        isFeatured: true,
        isPopular: false,
        enrolledCount: 390,
        instructor: {
          name: 'Pooja Iyer',
          title: 'Product Design Lead (Ex-Swiggy)',
          bio: '8+ years designing high-conversion apps and mentor to design communities.',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        },
        highlights: [
          'Master Figma Components, Variants & Auto-Layout 5.0',
          'End-to-end UX Case Studies for your Portfolio',
          'Design System creation from scratch',
          'Direct mentorship and portfolio reviews'
        ],
        prerequisites: ['No design or drawing skills required. Just a computer and curiosity!'],
        learningOutcomes: [
          'Build complete mobile app and web SaaS interfaces in Figma',
          'Conduct UX user interviews and build customer journey maps',
          'Create comprehensive design systems with responsive tokens'
        ],
        curriculum: [
          {
            title: 'Module 1: Design Principles & Figma Mastery',
            duration: '20 Hours',
            description: 'Color theory, typography hierarchy, Figma auto-layout, and micro-interactions.',
            topics: [{ title: 'Mastering Auto-Layout & Responsive Constraints', duration: '60 mins', isFreePreview: true }]
          }
        ],
        faqs: [
          { question: 'Do I need paid Figma software?', answer: 'No, free Figma is 100% sufficient for all course projects.' }
        ]
      }
    ];

    const insertedCourses = await Course.insertMany(coursesData);
    console.log(`📚 Created ${insertedCourses.length} Comprehensive Courses.`);

    // 4. Enroll student in first course & create order
    const firstCourse = insertedCourses[0];
    const initialOrder = await Order.create({
      user: studentUser._id,
      orderItems: [
        {
          course: firstCourse._id,
          title: firstCourse.title,
          price: firstCourse.discountPrice,
          thumbnail: firstCourse.thumbnail
        }
      ],
      totalAmount: firstCourse.price,
      discountAmount: firstCourse.price - firstCourse.discountPrice,
      finalAmount: firstCourse.discountPrice,
      paymentStatus: 'paid',
      paymentMethod: 'Razorpay',
      razorpayOrderId: 'order_CDDEMO998877',
      razorpayPaymentId: 'pay_CDDEMO554433',
      paidAt: new Date(),
      billingDetails: {
        name: studentUser.name,
        email: studentUser.email,
        phone: studentUser.phone,
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001'
      }
    });

    await Enrollment.create({
      user: studentUser._id,
      course: firstCourse._id,
      order: initialOrder._id,
      status: 'active',
      progressPercent: 45,
      completedTopics: ['JavaScript Execution Context & Call Stack', 'Promises, Async/Await & Microtasks']
    });

    console.log('🎓 Created Student Initial Enrollment & Order.');

    // 5. Placements
    const placementsData = [
      {
        studentName: 'Nitheesh Kumar',
        companyName: 'CMA CGM',
        jobRole: 'Management Trainee',
        courseTaken: 'AUTO CAD',
        salaryPackage: '6.5 LPA',
        year: 2026,
        studentAvatar: '/placements/nitheesh_kumar.png',
        companyLogo: '/placements/cma_cgm.png',
        testimonial: 'Course Divine AutoCAD training gave me deep industry drafting skills that helped me secure the Management Trainee role at CMA CGM.'
      },
      {
        studentName: 'Yerrawar Vasavi',
        companyName: 'Aira Interiors',
        jobRole: 'Interior Designer',
        courseTaken: 'STAAD PRO',
        salaryPackage: '5.8 LPA',
        year: 2026,
        studentAvatar: '/placements/yerrawar_vasavi.png',
        companyLogo: '/placements/aira_interiors.png',
        testimonial: 'The hands-on structural and design modeling in STAAD Pro was instrumental in cracking my interview at Aira Interiors.'
      },
      {
        studentName: 'Arigala Hema',
        companyName: 'NIIT Foundation',
        jobRole: 'IT Trainer',
        courseTaken: 'Digital Marketing',
        salaryPackage: '6.0 LPA',
        year: 2026,
        studentAvatar: '/placements/arigala_hema.png',
        companyLogo: '/placements/niit_foundation.png',
        testimonial: 'Comprehensive digital marketing strategies and live campaign management at Course Divine prepared me thoroughly to become an IT Trainer at NIIT Foundation.'
      },
      {
        studentName: 'Sanjoy Kumar Samal',
        companyName: 'Magma HDI General Insurance Company',
        jobRole: 'Asst. Manager Banking Operation',
        courseTaken: 'Data Science',
        salaryPackage: '8.5 LPA',
        year: 2026,
        studentAvatar: '/placements/sanjoy_kumar_samal.png',
        companyLogo: '/placements/magma_hdi.png',
        testimonial: 'Learning data science analytics and statistical automation gave me a competitive edge for the Assistant Manager position at Magma HDI.'
      },
      {
        studentName: 'Basagalla Naveen',
        companyName: 'Venas Engineering Consultants',
        jobRole: 'Structural Design Engineer',
        courseTaken: 'STAAD PRO E TAB',
        salaryPackage: '7.2 LPA',
        year: 2026,
        studentAvatar: '/placements/basagalla_naveen.png',
        companyLogo: '/placements/venus_engineering.png',
        testimonial: 'The combined STAAD Pro and ETABS design curriculum provided real-world structural modeling experience needed for Venas Engineering Consultants.'
      },
      {
        studentName: 'Uppala Sai Chandhu',
        companyName: 'Big Bull',
        jobRole: 'Capital Market Intern',
        courseTaken: 'AUTO CAD',
        salaryPackage: '5.5 LPA',
        year: 2026,
        studentAvatar: '/placements/uppala_sai_chandhu.png',
        companyLogo: '/placements/big_bull.png',
        testimonial: 'The discipline, technical problem solving, and analytical foundation I gained at Course Divine helped me excel at Big Bull.'
      },
      {
        studentName: 'Vivek Sharma Patel',
        companyName: 'Infosys',
        jobRole: 'Infrastructure Architect IT',
        courseTaken: 'AI & ML',
        salaryPackage: '16.5 LPA',
        year: 2026,
        studentAvatar: '/placements/vivek_sharma_patel.png',
        companyLogo: '/placements/infosys.png',
        testimonial: 'The advanced AI & Machine Learning curriculum and deep architectural case studies helped me transition into an Infrastructure Architect role at Infosys.'
      },
      {
        studentName: 'Sailaxman Bugatha',
        companyName: 'Tata Consultancy Services (TCS)',
        jobRole: 'IT Trainer',
        courseTaken: 'Cybersecurity',
        salaryPackage: '7.5 LPA',
        year: 2026,
        studentAvatar: '/placements/sailaxman_bugatha.png',
        companyLogo: '/placements/tcs.png',
        testimonial: 'Practical ethical hacking and cybersecurity labs at Course Divine provided the exact domain depth required to train and lead at TCS.'
      },
      {
        studentName: 'Amit Preet Singh',
        companyName: 'Wipro',
        jobRole: 'Junior Engineer',
        courseTaken: 'Data Analytics',
        salaryPackage: '6.8 LPA',
        year: 2026,
        studentAvatar: '/placements/amit_preet_singh.png',
        companyLogo: '/placements/wipro.png',
        testimonial: 'Hands-on SQL, Python, and Power BI dashboards in the Data Analytics course made my interview rounds at Wipro seamless.'
      },
      {
        studentName: 'Siva Prasad Patro',
        companyName: 'Century Pulp & Paper (CPP)',
        jobRole: 'Mechanical Engineer',
        courseTaken: 'Project Management Professional (PMP)',
        salaryPackage: '8.2 LPA',
        year: 2026,
        studentAvatar: '/placements/siva_prasad_patro.png',
        companyLogo: '/placements/century_pulp_paper.png',
        testimonial: 'The PMP framework and engineering project management workflows from Course Divine gave me the leadership skills to excel at Century Pulp & Paper.'
      }
    ];
    await Placement.insertMany(placementsData);
    console.log('🏆 Created Placement Showcase Records.');

    // 6. Testimonials
    const testimonialsData = [
      {
        name: 'Arjun Nambiar',
        role: 'Full Stack Engineer',
        company: 'Zoho Corporation',
        courseTaken: 'Full Stack Web Development',
        content: 'Course Divine provides the highest quality technical education with zero fluff. Every single project I built during the program is currently featured on my GitHub and helped me secure 3 separate job offers!',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        rating: 5
      },
      {
        name: 'Divya Sharma',
        role: 'AI Researcher',
        company: 'Fractal Analytics',
        courseTaken: 'Data Science & AI Bootcamp',
        content: 'The clarity with which complex neural networks, transformers, and mathematical proofs were explained is phenomenal. Best investment in my tech career.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        rating: 5
      },
      {
        name: 'Harish Kalyan',
        role: 'DevOps Specialist',
        company: 'Cognizant',
        courseTaken: 'Cloud Computing & DevOps',
        content: 'The mentors are active industry practitioners who review your code line by line. I transitioned from a non-IT background to a high-paying DevOps role within 5 months.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        rating: 5
      }
    ];
    await Testimonial.insertMany(testimonialsData);

    // 7. Blog Posts
    const blogsData = [
      {
        title: 'AI-Proof Careers: Which Skills Are Worth Learning in 2026?',
        slug: 'ai-proof-careers-which-skills-are-worth-learning-2026',
        excerpt: 'Artificial intelligence is changing how organisations operate. Discover how to become AI-ready by combining technology literacy with judgement, problem-solving, and practical expertise.',
        category: 'Career Intelligence',
        tags: ['Career Intelligence', 'Artificial Intelligence', 'AI Skills', 'Future of Work', 'Career Roadmap'],
        content: `Artificial intelligence is changing how organisations operate and how professionals create value. Tasks involving research, content, analysis, coding and routine decision-making can increasingly be supported by AI. For students and professionals, the question is no longer whether AI will influence careers, but how to develop the capabilities that remain valuable as technology evolves. There is no such thing as a completely AI-proof career. A more useful goal is to become AI-ready: combine technology literacy with strong judgement, problem-solving, communication and practical expertise.

### 1. Build AI Literacy
You do not need to become an AI engineer to work effectively with AI. Learn how generative AI works at a practical level, how to write effective instructions, how to evaluate outputs, how to protect sensitive information and how AI can be applied within your field.

### 2. Develop Data Fluency
Data is now part of decision-making across industries. Excel, SQL, Power BI, Python, statistics and data visualisation can help you turn information into useful insights.

### 3. Strengthen Cybersecurity Awareness
As organisations become more digital, cybersecurity skills are increasingly relevant. Depending on your career direction, this can lead to areas such as security operations, cloud security, risk management and security analysis.

### 4. Invest in Analytical Thinking
AI can generate answers, but professionals still need to determine which questions matter, evaluate evidence, identify assumptions and make sound decisions.

### 5. Improve Communication and Collaboration
The ability to explain complex ideas, work across teams and communicate with stakeholders remains highly valuable—even in highly technical roles.

### 6. Become Adaptable
Tools will change. Platforms will change. Job descriptions will change. The ability to learn new tools quickly may therefore be one of the most durable career advantages.

---

### Key Takeaway
A future-ready profile is not built by avoiding AI. It is built by combining AI literacy with domain expertise, practical experience and human judgement. Learn a skill, apply it to real problems, document your work and keep developing.`,
        coverImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
        readTime: '5 min read',
        author: {
          name: 'Course Divine Career Intelligence',
          role: 'Career Mentorship Panel'
        }
      },
      {
        title: 'Degree vs Skills: What Actually Gets You Hired?',
        slug: 'degree-vs-skills-what-actually-gets-you-hired',
        excerpt: 'A degree remains an important foundation, but graduation alone does not demonstrate workplace capability. The strongest formula is: Degree + Skills + Projects + Proof.',
        category: 'Career Intelligence',
        tags: ['Career Intelligence', 'Jobs', 'Hiring', 'Portfolio', 'Degree vs Skills'],
        content: `A degree remains an important foundation for many careers, but graduation alone does not demonstrate how effectively a candidate can apply knowledge in a workplace. Employers increasingly need evidence of capability: relevant skills, practical projects, experience and the ability to communicate what you have accomplished. The strongest approach is not degree versus skills. It is degree plus skills plus proof.

### Your Degree Provides the Foundation
A degree gives you structured knowledge, discipline-specific concepts and opportunities to develop teamwork, communication and problem-solving.

### Skills Demonstrate Capability
Learning SQL, Python, CAD, digital marketing, cybersecurity or another professional skill gives you something concrete to apply. The value increases when you can demonstrate how you used it.

### Projects Turn Knowledge Into Evidence
A project answers the question: 'What can you actually do?' A documented dashboard, engineering design, marketing campaign, software application or research analysis is stronger evidence than a course title alone.

### Experience Adds Context
Internships, mentored projects, freelance assignments and practical training show that you can work within real constraints, accept feedback and deliver an outcome.

### Certificates Have a Role—But They Are Not the Whole Profile
A certificate can verify that you completed structured learning. It becomes more valuable when supported by projects, practical application and relevant experience.

### A Stronger Career Formula
Think of your profile as:
**Degree → Skill → Project → Experience → Portfolio → Job Readiness.**

---

### Key Takeaway
Your degree tells an employer what you studied. Your skills show what you can do. Your projects provide evidence. Your experience shows how you apply those skills. Build all four together.`,
        coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
        readTime: '4 min read',
        author: {
          name: 'Course Divine Career Intelligence',
          role: 'Career Mentorship Panel'
        }
      },
      {
        title: "You Don't Need 10 Certificates. You Need One Strong Skill.",
        slug: 'you-dont-need-10-certificates-you-need-one-strong-skill',
        excerpt: 'Professional development is not a numbers game of collecting badges. Discover how to build depth, master a skill stack, and execute the Learn-Build-Demonstrate cycle.',
        category: 'Career Intelligence',
        tags: ['Career Intelligence', 'Skills', 'Certifications', 'Portfolio', 'Career Growth'],
        content: `Professional development can easily become a numbers game: another course, another certificate, another badge. But a long list of completed courses does not automatically translate into professional capability. The better question is not 'How many certificates do I have?' It is 'What can I confidently build, solve or improve because of what I have learned?'

### Choose a Skill With a Clear Career Outcome
Start with a direction rather than a course catalogue. For example: data analytics, digital marketing, engineering design, cybersecurity or software development.

### Build a Skill Stack
One strong skill becomes more powerful when paired with complementary capabilities. A data analyst might combine Excel, SQL, Power BI and data storytelling. A mechanical designer might combine CAD, SolidWorks, engineering drawing and simulation.

### Use the Learn–Build–Demonstrate Cycle
Learn the concept, practise it, build something realistic, document your decisions and showcase the outcome. This creates evidence that can be discussed in interviews.

### Choose Quality Over Quantity
Three well-executed projects are usually more useful for demonstrating capability than twenty unrelated certificates.

### Make Your Learning Visible
Document projects on LinkedIn, GitHub, a personal website, Behance or another relevant portfolio platform. Explain the problem, your approach, tools, results and lessons learned.

---

### Key Takeaway
You do not need to know everything. You need to become genuinely useful at something. Choose a direction, develop depth, build evidence and then add complementary skills.`,
        coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
        readTime: '4 min read',
        author: {
          name: 'Course Divine Career Intelligence',
          role: 'Career Mentorship Panel'
        }
      },
      {
        title: 'How to Choose the Right Career Path After Engineering',
        slug: 'how-to-choose-the-right-career-path-after-engineering',
        excerpt: 'Software, data, AI, cybersecurity, core engineering, design, and marketing are all possible directions. Here is a structured process to find the right path after your degree.',
        category: 'Career Intelligence',
        tags: ['Career Intelligence', 'Engineering', 'Career Roadmap', 'Students', 'Tech Careers'],
        content: `An engineering degree can open many doors—but that can also make the next decision difficult. Software, data, AI, cybersecurity, core engineering, design, management and entrepreneurship are all possible directions. Instead of choosing only because a field is popular, use a structured process that considers your strengths, interests, market demand and the kind of work you actually want to do.

### Start With Self-Assessment
Ask what kind of problems you enjoy solving. Do you prefer programming, numbers, design, systems, machines, communication, business or creative work?

### Understand Career Families
- **Data & Analytics**: Suit people who enjoy numbers and structured problem-solving.
- **AI & Machine Learning**: Require stronger programming and mathematical foundations.
- **Cybersecurity**: Suits those interested in systems and security.
- **Engineering Design**: Can suit students interested in CAD, modelling and simulation.
- **Digital Marketing**: Combines technology, communication, creativity and business.

### Test Before You Commit
Do a small project, take an introductory module, speak to someone in the field or shadow a real workflow. Testing a path is more reliable than choosing from job titles alone.

### Build a Focused Roadmap
Once you choose a direction, structure your development as:
**Foundation → Core Skill → Tools → Projects → Internship → Portfolio → Career Preparation.**

### Review and Adjust
Career planning is not a one-time decision. Your first project or internship may reveal that another specialisation suits you better. Adjusting early is a strength, not a failure.

---

### Key Takeaway
Your engineering degree does not have to determine your entire career. Think of it as a foundation—and decide deliberately what you want to build on top of it.`,
        coverImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        readTime: '5 min read',
        author: {
          name: 'Course Divine Career Intelligence',
          role: 'Career Mentorship Panel'
        }
      },
      {
        title: 'Your First Internship: What Should You Actually Look For?',
        slug: 'your-first-internship-what-should-you-actually-look-for',
        excerpt: 'An internship should be more than a line on a resume. Learn how to evaluate mentorship, project-based deliverables, and how to turn real experience into portfolio evidence.',
        category: 'Career Intelligence',
        tags: ['Career Intelligence', 'Internships', 'Experience', 'Mentorship', 'Students'],
        content: `An internship should be more than a line on a resume. At its best, it gives you a controlled environment in which to apply knowledge, receive feedback, work on realistic problems and understand what a professional role actually involves. Before choosing an internship, ask what you will learn, build and be able to demonstrate when it ends.

### Look Beyond the Certificate
Ask what work you will perform, which tools you will use and whether the programme includes meaningful mentorship and assessment.

### Prioritise Project-Based Experience
A project gives you something concrete to discuss during interviews. The strongest internships allow you to contribute to a defined outcome rather than simply attend sessions.

### Match the Internship to Your Career Goal
- A future **data analyst** should seek analysis and dashboard work.
- A **digital marketer** should seek campaigns, SEO or analytics.
- An **engineering student** should seek CAD, simulation or design exposure.

### Ask the Right Questions Before Joining
- Who is the mentor?
- What will I build?
- How will my work be evaluated?
- What tools will I use?
- Can I showcase the outcome?
- What support is available?

### Turn the Experience Into Evidence
At the end, document the problem, your contribution, tools used, decisions made and results. This turns an internship from a certificate into a portfolio asset.

---

### Key Takeaway
Your first internship does not need to be perfect. It needs to provide experience, evidence and direction. Choose learning and meaningful work over a certificate alone.`,
        coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        readTime: '4 min read',
        author: {
          name: 'Course Divine Career Intelligence',
          role: 'Career Mentorship Panel'
        }
      },
      {
        title: 'How to Build a Job-Ready Portfolio With No Work Experience',
        slug: 'how-to-build-a-job-ready-portfolio-with-no-work-experience',
        excerpt: 'Fresh graduates often face the experience paradox. Discover how three well-documented, progressive projects can give employers the proof they need to hire you.',
        category: 'Career Intelligence',
        tags: ['Career Intelligence', 'Portfolio', 'Resume', 'Freshers', 'Job Search'],
        content: `One of the most frustrating challenges for fresh graduates is being told that employers want experience when they have not yet had an opportunity to gain it. A well-built portfolio can help bridge that gap by giving employers evidence of what you can do. You do not need years of professional experience to create credible work. You need relevant, well-documented projects.

### Start With Three Strong Projects
Choose projects that demonstrate progression:
1. One showing fundamentals.
2. One solving a realistic problem.
3. One representing your strongest work.

### Make Projects Relevant
- **Data Portfolio**: Include dashboards and business analysis.
- **Engineering Portfolio**: Include CAD models, assemblies or simulation work.
- **Marketing Portfolio**: Include campaign strategy, SEO research and performance analysis.

### Document the Thinking
For each project, explain the problem, objective, tools, process, your contribution, results and lessons learned. Employers want to understand how you think—not just see the final image.

### Showcase Work Professionally
Use LinkedIn, GitHub, Behance, a personal website or a well-designed PDF portfolio depending on your field.

### Connect Projects to Your Career Goal
A portfolio should tell a coherent story. If you want to become a data analyst, most of your work should support that positioning rather than showing unrelated skills.

---

### Key Takeaway
Your portfolio is your answer to one of the most important hiring questions: 'What can you actually do?' Build evidence before you wait for someone to give you the opportunity.`,
        coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
        readTime: '5 min read',
        author: {
          name: 'Course Divine Career Intelligence',
          role: 'Career Mentorship Panel'
        }
      },
      {
        title: 'Data Science vs AI vs Data Analytics: Which Path Is Right for You?',
        slug: 'data-science-vs-ai-vs-data-analytics-which-path-is-right-for-you',
        excerpt: 'Data Analytics, Data Science, and AI overlap but require different skills. Learn the key differences and how to pick the right path based on the daily work you enjoy.',
        category: 'Career Intelligence',
        tags: ['Career Intelligence', 'Data Science', 'Artificial Intelligence', 'Data Analytics', 'Career Comparison'],
        content: `Data Analytics, Data Science and Artificial Intelligence overlap, but they are not identical career paths. Choosing between them becomes easier when you understand the type of problems each field typically addresses and the skills involved.

### Data Analytics
Data analysts turn existing information into insights that support business and operational decisions. Common skills include Excel, SQL, Power BI, data visualisation and analytical thinking.

### Data Science
Data science combines programming, statistics and modelling to identify patterns and build predictive solutions. Python, SQL, statistics and machine learning are common foundations.

### Artificial Intelligence and Machine Learning
AI and ML focus on building systems that can learn from data or perform tasks associated with intelligent decision-making. Depending on the role, skills may include Python, mathematics, machine learning, deep learning and generative AI.

### Choose by the Work, Not the Title
- If you enjoy **business questions and dashboards**, analytics may be a better starting point.
- If you enjoy **statistics and modelling**, data science may fit.
- If you are drawn to **programming and intelligent systems**, AI/ML may be the stronger direction.

### Build Before You Specialise
Try a small project in your preferred area. Real exposure will tell you more about fit than a job title or trend report.

---

### Key Takeaway
Don't choose a career simply because it is trending. Ask what kind of problems you want to solve and what type of work you want to perform every day.`,
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        readTime: '4 min read',
        author: {
          name: 'Course Divine Career Intelligence',
          role: 'Career Mentorship Panel'
        }
      },
      {
        title: 'The 6-Month Job-Ready Roadmap for Students',
        slug: 'the-6-month-job-ready-roadmap-for-students',
        excerpt: "Six months can transform a student's profile when used with focus. Here is a month-by-month framework from choosing a direction to gaining internship experience and landing interviews.",
        category: 'Career Intelligence',
        tags: ['Career Intelligence', 'Roadmap', 'Job Readiness', 'Students', 'Career Guide'],
        content: `Six months can significantly strengthen a student's professional profile when the time is used with focus. The goal is not to complete as many courses as possible. The goal is to develop one relevant skill, build evidence, gain practical exposure and become confident enough to discuss your work.

### Month 1 — Choose Your Direction
Select one primary career path. Review job descriptions, identify common skills and choose a realistic target.

### Month 2 — Build the Foundation
Learn the core concepts and tools required for your direction. Focus on understanding rather than collecting certificates.

### Month 3 — Build Your First Project
Move from learning to application. Choose a realistic problem, complete a project and document your process.

### Month 4 — Build Two More Projects
Increase complexity and demonstrate progression. Aim for quality, variety and relevance to your target role.

### Month 5 — Gain Practical Experience
Seek an internship, mentored project, freelance assignment, industry challenge or other structured opportunity to work with real constraints.

### Month 6 — Become Career Ready
Refine your resume, LinkedIn profile and portfolio. Practise explaining your projects, prepare for interviews and begin targeted applications.

### The Formula
**Choose → Learn → Build → Build More → Gain Experience → Showcase → Apply.**

---

### Key Takeaway
Job readiness is not about knowing everything. It is the ability to demonstrate a useful skill, explain how you applied it and show evidence of your learning. Six focused months can create that foundation.`,
        coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        readTime: '5 min read',
        author: {
          name: 'Course Divine Career Intelligence',
          role: 'Career Mentorship Panel'
        }
      }
    ];
    await BlogPost.insertMany(blogsData);
    console.log('✍️ Created Blog Articles.');

    // 8. Verified Sample Certificate
    await Certificate.create({
      certificateId: 'CD-CERT-884920',
      user: studentUser._id,
      studentName: studentUser.name,
      course: firstCourse._id,
      courseTitle: firstCourse.title,
      grade: 'Distinction (A+)',
      issueDate: new Date('2025-11-15')
    });
    console.log('📜 Created Verifiable Sample Certificate (ID: CD-CERT-884920).');

    // 9. Sample Internship Application
    await Internship.create({
      name: 'Rohan Sharma',
      email: 'student@coursedivine.com',
      phone: '+91 9811223344',
      college: 'National Institute of Technology',
      domain: 'Full Stack Web Development',
      duration: '3 Months',
      status: 'Accepted',
      notes: 'Strong JavaScript fundamentals and clean GitHub portfolio.',
      user: studentUser._id
    });
    console.log('💼 Created Sample Internship Application.');

    console.log('🎉 SEEDING COMPLETED SUCCESSFULLY!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
