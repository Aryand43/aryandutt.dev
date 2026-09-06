export type ProjectCategory = "Quant" | "Research" | "Systems" | "ML";

export type Project = {
  slug: string;
  title: string;
  /** One line thesis: what this is and why it matters. */
  thesis: string;
  period: string;
  category: ProjectCategory;
  association?: string;
  contributors?: string;
  problem: string;
  approach: string[];
  /** Only outcomes supported by the record. Omitted where none is documented. */
  outcome?: string;
  stack: string[];
  /** Links are omitted rather than invented. Add real URLs as they exist. */
  repo?: string;
  demo?: string;
  paper?: string;
  /** Ordered by career signal, not chronology. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "cpp-limit-order-book",
    title: "C++ Limit Order Book with Latency Instrumentation",
    thesis:
      "A matching engine that treats latency as a measured quantity rather than an assumption.",
    period: "Sep 2026 – Present",
    category: "Quant",
    problem:
      "Order book simulators typically model matching logic but ignore the timing behaviour that determines real execution quality. Without instrumentation, latency and order expiration stay invisible until they cost money.",
    approach: [
      "Engineered a C++17 limit order book simulator modelling real-world trading latency and order expiration.",
      "Instrumented the execution path to record per-order timing across the matching lifecycle.",
      "Emitted execution metrics, including P99 and P99.9 latency and slippage, plus cancel logs, to CSV for post-trade analysis.",
    ],
    outcome:
      "Produces a post-trade dataset that makes tail latency and slippage directly measurable rather than inferred.",
    stack: ["C++17", "CMake", "Market Microstructure", "Latency Analysis"],
    featured: true,
  },
  {
    slug: "neurallyapunov-roa-study",
    title: "Empirical Study of RoA Penalty Functions in NeuralLyapunov.jl",
    thesis:
      "A controlled study of how region-of-attraction penalties shape stability certificates learned by physics-informed networks.",
    period: "Jan 2026 – Mar 2026",
    category: "Research",
    association: "MIT Julia Lab",
    contributors: "With Nicholas",
    problem:
      "Learned Lyapunov functions certify stability for nonlinear systems, but the penalty formulation used during training changes both optimisation stability and the region of attraction recovered. The trade-offs were not systematically characterised.",
    approach: [
      "Implemented an experimental framework on NeuralLyapunov.jl, NeuralPDE.jl, and Lux to learn Lyapunov functions for nonlinear dynamical systems.",
      "Designed controlled experiments across region-of-attraction penalty formulations and gating functions, evaluated on the Van der Pol oscillator.",
      "Automated pipelines for training diagnostics, RoA contour estimation, and experiment reporting covering loss dynamics and Lyapunov derivative validation.",
      "Investigated how smooth against hard gating functions affect optimisation stability and RoA boundary learning.",
    ],
    stack: [
      "Julia",
      "NeuralLyapunov.jl",
      "NeuralPDE.jl",
      "Lux.jl",
      "ModelingToolkit.jl",
    ],
    featured: true,
  },
  {
    slug: "federated-whisper-aggregation",
    title: "Federated Whisper Aggregation Pipeline",
    thesis:
      "Fine-tuning a production speech model across decentralised datasets without moving any data.",
    period: "Aug 2025 – Dec 2025",
    category: "ML",
    contributors: "With Vincenzo and Manfred",
    problem:
      "Speech datasets are often too sensitive to centralise, which rules out conventional fine-tuning. Federated training removes the data-sharing requirement but introduces the question of which aggregation strategy actually preserves model quality.",
    approach: [
      "Engineered a federated pipeline fine-tuning whisper-large-v3-turbo across decentralised speech datasets using Flower on a Linux VM.",
      "Implemented weighted checkpoint averaging across more than ten aggregation strategies, with automated orchestration across configurations.",
      "Evaluated on HuggingFace datasets, logging WER and BLEU per strategy.",
      "Validated exported state dicts directly against Whisper's native inference backend.",
    ],
    outcome:
      "A reproducible aggregation and evaluation stack that compares strategies under zero data sharing.",
    stack: ["Python", "Flower", "PyTorch", "HuggingFace", "Whisper"],
    featured: true,
  },
  {
    slug: "moe-compression",
    title: "MoE Compression of LLM Weights",
    thesis:
      "Post-training compression of Mixture-of-Experts checkpoints, benchmarked for semantic drift rather than size alone.",
    period: "Apr 2025 – Jun 2025",
    category: "ML",
    problem:
      "Compression results are usually reported as a size reduction. That number says nothing about whether the compressed model still produces equivalent outputs, which is the property that actually matters at inference time.",
    approach: [
      "Applied dynamic quantization across linear layers, reducing on-disk size from roughly 90MB to 52MB while preserving parameter count.",
      "Injected low-rank approximated linear layers using the top 32 singular values, storing compressed weights separately for inference.",
      "Built an evaluation suite running fixed-prompt inference across original and compressed models, logging latency, logit cosine similarity, parameter count, and disk size.",
      "Tracked semantic degradation through output cosine similarity while validating inference correctness.",
    ],
    outcome:
      "Roughly 42 percent on-disk reduction at a measured output cosine similarity of about 0.71 against the original model.",
    stack: ["PyTorch", "Quantization", "SVD", "Model Compression"],
    featured: true,
  },
  {
    slug: "portfolio-optimization-engine",
    title: "Portfolio Optimization Engine",
    thesis:
      "A multi-asset risk and simulation engine built to production shape, not notebook shape.",
    period: "Nov 2024 – Jan 2025",
    category: "Quant",
    problem:
      "Portfolio analytics written in notebooks rarely survives reuse. The calculations are sound but untested, uncached, and impossible to drive from anything but the notebook itself.",
    approach: [
      "Architected a modular Python engine with multi-asset ingestion across equities, indices, forex, and crypto via yfinance, with joblib-backed caching.",
      "Implemented risk and performance metrics including Sharpe ratio, VaR and CVaR at 95 percent, maximum drawdown, and Omega ratio.",
      "Developed a Monte Carlo framework using a multivariate normal with covariance fallback to model portfolio path distributions.",
      "Structured the codebase into separated source, simulation, calculation, and visualisation layers with pytest coverage across metrics and data pipelines.",
      "Designed a Tkinter GUI for interactive fetching, simulation, and risk visualisation.",
    ],
    stack: ["Python", "NumPy", "Monte Carlo", "pytest", "Tkinter"],
    featured: true,
  },
  {
    slug: "ansible-infrastructure-automation",
    title: "Infrastructure Automation with Ansible",
    thesis:
      "Turning a manually provisioned high-availability stack into repeatable infrastructure as code.",
    period: "Jun 2026 – Jul 2026",
    category: "Systems",
    association: "InterSystems",
    contributors: "With Bryan and Aditya",
    problem:
      "Manual provisioning of a load-balanced stack with redundant databases is slow to reproduce and easy to drift. Recovery depends on whoever configured it last.",
    approach: [
      "Automated provisioning and management of a high-availability, load-balanced infrastructure stack with redundant databases.",
      "Replaced manual server setup with declarative, repeatable Ansible playbooks.",
    ],
    stack: ["Ansible", "Python", "Infrastructure as Code", "High Availability"],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const projectCategories: ProjectCategory[] = [
  "Research",
  "Systems",
  "Quant",
  "ML",
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
