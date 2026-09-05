export const topSkills = ["CMake", "Ansible", "ObjectScript"] as const;

export const skillGroups = [
  {
    title: "Machine Learning",
    items: [
      "PyTorch",
      "scikit-learn",
      "LLM Evaluation",
      "Safety Alignment",
      "Anomaly Detection",
      "Scientific ML",
    ],
  },
  {
    title: "Languages and Runtimes",
    items: ["Python", "C++", "Julia", "ObjectScript", "TypeScript", "Node.js", "SQL"],
  },
  {
    title: "Systems and Infrastructure",
    items: ["CMake", "Ansible", "Real Time Databases", "Linux", "Git", "Docker"],
  },
  {
    title: "Data and Interfaces",
    items: ["Pandas", "NumPy", "Streamlit", "Next.js", "Arduino Cloud", "REST APIs"],
  },
] as const;

export const languages = [
  { name: "English", level: "Native and Bilingual" },
  { name: "Spanish", level: "Elementary" },
] as const;

export type Certification = {
  name: string;
  issuer: string;
  date: string;
};

/** Reverse chronological. */
export const certifications: Certification[] = [
  {
    name: "Graduate Certificate in High Frequency Trading (Software Engineering)",
    issuer: "LSIB London School of International Business",
    date: "Jul 2026",
  },
  { name: "Federated Learning", issuer: "DeepLearning.AI", date: "Feb 2025" },
  {
    name: "Web3 and Blockchain Transformations in Global Supply Chains",
    issuer: "INSEAD",
    date: "Jan 2024",
  },
  {
    name: "QC101 Quantum Computing and Intro to Quantum Machine Learning",
    issuer: "Udemy",
    date: "Dec 2023",
  },
  { name: "Systems Engineering", issuer: "Coursera", date: "Nov 2023" },
  { name: "Measuring Stock Liquidity", issuer: "Coursera", date: "Nov 2023" },
  {
    name: "Portfolio Optimization using Markowitz Model",
    issuer: "Coursera",
    date: "Aug 2023",
  },
  { name: "Seeking Investment Alpha", issuer: "Coursera", date: "Aug 2023" },
  {
    name: "Create Technical Stock Charts Using R and Quantmod",
    issuer: "Coursera",
    date: "Aug 2023",
  },
  {
    name: "Analyze Apple's Stock and Financials with Bloomberg Terminal",
    issuer: "Coursera",
    date: "Aug 2023",
  },
  { name: "App Building Onramp", issuer: "MathWorks", date: "Aug 2023" },
  { name: "MATLAB Onramp", issuer: "MathWorks", date: "Aug 2023" },
  {
    name: "Introduction to Generative AI",
    issuer: "Google Cloud Training Online",
    date: "Jul 2023",
  },
  {
    name: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization",
    issuer: "DeepLearning.AI",
    date: "Jun 2023",
  },
  {
    name: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI",
    date: "Apr 2023",
  },
  {
    name: "Semiconductors for Beginners",
    issuer: "National University of Singapore",
    date: "Mar 2023",
  },
  {
    name: "Machine Learning Specialization",
    issuer: "Stanford Online",
    date: "Feb 2023",
  },
  {
    name: "Circuits for Beginners",
    issuer: "National University of Singapore",
    date: "Sep 2022",
  },
];

export type Honor = {
  name: string;
  issuer?: string;
  date: string;
  association?: string;
  detail?: string;
};

/** Reverse chronological. */
export const honors: Honor[] = [
  {
    name: "2nd Place, IMC Tech Race",
    issuer: "IMC Trading",
    date: "Sep 2026",
    association: "Nanyang Technological University Singapore",
    detail: "Solved all 100 problems, ranked 2nd on completion time.",
  },
  {
    name: "1st Place, NTU InnovateX Hackathon 2026",
    issuer: "NTU Centre in Computational Technologies for Finance (CCTF) and SNZ",
    date: "Aug 2026",
    association: "Nanyang Technological University Singapore",
    detail: "Winning team on the Payments and Financial Infrastructure track.",
  },
  {
    name: "Goldman Sachs APAC Quant Strats Insight Day",
    issuer: "Goldman Sachs",
    date: "Jul 2026",
    detail: "Selected attendee, invite only.",
  },
  {
    name: "Finalist, USAII Global AI Hackathon 2026",
    issuer: "United States Artificial Intelligence Institute (USAII)",
    date: "Jun 2026",
    detail: "Undergraduate level.",
  },
  {
    name: "Citadel Securities Discover Program",
    issuer: "Citadel and Citadel Securities",
    date: "Feb 2026",
    detail: "Invite only.",
  },
  {
    name: "Y Combinator AI Startup School",
    issuer: "Y Combinator",
    date: "Jun 2025",
  },
  {
    name: "Academic Merit Certificate",
    date: "May 2022",
    association: "International Baccalaureate",
  },
  {
    name: "Extended Essay Exhibition Certificate of Recognition",
    date: "Dec 2021",
    association: "International Baccalaureate",
  },
];

export type Organization = {
  name: string;
  role: string;
  period: string;
  association: string;
};

/** Student organisations and leadership roles within NTU. */
export const organizations: Organization[] = [
  {
    name: "Nanyang FinTech Catalyst",
    role: "FinTech Research Head",
    period: "Aug 2026 – Present",
    association: "Nanyang Technological University Singapore",
  },
  {
    name: "IEEE NTU",
    role: "Director of Technology",
    period: "Aug 2025 – May 2026",
    association: "Nanyang Technological University Singapore",
  },
  {
    name: "Innovation Lab at NTU College of Computing and Data Science",
    role: "Mentor",
    period: "Aug 2025 – May 2026",
    association: "Nanyang Technological University Singapore",
  },
];


export type Recommendation = {
  quote: string;
  name: string;
  title: string;
  relationship: string;
  date: string;
};

export const recommendations: Recommendation[] = [
  {
    quote:
      "Aryan is exceptionally motivated, hard-working, and a quick learner always looking to expand his skill set. Having worked directly with Aryan, I'd happily recommend him to anyone looking for a bright, challenge-seeking team member.",
    name: "Richard Cloete",
    title:
      "Computer Scientist at Harvard University, Galileo Project, SEASWARM",
    relationship: "Managed Aryan directly",
    date: "Nov 2025",
  },
  {
    quote:
      "Even as a first-year undergraduate, Aryan brings the precision of a seasoned engineer and the foresight of a research strategist. His ability to independently lead full-stack development, integrate external APIs, and build explainable analytics pipelines was exceptional.",
    name: "Muhammed Sajid",
    title: "Assistant Professor at BITS Pilani",
    relationship: "Was Aryan's mentor",
    date: "Nov 2025",
  },
  {
    quote:
      "Aryan made a strong impact during his internship at BioMetallica, where he helped engineer a semi-automated bioreactor and inventory management systems that improved uptime, efficiency, and scalability in our e-waste recovery workflows. Aryan combines technical excellence with initiative, adaptability, and problem-solving ability.",
    name: "KwaDwo Konadu Ansah Antwi, Ph.D",
    title: "CEO at BioMetallica",
    relationship: "Managed Aryan directly",
    date: "Sep 2025",
  },
];