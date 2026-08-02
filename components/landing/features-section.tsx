"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    number: "01",
    title: "Autonomous Intelligence", // Updated title for Feature 1
    description: "Deploy AI agents that operate independently, mastering multi-stage tasks without human intervention. Maximize efficiency, minimize oversight.", // Concise description for Feature 1
    stats: { value: "99.7%", label: "task completion" },
  },
  {
    number: "02",
    title: "Global Compute Network", // Updated title for Feature 2
    description: "Offload heavy tasks to our optimized global network. Your agents run on infrastructure across 50+ regions, ensuring speed and reliability worldwide.", // Concise description for Feature 2
    stats: { value: "50+", label: "global regions" },
  },
  {
    number: "03",
    title: "Advanced AI Orchestration", // Updated title for Feature 3
    description: "Coordinate teams of specialized AI agents. They seamlessly communicate, delegate, and collaborate to solve complex problems together, scaling effortlessly.", // Concise description for Feature 3
    stats: { value: "1000x", label: "parallel execution" },
  },
  {
    number: "04",
    title: "Unrivaled Data Security", // Updated title for Feature 4
    description: "Each agent runs in isolated, secure sandboxes. Enjoy full audit trails, encrypted execution, and guaranteed zero data leakage between all tasks.", // Concise description for Feature 4
    stats: { value: "0", label: "data breaches" },
  },
];

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="w-full mx-auto px-6 lg:px-12">
        <div className="relative mb-24 lg:mb-32">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-white/60 mb-8">
                <span className="w-6 h-6 bg-white/50 rounded-full [corner-shape:scoop] -rotate-12" />
                Core Solutions
              </span>
              <h2 className={`text-6xl md:text-7xl font-display tracking-tight leading-[0.9] transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <span className="text-muted-foreground">Innovate, Transform, Succeed.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p className={`text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Prisno delivers cutting-edge capabilities engineered to elevate your business and drive unparalleled digital excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout - Now dynamically mapped */}
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.number}
              className={`relative bg-black border border-foreground/10 min-h-135 overflow-hidden group transition-all duration-700 flex ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              {/* Left: text content */}
              <div className="relative flex-1 p-8 lg:p-12 bg-black">
                <div className="relative z-10">
                  <span className="font-mono text-sm text-muted-foreground">{feature.number}</span>
                  <h3 className="text-3xl lg:text-4xl font-display mt-4 mb-6 group-hover:translate-x-2 transition-transform duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-8">
                    {feature.description}
                  </p>
                  <div>
                    <span className="text-5xl lg:text-6xl font-display">{feature.stats.value}</span>
                    <span className="block text-sm text-muted-foreground font-mono mt-2">{feature.stats.label}</span>
                  </div>
                </div>
              </div>

              {/* Right: Empty div, as requested */}
              <div className="hidden lg:block relative w-[42%] shrink-0 overflow-hidden">

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}