"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import Image from "next/image";
import { type PointerEvent, useEffect } from "react";

type MaskPoint = {
  x: number;
  y: number;
};

export function resolveMaskPoint(
  point: MaskPoint,
  reducedMotion: boolean,
  pointerType: string,
): MaskPoint {
  if (reducedMotion || pointerType === "touch") return { x: 50, y: 50 };
  return point;
}

type HeroMaskProps = {
  children: React.ReactNode;
  image: string;
};

export function HeroMask({ children, image }: HeroMaskProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const springX = useSpring(x, { stiffness: 150, damping: 24, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 150, damping: 24, mass: 0.35 });
  const clipPath = useMotionTemplate`circle(clamp(9rem, 18vw, 14rem) at ${springX}% ${springY}%)`;

  useEffect(() => {
    if (!reducedMotion) return;
    x.set(50);
    y.set(50);
  }, [reducedMotion, x, y]);

  function updateMask(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const point = resolveMaskPoint(
      {
        x: ((event.clientX - bounds.left) / bounds.width) * 100,
        y: ((event.clientY - bounds.top) / bounds.height) * 100,
      },
      reducedMotion,
      event.pointerType,
    );

    x.set(Math.min(100, Math.max(0, point.x)));
    y.set(Math.min(100, Math.max(0, point.y)));
  }

  function resetMask() {
    x.set(50);
    y.set(50);
  }

  return (
    <div
      className="hero-mask-stage"
      onPointerMove={updateMask}
      onPointerLeave={resetMask}
    >
      <div className="hero-mask-base">{children}</div>
      <motion.div
        className="hero-mask-overlay"
        style={{ clipPath }}
        aria-hidden="true"
        data-testid="hero-mask-overlay"
      >
        <Image
          className="hero-mask-image"
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-mask-scrim" />
        <div className="hero-mask-overlay-content">{children}</div>
      </motion.div>
    </div>
  );
}
