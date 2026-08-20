require('dotenv').config();
const mongoose = require('mongoose');
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
    await mongoose.connect(mongoUri);
    console.log('🌱 Connected to MongoDB for seeding...');

    // Clear existing collections
    await User.deleteMany({});
    await Course.deleteMany({});
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
        studentName: 'Aman Deep Verma',
        courseTaken: 'Full Stack Web Development (MERN)',
        companyName: 'Microsoft',
        jobRole: 'Software Development Engineer I',
        salaryPackage: '24.5 LPA',
        year: 2025,
        testimonial: 'The project-driven curriculum and live mentorship at Course Divine gave me the confidence to crack high-standard technical interview rounds at Microsoft.',
        studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'
      },
      {
        studentName: 'Priya Sundaram',
        courseTaken: 'Data Science & AI Bootcamp',
        companyName: 'Amazon',
        jobRole: 'Data Scientist',
        salaryPackage: '22.0 LPA',
        year: 2025,
        testimonial: 'The hands-on NLP and LLM projects made my resume stand out among hundreds of applicants. The placement team is truly dedicated!',
        studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
      },
      {
        studentName: 'Karthik Rao',
        courseTaken: 'Cloud Computing & DevOps Engineer',
        companyName: 'Deloitte',
        jobRole: 'Cloud DevOps Consultant',
        salaryPackage: '14.2 LPA',
        year: 2025,
        testimonial: 'From zero cloud knowledge to deploying multi-region Kubernetes clusters on AWS, Course Divine transformed my career trajectory.',
        studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      },
      {
        studentName: 'Sneha Patel',
        courseTaken: 'UI/UX Design Masterclass',
        companyName: 'Swiggy',
        jobRole: 'Associate Product Designer',
        salaryPackage: '12.8 LPA',
        year: 2025,
        testimonial: 'The design systems and live user feedback sessions helped me craft a portfolio that got selected in the very first interview round.',
        studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
      },
      {
        studentName: 'Rahul Deshmukh',
        courseTaken: 'Java & Spring Boot Microservices',
        companyName: 'Oracle',
        jobRole: 'Backend Engineer',
        salaryPackage: '18.0 LPA',
        year: 2024,
        testimonial: 'The deep architectural focus on microservices and Kafka gave me practical knowledge that surpassed standard university courses.',
        studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
      },
      {
        studentName: 'Neha Kapoor',
        courseTaken: 'Cyber Security & Ethical Hacking',
        companyName: 'PwC India',
        jobRole: 'Cyber Security Analyst',
        salaryPackage: '11.5 LPA',
        year: 2024,
        testimonial: 'Practical penetration testing labs and real-world vulnerability assessment scenarios gave me unmatched hands-on expertise.',
        studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
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
        title: 'Top 10 High-Paying Tech Skills in Demand for 2026',
        slug: 'top-10-high-paying-tech-skills-in-demand-2026',
        excerpt: 'Discover which technologies, frameworks, and engineering competencies companies are actively hiring for with high compensation packages.',
        category: 'Career Guide',
        tags: ['Career', 'Web Development', 'AI', 'Cloud'],
        content: `
### The Tech Landscape in 2026

The software industry is experiencing a profound transition towards full-stack autonomy, AI-augmented engineering, and cloud-native resilience. 

Here are the top skillsets commanding premium compensation packages:

#### 1. Full Stack Next.js & React 18+ Architecture
Companies require engineers who understand the entire request lifecycle—from server-rendered React components to microservice backends and database query optimization.

#### 2. Applied Generative AI & Retrieval-Augmented Generation (RAG)
Building intelligence into consumer apps using LangChain, Vector databases (like Pinecone & Milvus), and local LLMs is now a core requirement.

#### 3. Kubernetes & Cloud Native DevOps
Automating multi-region cloud deployments with Terraform and managing container orchestration on Kubernetes has become standard practice.

#### 4. Cybersecurity & Zero-Trust Architecture
With rising cyber incidents, penetration testing, secure code review, and automated vulnerability scanning are top priorities.
        `,
        coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        readTime: '6 min read',
        author: {
          name: 'Course Divine Editorial Team',
          role: 'Tech Career Mentors',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
        }
      },
      {
        title: 'Roadmap to Becoming a Production-Ready Full Stack Developer',
        slug: 'roadmap-to-becoming-a-production-ready-full-stack-developer',
        excerpt: 'A step-by-step roadmap to mastering front-end, back-end, database design, and cloud deployments efficiently.',
        category: 'Development',
        tags: ['React', 'NodeJS', 'FullStack', 'Roadmap'],
        content: `
### Step-by-Step Learning Strategy

Becoming an industry-ready full-stack developer is about understanding system architecture rather than just memorizing syntax.

1. **JavaScript Core Foundations**: Master asynchronous programming, event loop, and modular code patterns.
2. **Component Architecture with React**: Learn state management, custom hooks, and Tailwind CSS.
3. **Robust Backend with Node & Express**: Build REST APIs with JWT authentication and role-based permissions.
4. **Database Mastery**: Understand schema design, indexing, and transactional integrity in MongoDB & PostgreSQL.
5. **Real-world Deployment**: Deploy via Docker, configure reverse proxies with Nginx, and manage AWS instances.
        `,
        coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
        readTime: '5 min read',
        author: {
          name: 'Vikramaditya Sengupta',
          role: 'Lead Architect',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        }
      },
      {
        title: 'How to Crack Technical Interviews at Top Product Companies',
        slug: 'how-to-crack-technical-interviews-at-top-product-companies',
        excerpt: 'Proven strategies for DSA problem solving, system design rounds, and behavioral communication.',
        category: 'Interview Prep',
        tags: ['Interview', 'DSA', 'System Design', 'Jobs'],
        content: `
### Mastering the Technical Interview Loop

Cracking interviews at top product organizations requires a balanced blend of problem solving and communication skills:

- **DSA Consistency**: Focus on patterns (Two Pointers, Sliding Window, Graph BFS/DFS) rather than memorizing questions.
- **Explain Your Thought Process**: Interviewers care as much about how you think through edge cases as the final code.
- **System Design Fundamentals**: Be prepared to discuss scalability, caching (Redis), rate limiting, and database sharding.
- **Demonstrate Real Project Depth**: Speak passionately about architecture decisions and trade-offs you made in your portfolio projects.
        `,
        coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        readTime: '7 min read',
        author: {
          name: 'Pooja Iyer',
          role: 'Design & Career Lead',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
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
