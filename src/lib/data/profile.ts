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
    title: "Languages & Runtimes",
    items: ["Python", "TypeScript", "Julia", "ObjectScript", "Node.js", "SQL"],
  },
  {
    title: "Systems & Infrastructure",
    items: ["CMake", "Ansible", "Real-Time Databases", "Linux", "Git", "Docker"],
  },
  {
    title: "Data & Interfaces",
    items: ["Pandas", "NumPy", "Streamlit", "Next.js", "Arduino Cloud", "REST APIs"],
  },
] as const;

export const languages = [
  { name: "English", level: "Native / Bilingual" },
  { name: "Spanish", level: "Elementary" },
] as const;

export const certifications = [
  {
    name: "Bloomberg Market Concepts — Apple Stock",
    issuer: "Bloomberg",
  },
  {
    name: "Machine Learning Specialization",
    issuer: "DeepLearning.AI / Stanford Online",
  },
  {
    name: "Neural Networks & Deep Learning",
    issuer: "DeepLearning.AI",
  },
  {
    name: "QC101 — Quantum Computing",
    issuer: "QC101",
  },
  {
    name: "Circuits for Beginners",
    issuer: "Online Certification",
  },
] as const;

export const honors = [
  {
    name: "USAII Global AI Hackathon 2026 — Finalist",
    detail: "Undergraduate track",
  },
  {
    name: "Citadel Securities Discover Program",
    detail: "Invite-only",
  },
  {
    name: "Y Combinator AI Startup School",
    detail: "Selected participant",
  },
  {
    name: "Extended Essay Exhibition",
    detail: "Selected for exhibition",
  },
  {
    name: "Academic Merit Award",
    detail: "Awarded for academic standing",
  },
] as const;

/** Short, factual stats used on the home page. */
export const highlights = [
  {
    value: "MIT",
    label: "Julia Lab",
    detail: "Scientific ML research under Dr. Chris Rackauckas.",
  },
  {
    value: "NTU",
    label: "CCDS Research",
    detail: "LLM safety alignment paper with Prof. Anupam Chattopadhyay.",
  },
  {
    value: "10",
    label: "Roles shipped",
    detail: "Research labs, YC startups, and enterprise data platforms.",
  },
  {
    value: "2026",
    label: "USAII Finalist",
    detail: "Global AI Hackathon, undergraduate track.",
  },
] as const;
