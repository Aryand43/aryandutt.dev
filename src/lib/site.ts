export const siteConfig = {
  name: "Aryan Dutt",
  title: "Aryan Dutt — Data Science & AI",
  role: "Data Science & AI @ NTU Singapore",
  description:
    "Aryan Dutt is a Data Science & AI undergraduate at NTU Singapore working on scientific machine learning, LLM safety alignment, and low-latency data systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aryandutt.dev",
  locale: "en_SG",
  location: "Singapore",
  email: "aryan102004@gmail.com",
  links: {
    linkedin: "https://linkedin.com/in/aryan-dutt-",
    github: "https://github.com/aryandutt",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
