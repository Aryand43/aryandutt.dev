export const siteConfig = {
  name: "Aryan Dutt",
  role: "Data Science & AI @ NTU",
  location: "Singapore",
  /** Rough coordinates, used as editorial metadata only. */
  coordinates: "1.3483° N, 103.6831° E",
  summary:
    "Data Science & AI undergraduate at NTU Singapore, working across low-latency infrastructure, scientific machine learning, LLM safety, and quantitative systems.",
  description:
    "Aryan Dutt is a Data Science and AI undergraduate at NTU Singapore working across low-latency infrastructure, scientific machine learning, LLM safety evaluation, and quantitative systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aryandutt.dev",
  locale: "en_SG",
  email: "aryan.dutt.dev@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/aryan-dutt-/",
  },
  /**
   * No résumé PDF is committed yet. Drop one at `public/aryan-dutt-resume.pdf`
   * and flip this to true; /resume renders a placeholder until then.
   */
  resume: {
    available: false,
    path: "/aryan-dutt-resume.pdf",
  },
  /** Drives the "last updated" stamp in the status bar. */
  lastUpdated: "2026-09-06",
} as const;

export const navItems = [
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/research", label: "Research" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Affiliations shown in the hero credibility strip. All are supported by the record. */
export const affiliations = [
  "NTU",
  "MIT Julia Lab",
  "InterSystems",
  "YC F24",
  "Citadel Securities Discover",
] as const;

/** The signal panel. Factual, not decorative. */
export const signals = [
  { label: "Focus", value: "Systems / ML / Quant" },
  { label: "Base", value: "Singapore" },
  { label: "Languages", value: "Python, C++, Julia, TypeScript" },
  {
    label: "Current interests",
    value:
      "Market microstructure, evaluation harness design, and systems where tail latency is the metric that matters",
  },
  {
    label: "Status",
    value: "Building and researching, open to 2027 roles and collaborations",
  },
] as const;
