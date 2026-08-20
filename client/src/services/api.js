import axios from 'axios';

// In-Memory Fallback Seed Store with All Verified Course Divine Courses & US Dollars ($)
export const fallbackStore = {
  categories: [
    { _id: 'cat1', name: 'Software & Web Development', slug: 'software-web-development', description: 'Python, .NET, Node.js, Web Development & Full Stack.', icon: 'Code', courseCount: 10 },
    { _id: 'cat2', name: 'Cloud & DevOps', slug: 'cloud-devops', description: 'AWS, Azure AI Infrastructure, DevOps Production & Oracle Cloud.', icon: 'Cloud', courseCount: 8 },
    { _id: 'cat3', name: 'Enterprise ERP & SAP', slug: 'enterprise-erp-sap', description: 'SAP ABAP S/4HANA, SAP Fiori, SAP HCM, SAP FSCD & Oracle Fusion.', icon: 'Brain', courseCount: 7 },
    { _id: 'cat4', name: 'Data Science & AI', slug: 'data-science-ai', description: 'Machine Learning, Prompt Engineering, SAS, STATA, R & Analytics.', icon: 'Brain', courseCount: 9 },
    { _id: 'cat5', name: 'Engineering & Industrial Tech', slug: 'engineering-industrial-tech', description: 'VLSI, Industry 4.0, PLC, Digital Twin, BIM, ETABS & Abaqus.', icon: 'Terminal', courseCount: 12 },
    { _id: 'cat6', name: 'Design & Management', slug: 'design-management', description: 'UI/UX Design, Product Management & Video Editing with AI.', icon: 'Layout', courseCount: 4 },
    { _id: 'cat7', name: 'Specialized Certifications', slug: 'specialized-certifications', description: 'Pega LSA, CDPP Data Privacy, Gold Appraisal & Specialized Tracks.', icon: 'Shield', courseCount: 5 }
  ],
  courses: [
    // Top Feature Courses
    {
      _id: 'top-c1',
      title: 'Data Science & AI Masterclass Certified Course',
      slug: 'data-science-ai-masterclass-certified-course',
      subtitle: 'Python, Machine Learning, Deep Learning, NLP & Generative AI.',
      description: 'Comprehensive industry training covering predictive modeling, neural networks, LLMs, statistics, and live capstone deployments with guaranteed internship.',
      category: 'Data Science & AI',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      level: 'Beginner to Advanced',
      duration: '120 Hours (14 Weeks)',
      price: 599,
      discountPrice: 499,
      rating: 4.95,
      numReviews: 420,
      isFeatured: true,
      isPopular: true
    },
    {
      _id: 'top-c2',
      title: 'Digital Marketing & Growth Mastery Certified Course',
      slug: 'digital-marketing-growth-mastery-certified-course',
      subtitle: 'SEO, Google Ads, Meta Ads, Performance Marketing & GA4.',
      description: 'Master omnichannel customer acquisition, brand storytelling, high-converting ad funnels, content marketing, and growth analytics on real ad budgets.',
      category: 'Design & Management',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '80 Hours (10 Weeks)',
      price: 450,
      discountPrice: 380,
      rating: 4.91,
      numReviews: 310,
      isFeatured: true,
      isPopular: true
    },
    {
      _id: 'top-c3',
      title: 'SolidWorks 3D CAD & Mechanical Design Certified Course',
      slug: 'solidworks-3d-cad-mechanical-design-certified-course',
      subtitle: 'Part Modeling, Assembly, Sheet Metal, CSWA & CSWP Prep.',
      description: 'Industry-standard mechanical product modeling, parametric sheet metal fabrication, motion simulation, drawing detailing, and CSWA/CSWP preparation.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      level: 'Intermediate',
      duration: '90 Hours (12 Weeks)',
      price: 520,
      discountPrice: 440,
      rating: 4.93,
      numReviews: 280,
      isFeatured: true,
      isPopular: true
    },
    {
      _id: 'top-c4',
      title: 'ANSYS FEA & CFD Simulation Engineering Certified Course',
      slug: 'ansys-fea-cfd-simulation-engineering-certified-course',
      subtitle: 'Static Structural, Thermal Analysis, Fluent CFD & Modal Dynamics.',
      description: 'Finite element analysis (FEA) and computational fluid dynamics (CFD) using ANSYS Workbench, meshing algorithms, structural failure prediction, and thermal flows.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      level: 'Advanced',
      duration: '100 Hours (12 Weeks)',
      price: 580,
      discountPrice: 490,
      rating: 4.94,
      numReviews: 260,
      isFeatured: true,
      isPopular: true
    },
    {
      _id: 'top-c5',
      title: 'Python Programming & Data Analytics Certified Course',
      slug: 'python-programming-data-analytics-certified-course',
      subtitle: 'Core Python, Pandas, NumPy, SQL, Power BI & Data Automation.',
      description: 'Go from syntax to building data automation pipelines, web scraping tools, SQL analytics pipelines, and interactive BI dashboards.',
      category: 'Software & Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      level: 'Beginner',
      duration: '75 Hours (8 Weeks)',
      price: 420,
      discountPrice: 350,
      rating: 4.92,
      numReviews: 390,
      isFeatured: true,
      isPopular: true
    },
    {
      _id: 'top-c6',
      title: 'UI/UX Design Masterclass & Product Strategy Certified Course',
      slug: 'ui-ux-design-course-certified-course',
      subtitle: 'Figma, Design Systems, User Research, Wireframing & Prototyping.',
      description: 'Craft user-centric interfaces, high-fidelity prototypes, user research interviews, accessibility compliance, and design system architectures in Figma.',
      category: 'Design & Management',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '85 Hours (10 Weeks)',
      price: 460,
      discountPrice: 390,
      rating: 4.96,
      numReviews: 340,
      isFeatured: true,
      isPopular: true
    },
    // 1. Professional Video Editing with AI Certified Course
    {
      _id: 'c1',
      title: 'Professional Video Editing with AI Certified Course',
      slug: 'professional-video-editing-with-ai-certified-course',
      subtitle: 'Premiere Pro, DaVinci Resolve, After Effects & Generative AI Video Tools.',
      description: 'Master professional cinematic storytelling, color grading, VFX compositing, audio mastering, and AI-accelerated workflows like Runway, Sora, and ElevenLabs.',
      category: 'Design & Management',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '70 Hours (8 Weeks)',
      price: 480,
      discountPrice: 430,
      rating: 4.9,
      numReviews: 240,
      isFeatured: true,
      isPopular: true
    },
    // 2. Microsoft Azure AI Infrastructure & DevOps Engineer Certified Course
    {
      _id: 'c2',
      title: 'Microsoft Azure AI Infrastructure & DevOps Engineer Certified Course',
      slug: 'microsoft-azure-ai-infrastructure-devops-engineer-certified-course',
      subtitle: 'Azure AI Studio, OpenAI Service, Kubernetes AKS, Terraform & CI/CD.',
      description: 'Design, implement, and monitor enterprise Azure AI infrastructure, large scale machine learning model deployment pipelines, and automated cloud infrastructure with Terraform.',
      category: 'Cloud & DevOps',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      level: 'Advanced',
      duration: '110 Hours (14 Weeks)',
      price: 720,
      discountPrice: 660,
      rating: 4.95,
      numReviews: 380,
      isFeatured: true,
      isPopular: true
    },
    // 3. Autodesk Moldflow Analysis Training Certified Course
    {
      _id: 'c3',
      title: 'Autodesk Moldflow Analysis Training Certified Course',
      slug: 'autodesk-moldflow-analysis-training-certified-course',
      subtitle: 'Plastic injection molding simulation, warpage analysis & thermal cooling.',
      description: 'Master injection molding simulation, gate optimization, fill time, shrinkage analysis, cooling circuits, and defects troubleshooting using Autodesk Moldflow.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      level: 'Intermediate',
      duration: '80 Hours (10 Weeks)',
      price: 550,
      discountPrice: 505,
      rating: 4.88,
      numReviews: 190
    },
    // 4. SAP Financial Services Collections & Disbursements (FSCD) Certified Course
    {
      _id: 'c4',
      title: 'SAP Financial Services Collections & Disbursements (FSCD) Certified Course',
      slug: 'sap-financial-services-collections-disbursements-fscd-certified-course',
      subtitle: 'Enterprise billing, multi-currency collections, clearing & dunning processes.',
      description: 'Learn master data configuration, broker collections, payments, dunning, and integration with SAP FI/CO for insurance and banking enterprises.',
      category: 'Enterprise ERP & SAP',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      level: 'Advanced',
      duration: '95 Hours (12 Weeks)',
      price: 695,
      discountPrice: 660,
      rating: 4.92,
      numReviews: 210
    },
    // 5. Oracle Cloud Infrastructure Certified Course
    {
      _id: 'c5',
      title: 'Oracle Cloud Infrastructure Certified Course',
      slug: 'oracle-cloud-infrastructure-certified-course',
      subtitle: 'OCI Architecture, Compute, Autonomous Database, VCN Networking & IAM.',
      description: 'Prepare for OCI Architect Associate & Professional certifications. Build high-availability multi-tenant cloud enterprise solutions.',
      category: 'Cloud & DevOps',
      thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '100 Hours (12 Weeks)',
      price: 899,
      discountPrice: 815,
      rating: 4.94,
      numReviews: 310,
      isFeatured: true
    },
    // 6. Oracle Integration Cloud (OIC) Certified Course
    {
      _id: 'c6',
      title: 'Oracle Integration Cloud (OIC) Certified Course',
      slug: 'oracle-integration-cloud-oic-certified-course',
      subtitle: 'Cloud-to-cloud & On-Premises integrations, Process Automation & Visual Builder.',
      description: 'Master OIC connectors, SOAP/REST adapters, message mappings, B2B integrations, and error handling for global enterprise architectures.',
      category: 'Cloud & DevOps',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      level: 'Intermediate',
      duration: '90 Hours (10 Weeks)',
      price: 840,
      discountPrice: 780,
      rating: 4.89,
      numReviews: 185
    },
    // 7. Oracle Human Capital Management (HCM) Certified Course
    {
      _id: 'c7',
      title: 'Oracle Human Capital Management (HCM) Certified Course',
      slug: 'oracle-human-capital-management-hcm-certified-course',
      subtitle: 'Core HR, Global Payroll, Talent Management, Absence & Fast Formulas.',
      description: 'End-to-end implementation and configuration of Oracle Fusion HCM Cloud modules for enterprise talent lifecycle management.',
      category: 'Enterprise ERP & SAP',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '85 Hours (10 Weeks)',
      price: 600,
      discountPrice: 550,
      rating: 4.87,
      numReviews: 160
    },
    // 8. SAP ABAP on S/4HANA Certified Course
    {
      _id: 'c8',
      title: 'SAP ABAP on S/4HANA Certified Course',
      slug: 'sap-abap-on-s4hana-certified-course',
      subtitle: 'Core Data Services (CDS), ABAP RESTful Programming (RAP), OData & AMDP.',
      description: 'Master modern SAP ABAP programming paradigms, CDS views, AMDP procedures, and building Fiori apps with the ABAP RESTful Application Programming Model.',
      category: 'Enterprise ERP & SAP',
      thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      level: 'Intermediate to Advanced',
      duration: '100 Hours (12 Weeks)',
      price: 575,
      discountPrice: 550,
      rating: 4.93,
      numReviews: 340
    },
    // 9. Prompt Engineering Certified Course
    {
      _id: 'c9',
      title: 'Prompt Engineering Certified Course',
      slug: 'prompt-engineering-certified-course',
      subtitle: 'Generative AI, Large Language Models, Few-Shot Prompting, LangChain & Agentic Workflows.',
      description: 'Learn professional prompt architecture, Chain-of-Thought reasoning, context window optimization, RAG embedding integrations, and building AI agents.',
      category: 'Data Science & AI',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      level: 'Beginner to Advanced',
      duration: '60 Hours (6 Weeks)',
      price: 575,
      discountPrice: 500,
      rating: 4.96,
      numReviews: 450,
      isFeatured: true,
      isPopular: true
    },
    // 10. SAP in (HCM) Human Capital Management Certified Course
    {
      _id: 'c10',
      title: 'SAP in (HCM) Human Capital Management Certified Course',
      slug: 'sap-in-hcm-human-capital-management-certified-course',
      subtitle: 'Organizational Management, Personnel Administration, Time & Payroll.',
      description: 'Comprehensive SAP HR/HCM configuration, infotypes setup, payroll schemas, and personnel development workflows.',
      category: 'Enterprise ERP & SAP',
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '85 Hours (10 Weeks)',
      price: 590,
      discountPrice: 550,
      rating: 4.86,
      numReviews: 170
    },
    // 11. Tekla Training Certified Course
    {
      _id: 'c11',
      title: 'Tekla Training Certified Course',
      slug: 'tekla-training-certified-course',
      subtitle: 'Tekla Structures 3D steel detailing, precast concrete & fabrication drawings.',
      description: 'Learn 3D structural modeling, connection details, bar bending schedules (BBS), erection plans, and NC file export for fabrication.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '80 Hours (10 Weeks)',
      price: 480,
      discountPrice: 430,
      rating: 4.88,
      numReviews: 220
    },
    // 12. C-Programming Language Certified Course
    {
      _id: 'c12',
      title: 'C-Programming Language Certified Course',
      slug: 'c-programming-language-certified-course',
      subtitle: 'Pointers, Dynamic Memory Allocation, Data Structures & Systems Programming.',
      description: 'Master core systems programming, memory registers, linked lists, binary trees, file I/O, bitwise manipulations, and algorithmic problem solving.',
      category: 'Software & Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      level: 'Beginner',
      duration: '60 Hours (8 Weeks)',
      price: 455,
      discountPrice: 420,
      rating: 4.89,
      numReviews: 310
    },
    // 13. ETAP Training for Electrical Engineers Certified Course
    {
      _id: 'c13',
      title: 'ETAP Training for Electrical Engineers Certified Course',
      slug: 'etap-training-for-electrical-engineers-certified-course',
      subtitle: 'Load Flow Analysis, Short Circuit Studies, Relay Coordination & Arc Flash.',
      description: 'Perform electrical power system modeling, load forecasting, transient stability, harmonic analysis, and protection grading with ETAP.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
      level: 'Intermediate to Advanced',
      duration: '80 Hours (10 Weeks)',
      price: 470,
      discountPrice: 395,
      rating: 4.91,
      numReviews: 195
    },
    // 14. (VLSI) Very Large Scale Integration Design Engineer Certified Course
    {
      _id: 'c14',
      title: '(VLSI) Very Large Scale Integration Design Engineer Certified Course',
      slug: 'vlsi-very-large-scale-integration-design-engineer-certified-course',
      subtitle: 'Verilog HDL, SystemVerilog, UVM, FPGA, CMOS & Static Timing Analysis.',
      description: 'Enter semiconductor chip engineering with hands-on digital logic design, RTL coding, testbench automation, and ASIC flow.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '100 Hours (14 Weeks)',
      price: 430,
      discountPrice: 395,
      rating: 4.95,
      numReviews: 420,
      isFeatured: true,
      isPopular: true
    },
    // 15. Web Development Certified Course
    {
      _id: 'c15',
      title: 'Web Development Certified Course',
      slug: 'web-development-certified-course',
      subtitle: 'HTML5, CSS3, JavaScript, React, Node.js, Express, MongoDB & Tailwind.',
      description: 'Complete hands-on full-stack development curriculum to build dynamic, responsive web applications and deploy live web services.',
      category: 'Software & Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      level: 'Beginner to Intermediate',
      duration: '100 Hours (12 Weeks)',
      price: 575,
      discountPrice: 530,
      rating: 4.92,
      numReviews: 530,
      isPopular: true
    },
    // 16. Data Analysis with R Programming Certified Course
    {
      _id: 'c16',
      title: 'Data Analysis with R Programming Certified Course',
      slug: 'data-analysis-with-r-programming-certified-course',
      subtitle: 'Tidyverse, ggplot2, Statistical Inference, Regression & Shiny Dashboards.',
      description: 'Master R syntax, statistical modeling, exploratory data analysis, hypothesis testing, and building interactive web dashboards with Shiny.',
      category: 'Data Science & AI',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '75 Hours (8 Weeks)',
      price: 410,
      discountPrice: 385,
      rating: 4.87,
      numReviews: 180
    },
    // 17. SAP Fiori Certified Course
    {
      _id: 'c17',
      title: 'SAP Fiori Certified Course',
      slug: 'sap-fiori-certified-course',
      subtitle: 'SAPUI5, Fiori Launchpad, OData V2/V4 Services, Fiori Elements & Freestyle Apps.',
      description: 'Design and develop responsive, modern enterprise user interfaces using SAPUI5, SAP Fiori design guidelines, and SAP Business Technology Platform.',
      category: 'Enterprise ERP & SAP',
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      level: 'Intermediate',
      duration: '85 Hours (10 Weeks)',
      price: 575,
      discountPrice: 550,
      rating: 4.9,
      numReviews: 215
    },
    // 18. (STATA) Statistical Analysis using Certified Course
    {
      _id: 'c18',
      title: '(STATA) Statistical Analysis using Certified Course',
      slug: 'stata-statistical-analysis-using-certified-course',
      subtitle: 'Econometrics, Panel Data Regression, Time Series Analysis & Data Wrangling.',
      description: 'Master STATA commands, multivariate analysis, instrumental variables, survival analysis, and generating publication-ready empirical graphs.',
      category: 'Data Science & AI',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '70 Hours (8 Weeks)',
      price: 455,
      discountPrice: 410,
      rating: 4.86,
      numReviews: 165
    },
    // 19. Regional Anti-Terrorist Structure Certified Course
    {
      _id: 'c19',
      title: 'Regional Anti-Terrorist Structure Certified Course',
      slug: 'regional-anti-terrorist-structure-certified-course',
      subtitle: 'Threat Intelligence, Geopolitical Risk Modeling & Critical Infrastructure Defense.',
      description: 'Specialized intelligence training covering cross-border security dynamics, counter-insurgency protocols, and cyber-defense for critical state assets.',
      category: 'Specialized Certifications',
      thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      level: 'Specialist',
      duration: '60 Hours (6 Weeks)',
      price: 420,
      discountPrice: 385,
      rating: 4.85,
      numReviews: 130
    },
    // 20. (SAS) Statistical Analysis System Certified Course
    {
      _id: 'c20',
      title: '(SAS) Statistical Analysis System Certified Course',
      slug: 'sas-statistical-analysis-system-certified-course',
      subtitle: 'Base SAS, Advanced SAS, PROC SQL, SAS Macros & Clinical Trial Data.',
      description: 'Master Base SAS, Advanced SAS, PROC SQL, CDISC standards, and statistical transformation for clinical research and corporate analytics.',
      category: 'Data Science & AI',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '80 Hours (10 Weeks)',
      price: 385,
      discountPrice: 360,
      rating: 4.93,
      numReviews: 320,
      isFeatured: true
    },
    // 21. Edge Computing Certified Course
    {
      _id: 'c21',
      title: 'Edge Computing Certified Course',
      slug: 'edge-computing-certified-course',
      subtitle: 'Edge AI inference, Fog Architecture, MQTT, Kubernetes K3s & Low-Latency IoT.',
      description: 'Deploy real-time machine learning inference at the edge, micro-edge gateways, and low-latency distributed computing architectures.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      level: 'Intermediate',
      duration: '75 Hours (8 Weeks)',
      price: 455,
      discountPrice: 410,
      rating: 4.88,
      numReviews: 175
    },
    // 22. Automated Industry 4.0 Certified Course
    {
      _id: 'c22',
      title: 'Automated Industry 4.0 Certified Course',
      slug: 'automated-industry-4-0-certified-course',
      subtitle: 'Smart Manufacturing, SCADA, Cyber-Physical Systems, OPC-UA & Industrial IoT.',
      description: 'Design smart factories, connected assembly lines, automated telemetry systems, and digital enterprise manufacturing pipelines.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '90 Hours (10 Weeks)',
      price: 565,
      discountPrice: 505,
      rating: 4.91,
      numReviews: 230
    },
    // 23. Digital Twin Technology Certified Course
    {
      _id: 'c23',
      title: 'Digital Twin Technology Certified Course',
      slug: 'digital-twin-technology-certified-course',
      subtitle: 'Virtual Asset Modeling, Physics Simulation, Real-Time Sensor Telemetry & Unreal.',
      description: 'Build real-time digital twin simulations for physical turbines, smart cities, and factory machinery using CAD, IoT sensors, and game engines.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      level: 'Intermediate to Advanced',
      duration: '85 Hours (10 Weeks)',
      price: 470,
      discountPrice: 410,
      rating: 4.9,
      numReviews: 195
    },
    // 24. Predictive Maintenance with LOTA Certified Course
    {
      _id: 'c24',
      title: 'Predictive Maintenance with LOTA Certified Course',
      slug: 'predictive-maintenance-with-lota-certified-course',
      subtitle: 'Vibration Analysis, RUL Estimation, Sensor Anomaly Detection & ML Pipelines.',
      description: 'Predict machinery failure before it happens using remaining useful life (RUL) models, vibration spectrogram analysis, and industrial IoT telematics.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '75 Hours (8 Weeks)',
      price: 470,
      discountPrice: 395,
      rating: 4.87,
      numReviews: 160
    },
    // 25. Abaqus Certified Course
    {
      _id: 'c25',
      title: 'Abaqus Certified Course',
      slug: 'abaqus-certified-course',
      subtitle: 'Non-linear finite element analysis (FEA), dynamic impact & material plasticity.',
      description: 'Master Abaqus/Standard and Abaqus/Explicit for stress analysis, fracture mechanics, composites, thermo-mechanical coupling, and crash simulations.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      level: 'Advanced',
      duration: '85 Hours (10 Weeks)',
      price: 455,
      discountPrice: 420,
      rating: 4.92,
      numReviews: 240
    },
    // 26. Power System Analysis Certified Course
    {
      _id: 'c26',
      title: 'Power System Analysis Certified Course',
      slug: 'power-system-analysis-certified-course',
      subtitle: 'Transmission Line Modeling, Symmetrical Components, Stability & Grid Control.',
      description: 'Learn grid power flow algorithms, fault calculations, generator voltage regulation, HVDC transmission, and renewable energy grid integration.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
      level: 'Intermediate',
      duration: '80 Hours (10 Weeks)',
      price: 505,
      discountPrice: 480,
      rating: 4.89,
      numReviews: 185
    },
    // 27. Primavera P6 for Construction Planning Certified Course
    {
      _id: 'c27',
      title: 'Primavera P6 for Construction Planning Certified Course',
      slug: 'primavera-p6-for-construction-planning-certified-course',
      subtitle: 'WBS, Critical Path Method (CPM), Earned Value Management & Project Controls.',
      description: 'Master Oracle Primavera P6 Professional for large-scale infrastructure schedule creation, resource leveling, cost budgeting, and baseline variance tracking.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '90 Hours (10 Weeks)',
      price: 650,
      discountPrice: 610,
      rating: 4.94,
      numReviews: 310
    },
    // 28. PLC Programming & Industrial Automation Certification Course
    {
      _id: 'c28',
      title: 'PLC Programming & Industrial Automation Certification Course',
      slug: 'plc-programming-industrial-automation-certification-course',
      subtitle: 'Ladder Logic, Siemens S7-1200/1500, Allen-Bradley, HMI Design & SCADA.',
      description: 'Master industrial programmable logic controllers (PLCs), ladder diagrams, function blocks, HMI screen development, and factory automation troubleshooting.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '95 Hours (12 Weeks)',
      price: 540,
      discountPrice: 515,
      rating: 4.93,
      numReviews: 360
    },
    // 29. Finite Element Method (FEM) Certified Course
    {
      _id: 'c29',
      title: 'Finite Element Method (FEM) Certified Course',
      slug: 'finite-element-method-fem-certified-course',
      subtitle: 'Mathematical formulation, 1D/2D/3D elements, stiffness matrices & Ansys FEA.',
      description: 'Understand the mathematical theory of finite elements, shape functions, variational methods, and practical structural-thermal computational simulations.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      level: 'Advanced',
      duration: '80 Hours (10 Weeks)',
      price: 480,
      discountPrice: 455,
      rating: 4.88,
      numReviews: 190
    },
    // 30. Gold Appraisal Training Certified Course
    {
      _id: 'c30',
      title: 'Gold Appraisal Training Certified Course',
      slug: 'gold-appraisal-training-certified-course',
      subtitle: 'Purity Testing, Specific Gravity Method, Hallmarking & Bank Loan Valuation.',
      description: 'Certified training for gold loan officers and jewelers on acid testing, carat measurement, specific gravity calculations, and BIS hallmarking verification.',
      category: 'Specialized Certifications',
      thumbnail: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '50 Hours (4 Weeks)',
      price: 660,
      discountPrice: 625,
      rating: 4.91,
      numReviews: 280
    },
    // 31. Artificial Insemination Certified Course
    {
      _id: 'c31',
      title: 'Artificial Insemination Certified Course',
      slug: 'artificial-insemination-certified-course',
      subtitle: 'Veterinary Reproductive Biology, Cryopreservation & Herd Genetics.',
      description: 'Professional veterinary breeding technology training covering semen evaluation, liquid nitrogen storage, estrus detection, and hygienic insemination.',
      category: 'Specialized Certifications',
      thumbnail: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '60 Hours (6 Weeks)',
      price: 420,
      discountPrice: 395,
      rating: 4.86,
      numReviews: 140
    },
    // 32. Pega Academy Certified Pega Lead System Architect (LSA/PCLSA) Certified Course
    {
      _id: 'c32',
      title: 'Pega Academy Certified Pega Lead System Architect (LSA/PCLSA) Certified Course',
      slug: 'pega-academy-certified-pega-lead-system-architect-certified-course',
      subtitle: 'Enterprise Class Structure (ECS), Case Lifecycle, Rule Resolution & App Design.',
      description: 'Prepare for Pega Certified Lead System Architect (PCLSA). Learn enterprise architecture patterns, background processing, security, and performance tuning.',
      category: 'Specialized Certifications',
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      level: 'Advanced',
      duration: '110 Hours (14 Weeks)',
      price: 590,
      discountPrice: 565,
      rating: 4.97,
      numReviews: 320,
      isFeatured: true
    },
    // 33. DevOps Production Support Engineer Certification Course
    {
      _id: 'c33',
      title: 'DevOps Production Support Engineer Certification Course',
      slug: 'devops-production-support-engineer-certification-course',
      subtitle: 'Linux, Shell Scripting, Docker, Kubernetes, Prometheus, Grafana & Incident Mgmt.',
      description: 'Master live production support, SRE methodologies, log monitoring with ELK, alerting with Grafana/Prometheus, and automated rollback deployment pipelines.',
      category: 'Cloud & DevOps',
      thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '90 Hours (12 Weeks)',
      price: 575,
      discountPrice: 540,
      rating: 4.93,
      numReviews: 390
    },
    // 34. Oracle Fusion Certified Course
    {
      _id: 'c34',
      title: 'Oracle Fusion Certified Course',
      slug: 'oracle-fusion-certified-course',
      subtitle: 'Oracle Fusion Financials (GL, AP, AR, Fixed Assets) & Supply Chain (SCM).',
      description: 'Master Oracle Fusion Cloud Applications architecture, business unit setup, ledger configuration, procure-to-pay (P2P), and order-to-cash (O2C) cycles.',
      category: 'Enterprise ERP & SAP',
      thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '90 Hours (10 Weeks)',
      price: 505,
      discountPrice: 470,
      rating: 4.89,
      numReviews: 240
    },
    // 35. Web Scraping With Python Certified Course
    {
      _id: 'c35',
      title: 'Web Scraping With Python Certified Course',
      slug: 'web-scraping-with-python-certified-course',
      subtitle: 'BeautifulSoup, Scrapy, Selenium, Playwright, Proxy Rotation & Anti-Bot Bypassing.',
      description: 'Extract structured data at scale from complex dynamic websites, handle CAPTCHAs, manage distributed scraping pipelines, and store data in SQL/NoSQL.',
      category: 'Software & Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '60 Hours (6 Weeks)',
      price: 455,
      discountPrice: 430,
      rating: 4.88,
      numReviews: 270
    },
    // 36. Full Stack Python Development (Django / Flask) Certified Course
    {
      _id: 'c36',
      title: 'Full Stack Python Development (Django / Flask) Certified Course',
      slug: 'full-stack-python-development-django-flask-certified-course',
      subtitle: 'Python 3, Django ORM, REST Framework, PostgreSQL, Celery & React Frontend.',
      description: 'Build robust Python web backends with Django REST Framework, asynchronous tasks with Celery/Redis, secure user authentication, and interactive React UIs.',
      category: 'Software & Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '110 Hours (14 Weeks)',
      price: 470,
      discountPrice: 420,
      rating: 4.94,
      numReviews: 480,
      isFeatured: true
    },
    // 37. UI/UX Design Course Certified Course
    {
      _id: 'c37',
      title: 'UI/UX Design Course Certified Course',
      slug: 'ui-ux-design-course-certified-course',
      subtitle: 'Figma, User Research, Wireframing, Interactive Prototyping & Design Systems.',
      description: 'Master human-centered user interface and user experience design, mobile app usability testing, design systems, and responsive website UI in Figma.',
      category: 'Design & Management',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
      level: 'Beginner to Advanced',
      duration: '80 Hours (10 Weeks)',
      price: 455,
      discountPrice: 410,
      rating: 4.92,
      numReviews: 380,
      isPopular: true
    },
    // 38. Analysis and Visualization Certified Course
    {
      _id: 'c38',
      title: 'Analysis and Visualization Certified Course',
      slug: 'analysis-and-visualization-certified-course',
      subtitle: 'Power BI, Tableau, Advanced Excel, DAX Calculations & Executive Storytelling.',
      description: 'Transform complex business datasets into actionable executive visual reports, interactive KPI dashboards, automated ETL, and predictive trends.',
      category: 'Data Science & AI',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '70 Hours (8 Weeks)',
      price: 455,
      discountPrice: 410,
      rating: 4.9,
      numReviews: 310
    },
    // 39. Product Management Certified Course
    {
      _id: 'c39',
      title: 'Product Management Certified Course',
      slug: 'product-management-certified-course',
      subtitle: 'PRD Writing, User Journey Mapping, Scrum Agile, Product Analytics & GTM Strategy.',
      description: 'Learn the end-to-end product lifecycle from user empathy interviews, roadmap prioritization frameworks (RICE), Jira sprint management, to launch.',
      category: 'Design & Management',
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '75 Hours (8 Weeks)',
      price: 455,
      discountPrice: 375,
      rating: 4.89,
      numReviews: 260
    },
    // 40. (IOTA) Internet of Things Certified Course
    {
      _id: 'c40',
      title: '(IOTA) Internet of Things Certified Course',
      slug: 'iota-internet-of-things-certified-course',
      subtitle: 'ESP32, Raspberry Pi, Sensor Interfacing, MQTT, Node-RED & Cloud IoT Dashboards.',
      description: 'Build connected hardware prototypes with ESP32 microcontrollers, wireless sensor networks, MQTT telemetry, and cloud monitoring dashboards.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '80 Hours (10 Weeks)',
      price: 410,
      discountPrice: 385,
      rating: 4.88,
      numReviews: 210
    },
    // 41. Machine Learning Certified Course
    {
      _id: 'c41',
      title: 'Machine Learning Certified Course',
      slug: 'machine-learning-certified-course',
      subtitle: 'Supervised, Unsupervised, Scikit-Learn, XGBoost, Neural Networks & Model Deployment.',
      description: 'Master fundamental and advanced machine learning algorithms, mathematical foundations, feature engineering, and deploying models with FastAPI.',
      category: 'Data Science & AI',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '80 Hours (10 Weeks)',
      price: 300,
      discountPrice: 229,
      rating: 4.93,
      numReviews: 460,
      isPopular: true
    },
    // 42. Python Certified Course
    {
      _id: 'c42',
      title: 'Python Certified Course',
      slug: 'python-certified-course',
      subtitle: 'Core Python, OOP, File Handling, Generators, Decorators & Automation Scripts.',
      description: 'Master the world’s most versatile programming language. Write clean, Pythonic code for automation, web development, data analysis, and scripting.',
      category: 'Software & Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      level: 'Beginner',
      duration: '65 Hours (8 Weeks)',
      price: 410,
      discountPrice: 385,
      rating: 4.91,
      numReviews: 540
    },
    // 43. Share Point Certified Course
    {
      _id: 'c43',
      title: 'Share Point Certified Course',
      slug: 'share-point-certified-course',
      subtitle: 'SharePoint Online, SPFx Framework, Power Automate & Microsoft 365 Admin.',
      description: 'Build enterprise intranets, document management workflows, custom Web Parts with SPFx (SharePoint Framework), and automate business tasks.',
      category: 'Software & Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      level: 'Intermediate',
      duration: '75 Hours (8 Weeks)',
      price: 470,
      discountPrice: 420,
      rating: 4.87,
      numReviews: 175
    },
    // 44. AR/VR Development (Unity, Unreal Engine) Certified Course
    {
      _id: 'c44',
      title: 'AR/VR Development (Unity, Unreal Engine) Certified Course',
      slug: 'ar-vr-development-unity-unreal-engine-certified-course',
      subtitle: 'Unity 3D, C# Scripting, Unreal Engine 5 Blueprints, ARKit & Meta Quest VR.',
      description: 'Create immersive augmented and virtual reality experiences, spatial audio, 3D interaction physics, and deploy to Meta Quest 3 and iOS/Android.',
      category: 'Design & Management',
      thumbnail: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '90 Hours (12 Weeks)',
      price: 410,
      discountPrice: 385,
      rating: 4.94,
      numReviews: 320,
      isFeatured: true
    },
    // 45. Predictive Analytics with Python & R Certified Course
    {
      _id: 'c45',
      title: 'Predictive Analytics with Python & R Certified Course',
      slug: 'predictive-analytics-with-python-r-certified-course',
      subtitle: 'Time-Series Forecasting, ARIMA, Prophet, Customer Churn & Risk Modeling.',
      description: 'Build statistical forecasting models in Python and R to predict customer retention, sales demand, financial stock volatility, and risk exposure.',
      category: 'Data Science & AI',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '75 Hours (8 Weeks)',
      price: 420,
      discountPrice: 360,
      rating: 4.89,
      numReviews: 195
    },
    // 46. Node.js and Express for Backend Development Certified Course
    {
      _id: 'c46',
      title: 'Node.js and Express for Backend Development Certified Course',
      slug: 'nodejs-and-express-for-backend-development-certified-course',
      subtitle: 'Asynchronous Event Loop, RESTful Microservices, JWT, WebSockets & MongoDB.',
      description: 'Build lightning-fast server-side architectures with Node.js, Express, real-time Socket.io communication, database connection pooling, and Docker.',
      category: 'Software & Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '85 Hours (10 Weeks)',
      price: 505,
      discountPrice: 490,
      rating: 4.95,
      numReviews: 410
    },
    // 47. .NET CERTIFIED COURSE
    {
      _id: 'c47',
      title: '.NET CERTIFIED COURSE',
      slug: 'dotnet-certified-course',
      subtitle: 'C#, .NET Core, ASP.NET Web APIs, Entity Framework & SQL Server.',
      description: 'Comprehensive Microsoft .NET developer certified training covering C# language fundamentals, OOP, ASP.NET Core MVC, EF Core, and Azure deployment.',
      category: 'Software & Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '90 Hours (12 Weeks)',
      price: 430,
      discountPrice: 395,
      rating: 4.92,
      numReviews: 350
    },
    // 48. .NET FULL STACK CERTIFIED COURSE
    {
      _id: 'c48',
      title: '.NET FULL STACK CERTIFIED COURSE',
      slug: 'dotnet-full-stack-certified-course',
      subtitle: 'Angular / React Frontend + ASP.NET Core Backend Microservices.',
      description: 'Master full-stack engineering with modern SPA frameworks integrated with ASP.NET Core backend APIs, SQL Server, and cloud CI/CD.',
      category: 'Software & Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '120 Hours (16 Weeks)',
      price: 470,
      discountPrice: 430,
      rating: 4.96,
      numReviews: 480,
      isFeatured: true
    },
    // 49. (BIM) BUILDING INFORMATION MODELING CERTIFIED COURSE
    {
      _id: 'c49',
      title: '(BIM) BUILDING INFORMATION MODELING CERTIFIED COURSE',
      slug: 'bim-building-information-modeling-certified-course',
      subtitle: 'Autodesk Revit Architecture, Structure, MEP & Navisworks Clash Detection.',
      description: 'Master BIM workflows for modern infrastructure and architectural projects using Autodesk Revit, Navisworks, and BIM 360.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '80 Hours (10 Weeks)',
      price: 410,
      discountPrice: 375,
      rating: 4.88,
      numReviews: 210
    },
    // 50. (CATIA) COMPUTER AIDED THREE-DIMENSIONAL INTERACTIVE APPLICATION CERTIFIED COURSE
    {
      _id: 'c50',
      title: '(CATIA) COMPUTER AIDED THREE-DIMENSIONAL INTERACTIVE APPLICATION CERTIFIED COURSE',
      slug: 'catia-computer-aided-three-dimensional-interactive-application-certified-course',
      subtitle: 'Automotive & Aerospace Surfacing, Part Design & DMU Kinematics.',
      description: 'Master Dassault Systèmes CATIA V5/V6 for industrial product styling, complex aerospace surfacing, sheet metal design, and mechanical drafting.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '90 Hours (12 Weeks)',
      price: 455,
      discountPrice: 410,
      rating: 4.91,
      numReviews: 290
    },
    // 51. (CDPP) CERTIFIED DATA PRIVACY PROFESSIONAL TRAINING CERTIFIED COURSE
    {
      _id: 'c51',
      title: '(CDPP) CERTIFIED DATA PRIVACY PROFESSIONAL TRAINING CERTIFIED COURSE',
      slug: 'cdpp-certified-data-privacy-professional-training-certified-course',
      subtitle: 'GDPR, DPDP Act 2023, Privacy by Design & Data Governance.',
      description: 'Master corporate data protection regulations including India DPDP Act 2023, EU GDPR, Privacy Impact Assessment (PIA), and compliance auditing.',
      category: 'Specialized Certifications',
      thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      level: 'All Levels',
      duration: '70 Hours (8 Weeks)',
      price: 410,
      discountPrice: 385,
      rating: 4.89,
      numReviews: 175
    },
    // 52. (ETABS) EXTENDED THREE-DIMENSIONAL ANALYSIS OF BUILDING SYSTEM CERTIFIED COURSE
    {
      _id: 'c52',
      title: '(ETABS) EXTENDED THREE-DIMENSIONAL ANALYSIS OF BUILDING SYSTEM CERTIFIED COURSE',
      slug: 'etabs-extended-three-dimensional-analysis-of-building-system-certified-course',
      subtitle: 'Seismic Response, Wind Load Analysis, Shear Walls & RCC Building Design.',
      description: 'Comprehensive structural engineering training on CSI ETABS for multi-story residential and commercial buildings, modal response, and code compliance.',
      category: 'Engineering & Industrial Tech',
      thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      level: 'Intermediate to Advanced',
      duration: '85 Hours (10 Weeks)',
      price: 430,
      discountPrice: 375,
      rating: 4.91,
      numReviews: 240
    }
  ],

  testimonials: [
    {
      _id: 't1',
      name: 'Rohan Sharma',
      role: 'Full Stack Engineer',
      company: 'Microsoft',
      courseTaken: 'Microsoft Azure AI Infrastructure & DevOps Engineer',
      content: 'The curriculum at Course Divine gave me exact enterprise level experience. The live projects and mentorship directly helped me clear Microsoft technical interview rounds with a top tier compensation package!',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: 5
    },
    {
      _id: 't2',
      name: 'Sneha Patel',
      role: 'Cloud Solutions Engineer',
      company: 'Oracle',
      courseTaken: 'Oracle Cloud Infrastructure Certified Course',
      content: 'Course Divine provides deep practical architectures rather than just theory. The OCI networking, Autonomous Database labs, and mock interviews helped me switch my career smoothly.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 5
    }
  ],

  placements: [
    {
      _id: 'p1',
      studentName: 'Rohan Sharma',
      company: 'Microsoft',
      package: '$140,000 / yr',
      role: 'Software Engineer II',
      course: 'Microsoft Azure AI Infrastructure & DevOps',
      placedYear: 2026,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=80&q=80'
    },
    {
      _id: 'p2',
      studentName: 'Sneha Patel',
      company: 'Oracle',
      package: '$125,000 / yr',
      role: 'Cloud Solutions Architect',
      course: 'Oracle Cloud Infrastructure Certified Course',
      placedYear: 2026,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      companyLogo: 'https://images.unsplash.com/photo-1523474253246-72fb9c27030d?auto=format&fit=crop&w=80&q=80'
    },
    {
      _id: 'p3',
      studentName: 'Aditya Roy',
      company: 'Deloitte',
      package: '$95,000 / yr',
      role: 'SAS Statistical Consultant',
      course: '(SAS) Statistical Analysis System Certified Course',
      placedYear: 2026,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=80&q=80'
    }
  ],

  blogs: [
    {
      _id: 'b1',
      title: 'Top 10 High-Paying Tech Skills in Demand for 2026',
      slug: 'top-10-high-paying-tech-skills-in-demand-2026',
      excerpt: 'Discover which technologies, frameworks, and engineering competencies companies are actively hiring for with high compensation packages.',
      category: 'Career Guide',
      tags: ['Career', 'Web Development', 'AI', 'Cloud'],
      content: `The tech industry is experiencing massive demand for certified professionals in Oracle Cloud, Azure AI, Prompt Engineering, VLSI semiconductor engineering, and SAP S/4HANA.`,
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      readTime: '6 min read',
      createdAt: '2026-02-10T10:00:00.000Z',
      author: {
        name: 'Course Divine Editorial Team',
        role: 'Tech Career Mentors',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      }
    }
  ],

  certificates: [
    {
      certificateId: 'CD-CERT-884920',
      studentName: 'Rohan Sharma',
      courseTitle: 'Microsoft Azure AI Infrastructure & DevOps Engineer Certified Course',
      grade: 'Distinction (A+)',
      issueDate: '2025-11-15T00:00:00.000Z',
      isValid: true,
      course: {
        title: 'Microsoft Azure AI Infrastructure & DevOps Engineer Certified Course',
        duration: '110 Hours (14 Weeks)',
        category: 'Cloud & DevOps',
        level: 'Advanced'
      }
    }
  ]
};

// Axios Instance
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cd_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Fallback gracefully to mock store if server is unreachable
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('API notice, serving fallback store:', error.config?.url);
    return Promise.reject(error);
  }
);

export default api;
