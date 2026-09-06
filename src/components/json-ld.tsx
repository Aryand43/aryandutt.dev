import { experience } from "@/lib/data/experience";
import { siteConfig } from "@/lib/site";

/**
 * Person and WebSite structured data. Rendered once in the root layout so every
 * route carries it. Only asserts facts present in the site's own data.
 */
export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    jobTitle: "Data Science and AI Undergraduate",
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location,
      addressCountry: "SG",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Nanyang Technological University Singapore",
    },
    worksFor: experience.slice(0, 3).map((role) => ({
      "@type": "Organization",
      name: role.company,
    })),
    knowsAbout: [
      "Low-latency systems",
      "Quantitative finance",
      "Scientific machine learning",
      "LLM safety evaluation",
      "Data infrastructure",
    ],
    sameAs: [siteConfig.links.linkedin],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "en-SG",
    author: { "@type": "Person", name: siteConfig.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
