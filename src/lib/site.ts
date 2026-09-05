export const siteConfig = {
  name: "Aryan Dutt",
  title: "Aryan Dutt",
  positioning: "Data Science and AI at NTU Singapore",
  description:
    "Aryan Dutt is a Data Science and AI undergraduate at NTU Singapore working on scientific machine learning, LLM safety alignment, and low latency data systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aryandutt.dev",
  locale: "en_SG",
  location: "Singapore",
  email: "aryan.dutt.dev@gmail.com",
  links: {
    linkedin: "https://linkedin.com/in/aryan-dutt-",
  },
} as const;

export const navItems = [
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
] as const;
