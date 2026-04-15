"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles: {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; color: string;
    }[] = [];

    const colors = ["#27c9a8", "#1a6b5e", "#4ef0cc", "#0f2040"];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.35 + 0.08,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(39, 201, 168, ${0.04 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      animFrame = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(26, 107, 94, 0.22) 0%, rgba(4, 8, 15, 1) 70%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.55 }}
      />

      {/* Top label */}
      <div className="relative z-10 pt-28 max-w-7xl mx-auto w-full px-6 md:px-12">
        <div className="flex items-center gap-3" style={{ animation: "fadeInUp 0.5s ease both" }}>
          <div style={{ width: "28px", height: "1px", background: "var(--river-bright)", flexShrink: 0 }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", color: "var(--river-bright)", opacity: 0.75 }}>
            INDEPENDENT RESEARCH · DINAJPUR GOVT. WOMEN&apos;S COLLEGE
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-7xl mx-auto w-full px-6 md:px-12 pb-16 md:pb-24 mt-16">

        {/* Right vertical text — xl only */}
        <div
          className="absolute right-4 top-0 bottom-0 hidden xl:flex flex-col items-center justify-center gap-5"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.52rem", letterSpacing: "0.25em", color: "rgba(39,201,168,0.35)", writingMode: "vertical-rl" }}
        >
          <span>IoT SPECTROPHOTOMETRY</span>
          <div style={{ width: "1px", height: "48px", background: "rgba(39,201,168,0.2)" }} />
          <span>REAL-TIME COMPLIANCE</span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            lineHeight: 1.0,
            color: "var(--river-paper)",
            marginBottom: "1.5rem",
            animation: "fadeInUp 0.7s ease 0.1s both",
          }}
        >
          Turning
          <br />
          <em style={{ color: "var(--river-bright)", fontStyle: "italic" }}>rice husks</em>
          <br />
          into clean
          <br />
          water.
        </h1>

        {/* Subtitle */}
        <p
          className="mb-10"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "rgba(232, 237, 230, 0.6)",
            maxWidth: "520px",
            animation: "fadeInUp 0.7s ease 0.2s both",
          }}
        >
          An ultra-low-cost IoT system that monitors textile wastewater
          treatment in real time — built for{" "}
          <span style={{ color: "var(--river-paper)", fontWeight: 400 }}>under 1000 BDT</span>{" "}
          using locally sourced agricultural waste.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-px mb-10" style={{ animation: "fadeInUp 0.7s ease 0.3s both" }}>
          {[
            { value: "93%", label: "Dye Removal" },
            { value: "300s", label: "Treatment Time" },
            { value: "≤1000 BDT", label: "Per Unit Cost" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col px-5 py-4"
              style={{ background: "rgba(4,8,15,0.75)", border: "1px solid rgba(39,201,168,0.12)", minWidth: "110px" }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2.1rem)", color: "var(--river-bright)", lineHeight: 1, marginBottom: "6px" }}>
                {stat.value}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.1em", color: "rgba(232,237,230,0.4)", textTransform: "uppercase" as const }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Authors */}
        <div className="flex flex-wrap gap-x-5 gap-y-1" style={{ animation: "fadeInUp 0.7s ease 0.4s both" }}>
          {["Tasfiea Rubaiea", "Lamyea Zaman Sneha", "Anika Tabassum Adiba", "Khadija Tul Kubra"].map((author) => (
            <span key={author} style={{ fontFamily: "var(--font-mono)", fontSize: "0.63rem", color: "rgba(232,237,230,0.32)" }}>
              {author}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(39,201,168,0.35)" }}>SCROLL</span>
        <div style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom, rgba(39,201,168,0.4), transparent)", animation: "pulse-glow 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}
