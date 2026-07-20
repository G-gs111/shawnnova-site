"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import Image from "next/image";

import { siteContent } from "@/content/site";

export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 110, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 110, damping: 24 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-2.2, 2.2]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2.2, -2.2]);

  return (
    <motion.div
      className="hero-visual"
      onPointerMove={(event) => {
        if (reduceMotion) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
        pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image
        src={siteContent.heroVisual.image}
        alt={siteContent.heroVisual.alt}
        fill
        fetchPriority="high"
        loading="eager"
        sizes="(max-width: 767px) 100vw, 48vw"
      />
      <div className="hero-visual-mark" aria-hidden="true">
        SN
      </div>
    </motion.div>
  );
}
