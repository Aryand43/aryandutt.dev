export type Experience = {
  slug: string;
  company: string;
  role: string;
  period: string;
  /** ISO month used for ordering; the display string lives in `period`. */
  start: string;
  end: string | null;
  location: string;
  kind: "research" | "engineering" | "service";
  summary: string;
  highlights: string[];
  tags: string[];
};

/** Reverse chronological. */
export const experience: Experience[] = [
  {
    slug: "ntu-ura",
    company: "Nanyang Technological University",
    role: "Undergraduate Research Assistant",
    period: "Jul – Aug 2026",
    start: "2026-07",
    end: "2026-08",
    location: "Singapore",
    kind: "research",
    summary:
      "Research assistantship at the Singapore Centre for 3D Printing (SC3DP) under Prof. Paulo Bartolo.",
    highlights: [
      "Continued SC3DP research on additive manufacturing process data under Prof. Paulo Bartolo.",
      "Built analysis tooling around print-process experiments to shorten the loop between run and result.",
    ],
    tags: ["Research", "SC3DP", "Additive Manufacturing", "Python"],
  },
  {
    slug: "intersystems",
    company: "InterSystems",
    role: "Software Engineer Intern",
    period: "May – Jul 2026",
    start: "2026-05",
    end: "2026-07",
    location: "Singapore",
    kind: "engineering",
    summary:
      "Worked on low-latency data platforms and real-time database internals.",
    highlights: [
      "Contributed to low-latency data platform work backing real-time database workloads.",
      "Worked across the ObjectScript stack with CMake-driven builds and Ansible-managed environments.",
    ],
    tags: ["ObjectScript", "CMake", "Ansible", "Databases", "Low Latency"],
  },
  {
    slug: "ntu-ccds",
    company: "NTU CCDS",
    role: "Research Intern",
    period: "Aug 2025 – May 2026",
    start: "2025-08",
    end: "2026-05",
    location: "Singapore",
    kind: "research",
    summary:
      "LLM safety alignment research with Prof. Anupam Chattopadhyay at the College of Computing and Data Science.",
    highlights: [
      "Co-authored a paper on LLM safety alignment with Prof. Anupam Chattopadhyay.",
      "Ran evaluation harnesses over alignment interventions and analysed failure modes across prompt families.",
    ],
    tags: ["LLM Safety", "Alignment", "Evaluation", "PyTorch", "Research"],
  },
  {
    slug: "mit-julia-lab",
    company: "MIT Julia Lab",
    role: "Research Intern",
    period: "Jul 2025 – Mar 2026",
    start: "2025-07",
    end: "2026-03",
    location: "Remote / Cambridge, MA",
    kind: "research",
    summary:
      "Scientific machine learning research under PI Dr. Chris Rackauckas.",
    highlights: [
      "Research intern in the Julia Lab under PI Dr. Chris Rackauckas.",
      "Worked in the scientific machine learning ecosystem around differential equation solvers and Julia numerics.",
    ],
    tags: ["Julia", "SciML", "Differential Equations", "Numerics", "Research"],
  },
  {
    slug: "ntu-sc3dp",
    company: "NTU SC3DP",
    role: "Research Intern",
    period: "Jan – Jul 2025",
    start: "2025-01",
    end: "2025-07",
    location: "Singapore",
    kind: "research",
    summary:
      "Singapore Centre for 3D Printing, under Prof. Paulo Bartolo.",
    highlights: [
      "Supported additive manufacturing research under Prof. Paulo Bartolo.",
      "Handled experimental data capture and analysis across print runs.",
    ],
    tags: ["Research", "SC3DP", "Data Analysis", "Python"],
  },
  {
    slug: "seaqr-seaswarm",
    company: "SEAQR / SeaSwarm",
    role: "Software Engineer",
    period: "Mar – May 2025",
    start: "2025-03",
    end: "2025-05",
    location: "Singapore",
    kind: "engineering",
    summary:
      "Robotics startup founded by Harvard alumni, building autonomous marine sensing platforms.",
    highlights: [
      "Built software for autonomous marine sensing at a Harvard-founded robotics startup.",
      "Worked on the data path between fleet hardware and the analysis tooling consuming it.",
    ],
    tags: ["Robotics", "Autonomy", "Marine Sensing", "Python", "Startup"],
  },
  {
    slug: "tagit",
    company: "Tagit",
    role: "Software Engineer",
    period: "Jan – Mar 2025",
    start: "2025-01",
    end: "2025-03",
    location: "Singapore",
    kind: "engineering",
    summary:
      "Transaction anomaly detection for digital banking products.",
    highlights: [
      "Built transaction anomaly detection for digital banking flows.",
      "Modelled outlier behaviour with Isolation Forest over engineered transaction features.",
      "Shipped a Streamlit dashboard so analysts could triage flagged transactions directly.",
    ],
    tags: [
      "Anomaly Detection",
      "Isolation Forest",
      "scikit-learn",
      "Streamlit",
      "FinTech",
    ],
  },
  {
    slug: "biometallica",
    company: "BioMetallica",
    role: "Software Engineer",
    period: "Oct – Dec 2024",
    start: "2024-10",
    end: "2024-12",
    location: "Singapore",
    kind: "engineering",
    summary:
      "Bioreactor telemetry and internal operations tooling for a biotech venture.",
    highlights: [
      "Instrumented bioreactor telemetry on Arduino Cloud for live process monitoring.",
      "Built the Digital Board surfacing reactor state to the team at a glance.",
      "Set up an Integrated Management System to consolidate operational records.",
    ],
    tags: ["IoT", "Arduino Cloud", "Telemetry", "Biotech", "Dashboards"],
  },
  {
    slug: "general-learning",
    company: "General Learning (YC F24)",
    role: "Intern",
    period: "Aug – Oct 2024",
    start: "2024-08",
    end: "2024-10",
    location: "London, UK",
    kind: "engineering",
    summary:
      "Curriculum data infrastructure at a Y Combinator F24 education startup.",
    highlights: [
      "Wrote Node.js scrapers with Axios and Cheerio to collect A-Level and GMAT curriculum data.",
      "Built taxonomy pipelines to normalise scraped syllabi into a consistent topic hierarchy.",
      "Enriched CSV datasets with the OpenAI API to fill gaps across curriculum records.",
    ],
    tags: ["Node.js", "Axios", "Cheerio", "Data Pipelines", "OpenAI API", "YC"],
  },
  {
    slug: "mha-singapore",
    company: "Ministry of Home Affairs, Singapore",
    role: "National Service — ProCom",
    period: "Nov 2022 – Oct 2024",
    start: "2022-11",
    end: "2024-10",
    location: "Singapore",
    kind: "service",
    summary:
      "Two years of National Service in ProCom, on critical infrastructure protection.",
    highlights: [
      "Served in ProCom on critical infrastructure protection duties.",
      "Operated in a high-accountability environment with strict operational discipline.",
    ],
    tags: ["National Service", "Critical Infrastructure", "Operations"],
  },
];

export type Education = {
  school: string;
  credential: string;
  detail?: string;
  period: string;
};

export const education: Education[] = [
  {
    school: "Nanyang Technological University",
    credential: "Bachelor of Computing (Honours), Data Science & Artificial Intelligence",
    detail: "Minor in Mathematics",
    period: "2025 – 2028",
  },
  {
    school: "International Baccalaureate",
    credential: "IB Diploma",
    period: "2020 – 2022",
  },
];
