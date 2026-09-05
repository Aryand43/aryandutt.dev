export type Project = {
  slug: string;
  title: string;
  period: string;
  /** Organisation the work sat under, where there was one. */
  association?: string;
  contributors?: string;
  blurb: string;
  details: string[];
  tags: string[];
  /** Omitted rather than pointed at a URL that does not exist yet. */
  repo?: string;
  demo?: string;
  paper?: string;
  /** The three high signal projects shown on the home page. */
  selected?: boolean;
};

/** Reverse chronological. */
export const projects: Project[] = [
  {
    slug: "cpp-limit-order-book",
    title: "C++ Limit Order Book with Latency Instrumentation",
    period: "Sep 2026 – Present",
    blurb:
      "A C++17 limit order book simulator that models real world trading latency and order expiration, emitting execution metrics for post trade analysis.",
    details: [
      "Models real world trading latency and order expiration inside a C++17 matching engine.",
      "Outputs execution metrics including P99 and P99.9 latency and slippage, plus cancel logs, to CSV for post trade analysis.",
    ],
    tags: ["C++", "CMake", "Low Latency", "Market Microstructure"],
    selected: true,
  },
  {
    slug: "ansible-infrastructure-automation",
    title: "Infrastructure Automation with Ansible",
    period: "Jun 2026 – Jul 2026",
    association: "InterSystems",
    contributors: "With Bryan and Aditya",
    blurb:
      "An Ansible framework provisioning a high availability, load balanced stack with redundant databases, turning manual server setup into repeatable infrastructure as code.",
    details: [
      "Provisions and manages a high availability, load balanced infrastructure stack with redundant databases.",
      "Replaces manual server setup with repeatable infrastructure as code.",
    ],
    tags: ["Ansible", "Python", "Infrastructure as Code", "High Availability"],
  },
  {
    slug: "neurallyapunov-roa-study",
    title: "Empirical Study of RoA Penalty Functions in NeuralLyapunov.jl",
    period: "Jan 2026 – Mar 2026",
    association: "Massachusetts Institute of Technology",
    contributors: "With Nicholas",
    blurb:
      "An experimental framework learning Lyapunov functions for nonlinear dynamical systems, comparing region of attraction penalty formulations under physics informed training.",
    details: [
      "Built the framework on NeuralLyapunov.jl, NeuralPDE.jl, and Lux to learn Lyapunov functions for nonlinear dynamical systems.",
      "Designed controlled experiments over region of attraction penalty formulations and gating functions, tested on the Van der Pol oscillator.",
      "Automated pipelines for training diagnostics, RoA contour estimation, and experiment reporting covering loss dynamics and Lyapunov derivative validation.",
      "Investigated how smooth against hard gating functions affect optimisation stability and RoA boundary learning inside physics informed neural networks.",
    ],
    tags: [
      "Julia",
      "SciML",
      "Physics Informed Neural Networks",
      "Nonlinear Dynamics",
    ],
    selected: true,
  },
  {
    slug: "federated-whisper-aggregation",
    title: "Federated Whisper Aggregation Pipeline",
    period: "Aug 2025 – Dec 2025",
    contributors: "With Vincenzo and Manfred",
    blurb:
      "A federated learning pipeline fine tuning whisper-large-v3-turbo across decentralised speech datasets with zero data sharing.",
    details: [
      "Fine tuned OpenAI's whisper-large-v3-turbo across decentralised speech datasets using Flower on a Linux VM.",
      "Implemented weighted checkpoint averaging across more than 10 aggregation strategies, with automated orchestration.",
      "Evaluated on HuggingFace datasets, logging WER and BLEU, and validated exported state dicts against Whisper's native inference backend.",
    ],
    tags: ["Federated Learning", "Flower", "PyTorch", "Speech", "HuggingFace"],
    selected: true,
  },
  {
    slug: "moe-compression",
    title: "MoE Compression of LLM Weights",
    period: "Apr 2025 – Jun 2025",
    blurb:
      "Post training compression of Mixture of Experts checkpoints using dynamic quantization and SVD low rank approximation, with structured benchmarking.",
    details: [
      "Compressed every linear layer with dynamic quantization, cutting on disk size from roughly 90MB to 52MB while preserving parameter count.",
      "Injected low rank approximated linear layers using the top 32 singular values, storing compressed weights separately for inference.",
      "Built an evaluation suite running fixed prompt inference across original and compressed models, logging latency, logit cosine similarity, parameter count, and disk size.",
      "Tracked semantic degradation through cosine similarity of around 0.71 while maintaining inference correctness.",
    ],
    tags: ["Quantization", "SVD", "PyTorch", "Model Compression", "LLM"],
  },
  {
    slug: "portfolio-optimization-engine",
    title: "Portfolio Optimization Engine",
    period: "Nov 2024 – Jan 2025",
    blurb:
      "A modular Python portfolio analytics engine covering multi asset ingestion, risk metrics, and Monte Carlo simulation behind a desktop GUI.",
    details: [
      "Multi asset data ingestion across equities, indices, forex, and crypto via yfinance, with joblib backed caching.",
      "Risk and performance metrics including Sharpe ratio, VaR and CVaR at 95 percent, maximum drawdown, and Omega ratio.",
      "Monte Carlo simulation using a multivariate normal with covariance fallback to model portfolio path distributions.",
      "Production shaped codebase with pytest unit tests across metrics and data pipelines, plus a Tkinter GUI for fetching, simulation, and visualisation.",
    ],
    tags: ["Python", "Quantitative Finance", "Monte Carlo", "Risk", "pytest"],
  },
];

export const selectedProjects = projects.filter((project) => project.selected);
