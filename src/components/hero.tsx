"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Linkedin, Mail, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const lines = [
  "Data Science & AI",
  "undergraduate building",
  "research-grade systems.",
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      {/* Ambient background: dot grid plus a soft primary glow behind the text. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-18rem] -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
      />

      <div className="container py-20 sm:py-28 lg:py-32">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          Open to 2027 internships &amp; research collaborations
        </motion.p>

        <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {lines.map((line, index) => (
            <motion.span
              key={line}
              className="block"
              initial={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0.25 : 0.7,
                delay: 0.1 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {index === lines.length - 1 ? (
                <>
                  research-grade{" "}
                  <span className="text-primary">systems.</span>
                </>
              ) : (
                line
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          I&apos;m {siteConfig.name} — reading Data Science &amp; AI at NTU
          Singapore. I&apos;ve worked on scientific machine learning at the MIT
          Julia Lab, LLM safety alignment at NTU CCDS, and low-latency data
          platforms at InterSystems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Button asChild size="lg">
            <Link href="/projects">
              View projects
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/experience">Experience</Link>
          </Button>
          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" size="icon" aria-label="Email">
              <a href={`mailto:${siteConfig.email}`}>
                <Mail className="size-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Linkedin className="size-4" />
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex items-center gap-2 font-mono text-xs text-muted-foreground"
        >
          <MapPin className="size-3.5" />
          {siteConfig.location}
        </motion.p>
      </div>
    </section>
  );
}
