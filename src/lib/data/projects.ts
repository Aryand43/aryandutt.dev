export type Project = {
  slug: string;
  title: string;
  blurb: string;
  description: string;
  year: string;
  tags: string[];
  /** Optional external links — omit rather than pointing at a URL that does not exist yet. */
  repo?: string;
  demo?: string;
  paper?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "llm-safety-alignment",
    title: "LLM Safety Alignment Evaluation",
    blurb: "Evaluation harness and analysis behind an LLM safety alignment paper at NTU CCDS.",
    description:
      "Research work with Prof. Anupam Chattopadhyay on how alignment interventions hold up under adversarial prompting. Built the evaluation harness, grouped failures into prompt families, and turned the results into the analysis that anchored the paper.",
    year: "2025 – 2026",
    tags: ["LLM Safety", "Alignment", "Evaluation", "PyTorch", "Research"],
    featured: true,
  },
  {
    slug: "sciml-julia",
    title: "Scientific ML in Julia",
    blurb: "SciML research in the MIT Julia Lab around differential equation solvers.",
    description:
      "Research under Dr. Chris Rackauckas in the MIT Julia Lab, working inside the SciML ecosystem where numerical solvers and machine learning meet — differential equation solving, benchmarking, and the Julia numerics stack.",
    year: "2025 – 2026",
    tags: ["Julia", "SciML", "Differential Equations", "Numerics"],
    featured: true,
  },
  {
    slug: "transaction-anomaly-detection",
    title: "Transaction Anomaly Detection",
    blurb: "Isolation Forest pipeline and analyst dashboard for digital banking transactions.",
    description:
      "Built at Tagit: an unsupervised anomaly detection pipeline over engineered transaction features using Isolation Forest, paired with a Streamlit dashboard that let analysts triage flagged transactions without touching a notebook.",
    year: "2025",
    tags: ["Anomaly Detection", "Isolation Forest", "scikit-learn", "Streamlit", "FinTech"],
    featured: true,
  },
  {
    slug: "bioreactor-telemetry",
    title: "Bioreactor Telemetry & Digital Board",
    blurb: "Arduino Cloud telemetry and a live operations board for bioreactor runs.",
    description:
      "At BioMetallica: instrumented bioreactors on Arduino Cloud for live process monitoring, built the Digital Board that surfaced reactor state to the whole team, and set up an Integrated Management System to consolidate operational records.",
    year: "2024",
    tags: ["IoT", "Arduino Cloud", "Telemetry", "Dashboards", "Biotech"],
    featured: true,
  },
  {
    slug: "curriculum-taxonomy-pipeline",
    title: "Curriculum Taxonomy Pipeline",
    blurb: "Node.js scraping and taxonomy normalisation for A-Level and GMAT syllabi.",
    description:
      "Built at General Learning (YC F24): Node.js scrapers using Axios and Cheerio to collect A-Level and GMAT curriculum data, taxonomy pipelines to normalise it into a consistent topic hierarchy, and OpenAI-driven CSV enrichment to fill the gaps.",
    year: "2024",
    tags: ["Node.js", "Axios", "Cheerio", "Data Pipelines", "OpenAI API"],
  },
  {
    slug: "marine-autonomy",
    title: "Autonomous Marine Sensing",
    blurb: "Software for a Harvard-founded robotics startup building marine sensing fleets.",
    description:
      "Engineering work at SEAQR / SeaSwarm on autonomous marine sensing — the software path carrying data off fleet hardware and into the tooling that made it useful.",
    year: "2025",
    tags: ["Robotics", "Autonomy", "Marine Sensing", "Python"],
  },
];

export const projectTags = Array.from(
  new Set(projects.flatMap((project) => project.tags)),
).sort((a, b) => a.localeCompare(b));
