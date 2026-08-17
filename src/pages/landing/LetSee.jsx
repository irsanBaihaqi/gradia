import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function LetSee() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(
    () => {
      const containerEl = containerRef.current;
      if (!containerEl) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerEl,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(titleRef.current, { opacity: 0.2, duration: 0.04 })
        .to(titleRef.current, { opacity: 1, duration: 0.06 })
        .to(titleRef.current, { opacity: 0.4, duration: 0.03 })
        .to(titleRef.current, { opacity: 1, duration: 0.08 })
        .to(titleRef.current, { opacity: 0.1, duration: 0.04 })
        .to(titleRef.current, {
          opacity: 1,
          duration: 0.12,
          textShadow: "0 0 20px rgba(255, 255, 255, 0.6)",
          ease: "power1.inOut",
        });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="letsee"
      className="sticky top-0 z-10 h-screen flex flex-col justify-center items-center select-none bg-[var(--bg)] transition-colors duration-300 overflow-hidden"
    >
      <div className="flex flex-col justify-center items-center">
        <h1
          ref={titleRef}
          className="text-6xl sm:text-8xl md:text-9xl font-hero text-center leading-[0.95] tracking-tight text-[var(--ink)] opacity-0 will-change-transform"
        >
          Let's See
          <br />
          Our Projects
        </h1>
        <p className="mt-12 text-lg text-[var(--muted)] flex items-center justify-center gap-2">
          SCROLL DOWN TO SEE{" "}
          <span className="inline-flex items-center">
            <ArrowDown size={18} className="animate-bounce" />
          </span>
        </p>
      </div>
    </section>
  );
}
