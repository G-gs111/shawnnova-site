"use client";

import { Pause, Play } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

type NetworkCanvasProps = {
  label: string;
  locale: "zh" | "en";
};

const nodes = [
  [0.11, 0.25],
  [0.3, 0.16],
  [0.36, 0.48],
  [0.57, 0.28],
  [0.62, 0.67],
  [0.82, 0.2],
  [0.87, 0.55],
  [0.73, 0.84],
] as const;

const edges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [3, 5],
  [3, 6],
  [4, 6],
  [4, 7],
  [6, 7],
] as const;

export function NetworkCanvas({ label, locale }: NetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const style = getComputedStyle(canvas);
    const ink = style.getPropertyValue("--color-ink").trim();
    const muted = style.getPropertyValue("--color-ink-muted").trim();
    const rule = style.getPropertyValue("--color-rule-strong").trim();
    const accent = style.getPropertyValue("--color-accent").trim();
    let width = 1;
    let height = 1;
    let frame = 0;
    let visible = true;
    let pointerX = -999;
    let pointerY = -999;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(bounds.width, 1);
      height = Math.max(bounds.height, 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    };

    const point = (index: number) => ({
      x: nodes[index][0] * width,
      y: nodes[index][1] * height,
    });

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      edges.forEach(([from, to], edgeIndex) => {
        const a = point(from);
        const b = point(to);
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.strokeStyle = edgeIndex === Math.floor(time / 2200) % edges.length ? accent : rule;
        context.globalAlpha = edgeIndex === Math.floor(time / 2200) % edges.length ? 0.82 : 0.38;
        context.lineWidth = edgeIndex === Math.floor(time / 2200) % edges.length ? 1.5 : 1;
        context.stroke();
      });

      if (!reduceMotion.matches && !paused) {
        const active = edges[Math.floor(time / 2200) % edges.length];
        const a = point(active[0]);
        const b = point(active[1]);
        const progress = (time % 2200) / 2200;
        context.beginPath();
        context.arc(a.x + (b.x - a.x) * progress, a.y + (b.y - a.y) * progress, 3, 0, Math.PI * 2);
        context.fillStyle = accent;
        context.globalAlpha = 1;
        context.fill();
      }

      nodes.forEach((_, index) => {
        const p = point(index);
        const distance = Math.hypot(pointerX - p.x, pointerY - p.y);
        const highlighted = finePointer.matches && distance < 72;
        context.beginPath();
        context.arc(p.x, p.y, highlighted ? 7 : index === 3 ? 6 : 4, 0, Math.PI * 2);
        context.fillStyle = highlighted || index === 3 ? accent : ink;
        context.globalAlpha = highlighted ? 1 : 0.86;
        context.fill();
        context.beginPath();
        context.arc(p.x, p.y, highlighted ? 15 : 10, 0, Math.PI * 2);
        context.strokeStyle = highlighted ? accent : muted;
        context.globalAlpha = highlighted ? 0.5 : 0.16;
        context.lineWidth = 1;
        context.stroke();
      });

      context.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      if (visible && !reduceMotion.matches && !paused && document.visibilityState === "visible") {
        frame = window.requestAnimationFrame(loop);
      }
    };

    const start = () => {
      window.cancelAnimationFrame(frame);
      if (visible && !reduceMotion.matches && !paused && document.visibilityState === "visible") {
        frame = window.requestAnimationFrame(loop);
      } else {
        draw(0);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
      if (reduceMotion.matches) draw(0);
    };
    const onPointerLeave = () => {
      pointerX = -999;
      pointerY = -999;
      if (reduceMotion.matches) draw(0);
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    reduceMotion.addEventListener("change", start);
    document.addEventListener("visibilitychange", start);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    resize();
    start();

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      reduceMotion.removeEventListener("change", start);
      document.removeEventListener("visibilitychange", start);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [paused]);

  const labels = locale === "zh"
    ? ["业务现场", "数据 / API", "AI 判断", "可运行系统"]
    : ["Frontline", "Data / APIs", "AI decisions", "Working system"];
  const controlLabel = paused
    ? (locale === "zh" ? "继续数据流" : "Resume data flow")
    : (locale === "zh" ? "暂停数据流" : "Pause data flow");

  return (
    <figure className="fde-network" aria-label={label}>
      <div className="fde-network-status" aria-hidden="true">
        <span />
        {locale === "zh" ? "交付链路运行中" : "Delivery path active"}
      </div>
      <button
        className="fde-network-control"
        type="button"
        aria-label={controlLabel}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
        <span>{controlLabel}</span>
      </button>
      <canvas ref={canvasRef} aria-hidden="true" />
      <figcaption className="fde-network-caption">
        {labels.map((item, index) => (
          <span key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</span>
        ))}
      </figcaption>
    </figure>
  );
}
