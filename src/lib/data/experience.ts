export type Experience = {
  slug: string;
  company: string;
  role: string;
  period: string;
  location: string;
  /** Employment type and work mode, as listed on the record. */
  engagement: string;
  kind: "research" | "engineering" | "service";
  summary: string;
  /** One concise impact statement for the compact timeline. */
  impact: string;
  highlights: string[];
  tags: string[];
  /** Surfaced in the compact list on the home page. */
  featured?: boolean;
};

/** Reverse chronological. */
export const experience: Experience[] = [
  {
    slug: "ntu-ura",
    company: "Nanyang Technological University",
    role: "Undergraduate Research Assistant",
    period: "Jul – Aug 2026",
    location: "Singapore",
    engagement: "Part-time, on-site",
    kind: "research",
    summary:
      "Recalled to SC3DP as an Undergraduate Research Assistant with Prof. Paulo Bartolo.",
    impact:
      "Recalled to SC3DP to continue additive manufacturing research under Prof. Paulo Bartolo.",
    highlights: [
      "Continued SC3DP research on additive manufacturing process data.",
      "Built analysis tooling to shorten the loop between print run and result.",
    ],
    tags: ["Research", "SC3DP", "Additive Manufacturing", "Python"],
  },
  {
    slug: "intersystems",
    company: "InterSystems",
    role: "Software Engineer Intern",
    period: "May – Jul 2026",
    location: "Singapore",
    engagement: "Full-time, on-site",
    kind: "engineering",
    summary: "Low latency data platforms and real time database internals.",
    impact:
      "Engineered low-latency data platform work backing real-time database workloads.",
    highlights: [
      "Contributed to low latency platform work backing real time database workloads.",
      "Worked across the ObjectScript stack with CMake builds and Ansible managed environments.",
    ],
    tags: ["ObjectScript", "CMake", "Ansible", "Databases"],
    featured: true,
  },
  {
    slug: "ntu-ccds",
    company: "NTU CCDS",
    role: "Research Intern",
    period: "Aug 2025 – May 2026",
    location: "Singapore",
    engagement: "Part-time, on-site",
    kind: "research",
    summary:
      "LLM safety alignment research with Prof. Anupam Chattopadhyay at the College of Computing and Data Science.",
    impact:
      "Co-authored a paper on LLM safety alignment and built the evaluation harness behind it.",
    highlights: [
      "Co-authored a paper on LLM safety alignment.",
      "Ran evaluation harnesses over alignment interventions and analysed failure modes across prompt families.",
    ],
    tags: ["LLM Safety", "Alignment", "Evaluation", "PyTorch"],
    featured: true,
  },
  {
    slug: "mit-julia-lab",
    company: "MIT Julia Lab",
    role: "Research Intern",
    period: "Jul 2025 – Mar 2026",
    location: "Remote and Cambridge, MA",
    engagement: "Part-time, remote",
    kind: "research",
    summary: "Scientific machine learning research under PI Dr. Chris Rackauckas.",
    impact:
      "Scientific machine learning research in the Julia Lab under PI Dr. Chris Rackauckas.",
    highlights: [
      "Research intern in the Julia Lab under PI Dr. Chris Rackauckas.",
      "Worked in the scientific machine learning ecosystem around differential equation solvers and Julia numerics.",
    ],
    tags: ["Julia", "SciML", "Differential Equations", "Numerics"],
    featured: true,
  },
  {
    slug: "ntu-sc3dp",
    company: "NTU SC3DP",
    role: "Research Intern",
    period: "Jan – Jul 2025",
    location: "Singapore",
    engagement: "Part-time, hybrid",
    kind: "research",
    summary: "Singapore Centre for 3D Printing, under Prof. Paulo Bartolo.",
    impact:
      "Supported additive manufacturing research through experimental data capture and analysis.",
    highlights: [
      "Supported additive manufacturing research under Prof. Paulo Bartolo.",
      "Handled experimental data capture and analysis across print runs.",
    ],
    tags: ["Research", "SC3DP", "Data Analysis", "Python"],
  },
  {
    slug: "seaqr-seaswarm",
    company: "SEAQR and SeaSwarm",
    role: "Software Engineer",
    period: "Mar – May 2025",
    location: "Singapore",
    engagement: "Internship, remote",
    kind: "engineering",
    summary:
      "SEAQR, now SeaSwarm, is a robotics startup founded by Harvard University researchers building autonomous marine sensing and monitoring systems.",
    impact:
      "Built software for autonomous marine sensing at a Harvard-founded robotics startup.",
    highlights: [
      "Built software for autonomous marine sensing.",
      "Worked on the data path between fleet hardware and the analysis tooling consuming it.",
    ],
    tags: ["Robotics", "Autonomy", "Marine Sensing", "Python"],
  },
  {
    slug: "tagit",
    company: "Tagit",
    role: "Software Engineer",
    period: "Jan – Mar 2025",
    location: "Singapore",
    engagement: "Internship, on-site",
    kind: "engineering",
    summary: "Transaction anomaly detection for digital banking products.",
    impact:
      "Architected a modular transaction anomaly detection system for digital banking workloads.",
    highlights: [
      "Architected a modular transaction anomaly detection system for digital banking workloads.",
      "Implemented per user Isolation Forest modelling and percentile based spike detection.",
      "Engineered rolling 7 day and 30 day behavioural features, merchant spend ratios, and temporal risk signals.",
      "Built a production ready Streamlit monitoring dashboard with exportable analytics and audit summaries.",
    ],
    tags: ["Anomaly Detection", "Isolation Forest", "scikit-learn", "Streamlit"],
    featured: true,
  },
  {
    slug: "biometallica",
    company: "BioMetallica",
    role: "Software Engineer",
    period: "Oct – Dec 2024",
    location: "Singapore",
    engagement: "Internship, on-site",
    kind: "engineering",
    summary: "Bioreactor telemetry and internal operations tooling for a biotech venture.",
    impact:
      "Instrumented bioreactor telemetry and shipped the internal operations tooling around it.",
    highlights: [
      "Architected Arduino Cloud bioreactor telemetry with real time control integration.",
      "Built the internal Digital Board system for workflow coordination and data visibility.",
      "Developed Integrated Management System infrastructure for scalable inventory optimisation.",
      "Delivered production grade systems architecture for industrial bioprocess monitoring.",
    ],
    tags: ["IoT", "Arduino Cloud", "Telemetry", "Dashboards"],
  },
  {
    slug: "general-learning",
    company: "General Learning (YC F24)",
    role: "Intern",
    period: "Aug – Oct 2024",
    location: "London, UK",
    engagement: "Part-time, remote",
    kind: "engineering",
    summary: "Curriculum data infrastructure at a Y Combinator F24 education startup.",
    impact:
      "Built the Node.js scraping and taxonomy infrastructure behind curriculum data.",
    highlights: [
      "Built Node.js scraping infrastructure with Axios and Cheerio, structuring A Level and GMAT curricula into production ready JSON.",
      "Designed slug generation and taxonomy pipelines for automated curriculum normalisation at scale.",
      "Automated syllabus ingestion workflows and CSV enrichment using the OpenAI API.",
      "Delivered structured data powering early stage backend operations prior to YC backing.",
    ],
    tags: ["Node.js", "Data Pipelines", "OpenAI API", "YC"],
  },
  {
    slug: "mha-singapore",
    company: "Ministry of Home Affairs, Singapore",
    role: "National Service, ProCom",
    period: "Nov 2022 – Oct 2024",
    location: "Singapore",
    engagement: "Full-time, on-site",
    kind: "service",
    summary:
      "Two years of National Service in ProCom, on critical infrastructure protection.",
    impact:
      "Served under the Protective Security Command on critical infrastructure protection.",
    highlights: [
      "Served under the Protective Security Command (ProCom).",
      "Supported high readiness security and critical infrastructure protection.",
    ],
    tags: ["National Service", "Critical Infrastructure", "Operations"],
  },
];

export type Education = {
  school: string;
  credential: string;
  detail?: string;
  coursework?: string[];
  period: string;
};

export const education: Education[] = [
  {
    school: "Nanyang Technological University",
    credential:
      "Bachelor of Computing (Honours), Data Science and Artificial Intelligence",
    detail: "Minor in Mathematics. Accelerated Bachelors Programme.",
    coursework: [
      "Data Structures and Algorithms",
      "Linear Algebra",
      "Probability and Statistics",
      "Computer Organisation and Architecture",
      "Discrete Mathematics",
      "Object-Oriented Programming",
      "Digital Logic",
      "Artificial Intelligence",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
    period: "2025 – 2028",
  },
  {
    school: "International Baccalaureate",
    credential: "IB Diploma",
    period: "Aug 2020 – May 2022",
  },
];
