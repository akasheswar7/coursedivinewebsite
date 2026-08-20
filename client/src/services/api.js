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
      title: 'The 2026 AI Roadmap: How Generative AI, LLMs & LangChain Are Transforming Tech Careers',
      slug: 'ai-roadmap-generative-ai-llms-langchain-career-guide',
      excerpt: 'Explore the exact skills, libraries, and portfolio projects needed to become a Generative AI & Machine Learning Engineer in 2026.',
      category: 'AI & Machine Learning',
      tags: ['Artificial Intelligence', 'Generative AI', 'Python', 'LLM', 'Career'],
      content: `The Artificial Intelligence revolution is moving from basic prompt engineering into building full-stack autonomous AI agents, retrieval-augmented generation (RAG) pipelines, and multimodal enterprise models.

### Key Milestones in the 2026 AI Engineering Roadmap:

1. **Foundational Mathematics & Python Mastery**:
   - Master Python 3.12+, NumPy, Pandas, and asynchronous programming.
   - Understand vectors, matrix decomposition, and cosine similarity for vector embeddings.

2. **Large Language Models (LLMs) & Agent Frameworks**:
   - Building production workflows using LangChain, LlamaIndex, and AutoGen.
   - Vector Databases: Pinecone, Qdrant, ChromaDB, and Milvus.
   - Context window optimization and token management.

3. **Fine-Tuning & Model Deployment**:
   - Parameter-Efficient Fine-Tuning (PEFT), LoRA, and QLoRA on open-weights models like Llama-3, Mistral, and DeepSeek.
   - Deploying high-throughput inference APIs using vLLM, TensorRT-LLM, and Triton Inference Server.

4. **Industry Deliverable**:
   - Certified AI developers with real-world enterprise RAG pipelines earn 40-70% higher salary increments in corporate hiring.`,
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
      readTime: '7 min read',
      createdAt: '2026-02-18T10:00:00.000Z',
      author: {
        name: 'Ch. Jhansi & AI Mentorship Panel',
        role: 'Chief Career Mentor',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
      }
    },
    {
      _id: 'b2',
      title: 'Why Oracle Cloud Infrastructure (OCI) Certification is the Fast-Track to High-Paying Cloud Roles',
      slug: 'oracle-cloud-infrastructure-oci-certification-career-guide',
      excerpt: 'A comprehensive breakdown of OCI architecture, real-world enterprise adoption, and why Oracle certified architects earn top-tier packages.',
      category: 'Cloud & DevOps',
      tags: ['Cloud Computing', 'Oracle OCI', 'DevOps', 'Certifications'],
      content: `As Fortune 500 enterprises migrate mission-critical database workloads, ERP platforms, and sovereign AI clusters to Oracle Cloud, certified OCI Architects are in unprecedented demand.

### Why OCI is Booming in 2026:

- **Enterprise Database Dominance**: Over 70% of multinational financial institutions and healthcare leaders run Oracle Autonomous Database and Exadata on OCI.
- **Cost-Efficiency & Compute Scaling**: Predictable networking and compute pricing has made OCI the preferred hyperscaler for AI training workloads.
- **Core Competencies You Master**:
  1. Virtual Cloud Networks (VCN), Subnets, and Security Lists.
  2. Identity and Access Management (IAM) policies & Compartment design.
  3. Terraform / OpenTofu Infrastructure as Code (IaC) provisioning.
  4. High Availability (HA) and Disaster Recovery (DR) architectures.

### Career Outlook:
Certified OCI Architects command average starting packages of $85,000 - $140,000 internationally with guaranteed MNC placement pipelines.`,
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      readTime: '6 min read',
      createdAt: '2026-02-15T11:30:00.000Z',
      author: {
        name: 'Rohan Sharma',
        role: 'Senior Cloud Solutions Architect',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      }
    },
    {
      _id: 'b3',
      title: 'Data Science vs Data Analytics in 2026: Salaries, Toolstacks, and Real-World Projects',
      slug: 'data-science-vs-data-analytics-2026-roadmap',
      excerpt: 'Demystifying data roles: How to master SQL, Python data engineering, Tableau, and Machine Learning models to land top analytics positions.',
      category: 'Data Science',
      tags: ['Data Science', 'Data Analytics', 'Power BI', 'SQL', 'Python'],
      content: `The lines between Data Analysts, Business Intelligence Specialists, and Data Scientists are clearer than ever. Choosing the right roadmap is critical for career acceleration.

### 1. Data Analytics Path:
- **Focus**: Descriptive & Diagnostic Analytics (What happened and why?).
- **Key Tools**: Advanced SQL (Window functions, CTEs), Microsoft Power BI, Tableau, Excel VBA, Python (Pandas/Seaborn).
- **Deliverables**: Executive KPI dashboards, revenue forecasting, cohort retention analysis.

### 2. Data Science Path:
- **Focus**: Predictive & Prescriptive Analytics (What will happen and how to optimize?).
- **Key Tools**: Scikit-Learn, XGBoost, PyTorch, Statistical Hypothesis Testing, Feature Engineering, MLOps.
- **Deliverables**: Recommendation engines, churn prediction models, fraud detection classifiers.

### Portfolio Projects That Impress Recruiters:
1. End-to-end Customer Lifetime Value (CLV) predictor deployed with Streamlit.
2. Real-time Supply Chain Power BI dashboard with automated SQL ingestion pipelines.`,
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      readTime: '8 min read',
      createdAt: '2026-02-12T09:15:00.000Z',
      author: {
        name: 'Dr. Priya Menon',
        role: 'Lead Data Scientist & Mentor',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'
      }
    },
    {
      _id: 'b4',
      title: 'The Semiconductor Boom: Building a Career in VLSI, RTL Design, and Chip Verification',
      slug: 'semiconductor-boom-vlsi-rtl-design-career-guide',
      excerpt: 'With global chip investments expanding rapidly, discover how to master Verilog, FPGA prototyping, and ASIC verification workflows.',
      category: 'Core Engineering',
      tags: ['VLSI', 'Semiconductors', 'Verilog', 'Embedded Systems', 'Core Engineering'],
      content: `With semiconductor fabrication plants and fabless design centers expanding globally, core electronics and VLSI engineers are experiencing an unprecedented hiring boom.

### The Essential VLSI Skill Hierarchy:

1. **Digital Design Fundamentals**:
   - Boolean algebra, Karnaugh maps, state machines (FSMs), timing diagrams, setup and hold time constraints.
2. **Hardware Description Languages (HDL)**:
   - Verilog and SystemVerilog for synthesizable RTL coding.
3. **Verification Methodologies**:
   - Universal Verification Methodology (UVM), constrained-random verification, coverage metrics.
4. **Physical Design & Synthesis**:
   - Logic synthesis, floorplanning, placement, clock tree synthesis (CTS), and Static Timing Analysis (STA).

### Why Hardware Engineers Have Long-Term Job Security:
Unlike surface-level tech stacks, hardware design and semiconductor verification require rigorous physics and electronic modeling, making VLSI engineers irreplaceable assets.`,
      coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      readTime: '7 min read',
      createdAt: '2026-02-08T14:20:00.000Z',
      author: {
        name: 'K. Venkatesh',
        role: 'Principal VLSI Design Engineer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
      }
    },
    {
      _id: 'b5',
      title: 'The Modern UI/UX Designer’s Toolkit: Micro-Interactions, Design Systems, and AI Prototyping',
      slug: 'modern-ui-ux-designers-toolkit-figma-ai-prototyping',
      excerpt: 'How top product designers craft high-conversion user interfaces, scalable design tokens, and human-centered digital experiences.',
      category: 'Design & UI/UX',
      tags: ['UI/UX Design', 'Figma', 'Product Design', 'Web Development'],
      content: `Great UI/UX design is not just about aesthetics; it is the bridge between human psychology, technical feasibility, and business metrics.

### Key Pillars of Modern Product Design:

1. **Scalable Design Systems**:
   - Establishing design tokens (colors, typography, elevation, spacing).
   - Component variants, Auto Layout 5.0, and interactive states in Figma.
2. **User Research & Usability Testing**:
   - Conducting qualitative user interviews, heatmaps, and A/B test analysis.
   - Mapping user journeys and identifying UX friction points.
3. **Micro-Interactions & Motion Design**:
   - Enhancing digital delight using subtle Lottie animations and Framer transitions.
4. **Design-to-Engineering Handoff**:
   - Writing clean specs for React/Tailwind developers with accessibility (WCAG 2.1 AA) compliance.`,
      coverImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
      readTime: '5 min read',
      createdAt: '2026-02-04T16:45:00.000Z',
      author: {
        name: 'Ananya Roy',
        role: 'Senior Product Designer',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
      }
    },
    {
      _id: 'b6',
      title: 'Digital Twin & Simulation: Why Mechanical Engineers Must Master ANSYS FEA and SolidWorks 3D CAD',
      slug: 'digital-twin-simulation-ansys-fea-solidworks-mechanical-guide',
      excerpt: 'Step into computational engineering with structural analysis, thermal simulations, and generative 3D modeling for aerospace and automotive.',
      category: 'Mechanical & CAD',
      tags: ['SolidWorks', 'ANSYS', 'FEA', 'Mechanical Engineering', 'CAD/CAM'],
      content: `The modern mechanical engineering landscape has evolved from manual drafting into generative computational simulation and digital twins.

### Core Industry Competencies:

- **Parametric 3D Solid Modeling**:
  - Complex surface modeling, sheet metal design, weldments, and multi-body assemblies in SolidWorks.
- **Finite Element Analysis (FEA) with ANSYS**:
  - Static structural stress testing, fatigue analysis, modal vibration evaluation, and thermal dissipation studies.
- **Computational Fluid Dynamics (CFD)**:
  - Aerodynamic drag analysis, internal pipe fluid flow, and heat transfer simulations.
- **Automotive & Aerospace Applications**:
  - Validating crashworthiness, component weight reduction, and tolerance analysis before physical tooling.`,
      coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      readTime: '6 min read',
      createdAt: '2026-01-29T11:00:00.000Z',
      author: {
        name: 'S. Nageswara Rao',
        role: 'Lead CAE / FEA Simulation Specialist',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
      }
    },
    {
      _id: 'b7',
      title: 'Performance Marketing & SEO in the AI Era: How to Drive 10x ROI for Brands',
      slug: 'performance-marketing-seo-ai-era-roi-growth-guide',
      excerpt: 'Master paid ads, programmatic SEO, search analytics, and conversion rate optimization to become an indispensable growth marketer.',
      category: 'Marketing & Growth',
      tags: ['Digital Marketing', 'SEO', 'Performance Marketing', 'Growth Hacking'],
      content: `In an era of AI search overviews and changing ad algorithms, digital marketing has shifted from vanity metrics to unit economics and full-funnel performance.

### The 2026 Growth Marketing Blueprint:

1. **Generative Search Optimization (GEO & SEO)**:
   - Optimizing content for LLM-based answer engines and voice search.
   - High-authority backlink architecture and technical core web vitals.
2. **High-ROI Paid Advertising**:
   - Meta Ads Manager (Advantage+ campaigns) and Google Search / Performance Max (PMax).
   - Creative hook testing and ROAS optimization strategies.
3. **Conversion Rate Optimization (CRO)**:
   - Designing high-converting landing page layouts, trust badges, and automated email nurturing funnels with HubSpot/Klaviyo.`,
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      readTime: '5 min read',
      createdAt: '2026-01-24T13:30:00.000Z',
      author: {
        name: 'K. Sneha',
        role: 'Growth Marketing Director',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      }
    },
    {
      _id: 'b8',
      title: 'The Proven 90-Day Blueprint to Crack Product-Based Software Engineer Interviews',
      slug: '90-day-blueprint-crack-product-software-engineer-interviews',
      excerpt: 'From Data Structures and Algorithms to High-Level System Design and behavioral rounds: your step-by-step placement strategy.',
      category: 'Interview Prep',
      tags: ['Interview Prep', 'Data Structures', 'System Design', 'Placements'],
      content: `Landing a Tier-1 software engineering role requires a disciplined, structured preparation timeline. Here is the 90-day roadmap trusted by Course Divine placement cohorts.

### Month 1: Core DSA Patterns (Days 1–30)
- Master 14 Core Patterns: Two Pointers, Sliding Window, Fast & Slow Pointers, Monotonic Stack, and Tree Traversals (BFS/DFS).
- Solve 75 curated LeetCode medium questions with time and space complexity explanations.

### Month 2: Advanced Graph Algorithms & Dynamic Programming (Days 31–60)
- Dijkstra, Topological Sort, Union-Find, Knapsack variations, and Dynamic Programming on trees/grids.
- Object-Oriented Design (OOD): Low-Level Design (LLD) for parking lots, chess games, and rate limiters.

### Month 3: System Design & Mock Interviews (Days 61–90)
- High-Level Design (HLD): Scalable architectures, Load Balancers, Redis caching, Message Queues (Kafka/RabbitMQ), and SQL vs NoSQL sharding.
- Mock behavioral interviews using the STAR method (Situation, Task, Action, Result).`,
      coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      readTime: '9 min read',
      createdAt: '2026-01-18T09:00:00.000Z',
      author: {
        name: 'Course Divine Placement Cell',
        role: 'MNC Hiring & Placement Mentors',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      }
    },
    {
      _id: 'b9',
      title: 'Why SAP S/4HANA Enterprise Architects Command $130,000+ Packages in 2026',
      slug: 'why-sap-s4hana-enterprise-architects-command-top-packages-2026',
      excerpt: 'Discover why global ERP transformations are driving sky-high demand for certified SAP S/4HANA Finance (FICO) and ABAP on Cloud consultants.',
      category: 'Enterprise ERP',
      tags: ['SAP S/4HANA', 'ERP', 'SAP FICO', 'ABAP Cloud', 'Enterprise Tech'],
      content: `With global corporations completing their mandatory migrations from ECC 6.0 to SAP S/4HANA by 2027, enterprise ERP consulting is experiencing its largest hiring surge in two decades.

### Core Modules Driving Enterprise Value:
1. **SAP S/4HANA Finance & Controlling (FICO)**:
   - Universal Journal (ACDOCA) real-time accounting.
   - Central Finance, General Ledger accounting, Asset Management, and Profitability Analysis (CO-PA).
2. **ABAP on Cloud & Clean Core Architecture**:
   - Modern RESTful Application Programming (RAP) and Core Data Services (CDS) views.
   - Cloud BAdIs and side-by-side extensibility with SAP BTP (Business Technology Platform).
3. **Integration with Supply Chain & MM/SD**:
   - Procure-to-Pay and Order-to-Cash process optimizations.

### Career Pathway:
Course Divine SAP cohorts regularly step into Associate ERP Consultant and Enterprise Solution Architect positions with starting compensation ranging between $90,000 to $145,000 USD globally.`,
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      readTime: '7 min read',
      createdAt: '2026-02-19T09:00:00.000Z',
      author: {
        name: 'V. Rajesh',
        role: 'Lead SAP S/4HANA Enterprise Consultant',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
      }
    },
    {
      _id: 'b10',
      title: 'Mastering Microsoft Azure Cloud & Kubernetes (AKS): The Ultimate DevOps Blueprint',
      slug: 'mastering-microsoft-azure-cloud-kubernetes-aks-devops-blueprint',
      excerpt: 'A complete step-by-step roadmap to building resilient, automated CI/CD release pipelines and container clusters on Microsoft Azure.',
      category: 'Cloud & DevOps',
      tags: ['Azure Cloud', 'Kubernetes', 'Docker', 'DevOps', 'Terraform'],
      content: `Modern software releases are defined by automated infrastructure as code (IaC), zero-downtime rolling deployments, and container orchestration.

### The Azure DevOps Tech Stack:
- **Infrastructure Automation**: Writing modular Terraform & Bicep scripts to manage Virtual Networks, App Services, and Azure SQL.
- **Containerization & Orchestration**: Docker multi-stage builds and production Azure Kubernetes Service (AKS) clusters with Helm charts.
- **CI/CD Pipelines**: GitHub Actions & Azure Pipelines with automated static code analysis (SonarQube) and automated container registry push.
- **Observability**: Azure Monitor, Application Insights, and Prometheus/Grafana dashboards for real-time latency and error tracking.

### Placement Impact:
DevOps and Cloud Engineers certified in Azure and Kubernetes are among the top 3 most requested profiles by multinational enterprise recruiters.`,
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      readTime: '8 min read',
      createdAt: '2026-02-18T14:00:00.000Z',
      author: {
        name: 'Rohan Sharma',
        role: 'Senior Cloud Solutions Architect',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      }
    },
    {
      _id: 'b11',
      title: 'Building High-Throughput Microservices with Python FastAPI & React 19',
      slug: 'building-high-throughput-microservices-python-fastapi-react-19',
      excerpt: 'How asynchronous Python, Pydantic type safety, and modern React 19 full-stack components combine to deliver lightning-fast web applications.',
      category: 'Development',
      tags: ['Python', 'FastAPI', 'React 19', 'Full Stack', 'Web Dev'],
      content: `Python FastAPI has rapidly overtaken legacy web frameworks due to its native asynchronous performance, automatic OpenAPI documentation, and strict type safety.

### Architecture Highlights:
1. **Asynchronous API Endpoints**:
   - Utilizing \`async\`/\`await\` with SQLAlchemy 2.0 async engine and PostgreSQL connection pooling.
   - Pydantic v2 validation delivering up to 5x faster request parsing than traditional frameworks.
2. **Authentication & Rate Limiting**:
   - Stateless JWT tokens, OAuth2 Password Bearer flow, and Redis-backed rate limiting.
3. **Frontend Integration with React 19**:
   - Server Actions, optimistic UI updates, and Tailwind CSS responsive design.
4. **Production Deployment**:
   - Containerizing with Docker, Gunicorn with Uvicorn workers, and Nginx reverse proxy.`,
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      readTime: '6 min read',
      createdAt: '2026-02-17T16:00:00.000Z',
      author: {
        name: 'Arjun K.',
        role: 'Principal Full Stack Architect',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
      }
    },
    {
      _id: 'b12',
      title: 'The 2026 Cyber Security & SOC Analyst Guide: Protecting Modern Enterprise Infrastructure',
      slug: 'cyber-security-soc-analyst-guide-protecting-enterprise-infrastructure',
      excerpt: 'From SIEM log analysis with Splunk to cloud incident response and zero-trust identity verification: how to build an Ethical Hacking career.',
      category: 'Cyber Security',
      tags: ['Cyber Security', 'SOC Analyst', 'Ethical Hacking', 'Splunk', 'InfoSec'],
      content: `With cloud security breaches rising globally, Security Operations Center (SOC) Analysts and Penetration Testers represent the frontline of digital defense.

### Core SOC Analyst Skills:
- **SIEM & Log Correlation**: Monitoring real-time telemetry using Splunk Enterprise Security and Microsoft Sentinel.
- **Threat Hunting & MITRE ATT&CK**: Mapping adversary tactics, techniques, and procedures (TTPs) to proactive defense playbooks.
- **Vulnerability Assessment**: Running automated scans with Nessus/Qualys and performing manual web application penetration testing with Burp Suite.
- **Incident Response & Digital Forensics**: Isolating infected endpoints, analyzing memory dumps, and writing post-incident root cause analysis reports.`,
      coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      readTime: '8 min read',
      createdAt: '2026-02-16T12:00:00.000Z',
      author: {
        name: 'P. Vikram',
        role: 'Chief Information Security Officer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
      }
    },
    {
      _id: 'b13',
      title: 'BIM & Structural Engineering Revolution: Mastering Revit 3D, ETABS & Tekla',
      slug: 'bim-structural-engineering-revolution-revit-etabs-tekla',
      excerpt: 'Why modern civil and structural engineers must transition from 2D drafting to parametric 3D BIM coordination and automated structural finite element analysis.',
      category: 'Core Engineering',
      tags: ['Civil Engineering', 'Revit BIM', 'ETABS', 'Tekla Structures', 'CAD'],
      content: `Mega infrastructure projects, high-rise towers, and smart city developments demand fully coordinated Building Information Modeling (BIM) workflows.

### Essential Civil Tech Stack:
1. **Autodesk Revit 3D (BIM Architecture & Structure)**:
   - Parametric family creation, clash detection with Navisworks, and automated quantity takeoff schedules.
2. **CSI ETABS (High-Rise Analysis & Seismic Design)**:
   - Dynamic response spectrum analysis, wind tunnel simulation, and non-linear pushover analysis for earthquake-resistant concrete and steel structures.
3. **Tekla Structures (Steel Detailing & Rebar Automation)**:
   - Constructible 3D modeling, fabrication drawings, CNC machine integration, and Bar Bending Schedules (BBS).

Mastering these industry tools transforms civil engineering graduates into high-demand structural BIM modelers and design engineers.`,
      coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
      readTime: '7 min read',
      createdAt: '2026-02-15T09:00:00.000Z',
      author: {
        name: 'M. Sreenivasulu',
        role: 'Head of Civil & Structural Engineering',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80'
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
