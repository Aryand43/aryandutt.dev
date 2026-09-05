import type { Metadata } from "next";
import { ArrowUpRight, Linkedin, Mail, MapPin } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Section } from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Aryan Dutt — ${siteConfig.email} or on LinkedIn.`,
};

const channels = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    detail: "Best for anything substantive. I usually reply within a day or two.",
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/aryan-dutt-",
    href: siteConfig.links.linkedin,
    icon: Linkedin,
    detail: "Good for professional introductions and role enquiries.",
    external: true,
  },
] as const;

export default function ContactPage() {
  return (
    <div className="container">
      <PageHeader
        eyebrow="Contact"
        title="Get in touch."
        description="I'm open to research collaborations, internships, and conversations about scientific ML, LLM safety, or low-latency systems."
      />

      <Section title="Where to reach me" eyebrow="Channels">
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {channels.map((channel) => (
            <StaggerItem key={channel.label}>
              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noreferrer noopener" : undefined}
                className="group block h-full"
              >
                <Card className="h-full transition-colors duration-300 group-hover:border-primary/40">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <channel.icon className="size-5 text-primary" />
                      <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                    <p className="mt-5 text-sm font-medium">{channel.label}</p>
                    <p className="mt-1 break-all font-mono text-sm text-primary">
                      {channel.value}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {channel.detail}
                    </p>
                  </CardContent>
                </Card>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section title="Location" eyebrow="Based in" className="pb-24">
        <Reveal>
          <Card>
            <CardContent className="flex items-center gap-3 p-6">
              <MapPin className="size-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{siteConfig.location}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  SGT (UTC+8) — happy to work across time zones.
                </p>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </Section>
    </div>
  );
}
