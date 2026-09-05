import type { Metadata } from "next";
import { Award, GraduationCap, Languages as LanguagesIcon, ScrollText } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { education } from "@/lib/data/experience";
import {
  certifications,
  honors,
  languages,
  skillGroups,
  topSkills,
} from "@/lib/data/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aryan Dutt — Data Science & AI undergraduate at NTU Singapore, with research at the MIT Julia Lab and NTU CCDS.",
};

export default function AboutPage() {
  return (
    <div className="container">
      <PageHeader
        eyebrow="About"
        title="I build systems where research and engineering meet."
        description="I'm reading Data Science & Artificial Intelligence at NTU Singapore with a minor in Mathematics. My work sits between two poles: research that has to be correct, and systems that have to be fast."
      />

      <Section title="Background" eyebrow="Story">
        <Reveal className="max-w-2xl space-y-5 text-pretty leading-relaxed text-muted-foreground">
          <p>
            The through-line in my work is scientific computing under real
            constraints. At the MIT Julia Lab I worked with Dr. Chris Rackauckas
            on scientific machine learning — the part of the field where
            numerical solvers and learned models have to agree with each other.
            At NTU CCDS I moved up the stack to LLM safety alignment, co-authoring
            a paper with Prof. Anupam Chattopadhyay on how alignment holds up
            under pressure.
          </p>
          <p>
            Alongside the research, I&apos;ve shipped production software: anomaly
            detection over banking transactions at Tagit, bioreactor telemetry at
            BioMetallica, curriculum data pipelines at a YC F24 startup in London,
            and low-latency data platform work at InterSystems.
          </p>
          <p>
            Before university, I served two years of National Service with
            Singapore&apos;s Ministry of Home Affairs in ProCom, working on
            critical infrastructure protection — an environment that taught me
            more about operational discipline than any codebase has.
          </p>
        </Reveal>
      </Section>

      <Section
        title="Skills"
        eyebrow="Toolkit"
        description="What I reach for most, grouped by where it gets used."
      >
        <Reveal className="mb-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Top skills
          </p>
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill) => (
              <Badge key={skill} className="px-3 py-1 text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <StaggerItem key={group.title}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-sm font-semibold tracking-tight">
                    {group.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="font-normal"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section title="Education" eyebrow="Study">
        <Stagger as="ul" className="space-y-4">
          {education.map((item) => (
            <StaggerItem as="li" key={item.school}>
              <Card>
                <CardContent className="flex flex-col gap-2 p-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <GraduationCap className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium">{item.school}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.credential}
                      </p>
                      {item.detail ? (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.detail}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <p className="shrink-0 font-mono text-xs text-muted-foreground sm:pl-6">
                    {item.period}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section title="Honors & certifications" eyebrow="Recognition">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-2.5">
                  <Award className="size-4 text-primary" />
                  <h3 className="text-sm font-semibold tracking-tight">
                    Honors &amp; awards
                  </h3>
                </div>
                <ul className="mt-5 space-y-4">
                  {honors.map((honor) => (
                    <li key={honor.name}>
                      <p className="text-sm font-medium">{honor.name}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {honor.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-2.5">
                  <ScrollText className="size-4 text-primary" />
                  <h3 className="text-sm font-semibold tracking-tight">
                    Certifications
                  </h3>
                </div>
                <ul className="mt-5 space-y-4">
                  {certifications.map((cert) => (
                    <li key={cert.name}>
                      <p className="text-sm font-medium">{cert.name}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {cert.issuer}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section title="Languages" eyebrow="Communication" className="pb-24">
        <Reveal>
          <Card>
            <CardContent className="flex flex-wrap items-center gap-x-10 gap-y-4 p-6">
              <LanguagesIcon className="size-4 text-primary" />
              {languages.map((language) => (
                <div key={language.name}>
                  <p className="text-sm font-medium">{language.name}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {language.level}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </Reveal>
      </Section>
    </div>
  );
}
