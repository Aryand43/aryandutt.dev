"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child animating in. */
  gap?: number;
  as?: "div" | "ul" | "ol" | "section";
};

export function Stagger({
  children,
  className,
  gap = 0.08,
  as = "div",
}: StaggerProps) {
  const MotionTag = motion[as];

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: gap } },
  };

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
};

export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  const item: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag className={cn(className)} variants={item}>
      {children}
    </MotionTag>
  );
}
